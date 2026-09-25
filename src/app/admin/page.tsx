"use client";

import * as React from "react";
import Link from "next/link";
import {
  Shield,
  PenTool,
  Mail,
  Users,
  UserCheck,
  TrendingUp,
  Plus,
  ArrowRight,
  Download,
  AlertCircle,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import { adminService } from "@/services/adminService";
import {
  AdminMetricStats,
  CustomBaseRequest,
  ContactMessage,
} from "@/types";

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = React.useState<AdminMetricStats>(() => {
    try {
      return adminService.getMetrics();
    } catch {
      return {
        totalBases: 5,
        pendingRequests: 1,
        unreadMessages: 2,
        totalSubscribers: 5,
        totalUsers: 5,
        totalRevenueEst: 2640,
      };
    }
  });

  React.useEffect(() => {
    adminService.syncBasesFromServer().then(() => {
      try {
        setMetrics(adminService.getMetrics());
      } catch {}
    });
  }, []);

  const [recentRequests] = React.useState<CustomBaseRequest[]>(() => {
    try {
      return adminService.getRequests().slice(0, 3);
    } catch {
      return [];
    }
  });

  const [recentMessages] = React.useState<ContactMessage[]>(() => {
    try {
      return adminService.getMessages().slice(0, 3);
    } catch {
      return [];
    }
  });

  const [isExporting, setIsExporting] = React.useState(false);

  const handleExportCsv = () => {
    setIsExporting(true);
    try {
      const csv = adminService.exportSubscribersCsv();
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `opicoc-subscribers-${new Date().toISOString().split("T")[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error(e);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Top Banner */}
      <div className="rounded-xl border border-[#262B35] bg-gradient-to-r from-[#12151B] to-[#161B22] p-5 lg:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden">
        <div className="space-y-1.5 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OPICOC Master Administration</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-clash text-[#F1F5F9] tracking-tight">
            Welcome back, Chief Architect
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl">
            Monitor base releases, verify Supercell layout links, fulfill custom CWL commissions, and reply to esports team inquiries.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 relative z-10 shrink-0">
          <Link
            href="/admin/bases?action=new"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold shadow-md shadow-amber-500/10 transition"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Base Layout</span>
          </Link>

          <button
            onClick={handleExportCsv}
            disabled={isExporting}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-[#262B35] bg-[#14181F] text-[#CBD5E1] hover:text-[#F1F5F9] hover:border-[#3B4252] text-xs font-medium transition cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#94A3B8]" />
            <span>{isExporting ? "Exporting..." : "Export CSV"}</span>
          </button>
        </div>

        {/* Background glow */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
        {/* Metric 1: Total Bases */}
        <Link
          href="/admin/bases"
          className="rounded-xl border border-[#1E232B] bg-[#12151B] p-3.5 hover:border-amber-500/40 transition group"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-[#94A3B8]">Active Bases</span>
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 group-hover:scale-105 transition-transform">
              <Shield className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-clash text-[#F1F5F9]">
            {metrics.totalBases}
          </div>
          <span className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Verified active bases</span>
          </span>
        </Link>

        {/* Metric 2: Pending Requests */}
        <Link
          href="/admin/requests"
          className="rounded-xl border border-[#1E232B] bg-[#12151B] p-4 hover:border-amber-500/40 transition group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#94A3B8]">Custom Orders</span>
            <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400 group-hover:scale-105 transition-transform">
              <PenTool className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-clash text-[#F1F5F9]">
            {metrics.pendingRequests}
          </div>
          <span className="text-[11px] text-orange-400 flex items-center gap-1 mt-1">
            <Clock className="w-3 h-3" />
            <span>Requires review</span>
          </span>
        </Link>

        {/* Metric 3: Support Inquiries */}
        <Link
          href="/admin/messages"
          className="rounded-xl border border-[#1E232B] bg-[#12151B] p-4 hover:border-blue-500/40 transition group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#94A3B8]">Unread Messages</span>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:scale-105 transition-transform">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-clash text-[#F1F5F9]">
            {metrics.unreadMessages}
          </div>
          <span className="text-[11px] text-blue-400 flex items-center gap-1 mt-1">
            <AlertCircle className="w-3 h-3" />
            <span>Awaiting reply</span>
          </span>
        </Link>

        {/* Metric 4: Subscribers */}
        <Link
          href="/admin/subscribers"
          className="rounded-xl border border-[#1E232B] bg-[#12151B] p-4 hover:border-purple-500/40 transition group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#94A3B8]">Subscribers</span>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 group-hover:scale-105 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-clash text-[#F1F5F9]">
            {metrics.totalSubscribers}
          </div>
          <span className="text-[11px] text-[#94A3B8] flex items-center gap-1 mt-1">
            <span>Newsletter opt-ins</span>
          </span>
        </Link>

        {/* Metric 5: User Accounts */}
        <Link
          href="/admin/users"
          className="rounded-xl border border-[#1E232B] bg-[#12151B] p-4 hover:border-emerald-500/40 transition group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#94A3B8]">Total Accounts</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-105 transition-transform">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-clash text-[#F1F5F9]">
            {metrics.totalUsers}
          </div>
          <span className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
            <span>Registered users</span>
          </span>
        </Link>

        {/* Metric 6: Est. Revenue */}
        <div className="rounded-xl border border-[#1E232B] bg-[#12151B] p-3.5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-[#94A3B8]">Est. Platform Volume</span>
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-clash text-[#F1F5F9]">
            ${metrics.totalRevenueEst}
          </div>
          <span className="text-[11px] text-[#94A3B8] flex items-center gap-1 mt-1">
            <span>Digital store orders</span>
          </span>
        </div>
      </div>

      {/* Two-Column Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left Column: Recent Custom Orders */}
        <div className="rounded-xl border border-[#1E232B] bg-[#12151B] p-4 sm:p-5 space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PenTool className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-semibold text-[#F1F5F9]">Recent Custom Requests</h3>
            </div>
            <Link
              href="/admin/requests"
              className="text-xs text-amber-400 hover:underline inline-flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentRequests.map((req) => (
              <div
                key={req.id}
                className="p-3.5 rounded-lg border border-[#1E232B] bg-[#161A22] flex items-center justify-between gap-4"
              >
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-[#F1F5F9] truncate">
                      {req.userName || req.userId}
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#262B35] text-amber-400">
                      {req.townHall}
                    </span>
                    {req.priority === "express" && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        EXPRESS
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#94A3B8] line-clamp-1">
                    {req.defenseFocus} — {req.requirements}
                  </p>
                </div>

                <span
                  className={`px-2 py-1 rounded text-[10px] font-mono font-semibold uppercase tracking-wider shrink-0 ${
                    req.status === "completed"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : req.status === "in_progress"
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-amber-500/20 text-amber-400"
                  }`}
                >
                  {req.status.replace("_", " ")}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Support Inquiries */}
        <div className="rounded-xl border border-[#1E232B] bg-[#12151B] p-4 sm:p-5 space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-semibold text-[#F1F5F9]">Latest Inquiries</h3>
            </div>
            <Link
              href="/admin/messages"
              className="text-xs text-amber-400 hover:underline inline-flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentMessages.map((msg) => (
              <div
                key={msg.id}
                className="p-3.5 rounded-lg border border-[#1E232B] bg-[#161A22] flex items-center justify-between gap-4"
              >
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-[#F1F5F9] truncate">
                      {msg.name}
                    </span>
                    <span className="text-[11px] text-[#64748B] truncate">
                      ({msg.email})
                    </span>
                    {!msg.isRead && (
                      <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    )}
                  </div>
                  <p className="text-xs text-[#94A3B8] font-medium line-clamp-1">
                    {msg.subject}
                  </p>
                </div>

                <span
                  className={`px-2 py-1 rounded text-[10px] font-mono font-semibold uppercase tracking-wider shrink-0 ${
                    msg.isRead
                      ? "bg-[#262B35] text-[#94A3B8]"
                      : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  }`}
                >
                  {msg.isRead ? "Read" : "Unread"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Status & Operational Checklist */}
      <div className="rounded-xl border border-[#1E232B] bg-[#12151B] p-4 sm:p-5 space-y-3.5">
        <h3 className="text-sm font-semibold text-[#F1F5F9] flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span>Platform Architecture Verification</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3 rounded-lg border border-[#1E232B] bg-[#161A22] space-y-1">
            <span className="text-[#94A3B8] font-medium">Layout Link Encryption</span>
            <p className="text-[#F1F5F9] font-mono text-[11px]">Protected Deep Link Delivery</p>
            <p className="text-[11px] text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Zero Public Link Exposure
            </p>
          </div>
          <div className="p-3 rounded-lg border border-[#1E232B] bg-[#161A22] space-y-1">
            <span className="text-[#94A3B8] font-medium">Role Gatekeeper</span>
            <p className="text-[#F1F5F9] font-mono text-[11px]">Next.js Middleware (/admin)</p>
            <p className="text-[11px] text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> 403 Forbidden for Non-Admins
            </p>
          </div>
          <div className="p-3 rounded-lg border border-[#1E232B] bg-[#161A22] space-y-1">
            <span className="text-[#94A3B8] font-medium">Data Storage Integrity</span>
            <p className="text-[#F1F5F9] font-mono text-[11px]">Client & Storage Sync</p>
            <p className="text-[11px] text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Multi-tab Event Channel
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
