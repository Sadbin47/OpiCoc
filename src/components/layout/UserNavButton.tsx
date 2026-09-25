"use client";

import * as React from "react";
import Link from "next/link";
import { UserProfile } from "@/types";
import { User, ShieldCheck } from "lucide-react";

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

export function UserNavButton() {
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

  if (user) {
    if (user.role === "admin") {
      return (
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Mobile Admin Icon Button */}
          <Link
            href="/admin"
            className="sm:hidden flex items-center justify-center h-9 w-9 rounded-md border border-amber-500/40 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label="Admin Command Panel"
            title="Admin Panel"
          >
            <ShieldCheck className="w-4 h-4" />
          </Link>
          <Link
            href="/profile"
            className="sm:hidden flex items-center justify-center h-9 w-9 rounded-md border border-[#262B35] bg-[#12151B] text-amber-400 hover:text-[#F1F5F9] hover:border-[#3B4252] transition outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label={`Profile (${user.firstName})`}
            title={user.firstName}
          >
            <User className="w-4 h-4" />
          </Link>

          {/* Desktop Buttons */}
          <Link
            href="/admin"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            Admin Panel
          </Link>
          <Link
            href="/profile"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold bg-[#1A1E26] text-[#F1F5F9] border border-[#262B35] hover:bg-[#262B35] hover:border-[#3B4252] transition outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <User className="w-3.5 h-3.5 text-amber-400" />
            <span className="truncate max-w-[100px]">{user.firstName}</span>
          </Link>
        </div>
      );
    }

    return (
      <>
        {/* Mobile Profile Icon Button */}
        <Link
          href="/profile"
          className="sm:hidden flex items-center justify-center h-9 w-9 rounded-md border border-[#262B35] bg-[#12151B] text-amber-400 hover:text-[#F1F5F9] hover:border-[#3B4252] transition outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          aria-label={`Profile (${user.firstName})`}
          title={user.firstName}
        >
          <User className="w-4 h-4" />
        </Link>

        {/* Desktop Profile Button */}
        <Link
          href="/profile"
          className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold bg-[#1A1E26] text-[#F1F5F9] border border-[#262B35] hover:bg-[#262B35] hover:border-[#3B4252] transition outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        >
          <User className="w-3.5 h-3.5 text-amber-400" />
          <span className="truncate max-w-[100px]">{user.firstName}</span>
        </Link>
      </>
    );
  }

  return (
    <>
      {/* Mobile Sign In Icon Button */}
      <Link
        href="/login"
        className="sm:hidden flex items-center justify-center h-9 w-9 rounded-md border border-[#262B35] bg-[#12151B] text-amber-400 hover:text-[#F1F5F9] hover:border-[#3B4252] transition outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        aria-label="Sign In"
        title="Sign In"
      >
        <User className="w-4 h-4 text-amber-500" />
      </Link>

      {/* Desktop Sign In Button */}
      <Link
        href="/login"
        className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold bg-[#1A1E26] text-[#F1F5F9] border border-[#262B35] hover:bg-[#262B35] hover:border-[#3B4252] transition outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
      >
        <User className="w-3.5 h-3.5 text-amber-500" />
        Sign In
      </Link>
    </>
  );
}
