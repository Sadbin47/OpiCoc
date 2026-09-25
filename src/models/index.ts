/**
 * Domain Models, Entity Schemas, and Data Structures
 * Centralized Model Layer for OPICOC Platform (MVC Architecture)
 */

// 1. Domain Entities & Value Types
export * from "@/types";

// 2. Validation Schemas & Input Transfer Models
export {
  ContactFormSchema,
  NewsletterSubscribeSchema,
  CheckoutPayloadSchema,
  CheckoutItemSchema,
  CustomBaseRequestSchema,
  LoginSchema,
  RegistrationSchema,
  VerifyOtpSchema,
  ResetPasswordSchema,
  type ContactFormData,
  type NewsletterSubscribeData,
  type CheckoutPayload,
  type CustomBaseRequestData,
} from "@/lib/validation";

export {
  loginSchema,
  registrationSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyOtpSchema,
} from "@/features/auth/schemas/authSchemas";

// 3. Database Entity Definitions & Prisma Schema Types
export type {
  TownHallTierEntity,
  UserEntity,
} from "@/db/schema";
