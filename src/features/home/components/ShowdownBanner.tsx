import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Swords, ArrowRight, ShieldCheck } from "lucide-react";

export function ShowdownBanner() {
  return (
    <section className="relative overflow-hidden border-b border-[#262B35] bg-[#0E1117] py-14 sm:py-20">
      {/* Background Banner with Dark Overlays */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="/assets/showdown-banner.jpg"
          alt="Clash of Clans Esports Showdown"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-30 filter brightness-75 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D11] via-[#0B0D11]/90 to-[#0B0D11]/60" />
      </div>

      <Container size="default" className="relative z-10">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Swords className="w-3.5 h-3.5" />
            <span>Competitive Roster Defense</span>
          </div>

          <h2 className="font-clash text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F1F5F9] leading-tight">
            Dominating Clan War League Starts at Base Design
          </h2>

          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            Every star defended is a victory earned. Equip your clan with synchronized trap
            corridors, anti-blimp sweeps, and unpredictable Tesla placements crafted by world-class
            base builders.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button asChild size="default" className="font-semibold shadow-lg shadow-amber-500/20">
              <Link href="/custom-base" className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Commission Custom Clan Pack
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
