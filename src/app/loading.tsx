import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Container size="default" className="py-12 space-y-8 animate-pulse">
      {/* Top Banner Skeleton */}
      <div className="space-y-4 max-w-2xl mx-auto text-center flex flex-col items-center">
        <Skeleton className="h-6 w-48 rounded-full" />
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-4 w-full" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-xl border border-[#262B35] bg-[#12151B] p-5 space-y-4">
            <Skeleton className="h-40 w-full rounded-lg" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="pt-2 flex justify-between items-center">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-24 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
