/**
 * Town Hall level tiers supported by OPICOC
 */
export type TownHallLevel = 15 | 16 | 17 | 18 | 19;

/**
 * Base layout product public metadata
 */
export interface BaseProduct {
  id: string;
  title: string;
  price: number;
  badge?: string;
  description: string;
  townHall: string;
  townHallLevel: TownHallLevel;
  productImage: string;
  createdBy: string;
  maxSell: number;
  seasonStartDate?: string;
  seasonEndDate?: string;
  validityDays?: number;
}

/**
 * Protected digital delivery layout link
 */
export interface BaseLayoutLink {
  id: string;
  label: string;
  url: string;
}

/**
 * Shopping cart item
 */
export interface CartItem {
  id: string;
  title: string;
  price: number;
  productImage: string;
  townHall: string;
}

/**
 * User account role
 */
export type UserRole = "user" | "admin" | "builder";

/**
 * Authenticated user profile
 */
export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
  avatarUrl?: string;
}

/**
 * Customer review
 */
export interface CustomerReview {
  id: string;
  rating: number;
  reviewText: string;
  firstName: string;
  lastName: string;
  userImage?: string;
  createdAt: string;
  isVerifiedBuyer?: boolean;
}

/**
 * Purchased base with protected layout links
 */
export interface PurchasedBase {
  id: string;
  orderId: string;
  baseId: string;
  title: string;
  townHall: string;
  productImage: string;
  price: number;
  purchasedAt: string;
  links: BaseLayoutLink[];
}

/**
 * Status of custom base design request
 */
export type CustomRequestStatus = "pending" | "in_progress" | "completed" | "rejected";

/**
 * Custom base design commission request
 */
export interface CustomBaseRequest {
  id: string;
  userId: string;
  userName?: string;
  userEmail?: string;
  townHall: string;
  defenseFocus: string;
  requirements: string;
  referenceImage?: string;
  priority: "standard" | "express";
  status: CustomRequestStatus;
  createdAt: string;
  builderNotes?: string;
  completedLayoutUrl?: string;
}

/**
 * Support / Contact message received from contact form
 */
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  repliedAt?: string;
  replyText?: string;
}

/**
 * Newsletter subscriber record
 */
export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  status: "active" | "unsubscribed";
}

/**
 * Registered user account for administrative management
 */
export interface AdminUserAccount {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "user" | "admin";
  avatarUrl?: string;
  createdAt: string;
  lastLoginAt?: string;
  isVerified: boolean;
}

/**
 * Dashboard aggregate metric statistics
 */
export interface AdminMetricStats {
  totalBases: number;
  pendingRequests: number;
  unreadMessages: number;
  totalSubscribers: number;
  totalUsers: number;
  totalRevenueEst: number;
}

/**
 * Dynamic Homepage CMS Configuration (Editable by Admin)
 */
export interface HomepageConfig {
  hero: {
    announcement: string;
    headline: string;
    headlineHighlight: string;
    subheading: string;
    bannerImage: string;
  };
  video: {
    tag: string;
    title: string;
    description: string;
    videoUrl: string;
    posterImage: string;
    youtubeChannelUrl: string;
    metaLabel: string;
  };
  showdown: {
    tag: string;
    title: string;
    description: string;
    bannerImage: string;
    ctaText: string;
    ctaLink: string;
  };
}

