"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipToContent } from "@/components/layout/SkipToContent";
import { cn } from "@/lib/utils";

export interface SiteShellProps {
  children: React.ReactNode;
  className?: string;
}

export function SiteShell({ children, className }: SiteShellProps) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-[#090B0E] text-[#F1F5F9] selection:bg-amber-500 selection:text-black">
        <SkipToContent />
        <main id="main-content" className={cn("min-h-screen", className)}>
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0D11] text-[#F1F5F9] selection:bg-amber-500 selection:text-black">
      <SkipToContent />
      <Header />
      <main id="main-content" className={cn("flex-1", className)}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

