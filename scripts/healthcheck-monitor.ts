/**
 * OPICOC V2 Uptime Monitor & Healthcheck Daemon
 * Periodically verifies platform endpoints, measures response latency,
 * and triggers incident alerts if degradation or downtime is detected.
 */

import { dispatchAlertWebhook } from "../src/lib/observability/alerts";

export interface HealthCheckTarget {
  url: string;
  name: string;
  expectedStatus: number;
}

const DEFAULT_TARGETS: HealthCheckTarget[] = [
  { url: "http://localhost:3000/", name: "Homepage & Streaming Shell", expectedStatus: 200 },
  { url: "http://localhost:3000/robots.txt", name: "Robots & Crawlability", expectedStatus: 200 },
  { url: "http://localhost:3000/api/newsletter/subscribe", name: "Newsletter API Endpoint", expectedStatus: 405 }, // Method Not Allowed for GET
];

export async function checkEndpointHealth(
  target: HealthCheckTarget,
  timeoutMs: number = 3000
): Promise<{ ok: boolean; status: number; latencyMs: number; error?: string }> {
  const start = Date.now();

  try {
    const res = await fetch(target.url, {
      method: "GET",
      signal: AbortSignal.timeout(timeoutMs),
    });

    const latencyMs = Date.now() - start;
    const ok = res.status === target.expectedStatus;

    return { ok, status: res.status, latencyMs };
  } catch (err) {
    const latencyMs = Date.now() - start;
    return {
      ok: false,
      status: 0,
      latencyMs,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

export async function runHealthCheckSuite(baseUrl: string = "http://localhost:3000"): Promise<boolean> {
  console.log(`[Healthcheck] Starting automated platform verification for ${baseUrl}...`);
  let allHealthy = true;

  for (const target of DEFAULT_TARGETS) {
    const fullTarget = {
      ...target,
      url: target.url.replace("http://localhost:3000", baseUrl),
    };

    const result = await checkEndpointHealth(fullTarget);

    if (result.ok) {
      console.log(`  ✅ [OK] ${fullTarget.name} (${result.status}) - ${result.latencyMs}ms`);
    } else {
      allHealthy = false;
      console.error(`  ❌ [FAILED] ${fullTarget.name} (Status: ${result.status}, Error: ${result.error || "Unexpected status"}) - ${result.latencyMs}ms`);

      // Dispatch incident notification
      await dispatchAlertWebhook({
        title: `🚨 Healthcheck Failure: ${fullTarget.name}`,
        message: `Endpoint ${fullTarget.url} failed health verification. Status: ${result.status}. Error: ${result.error || "Degraded response"}. Latency: ${result.latencyMs}ms`,
        level: "fatal",
        context: {
          target: fullTarget.name,
          url: fullTarget.url,
          status: result.status,
          latencyMs: result.latencyMs,
        },
      });
    }
  }

  return allHealthy;
}

// When executed directly as a script
if (require.main === module || process.argv[1]?.endsWith("healthcheck-monitor.ts")) {
  const targetBaseUrl = process.env.BASE_URL || "http://localhost:3000";
  runHealthCheckSuite(targetBaseUrl).then((healthy) => {
    if (!healthy) {
      console.warn("[Healthcheck] One or more endpoints reported degraded status.");
    } else {
      console.log("[Healthcheck] All endpoints operational.");
    }
  });
}
