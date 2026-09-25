"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Shield, ExternalLink, Mail, User, ShieldCheck, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserProfile } from "@/types";
import { logoutUser } from "@/services/authService";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot(): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(/opicoc_session=([^;]+)/);
  return match ? match[1] : "";
}

function getServerSnapshot(): string {
  return "";
}

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const sessionStr = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const user = React.useMemo<UserProfile | null>(() => {
    if (!sessionStr) return null;
    try {
      return JSON.parse(decodeURIComponent(sessionStr));
    } catch {
      return null;
    }
  }, [sessionStr]);

  const handleLogout = () => {
    logoutUser();
    setOpen(false);
    router.push("/");
    router.refresh();
  };

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

          {/* User Account & Access */}
          <div className="space-y-1.5 pt-2 border-t border-[#1E232B]">
            <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider px-2 block mb-2">
              Account
            </span>
            {user ? (
              <div className="space-y-1">
                <div className="px-3 py-2 rounded-lg bg-[#14181F] border border-[#262B35] flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 rounded-full bg-amber-500 text-black font-bold text-xs flex items-center justify-center shrink-0">
                      {user.firstName.charAt(0)}
                    </div>
                    <span className="text-xs font-semibold text-[#F1F5F9] truncate">
                      {user.firstName} {user.lastName}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400 uppercase font-semibold px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                    {user.role}
                  </span>
                </div>

                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Admin Command Center</span>
                  </Link>
                )}

                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-[#CBD5E1] hover:bg-[#161A22] hover:text-[#F1F5F9] transition"
                >
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  <span>My Profile & Bases</span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-red-400 hover:bg-red-500/10 transition cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-[#262B35] bg-[#14181F] text-xs font-semibold text-[#F1F5F9] hover:bg-[#1E232B] transition"
                >
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  <span>Sign In</span>
                </Link>
                <Link
                  href="/registration"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500/20 border border-amber-500/40 text-xs font-semibold text-amber-300 hover:bg-amber-500/30 transition"
                >
                  <span>Register</span>
                </Link>
              </div>
            )}
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
