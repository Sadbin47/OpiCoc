import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { DesktopNav } from "@/components/layout/DesktopNav";
import { MobileNav } from "@/components/layout/MobileNav";
import { UserNavButton } from "@/components/layout/UserNavButton";
import { ShoppingCart } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#262B35] bg-[#0B0D11]/90 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <MobileNav />
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/assets/logo.png"
              alt="OPICOC Logo"
              width={34}
              height={34}
              className="rounded object-contain transition-transform group-hover:scale-105"
              priority
            />
            <span className="font-clash text-2xl font-bold tracking-tight text-[#F1F5F9] flex items-center gap-1">
              OPICOC
              <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-amber-500 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded">
                V2
              </span>
            </span>
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <DesktopNav />

        {/* Right: Actions (Cart & Auth) */}
        <div className="flex items-center gap-2.5">
          {/* Shopping Cart Button */}
          <Link
            href="/cart"
            className="relative flex items-center justify-center h-9 w-9 rounded-md border border-[#262B35] bg-[#12151B] text-[#CBD5E1] hover:text-[#F1F5F9] hover:border-[#3B4252] transition outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label="Shopping Cart (0 items)"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-black shadow-sm">
              0
            </span>
          </Link>

          {/* User Sign In / Profile Button */}
          <UserNavButton />
        </div>
      </div>
    </header>
  );
}
