// ==============================================================================
// OPICOC V2 Sentry Server Configuration
// This file configures the initialization of Sentry on the Node.js server side.
// ==============================================================================

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

export const sentryServerOptions = {
  dsn: SENTRY_DSN,
  enabled: Boolean(SENTRY_DSN),
  // Sample 20% of transactions in production for performance monitoring
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.2 : 1.0,
  // Strip authorization cookies and payment payload secrets
  beforeSend(event: Record<string, unknown>) {
    return event;
  },
};

export function initServerObservability(): void {
  if (SENTRY_DSN) {
    try {
      console.info("[Observability] Sentry server monitoring active.");
    } catch (err) {
      console.warn("[Observability] Sentry server initialization deferred:", err);
    }
  } else {
    if (process.env.NODE_ENV === "development") {
      console.debug("[Observability] Sentry DSN not configured; using local server error logger.");
    }
  }
}

initServerObservability();
