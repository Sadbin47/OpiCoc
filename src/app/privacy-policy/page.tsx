import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageTransition } from "@/components/motion/PageTransition";
import { ShieldCheck, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | OPICOC",
  description:
    "Learn how OPICOC collects, protects, and manages customer personal information with strict data privacy and zero credential retention.",
};

export default function PrivacyPolicyPage() {
  return (
    <PageTransition className="py-12 sm:py-20 bg-[#0B0D11]">
      <Container size="default">
        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>DATA PRIVACY & PROTECTION</span>
          </div>
          <h1 className="font-clash text-4xl sm:text-5xl font-bold tracking-tight text-[#F1F5F9]">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-[#94A3B8]">Last Updated: March 2026</p>
        </div>

        {/* Content Body */}
        <div className="max-w-3xl rounded-2xl border border-[#262B35] bg-[#12151B] p-5 sm:p-8 md:p-10 space-y-8 text-sm text-[#94A3B8] leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="font-clash text-xl font-bold text-[#F1F5F9]">1. Overview & Commitment</h2>
            <p>
              OPICOC (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting
              your privacy. This Privacy Policy outlines what information we collect when you visit
              our website or purchase base layouts, how we use and protect that information, and your
              rights under applicable global data protection regulations (including GDPR and CCPA).
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="font-clash text-xl font-bold text-[#F1F5F9]">
              2. Information We Explicitly NEVER Collect
            </h2>
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-[#CBD5E1] space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <Lock className="w-4 h-4" />
                <span>Zero Game Credential Collection</span>
              </div>
              <p>
                We do NOT collect, ask for, store, or have access to your Clash of Clans login credentials,
                passwords, Supercell ID verification codes, or Google Play / Apple Game Center passwords.
                Our service delivers official deep-links that operate entirely outside of player authentication.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="font-clash text-xl font-bold text-[#F1F5F9]">
              3. Information We Do Collect
            </h2>
            <p>We collect only the minimal information required to manage orders and authenticate users:</p>
            <ul className="list-disc pl-5 space-y-2 text-xs text-[#CBD5E1]">
              <li>
                <strong>Account Information:</strong> First name, last name, and email address when you
                create an account or request a custom base. Passwords are cryptographically hashed using
                industry-standard salt/hash algorithms and are never stored in plaintext.
              </li>
              <li>
                <strong>Transactional Records:</strong> Order IDs, purchased base layout items, dates of
                purchase, and payment confirmation statuses. We do NOT store credit card numbers directly;
                all card processing is handled by secure PCI-DSS compliant payment gateways.
              </li>
              <li>
                <strong>Technical Logs:</strong> IP address, browser type, and timestamps used solely
                for bot mitigation, rate-limiting OTP requests, and DDoS defense.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="font-clash text-xl font-bold text-[#F1F5F9]">
              4. Cookies & Client-Side Storage
            </h2>
            <p>
              OPICOC uses minimal, privacy-conscious cookies and local storage tokens strictly for:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#CBD5E1]">
              <li>Maintaining your authenticated session across page navigations.</li>
              <li>Preserving items in your shopping cart before checkout.</li>
              <li>Saving UI preferences (such as reduced-motion preferences).</li>
            </ul>
            <p className="text-xs">
              We do not use invasive third-party cross-site behavioral tracking cookies or sell your
              browsing data to ad brokers.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="font-clash text-xl font-bold text-[#F1F5F9]">
              5. How We Protect Your Data
            </h2>
            <p>
              All communications between your browser and OPICOC servers are encrypted using Transport
              Layer Security (TLS 1.3). Database collections containing user information are protected
              behind firewall rules and role-based access controls.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="font-clash text-xl font-bold text-[#F1F5F9]">
              6. Your Privacy Rights (GDPR & CCPA)
            </h2>
            <p>Depending on your jurisdiction, you have the right to:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
              <div className="p-3 rounded-lg bg-[#1A1E26] border border-[#262B35]">
                <strong className="text-[#F1F5F9] block mb-1">Right to Access</strong>
                Request a copy of personal information stored about your account.
              </div>
              <div className="p-3 rounded-lg bg-[#1A1E26] border border-[#262B35]">
                <strong className="text-[#F1F5F9] block mb-1">Right to Erasure</strong>
                Request permanent deletion of your account and associated order metadata.
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section className="space-y-3 pt-4 border-t border-[#1E232B]">
            <h2 className="font-clash text-xl font-bold text-[#F1F5F9]">
              7. Contact Data Privacy Officer
            </h2>
            <p>
              To exercise your privacy rights or request data removal, submit a request via our{" "}
              <Link href="/contact-us" className="text-amber-400 hover:underline">
                Contact Page
              </Link>{" "}
              or email{" "}
              <a href="mailto:support@opicoc.com" className="text-amber-400 hover:underline">
                support@opicoc.com
              </a>{" "}
              with the subject &ldquo;Data Privacy Request&rdquo;.
            </p>
          </section>
        </div>
      </Container>
    </PageTransition>
  );
}
