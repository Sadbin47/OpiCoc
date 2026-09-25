import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBaseById, getBasesByTownHall, getAllBases } from "@/services/baseService";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/features/home/components/AddToCartButton";
import { BaseCard } from "@/features/bases/components/BaseCard";
import {
  ShieldCheck,
  Clock,
  Zap,
  CheckCircle2,
  Lock,
  ArrowLeft,
  Sparkles,
  HelpCircle,
} from "lucide-react";

interface BaseDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  const bases = await getAllBases();
  return bases.map((b) => ({ id: b.id }));
}

export async function generateMetadata({ params }: BaseDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const base = await getBaseById(id);

  if (!base) {
    return {
      title: "Base Not Found | OPICOC",
    };
  }

  return {
    title: `${base.title} | OPICOC Pro Bases`,
    description: base.description.slice(0, 160),
    openGraph: {
      title: `${base.title} - ${base.townHall}`,
      description: base.description.slice(0, 160),
      images: [base.productImage],
    },
  };
}

export default async function BaseDetailPage({ params }: BaseDetailPageProps) {
  const { id } = await params;
  const base = await getBaseById(id);

  if (!base) {
    notFound();
  }

  // Fetch related bases from the same Town Hall level
  const relatedAll = await getBasesByTownHall(base.townHallLevel);
  const related = relatedAll.filter((b) => b.id !== base.id).slice(0, 3);

  return (
    <div className="py-12 sm:py-16 bg-[#0B0D11]">
      <Container size="default">
        {/* Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#64748B] mb-8">
          <Link href="/" className="hover:text-amber-400 transition">
            Home
          </Link>
          <span>/</span>
          <Link href="/all-products" className="hover:text-amber-400 transition">
            Bases
          </Link>
          <span>/</span>
          <Link href={`/bases/th/${base.townHallLevel}`} className="hover:text-amber-400 transition">
            {base.townHall}
          </Link>
          <span>/</span>
          <span className="text-[#F1F5F9] truncate max-w-xs">{base.title}</span>
        </div>

        {/* Back Link */}
        <div className="mb-6">
          <Button asChild variant="ghost" size="sm" className="text-xs text-[#94A3B8] hover:text-[#F1F5F9] p-0 h-auto">
            <Link href="/all-products" className="flex items-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Base Catalogue
            </Link>
          </Button>
        </div>

        {/* Product Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Visual Media & Full Details */}
          <div className="lg:col-span-7 space-y-8">
            {/* Main Product Image Container */}
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#262B35] bg-[#12151B] shadow-2xl">
              <Image
                src={base.productImage}
                alt={base.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center"
              />

              {/* Overlaid Badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                <Badge variant="tactical" className="bg-[#0B0D11]/90 text-amber-400 border-amber-500/40 text-xs">
                  {base.townHall}
                </Badge>
                {base.badge && (
                  <Badge variant="outline" className="bg-[#0B0D11]/80 text-[#CBD5E1] text-xs">
                    {base.badge} Pack
                  </Badge>
                )}
              </div>

              {/* Validity Pill */}
              {base.validityDays !== undefined && (
                <div className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-semibold bg-[#0B0D11]/90 text-emerald-400 border border-emerald-500/30 backdrop-blur-sm">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{base.validityDays} Days Season Validity</span>
                </div>
              )}
            </div>

            {/* Tactical Defensive Breakdown */}
            <div className="rounded-xl border border-[#262B35] bg-[#12151B] p-6 space-y-4">
              <h2 className="font-clash text-xl font-bold text-[#F1F5F9] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                Defensive Architecture Specifications
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
                <div className="p-3 rounded-lg bg-[#1A1E26] border border-[#262B35] space-y-1">
                  <span className="text-[#64748B] font-mono block">ATTACK PROFILE COUNTERS</span>
                  <span className="text-[#F1F5F9] font-semibold">Root Rider, Super Archer Blimp, Lalo</span>
                </div>
                <div className="p-3 rounded-lg bg-[#1A1E26] border border-[#262B35] space-y-1">
                  <span className="text-[#64748B] font-mono block">COMPETITIVE FORMAT</span>
                  <span className="text-[#F1F5F9] font-semibold">Clan War League (CWL) & Hard Mode</span>
                </div>
                <div className="p-3 rounded-lg bg-[#1A1E26] border border-[#262B35] space-y-1">
                  <span className="text-[#64748B] font-mono block">CORE PROTECTION</span>
                  <span className="text-[#F1F5F9] font-semibold">Isolated Giga Compartment + Dead Zones</span>
                </div>
                <div className="p-3 rounded-lg bg-[#1A1E26] border border-[#262B35] space-y-1">
                  <span className="text-[#64748B] font-mono block">BUILDER CREDENTIALS</span>
                  <span className="text-[#F1F5F9] font-semibold">{base.createdBy}</span>
                </div>
              </div>

              {/* Description */}
              <div className="pt-4 border-t border-[#1E232B] space-y-2">
                <h3 className="text-sm font-semibold text-[#CBD5E1]">Layout Strategy & Builder Notes</h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed whitespace-pre-line">
                  {base.description}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Purchasing Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <div className="rounded-2xl border border-[#262B35] bg-[#12151B] p-6 sm:p-8 space-y-6 shadow-xl">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono text-[#64748B] uppercase">DIGITAL PRODUCT</span>
                  <Badge variant="tactical" className="text-[10px]">
                    VERIFIED CWL
                  </Badge>
                </div>
                <h1 className="font-clash text-2xl sm:text-3xl font-bold text-[#F1F5F9] leading-tight">
                  {base.title}
                </h1>
                <p className="text-xs text-[#94A3B8] mt-1.5">{base.townHall} • Anti-3 Star Meta</p>
              </div>

              {/* Price Block */}
              <div className="p-4 rounded-xl bg-[#1A1E26] border border-[#262B35] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#64748B] font-mono block">PRICE</span>
                  <span className="font-clash text-3xl font-bold text-amber-400">
                    ${base.price.toFixed(2)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-emerald-400 block font-semibold">
                    Instant Delivery
                  </span>
                  <span className="text-[11px] text-[#64748B]">Digital Supercell Link</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <AddToCartButton
                  base={base}
                  className="w-full py-6 text-sm font-bold shadow-lg shadow-amber-500/20"
                />
                <Button asChild variant="outline" className="w-full py-5 text-xs font-semibold">
                  <Link href="/cart">Proceed to Checkout</Link>
                </Button>
              </div>

              {/* Security & Delivery Guarantee List */}
              <div className="space-y-3 pt-4 border-t border-[#1E232B] text-xs text-[#94A3B8]">
                <div className="flex items-start gap-2.5">
                  <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Instant Game Import:</strong> Official 1-tap Supercell layout link provided in your account dashboard.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>100% Ban-Safe:</strong> We never request game logins or passwords. Fully compliant with Supercell TOS.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Pro Builder Support:</strong> Direct Discord assistance available if you have questions regarding trap adjustments.
                  </span>
                </div>
              </div>
            </div>

            {/* Need Help Box */}
            <div className="rounded-xl border border-[#262B35] bg-[#12151B]/60 p-4 flex items-center justify-between text-xs text-[#94A3B8]">
              <span className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-500" />
                Questions before ordering?
              </span>
              <Link href="/faq" className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2">
                View FAQs
              </Link>
            </div>
          </div>
        </div>

        {/* Related Bases Section */}
        {related.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#1E232B] space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-clash text-2xl font-bold text-[#F1F5F9] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  More {base.townHall} Layouts
                </h2>
                <p className="text-xs text-[#94A3B8] mt-1">
                  Alternative defensive architectures for different war matchups.
                </p>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href={`/bases/th/${base.townHallLevel}`}>View All {base.townHall}</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel) => (
                <BaseCard key={rel.id} base={rel} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
