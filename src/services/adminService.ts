import {
  BaseProduct,
  BaseLayoutLink,
  CustomBaseRequest,
  ContactMessage,
  NewsletterSubscriber,
  AdminUserAccount,
  AdminMetricStats,
} from "@/types";

// Seed Bases for Admin Management
const SEED_BASES: (BaseProduct & { links: BaseLayoutLink[] })[] = [
  {
    id: "69ad8e939e02deab05921114",
    title: "TH17 BEST CWL Base This Season",
    price: 46,
    badge: "1x3",
    description:
      "Engineered to defend against the most popular Town Hall 17 meta attack strategies in Clash of Clans. A high-efficiency anti-3 star layout designed for Clan War League dominance.",
    townHall: "Town Hall 17",
    townHallLevel: 17,
    productImage: "https://iili.io/q6FV8ut.md.png",
    createdBy: "OPICOC Pro Builders",
    maxSell: 100,
    seasonStartDate: "2026-03-08T00:00:00.000Z",
    seasonEndDate: "2026-05-07T00:00:00.000Z",
    validityDays: 42,
    links: [
      {
        id: "th17-cwl-01",
        label: "Layout 1 (Main CWL Defense)",
        url: "https://link.clashofclans.com/en/?action=OpenLayout&id=TH17-CWL-PRO-01",
      },
      {
        id: "th17-cwl-02",
        label: "Layout 2 (Anti-Blimp Variation)",
        url: "https://link.clashofclans.com/en/?action=OpenLayout&id=TH17-CWL-PRO-02",
      },
    ],
  },
  {
    id: "69a729c46b2ef896c319aa73",
    title: "TH18 Best Base For Esports Tournament [Anti Ground & Flying]",
    price: 48,
    badge: "1x3",
    description:
      "Hard-mode verified esports tournament layout. Features asymmetrical trap corridors and compartmentalized core defense against Super Archers, Dragons, and Root Riders.",
    townHall: "Town Hall 18",
    townHallLevel: 18,
    productImage: "https://iili.io/q6Fiihu.md.png",
    createdBy: "OPICOC Pro Builders",
    maxSell: 100,
    seasonStartDate: "2026-03-01T00:00:00.000Z",
    seasonEndDate: "2026-06-29T00:00:00.000Z",
    validityDays: 95,
    links: [
      {
        id: "th18-esp-01",
        label: "Layout 1 (Esports Tournament Anti-Air)",
        url: "https://link.clashofclans.com/en/?action=OpenLayout&id=TH18-ESPORTS-01",
      },
      {
        id: "th18-esp-02",
        label: "Layout 2 (Esports Tournament Anti-Smash)",
        url: "https://link.clashofclans.com/en/?action=OpenLayout&id=TH18-ESPORTS-02",
      },
    ],
  },
  {
    id: "69a485e3717516d14d5e2bc2",
    title: "TH-18 Anti-Ground Pushing Base For This Season",
    price: 60,
    badge: "1x5",
    description:
      "Complete 5-base defensive push pack engineered for top 200 Legend League play. Rotates defense setups to thwart scouting attacks and preserve maximum trophies.",
    townHall: "Town Hall 18",
    townHallLevel: 18,
    productImage: "https://iili.io/qqGBeX1.md.png",
    createdBy: "OPICOC Pro Builders",
    maxSell: 80,
    seasonStartDate: "2026-03-01T00:00:00.000Z",
    seasonEndDate: "2026-04-29T00:00:00.000Z",
    validityDays: 34,
    links: [
      {
        id: "th18-push-01",
        label: "Layout 1 (Core Box Defense)",
        url: "https://link.clashofclans.com/en/?action=OpenLayout&id=TH18-PUSH-01",
      },
      {
        id: "th18-push-02",
        label: "Layout 2 (Ring Isolation Trap)",
        url: "https://link.clashofclans.com/en/?action=OpenLayout&id=TH18-PUSH-02",
      },
    ],
  },
  {
    id: "69a7247d6a150119dd422a93",
    title: "TH18 Clan War League Base Pack",
    price: 35,
    badge: "1x3",
    description:
      "Tailored for Champion League CWL wars. Maximum star denial routing that forces time-fails and sub-optimal hero pathing under heavy defensive fire.",
    townHall: "Town Hall 18",
    townHallLevel: 18,
    productImage: "https://iili.io/q6Fbun9.md.png",
    createdBy: "OPICOC Pro Builders",
    maxSell: 100,
    seasonStartDate: "2026-03-01T00:00:00.000Z",
    seasonEndDate: "2026-03-29T00:00:00.000Z",
    validityDays: 4,
    links: [
      {
        id: "th18-cwl-01",
        label: "Layout 1 (CWL Anti-2 Star Core)",
        url: "https://link.clashofclans.com/en/?action=OpenLayout&id=TH18-CWL-CHAMP-01",
      },
    ],
  },
  {
    id: "69a748e4b78bc58034205eee",
    title: "TH 15 Pushing Base For This Season",
    price: 20,
    badge: "1x1",
    description:
      "Reliable Town Hall 15 defensive fortress tuned for Titan and Legend pushers. Tested against all standard zap smash, s-archer, and hybrid compositions.",
    townHall: "Town Hall 15",
    townHallLevel: 15,
    productImage: "https://iili.io/q6F2QXS.md.png",
    createdBy: "OPICOC Pro Builders",
    maxSell: 50,
    seasonStartDate: "2026-03-01T00:00:00.000Z",
    seasonEndDate: "2026-04-15T00:00:00.000Z",
    validityDays: 20,
    links: [
      {
        id: "th15-push-01",
        label: "Layout 1 (Classic Anti-3 Ring)",
        url: "https://link.clashofclans.com/en/?action=OpenLayout&id=TH15-PUSH-01",
      },
    ],
  },
];

