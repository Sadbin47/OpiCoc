"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Zap,
  ArrowRight,
  Sparkles,
  Trophy,
  CheckCircle2,
  PlayCircle,
  Edit3,
} from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useHomepageConfig } from "@/services/homepageService";

export function HeroSection() {
  const { isAdmin } = useAdminAuth();
  const config = useHomepageConfig();

  const handleEditSection = () => {
    window.dispatchEvent(
      new CustomEvent("opicoc_open_homepage_editor", { detail: { tab: "hero" } })
    );
  };

  const isExternalImage = config.hero.bannerImage.startsWith("http");

  return (
    <section className="relative overflow-hidden border-b border-[#262B35] bg-[#0B0D11] pt-12 pb-20 lg:pt-20 lg:pb-28 group">
      {/* Background Graphic with Vignette */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src={config.hero.bannerImage || "/assets/hero-banner-1.jpg"}
          alt="Clash of Clans Pro Base Defense Arena"
          fill
          priority
          sizes="100vw"
          unoptimized={isExternalImage}
          className="object-cover object-center opacity-25 filter brightness-75 contrast-125"
        />
        {/* Radial & Linear Dark Gradients for contrast and readable typography */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D11] via-[#0B0D11]/80 to-[#0B0D11]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0B0D11_85%)]" />
      </div>

      {/* Admin In-Place Section Edit Trigger */}
      {isAdmin && (
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={handleEditSection}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#12151B]/90 hover:bg-amber-500 hover:text-black text-amber-400 border border-amber-500/40 text-xs font-semibold backdrop-blur-md shadow-lg transition"
            title="Edit Hero Banners & Headline"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Hero</span>
          </button>
        </div>
      )}

      <Container size="default" className="relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Tactical Season Announcement Pill */}
          <div className="inline-flex max-w-full items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold bg-[#12151B]/90 text-amber-400 border border-amber-500/30 shadow-sm backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
            <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">{config.hero.announcement}</span>
          </div>

          {/* Master Headline */}
          <h1 className="font-clash text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#F1F5F9] leading-[1.08]">
            {config.hero.headline} <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent drop-shadow-sm">
              {config.hero.headlineHighlight}
            </span>
          </h1>

          {/* Subheading & Value Proposition */}
          <p className="text-sm sm:text-base md:text-xl text-[#94A3B8] max-w-2xl leading-relaxed">
            {config.hero.subheading}
          </p>

          {/* Call-to-Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2 w-full sm:w-auto">
            <Button asChild size="lg" className="w-full sm:w-auto px-7 py-6 text-sm font-bold shadow-lg shadow-amber-500/20">
              <Link href="/all-products" className="flex items-center justify-center gap-2">
                <Zap className="w-4 h-4 fill-current" />
                Explore Town Hall Bases
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>

            <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto px-6 py-6 text-sm font-semibold border border-[#262B35]">
              <Link href="/custom-base" className="flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Custom Base Design
              </Link>
            </Button>

            <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto text-[#94A3B8] hover:text-[#F1F5F9]">
              <a href="#defense-showcase" className="flex items-center justify-center gap-2">
                <PlayCircle className="w-4 h-4 text-sky-400" />
                Watch Defense Replay
              </a>
            </Button>
          </div>

          {/* Trust Metrics Ribbon */}
          <div className="pt-6 sm:pt-8 w-full border-t border-[#1E232B]/80 mt-4 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 text-left">
            <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-lg bg-[#12151B]/60 border border-[#262B35]/60 backdrop-blur-sm">
              <div className="p-1.5 sm:p-2 rounded-md bg-amber-500/10 text-amber-400 shrink-0">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-bold font-mono text-[#F1F5F9] truncate">99.4%</p>
                <p className="text-[10px] sm:text-xs text-[#94A3B8] truncate">CWL Star Denial</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-lg bg-[#12151B]/60 border border-[#262B35]/60 backdrop-blur-sm">
              <div className="p-1.5 sm:p-2 rounded-md bg-sky-500/10 text-sky-400 shrink-0">
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-bold font-mono text-[#F1F5F9] truncate">4,800+</p>
                <p className="text-[10px] sm:text-xs text-[#94A3B8] truncate">Bases Delivered</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-lg bg-[#12151B]/60 border border-[#262B35]/60 backdrop-blur-sm">
              <div className="p-1.5 sm:p-2 rounded-md bg-emerald-500/10 text-emerald-400 shrink-0">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-bold font-mono text-[#F1F5F9] truncate">Supercell</p>
                <p className="text-[10px] sm:text-xs text-[#94A3B8] truncate">100% TOS Safe</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-lg bg-[#12151B]/60 border border-[#262B35]/60 backdrop-blur-sm">
              <div className="p-1.5 sm:p-2 rounded-md bg-purple-500/10 text-purple-400 shrink-0">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-bold font-mono text-[#F1F5F9] truncate">Instant</p>
                <p className="text-[10px] sm:text-xs text-[#94A3B8] truncate">Direct Import</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
