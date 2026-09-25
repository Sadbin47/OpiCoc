import {
  TownHallTierEntity,
  BaseEntity,
  BaseLayoutLinkEntity,
  UserEntity,
  OrderEntity,
  OrderItemEntity,
  CustomBaseRequestEntity,
  ContactMessageEntity,
  NewsletterSubscriberEntity,
  ReviewEntity,
} from "./schema";

/**
 * Verified Town Hall Tiers Seed (relational normalization of legacy comma-separated string)
 */
const SEED_TIERS: TownHallTierEntity[] = [
  { id: "th18", level: 18, name: "Town Hall 18", isActive: true, displayOrder: 1 },
  { id: "th17", level: 17, name: "Town Hall 17", isActive: true, displayOrder: 2 },
  { id: "th16", level: 16, name: "Town Hall 16", isActive: true, displayOrder: 3 },
  { id: "th15", level: 15, name: "Town Hall 15", isActive: true, displayOrder: 4 },
];

/**
 * Normalized Base Layouts Seed
 */
const SEED_BASES: BaseEntity[] = [
  {
    id: "69ad8e939e02deab05921114",
    slug: "th17-best-cwl-base-this-season",
    title: "TH17 BEST CWL Base This Season",
    priceCents: 4600, // $46.00
    badge: "1x3",
    description:
      "Engineered to defend against the most popular Town Hall 17 meta attack strategies in Clash of Clans. A high-efficiency anti-3 star layout designed for Clan War League dominance.",
    townHallId: "th17",
    townHallLevel: 17,
    coverImageUrl: "https://iili.io/q6FV8ut.md.png",
    maxSell: 100,
    salesCount: 24,
    seasonStartDate: "2026-03-08T00:00:00.000Z",
    seasonEndDate: "2026-05-07T00:00:00.000Z",
    isActive: true,
    createdByUserId: "usr-admin-01",
    createdAt: "2026-03-08T00:00:00.000Z",
    updatedAt: "2026-03-08T00:00:00.000Z",
  },
  {
    id: "69a729c46b2ef896c319aa73",
    slug: "th18-best-base-for-esports-tournament",
    title: "TH18 Best Base For Esports Tournament [Anti Ground & Flying]",
    priceCents: 4800, // $48.00
    badge: "1x3",
    description:
      "Hard-mode verified esports tournament layout. Features asymmetrical trap corridors and compartmentalized core defense against Super Archers, Dragons, and Root Riders.",
    townHallId: "th18",
    townHallLevel: 18,
    coverImageUrl: "https://iili.io/q6Fiihu.md.png",
    maxSell: 100,
    salesCount: 42,
    seasonStartDate: "2026-03-01T00:00:00.000Z",
    seasonEndDate: "2026-06-29T00:00:00.000Z",
    isActive: true,
    createdByUserId: "usr-admin-01",
    createdAt: "2026-03-01T00:00:00.000Z",
    updatedAt: "2026-03-01T00:00:00.000Z",
  },
  {
    id: "69a485e3717516d14d5e2bc2",
    slug: "th-18-anti-ground-pushing-base-for-this-season",
    title: "TH-18 Anti-Ground Pushing Base For This Season",
    priceCents: 6000, // $60.00
    badge: "1x5",
    description:
      "Complete 5-base defensive push pack engineered for top 200 Legend League play. Rotates defense setups to thwart scouting attacks and preserve maximum trophies.",
    townHallId: "th18",
    townHallLevel: 18,
    coverImageUrl: "https://iili.io/qqGBeX1.md.png",
    maxSell: 80,
    salesCount: 31,
    seasonStartDate: "2026-03-01T00:00:00.000Z",
    seasonEndDate: "2026-04-29T00:00:00.000Z",
    isActive: true,
    createdByUserId: "usr-admin-01",
    createdAt: "2026-03-01T00:00:00.000Z",
    updatedAt: "2026-03-01T00:00:00.000Z",
  },
  {
    id: "69a7247d6a150119dd422a93",
    slug: "th18-clan-war-league-base-pack",
    title: "TH18 Clan War League Base Pack",
    priceCents: 3500, // $35.00
    badge: "1x3",
    description:
      "Tailored for Champion League CWL wars. Maximum star denial routing that forces time-fails and sub-optimal hero pathing under heavy defensive fire.",
    townHallId: "th18",
    townHallLevel: 18,
    coverImageUrl: "https://iili.io/q6Fbun9.md.png",
    maxSell: 100,
    salesCount: 19,
    seasonStartDate: "2026-03-01T00:00:00.000Z",
    seasonEndDate: "2026-03-29T00:00:00.000Z",
    isActive: true,
    createdByUserId: "usr-admin-01",
    createdAt: "2026-03-01T00:00:00.000Z",
    updatedAt: "2026-03-01T00:00:00.000Z",
  },
  {
    id: "69a748e4b78bc58034205eee",
    slug: "th-15-pushing-base-for-this-season",
    title: "TH 15 Pushing Base For This Season",
    priceCents: 2000, // $20.00
    badge: "1x1",
    description:
      "Reliable Town Hall 15 defensive fortress tuned for Titan and Legend pushers. Tested against all standard zap smash, s-archer, and hybrid compositions.",
    townHallId: "th15",
    townHallLevel: 15,
    coverImageUrl: "https://iili.io/q6F2QXS.md.png",
    maxSell: 50,
    salesCount: 14,
    seasonStartDate: "2026-03-01T00:00:00.000Z",
    seasonEndDate: "2026-04-15T00:00:00.000Z",
    isActive: true,
    createdByUserId: "usr-admin-01",
    createdAt: "2026-03-01T00:00:00.000Z",
    updatedAt: "2026-03-01T00:00:00.000Z",
  },
];

