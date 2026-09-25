"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Shield, ExternalLink, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon-sm"
          className="lg:hidden text-[#94A3B8] hover:text-[#F1F5F9]"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-[85vw] max-w-xs flex flex-col p-5 bg-[#0B0D11]">
        <SheetHeader className="text-left pb-4 border-b border-[#1E232B]">
          <SheetTitle className="flex items-center gap-2.5">
            <Image
              src="/assets/logo.png"
              alt="OPICOC Logo"
              width={32}
              height={32}
              className="rounded"
            />
            <span className="font-clash text-xl font-bold tracking-tight text-[#F1F5F9]">
              OPICOC
            </span>
          </SheetTitle>
        </SheetHeader>

        {/* Scrollable Nav Items */}
        <div className="flex-1 overflow-y-auto py-4 space-y-6">
          {/* Main Navigation */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider px-2 block mb-2">
              Menu
            </span>
            {siteConfig.navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/20"
                    : "text-[#CBD5E1] hover:bg-[#12151B] hover:text-[#F1F5F9]"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Town Hall Quick Access */}
          <div className="space-y-1 pt-2 border-t border-[#1E232B]">
            <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider px-2 block mb-2">
              Town Hall Tiers
            </span>
            {siteConfig.townHalls.map((th) => (
              <Link
                key={th.level}
                href={th.path}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                  pathname === th.path
                    ? "bg-[#1A1E26] text-amber-400 font-semibold"
                    : "text-[#94A3B8] hover:bg-[#12151B] hover:text-[#F1F5F9]"
                )}
              >
                <span className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-amber-500" />
                  {th.name}
                </span>
                {th.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {th.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="pt-4 border-t border-[#1E232B] space-y-3">
          <Link
            href="/cart"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-amber-500 text-black font-semibold text-sm hover:bg-amber-600 transition"
          >
            View Cart
          </Link>
          <div className="flex items-center justify-between text-xs text-[#64748B] px-1">
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              support@opicoc.com
            </span>
            <a
              href="https://discord.gg/GfwZjJjUe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:underline flex items-center gap-1"
            >
              Discord <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
