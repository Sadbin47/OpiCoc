"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getClientSession } from "@/services/authService";
import { CustomBaseRequest } from "@/types";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Sparkles,
  ShieldCheck,
  Clock,
  Lock,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useAnimationPreference } from "@/hooks/useAnimationPreference";
import { PageTransition } from "@/components/motion/PageTransition";

const DEFENSE_FOCUS_OPTIONS = [
  "Anti-Root Rider & Ground Smash",
  "Anti-Super Archer Blimp Denial",
  "Anti-Air Lalo & Hydra",
  "CWL Champion Star Denial (Time-Fail)",
  "Legend League 6000+ Trophy Push",
  "Esports Hard Mode Tournament",
];

export default function CustomBasePage() {
  const router = useRouter();
  const { prefersReduced } = useAnimationPreference();

  const [townHall, setTownHall] = React.useState("Town Hall 18");
  const [defenseFocus, setDefenseFocus] = React.useState(DEFENSE_FOCUS_OPTIONS[0]);
  const [requirements, setRequirements] = React.useState("");
  const [priority, setPriority] = React.useState<"standard" | "express">("standard");
  const [referenceUrl, setReferenceUrl] = React.useState("");

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const user = getClientSession();
    if (!user) {
      router.push(`/login?redirectTo=${encodeURIComponent("/custom-base")}`);
      return;
    }

    if (requirements.trim().length < 15) {
      setError("Please provide a bit more detail (at least 15 characters) regarding your defense needs.");
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const existingRequests: CustomBaseRequest[] = JSON.parse(
        localStorage.getItem("opicoc_custom_requests") || "[]"
      );

      const newRequest: CustomBaseRequest = {
        id: `REQ-${Date.now().toString(36).toUpperCase()}`,
        userId: user.id,
        townHall,
        defenseFocus,
        requirements: requirements.trim(),
        referenceImage: referenceUrl.trim() || undefined,
        priority,
        status: "pending",
        createdAt: new Date().toISOString(),
        builderNotes: "Assigned to Lead Architect. Scrimmage testing scheduled.",
      };

      localStorage.setItem(
        "opicoc_custom_requests",
        JSON.stringify([newRequest, ...existingRequests])
      );

      router.push("/profile?tab=requests&submitted=true");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition className="py-12 sm:py-20 bg-[#0B0D11]">
      <Container size="default">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#64748B] mb-8">
          <Link href="/" className="hover:text-amber-400 transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#F1F5F9]">Custom Base Commission</span>
        </div>

        {/* Page Hero */}
        <div className="max-w-3xl space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BESPOKE 1-OF-1 WAR ARCHITECTURE</span>
          </div>
          <h1 className="font-clash text-4xl sm:text-5xl font-bold tracking-tight text-[#F1F5F9]">
            Commission a Private Base Layout
          </h1>
          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
            Every competitive match is unique. Commission our tournament builders to craft an
            exclusive, un-scouted base design tailored specifically to your war roster and target opponents.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Commission Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="space-y-5 rounded-2xl border border-[#262B35] bg-[#12151B] p-6 sm:p-8 shadow-xl"
            >
              {error && (
                <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400">
                  {error}
                </div>
              )}

              {/* Town Hall Tier Select */}
              <div className="space-y-2">
                <Label className="text-xs text-[#CBD5E1]">Town Hall Level</Label>
                <div role="radiogroup" aria-label="Select Town Hall level" className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {["Town Hall 18", "Town Hall 17", "Town Hall 16", "Town Hall 15"].map((th) => {
                    const isSelected = townHall === th;
                    return (
                      <motion.button
                        key={th}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setTownHall(th)}
                        whileTap={prefersReduced ? undefined : { scale: 0.97 }}
                        className={`relative p-3 rounded-lg text-xs font-mono font-semibold transition-all text-center select-none ${
                          isSelected
                            ? "text-black"
                            : "bg-[#1A1E26] text-[#94A3B8] border border-[#262B35] hover:text-[#F1F5F9] hover:bg-[#262B35]"
                        }`}
                      >
                        {isSelected && (
                          <motion.span
                            layoutId={prefersReduced ? undefined : "activeCustomBaseThTab"}
                            className="absolute inset-0 rounded-lg bg-amber-500 shadow-sm"
                            transition={{
                              type: "spring",
                              stiffness: 450,
                              damping: 32,
                            }}
                          />
                        )}
                        <span className="relative z-10">{th}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Defensive Focus Selector */}
              <div className="space-y-2">
                <Label htmlFor="defense-focus" className="text-xs text-[#CBD5E1]">
                  Primary Defensive Objective
                </Label>
                <select
                  id="defense-focus"
                  value={defenseFocus}
                  onChange={(e) => setDefenseFocus(e.target.value)}
                  className="w-full h-11 rounded-lg border border-[#262B35] bg-[#1A1E26] px-3 text-xs text-[#F1F5F9] focus:outline-none focus:border-amber-500"
                >
                  {DEFENSE_FOCUS_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Requirements & War Context */}
              <div className="space-y-2">
                <Label htmlFor="custom-requirements" className="text-xs text-[#CBD5E1]">
                  Specific Requirements & Opponent Attack Styles
                </Label>
                <Textarea
                  id="custom-requirements"
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="e.g. We are facing a top Champs 1 clan who heavily uses Super Archer blimps and Root Riders. We need offset Town Hall with heavy trap clustering on the opposite side to deny blimp landing spots..."
                  rows={5}
                  required
                  className="bg-[#1A1E26] border-[#262B35] text-xs resize-none text-[#F1F5F9]"
                />
              </div>

              {/* Optional Reference Screenshot URL */}
              <div className="space-y-1.5">
                <Label htmlFor="custom-reference" className="text-xs text-[#CBD5E1]">
                  Reference Screenshot / Opponent War Log URL (Optional)
                </Label>
                <Input
                  id="custom-reference"
                  value={referenceUrl}
                  onChange={(e) => setReferenceUrl(e.target.value)}
                  placeholder="https://iili.io/... or Discord attachment link"
                  className="bg-[#1A1E26] border-[#262B35] text-xs h-10 text-[#F1F5F9]"
                />
              </div>

              {/* Priority Turnaround Radio */}
              <div className="space-y-2 pt-2">
                <Label className="text-xs text-[#CBD5E1]">Turnaround Speed</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setPriority("standard")}
                    className={`p-3.5 rounded-xl border cursor-pointer transition ${
                      priority === "standard"
                        ? "border-amber-500 bg-amber-500/10"
                        : "border-[#262B35] bg-[#1A1E26]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#F1F5F9]">Standard Delivery</span>
                      <span className="font-mono text-xs text-amber-400 font-bold">$65</span>
                    </div>
                    <p className="text-[11px] text-[#94A3B8] mt-1">Delivered in 48 Hours</p>
                  </div>

                  <div
                    onClick={() => setPriority("express")}
                    className={`p-3.5 rounded-xl border cursor-pointer transition ${
                      priority === "express"
                        ? "border-amber-500 bg-amber-500/10"
                        : "border-[#262B35] bg-[#1A1E26]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#F1F5F9]">Express Priority</span>
                      <span className="font-mono text-xs text-amber-400 font-bold">$95</span>
                    </div>
                    <p className="text-[11px] text-[#94A3B8] mt-1">Delivered in 24 Hours</p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full py-6 text-sm font-bold shadow-lg shadow-amber-500/20 gap-2"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  {isSubmitting ? "Transmitting Specification..." : "Submit Custom Base Request"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </div>

          {/* Right: Guarantees & Discord Support */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-[#262B35] bg-[#12151B] p-6 sm:p-7 space-y-5 shadow-xl">
              <h3 className="font-clash text-xl font-bold text-[#F1F5F9]">
                The OPICOC Custom Guarantee
              </h3>

              <div className="space-y-4 text-xs text-[#94A3B8]">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 mt-0.5">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#F1F5F9]">1-of-1 Confidentiality</h4>
                    <p className="mt-0.5 leading-relaxed">
                      Your custom base is completely exclusive. It will never be uploaded to our public catalogue, given to other clans, or leaked publicly.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#F1F5F9]">Hard-Mode Scrimmage Tested</h4>
                    <p className="mt-0.5 leading-relaxed">
                      Our builders stress-test your custom layout in private friendly challenges against top-level meta armies before delivery.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#F1F5F9]">Guaranteed Delivery Window</h4>
                    <p className="mt-0.5 leading-relaxed">
                      You receive your official Supercell layout link directly in your customer dashboard within the guaranteed timeframe.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1E232B] flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-[#CBD5E1]">
                  <MessageCircle className="w-4 h-4 text-[#5865F2]" />
                  Need live Discord consultation?
                </span>
                <a
                  href="https://discord.gg/GfwZjJjUe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:underline font-semibold"
                >
                  Join Server &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </PageTransition>
  );
}
