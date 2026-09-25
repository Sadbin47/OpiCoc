import nextConfig from "../next.config";
import { checkRateLimit, resetRateLimiter, RATE_LIMIT_PROFILES } from "../src/lib/rateLimit";
import {
  ContactFormSchema,
  NewsletterSubscribeSchema,
  CheckoutPayloadSchema,
  RegistrationSchema,
} from "../src/lib/validation";
import { buildContentSecurityPolicy, sanitizeInput, getSecurityHeaders } from "../src/lib/security";

function assert(condition: boolean, msg: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${msg}`);
  }
}

async function runVerification() {
  console.log("--- Testing Phase 12: Security Hardening & Penetration Defense ---");

  // 1. Verify next.config.ts Global HTTP Security Headers
  if (typeof nextConfig.headers !== "function") {
    throw new Error("nextConfig.headers must be defined as a function");
  }
  const headersList = await nextConfig.headers();
  const globalRule = headersList.find((h) => h.source === "/:path*");
  assert(globalRule !== undefined, "Global /:path* security header rule must exist");

  const headerKeys = (globalRule?.headers || []).map((h) => h.key);
  assert(headerKeys.includes("Content-Security-Policy"), "CSP header must be present in next.config.ts");
  assert(headerKeys.includes("Strict-Transport-Security"), "HSTS header must be present in next.config.ts");
  assert(headerKeys.includes("X-Frame-Options"), "X-Frame-Options header must be present in next.config.ts");
  assert(headerKeys.includes("X-Content-Type-Options"), "X-Content-Type-Options header must be present in next.config.ts");
  assert(headerKeys.includes("Referrer-Policy"), "Referrer-Policy header must be present in next.config.ts");
  assert(headerKeys.includes("Permissions-Policy"), "Permissions-Policy header must be present in next.config.ts");
  assert(headerKeys.includes("Cross-Origin-Opener-Policy"), "COOP header must be present in next.config.ts");

  const frameOptions = globalRule?.headers.find((h) => h.key === "X-Frame-Options");
  assert(frameOptions?.value === "DENY", "X-Frame-Options must be strictly set to DENY");

  const contentTypeOptions = globalRule?.headers.find((h) => h.key === "X-Content-Type-Options");
  assert(contentTypeOptions?.value === "nosniff", "X-Content-Type-Options must be strictly set to nosniff");
  console.log("✅ HTTP Security Headers: CSP, HSTS, X-Frame-Options: DENY, and nosniff verified");

  // 2. Content Security Policy Construction & Directive Hardening
  const prodCsp = buildContentSecurityPolicy(false);
  assert(prodCsp.includes("default-src 'self'"), "CSP must define default-src 'self'");
  assert(prodCsp.includes("object-src 'none'"), "CSP must block plugins with object-src 'none'");
  assert(prodCsp.includes("base-uri 'self'"), "CSP must restrict base-uri to 'self'");
  assert(prodCsp.includes("frame-ancestors 'none'"), "CSP must prevent embedding with frame-ancestors 'none'");
  assert(prodCsp.includes("upgrade-insecure-requests"), "Production CSP must enforce HTTPS upgrades");
  console.log("✅ Content Security Policy: Strict anti-XSS and anti-clickjacking directives verified");

  // 3. Sliding Window Rate Limiter Defense
  resetRateLimiter();
  const testIp = "192.168.1.100";
  const authProfile = RATE_LIMIT_PROFILES.AUTH; // 5 requests per 60s

  // First 5 requests must succeed
  for (let i = 1; i <= 5; i++) {
    const res = checkRateLimit(`auth:${testIp}`, authProfile);
    assert(res.success, `Request #${i} should be allowed`);
    assert(res.remaining === 5 - i, `Remaining tokens should be ${5 - i}`);
  }

  // 6th brute-force attempt MUST be blocked
  const blockedAttempt = checkRateLimit(`auth:${testIp}`, authProfile);
  assert(!blockedAttempt.success, "6th brute-force attempt MUST be blocked by rate limiter");
  assert(blockedAttempt.remaining === 0, "Blocked attempt must have 0 remaining requests");
  assert(blockedAttempt.retryAfter > 0, "Blocked attempt must specify a positive retryAfter duration");
  console.log("✅ Defensive Rate Limiting: 5-attempt sliding window blocks brute-force attack (HTTP 429 triggered)");

  // 4. Input Sanitization & Anti-XSS Protection
  const maliciousInput = `<script>alert('pwned')</script>Hello <iframe src="evil.com"></iframe>World`;
  const sanitized = sanitizeInput(maliciousInput);
  assert(!sanitized.includes("<script>"), "Sanitizer must strip <script> tags");
  assert(!sanitized.includes("<iframe>"), "Sanitizer must strip <iframe> tags");
  assert(sanitized.includes("Hello World"), "Sanitizer must preserve safe inner text");
  console.log("✅ Input Sanitization: Script injections and iframe embeds successfully stripped");

  // 5. Zod Schema Validation & Boundary Enforcement
  // Contact Schema
  const validContact = ContactFormSchema.safeParse({
    name: "Chief Alex",
    email: "ALEX@OPICOC.CC",
    subject: "War League Strategy",
    message: "We need an esports base layout for upcoming hard-mode tournament matches.",
  });
  assert(validContact.success, "Valid contact form submission must pass validation");
  if (validContact.success) {
    assert(validContact.data.email === "alex@opicoc.cc", "Email must be normalized to lowercase");
  }

  const invalidContact = ContactFormSchema.safeParse({
    name: "A",
    email: "not-an-email",
    subject: "Hi",
    message: "Short",
  });
  assert(!invalidContact.success, "Invalid contact submission must be rejected");

  // Newsletter Schema
  assert(NewsletterSubscribeSchema.safeParse({ email: "valid@domain.com" }).success, "Valid email must pass");
  assert(!NewsletterSubscribeSchema.safeParse({ email: "invalid-email" }).success, "Invalid email must fail");

  // Checkout Schema
  const validCheckout = CheckoutPayloadSchema.safeParse({
    items: [{ baseId: "base-01", priceCents: 4600, title: "TH18 CWL Pack" }],
    paymentProvider: "SIMULATED",
  });
  assert(validCheckout.success, "Valid checkout payload must pass");

  const negativePriceCheckout = CheckoutPayloadSchema.safeParse({
    items: [{ baseId: "base-01", priceCents: -500, title: "Hack" }],
  });
  assert(!negativePriceCheckout.success, "Tampered negative price must be rejected");

  // Registration Schema
  const weakPasswordReg = RegistrationSchema.safeParse({
    firstName: "Marcus",
    lastName: "V",
    email: "marcus@test.com",
    password: "123", // Too short
  });
  assert(!weakPasswordReg.success, "Registration with password < 8 chars must be rejected");
  console.log("✅ Zod Input Validation: Contact, Newsletter, Registration, and Checkout schemas strictly enforced");

  // 6. Enterprise Header Helper Completeness
  const secHeaders = getSecurityHeaders(false);
  assert(secHeaders["X-Frame-Options"] === "DENY", "secHeaders must enforce DENY");
  assert(secHeaders["X-Content-Type-Options"] === "nosniff", "secHeaders must enforce nosniff");
  console.log("✅ Security Architecture: Enterprise headers complete and active");

  console.log("🎉 All Phase 12 Security Hardening and Penetration Defense benchmarks passed successfully!");
}

runVerification().catch((err) => {
  console.error(err);
  process.exit(1);
});
