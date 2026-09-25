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
} from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-[#262B35] bg-[#0B0D11] pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Background Graphic with Vignette */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="/assets/hero-banner-1.jpg"
          alt="Clash of Clans Pro Base Defense Arena"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-25 filter brightness-75 contrast-125"
        />
        {/* Radial & Linear Dark Gradients for contrast and readable typography */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D11] via-[#0B0D11]/80 to-[#0B0D11]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0B0D11_85%)]" />
      </div>

      <Container size="default" className="relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Tactical Season Announcement Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#12151B]/90 text-amber-400 border border-amber-500/30 shadow-sm backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>2026 Clan War League & Legend Season Meta Updated</span>
          </div>

          {/* Master Headline */}
          <h1 className="font-clash text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#F1F5F9] leading-[1.08]">
            Engineered for <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent drop-shadow-sm">
              Unbeatable Defense
            </span>
          </h1>

          {/* Subheading & Value Proposition */}
          <p className="text-base sm:text-lg md:text-xl text-[#94A3B8] max-w-2xl leading-relaxed">
            Stop surrendering 3-stars in CWL and Legend League. Discover tournament-grade
            Town Hall 15 to 18 base layouts handcrafted by elite esports builders. Tested
            against the hardest meta attacks.
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
          <div className="pt-6 sm:pt-8 w-full border-t border-[#1E232B]/80 mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[#12151B]/60 border border-[#262B35]/60 backdrop-blur-sm">
              <div className="p-2 rounded-md bg-amber-500/10 text-amber-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold font-mono text-[#F1F5F9]">99.4%</p>
                <p className="text-xs text-[#94A3B8]">CWL Star Denial</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-[#12151B]/60 border border-[#262B35]/60 backdrop-blur-sm">
              <div className="p-2 rounded-md bg-sky-500/10 text-sky-400">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold font-mono text-[#F1F5F9]">4,800+</p>
                <p className="text-xs text-[#94A3B8]">Bases Delivered</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-[#12151B]/60 border border-[#262B35]/60 backdrop-blur-sm">
              <div className="p-2 rounded-md bg-emerald-500/10 text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold font-mono text-[#F1F5F9]">Supercell</p>
                <p className="text-xs text-[#94A3B8]">100% TOS Compliant</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-[#12151B]/60 border border-[#262B35]/60 backdrop-blur-sm">
              <div className="p-2 rounded-md bg-purple-500/10 text-purple-400">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold font-mono text-[#F1F5F9]">Instant</p>
                <p className="text-xs text-[#94A3B8]">Direct Link Import</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
