"use client";

import * as React from "react";
import { AdminSidebar } from "@/features/admin/components/AdminSidebar";
import { AdminHeader } from "@/features/admin/components/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  return (
    <div className="h-screen h-dvh bg-[#090B0E] flex overflow-hidden w-full">
      {/* Admin Sidebar */}
      <AdminSidebar
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <AdminHeader onOpenMobileMenu={() => setIsMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-5 lg:p-6 focus:outline-none">
          <div className="max-w-7xl mx-auto w-full space-y-5">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