// Seed Custom Requests
const SEED_REQUESTS: CustomBaseRequest[] = [
  {
    id: "req_001",
    userId: "usr_shadow99",
    userName: "ShadowClash",
    userEmail: "shadow99@gmail.com",
    townHall: "Town Hall 18",
    defenseFocus: "Legend League Trophy Pushing",
    requirements:
      "Need an anti-root rider base with heavy compartmentalization around Monolith and Town Hall. Town hall should be isolated with tornado trap nearby to deny blizzard blimps.",
    priority: "express",
    status: "pending",
    createdAt: "2026-09-24T14:30:00Z",
  },
  {
    id: "req_002",
    userId: "usr_valk_queen",
    userName: "ValkyrieQueen",
    userEmail: "valk@outlook.com",
    townHall: "Town Hall 17",
    defenseFocus: "CWL Anti-3 Star",
    requirements:
      "Anti-3 star layout for Champion I CWL. We are facing strong Chinese esports clans using Fireball Warden walks. Need defenses spread out to minimize splash value.",
    priority: "standard",
    status: "in_progress",
    createdAt: "2026-09-23T11:15:00Z",
    builderNotes: "Layout drafted. Testing defenses against Flame Flinger and Queen Charge pathing.",
  },
  {
    id: "req_003",
    userId: "usr_warden_pro",
    userName: "WardenMaster",
    userEmail: "warden@coc.gg",
    townHall: "Town Hall 18",
    defenseFocus: "Tournament Hard Mode",
    requirements:
      "Hard-mode tournament base. Max spell towers configured to Poison and Rage. Symmetrical appearance but highly asymmetric trap placement.",
    priority: "express",
    status: "completed",
    createdAt: "2026-09-20T09:00:00Z",
    builderNotes: "Verified in 15 friendly challenges. Defended against 12 triples.",
    completedLayoutUrl: "https://link.clashofclans.com/en/?action=OpenLayout&id=CUSTOM-TH18-HARDMODE-88",
  },
];

// Seed Contact Messages
const SEED_MESSAGES: ContactMessage[] = [
  {
    id: "msg_001",
    name: "Alex Rivera",
    email: "alex@esports.gg",
    subject: "Esports Team Bulk Licensing & Partnership",
    message:
      "Hello OPICOC Team, our organization is preparing for the Supercell World Championship Qualifier. We would like to inquire about a custom partnership package covering 15 dedicated TH18 layouts with NDAs.",
    isRead: false,
    createdAt: "2026-09-25T10:15:00Z",
  },
  {
    id: "msg_002",
    name: "Carlos Mendoza",
    email: "carlos@cocclans.net",
    subject: "Custom Base Delivery Timeline Inquiry",
    message:
      "I submitted an order for custom TH17 base yesterday. Is it possible to pay the extra difference to upgrade to the Express 12-hour delivery tier?",
    isRead: false,
    createdAt: "2026-09-24T18:40:00Z",
  },
  {
    id: "msg_003",
    name: "Marcus Chen",
    email: "marcus@gaming.org",
    subject: "Clan War Sponsorship Inquiry",
    message:
      "Hi, we represent a Top 50 Global Clan and stream CWL wars on Twitch. Would OPICOC be interested in a monthly base review sponsorship?",
    isRead: true,
    createdAt: "2026-09-22T08:20:00Z",
    repliedAt: "2026-09-22T14:10:00Z",
    replyText: "Hi Marcus! Thank you for reaching out. We would be happy to discuss details. Please send us your analytics deck.",
  },
];

