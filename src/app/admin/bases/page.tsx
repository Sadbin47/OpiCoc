"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Link as LinkIcon,
  CheckCircle2,
} from "lucide-react";
import { BaseProduct, BaseLayoutLink } from "@/types";
import { adminService } from "@/services/adminService";
import { BaseForm } from "@/features/admin/components/BaseForm";

export default function AdminBasesPage() {
  const [bases, setBases] = React.useState<(BaseProduct & { links: BaseLayoutLink[] })[]>(() => {
    try {
      return adminService.getBases();
    } catch {
      return [];
    }
  });
  const [search, setSearch] = React.useState("");
  const [selectedTh, setSelectedTh] = React.useState<string>("all");
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingBase, setEditingBase] = React.useState<(BaseProduct & { links: BaseLayoutLink[] }) | null>(null);
  const [notification, setNotification] = React.useState<string | null>(null);

  const handleOpenCreate = () => {
    setEditingBase(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (base: BaseProduct & { links: BaseLayoutLink[] }) => {
    setEditingBase(base);
    setIsFormOpen(true);
  };

  const handleSaveBase = (baseData: Partial<BaseProduct & { links: BaseLayoutLink[] }>) => {
    const saved = adminService.saveBase(baseData);
    setBases(adminService.getBases());
    setNotification(`Successfully saved "${saved.title}".`);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleDeleteBase = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      adminService.deleteBase(id);
      setBases(adminService.getBases());
      setNotification(`Deleted base layout "${title}".`);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  // Filter bases
  const filteredBases = bases.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.townHall.toLowerCase().includes(search.toLowerCase()) ||
      b.badge?.toLowerCase().includes(search.toLowerCase());

    const matchesTh =
      selectedTh === "all" ||
      b.townHallLevel === Number(selectedTh) ||
      b.townHall.includes(selectedTh);

    return matchesSearch && matchesTh;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-clash text-[#F1F5F9] flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-500" />
            <span>Base Layout Inventory ({bases.length})</span>
          </h2>
          <p className="text-xs text-[#94A3B8]">
            Manage products, pricing, Town Hall classifications, and secure layout links.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold shadow-lg shadow-amber-500/10 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add New Base</span>
        </button>
      </div>

      {/* Notification Banner */}
      {notification && (
        <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Search and Filters Bar */}
      <div className="rounded-xl border border-[#1E232B] bg-[#12151B] p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search bases by title or tag..."
            className="w-full pl-9 pr-3.5 py-2 rounded-lg border border-[#262B35] bg-[#0F1217] text-xs text-[#F1F5F9] placeholder-[#64748B] focus:border-amber-500 outline-none transition"
          />
        </div>

        {/* Town Hall Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {[
            { id: "all", label: "All Tiers" },
            { id: "18", label: "TH 18" },
            { id: "17", label: "TH 17" },
            { id: "16", label: "TH 16" },
            { id: "15", label: "TH 15" },
          ].map((tier) => (
            <button
              key={tier.id}
              onClick={() => setSelectedTh(tier.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition whitespace-nowrap ${
                selectedTh === tier.id
                  ? "bg-amber-500 text-black font-semibold"
                  : "bg-[#161A22] text-[#94A3B8] hover:text-[#F1F5F9] border border-[#262B35]"
              }`}
            >
              {tier.label}
            </button>
          ))}
        </div>
      </div>

      {/* Base Items Table */}
      <div className="rounded-xl border border-[#1E232B] bg-[#12151B] overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#1E232B] bg-[#0F1217] text-[11px] font-mono uppercase text-[#64748B]">
                <th className="py-3 px-4">Base Preview</th>
                <th className="py-3 px-4">Title & Details</th>
                <th className="py-3 px-4">Town Hall</th>
                <th className="py-3 px-4">Pack Badge</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Layout Links</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E232B]">
              {filteredBases.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#94A3B8]">
                    No bases found matching the current filter.
                  </td>
                </tr>
              ) : (
                filteredBases.map((base) => (
                  <tr key={base.id} className="hover:bg-[#161A22] transition-colors">
                    {/* Thumbnail */}
                    <td className="py-3.5 px-4">
                      <div className="relative w-16 h-12 rounded-lg border border-[#262B35] overflow-hidden bg-black shrink-0">
                        <Image
                          src={base.productImage}
                          alt={base.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    </td>

                    {/* Title */}
                    <td className="py-3.5 px-4">
                      <div className="max-w-xs space-y-0.5">
                        <p className="font-semibold text-[#F1F5F9] line-clamp-1">{base.title}</p>
                        <p className="text-[11px] text-[#64748B]">
                          ID: <span className="font-mono">{base.id.slice(0, 10)}...</span> • Max: {base.maxSell}
                        </p>
                      </div>
                    </td>

                    {/* Town Hall */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-[#1C2029] text-amber-400 border border-amber-500/20">
                        {base.townHall}
                      </span>
                    </td>

                    {/* Badge */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#262B35] text-[#CBD5E1]">
                        {base.badge || "1x1"}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-clash text-sm font-bold text-[#F1F5F9]">
                        ${base.price}
                      </span>
                    </td>

                    {/* Layout Links */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                        <LinkIcon className="w-3.5 h-3.5" />
                        <span className="font-mono font-semibold">
                          {base.links ? base.links.length : 0} links
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Live Product Link */}
                        <Link
                          href={`/bases/${base.id}`}
                          target="_blank"
                          className="p-1.5 rounded-lg border border-[#262B35] bg-[#14181F] text-[#94A3B8] hover:text-amber-400 hover:border-amber-500/30 transition"
                          title="View on Storefront"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>

                        {/* Edit Button */}
                        <button
                          onClick={() => handleOpenEdit(base)}
                          className="p-1.5 rounded-lg border border-[#262B35] bg-[#14181F] text-[#94A3B8] hover:text-[#F1F5F9] hover:border-[#3B4252] transition"
                          title="Edit Base"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteBase(base.id, base.title)}
                          className="p-1.5 rounded-lg border border-[#262B35] bg-[#14181F] text-[#94A3B8] hover:text-red-400 hover:border-red-500/30 transition"
                          title="Delete Base"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Base Modal Component */}
      {isFormOpen && (
        <BaseForm
          key={editingBase?.id || "new"}
          isOpen={isFormOpen}
          initialBase={editingBase}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSaveBase}
        />
      )}
    </div>
  );
}
