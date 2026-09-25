import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getAllBases } from "@/services/baseService";
import { Container } from "@/components/layout/Container";
import { BaseCard } from "@/features/bases/components/BaseCard";
import { BaseFilterBar } from "@/features/bases/components/BaseFilterBar";
import { Button } from "@/components/ui/button";
import { MotionContainer } from "@/components/motion/MotionContainer";
import { PageTransition } from "@/components/motion/PageTransition";
import { Shield, Sparkles, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Clash of Clans Base Layouts",
  description:
    "Explore tournament-grade Town Hall 15 to 18 Clash of Clans base packs. Handcrafted by elite builders for CWL, Legend League, and Anti-3 Star war defense.",
};

interface AllProductsPageProps {
  searchParams: Promise<{
    th?: string;
    search?: string;
    sort?: string;
    page?: string;
  }>;
}

const ITEMS_PER_PAGE = 8;

export default async function AllProductsPage({ searchParams }: AllProductsPageProps) {
  const params = await searchParams;
  const thFilter = params.th ? parseInt(params.th, 10) : undefined;
  const searchTerm = params.search?.toLowerCase().trim() || "";
  const sort = params.sort || "newest";
  const currentPage = Math.max(1, parseInt(params.page || "1", 10));

  const allBases = await getAllBases();

  // Filter bases
  let filtered = allBases.filter((base) => {
    if (thFilter && base.townHallLevel !== thFilter) {
      return false;
    }
    if (searchTerm) {
      const matchTitle = base.title.toLowerCase().includes(searchTerm);
      const matchDesc = base.description.toLowerCase().includes(searchTerm);
      const matchTh = base.townHall.toLowerCase().includes(searchTerm);
      if (!matchTitle && !matchDesc && !matchTh) {
        return false;
      }
    }
    return true;
  });

  // Sort bases
  if (sort === "price-asc") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

  // Pagination
  const totalBases = filtered.length;
  const totalPages = Math.ceil(totalBases / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedBases = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <PageTransition className="py-12 sm:py-16 bg-[#0B0D11]">
      <Container size="default">
        {/* Page Header */}
        <div className="max-w-3xl mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-amber-500">
            <Shield className="w-3.5 h-3.5" />
            <span>Defensive Formations</span>
          </div>
          <h1 className="font-clash text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F1F5F9]">
            Base Layouts
          </h1>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            Every base layout has been battle-tested against current top-tier attack metas in
            high-level CWL wars and Legend League. Digital layout links delivered instantly upon purchase.
          </p>
        </div>

        {/* Filter Bar wrapped in Suspense for client search params */}
        <Suspense fallback={<div className="h-24 rounded-xl bg-[#12151B] animate-pulse mb-8" />}>
          <BaseFilterBar />
        </Suspense>

        {/* Results Metadata Bar */}
        <div className="flex items-center justify-between mb-6 text-xs text-[#64748B]">
          <span>
            Showing <strong className="text-[#F1F5F9]">{filtered.length}</strong> available bases
            {thFilter ? ` for Town Hall ${thFilter}` : ""}
            {searchTerm ? ` matching "${searchTerm}"` : ""}
          </span>
          <span className="font-mono">
            Page {currentPage} of {totalPages}
          </span>
        </div>

        {/* Base Products Grid with Staggered Motion */}
        {paginatedBases.length > 0 ? (
          <MotionContainer
            animation="stagger"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {paginatedBases.map((base, idx) => (
              <BaseCard key={base.id} base={base} priority={idx < 4} />
            ))}
          </MotionContainer>
        ) : (
          <div className="p-12 text-center rounded-xl border border-[#262B35] bg-[#12151B] space-y-4 my-8">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-clash text-xl font-bold text-[#F1F5F9]">No Bases Found</h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] max-w-md mx-auto">
              We couldn&apos;t find any base layouts matching your selected filters. Try resetting your search or exploring another Town Hall tier.
            </p>
            <div className="pt-2">
              <Button asChild variant="outline" size="sm">
                <Link href="/all-products">Reset All Filters</Link>
              </Button>
            </div>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-12 border-t border-[#1E232B] mt-12">
            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNum = i + 1;
              const isCurrent = pageNum === currentPage;
              const query = new URLSearchParams();
              if (params.th) query.set("th", params.th);
              if (params.search) query.set("search", params.search);
              if (params.sort) query.set("sort", params.sort);
              query.set("page", pageNum.toString());

              return (
                <Button
                  key={pageNum}
                  asChild
                  variant={isCurrent ? "primary" : "outline"}
                  size="sm"
                  className="font-mono text-xs w-9 h-9 p-0"
                >
                  <Link href={`/all-products?${query.toString()}`}>{pageNum}</Link>
                </Button>
              );
            })}
          </div>
        )}

        {/* Custom Order Callout */}
        <div className="mt-16 rounded-xl border border-amber-500/20 bg-gradient-to-r from-amber-500/5 via-amber-500/10 to-transparent p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <h3 className="font-clash text-xl font-bold text-[#F1F5F9] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Need a Bespoke Clan War League Strategy Pack?
            </h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl">
              Our esports builders can craft a private custom base designed specifically around your clan&apos;s war roster and opponents.
            </p>
          </div>
          <Button asChild size="default" className="font-semibold shadow-md shrink-0">
            <Link href="/custom-base">Request Custom Base</Link>
          </Button>
        </div>
      </Container>
    </PageTransition>
  );
}
