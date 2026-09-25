"use client";

import * as React from "react";
import Image from "next/image";
import { X, Plus, Trash2, Shield, AlertTriangle, CheckCircle2 } from "lucide-react";
import { BaseProduct, BaseLayoutLink } from "@/types";

interface BaseFormProps {
  initialBase?: (BaseProduct & { links?: BaseLayoutLink[] }) | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (baseData: Partial<BaseProduct & { links: BaseLayoutLink[] }>) => void;
}

export function BaseForm({ initialBase, isOpen, onClose, onSave }: BaseFormProps) {
  const isEditing = Boolean(initialBase?.id);

  const [title, setTitle] = React.useState(initialBase?.title || "");
  const [price, setPrice] = React.useState<number>(initialBase?.price || 35);
  const [townHall, setTownHall] = React.useState(initialBase?.townHall || "Town Hall 18");
  const [badge, setBadge] = React.useState(initialBase?.badge || "1x3");
  const [productImage, setProductImage] = React.useState(
    initialBase?.productImage || "https://iili.io/q6Fiihu.md.png"
  );
  const [description, setDescription] = React.useState(initialBase?.description || "");
  const createdBy = initialBase?.createdBy || "OPICOC Pro Builders";
  const [maxSell, setMaxSell] = React.useState<number>(initialBase?.maxSell || 100);
  const validityDays = initialBase?.validityDays || 60;
  const [links, setLinks] = React.useState<BaseLayoutLink[]>(
    initialBase?.links && initialBase.links.length > 0
      ? initialBase.links
      : [
          {
            id: "link-default-1",
            label: "Layout 1 (Main Defense)",
            url: "https://link.clashofclans.com/en/?action=OpenLayout&id=TH18-SAMPLE-01",
          },
        ]
  );
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  if (!isOpen) return null;

  const handleAddLink = () => {
    setLinks((prev) => [
      ...prev,
      {
        id: `link-${Date.now()}-${prev.length + 1}`,
        label: `Layout ${prev.length + 1} (Variation)`,
        url: "https://link.clashofclans.com/en/?action=OpenLayout&id=TH18-SAMPLE-02",
      },
    ]);
  };

  const handleUpdateLink = (index: number, field: keyof BaseLayoutLink, value: string) => {
    setLinks((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleRemoveLink = (index: number) => {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!title.trim()) newErrors.title = "Base title is required.";
    if (price <= 0) newErrors.price = "Price must be a positive number.";
    if (!description.trim()) newErrors.description = "Base description is required.";
    if (!productImage.trim()) newErrors.productImage = "Product image URL is required.";

    // Validate layout links
    const invalidLink = links.some((l) => !l.url.startsWith("https://link.clashofclans.com/"));
    if (invalidLink) {
      newErrors.links = "All layout links must begin with 'https://link.clashofclans.com/'";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const thLevel = parseInt(townHall.replace(/\D/g, ""), 10) || 18;

    onSave({
      ...(initialBase?.id ? { id: initialBase.id } : {}),
      title: title.trim(),
      price: Number(price),
      townHall,
      townHallLevel: thLevel as (15 | 16 | 17 | 18 | 19),
      badge,
      productImage: productImage.trim(),
      description: description.trim(),
      createdBy: createdBy.trim(),
      maxSell: Number(maxSell),
      validityDays: Number(validityDays),
      links,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="base-modal-title"
    >
      <div className="relative w-full max-w-3xl my-6 rounded-2xl border border-[#262B35] bg-[#12151B] p-5 sm:p-6 shadow-2xl space-y-5 max-h-[90dvh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1E232B]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 id="base-modal-title" className="text-lg font-bold font-clash text-[#F1F5F9]">
                {isEditing ? "Edit Base Layout" : "Add New Base Layout"}
              </h2>
              <p className="text-xs text-[#94A3B8]">
                Configure layout specifications and attach private Supercell deep links.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#1E232B]"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Error Banner */}
          {Object.keys(errors).length > 0 && (
            <div className="p-3.5 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Please resolve validation errors before saving.</span>
            </div>
          )}

          {/* Title & Town Hall */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-1.5">
              <label htmlFor="base-title" className="text-xs font-medium text-[#CBD5E1]">
                Base Title *
              </label>
              <input
                id="base-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. TH18 Best Esports Hard-Mode Base"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#262B35] bg-[#0F1217] text-sm text-[#F1F5F9] placeholder-[#64748B] focus:border-amber-500 outline-none transition"
              />
              {errors.title && <p className="text-[11px] text-red-400">{errors.title}</p>}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="base-townhall" className="text-xs font-medium text-[#CBD5E1]">
                Town Hall Level
              </label>
              <select
                id="base-townhall"
                value={townHall}
                onChange={(e) => setTownHall(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#262B35] bg-[#0F1217] text-sm text-[#F1F5F9] focus:border-amber-500 outline-none transition"
              >
                <option value="Town Hall 18">Town Hall 18</option>
                <option value="Town Hall 17">Town Hall 17</option>
                <option value="Town Hall 16">Town Hall 16</option>
                <option value="Town Hall 15">Town Hall 15</option>
              </select>
            </div>
          </div>

          {/* Pricing, Badge & Max Sell */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="base-price" className="text-xs font-medium text-[#CBD5E1]">
                Price (USD $) *
              </label>
              <input
                id="base-price"
                type="number"
                min="1"
                step="1"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#262B35] bg-[#0F1217] text-sm text-[#F1F5F9] focus:border-amber-500 outline-none transition"
              />
              {errors.price && <p className="text-[11px] text-red-400">{errors.price}</p>}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="base-badge" className="text-xs font-medium text-[#CBD5E1]">
                Pack Badge Tag
              </label>
              <select
                id="base-badge"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#262B35] bg-[#0F1217] text-sm text-[#F1F5F9] focus:border-amber-500 outline-none transition"
              >
                <option value="1x1">1x1 (Single Layout)</option>
                <option value="1x2">1x2 (Dual Layouts)</option>
                <option value="1x3">1x3 (3-Base Pack)</option>
                <option value="1x5">1x5 (5-Base Mega Pack)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="base-maxsell" className="text-xs font-medium text-[#CBD5E1]">
                Max Sell Quota
              </label>
              <input
                id="base-maxsell"
                type="number"
                min="10"
                value={maxSell}
                onChange={(e) => setMaxSell(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#262B35] bg-[#0F1217] text-sm text-[#F1F5F9] focus:border-amber-500 outline-none transition"
              />
            </div>
          </div>

          {/* Image URL & Thumbnail Preview */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="base-image" className="text-xs font-medium text-[#CBD5E1]">
                Product Screenshot Image URL *
              </label>
              <span className="text-[11px] text-[#64748B]">
                Supports Gifyu, iili.io, and CDN image links
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                id="base-image"
                type="text"
                value={productImage}
                onChange={(e) => setProductImage(e.target.value)}
                placeholder="https://s15.gifyu.com/images/bue9g.jpg or https://iili.io/..."
                className="flex-1 px-3.5 py-2.5 rounded-lg border border-[#262B35] bg-[#0F1217] text-sm text-[#F1F5F9] placeholder-[#64748B] focus:border-amber-500 outline-none transition"
              />
              <div className="relative w-16 h-11 rounded border border-[#262B35] overflow-hidden bg-black shrink-0">
                <Image
                  src={productImage.startsWith("http") ? productImage : "https://iili.io/q6Fiihu.md.png"}
                  alt="Preview"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
            <p className="text-[11px] text-[#64748B]">
              Direct image link format: <code className="text-amber-400">https://s15.gifyu.com/images/bue9g.jpg</code>
            </p>
            {errors.productImage && <p className="text-[11px] text-red-400">{errors.productImage}</p>}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label htmlFor="base-desc" className="text-xs font-medium text-[#CBD5E1]">
              Base Description & Tactical Strategy *
            </label>
            <textarea
              id="base-desc"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe defensive anti-meta pathing, trap locations, and target leagues..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#262B35] bg-[#0F1217] text-sm text-[#F1F5F9] placeholder-[#64748B] focus:border-amber-500 outline-none transition"
            />
            {errors.description && <p className="text-[11px] text-red-400">{errors.description}</p>}
          </div>

          {/* Supercell Layout Links Repeater */}
          <div className="space-y-3 pt-3 border-t border-[#1E232B]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-semibold text-[#F1F5F9] flex items-center gap-1.5">
                  <span>Protected Supercell Layout Links</span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Buyers Only
                  </span>
                </h3>
                <p className="text-[11px] text-[#64748B]">
                  Must begin with <code className="text-amber-400">https://link.clashofclans.com/</code>
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddLink}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded border border-[#262B35] bg-[#161A22] text-[#CBD5E1] hover:text-amber-400 hover:border-amber-500/30 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Link</span>
              </button>
            </div>

            {errors.links && (
              <p className="text-[11px] text-red-400 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> {errors.links}
              </p>
            )}

            <div className="space-y-2.5">
              {links.map((link, idx) => {
                const isValidCocLink = link.url.startsWith("https://link.clashofclans.com/");
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-lg border border-[#1E232B] bg-[#0F1217] space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <input
                        type="text"
                        value={link.label}
                        onChange={(e) => handleUpdateLink(idx, "label", e.target.value)}
                        placeholder="Layout Label (e.g. Main CWL Defense)"
                        className="px-2.5 py-1.5 rounded border border-[#262B35] bg-[#14181F] text-xs text-[#F1F5F9] w-1/2 focus:border-amber-500 outline-none"
                      />
                      <div className="flex items-center gap-2">
                        {isValidCocLink ? (
                          <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Valid Supercell URL
                          </span>
                        ) : (
                          <span className="text-[10px] text-amber-400 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" /> Invalid URL Format
                          </span>
                        )}
                        {links.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveLink(idx)}
                            className="p-1 rounded text-[#94A3B8] hover:text-red-400"
                            aria-label="Remove link"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <input
                      type="text"
                      value={link.url}
                      onChange={(e) => handleUpdateLink(idx, "url", e.target.value)}
                      placeholder="https://link.clashofclans.com/en/?action=OpenLayout&id=..."
                      className="w-full px-2.5 py-1.5 rounded border border-[#262B35] bg-[#14181F] text-xs font-mono text-[#CBD5E1] focus:border-amber-500 outline-none"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1E232B]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium rounded-lg border border-[#262B35] bg-[#14181F] text-[#94A3B8] hover:text-[#F1F5F9] transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold rounded-lg bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/10 transition"
            >
              {isEditing ? "Save Changes" : "Create Base"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
