import { describe, it, expect } from "vitest";
import {
  buildContentSecurityPolicy,
  getSecurityHeaders,
  sanitizeInput,
} from "@/lib/security";

describe("Security Hardening & Utilities", () => {
  it("builds a production Content Security Policy with strict directives", () => {
    const csp = buildContentSecurityPolicy(false);

    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("base-uri 'self'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("upgrade-insecure-requests");
    expect(csp).not.toContain("'unsafe-eval'");
  });

  it("permits unsafe-eval only in development mode for debugging", () => {
    const devCsp = buildContentSecurityPolicy(true);
    expect(devCsp).toContain("'unsafe-eval'");
    expect(devCsp).not.toContain("upgrade-insecure-requests");
  });

  it("exports all enterprise HTTP security headers", () => {
    const headers = getSecurityHeaders(false);

    expect(headers["Content-Security-Policy"]).toBeDefined();
    expect(headers["Strict-Transport-Security"]).toBe("max-age=63072000; includeSubDomains; preload");
    expect(headers["X-Frame-Options"]).toBe("DENY");
    expect(headers["X-Content-Type-Options"]).toBe("nosniff");
    expect(headers["Referrer-Policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["Cross-Origin-Opener-Policy"]).toBe("same-origin");
    expect(headers["X-DNS-Prefetch-Control"]).toBe("on");
  });

  it("sanitizes malicious script injections from user input", () => {
    const dirty = "<script>alert('pwned')</script>Hello World";
    const cleaned = sanitizeInput(dirty);

    expect(cleaned).toBe("Hello World");
    expect(cleaned).not.toContain("<script>");
  });

  it("sanitizes iframe and style embeddings", () => {
    const dirty = '<iframe src="//evil.com"></iframe><style>body{display:none}</style>Safe Content';
    const cleaned = sanitizeInput(dirty);

    expect(cleaned).toBe("Safe Content");
    expect(cleaned).not.toContain("<iframe>");
    expect(cleaned).not.toContain("<style>");
  });

  it("strips null-bytes and non-printable control characters", () => {
    const dirty = "User\0Name\x08With\x1FChars";
    const cleaned = sanitizeInput(dirty);

    expect(cleaned).toBe("UserNameWithChars");
  });
});
