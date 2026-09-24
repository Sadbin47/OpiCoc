export interface TownHallItem {
  level: number;
  name: string;
  path: string;
  badge?: string;
}

export const siteConfig = {
  name: "OPICOC",
  title: "OPICOC - Pro Clash of Clans Base Layouts & CWL Defense Packs",
  description:
    "Expertly crafted Clash of Clans bases for unbeatable defense and strategy. Discover tournament-grade TH15 to TH18 layouts, CWL anti-3-star designs, and custom base commissions.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.opicoc.cc",
  ogImage: "https://iili.io/fsRZfkB.jpg",
  supportEmail: "support@opicoc.com",
  socials: {
    youtube: "https://www.youtube.com/@Opi333coc",
    discord: "https://discord.gg/GfwZjJjUe",
    x: "https://x.com/OpOpib17",
    facebook: "https://www.facebook.com/share/17TREB27rL/",
    instagram: "https://www.instagram.com/opi333coc/",
    twitch: "https://m.twitch.tv/opi_333",
  },
  townHalls: [
    { level: 18, name: "Town Hall 18", path: "/bases/th/18", badge: "New" },
    { level: 17, name: "Town Hall 17", path: "/bases/th/17", badge: "Meta" },
    { level: 16, name: "Town Hall 16", path: "/bases/th/16" },
    { level: 15, name: "Town Hall 15", path: "/bases/th/15" },
  ] as TownHallItem[],
  navLinks: [
    { name: "Home", href: "/" },
    { name: "Bases", href: "/all-products" },
    { name: "Custom Base", href: "/custom-base" },
    { name: "About", href: "/about" },
    { name: "FAQs", href: "/faq" },
    { name: "Contact", href: "/contact-us" },
  ],
} as const;
