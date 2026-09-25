"use client";

import * as React from "react";
import {
  Users,
  Search,
  Download,
  Trash2,
  CheckCircle2,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { NewsletterSubscriber } from "@/types";
import { adminService } from "@/services/adminService";

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = React.useState<NewsletterSubscriber[]>(() => {
    try {
      return adminService.getSubscribers();
    } catch {
      return [];
    }
  });
  const [search, setSearch] = React.useState("");
  const [notification, setNotification] = React.useState<string | null>(null);
  const [isExporting, setIsExporting] = React.useState(false);

  const handleDeleteSubscriber = (id: string, email: string) => {
    if (window.confirm(`Are you sure you want to remove ${email} from the subscriber list?`)) {
      adminService.deleteSubscriber(id);
      setSubscribers(adminService.getSubscribers());
      setNotification(`Removed subscriber ${email}.`);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleExportCsv = () => {
    setIsExporting(true);
    try {
      const csv = adminService.exportSubscribersCsv();
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `opicoc-subscribers-${new Date().toISOString().split("T")[0]}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setNotification("Subscriber list exported to CSV successfully.");
      setTimeout(() => setNotification(null), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setIsExporting(false);
    }
  };

  const filteredSubscribers = subscribers.filter((s) =>
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-clash text-[#F1F5F9] flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-400" />
            <span>Newsletter Subscribers ({subscribers.length})</span>
          </h2>
          <p className="text-xs text-[#94A3B8]">
            Opt-in player emails for meta update announcements and CWL layout releases.
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          disabled={isExporting || subscribers.length === 0}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black text-xs font-semibold shadow-lg shadow-amber-500/10 transition self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>{isExporting ? "Exporting..." : "Export to CSV"}</span>
        </button>
      </div>

      {/* Notification Banner */}
      {notification && (
        <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Search Bar & Stats */}
      <div className="rounded-xl border border-[#1E232B] bg-[#12151B] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search subscribers by email..."
            className="w-full pl-9 pr-3.5 py-2 rounded-lg border border-[#262B35] bg-[#0F1217] text-xs text-[#F1F5F9] placeholder-[#64748B] focus:border-amber-500 outline-none transition"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>GDPR / CAN-SPAM compliant opt-in list</span>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="rounded-xl border border-[#1E232B] bg-[#12151B] overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#1E232B] bg-[#0F1217] text-[11px] font-mono uppercase text-[#64748B]">
                <th className="py-3 px-4">Subscriber Email</th>
                <th className="py-3 px-4">Subscribed Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E232B]">
              {filteredSubscribers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-[#94A3B8]">
                    No subscribers found matching the current search.
                  </td>
                </tr>
              ) : (
                filteredSubscribers.map((sub) => (
                  <tr key={sub.id} className="hover:bg-[#161A22] transition-colors">
                    {/* Email */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#1C2029] border border-[#262B35] flex items-center justify-center text-[#94A3B8]">
                          <Mail className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-medium text-[#F1F5F9]">{sub.email}</span>
                      </div>
                    </td>

                    {/* Subscribed Date */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-[#94A3B8] font-mono text-[11px]">
                      {new Date(sub.subscribedAt).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Active</span>
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleDeleteSubscriber(sub.id, sub.email)}
                        className="p-1.5 rounded-lg border border-[#262B35] bg-[#14181F] text-[#94A3B8] hover:text-red-400 hover:border-red-500/30 transition"
                        title="Remove subscriber"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
