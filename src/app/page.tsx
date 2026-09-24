import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Sparkles, Terminal, Award, BookOpen, Layers, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <Section spacing="lg" className="border-b border-[#1E232B] bg-gradient-to-b from-[#0E1117] to-transparent">
        <Container size="default">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#1A1E26] text-[#94A3B8] border border-[#262B35]">
              <Shield className="w-3.5 h-3.5 text-amber-500" />
              Competitive Clash of Clans Base Defense Rebuild
            </div>

            <h1 className="font-clash text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9]">
              Engineered for <span className="text-amber-500">Unbeatable Defense</span>
            </h1>

            <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
              OPICOC V2 is undergoing a complete architectural reconstruction. Built from the ground up for sub-second speeds, WCAG AA accessibility, zero layout leaks, and tournament-grade reliability.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Button asChild size="lg">
                <Link href="/all-products" className="flex items-center gap-2">
                  Explore Town Hall Bases
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/design-system" className="flex items-center gap-2 font-mono text-xs">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Inspect Design System
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Town Hall Tier Matrix */}
      <Section spacing="default">
        <Container size="default">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#1E232B]">
            <div>
              <h2 className="font-clash text-2xl sm:text-3xl font-bold text-[#F1F5F9] flex items-center gap-2.5">
                <Award className="w-6 h-6 text-amber-500" />
                Audited Town Hall Defense Tiers
              </h2>
              <p className="text-sm text-[#94A3B8] mt-1">
                Targeted meta layouts built to protect Clan War League stars and Legend trophies.
              </p>
            </div>
            <Badge variant="tactical" className="hidden sm:inline-flex">
              Tournament Grade
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {siteConfig.townHalls.map((th) => (
              <Card
                key={th.level}
                interactive
                className="flex flex-col justify-between"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-[#64748B]">LEVEL {th.level}</span>
                    {th.badge ? (
                      <Badge variant="warning">{th.badge}</Badge>
                    ) : (
                      <Badge variant="outline">Meta</Badge>
                    )}
                  </div>
                  <CardTitle className="text-2xl">{th.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    CWL, Legend League & Anti-3 Star Meta Formations.
                  </p>
                  <div className="pt-3 border-t border-[#1E232B] flex items-center justify-between text-xs text-[#64748B]">
                    <span>Status: Phase 04</span>
                    <span className="text-emerald-400 font-mono">Audited</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Architecture & Discovery Specifications Suite */}
      <Section spacing="default" surface="subtle">
        <Container size="default">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#1E232B]">
            <div>
              <h2 className="font-clash text-2xl sm:text-3xl font-bold text-[#F1F5F9] flex items-center gap-2.5">
                <BookOpen className="w-6 h-6 text-amber-500" />
                Architectural Specifications Suite
              </h2>
              <p className="text-sm text-[#94A3B8] mt-1">
                Comprehensive engineering documentation in <code className="text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded font-mono text-xs">docs/</code>
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 w-fit">
              <Terminal className="w-4 h-4" />
              11 Complete Specs
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            {[
              { title: "Visual Direction", path: "docs/visual-direction.md", desc: "Tactical gaming aesthetics, color roles & anti-patterns" },
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
              <div key={doc.path} className="p-4 rounded-xl bg-[#12151B] border border-[#262B35] hover:border-amber-500/30 transition">
                <div className="flex items-center gap-2 mb-1.5">
                  <Layers className="w-4 h-4 text-amber-500" />
                  <span className="font-semibold text-[#F1F5F9]">{doc.title}</span>
                </div>
                <code className="text-xs text-amber-400/80 block mb-2 font-mono">{doc.path}</code>
                <p className="text-xs text-[#94A3B8] leading-relaxed">{doc.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
