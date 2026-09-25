import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageTransition } from "@/components/motion/PageTransition";
import { HelpCircle, Sparkles, MessageCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ) | OPICOC",
  description:
    "Everything you need to know about OPICOC base layouts, instant Supercell link imports, fair play compliance, CWL testing, and custom base orders.",
};

const FAQ_ITEMS = [
  {
    category: "Delivery & Game Import",
    question: "How do I receive and import my base layout into Clash of Clans?",
    answer:
      "Immediately after completing checkout, you will receive an official Supercell deep-link in your account dashboard. Clicking this link automatically opens Clash of Clans on your device and imports the layout directly into your village layout editor with a single tap. The process takes less than 30 seconds.",
  },
  {
    category: "Delivery & Game Import",
    question: "Do I ever need to share my Clash of Clans account login or password?",
    answer:
      "Never. OPICOC will never ask for your game password, email login, or Supercell ID verification code. All layouts are delivered strictly through official in-game layout sharing links provided by Supercell's API.",
  },
  {
    category: "Delivery & Game Import",
    question: "What happens if a layout link expires or Supercell resets links?",
    answer:
      "All active base packs purchased on OPICOC are backed by lifetime dashboard access during their validity season. If a link ever expires or requires refreshing after a game update, simply log in to your OPICOC dashboard to generate an updated active link at zero extra charge.",
  },
  {
    category: "Defensive Strategy & Testing",
    question: "How are OPICOC base layouts tested before release?",
    answer:
      "Every base design undergoes multiple rounds of competitive friendly war scrimmage testing against top 200 global players. We test specifically against the hardest current meta attack compositions—including Root Rider smash, Super Archer blimps, Lavaloon, and Zap Titan setups—in Hard Mode to verify that defensive baiting and core dead zones hold.",
  },
  {
    category: "Defensive Strategy & Testing",
    question: "Can I adjust traps or building placements on my purchased base?",
    answer:
      "Yes. Once the layout is imported into your Clash of Clans game, you have full control over the buildings and traps. However, our builders place traps with precise mathematical spacing to counter specific troop AI pathing. If you need strategic advice before adjusting traps, feel free to contact us via our Discord community.",
  },
  {
    category: "Custom Base Commissions",
    question: "How does a Custom Base commission work?",
    answer:
      "When ordering a custom base, you submit your specific defensive requirements—such as your clan war league tier, target opponent attack styles, or favorite defensive configurations. Our lead builder analyzes your request, crafts a bespoke 1-of-1 layout, and delivers the private link directly to your account within 24 to 48 hours.",
  },
  {
    category: "Compliance & Safety",
    question: "Is using OPICOC compliant with Supercell's Terms of Service?",
    answer:
      "Yes, 100%. We utilize the official layout sharing functionality built into Clash of Clans by Supercell. Because no bots, mods, unauthorized software, or account credentials are ever used, your account remains completely safe and ban-free.",
  },
  {
    category: "Orders & Support",
    question: "What should I do if I have questions or need help with an order?",
    answer:
      "Our support team is available 24/7. You can reach out directly via our Discord server for the fastest response, or email us at support@opicoc.com. We typically respond within minutes.",
  },
];

export default function FaqPage() {
  // Generate FAQPage JSON-LD schema for rich search snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <PageTransition className="py-12 sm:py-20 bg-[#0B0D11]">
      <JsonLd schema={jsonLd} />
      <Container size="default">
        {/* Page Header */}
        <div className="max-w-3xl space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>KNOWLEDGE BASE & SUPPORT</span>
          </div>
          <h1 className="font-clash text-4xl sm:text-5xl font-bold tracking-tight text-[#F1F5F9]">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
            Everything you need to know about our pro Clash of Clans base layouts, instant digital
            delivery, Supercell compliance, and custom base orders.
          </p>
        </div>

        {/* Accordion FAQ Grid */}
        <div className="max-w-3xl rounded-2xl border border-[#262B35] bg-[#12151B] p-6 sm:p-8 mb-16 shadow-xl">
          <Accordion type="single" collapsible className="w-full">
            {FAQ_ITEMS.map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="text-left text-base sm:text-lg font-semibold hover:text-amber-400">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-[#94A3B8] leading-relaxed pt-2">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Still Have Questions Box */}
        <div className="max-w-3xl rounded-2xl border border-[#262B35] bg-gradient-to-r from-amber-500/10 via-[#12151B] to-[#12151B] p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="font-clash text-2xl font-bold text-[#F1F5F9] flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Still Have Questions?
            </h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] max-w-md">
              Our builder support team and community are available on Discord and email to help you choose the right base defense pack.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Button asChild size="default" className="font-semibold gap-2">
              <a href="https://discord.gg/GfwZjJjUe" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4" />
                Join Discord
              </a>
            </Button>
            <Button asChild variant="outline" size="default">
              <Link href="/contact-us" className="flex items-center gap-1.5">
                Contact Us <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </PageTransition>
  );
}
