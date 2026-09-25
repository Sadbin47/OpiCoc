import { z } from "zod";
import { sanitizeInput } from "@/lib/security";

/**
 * Reusable sanitized text schema transformer
 */
export const sanitizedString = (min: number = 1, max: number = 2000) =>
  z
    .string()
    .min(min, `Must be at least ${min} character(s).`)
    .max(max, `Must not exceed ${max} characters.`)
    .transform((val) => sanitizeInput(val));

/**
 * Reusable strict email schema transformer
 */
export const strictEmail = z
  .string()
  .trim()
  .toLowerCase()
  .email("Invalid email address format.")
  .max(255, "Email address must not exceed 255 characters.");

/**
 * Contact Message Schema
 */
export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must not exceed 100 characters.")
    .transform((val) => sanitizeInput(val)),
  email: strictEmail,
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters.")
    .max(200, "Subject must not exceed 200 characters.")
    .transform((val) => sanitizeInput(val)),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters.")
    .max(3000, "Message must not exceed 3000 characters.")
    .transform((val) => sanitizeInput(val)),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;

/**
 * Newsletter Subscription Schema
 */
export const NewsletterSubscribeSchema = z.object({
  email: strictEmail,
});

export type NewsletterSubscribeData = z.infer<typeof NewsletterSubscribeSchema>;

/**
 * Cart Item & Checkout Schema
 */
export const CheckoutItemSchema = z.object({
  baseId: z.string().min(1, "Base ID is required."),
  priceCents: z.number().int().positive("Price must be a positive integer."),
  title: z
    .string()
    .min(1)
    .max(200)
    .transform((val) => sanitizeInput(val)),
});

export const CheckoutPayloadSchema = z.object({
  items: z
    .array(CheckoutItemSchema)
    .min(1, "Cart must contain at least one item.")
    .max(50, "Cart cannot exceed 50 items per checkout transaction."),
  paymentProvider: z.enum(["STRIPE", "PAYPAL", "SIMULATED"]).default("SIMULATED"),
  paymentId: z.string().max(255).optional(),
});

export type CheckoutPayload = z.infer<typeof CheckoutPayloadSchema>;

/**
 * Custom Base Order Request Schema
 */
export const CustomBaseRequestSchema = z.object({
  townHallLevel: z
    .number()
    .int()
    .refine((val) => [15, 16, 17, 18].includes(val), {
      message: "Town Hall level must be 15, 16, 17, or 18.",
    }),
  defenseFocus: z
    .string()
    .max(100)
    .optional()
    .transform((val) => (val ? sanitizeInput(val) : "Anti-3 Star Competitive")),
  requirements: z
    .string()
    .min(10, "Requirements must be at least 10 characters.")
    .max(2000, "Requirements must not exceed 2000 characters.")
    .transform((val) => sanitizeInput(val)),
  priority: z.enum(["STANDARD", "EXPRESS"]).default("STANDARD"),
  referenceImageUrl: z.string().url("Invalid image URL format.").optional().or(z.literal("")),
});

export type CustomBaseRequestData = z.infer<typeof CustomBaseRequestSchema>;

/**
 * Authentication Credentials Schemas
 */
export const LoginSchema = z.object({
  email: strictEmail,
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(128, "Password must not exceed 128 characters."),
});

export const RegistrationSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters.")
    .max(50, "First name must not exceed 50 characters.")
    .transform((val) => sanitizeInput(val)),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters.")
    .max(50, "Last name must not exceed 50 characters.")
    .transform((val) => sanitizeInput(val)),
  email: strictEmail,
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(128, "Password must not exceed 128 characters."),
});

export const VerifyOtpSchema = z.object({
  email: strictEmail,
  otp: z
    .string()
    .regex(/^\d{6}$/, "Verification code must be exactly 6 digits."),
});

export const ResetPasswordSchema = z.object({
  email: strictEmail,
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(128, "Password must not exceed 128 characters."),
  token: z.string().optional(),
});
