"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
      {/* Home Link */}
      <Link
        href="/"
        className={cn(
          "px-3 py-2 text-sm font-medium rounded-md transition-colors",
          pathname === "/"
            ? "text-amber-400 bg-[#1A1E26] font-semibold"
            : "text-[#CBD5E1] hover:text-[#F1F5F9] hover:bg-[#12151B]"
        )}
      >
        Home
      </Link>

      {/* Town Hall / Bases Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors outline-none focus-visible:ring-2 focus-visible:ring-amber-500",
            pathname.startsWith("/bases") || pathname === "/all-products"
              ? "text-amber-400 bg-[#1A1E26] font-semibold"
              : "text-[#CBD5E1] hover:text-[#F1F5F9] hover:bg-[#12151B]"
          )}
        >
          <span>Base Layouts</span>
          <ChevronDown className="w-3.5 h-3.5 opacity-60" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56 p-1.5">
          <DropdownMenuLabel className="text-[11px] text-[#94A3B8]">
            Town Hall Tiers
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {siteConfig.townHalls.map((th) => (
            <DropdownMenuItem key={th.level} asChild>
              <Link
                href={th.path}
                className="flex items-center justify-between w-full cursor-pointer py-2"
              >
                <span className="flex items-center gap-2 font-medium">
                  <Shield className="w-3.5 h-3.5 text-amber-500" />
                  {th.name}
                </span>
                {th.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-amber-500/15 text-amber-400 border border-amber-500/30">
                    {th.badge}
                  </span>
                )}
              </Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link
              href="/all-products"
              className="w-full text-xs font-semibold text-amber-400 hover:text-amber-300 py-2 cursor-pointer"
            >
              Browse All Bases →
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Custom Base Link */}
      <Link
        href="/custom-base"
        className={cn(
          "px-3 py-2 text-sm font-medium rounded-md transition-colors",
          pathname === "/custom-base"
            ? "text-amber-400 bg-[#1A1E26] font-semibold"
            : "text-[#CBD5E1] hover:text-[#F1F5F9] hover:bg-[#12151B]"
        )}
      >
        Custom Base
      </Link>

      {/* About Link */}
      <Link
        href="/about"
        className={cn(
          "px-3 py-2 text-sm font-medium rounded-md transition-colors",
          pathname === "/about"
            ? "text-amber-400 bg-[#1A1E26] font-semibold"
            : "text-[#CBD5E1] hover:text-[#F1F5F9] hover:bg-[#12151B]"
        )}
      >
        About
      </Link>

      {/* FAQs Link */}
      <Link
        href="/faq"
        className={cn(
          "px-3 py-2 text-sm font-medium rounded-md transition-colors",
          pathname === "/faq"
            ? "text-amber-400 bg-[#1A1E26] font-semibold"
            : "text-[#CBD5E1] hover:text-[#F1F5F9] hover:bg-[#12151B]"
        )}
      >
        FAQs
      </Link>

      {/* Contact Link */}
      <Link
        href="/contact-us"
        className={cn(
          "px-3 py-2 text-sm font-medium rounded-md transition-colors",
          pathname === "/contact-us"
            ? "text-amber-400 bg-[#1A1E26] font-semibold"
            : "text-[#CBD5E1] hover:text-[#F1F5F9] hover:bg-[#12151B]"
        )}
      >
        Contact
      </Link>
    </nav>
  );
}
