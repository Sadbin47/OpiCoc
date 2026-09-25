"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Shield, Crosshair, CheckCircle2, Volume2, Sparkles } from "lucide-react";

export function VideoSection() {
  const [isPlaying, setIsPlaying] = React.useState(false);

  return (
    <section id="defense-showcase" className="py-16 sm:py-24 border-b border-[#262B35] bg-[#0B0D11]">
      <Container size="default">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-amber-500">
            <Crosshair className="w-3.5 h-3.5" />
            <span>Tactical Analysis</span>
          </div>
          <h2 className="font-clash text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
            Inside an Anti-3 Star Defense
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            Watch how our tournament-grade base layouts dismantle meta army pushes, trap blimps, and force devastating time-fails.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Video Player Surface */}
          <div className="lg:col-span-7">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-[#262B35] bg-[#12151B] shadow-2xl shadow-black/80">
              {isPlaying ? (
                <video
                  src="https://www.opicoc.cc/assets/video-cGgfOX-2.mp4"
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="relative w-full h-full group cursor-pointer" onClick={() => setIsPlaying(true)}>
                  <Image
                    src="/assets/video-poster.webp"
                    alt="Clash of Clans Defensive Replay Breakdown"
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-center filter brightness-90 contrast-110 group-hover:scale-102 transition-transform duration-500"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <Badge variant="tactical" className="bg-black/70 backdrop-blur-md text-amber-400 border-amber-500/40">
                      LIVE CWL DEFENSE REPLAY
                    </Badge>
                  </div>

                  {/* Play Button Trigger */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <button
                      type="button"
                      onClick={() => setIsPlaying(true)}
                      className="group/btn relative flex items-center justify-center h-20 w-20 rounded-full bg-amber-500 text-black shadow-2xl shadow-amber-500/40 transition-transform duration-300 group-hover:scale-110 focus:outline-none focus:ring-4 focus:ring-amber-500/50"
                      aria-label="Play defense breakdown video"
                    >
                      <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-25" />
                      <Play className="w-8 h-8 fill-current ml-1" />
                    </button>
                  </div>

                  {/* Bottom Video Meta Bar */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 text-[11px] sm:text-xs text-[#CBD5E1] bg-black/70 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/10">
                    <span className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                      <Shield className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">TH18 Hard Mode Vs Super Archer & Root Rider</span>
                    </span>
                    <span className="font-mono text-[#94A3B8] hidden sm:flex items-center gap-1 shrink-0">
                      <Volume2 className="w-3.5 h-3.5" />
                      Click to Play (Lazy Loaded)
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Defensive Breakdown Pillars */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest">
                Defensive Engineering
              </span>
              <h3 className="font-clash text-2xl font-bold text-[#F1F5F9]">
                Why OPICOC Bases Consistently Hold Stars
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                Standard internet bases get crushed because attack paths are predictable. Every OPICOC layout is designed by tournament builders with asymmetric defense geometry.
              </p>
            </div>

            <div className="space-y-3.5 pt-2">
              {[
                {
                  title: "Isolated Giga-Inferno Core",
                  desc: "Forces offensive troops to split around the perimeter while enduring sustained splash damage.",
                },
                {
                  title: "Anti-Blimp Sweeper Coverage",
                  desc: "Air sweepers and hidden seeking air mines configured specifically to shut down battle blimps before drop zones.",
                },
                {
                  title: "High-HP Time-Fail Perimeter",
                  desc: "Calculated storage buffer placements force opponent heroes to exhaust ability timers at 90%+ destruction.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-[#12151B] border border-[#262B35] transition hover:border-amber-500/30"
                >
                  <div className="p-1 rounded-full bg-amber-500/10 text-amber-400 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#F1F5F9]">{item.title}</h4>
                    <p className="text-xs text-[#94A3B8] mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Button asChild variant="outline" size="sm" className="font-mono text-xs">
                <a href="https://www.youtube.com/@Opi333coc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Watch More Replays on YouTube
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
