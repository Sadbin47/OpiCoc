import { describe, it, expect, beforeEach } from "vitest";
import {
  checkRateLimit,
  resetRateLimiter,
  getClientIp,
  RATE_LIMIT_PROFILES,
} from "@/lib/rateLimit";

describe("Sliding Window Rate Limiter", () => {
  beforeEach(() => {
    resetRateLimiter();
  });

  it("permits requests within the defined threshold limit", () => {
    const identifier = "test-client-1";
    const profile = { limit: 3, windowMs: 1000 };

    const first = checkRateLimit(identifier, profile);
    expect(first.success).toBe(true);
    expect(first.remaining).toBe(2);

    const second = checkRateLimit(identifier, profile);
    expect(second.success).toBe(true);
    expect(second.remaining).toBe(1);

    const third = checkRateLimit(identifier, profile);
    expect(third.success).toBe(true);
    expect(third.remaining).toBe(0);
  });

  it("blocks brute-force requests exceeding the threshold", () => {
    const identifier = "test-client-blocked";
    const profile = RATE_LIMIT_PROFILES.AUTH; // 5 req / 60s

    for (let i = 0; i < 5; i++) {
      const res = checkRateLimit(identifier, profile);
      expect(res.success).toBe(true);
    }

    const blocked = checkRateLimit(identifier, profile);
    expect(blocked.success).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.retryAfter).toBeGreaterThan(0);
    expect(blocked.reset).toBeGreaterThan(0);
  });

  it("tracks rate limits separately across different client identifiers", () => {
    const profile = { limit: 2, windowMs: 1000 };

    checkRateLimit("client-a", profile);
    checkRateLimit("client-a", profile);
    const clientABlocked = checkRateLimit("client-a", profile);
    expect(clientABlocked.success).toBe(false);

    // Client B should still be allowed
    const clientBAllowed = checkRateLimit("client-b", profile);
    expect(clientBAllowed.success).toBe(true);
    expect(clientBAllowed.remaining).toBe(1);
  });

  it("extracts client IP from x-forwarded-for headers", () => {
    const headers = new Headers();
    headers.set("x-forwarded-for", "203.0.113.195, 70.41.3.18");

    const ip = getClientIp(headers);
    expect(ip).toBe("203.0.113.195");
  });

  it("falls back to x-real-ip or 127.0.0.1 when headers are missing", () => {
    const headersWithRealIp = new Headers();
    headersWithRealIp.set("x-real-ip", "198.51.100.42");
    expect(getClientIp(headersWithRealIp)).toBe("198.51.100.42");

    const emptyHeaders = new Headers();
    expect(getClientIp(emptyHeaders)).toBe("127.0.0.1");
  });
});
