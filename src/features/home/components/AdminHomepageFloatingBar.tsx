"use client";

import * as React from "react";
import Link from "next/link";
import { Shield, Edit3, LayoutDashboard, Eye, EyeOff } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AdminHomepageEditorModal } from "./AdminHomepageEditorModal";

export function AdminHomepageFloatingBar() {
  const { isAdmin } = useAdminAuth();
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.location.search.includes("edit=true");
    }
    return false;
  });
  const [isMinimized, setIsMinimized] = React.useState(false);
  const [targetTab, setTargetTab] = React.useState<"hero" | "video" | "showdown">("hero");

  // Listen for custom edit triggers from individual sections
  React.useEffect(() => {
    const handleTrigger = (e: Event) => {
      const customEvent = e as CustomEvent<{ tab: "hero" | "video" | "showdown" }>;
      if (customEvent.detail?.tab) {
        setTargetTab(customEvent.detail.tab);
      }
      setIsModalOpen(true);
    };

    window.addEventListener("opicoc_open_homepage_editor", handleTrigger);
    return () => window.removeEventListener("opicoc_open_homepage_editor", handleTrigger);
  }, []);

  if (!isAdmin) return null;

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#12151B]/95 border border-amber-500/40 text-amber-400 text-xs font-semibold shadow-2xl backdrop-blur-md hover:bg-[#1A1F29] transition"
          title="Show Admin Homepage Controls"
        >
          <Shield className="w-4 h-4 text-amber-400" />
          <span>Admin Controls</span>
          <Eye className="w-3.5 h-3.5 ml-1 text-[#94A3B8]" />
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-[95vw] sm:max-w-max">
        <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#12151B]/95 border border-amber-500/40 shadow-2xl shadow-black/80 backdrop-blur-md">
          {/* Admin Tag */}
          <div className="flex items-center gap-1.5 pr-2 border-r border-[#262B35]">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            <Shield className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-xs font-bold font-clash text-[#F1F5F9] hidden sm:inline">
              Admin Mode
            </span>
          </div>

          {/* Quick Edit Button */}
          <button
            onClick={() => {
              setTargetTab("hero");
              setIsModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold shadow-md shadow-amber-500/20 transition"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Homepage</span>
          </button>

          {/* Link to Admin Panel */}
          <Link
            href="/admin"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium text-[#CBD5E1] hover:text-[#F1F5F9] hover:bg-[#1C212B] transition"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-[#94A3B8]" />
            <span className="hidden md:inline">Dashboard</span>
          </Link>

          {/* Minimize / Preview Button */}
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1.5 rounded-full text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#1C212B] transition"
            title="Hide bar for preview"
            aria-label="Minimize bar"
          >
            <EyeOff className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <AdminHomepageEditorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialTab={targetTab}
      />
    </>
  );
}
