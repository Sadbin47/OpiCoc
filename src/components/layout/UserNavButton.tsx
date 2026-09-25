"use client";

import * as React from "react";
import Link from "next/link";
import { UserProfile } from "@/types";
import { User } from "lucide-react";

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
    return (
      <Link
        href="/profile"
        className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold bg-[#1A1E26] text-[#F1F5F9] border border-[#262B35] hover:bg-[#262B35] hover:border-[#3B4252] transition outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
      >
        <User className="w-3.5 h-3.5 text-amber-400" />
        <span className="truncate max-w-[100px]">{user.firstName}</span>
      </Link>
    );
  }

  return (
    <Link
      href="/login"
      className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold bg-[#1A1E26] text-[#F1F5F9] border border-[#262B35] hover:bg-[#262B35] hover:border-[#3B4252] transition outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
    >
      <User className="w-3.5 h-3.5 text-amber-500" />
      Sign In
    </Link>
  );
}
