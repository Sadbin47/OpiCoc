import { BaseProduct, BaseLayoutLink, TownHallLevel } from "@/types";
import { db } from "@/db/client";

const API_BASE_URL =
  process.env.LEGACY_API_URL || "https://backend-omega-one-37.vercel.app/api";

/**
 * Fallback verified seed bases for resilient build and offline development
 */
const FALLBACK_BASES: BaseProduct[] = [
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
    productImage: "https://iili.io/q6Fkx8G.md.png",
    createdBy: "OPICOC Pro Builders",
    maxSell: 100,
    seasonStartDate: "2026-03-01T00:00:00.000Z",
    seasonEndDate: "2026-04-05T00:00:00.000Z",
    validityDays: 10,
  },
];

/**
 * Helper to normalize Town Hall level and name from raw backend document
 */
function parseTownHall(rawTh: unknown, title: string): { name: string; level: TownHallLevel } {
  const titleStr = typeof title === "string" ? title : "";
  const thMatch = titleStr.match(/TH\s*-?\s*(\d{2})/i);
  let levelNum = thMatch ? parseInt(thMatch[1], 10) : 17;

  if (typeof rawTh === "string" && rawTh.toLowerCase().includes("town hall")) {
    const rawMatch = rawTh.match(/\d{2}/);
    if (rawMatch) {
      levelNum = parseInt(rawMatch[0], 10);
    }
  }

  // Constrain to known levels
  const validLevel: TownHallLevel =
    levelNum === 18 ? 18 : levelNum === 17 ? 17 : levelNum === 16 ? 16 : levelNum === 15 ? 15 : 18;

  return {
    name: `Town Hall ${validLevel}`,
    level: validLevel,
  };
}

/**
 * Calculates remaining validity days from seasonEndDate
 */
function calculateValidityDays(seasonEndDate?: string): number | undefined {
  if (!seasonEndDate) return undefined;
  try {
    const end = new Date(seasonEndDate).getTime();
    const now = Date.now();
    const diffDays = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  } catch {
    return undefined;
  }
}

interface RawBaseItem {
  _id?: string;
  id?: string;
  title?: string;
  price?: number;
  badge?: string;
  description?: string;
  townHall?: string;
  productImage?: string;
  createdBy?: string;
  maxSell?: number;
  seasonStartDate?: string;
  seasonEndDate?: string;
  // NOTE: 'links' is intentionally ignored and NEVER included in BaseProduct
}

/**
 * Sanitizes and normalizes raw API base document into secure public BaseProduct
 */
function sanitizeBase(raw: RawBaseItem): BaseProduct {
  const id = raw._id || raw.id || `base-${Math.random().toString(36).substring(2, 9)}`;
  const title = raw.title?.trim() || "Pro Defense Base Layout";
  const { name: townHall, level: townHallLevel } = parseTownHall(raw.townHall, title);

  return {
    id,
    title,
    price: typeof raw.price === "number" ? raw.price : 40,
    badge: raw.badge || "PRO",
    description:
      raw.description?.trim() ||
      "Competitive Clash of Clans layout designed for anti-3 star defense in Clan War League and Legend League.",
    townHall,
    townHallLevel,
    productImage: raw.productImage || "https://iili.io/q6FV8ut.md.png",
    createdBy: raw.createdBy?.trim() || "OPICOC Pro Builders",
    maxSell: raw.maxSell || 100,
    seasonStartDate: raw.seasonStartDate,
    seasonEndDate: raw.seasonEndDate,
    validityDays: calculateValidityDays(raw.seasonEndDate),
  };
}

/**
 * Fetches all available bases from backend with caching and fallback
 */
export async function getAllBases(): Promise<BaseProduct[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(`${API_BASE_URL}/admin/get-bases`, {
      next: { revalidate: 3600 },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(`[baseService] get-bases returned HTTP ${res.status}, using fallback.`);
      return FALLBACK_BASES;
    }

    const data = await res.json();
    if (data && Array.isArray(data.bases) && data.bases.length > 0) {
      return data.bases.map(sanitizeBase);
    }

    return FALLBACK_BASES;
  } catch (error) {
    console.warn("[baseService] Fetch error or timeout, serving fallback seed bases.", error);
    return FALLBACK_BASES;
  }
}

/**
 * Fetches featured bases for the homepage showcase (up to 4 items)
 */
export async function getFeaturedBases(): Promise<BaseProduct[]> {
  const all = await getAllBases();
  // Sort by price descending or newest
  return all.slice(0, 4);
}

/**
 * Fetches single base by ID
 */
export async function getBaseById(id: string): Promise<BaseProduct | null> {
  const all = await getAllBases();
  return all.find((b) => b.id === id) || null;
}

/**
 * Fetches bases filtered by Town Hall level
 */
export async function getBasesByTownHall(level: number): Promise<BaseProduct[]> {
  const all = await getAllBases();
  return all.filter((b) => b.townHallLevel === level);
}

/**
 * Fetches protected layout links for a base, strictly requiring verified purchase authorization
 */
export async function getPurchasedBaseLayoutLinks(
  baseId: string,
  userId: string
): Promise<BaseLayoutLink[] | null> {
  const links = await db.getPurchasedLayoutLinks(baseId, userId);
  if (!links) return null;

  return links.map((l) => ({
    id: l.id,
    label: l.label,
    url: l.supercellUrl,
  }));
}

