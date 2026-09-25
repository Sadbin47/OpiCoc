/**
 * OPICOC Security Architecture & Hardening Utilities
 * Provides Content Security Policy (CSP) builders, HTTP security headers, and input sanitization.
 */

/**
 * Builds a strict Content-Security-Policy directive string.
 */
export function buildContentSecurityPolicy(isDev: boolean = process.env.NODE_ENV !== "production"): string {
  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    "script-src": [
      "'self'",
      "'unsafe-inline'", // Required for Next.js inline scripts & JSON-LD
      ...(isDev ? ["'unsafe-eval'"] : []), // Only permitted during local development/debugging
      "https://apis.google.com",
    ],
    "style-src": [
      "'self'",
      "'unsafe-inline'", // Required for Tailwind CSS / Radix UI injected styles
      "https://fonts.googleapis.com",
    ],
    "img-src": [
      "'self'",
      "data:",
      "blob:",
      "https://iili.io",
      "https://*.googleusercontent.com",
      "https://images.unsplash.com",
    ],
    "font-src": ["'self'", "data:", "https://fonts.gstatic.com"],
    "connect-src": [
      "'self'",
      "https://iili.io",
      "https://api.stripe.com",
    ],
    "media-src": ["'self'", "https:", "data:", "blob:"],
    "frame-src": [
      "'self'",
      "https://www.youtube.com",
      "https://www.youtube-nocookie.com",
      "https://js.stripe.com",
    ],
    "object-src": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "frame-ancestors": ["'none'"],
  };

  // Only enforce HTTPS upgrades in production
  if (!isDev) {
    directives["upgrade-insecure-requests"] = [];
  }

  return Object.entries(directives)
    .map(([key, values]) => (values.length > 0 ? `${key} ${values.join(" ")}` : key))
    .join("; ");
}

/**
 * Enterprise standard HTTP security headers
 */
export function getSecurityHeaders(isDev: boolean = process.env.NODE_ENV !== "production"): Record<string, string> {
  return {
    "Content-Security-Policy": buildContentSecurityPolicy(isDev),
    "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), browsing-topics=()",
    "X-DNS-Prefetch-Control": "on",
    "Cross-Origin-Opener-Policy": "same-origin",
  };
}

/**
 * Sanitizes user text against XSS, HTML tag injections, and null-byte exploits.
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== "string") return "";

  return input
    // Remove null bytes
    .replace(/\0/g, "")
    // Strip control characters
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    // Strip script, style, and iframe tags
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    // Strip open tags
    .replace(/<[^>]+>/g, "")
    .trim();
}
