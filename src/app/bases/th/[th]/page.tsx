import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBasesByTownHall } from "@/services/baseService";
import { Container } from "@/components/layout/Container";
import { BaseCard } from "@/features/bases/components/BaseCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MotionContainer } from "@/components/motion/MotionContainer";
import { PageTransition } from "@/components/motion/PageTransition";
import { Shield, Sparkles, ArrowLeft, ArrowRight } from "lucide-react";

interface TownHallPageProps {
  params: Promise<{
    th: string;
  }>;
}

const TH_META_INFO: Record<
  number,
  {
    title: string;
    badge: string;
    description: string;
    image: string;
    metaFocus: string[];
  }
> = {
  18: {
    title: "Town Hall 18 Pro Base Layouts",
    badge: "NEW META",
    description:
      "Hard-mode tested TH18 tournament layouts engineered against Root Riders, Super Archer blimps, and heavy ground-smash strategies. Features split giga-core dead zones.",
    image: "/assets/th18.webp",
    metaFocus: ["Anti-Root Rider", "Split Giga-Core", "Anti-Super Archer Blimp", "Legend 6000+ Trophies"],
  },
  17: {
    title: "Town Hall 17 CWL Base Layouts",
    badge: "CWL FAVORITE",
    description:
      "Championship-level Town Hall 17 anti-3 star bases. Calibrated to withstand multi-phase hero dives, lavaloon air assaults, and zap-titan strategies.",
    image: "/assets/th17.webp",
    metaFocus: ["Anti-Air Lalo", "Anti-Hero Dive", "CWL Star Denial", "Hard Mode Verified"],
  },
  16: {
    title: "Town Hall 16 Base Layouts",
    badge: "PRO TESTED",
    description:
      "Proven Town Hall 16 defenses built around merged defense positioning and isolated spell towers. Prevents 2-star sweeps and forces sub-optimal troop pathing.",
    image: "/assets/th16.webp",
    metaFocus: ["Merged Defenses Isolation", "Spell Tower Buffers", "Anti-Edrag Chain", "War Star Protection"],
  },
  15: {
    title: "Town Hall 15 Defense Layouts",
    badge: "LEGEND PUSH",
    description:
      "Classic Town Hall 15 defensive designs for high-trophy pushers and Champions league wars. Time-fail perimeter placement and heavy core trap concentrations.",
    image: "/assets/th15.webp",
    metaFocus: ["Spell Tower Isolation", "Anti-Super Bowler", "Legend League Push", "Time-Fail Perimeter"],
  },
};

export async function generateStaticParams() {
  return [{ th: "18" }, { th: "17" }, { th: "16" }, { th: "15" }];
}

export async function generateMetadata({ params }: TownHallPageProps): Promise<Metadata> {
  const { th } = await params;
  const level = parseInt(th, 10);
  const info = TH_META_INFO[level];

  if (!info) {
    return {
      title: "Town Hall Bases | OPICOC",
    };
  }

  return {
    title: `${info.title} | OPICOC`,
    description: info.description,
    openGraph: {
      title: `${info.title} - Clan War League & Legend Defense`,
      description: info.description,
      images: [info.image],
    },
  };
}

export default async function TownHallPage({ params }: TownHallPageProps) {
  const { th } = await params;
  const level = parseInt(th, 10);

  if (!TH_META_INFO[level]) {
    notFound();
  }

  const info = TH_META_INFO[level];
  const bases = await getBasesByTownHall(level);

  return (
    <PageTransition className="py-12 sm:py-16 bg-[#0B0D11]">
      <Container size="default">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#64748B] mb-8">
          <Link href="/" className="hover:text-amber-400 transition">
            Home
          </Link>
          <span>/</span>
          <Link href="/all-products" className="hover:text-amber-400 transition">
            Bases
          </Link>
          <span>/</span>
          <span className="text-[#F1F5F9]">Town Hall {level}</span>
        </div>

        {/* Tier Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl border border-[#262B35] bg-[#12151B] p-6 sm:p-10 mb-12 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="md:col-span-8 space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="tactical" className="text-xs uppercase font-mono">
                  {info.badge}
                </Badge>
                <span className="text-xs font-mono text-[#64748B]">TIER {level}</span>
              </div>

              <h1 className="font-clash text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F1F5F9]">
                {info.title}
              </h1>

              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-2xl">
                {info.description}
              </p>

              {/* Meta Focus Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {info.metaFocus.map((focus, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 text-xs text-[#CBD5E1] bg-[#1A1E26] px-3 py-1 rounded-md border border-[#262B35]"
                  >
                    <Shield className="w-3.5 h-3.5 text-amber-500" />
                    {focus}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Town Hall Asset Visual */}
            <div className="md:col-span-4 flex items-center justify-center">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 select-none">
                <Image
                  src={info.image}
                  alt={`${info.title} Graphic`}
                  fill
                  priority
                  sizes="(max-width: 768px) 176px, 208px"
                  className="object-contain filter drop-shadow-[0_16px_24px_rgba(0,0,0,0.8)]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Tier Switcher Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-4 border-b border-[#1E232B]">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-xs font-mono text-[#64748B] hidden xs:inline">Switch Tier:</span>
            {[18, 17, 16, 15].map((lvl) => {
              const isCurrent = lvl === level;
              return (
                <Button
                  key={lvl}
                  asChild
                  variant={isCurrent ? "primary" : "outline"}
                  size="sm"
                  className="font-mono text-xs px-2.5 sm:px-3"
                >
                  <Link href={`/bases/th/${lvl}`}>TH{lvl}</Link>
                </Button>
              );
            })}
          </div>

          <Button asChild variant="ghost" size="sm" className="text-xs text-[#94A3B8] hover:text-[#F1F5F9] p-0 sm:px-3">
            <Link href="/all-products" className="flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              All Products
            </Link>
          </Button>
        </div>

        {/* Bases Grid with Staggered Motion */}
        {bases.length > 0 ? (
          <MotionContainer
            animation="stagger"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
          >
            {bases.map((base, idx) => (
              <BaseCard key={base.id} base={base} priority={idx < 4} />
            ))}
          </MotionContainer>
        ) : (
          <div className="p-12 text-center rounded-xl border border-[#262B35] bg-[#12151B] space-y-4">
            <Shield className="w-10 h-10 text-amber-500/50 mx-auto" />
            <h3 className="font-clash text-xl font-bold text-[#F1F5F9]">
              Fresh TH{level} Layouts in Testing
            </h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] max-w-md mx-auto">
              Our builders are currently testing new TH{level} layouts against the latest balance update. Check out our base layouts or request a custom base.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <Button asChild size="sm">
                <Link href="/custom-base">Request Custom Base</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/all-products">Browse All Bases</Link>
              </Button>
            </div>
          </div>
        )}

        {/* Footer Support Banner */}
        <div className="mt-16 p-6 rounded-xl border border-[#262B35] bg-[#12151B] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="p-3 rounded-lg bg-amber-500/10 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#F1F5F9]">
                Looking for exclusive, private clan layouts?
              </p>
              <p className="text-xs text-[#94A3B8]">
                Commission a bespoke base built with secret trap traps tailored to your CWL opponents.
              </p>
            </div>
          </div>
          <Button asChild variant="outline" size="sm" className="shrink-0">
            <Link href="/custom-base" className="flex items-center gap-1.5">
              Custom Order <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </Button>
        </div>
      </Container>
    </PageTransition>
  );
}
