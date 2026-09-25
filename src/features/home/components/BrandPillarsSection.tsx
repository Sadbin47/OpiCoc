import { Container } from "@/components/layout/Container";
import { ShieldCheck, Target, Lock, RefreshCw, Award, Check } from "lucide-react";

export function BrandPillarsSection() {
  const pillars = [
    {
      icon: Target,
      title: "Asymmetric Star-Denial Architecture",
      description:
        "Every base is mathematically constructed to deny the 3rd star. Compartmentalized defense modules ensure that offensive troops cannot sweep through connected pathways without triggering fatal crossfire.",
      points: ["Split Giga-Core", "Offset Town Hall baiting", "Anti-Zap trap clusters"],
    },
    {
      icon: Award,
      title: "Hard Mode & Tournament Tested",
      description:
        "We do not release untested designs. Every layout undergoes continuous scrimmage testing against champion-tier war clans utilizing the most punishing offensive strategies of the current season meta.",
      points: ["Esports tournament verified", "Friendly war stress-tested", "Time-fail perimeter calibration"],
    },
    {
      icon: Lock,
      title: "100% Ban-Safe & Supercell Compliant",
      description:
        "We provide official Clash of Clans deep-links that import directly into your layout editor. We will NEVER ask for your game password, Supercell ID verification code, or account credentials.",
      points: ["Official in-game import links", "Zero credential sharing", "TOS safe digital delivery"],
    },
    {
      icon: RefreshCw,
      title: "Active Meta Recalibration",
      description:
        "Clash of Clans meta shifts with balance changes, new hero equipment, and troop buffs. Our builders continuously calibrate trap placements and defense spacing to thwart emerging attack trends.",
      points: ["Updated for balance patches", "Anti-equipment defense spacing", "Fresh season variants"],
    },
  ];

  return (
    <section className="py-16 sm:py-24 border-b border-[#262B35] bg-[#0B0D11]">
      <Container size="default">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-amber-500">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>The OPICOC Standard</span>
          </div>
          <h2 className="font-clash text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
            The Science of Unbeatable Defense
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            Built by competitive esports builders with one relentless mission: ensuring your clan wins wars and holds trophies.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="rounded-xl border border-[#262B35] bg-[#12151B] p-6 lg:p-8 flex flex-col justify-between transition hover:border-amber-500/30"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-clash text-xl font-bold text-[#F1F5F9] mb-2.5">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-5">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1E232B] flex flex-wrap gap-2">
                  {pillar.points.map((pt, pIdx) => (
                    <span
                      key={pIdx}
                      className="inline-flex items-center gap-1.5 text-xs text-[#CBD5E1] bg-[#1A1E26] px-2.5 py-1 rounded-md border border-[#262B35]"
                    >
                      <Check className="w-3 h-3 text-emerald-400" />
                      {pt}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Supercell Disclaimer Note */}
        <div className="mt-12 p-4 rounded-xl bg-[#12151B]/50 border border-[#1E232B] text-center max-w-3xl mx-auto">
          <p className="text-[11px] text-[#64748B] leading-relaxed">
            <span className="font-semibold text-[#94A3B8]">Supercell Fair Play Disclaimer:</span>{" "}
            This material is unofficial and is not endorsed by Supercell. For more information see
            Supercell&apos;s Fan Content Policy:{" "}
            <a
              href="https://supercell.com/en/fan-content-policy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-500/80 hover:text-amber-400 underline underline-offset-2"
            >
              supercell.com/fan-content-policy
            </a>
            . Clash of Clans and its logos are trademarks of Supercell.
          </p>
        </div>
      </Container>
    </section>
  );
}
