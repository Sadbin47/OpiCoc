"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Shield,
  PenTool,
  Mail,
  Users,
  UserCheck,
  ExternalLink,
  LogOut,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { adminService } from "@/services/adminService";
import { getClientSession, logoutUser } from "@/services/authService";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const metrics = React.useMemo(() => {
    try {
      const m = adminService.getMetrics();
      return {
        pendingRequests: m.pendingRequests,
        unreadMessages: m.unreadMessages,
      };
    } catch {
      return { pendingRequests: 1, unreadMessages: 2 };
    }
  }, []);

  const currentUser = React.useMemo(() => {
    try {
      const user = getClientSession();
      if (user) {
        return {
          name: `${user.firstName} ${user.lastName}`.trim() || "Administrator",
          email: user.email,
        };
      }
    } catch {
      // fallback
    }
    return { name: "Admin", email: "admin@opicoc.cc" };
  }, []);

  const navItems = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      badge: null,
      exact: true,
    },
    {
      label: "Base Layouts",
      href: "/admin/bases",
      icon: Shield,
      badge: null,
    },
    {
      label: "Custom Requests",
      href: "/admin/requests",
      icon: PenTool,
      badge: metrics.pendingRequests > 0 ? metrics.pendingRequests : null,
      badgeColor: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
    },
    {
      label: "Support Messages",
      href: "/admin/messages",
      icon: Mail,
      badge: metrics.unreadMessages > 0 ? metrics.unreadMessages : null,
      badgeColor: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
    },
    {
      label: "Subscribers",
      href: "/admin/subscribers",
      icon: Users,
      badge: null,
    },
    {
      label: "User Accounts",
      href: "/admin/users",
      icon: UserCheck,
      badge: null,
    },
  ];

  const handleLogout = () => {
    logoutUser();
    router.push("/login");
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 w-64 h-full flex flex-col bg-[#0F1217] border-r border-[#1E232B] transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative lg:z-auto shrink-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        aria-label="Admin Navigation"
      >
        {/* Brand Header */}
        <div className="h-14 px-4 flex items-center justify-between border-b border-[#1E232B] shrink-0">
          <Link href="/admin" className="flex items-center gap-2.5 group">
            <Image
              src="/assets/logo.png"
              alt="OPICOC Logo"
              width={28}
              height={28}
              className="rounded transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-clash text-base font-bold tracking-tight text-[#F1F5F9] leading-none">
                OPICOC
              </span>
              <span className="text-[9px] font-mono uppercase tracking-wider text-amber-500 font-semibold mt-0.5">
                Admin Command
              </span>
            </div>
          </Link>

          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#1E232B] lg:hidden cursor-pointer"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Storefront Link */}
        <div className="px-3 pt-3 pb-1 shrink-0">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-2.5 py-1.5 text-xs rounded-lg border border-[#262B35] bg-[#14181F] text-[#94A3B8] hover:text-amber-400 hover:border-amber-500/30 transition group"
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Storefront
            </span>
            <ExternalLink className="w-3 h-3 text-[#64748B] group-hover:text-amber-400 transition-colors" />
          </Link>
        </div>

        {/* Navigation Items (Scrolls independently if needed) */}
        <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto min-h-0">
          <div className="px-2.5 pb-1.5 text-[9px] font-mono uppercase tracking-wider text-[#64748B] font-semibold">
            Management
          </div>

          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center justify-between px-2.5 py-2 text-xs font-medium rounded-lg transition-colors group",
                  isActive
                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    : "text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#161A22]"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={cn(
                      "w-4 h-4 transition-colors shrink-0",
                      isActive
                        ? "text-amber-400"
                        : "text-[#64748B] group-hover:text-[#CBD5E1]"
                    )}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge !== null && (
                  <span
                    className={cn(
                      "px-1.5 py-0.2 text-[10px] font-mono font-semibold rounded-full shrink-0",
                      item.badgeColor || "bg-[#262B35] text-[#CBD5E1]"
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Admin Profile & Always-Visible Logout */}
        <div className="p-3 border-t border-[#1E232B] bg-[#0C0E12] shrink-0 mt-auto">
          <div className="flex items-center justify-between mb-2.5 px-0.5">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-[10px] font-bold text-black shadow-sm shrink-0">
                {currentUser.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-[#F1F5F9] truncate leading-tight">
                  {currentUser.name}
                </p>
                <p className="text-[10px] text-[#64748B] truncate leading-tight">
                  {currentUser.email}
                </p>
              </div>
            </div>
            <span className="px-1.5 py-0.5 text-[8px] font-mono uppercase font-bold rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0 ml-1">
              Admin
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:border-red-500/30 transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out Admin</span>
          </button>
        </div>
      </aside>
    </>
  );
}
