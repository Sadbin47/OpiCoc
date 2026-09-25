"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/features/home/components/AddToCartButton";
import { BaseProduct } from "@/types";
import { ShieldCheck, Clock, Eye } from "lucide-react";
import { useAnimationPreference, useSafeVariants } from "@/hooks/useAnimationPreference";
import { staggerItemVariants } from "@/components/motion/variants";

interface BaseCardProps {
  base: BaseProduct;
  priority?: boolean;
}

export function BaseCard({ base, priority = false }: BaseCardProps) {
  const { prefersReduced } = useAnimationPreference();
  const safeVariants = useSafeVariants(staggerItemVariants);

  return (
    <motion.article
      variants={safeVariants}
      whileHover={prefersReduced ? undefined : { y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
      whileTap={prefersReduced ? undefined : { scale: 0.99, transition: { duration: 0.08 } }}
      className="group flex flex-col justify-between rounded-xl border border-[#262B35] bg-[#12151B] overflow-hidden transition-colors duration-300 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/5 focus-within:ring-2 focus-within:ring-amber-500/50"
    >
      {/* Product Image Area */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1A1E26]">
        <Image
          src={base.productImage}
          alt={base.title}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top Badges */}
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

        {/* Season Validity Pill */}
        {base.validityDays !== undefined && (
          <div className="absolute bottom-2.5 right-2.5 z-10 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#0B0D11]/90 text-emerald-400 border border-emerald-500/30 backdrop-blur-sm">
            <Clock className="w-3 h-3" />
            <span>{base.validityDays}d Active</span>
          </div>
        )}
      </div>

      {/* Product Details Area */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#64748B] uppercase tracking-wider mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500/80" />
            <span>{base.townHall}</span>
          </div>

          <h3 className="font-clash text-lg font-bold text-[#F1F5F9] group-hover:text-amber-400 transition-colors line-clamp-1">
            <Link href={`/bases/${base.id}`}>{base.title}</Link>
          </h3>

          <p className="text-xs text-[#94A3B8] mt-2 line-clamp-2 leading-relaxed">
            {base.description}
          </p>
        </div>

        {/* Bottom Actions Row */}
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
    </motion.article>
  );
}
