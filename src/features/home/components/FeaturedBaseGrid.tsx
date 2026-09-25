import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "./AddToCartButton";
import { BaseProduct } from "@/types";
import { Flame, Clock, ShieldCheck, ArrowRight, Eye } from "lucide-react";

interface FeaturedBaseGridProps {
  bases: BaseProduct[];
}

export function FeaturedBaseGrid({ bases }: FeaturedBaseGridProps) {
  if (!bases || bases.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-24 border-b border-[#262B35] bg-[#0B0D11]">
      <Container size="default">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-amber-500">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Hard Mode Tested Meta Formations</span>
            </div>
            <h2 className="font-clash text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              Featured CWL Base Packs
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl">
              Fresh anti-3 star defensive layouts calibrated against the latest balance updates.
              Verified by Champions League competitive builders.
            </p>
          </div>

          <Button asChild variant="outline" size="sm">
            <Link href="/all-products" className="flex items-center gap-1.5 text-xs font-semibold">
              Browse All Products
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </Button>
        </div>

        {/* Base Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bases.map((base) => (
            <div
              key={base.id}
              className="group flex flex-col justify-between rounded-xl border border-[#262B35] bg-[#12151B] overflow-hidden transition-all duration-300 hover:border-amber-500/40 hover:shadow-xl hover:shadow-black/50"
            >
              {/* Product Visual Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1A1E26]">
                <Image
                  src={base.productImage}
                  alt={base.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlaid Badges */}
                <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
                  <Badge variant="tactical" className="bg-[#0B0D11]/90 text-amber-400 border-amber-500/40 text-[10px]">
                    TH{base.townHallLevel}
                  </Badge>
                  {base.badge && (
                    <Badge variant="outline" className="bg-[#0B0D11]/80 text-[#CBD5E1] text-[10px]">
                      {base.badge} Pack
                    </Badge>
                  )}
                </div>

                {/* Validity Badge */}
                {base.validityDays !== undefined && (
                  <div className="absolute bottom-2.5 right-2.5 z-10 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#0B0D11]/90 text-emerald-400 border border-emerald-500/30 backdrop-blur-sm">
                    <Clock className="w-3 h-3" />
                    <span>{base.validityDays}d Active</span>
                  </div>
                )}
              </div>

              {/* Product Body Content */}
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#64748B] uppercase tracking-wider mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-500/80" />
                    <span>{base.townHall}</span>
                  </div>

                  <h3 className="font-clash text-lg font-bold text-[#F1F5F9] group-hover:text-amber-400 transition-colors line-clamp-1">
                    {base.title}
                  </h3>

                  <p className="text-xs text-[#94A3B8] mt-2 line-clamp-2 leading-relaxed">
                    {base.description}
                  </p>
                </div>

                {/* Price and Actions */}
                <div className="pt-4 mt-4 border-t border-[#1E232B] flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-[#64748B] block font-mono">PRICE</span>
                    <span className="font-clash text-xl font-bold text-[#F1F5F9]">
                      ${base.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Button
                      asChild
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#1E232B]"
                      title="View base details"
                    >
                      <Link href={`/bases/${base.id}`} aria-label={`View details for ${base.title}`}>
                        <Eye className="w-4 h-4" />
                      </Link>
                    </Button>
                    <AddToCartButton base={base} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
