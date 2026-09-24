"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Log unexpected client error to monitoring system in Phase 15
    console.error("Application error boundary triggered:", error);
  }, [error]);

  return (
    <div className="flex-1 flex items-center justify-center py-20 px-4">
      <Container size="narrow" className="text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-400">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="font-clash text-3xl sm:text-4xl font-bold text-[#F1F5F9]">
            Something went wrong
          </h1>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-md mx-auto">
            An unexpected error occurred while loading this section. Our tactical team has been notified.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button onClick={() => reset()} className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
          <Button asChild variant="outline">
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-4 h-4 text-amber-500" />
              Return Home
            </Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}
