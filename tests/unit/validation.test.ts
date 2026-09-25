import { describe, it, expect } from "vitest";
import {
  ContactFormSchema,
  NewsletterSubscribeSchema,
  CheckoutPayloadSchema,
  CustomBaseRequestSchema,
  LoginSchema,
  RegistrationSchema,
  VerifyOtpSchema,
} from "@/lib/validation";

describe("Zod Validation & Sanitization Schemas", () => {
  describe("ContactFormSchema", () => {
    it("validates and sanitizes a valid contact message", () => {
      const result = ContactFormSchema.safeParse({
        name: "Chief <script>alert(1)</script>Alex",
        email: "ALEX@TEST.COM",
        subject: "CWL Base Layouts",
        message: "We need 5 competitive bases for Champions League Season.",
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe("Chief Alex");
        expect(result.data.email).toBe("alex@test.com");
        expect(result.data.subject).toBe("CWL Base Layouts");
      }
    });

    it("rejects invalid email and too short message", () => {
      const result = ContactFormSchema.safeParse({
        name: "A",
        email: "not-an-email",
        subject: "No",
        message: "Hi",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.name).toBeDefined();
        expect(errors.email).toBeDefined();
        expect(errors.subject).toBeDefined();
        expect(errors.message).toBeDefined();
      }
    });
  });

  describe("NewsletterSubscribeSchema", () => {
    it("normalizes email to lowercase", () => {
      const result = NewsletterSubscribeSchema.safeParse({
        email: "WAR_CHIEF@OPICOC.CC  ",
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe("war_chief@opicoc.cc");
      }
    });

    it("rejects malformed email strings", () => {
      expect(NewsletterSubscribeSchema.safeParse({ email: "invalid" }).success).toBe(false);
      expect(NewsletterSubscribeSchema.safeParse({ email: "@domain.com" }).success).toBe(false);
    });
  });

  describe("CheckoutPayloadSchema", () => {
    it("accepts valid checkout order with items and payment provider", () => {
      const result = CheckoutPayloadSchema.safeParse({
        items: [
          { baseId: "base-th18-01", priceCents: 4800, title: "TH18 CWL Pack" },
          { baseId: "base-th17-02", priceCents: 4600, title: "TH17 Anti-Air" },
        ],
        paymentProvider: "STRIPE",
        paymentId: "pi_test_123456789",
      });

      expect(result.success).toBe(true);
    });

    it("rejects empty items cart", () => {
      const result = CheckoutPayloadSchema.safeParse({
        items: [],
      });

      expect(result.success).toBe(false);
    });

    it("rejects negative or fractional price tampering", () => {
      const negativeResult = CheckoutPayloadSchema.safeParse({
        items: [{ baseId: "base-01", priceCents: -100, title: "Attack" }],
      });
      expect(negativeResult.success).toBe(false);

      const floatResult = CheckoutPayloadSchema.safeParse({
        items: [{ baseId: "base-01", priceCents: 48.5, title: "Attack" }],
      });
      expect(floatResult.success).toBe(false);
    });
  });

  describe("CustomBaseRequestSchema", () => {
    it("validates Town Hall levels 15 to 18", () => {
      [15, 16, 17, 18].forEach((th) => {
        const res = CustomBaseRequestSchema.safeParse({
          townHallLevel: th,
          requirements: "Custom war layout specifically tested against Root Rider attacks.",
        });
        expect(res.success).toBe(true);
      });
    });

    it("rejects unsupported Town Hall levels like TH11 or TH20", () => {
      expect(
        CustomBaseRequestSchema.safeParse({
          townHallLevel: 11,
          requirements: "TH11 custom base please.",
        }).success
      ).toBe(false);
    });
  });

  describe("Authentication Schemas", () => {
    it("requires at least 6 characters for login password", () => {
      expect(LoginSchema.safeParse({ email: "a@b.com", password: "123" }).success).toBe(false);
      expect(LoginSchema.safeParse({ email: "a@b.com", password: "secret123" }).success).toBe(true);
    });

    it("requires at least 8 characters for registration password", () => {
      const weak = RegistrationSchema.safeParse({
        firstName: "Marcus",
        lastName: "V",
        email: "marcus@test.com",
        password: "1234567",
      });
      expect(weak.success).toBe(false);

      const strong = RegistrationSchema.safeParse({
        firstName: "Marcus",
        lastName: "Vance",
        email: "marcus@test.com",
        password: "SecurePassword123!",
      });
      expect(strong.success).toBe(true);
    });

    it("enforces 6-digit numeric OTP format", () => {
      expect(VerifyOtpSchema.safeParse({ email: "a@b.com", otp: "123456" }).success).toBe(true);
      expect(VerifyOtpSchema.safeParse({ email: "a@b.com", otp: "12345" }).success).toBe(false);
      expect(VerifyOtpSchema.safeParse({ email: "a@b.com", otp: "abcdef" }).success).toBe(false);
    });
  });
});
