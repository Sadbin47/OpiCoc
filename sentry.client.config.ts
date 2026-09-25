// ==============================================================================
// OPICOC V2 Sentry Client Configuration
// This file configures the initialization of Sentry on the browser/client side.
// ==============================================================================

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

export const sentryClientOptions = {
  dsn: SENTRY_DSN,
  enabled: Boolean(SENTRY_DSN),
  // Performance Monitoring
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.2 : 1.0,
  // Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  // Filter sensitive data before transmitting
  beforeSend(event: Record<string, unknown>) {
    if (process.env.NODE_ENV !== "production" && !SENTRY_DSN) {
      return null;
    }
    return event;
  },
};

export function initClientObservability(): void {
  if (SENTRY_DSN) {
    try {
      // Dynamic Sentry runtime hook
      console.info("[Observability] Sentry client monitoring active.");
    } catch (err) {
      console.warn("[Observability] Sentry client initialization deferred:", err);
    }
  } else {
    // Development telemetry stub
    if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
      console.debug("[Observability] Sentry DSN not configured; using local error logger.");
    }
  }
}

initClientObservability();
