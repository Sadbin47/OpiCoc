"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Shield, ArrowRight, Layers } from "lucide-react";
import { useAnimationPreference } from "@/hooks/useAnimationPreference";
import { cn } from "@/lib/utils";

interface TownHallTier {
  level: number;
  name: string;
  badge: string;
  badgeVariant: "warning" | "default" | "tactical" | "outline";
  image: string;
  focus: string;
  description: string;
  totalBases: string;
}

const TOWN_HALL_TIERS: TownHallTier[] = [
  {
    level: 18,
    name: "Town Hall 18",
    badge: "NEW META",
    badgeVariant: "warning",
    image: "/assets/th18.webp",
    focus: "Anti-Root Rider & Core Traps",
    description: "Built for top tier competitive play with lethal giga-core dead zones.",
    totalBases: "4 Layouts",
  },
  {
    level: 17,
    name: "Town Hall 17",
    badge: "CWL META",
    badgeVariant: "tactical",
    image: "/assets/th17.webp",
    focus: "Super Archer & Lalo Denial",
    description: "Proven anti-3 star tournament bases built for maximum CWL star denial.",
    totalBases: "8 Layouts",
  },
  {
    level: 16,
    name: "Town Hall 16",
    badge: "PRO TESTED",
    badgeVariant: "default",
    image: "/assets/th16.webp",
    focus: "Merged Defenses Isolation",
    description: "Hard-mode verified layouts balancing outer funnels and deep hero routing.",
    totalBases: "6 Layouts",
  },
  {
    level: 15,
    name: "Town Hall 15",
    badge: "LEGEND PUSH",
    badgeVariant: "outline",
    image: "/assets/th15.webp",
    focus: "Spell Tower Isolation",
    description: "Trophy-holding defensive fortresses designed for Legend League survival.",
    totalBases: "5 Layouts",
  },
];

const FILTER_TABS = [
  { label: "All Tiers", value: "all" as const },
  { label: "TH 18", value: 18 },
  { label: "TH 17", value: 17 },
  { label: "TH 16", value: 16 },
  { label: "TH 15", value: 15 },
];

export function TownHallSelector() {
  const [activeTab, setActiveTab] = React.useState<"all" | number>("all");
  const { prefersReduced } = useAnimationPreference();

  const filteredTiers =
    activeTab === "all"
      ? TOWN_HALL_TIERS
      : TOWN_HALL_TIERS.filter((t) => t.level === activeTab);

  return (
    <section className="py-16 sm:py-24 border-b border-[#262B35] bg-[#0E1117]">
      <Container size="default">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-amber-500">
              <Layers className="w-3.5 h-3.5" />
              <span>Choose Your Defensive Tier</span>
            </div>
            <h2 className="font-clash text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              Tournament Town Hall Tiers
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl">
              Targeted defensive architectures designed specifically around the distinct offensive meta of each Town Hall level.
            </p>
          </div>

          <Link
            href="/all-products"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-amber-400 hover:text-amber-300 transition group"
          >
            <span>View All Base Tiers</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Town Hall Filter Tabs with shared-layout indicator */}
        <div className="flex items-center gap-1.5 p-1 mb-8 rounded-lg bg-[#12151B] border border-[#262B35] w-fit max-w-full overflow-x-auto">
          {FILTER_TABS.map((tab) => {
            const isActive = activeTab === tab.value;
            return (
              <button
                key={tab.label}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                className={cn(
                  "relative px-4 py-2 text-xs font-mono font-semibold rounded-md transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 select-none whitespace-nowrap",
                  isActive ? "text-black" : "text-[#94A3B8] hover:text-[#F1F5F9]"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId={prefersReduced ? undefined : "activeTownHallTab"}
                    className="absolute inset-0 bg-amber-500 rounded-md shadow-sm"
                    transition={{
                      type: "spring",
                      stiffness: 450,
                      damping: 32,
                    }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Town Hall Tier Grid with AnimatePresence */}
        <motion.div
          layout={!prefersReduced}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredTiers.map((tier) => (
              <motion.div
                key={tier.level}
                layout={!prefersReduced}
                initial={prefersReduced ? undefined : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={prefersReduced ? undefined : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                whileHover={prefersReduced ? undefined : { y: -5 }}
                className="h-full"
              >
                <Link
                  href={`/all-products?th=${tier.level}`}
                  className="group relative flex flex-col justify-between h-full rounded-xl border border-[#262B35] bg-[#12151B] p-5 transition-colors duration-300 hover:border-amber-500/50 hover:bg-[#161B22] hover:shadow-2xl hover:shadow-amber-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                >
                  {/* Top Row: Tier Level & Badge */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="font-mono text-xs font-bold text-[#64748B] group-hover:text-amber-400 transition-colors">
                        TIER {tier.level}
                      </span>
                      <Badge variant={tier.badgeVariant} className="text-[10px] tracking-wide uppercase px-2 py-0.5">
                        {tier.badge}
                      </Badge>
                    </div>

                    {/* Town Hall Visual Asset */}
                    <div className="relative w-full h-40 flex items-center justify-center my-3 select-none">
                      <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative w-36 h-36">
                        <Image
                          src={tier.image}
                          alt={`${tier.name} Defensive Base Art`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-contain filter drop-shadow-[0_12px_18px_rgba(0,0,0,0.7)] group-hover:scale-105 group-hover:rotate-1 transition-all duration-300"
                        />
                      </div>
                    </div>

                    {/* Tier Title */}
                    <h3 className="font-clash text-2xl font-bold text-[#F1F5F9] group-hover:text-amber-400 transition-colors">
                      {tier.name}
                    </h3>

                    {/* Defensive Focus */}
                    <div className="flex items-center gap-1.5 mt-1.5 text-xs font-semibold text-amber-500/90">
                      <Shield className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{tier.focus}</span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-[#94A3B8] mt-2.5 leading-relaxed line-clamp-2">
                      {tier.description}
                    </p>
                  </div>

                  {/* Bottom Card Footer */}
                  <div className="pt-4 mt-5 border-t border-[#1E232B] flex items-center justify-between text-xs text-[#64748B]">
                    <span className="font-mono text-[11px]">{tier.totalBases}</span>
                    <span className="inline-flex items-center gap-1 text-amber-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                      Explore <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