/**
 * Protected Supercell Layout Links Seed (strictly decoupled from public product catalogue)
 */
const SEED_LAYOUT_LINKS: BaseLayoutLinkEntity[] = [
  {
    id: "lnk-cwl-17-01",
    baseId: "69ad8e939e02deab05921114",
    label: "Layout 1 (Main CWL Defense)",
    supercellUrl: "https://link.clashofclans.com/en/?action=OpenLayout&id=TH17-CWL-PRO-01",
    sortOrder: 1,
    createdAt: "2026-03-08T00:00:00.000Z",
  },
  {
    id: "lnk-cwl-17-02",
    baseId: "69ad8e939e02deab05921114",
    label: "Layout 2 (Anti-Blimp Variation)",
    supercellUrl: "https://link.clashofclans.com/en/?action=OpenLayout&id=TH17-CWL-PRO-02",
    sortOrder: 2,
    createdAt: "2026-03-08T00:00:00.000Z",
  },
  {
    id: "lnk-esp-18-01",
    baseId: "69a729c46b2ef896c319aa73",
    label: "Layout 1 (Esports Tournament Anti-Air)",
    supercellUrl: "https://link.clashofclans.com/en/?action=OpenLayout&id=TH18-ESPORTS-01",
    sortOrder: 1,
    createdAt: "2026-03-01T00:00:00.000Z",
  },
  {
    id: "lnk-esp-18-02",
    baseId: "69a729c46b2ef896c319aa73",
    label: "Layout 2 (Esports Tournament Anti-Smash)",
    supercellUrl: "https://link.clashofclans.com/en/?action=OpenLayout&id=TH18-ESPORTS-02",
    sortOrder: 2,
    createdAt: "2026-03-01T00:00:00.000Z",
  },
  {
    id: "lnk-push-18-01",
    baseId: "69a485e3717516d14d5e2bc2",
    label: "Layout 1 (Core Box Defense)",
    supercellUrl: "https://link.clashofclans.com/en/?action=OpenLayout&id=TH18-PUSH-01",
    sortOrder: 1,
    createdAt: "2026-03-01T00:00:00.000Z",
  },
  {
    id: "lnk-push-18-02",
    baseId: "69a485e3717516d14d5e2bc2",
    label: "Layout 2 (Ring Isolation Trap)",
    supercellUrl: "https://link.clashofclans.com/en/?action=OpenLayout&id=TH18-PUSH-02",
    sortOrder: 2,
    createdAt: "2026-03-01T00:00:00.000Z",
  },
  {
    id: "lnk-cwl-18-01",
    baseId: "69a7247d6a150119dd422a93",
    label: "Layout 1 (CWL Anti-2 Star Core)",
    supercellUrl: "https://link.clashofclans.com/en/?action=OpenLayout&id=TH18-CWL-CHAMP-01",
    sortOrder: 1,
    createdAt: "2026-03-01T00:00:00.000Z",
  },
  {
    id: "lnk-push-15-01",
    baseId: "69a748e4b78bc58034205eee",
    label: "Layout 1 (Classic Anti-3 Ring)",
    supercellUrl: "https://link.clashofclans.com/en/?action=OpenLayout&id=TH15-PUSH-01",
    sortOrder: 1,
    createdAt: "2026-03-01T00:00:00.000Z",
  },
];

