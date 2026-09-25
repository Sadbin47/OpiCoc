import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedBaseGridSkeleton() {
  return (
    <section className="py-16 sm:py-24 border-b border-[#262B35] bg-[#0B0D11]">
      <Container size="default">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-9 w-72" />
            <Skeleton className="h-4 w-96 max-w-full" />
          </div>
          <Skeleton className="h-9 w-36" />
        </div>

        {/* 4 Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-[#262B35] bg-[#12151B] overflow-hidden p-0"
            >
              <Skeleton className="aspect-[16/10] w-full rounded-none" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-5 w-4/5" />
                <Skeleton className="h-3 w-full" />
                <div className="pt-3 border-t border-[#1E232B] flex items-center justify-between">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
