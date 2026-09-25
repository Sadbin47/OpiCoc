import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageTransition } from "@/components/motion/PageTransition";
import { FileText, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms and Conditions | OPICOC",
  description:
    "Review OPICOC's terms of service, digital goods licensing policy, Supercell fair play compliance, and refund guidelines.",
};

export default function TermsConditionsPage() {
  return (
    <PageTransition className="py-12 sm:py-20 bg-[#0B0D11]">
      <Container size="default">
        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
            <FileText className="w-3.5 h-3.5" />
            <span>LEGAL & COMPLIANCE</span>
          </div>
          <h1 className="font-clash text-4xl sm:text-5xl font-bold tracking-tight text-[#F1F5F9]">
            Terms and Conditions
          </h1>
          <p className="text-xs font-mono text-[#94A3B8]">Last Updated: March 2026 • Version 2.0</p>
        </div>

        {/* Content Body */}
        <div className="max-w-3xl rounded-2xl border border-[#262B35] bg-[#12151B] p-6 sm:p-10 space-y-8 text-sm text-[#94A3B8] leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="font-clash text-xl font-bold text-[#F1F5F9]">1. Agreement to Terms</h2>
            <p>
              By accessing, browsing, or purchasing products on OPICOC (the &ldquo;Platform&rdquo;,
              accessible at <code className="text-amber-400">opicoc.cc</code>), you agree to be bound
              by these Terms and Conditions. If you do not agree with any part of these terms, you
              must immediately discontinue use of the platform.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="font-clash text-xl font-bold text-[#F1F5F9]">
              2. Nature of Digital Products & Instant Delivery
            </h2>
            <p>
              OPICOC sells digital intangible goods consisting of specialized Clash of Clans base
              layout configurations. Upon successful payment verification, you are granted immediate
              access to official Supercell deep-links (<code className="text-amber-400">link.clashofclans.com</code>)
              accessible within your authenticated customer dashboard.
            </p>
            <p>
              Because digital links are delivered immediately and cannot be recalled once accessed, all
              digital base layout purchases are non-refundable once the layout link has been revealed
              or redeemed.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="font-clash text-xl font-bold text-[#F1F5F9]">
              3. Supercell Fair Play & Intellectual Property
            </h2>
            <div className="p-4 rounded-xl bg-[#1A1E26] border border-[#262B35] space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>Supercell Fan Content Policy Notice</span>
              </div>
              <p className="text-xs text-[#94A3B8]">
                This material is unofficial and is not endorsed by Supercell. For more information,
                see Supercell&apos;s Fan Content Policy:{" "}
                <a
                  href="https://supercell.com/en/fan-content-policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:underline"
                >
                  supercell.com/fan-content-policy
                </a>
                . Clash of Clans, its logos, art, and game assets are registered trademarks of Supercell Oy.
              </p>
            </div>
            <p>
              OPICOC operates strictly within Supercell&apos;s official deep-link sharing APIs. We do not
              develop, promote, distribute, or facilitate any bots, mods, unauthorized scripts, or
              game-altering code.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="font-clash text-xl font-bold text-[#F1F5F9]">
              4. License & Permitted Usage
            </h2>
            <p>
              When you purchase an OPICOC base layout, you are granted a non-exclusive, revocable,
              non-transferable personal license to use the base design in your personal Clash of Clans
              accounts and clan wars. You agree NOT to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#CBD5E1]">
              <li>Resell, redistribute, or republish the layout links publicly on forums or social media.</li>
              <li>Claim intellectual authorship or trademark ownership over the layout design.</li>
              <li>Include OPICOC digital assets in competing commercial base-selling services.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="font-clash text-xl font-bold text-[#F1F5F9]">
              5. Zero Credential Sharing Policy
            </h2>
            <p>
              OPICOC will never solicit, collect, or store your Clash of Clans login credentials,
              Supercell ID emails, or one-time verification passwords. If any individual claiming to
              represent OPICOC requests your game credentials, report them immediately to{" "}
              <a href="mailto:support@opicoc.com" className="text-amber-400 hover:underline">
                support@opicoc.com
              </a>
              .
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="font-clash text-xl font-bold text-[#F1F5F9]">6. Limitation of Liability</h2>
            <p>
              While OPICOC base layouts are rigorously tested against competitive meta strategies,
              defensive outcomes depend on attacker skill levels, troop levels, hero equipment, and
              unpredictable AI interactions. OPICOC does not guarantee a 100% defense win rate in any
              specific war or match. In no event shall OPICOC be liable for indirect, incidental, or
              consequential damages arising from the use of our services.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3 pt-4 border-t border-[#1E232B]">
            <h2 className="font-clash text-xl font-bold text-[#F1F5F9]">7. Contact & Support</h2>
            <p>
              For legal inquiries, copyright concerns, or customer support regarding these terms,
              contact our team via email at{" "}
              <a href="mailto:support@opicoc.com" className="text-amber-400 hover:underline">
                support@opicoc.com
              </a>{" "}
              or submit a request via our{" "}
              <Link href="/contact-us" className="text-amber-400 hover:underline">
                Contact Page
              </Link>
              .
            </p>
          </section>
        </div>
      </Container>
    </PageTransition>
  );
}
