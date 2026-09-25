import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { BaseCard } from "@/features/bases/components/BaseCard";
import { MotionContainer } from "@/components/motion/MotionContainer";
import { BaseProduct } from "@/types";
import { Flame, ArrowRight } from "lucide-react";

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

        {/* Staggered Base Products Grid */}
        <MotionContainer animation="stagger" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bases.map((base, idx) => (
            <BaseCard key={base.id} base={base} priority={idx < 4} />
          ))}
        </MotionContainer>
      </Container>
    </section>
  );
}
