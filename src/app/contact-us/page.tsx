import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/features/contact/components/ContactForm";
import {
  Mail,
  MessageCircle,
  Clock,
  Sparkles,
  HelpCircle,
  Share2,
} from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact Us | OPICOC Support & Inquiries",
  description:
    "Get in touch with the OPICOC team for order support, custom base commissions, clan partnerships, or strategic layout assistance.",
};

export default function ContactUsPage() {
  return (
    <div className="py-12 sm:py-20 bg-[#0B0D11]">
      <Container size="default">
        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
            <Mail className="w-3.5 h-3.5" />
            <span>DIRECT BUILDER COMMUNICATION</span>
          </div>
          <h1 className="font-clash text-4xl sm:text-5xl font-bold tracking-tight text-[#F1F5F9]">
            Contact Our Defense Team
          </h1>
          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
            Have questions regarding a base layout, custom order requirements, or CWL strategy?
            Our builders and customer support engineers are ready to assist.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Right: Contact Information Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Response Badge */}
            <div className="p-6 rounded-xl border border-[#262B35] bg-[#12151B] space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#F1F5F9]">Response Guarantee</h3>
                  <p className="text-xs text-[#64748B] font-mono">Typically within 2-4 hours</p>
                </div>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                During Clan War League week, our team operates extended hours to assist with urgent base replacement requests and strategic layout questions.
              </p>
            </div>

            {/* Direct Channels */}
            <div className="p-6 rounded-xl border border-[#262B35] bg-[#12151B] space-y-4">
              <h3 className="text-sm font-semibold text-[#F1F5F9] flex items-center gap-2">
                <Share2 className="w-4 h-4 text-amber-400" />
                Direct Communication Channels
              </h3>

              <div className="space-y-3 text-xs">
                {/* Email */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#1A1E26] border border-[#262B35]">
                  <div className="flex items-center gap-2 text-[#CBD5E1]">
                    <Mail className="w-4 h-4 text-amber-400" />
                    <span>Support Email</span>
                  </div>
                  <a
                    href={`mailto:${siteConfig.supportEmail}`}
                    className="font-mono text-amber-400 hover:underline"
                  >
                    {siteConfig.supportEmail}
                  </a>
                </div>

                {/* Discord */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#1A1E26] border border-[#262B35]">
                  <div className="flex items-center gap-2 text-[#CBD5E1]">
                    <MessageCircle className="w-4 h-4 text-[#5865F2]" />
                    <span>Discord Community</span>
                  </div>
                  <a
                    href={siteConfig.socials.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sky-400 hover:underline"
                  >
                    Join Server
                  </a>
                </div>

                {/* YouTube */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#1A1E26] border border-[#262B35]">
                  <div className="flex items-center gap-2 text-[#CBD5E1]">
                    <Sparkles className="w-4 h-4 text-red-400" />
                    <span>Defense Replays</span>
                  </div>
                  <a
                    href={siteConfig.socials.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-red-400 hover:underline"
                  >
                    @Opi333coc
                  </a>
                </div>
              </div>
            </div>

            {/* Quick FAQ Callout */}
            <div className="p-6 rounded-xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-semibold text-[#F1F5F9]">Looking for Instant Answers?</h4>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Most common questions regarding link delivery, game compatibility, and payment options are already answered in our FAQ.
                </p>
                <div className="pt-2">
                  <Link
                    href="/faq"
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 underline underline-offset-2"
                  >
                    Read Frequently Asked Questions &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
