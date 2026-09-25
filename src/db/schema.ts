import { z } from "zod";

/**
 * Town Hall Tier Schema
 */
export const TownHallTierSchema = z.object({
  id: z.string(), // e.g. "th18"
  level: z.union([
    z.literal(15),
    z.literal(16),
    z.literal(17),
    z.literal(18),
    z.literal(19),
  ]),
  name: z.string(),
  badgeIconUrl: z.string().optional(),
  isActive: z.boolean().default(true),
  displayOrder: z.number().default(0),
});
export type TownHallTierEntity = z.infer<typeof TownHallTierSchema>;

/**
 * User Entity Schema
 */
export const UserEntitySchema = z.object({
  id: z.string(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  passwordHash: z.string().nullable().optional(),
  role: z.enum(["USER", "BUILDER", "ADMIN"]).default("USER"),
  isVerified: z.boolean().default(false),
  avatarUrl: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type UserEntity = z.infer<typeof UserEntitySchema>;

/**
 * Base Layout Product Schema
 */
export const BaseEntitySchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  priceCents: z.number().int().nonnegative(),
  badge: z.string().optional(),
  description: z.string(),
  townHallId: z.string(),
  townHallLevel: z.union([
    z.literal(15),
    z.literal(16),
    z.literal(17),
    z.literal(18),
    z.literal(19),
  ]),
  coverImageUrl: z.string(),
  maxSell: z.number().int().default(100),
  salesCount: z.number().int().default(0),
  seasonStartDate: z.string().optional(),
  seasonEndDate: z.string().optional(),
  isActive: z.boolean().default(true),
  createdByUserId: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type BaseEntity = z.infer<typeof BaseEntitySchema>;

/**
 * Protected Supercell Layout Link Schema
 */
export const BaseLayoutLinkEntitySchema = z.object({
  id: z.string(),
  baseId: z.string(),
  label: z.string(),
  supercellUrl: z
    .string()
    .url()
    .refine((url) => url.startsWith("https://link.clashofclans.com/"), {
      message: "Layout link must be a valid Clash of Clans deep link.",
    }),
  sortOrder: z.number().int().default(0),
  createdAt: z.string(),
});
export type BaseLayoutLinkEntity = z.infer<typeof BaseLayoutLinkEntitySchema>;

/**
 * Order & Order Items Schema
 */
export const OrderEntitySchema = z.object({
  id: z.string(),
  orderNumber: z.string(),
  userId: z.string(),
  status: z.enum(["PENDING", "PAID", "FAILED", "REFUNDED"]),
  totalCents: z.number().int().nonnegative(),
  currency: z.string().default("USD"),
  paymentProvider: z.string(),
  paymentId: z.string().optional(),
  createdAt: z.string(),
});
export type OrderEntity = z.infer<typeof OrderEntitySchema>;

export const OrderItemEntitySchema = z.object({
  id: z.string(),
  orderId: z.string(),
  baseId: z.string(),
  priceCents: z.number().int().nonnegative(),
});
export type OrderItemEntity = z.infer<typeof OrderItemEntitySchema>;

/**
 * Custom Base Request Schema
 */
export const CustomBaseRequestEntitySchema = z.object({
  id: z.string(),
  userId: z.string(),
  townHallLevel: z.number().int(),
  defenseFocus: z.string().optional(),
  requirements: z.string(),
  referenceImageUrl: z.string().optional(),
  priority: z.enum(["STANDARD", "EXPRESS"]).default("STANDARD"),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED", "REJECTED"]).default("PENDING"),
  builderNotes: z.string().optional(),
  completedLayoutUrl: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type CustomBaseRequestEntity = z.infer<typeof CustomBaseRequestEntitySchema>;

/**
 * Review Schema
 */
export const ReviewEntitySchema = z.object({
  id: z.string(),
  userId: z.string(),
  baseId: z.string().optional(),
  rating: z.number().int().min(1).max(5),
  reviewText: z.string(),
  reviewImageUrl: z.string().optional(),
  isVerifiedBuyer: z.boolean().default(false),
  isApproved: z.boolean().default(false),
  createdAt: z.string(),
});
export type ReviewEntity = z.infer<typeof ReviewEntitySchema>;

/**
 * Contact Message Schema
 */
export const ContactMessageEntitySchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  message: z.string(),
  isRead: z.boolean().default(false),
  replyText: z.string().optional(),
  repliedAt: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type ContactMessageEntity = z.infer<typeof ContactMessageEntitySchema>;

/**
 * Newsletter Subscriber Schema
 */
export const NewsletterSubscriberEntitySchema = z.object({
  id: z.string(),
  email: z.string().email(),
  status: z.enum(["ACTIVE", "UNSUBSCRIBED"]).default("ACTIVE"),
  unsubscribeToken: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type NewsletterSubscriberEntity = z.infer<typeof NewsletterSubscriberEntitySchema>;
