import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { DesktopNav } from "@/components/layout/DesktopNav";
import { MobileNav } from "@/components/layout/MobileNav";
import { UserNavButton } from "@/components/layout/UserNavButton";
import { HeaderCartButton } from "@/components/layout/HeaderCartButton";

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
            <span className="font-clash text-2xl font-bold tracking-tight text-[#F1F5F9]">
              OPICOC
            </span>
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <DesktopNav />

        {/* Right: Actions (Cart & Auth) */}
        <div className="flex items-center gap-2.5">
          {/* Shopping Cart Button */}
          <HeaderCartButton />

          {/* User Sign In / Profile Button */}
          <UserNavButton />
        </div>
      </div>
    </header>
  );
}