/**
 * Users Seed
 */
const SEED_USERS: UserEntity[] = [
  {
    id: "usr-admin-01",
    firstName: "OPICOC",
    lastName: "Admin",
    email: "admin@opicoc.cc",
    role: "ADMIN",
    isVerified: true,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "usr-demo-01",
    firstName: "Chief",
    lastName: "Player",
    email: "player@opicoc.cc",
    role: "USER",
    isVerified: true,
    createdAt: "2026-02-15T00:00:00.000Z",
    updatedAt: "2026-02-15T00:00:00.000Z",
  },
];

/**
 * Completed Orders Seed
 */
const SEED_ORDERS: OrderEntity[] = [
  {
    id: "ord-1001",
    orderNumber: "OPI-2026-1001",
    userId: "usr-demo-01",
    status: "PAID",
    totalCents: 4600,
    currency: "USD",
    paymentProvider: "STRIPE",
    paymentId: "pi_mock_3NqL2",
    createdAt: "2026-03-10T14:22:00.000Z",
  },
];

const SEED_ORDER_ITEMS: OrderItemEntity[] = [
  {
    id: "item-1001-1",
    orderId: "ord-1001",
    baseId: "69ad8e939e02deab05921114",
    priceCents: 4600,
  },
];

/**
 * Relational In-Memory Database Store (Client Repository)
 */
class RelationalDatabaseStore {
  private tiers: TownHallTierEntity[] = [...SEED_TIERS];
  private bases: BaseEntity[] = [...SEED_BASES];
  private layoutLinks: BaseLayoutLinkEntity[] = [...SEED_LAYOUT_LINKS];
  private users: UserEntity[] = [...SEED_USERS];
  private orders: OrderEntity[] = [...SEED_ORDERS];
  private orderItems: OrderItemEntity[] = [...SEED_ORDER_ITEMS];
  private customRequests: CustomBaseRequestEntity[] = [];
  private reviews: ReviewEntity[] = [];
  private contactMessages: ContactMessageEntity[] = [];
  private subscribers: NewsletterSubscriberEntity[] = [];

  // --- Town Hall Tiers ---
  async getTownHallTiers(): Promise<TownHallTierEntity[]> {
    return this.tiers.filter((t) => t.isActive).sort((a, b) => a.displayOrder - b.displayOrder);
  }

  // --- Public Base Queries (NO SENSITIVE LINKS EXPOSED) ---
  async getAllBases(): Promise<BaseEntity[]> {
    return this.bases.filter((b) => b.isActive);
  }

  async getBaseById(id: string): Promise<BaseEntity | null> {
    return this.bases.find((b) => b.id === id && b.isActive) || null;
  }

  async getBasesByTownHallLevel(level: number): Promise<BaseEntity[]> {
    return this.bases.filter((b) => b.townHallLevel === level && b.isActive);
  }

