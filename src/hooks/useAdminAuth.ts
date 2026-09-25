"use client";

import * as React from "react";
import { UserProfile } from "@/types";

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

export function useAdminAuth() {
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

  const isAdmin = Boolean(user && user.role === "admin");

  return { user, isAdmin };
}
