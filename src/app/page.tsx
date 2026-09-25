import { Suspense } from "react";
import { HeroSection } from "@/features/home/components/HeroSection";
import { TownHallSelector } from "@/features/home/components/TownHallSelector";
import { FeaturedBaseGrid } from "@/features/home/components/FeaturedBaseGrid";
import { FeaturedBaseGridSkeleton } from "@/features/home/components/FeaturedBaseGridSkeleton";
import { ShowdownBanner } from "@/features/home/components/ShowdownBanner";
import { VideoSection } from "@/features/home/components/VideoSection";
import { ReviewSectionStream } from "@/features/home/components/ReviewSectionStream";
import { ReviewSectionSkeleton } from "@/features/home/components/ReviewSectionSkeleton";
import { BrandPillarsSection } from "@/features/home/components/BrandPillarsSection";
import { AdminHomepageFloatingBar } from "@/features/home/components/AdminHomepageFloatingBar";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/assets/logo.png`,
    description: siteConfig.description,
    sameAs: Object.values(siteConfig.socials),
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.supportEmail,
      contactType: "customer service",
      availableLanguage: "English",
    },
  };

  return (
    <div className="flex flex-col">
      <JsonLd schema={organizationSchema} />

      {/* 1. High-Impact Hero Section */}
      <HeroSection />

      {/* 2. Town Hall Defense Tier Selector (TH15-TH18) */}
      <TownHallSelector />

      {/* 3. Featured CWL Base Packs Grid (Streaming) */}
      <Suspense fallback={<FeaturedBaseGridSkeleton />}>
        <FeaturedBaseGrid />
      </Suspense>

      {/* 4. Esports Showdown Clan Pack Banner */}
      <ShowdownBanner />

      {/* 5. Defense Video Breakdown */}
      <VideoSection />

      {/* 6. Verified Customer Testimonials */}
      <Suspense fallback={<ReviewSectionSkeleton />}>
        <ReviewSectionStream />
      </Suspense>

      {/* 7. Brand Defense Pillars & Supercell Fair Play Disclaimer */}
      <BrandPillarsSection />

      {/* 8. Admin Live Homepage Customization Overlay (Only renders for Admin) */}
      <AdminHomepageFloatingBar />
    </div>
  );
}
