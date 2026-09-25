import * as React from "react";
import { HomepageConfig } from "@/types";

export const DEFAULT_HOMEPAGE_CONFIG: HomepageConfig = {
  hero: {
    announcement: "2026 CWL & Legend Season Meta Updated",
    headline: "Engineered for",
    headlineHighlight: "Unbeatable Defense",
    subheading:
      "Stop surrendering 3-stars in CWL and Legend League. Discover tournament-grade Town Hall 15 to 18 base layouts handcrafted by elite esports builders. Tested against the hardest meta attacks.",
    bannerImage: "/assets/hero-banner-1.jpg",
  },
  video: {
    tag: "Tactical Analysis",
    title: "Inside an Anti-3 Star Defense",
    description:
      "Watch how our tournament-grade base layouts dismantle meta army pushes, trap blimps, and force devastating time-fails.",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    posterImage: "/assets/video-poster.webp",
    youtubeChannelUrl: "https://www.youtube.com/@Opi333coc",
    metaLabel: "TH18 Hard Mode Vs Super Archer & Root Rider",
  },
  showdown: {
    tag: "Competitive Roster Defense",
    title: "Dominating Clan War League Starts at Base Design",
    description:
      "Every star defended is a victory earned. Equip your clan with synchronized trap corridors, anti-blimp sweeps, and unpredictable Tesla placements crafted by world-class base builders.",
    bannerImage: "/assets/showdown-banner.jpg",
    ctaText: "Commission Custom Clan Pack",
    ctaLink: "/custom-base",
  },
};

const HOMEPAGE_STORAGE_KEY = "opicoc_homepage_config";

/**
 * Extracts and formats a valid YouTube embed URL from standard watch, share, or embed links
 */
export function formatVideoEmbedUrl(url: string): { isYouTube: boolean; embedUrl: string } {
  if (!url) {
    return { isYouTube: false, embedUrl: "" };
  }

  const trimmed = url.trim();

  // Match youtube.com/watch?v=ID or youtube.com/v/ID
  const watchMatch = trimmed.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
  if (watchMatch && watchMatch[1]) {
    return {
      isYouTube: true,
      embedUrl: `https://www.youtube-nocookie.com/embed/${watchMatch[1]}?autoplay=1&rel=0`,
    };
  }

  // Already an embed URL
  if (trimmed.includes("youtube.com/embed/") || trimmed.includes("youtube-nocookie.com/embed/")) {
    const clean = trimmed.includes("?") ? `${trimmed}&autoplay=1` : `${trimmed}?autoplay=1`;
    return { isYouTube: true, embedUrl: clean };
  }

  // Fallback: direct mp4 or custom video
  return { isYouTube: false, embedUrl: trimmed };
}

/**
 * Client-side helper to read homepage configuration
 */
export function getClientHomepageConfig(): HomepageConfig {
  if (typeof window === "undefined") {
    return DEFAULT_HOMEPAGE_CONFIG;
  }

  try {
    const raw = window.localStorage.getItem(HOMEPAGE_STORAGE_KEY);
    if (!raw) return DEFAULT_HOMEPAGE_CONFIG;
    const parsed = JSON.parse(raw);
    return {
      hero: { ...DEFAULT_HOMEPAGE_CONFIG.hero, ...(parsed.hero || {}) },
      video: { ...DEFAULT_HOMEPAGE_CONFIG.video, ...(parsed.video || {}) },
      showdown: { ...DEFAULT_HOMEPAGE_CONFIG.showdown, ...(parsed.showdown || {}) },
    };
  } catch {
    return DEFAULT_HOMEPAGE_CONFIG;
  }
}

/**
 * Client-side helper to save homepage configuration
 */
export function setClientHomepageConfig(config: HomepageConfig): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(HOMEPAGE_STORAGE_KEY, JSON.stringify(config));
    window.dispatchEvent(new Event("opicoc_homepage_updated"));
  } catch (e) {
    console.error("Failed to save homepage config locally", e);
  }
}

function subscribeHomepage(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("opicoc_homepage_updated", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("opicoc_homepage_updated", callback);
    window.removeEventListener("storage", callback);
  };
}

function getHomepageSnapshot(): string {
  if (typeof window === "undefined") return JSON.stringify(DEFAULT_HOMEPAGE_CONFIG);
  try {
    return window.localStorage.getItem(HOMEPAGE_STORAGE_KEY) || JSON.stringify(DEFAULT_HOMEPAGE_CONFIG);
  } catch {
    return JSON.stringify(DEFAULT_HOMEPAGE_CONFIG);
  }
}

function getHomepageServerSnapshot(): string {
  return JSON.stringify(DEFAULT_HOMEPAGE_CONFIG);
}

export function useHomepageConfig(): HomepageConfig {
  const raw = React.useSyncExternalStore(
    subscribeHomepage,
    getHomepageSnapshot,
    getHomepageServerSnapshot
  );

  return React.useMemo(() => {
    try {
      const parsed = JSON.parse(raw);
      return {
        hero: { ...DEFAULT_HOMEPAGE_CONFIG.hero, ...(parsed.hero || {}) },
        video: { ...DEFAULT_HOMEPAGE_CONFIG.video, ...(parsed.video || {}) },
        showdown: { ...DEFAULT_HOMEPAGE_CONFIG.showdown, ...(parsed.showdown || {}) },
      };
    } catch {
      return DEFAULT_HOMEPAGE_CONFIG;
    }
  }, [raw]);
}