// Seed Newsletter Subscribers
const SEED_SUBSCRIBERS: NewsletterSubscriber[] = [
  { id: "sub_1", email: "pro_attacker99@gmail.com", subscribedAt: "2026-09-25T08:12:00Z", status: "active" },
  { id: "sub_2", email: "clashking_cwl@outlook.com", subscribedAt: "2026-09-24T15:30:00Z", status: "active" },
  { id: "sub_3", email: "esports_scout@ggmail.com", subscribedAt: "2026-09-23T19:44:00Z", status: "active" },
  { id: "sub_4", email: "th18legend@cocbase.net", subscribedAt: "2026-09-22T11:05:00Z", status: "active" },
  { id: "sub_5", email: "defense_architect@proton.me", subscribedAt: "2026-09-21T07:22:00Z", status: "active" },
];

// Seed Registered Users
const SEED_USERS: AdminUserAccount[] = [
  {
    id: "usr_admin_1",
    email: "admin@opicoc.cc",
    firstName: "OPICOC",
    lastName: "Admin",
    role: "admin",
    createdAt: "2026-01-01T00:00:00Z",
    lastLoginAt: "2026-09-25T18:30:00Z",
    isVerified: true,
  },
  {
    id: "usr_shadow99",
    email: "shadow99@gmail.com",
    firstName: "Shadow",
    lastName: "Clash",
    role: "user",
    createdAt: "2026-07-14T10:00:00Z",
    lastLoginAt: "2026-09-24T14:35:00Z",
    isVerified: true,
  },
  {
    id: "usr_valk_queen",
    email: "valk@outlook.com",
    firstName: "Valkyrie",
    lastName: "Queen",
    role: "user",
    createdAt: "2026-08-02T16:20:00Z",
    lastLoginAt: "2026-09-23T11:20:00Z",
    isVerified: true,
  },
  {
    id: "usr_warden_pro",
    email: "warden@coc.gg",
    firstName: "Warden",
    lastName: "Master",
    role: "user",
    createdAt: "2026-08-19T09:10:00Z",
    lastLoginAt: "2026-09-20T09:05:00Z",
    isVerified: true,
  },
  {
    id: "usr_casual_clash",
    email: "casual_clash@gmail.com",
    firstName: "Casual",
    lastName: "Player",
    role: "user",
    createdAt: "2026-09-10T12:00:00Z",
    lastLoginAt: "2026-09-18T17:45:00Z",
    isVerified: false,
  },
];

// Helper to get/set from localStorage safely
function getStore<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setStore<T>(key: string, data: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // ignore
  }
}

// ==========================================
// Admin Service API
// ==========================================

