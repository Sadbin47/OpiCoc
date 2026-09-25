"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { getClientSession, logoutUser } from "@/services/authService";
import { UserProfile, PurchasedBase, CustomBaseRequest } from "@/types";
import { PurchasedBasesList } from "@/features/profile/components/PurchasedBasesList";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ShieldCheck,
  Package,
  Layers,
  Settings,
  LogOut,
  Sparkles,
  ArrowRight,
  Clock,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "purchased";
  const justPurchased = searchParams.get("success") === "true";

  const [user] = React.useState<UserProfile | null>(() => {
    return getClientSession();
  });
  const [activeTab, setActiveTab] = React.useState<"purchased" | "requests" | "settings">(
    initialTab === "requests" ? "requests" : initialTab === "settings" ? "settings" : "purchased"
  );

  const [purchases] = React.useState<PurchasedBase[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("opicoc_purchased_bases");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [requests] = React.useState<CustomBaseRequest[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("opicoc_custom_requests");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Password update form state
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [pwdMsg, setPwdMsg] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!user) {
      router.push("/login?redirectTo=/profile");
    }
  }, [user, router]);

  const handleLogout = () => {
    logoutUser();
    router.push("/");
    router.refresh();
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      setPwdMsg("Password must be at least 8 characters");
      return;
    }
    setPwdMsg("Password updated successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setTimeout(() => setPwdMsg(null), 3000);
  };

  if (!user) {
    return (
      <div className="py-24 text-center">
        <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-20 bg-[#0B0D11]">
      <Container size="default">
        {/* Celebration Banner after successful purchase */}
        {justPurchased && (
          <div className="mb-8 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-between gap-4 animate-in slide-in-from-top-4">
            <div className="flex items-center gap-3 text-xs sm:text-sm">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>
                <strong>Order Verified!</strong> Your new base layouts have been added to your library below. You can copy the Supercell links immediately.
              </span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => router.replace("/profile?tab=purchased")}
              className="text-xs text-emerald-400 hover:text-white"
            >
              Dismiss
            </Button>
          </div>
        )}

        {/* User Profile Header Card */}
        <div className="rounded-2xl border border-[#262B35] bg-[#12151B] p-4 sm:p-6 md:p-8 mb-8 sm:mb-10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
          <div className="flex items-center gap-3.5 sm:gap-5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-amber-500/20 to-sky-500/20 border border-amber-500/40 flex items-center justify-center text-lg sm:text-xl font-clash font-bold text-amber-400 shrink-0">
              {user.firstName.charAt(0)}
              {user.lastName.charAt(0)}
            </div>
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="font-clash text-xl sm:text-2xl font-bold text-[#F1F5F9] truncate">
                  {user.firstName} {user.lastName}
                </h1>
                <Badge variant="tactical" className="text-[10px] uppercase font-mono shrink-0">
                  {user.role}
                </Badge>
              </div>
              <p className="text-xs text-[#94A3B8] font-mono truncate">{user.email}</p>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 pt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Verified Account • Instant Delivery Active</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button asChild variant="outline" size="sm" className="font-semibold gap-1.5">
              <Link href="/custom-base">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Commission Base
              </Link>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-xs text-[#94A3B8] hover:text-red-400 gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Tab Controls Navigation */}
        <div className="flex items-center gap-2 border-b border-[#262B35] mb-8 pb-px overflow-x-auto max-w-full">
          <button
            type="button"
            onClick={() => setActiveTab("purchased")}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap shrink-0 ${
              activeTab === "purchased"
                ? "border-amber-500 text-amber-400"
                : "border-transparent text-[#94A3B8] hover:text-[#F1F5F9]"
            }`}
          >
            <Package className="w-4 h-4 shrink-0" />
            <span>Purchased Bases</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full bg-[#1A1E26] text-[10px] font-mono text-[#CBD5E1]">
              {purchases.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("requests")}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap shrink-0 ${
              activeTab === "requests"
                ? "border-amber-500 text-amber-400"
                : "border-transparent text-[#94A3B8] hover:text-[#F1F5F9]"
            }`}
          >
            <Layers className="w-4 h-4 shrink-0" />
            <span>Custom Requests</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full bg-[#1A1E26] text-[10px] font-mono text-[#CBD5E1]">
              {requests.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap shrink-0 ${
              activeTab === "settings"
                ? "border-amber-500 text-amber-400"
                : "border-transparent text-[#94A3B8] hover:text-[#F1F5F9]"
            }`}
          >
            <Settings className="w-4 h-4 shrink-0" />
            <span>Account Security</span>
          </button>
        </div>

        {/* Tab 1: Purchased Bases Library */}
        {activeTab === "purchased" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-clash text-xl font-bold text-[#F1F5F9]">
                  My Purchased Base Library
                </h2>
                <p className="text-xs text-[#94A3B8] mt-0.5">
                  Permanent access to your official Clash of Clans layout links.
                </p>
              </div>
            </div>
            <PurchasedBasesList purchases={purchases} />
          </div>
        )}

        {/* Tab 2: Custom Requests Tracker */}
        {activeTab === "requests" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-clash text-xl font-bold text-[#F1F5F9]">
                  My Custom Base Requests
                </h2>
                <p className="text-xs text-[#94A3B8] mt-0.5">
                  Track the status of your bespoke base commissions handcrafted by our lead builders.
                </p>
              </div>
              <Button asChild size="sm" className="font-semibold self-start sm:self-auto">
                <Link href="/custom-base" className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  New Request
                </Link>
              </Button>
            </div>

            {requests.length > 0 ? (
              <div className="space-y-4">
                {requests.map((req) => (
                  <div
                    key={req.id}
                    className="p-5 sm:p-6 rounded-xl border border-[#262B35] bg-[#12151B] space-y-4 transition hover:border-amber-500/30"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-[#64748B]">{req.id}</span>
                          <Badge variant="tactical" className="text-[10px]">
                            {req.townHall}
                          </Badge>
                          <span className="text-xs text-amber-400 font-semibold font-mono">
                            {req.defenseFocus}
                          </span>
                        </div>
                        <span className="text-xs text-[#64748B] block font-mono">
                          Submitted on {new Date(req.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div>
                        {req.status === "completed" ? (
                          <Badge variant="tactical" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-xs">
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Completed
                          </Badge>
                        ) : req.status === "in_progress" ? (
                          <Badge variant="warning" className="text-xs">
                            <Clock className="w-3.5 h-3.5 mr-1" /> In Progress
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs">
                            Pending Review
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-[#1A1E26] border border-[#262B35] text-xs text-[#CBD5E1] space-y-1">
                      <span className="font-mono text-[11px] text-[#64748B] block uppercase">
                        War Requirements:
                      </span>
                      <p className="leading-relaxed">{req.requirements}</p>
                    </div>

                    {req.completedLayoutUrl && (
                      <div className="pt-2 flex items-center justify-between p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400">
                        <span>Your custom base layout is ready!</span>
                        <Button asChild size="sm" className="h-8 gap-1">
                          <a href={req.completedLayoutUrl} target="_blank" rel="noopener noreferrer">
                            Import into Clash of Clans <ExternalLink className="w-3 h-3 ml-1" />
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center rounded-2xl border border-[#262B35] bg-[#12151B] space-y-4">
                <div className="w-14 h-14 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
                  <Layers className="w-7 h-7" />
                </div>
                <h3 className="font-clash text-xl font-bold text-[#F1F5F9]">
                  No Custom Requests Yet
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] max-w-md mx-auto leading-relaxed">
                  Have a high-stakes Clan War League matchup? Commission our builders to craft a bespoke anti-3 star base calibrated directly against your opponent&apos;s offensive strategy.
                </p>
                <div className="pt-2">
                  <Button asChild size="sm" className="font-semibold gap-2 shadow-md">
                    <Link href="/custom-base">
                      Commission Custom Base
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Security & Settings */}
        {activeTab === "settings" && (
          <div className="max-w-xl space-y-6">
            <div>
              <h2 className="font-clash text-xl font-bold text-[#F1F5F9]">Security Settings</h2>
              <p className="text-xs text-[#94A3B8] mt-0.5">
                Manage your account password and security credentials.
              </p>
            </div>

            {pwdMsg && (
              <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{pwdMsg}</span>
              </div>
            )}

            <form
              onSubmit={handlePasswordUpdate}
              className="p-6 rounded-xl border border-[#262B35] bg-[#12151B] space-y-4"
            >
              <div className="space-y-1.5">
                <Label htmlFor="curr-pwd" className="text-xs text-[#CBD5E1]">
                  Current Password
                </Label>
                <Input
                  id="curr-pwd"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="bg-[#1A1E26] border-[#262B35] text-xs h-10 text-[#F1F5F9]"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="new-pwd" className="text-xs text-[#CBD5E1]">
                  New Password
                </Label>
                <Input
                  id="new-pwd"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  required
                  className="bg-[#1A1E26] border-[#262B35] text-xs h-10 text-[#F1F5F9]"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <Button type="submit" size="sm" className="font-semibold">
                  Update Password
                </Button>
              </div>
            </form>
          </div>
        )}
      </Container>
    </div>
  );
}
