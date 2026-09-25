"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { PurchasedBase } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Package,
  ArrowRight,
} from "lucide-react";

interface PurchasedBasesListProps {
  purchases: PurchasedBase[];
}

export function PurchasedBasesList({ purchases }: PurchasedBasesListProps) {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleCopyLink = (linkId: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(linkId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!purchases || purchases.length === 0) {
    return (
      <div className="p-12 text-center rounded-2xl border border-[#262B35] bg-[#12151B] space-y-4">
        <div className="w-14 h-14 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
          <Package className="w-7 h-7" />
        </div>
        <h3 className="font-clash text-xl font-bold text-[#F1F5F9]">
          No Purchased Bases in Library
        </h3>
        <p className="text-xs sm:text-sm text-[#94A3B8] max-w-md mx-auto leading-relaxed">
          You haven&apos;t purchased any defensive layouts yet. When you acquire base packs, your official 1-tap Supercell game import links will appear here permanently.
        </p>
        <div className="pt-2">
          <Button asChild size="sm" className="font-semibold gap-2 shadow-md">
            <Link href="/all-products">
              Explore All Bases
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {purchases.map((base) => (
        <div
          key={base.id}
          className="rounded-xl border border-[#262B35] bg-[#12151B] p-5 sm:p-6 space-y-4 transition hover:border-amber-500/40"
        >
          {/* Base Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-14 rounded-lg overflow-hidden bg-[#1A1E26] shrink-0 border border-[#262B35]">
                <Image
                  src={base.productImage}
                  alt={base.title}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="tactical" className="text-[10px] px-1.5 py-0.5">
                    {base.townHall}
                  </Badge>
                  <span className="text-[11px] font-mono text-[#64748B]">
                    Order: {base.orderId}
                  </span>
                </div>
                <h3 className="font-clash text-lg font-bold text-[#F1F5F9]">{base.title}</h3>
                <span className="text-xs text-[#64748B] font-mono">
                  Purchased on {new Date(base.purchasedAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Owner
              </span>
            </div>
          </div>

          {/* Protected Digital Delivery Links Row */}
          <div className="pt-3 border-t border-[#1E232B] space-y-2.5">
            <span className="text-xs font-mono text-[#64748B] uppercase block">
              Official Supercell Layout Import Link(s):
            </span>

            {base.links.map((link) => {
              const isCopied = copiedId === link.id;
              return (
                <div
                  key={link.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 rounded-lg bg-[#1A1E26] border border-[#262B35]"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-xs font-semibold text-[#F1F5F9] shrink-0">
                      {link.label}:
                    </span>
                    <code className="text-xs font-mono text-amber-400 truncate max-w-sm sm:max-w-md">
                      {link.url}
                    </code>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopyLink(link.id, link.url)}
                      className="text-xs h-8 gap-1.5"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Link</span>
                        </>
                      )}
                    </Button>

                    <Button asChild size="sm" className="text-xs h-8 gap-1.5">
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        <span>Open in CoC</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
