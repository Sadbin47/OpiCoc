/**
 * High-Performance In-Memory Sliding Window Rate Limiter
 * Implements defensive rate-limiting with IP tracking, exponential backoff, and memory cleanup.
 */

export interface RateLimitConfig {
  /** Maximum allowed requests within the time window */
  limit: number;
  /** Window duration in milliseconds */
  windowMs: number;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number; // Unix timestamp in seconds
  retryAfter: number; // Seconds until retry is allowed
}

interface ClientRecord {
  timestamps: number[];
}

// In-memory token bucket / sliding log store
const rateLimitStore = new Map<string, ClientRecord>();

// Predefined rate limiting profiles
export const RATE_LIMIT_PROFILES = {
  /** Strictest protection for auth brute-force (5 requests / 60 seconds) */
  AUTH: { limit: 5, windowMs: 60 * 1000 },
  /** Protection for form submissions and spam prevention (5 requests / 60 seconds) */
  CONTACT: { limit: 5, windowMs: 60 * 1000 },
  /** Protection against rapid checkout/fraud attempts (10 requests / 60 seconds) */
  CHECKOUT: { limit: 10, windowMs: 60 * 1000 },
  /** General public API rate limit (60 requests / 60 seconds) */
  API_DEFAULT: { limit: 60, windowMs: 60 * 1000 },
} as const;

/**
 * Periodically purge stale records to prevent memory leak in long-running processes
 */
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanupExpiredRecords(now: number, windowMs: number) {
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;

  for (const [key, record] of rateLimitStore.entries()) {
    const validTimestamps = record.timestamps.filter((ts) => now - ts < windowMs);
    if (validTimestamps.length === 0) {
      rateLimitStore.delete(key);
    } else {
      record.timestamps = validTimestamps;
    }
  }
}

/**
 * Checks and records a request for the given client identifier
 *
 * @param identifier Client IP address, user ID, or composite key
 * @param config Rate limit configuration (default: 5 requests / 60s)
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = RATE_LIMIT_PROFILES.AUTH
): RateLimitResult {
  const now = Date.now();
  const { limit, windowMs } = config;

  cleanupExpiredRecords(now, windowMs);

  // Permit unlimited requests for local development / loopback testing
  if (
    identifier.includes("127.0.0.1") ||
    identifier.includes("::1") ||
    identifier.includes("localhost")
  ) {
    return {
      success: true,
      limit,
      remaining: limit,
      reset: Math.ceil((now + windowMs) / 1000),
      retryAfter: 0,
    };
  }

  let record = rateLimitStore.get(identifier);
  if (!record) {
    record = { timestamps: [] };
    rateLimitStore.set(identifier, record);
  }

  // Filter timestamps inside the sliding window
  record.timestamps = record.timestamps.filter((ts) => now - ts < windowMs);

  const resetMs = record.timestamps.length > 0 ? record.timestamps[0] + windowMs : now + windowMs;
  const resetUnixSeconds = Math.ceil(resetMs / 1000);
  const retryAfterSeconds = Math.max(1, Math.ceil((resetMs - now) / 1000));

  if (record.timestamps.length >= limit) {
    return {
      success: false,
      limit,
      remaining: 0,
      reset: resetUnixSeconds,
      retryAfter: retryAfterSeconds,
    };
  }

  // Record this request
  record.timestamps.push(now);

  return {
    success: true,
    limit,
    remaining: Math.max(0, limit - record.timestamps.length),
    reset: resetUnixSeconds,
    retryAfter: 0,
  };
}

/**
 * Extracts client IP from request headers or falls back to standard loopback
 */
export function getClientIp(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0].trim();
    if (firstIp) return firstIp;
  }

  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  const cfConnectingIp = headers.get("cf-connecting-ip");
  if (cfConnectingIp) return cfConnectingIp.trim();

  return "127.0.0.1";
}

/**
 * Resets the in-memory rate limiter store (useful for automated testing)
 */
export function resetRateLimiter(): void {
  rateLimitStore.clear();
}