export const adminService = {
  // --- METRICS ---
  getMetrics(): AdminMetricStats {
    const bases = this.getBases();
    const requests = this.getRequests();
    const messages = this.getMessages();
    const subscribers = this.getSubscribers();
    const users = this.getUsers();

    const pendingRequests = requests.filter((r) => r.status === "pending").length;
    const unreadMessages = messages.filter((m) => !m.isRead).length;

    // Estimate revenue based on base prices and orders
    const totalRevenueEst = bases.reduce((acc, b) => acc + (b.price || 0) * 12, 1840);

    return {
      totalBases: bases.length,
      pendingRequests,
      unreadMessages,
      totalSubscribers: subscribers.length,
      totalUsers: users.length,
      totalRevenueEst,
    };
  },

  // --- BASES ---
  // --- BASES ---
  getBases(): (BaseProduct & { links: BaseLayoutLink[] })[] {
    if (typeof window === "undefined") return SEED_BASES;
    const raw = window.localStorage.getItem("opicoc_admin_bases");
    if (raw === null) {
      setStore("opicoc_admin_bases", SEED_BASES);
      return SEED_BASES;
    }
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : SEED_BASES;
    } catch {
      return SEED_BASES;
    }
  },

  async syncBasesFromServer(): Promise<(BaseProduct & { links: BaseLayoutLink[] })[]> {
    try {
      const res = await fetch("/api/bases?includeLinks=true");
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.bases)) {
          setStore("opicoc_admin_bases", data.bases);
          return data.bases;
        }
      }
    } catch {
      // Fallback to local store
    }
    return this.getBases();
  },

  saveBase(baseData: Partial<BaseProduct & { links: BaseLayoutLink[] }>): BaseProduct & { links: BaseLayoutLink[] } {
    const current = this.getBases();
    let saved: BaseProduct & { links: BaseLayoutLink[] };

    if (baseData.id && current.some((b) => b.id === baseData.id)) {
      // Update
      const index = current.findIndex((b) => b.id === baseData.id);
      const existing = current[index];
      saved = {
        ...existing,
        ...baseData,
        links: baseData.links || existing.links || [],
      } as BaseProduct & { links: BaseLayoutLink[] };
      current[index] = saved;
    } else {
      // Create new
      const newId = baseData.id || `base_${Date.now()}`;
      saved = {
        id: newId,
        title: baseData.title || "Untitled Base",
        price: baseData.price || 30,
        badge: baseData.badge || "1x1",
        description: baseData.description || "Pro tested layout.",
        townHall: baseData.townHall || "Town Hall 18",
        townHallLevel: (baseData.townHallLevel || 18) as (15 | 16 | 17 | 18 | 19),
        productImage: baseData.productImage || "https://iili.io/q6Fiihu.md.png",
        createdBy: baseData.createdBy || "OPICOC Pro Builders",
        maxSell: baseData.maxSell || 100,
        seasonStartDate: baseData.seasonStartDate || new Date().toISOString(),
        seasonEndDate: baseData.seasonEndDate || new Date(Date.now() + 60 * 86400000).toISOString(),
        validityDays: baseData.validityDays || 60,
        links: baseData.links || [
          {
            id: `lnk_${Date.now()}`,
            label: "Layout 1 (Main Base)",
            url: "https://link.clashofclans.com/en/?action=OpenLayout&id=OPICOC-DEFAULT",
          },
        ],
      };
      current.unshift(saved);
    }

    setStore("opicoc_admin_bases", current);

    // Broadcast immediate update event for all components and browser tabs
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem("opicoc_bases_updated_at", Date.now().toString());
        window.dispatchEvent(new Event("opicoc_bases_updated"));
      } catch {}

      fetch("/api/bases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(saved),
      }).catch((e) => console.warn("Failed to persist base to server API", e));
    }

    return saved;
  },

  deleteBase(id: string): void {
    const current = this.getBases().filter((b) => b.id !== id);
    setStore("opicoc_admin_bases", current);

    // Broadcast immediate update event for all components and browser tabs
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem("opicoc_bases_updated_at", Date.now().toString());
        window.dispatchEvent(new Event("opicoc_bases_updated"));
      } catch {}

      fetch(`/api/bases?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      }).catch((e) => console.warn("Failed to delete base from server API", e));
    }
  },

  // --- CUSTOM REQUESTS ---
  getRequests(): CustomBaseRequest[] {
    return getStore("opicoc_admin_requests", SEED_REQUESTS);
  },

  updateRequest(
    id: string,
    updates: Partial<Pick<CustomBaseRequest, "status" | "builderNotes" | "completedLayoutUrl">>
  ): CustomBaseRequest | null {
    const current = this.getRequests();
    const index = current.findIndex((r) => r.id === id);
    if (index === -1) return null;

    const updated = {
      ...current[index],
      ...updates,
    };
    current[index] = updated;
    setStore("opicoc_admin_requests", current);
    return updated;
  },

  // --- CONTACT MESSAGES ---
  getMessages(): ContactMessage[] {
    return getStore("opicoc_admin_messages", SEED_MESSAGES);
  },

  markMessageRead(id: string, isRead: boolean): void {
    const current = this.getMessages();
    const index = current.findIndex((m) => m.id === id);
    if (index !== -1) {
      current[index].isRead = isRead;
      setStore("opicoc_admin_messages", current);
    }
  },

  replyToMessage(id: string, replyText: string): void {
    const current = this.getMessages();
    const index = current.findIndex((m) => m.id === id);
    if (index !== -1) {
      current[index].isRead = true;
      current[index].repliedAt = new Date().toISOString();
      current[index].replyText = replyText;
      setStore("opicoc_admin_messages", current);
    }
  },

  deleteMessage(id: string): void {
    const current = this.getMessages().filter((m) => m.id !== id);
    setStore("opicoc_admin_messages", current);
  },

  // --- SUBSCRIBERS ---
  getSubscribers(): NewsletterSubscriber[] {
    return getStore("opicoc_admin_subscribers", SEED_SUBSCRIBERS);
  },

  deleteSubscriber(id: string): void {
    const current = this.getSubscribers().filter((s) => s.id !== id);
    setStore("opicoc_admin_subscribers", current);
  },

  exportSubscribersCsv(): string {
    const subscribers = this.getSubscribers();
    const header = "ID,Email,SubscribedAt,Status\n";
    const rows = subscribers
      .map((s) => `"${s.id}","${s.email}","${s.subscribedAt}","${s.status}"`)
      .join("\n");
    return header + rows;
  },

  // --- USERS ---
  getUsers(): AdminUserAccount[] {
    return getStore("opicoc_admin_users", SEED_USERS);
  },

  updateUserRole(id: string, role: "user" | "admin"): boolean {
    const current = this.getUsers();
    // Safety check: ensure at least one root admin remains
    const adminCount = current.filter((u) => u.role === "admin").length;
    const target = current.find((u) => u.id === id);

    if (target && target.role === "admin" && role === "user" && adminCount <= 1) {
      // Cannot demote last admin
      return false;
    }

    const index = current.findIndex((u) => u.id === id);
    if (index !== -1) {
      current[index].role = role;
      setStore("opicoc_admin_users", current);
      return true;
    }
    return false;
  },
};
