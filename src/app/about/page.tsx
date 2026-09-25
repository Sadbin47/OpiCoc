import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/motion/PageTransition";
import {
  ShieldCheck,
  Award,
  Zap,
  CheckCircle2,
  Users,
  Target,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About OPICOC | Pro Clash of Clans Base Building",
  description:
    "Learn about OPICOC, our championship base building philosophy, our hard-mode scrimmage testing process, and our commitment to fair play defense.",
};

export default function AboutPage() {
  const stats = [
    { label: "Bases Delivered", value: "4,800+", detail: "To competitive war clans worldwide" },
    { label: "CWL Star Denial", value: "99.4%", detail: "Average defensive hold rate in Champs" },
    { label: "Account Bans", value: "0", detail: "100% Supercell TOS deep-link compliant" },
    { label: "Average Delivery", value: "< 30s", detail: "Instant digital layout link access" },
  ];

  const builders = [
    {
      name: "Opi (Lead Architect)",
      role: "Esports Builder & Chief Analyst",
      badge: "Top 50 Global",
      description:
        "Specializes in anti-air pathing, lalo denial, and giga-inferno core geometries. Master of hard-mode tournament meta testing.",
    },
    {
      name: "Summer (War Strategist)",
      role: "CWL Defensive Coordinator",
      badge: "Champs 1 Veteran",
      description:
        "Pioneered asymmetric anti-root rider layouts and unexpected tesla farm baiting for high-trophy Legend League defense.",
    },
    {
      name: "Valk (Trap Engineer)",
      role: "Micro-Trap Specialist",
      badge: "ESL Finalist",
      description:
        "Dedicated to seeking air mine calibration, battle blimp sweeps, and spring trap positioning that dismantles meta pushes.",
    },
  ];

  return (
    <PageTransition className="py-12 sm:py-20 bg-[#0B0D11]">
      <Container size="default">
        {/* Page Hero */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ESTABLISHED COMPETITIVE BASE BUILDING</span>
          </div>
          <h1 className="font-clash text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9]">
            The Science of Unbeatable Defense
          </h1>
          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
            OPICOC was founded by competitive Clash of Clans players who were tired of losing wars
            to copy-paste internet bases. We engineer tournament-grade base layouts designed
            strictly for one purpose: denying opponent stars.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-16 sm:mb-20">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-6 rounded-xl border border-[#262B35] bg-[#12151B] flex flex-col justify-between"
            >
              <span className="font-mono text-2xl sm:text-4xl font-bold text-amber-400">
                {s.value}
              </span>
              <div className="mt-2.5 sm:mt-3">
                <span className="text-xs sm:text-sm font-semibold text-[#F1F5F9] block">{s.label}</span>
                <span className="text-[11px] sm:text-xs text-[#64748B] mt-0.5 block">{s.detail}</span>
              </div>
            </div>
          ))}
        </div>

        {/* The OPICOC Story & Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-amber-500">
              <Target className="w-3.5 h-3.5" />
              <span>Our Origin Story</span>
            </div>
            <h2 className="font-clash text-3xl sm:text-4xl font-bold text-[#F1F5F9]">
              Why Free Internet Bases Fail in High-Level Wars
            </h2>
            <div className="space-y-4 text-sm text-[#94A3B8] leading-relaxed">
              <p>
                In competitive Clan War League and high-trophy Legend League, standard base designs
                are mapped within hours. Attackers rehearse precise blimp drops, hero dive trajectories,
                and zap value calculations because the trap placements are publicly known.
              </p>
              <p>
                At OPICOC, every layout is an original engineering effort. We isolate high-value
                defenses to deny combined spell damage, build bait corridors that redirect pathing
                away from the core, and adjust outer perimeter trash buildings to force 99% time-fails.
              </p>
              <p>
                When you import an OPICOC base, your war opponents are forced to attack completely
                blind against a layout that has been scrimmage-tested against top-tier competitive clans.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="p-6 rounded-xl border border-[#262B35] bg-[#12151B] space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <Award className="w-4 h-4" />
                <span>Hard-Mode Scrimmage Verification</span>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Before any base is approved for public release, it undergoes friendly war testing
                against champion attackers executing the strongest meta army variants of the season.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#262B35] bg-[#12151B] space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <Zap className="w-4 h-4" />
                <span>Instant 1-Tap Supercell Import</span>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Digital fulfillment is fully automated. You receive an official Supercell deep link
                that opens directly into your Clash of Clans layout editor. No account sharing, ever.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#262B35] bg-[#12151B] space-y-3">
              <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>Full Balance Patch Alignment</span>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Every Supercell balance update shifts offensive troop interactions. Our builders
                continually review defense spacing and trap locations to prevent new exploits.
              </p>
            </div>
          </div>
        </div>

        {/* Builder Roster */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-amber-500">
              <Users className="w-3.5 h-3.5" />
              <span>Elite Architects</span>
            </div>
            <h2 className="font-clash text-3xl font-bold text-[#F1F5F9]">
              Meet the OPICOC Base Builders
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              Decades of combined competitive war experience at the pinnacle of Clash of Clans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {builders.map((builder, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-[#262B35] bg-[#12151B] flex flex-col justify-between hover:border-amber-500/30 transition"
              >
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono font-semibold bg-[#1A1E26] text-amber-400 border border-[#262B35] mb-4">
                    <Sparkles className="w-3 h-3" />
                    {builder.badge}
                  </div>
                  <h3 className="font-clash text-xl font-bold text-[#F1F5F9]">{builder.name}</h3>
                  <p className="text-xs text-[#64748B] font-mono mt-0.5 mb-3">{builder.role}</p>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">{builder.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="p-8 sm:p-12 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-[#12151B] to-[#12151B] text-center max-w-3xl mx-auto space-y-4">
          <h3 className="font-clash text-2xl sm:text-3xl font-bold text-[#F1F5F9]">
            Ready to Upgrade Your Clan Defense?
          </h3>
          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-lg mx-auto">
            Browse our curated Town Hall 15 to 18 base packs or commission a custom layout for your next championship war.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="default">
              <Link href="/all-products">Explore Base Layouts</Link>
            </Button>
            <Button asChild variant="outline" size="default">
              <Link href="/custom-base">Request Custom Base</Link>
            </Button>
          </div>
        </div>
      </Container>
    </PageTransition>
  );
}
