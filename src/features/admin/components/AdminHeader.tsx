"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, ArrowUpRight, ShieldCheck, LogOut } from "lucide-react";
import { logoutUser } from "@/services/authService";

interface AdminHeaderProps {
  onOpenMobileMenu: () => void;
}

const ROUTE_TITLES: Record<string, { title: string; subtitle: string }> = {
  "/admin": {
    title: "Command Center",
    subtitle: "High-level overview of base performance, inquiries, and pending orders.",
  },
  "/admin/bases": {
    title: "Base Layout Management",
    subtitle: "Create, inspect, update, and manage Supercell Clash of Clans layout links.",
  },
  "/admin/requests": {
    title: "Custom Base Commissions",
    subtitle: "Track, prioritize, and fulfill custom competitive base design requests.",
  },
  "/admin/messages": {
    title: "Support Inquiries & Messages",
    subtitle: "Review customer contact submissions, Clan sponsorships, and respond directly.",
  },
  "/admin/subscribers": {
    title: "Newsletter Subscribers",
    subtitle: "Manage email subscribers and export active lists for meta campaigns.",
  },
  "/admin/users": {
    title: "User Accounts & Permissions",
    subtitle: "Audit registered accounts, verification status, and administrator privileges.",
  },
};

export function AdminHeader({ onOpenMobileMenu }: AdminHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();

  const current = ROUTE_TITLES[pathname] || {
    title: "Admin Portal",
    subtitle: "OPICOC Administrative Operations",
  };

  const handleLogout = () => {
    logoutUser();
    router.push("/login");
  };

  return (
    <header className="h-14 px-4 sm:px-6 lg:px-8 border-b border-[#1E232B] bg-[#0C0E12] flex items-center justify-between sticky top-0 z-30 shrink-0">
      <div className="flex items-center gap-3">
        {/* Mobile Sidebar Hamburger */}
        <button
          onClick={onOpenMobileMenu}
          className="p-2 -ml-2 rounded-lg text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#1E232B] lg:hidden cursor-pointer"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb / Title */}
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#64748B] hidden sm:inline">Admin</span>
            <span className="text-xs font-mono text-[#64748B] hidden sm:inline">/</span>
            <h1 className="text-sm sm:text-base font-semibold text-[#F1F5F9] tracking-tight">
              {current.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5">
        {/* System Health Indicator */}
        <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full border border-[#262B35] bg-[#14181F] text-[11px] text-[#94A3B8]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Systems Online</span>
        </div>

        {/* Storefront Link */}
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#262B35] bg-[#14181F] text-xs font-medium text-[#CBD5E1] hover:text-amber-400 hover:border-amber-500/30 transition"
        >
          <span>Storefront</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>

        {/* Quick Header Logout Button */}
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-500/20 bg-red-500/10 text-xs font-medium text-red-400 hover:bg-red-500/20 hover:border-red-500/40 transition cursor-pointer"
          title="Sign out of admin session"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
