/**
 * OPICOC Centralized Observability & Error Tracking Engine
 * Provides structured error capturing, performance telemetry, and alerting.
 */

import { dispatchAlertWebhook } from "./alerts";

export type SeverityLevel = "info" | "warning" | "error" | "fatal";

export interface ErrorContext {
  userId?: string;
  endpoint?: string;
  action?: string;
  metadata?: Record<string, unknown>;
}

export interface StructuredLog {
  timestamp: string;
  level: SeverityLevel;
  message: string;
  stack?: string;
  context?: ErrorContext;
}

/**
 * Captures and records a system exception with structured metadata
 */
export function captureException(error: unknown, context?: ErrorContext): void {
  const err = error instanceof Error ? error : new Error(String(error));
  const logEntry: StructuredLog = {
    timestamp: new Date().toISOString(),
    level: "error",
    message: err.message,
    stack: err.stack,
    context,
  };

  // 1. Output structured JSON log for log aggregators (Datadog, CloudWatch, Papertrail)
  console.error(`[ERROR_TRACKER] ${JSON.stringify(logEntry)}`);

  // 2. Dispatch high-priority alert for critical exceptions
  if (context?.action === "checkout_failure" || context?.action === "db_connection_loss") {
    dispatchAlertWebhook({
      title: "🚨 Critical Application Exception",
      message: err.message,
      level: "fatal",
      context: {
        endpoint: context.endpoint,
        action: context.action,
        timestamp: logEntry.timestamp,
      },
    }).catch(() => {
      // Prevent alert failure from interrupting error flow
    });
  }
}

/**
 * Records an informational or warning operational message
 */
export function captureMessage(
  message: string,
  level: SeverityLevel = "info",
  context?: ErrorContext
): void {
  const logEntry: StructuredLog = {
    timestamp: new Date().toISOString(),
    level,
    message,
    context,
  };

  if (level === "error" || level === "fatal") {
    console.error(`[ALERT] ${JSON.stringify(logEntry)}`);
  } else if (level === "warning") {
    console.warn(`[WARN] ${JSON.stringify(logEntry)}`);
  } else {
    console.log(`[INFO] ${JSON.stringify(logEntry)}`);
  }
}

/**
 * Tracks Core Web Vitals and API response latency metrics
 */
export function trackPerformanceMetric(
  metricName: string,
  valueMs: number,
  tags?: Record<string, string>
): void {
  const metricRecord = {
    timestamp: new Date().toISOString(),
    metric: metricName,
    valueMs,
    tags,
  };

  // Structured metric log for Prometheus / Grafana / Datadog
  console.log(`[METRIC] ${JSON.stringify(metricRecord)}`);
}

export const logger = {
  info: (msg: string, ctx?: ErrorContext) => captureMessage(msg, "info", ctx),
  warn: (msg: string, ctx?: ErrorContext) => captureMessage(msg, "warning", ctx),
  error: (msg: string, ctx?: ErrorContext) => captureMessage(msg, "error", ctx),
  fatal: (msg: string, ctx?: ErrorContext) => captureMessage(msg, "fatal", ctx),
};
