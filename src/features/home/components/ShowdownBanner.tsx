"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Swords, ArrowRight, ShieldCheck, Edit3 } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useHomepageConfig } from "@/services/homepageService";

export function ShowdownBanner() {
  const { isAdmin } = useAdminAuth();
  const config = useHomepageConfig();

  const handleEditSection = () => {
    window.dispatchEvent(
      new CustomEvent("opicoc_open_homepage_editor", { detail: { tab: "showdown" } })
    );
  };

  const isExternalBanner = config.showdown.bannerImage.startsWith("http");

  return (
    <section className="relative overflow-hidden border-b border-[#262B35] bg-[#0E1117] py-14 sm:py-20 group">
      {/* Background Banner with Dark Overlays */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src={config.showdown.bannerImage || "/assets/showdown-banner.jpg"}
          alt="Clash of Clans Esports Showdown"
          fill
          sizes="100vw"
          unoptimized={isExternalBanner}
          className="object-cover object-center opacity-30 filter brightness-75 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D11] via-[#0B0D11]/90 to-[#0B0D11]/60" />
      </div>

      {/* Admin Section Edit Trigger */}
      {isAdmin && (
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={handleEditSection}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#12151B]/90 hover:bg-amber-500 hover:text-black text-amber-400 border border-amber-500/40 text-xs font-semibold backdrop-blur-md shadow-lg transition"
            title="Edit Showdown Banner & Text"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Banner</span>
          </button>
        </div>
      )}

      <Container size="default" className="relative z-10">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Swords className="w-3.5 h-3.5" />
            <span>{config.showdown.tag}</span>
          </div>

          <h2 className="font-clash text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F1F5F9] leading-tight">
            {config.showdown.title}
          </h2>

          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            {config.showdown.description}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button asChild size="default" className="font-semibold shadow-lg shadow-amber-500/20">
              <Link href={config.showdown.ctaLink || "/custom-base"} className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                {config.showdown.ctaText || "Commission Custom Clan Pack"}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="default">
              <Link href="/all-products">Browse Existing Bases</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
