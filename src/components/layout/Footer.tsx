import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-[#262B35] bg-[#08090C] text-[#94A3B8] transition-colors mt-auto">
      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/assets/logo.png"
                alt="OPICOC Logo"
                width={36}
                height={36}
                className="rounded"
              />
              <span className="font-clash text-2xl font-bold tracking-tight text-[#F1F5F9]">
                OPICOC <span className="text-amber-500 text-xs font-sans">V2</span>
              </span>
            </Link>

            <p className="text-sm text-[#94A3B8] leading-relaxed max-w-sm">
              The premier defensive engineering workshop for Clash of Clans. Tournament-grade Town Hall layouts, CWL anti-3-star designs, and custom clan war commissions.
            </p>

            <div className="pt-2">
              <a
                href={`mailto:${siteConfig.supportEmail}`}
                className="inline-flex items-center gap-2 text-sm text-[#CBD5E1] hover:text-amber-400 transition"
              >
                <Mail className="w-4 h-4 text-amber-500" />
                {siteConfig.supportEmail}
              </a>
            </div>

            {/* Newsletter Mini Form (Leaf Client Component) */}
            <NewsletterForm />
          </div>

          {/* Column 2: Defense Tiers */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#F1F5F9] uppercase tracking-wider">
              Base Layouts
            </h4>
            <ul className="space-y-2 text-sm">
              {siteConfig.townHalls.map((th) => (
                <li key={th.level}>
                  <Link
                    href={th.path}
                    className="hover:text-amber-400 transition flex items-center justify-between"
                  >
                    <span>{th.name}</span>
                    {th.badge && (
                      <span className="text-[10px] font-bold text-amber-400 font-mono">
                        {th.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/all-products"
                  className="text-amber-400 hover:text-amber-300 font-medium transition"
                >
                  Browse All Bases →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#F1F5F9] uppercase tracking-wider">
              Platform
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/custom-base" className="hover:text-amber-400 transition">
                  Custom Base Design
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 transition">
                  About OPICOC
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-amber-400 transition">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-amber-400 transition">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/design-system" className="hover:text-amber-400 transition font-mono text-xs text-[#64748B]">
                  Design System Preview
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Community & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#F1F5F9] uppercase tracking-wider">
              Community & Legal
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={siteConfig.socials.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition"
                >
                  Official Discord
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition"
                >
                  YouTube Showcase
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.socials.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition"
                >
                  X (Twitter) Updates
                </a>
              </li>
              <li className="pt-2">
                <Link href="/terms-conditions" className="hover:text-amber-400 transition text-xs">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-amber-400 transition text-xs">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-10 mt-10 border-t border-[#1E232B] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <p>
            © {new Date().getFullYear()} OPICOC V2. All rights reserved. This site is not affiliated with, endorsed, sponsored, or specifically approved by Supercell.
          </p>
          <div className="flex items-center gap-4 text-[#64748B]">
            <Link href="/terms-conditions" className="hover:underline">
              Terms
            </Link>
            <span>•</span>
            <Link href="/privacy-policy" className="hover:underline">
              Privacy
            </Link>
            <span>•</span>
            <Link href="/faq" className="hover:underline">
              FAQs
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
