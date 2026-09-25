"use client";

import * as React from "react";
import {
  PenTool,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  Zap,
  Save,
} from "lucide-react";
import { CustomBaseRequest, CustomRequestStatus } from "@/types";
import { adminService } from "@/services/adminService";

export default function AdminRequestsPage() {
  const [requests, setRequests] = React.useState<CustomBaseRequest[]>(() => {
    try {
      return adminService.getRequests();
    } catch {
      return [];
    }
  });
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [search, setSearch] = React.useState("");
  const [selectedRequest, setSelectedRequest] = React.useState<CustomBaseRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Edit modal fields
  const [modalStatus, setModalStatus] = React.useState<CustomRequestStatus>("pending");
  const [modalNotes, setModalNotes] = React.useState("");
  const [modalLayoutUrl, setModalLayoutUrl] = React.useState("");
  const [notification, setNotification] = React.useState<string | null>(null);

  const handleOpenModal = (req: CustomBaseRequest) => {
    setSelectedRequest(req);
    setModalStatus(req.status);
    setModalNotes(req.builderNotes || "");
    setModalLayoutUrl(req.completedLayoutUrl || "");
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequest) return;

    adminService.updateRequest(selectedRequest.id, {
      status: modalStatus,
      builderNotes: modalNotes.trim(),
      completedLayoutUrl: modalLayoutUrl.trim(),
    });

    setRequests(adminService.getRequests());
    setIsModalOpen(false);
    setNotification(`Updated commission request for ${selectedRequest.userName || selectedRequest.userId}.`);
    setTimeout(() => setNotification(null), 4000);
  };

  const filteredRequests = requests.filter((r) => {
    const matchesStatus = statusFilter === "all" || r.status === statusFilter;
    const matchesSearch =
      (r.userName || "").toLowerCase().includes(search.toLowerCase()) ||
      (r.userEmail || "").toLowerCase().includes(search.toLowerCase()) ||
      r.townHall.toLowerCase().includes(search.toLowerCase()) ||
      r.defenseFocus.toLowerCase().includes(search.toLowerCase()) ||
      r.requirements.toLowerCase().includes(search.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-clash text-[#F1F5F9] flex items-center gap-2">
            <PenTool className="w-5 h-5 text-amber-500" />
            <span>Custom Base Orders ({requests.length})</span>
          </h2>
          <p className="text-xs text-[#94A3B8]">
            Review competitive commission requirements, update status, and deliver completed layout links.
          </p>
        </div>
      </div>

      {/* Notification Banner */}
      {notification && (
        <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Controls Bar */}
      <div className="rounded-xl border border-[#1E232B] bg-[#12151B] p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by client, email, or requirements..."
            className="w-full pl-9 pr-3.5 py-2 rounded-lg border border-[#262B35] bg-[#0F1217] text-xs text-[#F1F5F9] placeholder-[#64748B] focus:border-amber-500 outline-none transition"
          />
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {[
            { id: "all", label: "All Orders" },
            { id: "pending", label: "Pending" },
            { id: "in_progress", label: "In Progress" },
            { id: "completed", label: "Completed" },
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setStatusFilter(st.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition whitespace-nowrap ${
                statusFilter === st.id
                  ? "bg-amber-500 text-black font-semibold"
                  : "bg-[#161A22] text-[#94A3B8] hover:text-[#F1F5F9] border border-[#262B35]"
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Requests Table / Cards */}
      <div className="rounded-xl border border-[#1E232B] bg-[#12151B] overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#1E232B] bg-[#0F1217] text-[11px] font-mono uppercase text-[#64748B]">
                <th className="py-3 px-4">Client</th>
                <th className="py-3 px-4">Tier & Objective</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Requirements Summary</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Submitted</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E232B]">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#94A3B8]">
                    No custom requests found matching the current filter.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-[#161A22] transition-colors">
                    {/* Client */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="space-y-0.5">
                        <p className="font-semibold text-[#F1F5F9]">{req.userName || "Customer"}</p>
                        <p className="text-[11px] text-[#64748B]">{req.userEmail || req.userId}</p>
                      </div>
                    </td>

                    {/* Tier & Objective */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="space-y-0.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#1C2029] text-amber-400 border border-amber-500/20">
                          {req.townHall}
                        </span>
                        <p className="text-[11px] text-[#94A3B8] font-medium">{req.defenseFocus}</p>
                      </div>
                    </td>

                    {/* Priority */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {req.priority === "express" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                          <Zap className="w-3 h-3" /> EXPRESS
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono text-[#94A3B8] bg-[#161A22] border border-[#262B35]">
                          <Clock className="w-3 h-3" /> Standard
                        </span>
                      )}
                    </td>

                    {/* Requirements */}
                    <td className="py-3.5 px-4">
                      <p className="text-xs text-[#CBD5E1] line-clamp-2 max-w-sm">
                        {req.requirements}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-mono font-semibold uppercase tracking-wider ${
                          req.status === "completed"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : req.status === "in_progress"
                            ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                            : req.status === "rejected"
                            ? "bg-red-500/20 text-red-400 border border-red-500/30"
                            : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        }`}
                      >
                        {req.status === "completed" && <CheckCircle2 className="w-3 h-3" />}
                        {req.status === "in_progress" && <Clock className="w-3 h-3 animate-spin" />}
                        {req.status === "pending" && <AlertCircle className="w-3 h-3" />}
                        <span>{req.status.replace("_", " ")}</span>
                      </span>
                    </td>

                    {/* Submitted Date */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-[#64748B] font-mono text-[11px]">
                      {new Date(req.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleOpenModal(req)}
                        className="px-3 py-1.5 rounded-lg border border-[#262B35] bg-[#14181F] text-xs font-medium text-[#CBD5E1] hover:text-amber-400 hover:border-amber-500/30 transition"
                      >
                        Review / Fulfill
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fulfill / Review Modal */}
      {isModalOpen && selectedRequest && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-2xl my-8 rounded-2xl border border-[#262B35] bg-[#12151B] p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#1E232B]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                  <PenTool className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-clash text-[#F1F5F9]">
                    Fulfill Commission: {selectedRequest.userName || selectedRequest.userId}
                  </h3>
                  <p className="text-xs text-[#94A3B8]">
                    {selectedRequest.townHall} • {selectedRequest.defenseFocus}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#1E232B]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Specifications Box */}
            <div className="p-4 rounded-xl border border-[#1E232B] bg-[#0F1217] space-y-2">
              <span className="text-[11px] font-mono uppercase text-[#64748B] font-semibold">
                Client Requirements:
              </span>
              <p className="text-xs text-[#CBD5E1] leading-relaxed">
                {selectedRequest.requirements}
              </p>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              {/* Status Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#CBD5E1]">Fulfillment Status</label>
                <select
                  value={modalStatus}
                  onChange={(e) => setModalStatus(e.target.value as CustomRequestStatus)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#262B35] bg-[#0F1217] text-xs text-[#F1F5F9] focus:border-amber-500 outline-none transition"
                >
                  <option value="pending">Pending Review</option>
                  <option value="in_progress">In Progress (Builder Assigned)</option>
                  <option value="completed">Completed (Layout Delivered)</option>
                  <option value="rejected">Rejected (Requirements Unviable)</option>
                </select>
              </div>

              {/* Completed Layout Link */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#CBD5E1]">
                  Completed Supercell Layout Link
                </label>
                <input
                  type="text"
                  value={modalLayoutUrl}
                  onChange={(e) => setModalLayoutUrl(e.target.value)}
                  placeholder="https://link.clashofclans.com/en/?action=OpenLayout&id=..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#262B35] bg-[#0F1217] text-xs font-mono text-[#F1F5F9] placeholder-[#64748B] focus:border-amber-500 outline-none transition"
                />
                <p className="text-[11px] text-[#64748B]">
                  Delivered securely to the client&apos;s authenticated &quot;My Custom Requests&quot; dashboard.
                </p>
              </div>

              {/* Builder Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#CBD5E1]">
                  Builder Notes & Strategy Analysis
                </label>
                <textarea
                  rows={3}
                  value={modalNotes}
                  onChange={(e) => setModalNotes(e.target.value)}
                  placeholder="e.g. Tested in 20 friendly challenges. Anti-2 star core defends Root Rider smash..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#262B35] bg-[#0F1217] text-xs text-[#F1F5F9] placeholder-[#64748B] focus:border-amber-500 outline-none transition"
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1E232B]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium rounded-lg border border-[#262B35] bg-[#14181F] text-[#94A3B8] hover:text-[#F1F5F9] transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold rounded-lg bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/10 transition"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Update Commission</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
