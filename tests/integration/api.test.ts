import { describe, it, expect, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { POST as contactHandler } from "@/app/api/contact/route";
import { POST as newsletterHandler } from "@/app/api/newsletter/subscribe/route";
import { POST as checkoutHandler } from "@/app/api/cart/checkout/route";
import { GET as layoutLinksHandler } from "@/app/api/bases/[id]/links/route";
import { resetRateLimiter } from "@/lib/rateLimit";

describe("API Route Handlers Integration", () => {
  beforeEach(() => {
    resetRateLimiter();
  });

  describe("POST /api/contact", () => {
    it("persists a valid contact inquiry and returns HTTP 201", async () => {
      const req = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.1" },
        body: JSON.stringify({
          name: "Chief Bradley",
          email: "bradley@clash.cc",
          subject: "TH18 CWL Inquiry",
          message: "Looking for customized anti-3 star CWL layouts for the upcoming season.",
        }),
      });

      const res = await contactHandler(req);
      const json = await res.json();

      expect(res.status).toBe(201);
      expect(json.success).toBe(true);
      expect(json.messageId).toBeDefined();
    });

    it("returns HTTP 400 when required fields fail validation", async () => {
      const req = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.2" },
        body: JSON.stringify({
          name: "",
          email: "invalid-email",
          subject: "",
          message: "short",
        }),
      });

      const res = await contactHandler(req);
      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error).toBe("Validation failed.");
    });

    it("triggers HTTP 429 when rate limit is exceeded", async () => {
      const clientIp = "10.0.0.3";

      // Submit 5 times (allowed)
      for (let i = 0; i < 5; i++) {
        const req = new NextRequest("http://localhost:3000/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-forwarded-for": clientIp },
          body: JSON.stringify({
            name: "Spam Bot",
            email: "spam@bot.net",
            subject: "Spam Inquiry",
            message: "Automated submission payload message.",
          }),
        });
        const res = await contactHandler(req);
        expect(res.status).toBe(201);
      }

      // 6th submission must trigger 429
      const blockedReq = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forwarded-for": clientIp },
        body: JSON.stringify({
          name: "Spam Bot",
          email: "spam@bot.net",
          subject: "Spam Inquiry",
          message: "Automated submission payload message.",
        }),
      });

      const blockedRes = await contactHandler(blockedReq);
      expect(blockedRes.status).toBe(429);
      expect(blockedRes.headers.get("Retry-After")).toBeDefined();
    });
  });

  describe("POST /api/newsletter/subscribe", () => {
    it("registers new subscriber successfully and returns HTTP 200", async () => {
      const req = new NextRequest("http://localhost:3000/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.4" },
        body: JSON.stringify({ email: "pro_pusher@gmail.com" }),
      });

      const res = await newsletterHandler(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.subscriberId).toBeDefined();
    });

    it("returns HTTP 400 on malformed email address", async () => {
      const req = new NextRequest("http://localhost:3000/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.5" },
        body: JSON.stringify({ email: "invalid-email-address" }),
      });

      const res = await newsletterHandler(req);
      expect(res.status).toBe(400);
    });
  });

  describe("POST /api/cart/checkout", () => {
    it("rejects unauthenticated checkout requests with HTTP 401", async () => {
      const req = new NextRequest("http://localhost:3000/api/cart/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [{ baseId: "base-01", priceCents: 4600, title: "CWL Base" }],
        }),
      });

      const res = await checkoutHandler(req);
      expect(res.status).toBe(401);
      const json = await res.json();
      expect(json.error).toContain("Authentication required");
    });
  });

  describe("GET /api/bases/[id]/links", () => {
    it("protects layout download link from unauthenticated access with HTTP 401", async () => {
      const req = new NextRequest("http://localhost:3000/api/bases/base-01/links", {
        method: "GET",
      });

      const res = await layoutLinksHandler(req, {
        params: Promise.resolve({ id: "base-01" }),
      });

      expect(res.status).toBe(401);
      const json = await res.json();
      expect(json.code).toBe("UNAUTHENTICATED");
    });
  });
});
