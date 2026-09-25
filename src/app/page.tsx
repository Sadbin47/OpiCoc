import { Suspense } from "react";
import Link from "next/link";
import { HeroSection } from "@/features/home/components/HeroSection";
import { TownHallSelector } from "@/features/home/components/TownHallSelector";
import { FeaturedBaseGrid } from "@/features/home/components/FeaturedBaseGrid";
import { FeaturedBaseGridSkeleton } from "@/features/home/components/FeaturedBaseGridSkeleton";
import { ShowdownBanner } from "@/features/home/components/ShowdownBanner";
import { VideoSection } from "@/features/home/components/VideoSection";
import { ReviewSectionStream } from "@/features/home/components/ReviewSectionStream";
import { ReviewSectionSkeleton } from "@/features/home/components/ReviewSectionSkeleton";
import { BrandPillarsSection } from "@/features/home/components/BrandPillarsSection";
import { Container } from "@/components/layout/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import { Sparkles, BookOpen } from "lucide-react";

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

      {/* 1. High-Impact Hero Section (Instant Flush) */}
      <HeroSection />

      {/* 2. Town Hall Defense Tier Selector (TH15-TH18) */}
      <TownHallSelector />

      {/* 3. Featured CWL Base Packs Grid (React Suspense Streaming) */}
      <Suspense fallback={<FeaturedBaseGridSkeleton />}>
        <FeaturedBaseGrid />
      </Suspense>

      {/* 4. Esports Showdown Clan Pack Banner */}
      <ShowdownBanner />

      {/* 5. Defense Video Breakdown (Lazy-Loaded Player & Poster) */}
      <VideoSection />

      {/* 6. Verified Customer Testimonials (React Suspense Streaming) */}
      <Suspense fallback={<ReviewSectionSkeleton />}>
        <ReviewSectionStream />
      </Suspense>

      {/* 7. Brand Defense Pillars & Supercell Fair Play Disclaimer */}
      <BrandPillarsSection />

      {/* 8. Rebuild Specifications Transparency Bar */}
      <section className="py-8 bg-[#090B0E] border-t border-[#1E232B]">
        <Container size="default">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
              <span className="font-mono text-[#CBD5E1]">
                OPICOC V2 Architecture • Performance & Streaming Active
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/design-system"
                className="inline-flex items-center gap-1.5 text-amber-400/90 hover:text-amber-300 font-mono transition"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Design System Preview
              </Link>
              <Link
                href="/all-products"
                className="inline-flex items-center gap-1.5 text-[#94A3B8] hover:text-[#F1F5F9] font-mono transition"
              >
                <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                Base Catalogue
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
