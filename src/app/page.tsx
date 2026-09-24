import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Shield, Sparkles, Terminal, Award, BookOpen, Layers } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Shell */}
      <header className="sticky top-0 z-40 border-b border-[#262B35] bg-[#0B0D11]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/logo.png"
              alt="OPICOC Logo"
              width={38}
              height={38}
              className="rounded-lg object-contain"
              priority
            />
            <span className="font-clash text-2xl font-bold tracking-tight text-[#F1F5F9]">
              OPICOC <span className="text-amber-500 text-sm font-sans uppercase font-bold tracking-widest ml-1">V2</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#94A3B8]">
            {siteConfig.townHalls.map((th) => (
              <span key={th.level} className="hover:text-amber-500 transition cursor-default">
                {th.name}
              </span>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              Phase 01: Foundation
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#1A1E26] text-[#94A3B8] border border-[#262B35]">
            <Shield className="w-3.5 h-3.5 text-amber-500" />
            Competitive Clash of Clans Base Defense Rebuild
          </div>

          <h1 className="font-clash text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9]">
            Engineered for <span className="text-amber-500">Unbeatable Defense</span>
          </h1>

          <p className="text-lg text-[#94A3B8] leading-relaxed">
            OPICOC V2 is undergoing a complete architectural reconstruction. Built from the ground up for sub-second speeds, WCAG AA accessibility, zero layout leaks, and tournament-grade reliability.
          </p>
        </div>

        {/* Town Hall Tier Matrix */}
        <div className="mt-16">
          <h2 className="text-center font-clash text-xl text-[#F1F5F9] mb-6 flex items-center justify-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            Audited Town Hall Defense Tiers
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {siteConfig.townHalls.map((th) => (
              <div
                key={th.level}
                className="bg-[#12151B] border border-[#262B35] rounded-xl p-5 hover:border-amber-500/40 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-[#94A3B8]">TIER</span>
                    {th.badge && (
                      <span className="px-2 py-0.5 text-xs font-bold rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                        {th.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-clash text-2xl font-bold text-[#F1F5F9]">{th.name}</h3>
                  <p className="text-xs text-[#94A3B8] mt-2">
                    CWL, Legend League & Anti-3 Star Meta Formations
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#1E232B] flex items-center justify-between text-xs text-[#64748B]">
                  <span>Status: Ready for Phase 04</span>
                  <span className="text-emerald-400 font-mono">Audited</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture & Discovery Specifications Suite */}
        <div className="mt-16 bg-[#12151B] border border-[#262B35] rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#1E232B]">
            <div>
              <h2 className="font-clash text-2xl font-bold text-[#F1F5F9] flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-amber-500" />
                Phase 01 Architectural Deliverables
              </h2>
              <p className="text-sm text-[#94A3B8] mt-1">
                Completed factual specifications and engineering blueprints in <code className="text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">docs/</code>
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
              <Terminal className="w-4 h-4" />
              10/10 Docs Generated
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            {[
              { title: "Functionality Map", path: "docs/functionality-map.md", desc: "15 core features mapped with actors, inputs & APIs" },
              { title: "Route Map", path: "docs/route-map.md", desc: "Complete route tree with SEO & mobile considerations" },
              { title: "Data Model", path: "docs/data-model.md", desc: "Normalized relational schema with digital goods isolation" },
              { title: "Engineering Principles", path: "docs/engineering-principles.md", desc: "22 mandatory engineering standards & quality rules" },
              { title: "Design System", path: "docs/design-system.md", desc: "Accessible color tokens, typography & spacing system" },
              { title: "Animation System", path: "docs/animation-system.md", desc: "Motion for React tokens & reduced-motion rules" },
              { title: "Quality Gates", path: "docs/quality-gates.md", desc: "Pre-merge code, performance, a11y & security gates" },
              { title: "Rebuild Roadmap", path: "docs/rebuild-roadmap.md", desc: "15 sequential phases from discovery to day-2 ops" },
              { title: "Architecture Decisions", path: "docs/architecture-decisions.md", desc: "6 ADRs documenting key technology choices" },
              { title: "Security & Secrets", path: "docs/security-and-secrets.md", desc: "Strict credential hygiene and link protection rules" },
            ].map((doc) => (
              <div key={doc.path} className="p-4 rounded-xl bg-[#0B0D11] border border-[#1E232B]">
                <div className="flex items-center gap-2 mb-1.5">
                  <Layers className="w-4 h-4 text-amber-500" />
                  <span className="font-semibold text-[#F1F5F9]">{doc.title}</span>
                </div>
                <code className="text-xs text-amber-400/80 block mb-2">{doc.path}</code>
                <p className="text-xs text-[#94A3B8]">{doc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer Shell */}
      <footer className="mt-auto border-t border-[#262B35] bg-[#0B0D11] py-8 text-center text-xs text-[#64748B]">
        <div className="max-w-7xl mx-auto px-4">
          <p>© {new Date().getFullYear()} OPICOC V2 Platform Rebuild. Clash of Clans is a registered trademark of Supercell.</p>
          <p className="mt-1">Phase 01 Discovery & Project Foundation Complete. Ready for Phase 02 Execution.</p>
        </div>
      </footer>
    </div>
  );
}
