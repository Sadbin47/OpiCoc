import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { ShieldCheck, Zap, ArrowLeft } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12 sm:py-16 bg-[#0B0D11] relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <Container size="narrow" className="relative z-10 w-full">
        {/* Back to Home Button */}
        <div className="mb-6 flex justify-start">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#94A3B8] hover:text-amber-400 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to OPICOC Home
          </Link>
        </div>

        {/* Brand Card Wrapper */}
        <div className="rounded-2xl border border-[#262B35] bg-[#12151B] p-5 sm:p-8 md:p-10 shadow-2xl space-y-6">
          {/* Header Brand Identity */}
          <div className="text-center space-y-3">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <Image
                src="/assets/logo.png"
                alt="OPICOC Logo"
                width={40}
                height={40}
                className="rounded transition-transform group-hover:scale-105"
              />
              <span className="font-clash text-2xl font-bold tracking-tight text-[#F1F5F9]">
                OPICOC
              </span>
            </Link>
          </div>

          {/* Form Content */}
          {children}

          {/* Security & Compliance Trust Bar */}
          <div className="pt-6 border-t border-[#1E232B] flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#64748B]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Supercell Compliant
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Instant Digital Delivery
            </span>
          </div>
        </div>

        {/* Legal Disclaimers */}
        <div className="mt-8 text-center text-xs text-[#64748B] space-y-1">
          <p>
            By continuing, you agree to our{" "}
            <Link href="/terms-conditions" className="text-amber-400 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="text-amber-400 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </Container>
    </div>
  );
}
