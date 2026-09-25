"use client";

import * as React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, ArrowUpDown, Filter } from "lucide-react";

const TOWN_HALL_OPTIONS = [
  { label: "All Tiers", value: "" },
  { label: "TH18", value: "18" },
  { label: "TH17", value: "17" },
  { label: "TH16", value: "16" },
  { label: "TH15", value: "15" },
];

const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

export function BaseFilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentTh = searchParams.get("th") || "";
  const currentSort = searchParams.get("sort") || "newest";
  const currentSearch = searchParams.get("search") || "";

  const [searchTerm, setSearchTerm] = React.useState(currentSearch);
  const [prevCurrentSearch, setPrevCurrentSearch] = React.useState(currentSearch);

  if (prevCurrentSearch !== currentSearch) {
    setPrevCurrentSearch(currentSearch);
    setSearchTerm(currentSearch);
  }

  const updateFilters = (params: Record<string, string | null>) => {
    const next = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, val]) => {
      if (val === null || val === "") {
        next.delete(key);
      } else {
        next.set(key, val);
      }
    });
    // Reset to page 1 on filter change
    next.delete("page");
    router.push(`${pathname}?${next.toString()}`, { scroll: false });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ search: searchTerm.trim() || null });
  };

  const handleClearAll = () => {
    setSearchTerm("");
    router.push(pathname, { scroll: false });
  };

  const hasActiveFilters = Boolean(currentTh || currentSearch || currentSort !== "newest");

  return (
    <div className="space-y-4 rounded-xl border border-[#262B35] bg-[#12151B] p-4 sm:p-5 mb-8">
      {/* Search Input & Sort Selector Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <form onSubmit={handleSearchSubmit} className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search bases by name, CWL, anti-3 star, tournament..."
            className="pl-9 pr-8 bg-[#1A1E26] border-[#262B35] text-xs h-9 text-[#F1F5F9] placeholder:text-[#64748B]"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                updateFilters({ search: null });
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#F1F5F9]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </form>

        {/* Sort Selector */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-[#94A3B8] font-mono whitespace-nowrap">
            <ArrowUpDown className="w-3.5 h-3.5 text-amber-500" />
            <span>Sort:</span>
          </div>
          <select
            value={currentSort}
            onChange={(e) => updateFilters({ sort: e.target.value })}
            className="h-9 rounded-md border border-[#262B35] bg-[#1A1E26] px-2.5 py-1 text-xs text-[#F1F5F9] focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Town Hall Filter Pills Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#1E232B]">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-mono text-[#64748B] mr-1 hidden sm:inline flex items-center gap-1">
            <Filter className="w-3 h-3 text-amber-500" /> Tiers:
          </span>
          {TOWN_HALL_OPTIONS.map((th) => {
            const isSelected = currentTh === th.value;
            return (
              <button
                key={th.value}
                type="button"
                onClick={() => updateFilters({ th: th.value || null })}
                className={`px-3 py-1 rounded-md text-xs font-mono font-semibold transition-all ${
                  isSelected
                    ? "bg-amber-500 text-black shadow-sm"
                    : "bg-[#1A1E26] text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#262B35] border border-[#262B35]"
                }`}
              >
                {th.label}
              </button>
            );
          })}
        </div>

        {hasActiveFilters && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            className="text-xs text-[#94A3B8] hover:text-amber-400 h-7 px-2"
          >
            <X className="w-3 h-3 mr-1" />
            Clear All
          </Button>
        )}
      </div>
    </div>
  );
}