  // --- Protected Digital Goods Delivery ---
  /**
   * Only returns digital layout links if the user has a verified PAID order for the given base.
   */
  async getPurchasedLayoutLinks(baseId: string, userId: string): Promise<BaseLayoutLinkEntity[] | null> {
    // 1. Verify user purchased this base
    const userOrders = this.orders.filter((o) => o.userId === userId && o.status === "PAID");
    const orderIds = userOrders.map((o) => o.id);

    const hasPurchased = this.orderItems.some(
      (item) => orderIds.includes(item.orderId) && item.baseId === baseId
    );

    // Also allow ADMIN role to inspect
    const user = this.users.find((u) => u.id === userId);
    const isAdmin = user?.role === "ADMIN";

    if (!hasPurchased && !isAdmin) {
      return null; // Not authorized / Not purchased
    }

    // Return the protected links
    return this.layoutLinks
      .filter((l) => l.baseId === baseId)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }

  // --- Orders & Checkout ---
  async createOrder(params: {
    userId: string;
    items: { baseId: string; priceCents: number }[];
    paymentProvider: string;
    paymentId?: string;
  }): Promise<{ order: OrderEntity; deliveredLinks: { baseId: string; links: BaseLayoutLinkEntity[] }[] }> {
    const totalCents = params.items.reduce((sum, item) => sum + item.priceCents, 0);
    const orderId = `ord-${Date.now()}`;
    const orderNumber = `OPI-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: OrderEntity = {
      id: orderId,
      orderNumber,
      userId: params.userId,
      status: "PAID",
      totalCents,
      currency: "USD",
      paymentProvider: params.paymentProvider,
      paymentId: params.paymentId || `pay-${Math.random().toString(36).substring(2, 8)}`,
      createdAt: new Date().toISOString(),
    };

    this.orders.unshift(newOrder);

    const deliveredLinks: { baseId: string; links: BaseLayoutLinkEntity[] }[] = [];

    for (const item of params.items) {
      const orderItemId = `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      this.orderItems.push({
        id: orderItemId,
        orderId,
        baseId: item.baseId,
        priceCents: item.priceCents,
      });

      // Increment base sales count
      const baseIndex = this.bases.findIndex((b) => b.id === item.baseId);
      if (baseIndex !== -1) {
        this.bases[baseIndex].salesCount += 1;
      }

      const links = this.layoutLinks.filter((l) => l.baseId === item.baseId);
      deliveredLinks.push({ baseId: item.baseId, links });
    }

    return { order: newOrder, deliveredLinks };
  }

  // --- Users ---
  async getUserById(id: string): Promise<UserEntity | null> {
    return this.users.find((u) => u.id === id) || null;
  }

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    return this.users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
  }

  async updateUser(id: string, updates: Partial<UserEntity>): Promise<UserEntity | null> {
    const idx = this.users.findIndex((u) => u.id === id);
    if (idx === -1) return null;
    this.users[idx] = { ...this.users[idx], ...updates, updatedAt: new Date().toISOString() };
    return this.users[idx];
  }

  // --- Contact Messages ---
  async createContactMessage(msg: Omit<ContactMessageEntity, "id" | "isRead" | "createdAt" | "updatedAt">): Promise<ContactMessageEntity> {
    const newMsg: ContactMessageEntity = {
      ...msg,
      id: `msg-${Date.now()}`,
      isRead: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.contactMessages.unshift(newMsg);
    return newMsg;
  }

  // --- Subscribers ---
  async addSubscriber(email: string): Promise<{ subscriber: NewsletterSubscriberEntity; isNew: boolean }> {
    const normalized = email.toLowerCase().trim();
    const existing = this.subscribers.find((s) => s.email === normalized);
    if (existing) {
      return { subscriber: existing, isNew: false };
    }
    const newSub: NewsletterSubscriberEntity = {
      id: `sub-${Date.now()}`,
      email: normalized,
      status: "ACTIVE",
      unsubscribeToken: `unsub-${Math.random().toString(36).substring(2, 10)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.subscribers.unshift(newSub);
    return { subscriber: newSub, isNew: true };
  }
}

// Global Singleton Database Store
export const db = new RelationalDatabaseStore();
