"use client";

import * as React from "react";
import Image from "next/image";
import {
  X,
  Sparkles,
  Image as ImageIcon,
  Video,
  Swords,
  CheckCircle2,
  RotateCcw,
  Shield,
} from "lucide-react";
import { HomepageConfig } from "@/types";
import {
  DEFAULT_HOMEPAGE_CONFIG,
  getClientHomepageConfig,
  setClientHomepageConfig,
} from "@/services/homepageService";

interface AdminHomepageEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "hero" | "video" | "showdown";
}

export function AdminHomepageEditorModal({
  isOpen,
  onClose,
  initialTab = "hero",
}: AdminHomepageEditorModalProps) {
  if (!isOpen) return null;

  return (
    <AdminHomepageEditorModalContent
      onClose={onClose}
      initialTab={initialTab}
    />
  );
}

function AdminHomepageEditorModalContent({
  onClose,
  initialTab = "hero",
}: {
  onClose: () => void;
  initialTab?: "hero" | "video" | "showdown";
}) {
  const [activeTab, setActiveTab] = React.useState<"hero" | "video" | "showdown">(initialTab);
  const [config, setConfig] = React.useState<HomepageConfig>(getClientHomepageConfig);
  const [isSaving, setIsSaving] = React.useState(false);
  const [saveSuccess, setSaveSuccess] = React.useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(null);

    try {
      // 1. Save to local storage for immediate browser reactivity
      setClientHomepageConfig(config);

      // 2. Persist to server API
      const res = await fetch("/api/homepage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      if (res.ok) {
        setSaveSuccess("Homepage content published and updated successfully!");
        setTimeout(() => setSaveSuccess(null), 4000);
      } else {
        setSaveSuccess("Changes saved locally. (Server sync returned status " + res.status + ")");
      }
    } catch {
      setSaveSuccess("Changes saved locally on your browser.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm("Are you sure you want to reset all homepage banners, videos, and texts to default?")) {
      setConfig(DEFAULT_HOMEPAGE_CONFIG);
      setClientHomepageConfig(DEFAULT_HOMEPAGE_CONFIG);
      fetch("/api/homepage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(DEFAULT_HOMEPAGE_CONFIG),
      }).catch(() => {});
      setSaveSuccess("Restored original homepage defaults.");
      setTimeout(() => setSaveSuccess(null), 3500);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="homepage-editor-title"
    >
      <div className="relative w-full max-w-4xl my-6 rounded-2xl border border-[#262B35] bg-[#12151B] p-5 sm:p-7 shadow-2xl space-y-6 max-h-[92dvh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1E232B]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-500/10 text-amber-400 mb-0.5">
                <Sparkles className="w-3 h-3" />
                <span>ADMIN LIVE HOMEPAGE CMS</span>
              </div>
              <h2 id="homepage-editor-title" className="text-xl font-bold font-clash text-[#F1F5F9]">
                Customize Homepage Content & Media
              </h2>
              <p className="text-xs text-[#94A3B8]">
                Update banners, posters, and YouTube video links live. Supports direct image URLs (Gifyu, iili.io, CDNs).
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#1E232B] transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Alert */}
        {saveSuccess && (
          <div className="p-3.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{saveSuccess}</span>
          </div>
        )}

        {/* Section Tabs */}
        <div className="flex items-center gap-2 border-b border-[#1E232B] pb-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("hero")}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === "hero"
                ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                : "bg-[#161A22] text-[#94A3B8] hover:text-[#F1F5F9]"
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>1. Hero Arena & Banners</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("video")}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === "video"
                ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                : "bg-[#161A22] text-[#94A3B8] hover:text-[#F1F5F9]"
            }`}
          >
            <Video className="w-4 h-4" />
            <span>2. YouTube Defense Video</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("showdown")}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === "showdown"
                ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                : "bg-[#161A22] text-[#94A3B8] hover:text-[#F1F5F9]"
            }`}
          >
            <Swords className="w-4 h-4" />
            <span>3. Esports Showdown Banner</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="space-y-6">
          {/* TAB 1: HERO SECTION */}
          {activeTab === "hero" && (
            <div className="space-y-4">
              {/* Banner Image URL */}
              <div className="space-y-1.5 p-4 rounded-xl border border-[#1E232B] bg-[#0F1217]">
                <div className="flex items-center justify-between">
                  <label htmlFor="hero-banner" className="text-xs font-semibold text-[#CBD5E1] flex items-center gap-1.5">
                    <span>Hero Background Banner Image URL *</span>
                  </label>
                  <span className="text-[11px] text-[#64748B]">
                    Gifyu links supported
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <input
                    id="hero-banner"
                    type="text"
                    value={config.hero.bannerImage}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, bannerImage: e.target.value },
                      }))
                    }
                    placeholder="https://s15.gifyu.com/images/bue9g.jpg or /assets/hero-banner-1.jpg"
                    className="flex-1 w-full px-3.5 py-2.5 rounded-lg border border-[#262B35] bg-[#14181F] text-xs text-[#F1F5F9] placeholder-[#64748B] focus:border-amber-500 outline-none"
                    required
                  />
                  {/* Image Preview Thumbnail */}
                  <div className="relative w-28 h-16 rounded-lg border border-[#262B35] overflow-hidden bg-black shrink-0">
                    <Image
                      src={
                        config.hero.bannerImage.startsWith("http") || config.hero.bannerImage.startsWith("/")
                          ? config.hero.bannerImage
                          : "/assets/hero-banner-1.jpg"
                      }
                      alt="Hero Banner Preview"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>
                <p className="text-[11px] text-[#64748B]">
                  Example Gifyu image: <code className="text-amber-400">https://s15.gifyu.com/images/bue9g.jpg</code> or built-in <code className="text-amber-400">/assets/hero-banner-1.jpg</code>
                </p>
              </div>

              {/* Announcement Pill */}
              <div className="space-y-1.5">
                <label htmlFor="hero-announcement" className="text-xs font-semibold text-[#CBD5E1]">
                  Tactical Season Announcement Pill Text
                </label>
                <input
                  id="hero-announcement"
                  type="text"
                  value={config.hero.announcement}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, announcement: e.target.value },
                    }))
                  }
                  className="w-full px-3.5 py-2 rounded-lg border border-[#262B35] bg-[#0F1217] text-xs text-[#F1F5F9] focus:border-amber-500 outline-none"
                />
              </div>

              {/* Headline & Highlight */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="hero-headline" className="text-xs font-semibold text-[#CBD5E1]">
                    Main Headline (Prefix)
                  </label>
                  <input
                    id="hero-headline"
                    type="text"
                    value={config.hero.headline}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, headline: e.target.value },
                      }))
                    }
                    className="w-full px-3.5 py-2 rounded-lg border border-[#262B35] bg-[#0F1217] text-xs text-[#F1F5F9] focus:border-amber-500 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="hero-highlight" className="text-xs font-semibold text-[#CBD5E1]">
                    Headline Gradient Highlight
                  </label>
                  <input
                    id="hero-highlight"
                    type="text"
                    value={config.hero.headlineHighlight}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, headlineHighlight: e.target.value },
                      }))
                    }
                    className="w-full px-3.5 py-2 rounded-lg border border-[#262B35] bg-[#0F1217] text-xs text-[#F1F5F9] focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              {/* Subheading */}
              <div className="space-y-1.5">
                <label htmlFor="hero-subheading" className="text-xs font-semibold text-[#CBD5E1]">
                  Subheading & Value Proposition
                </label>
                <textarea
                  id="hero-subheading"
                  rows={3}
                  value={config.hero.subheading}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, subheading: e.target.value },
                    }))
                  }
                  className="w-full px-3.5 py-2 rounded-lg border border-[#262B35] bg-[#0F1217] text-xs text-[#F1F5F9] focus:border-amber-500 outline-none"
                />
              </div>
            </div>
          )}

          {/* TAB 2: VIDEO SECTION */}
          {activeTab === "video" && (
            <div className="space-y-4">
              {/* YouTube Video URL */}
              <div className="space-y-1.5 p-4 rounded-xl border border-[#1E232B] bg-[#0F1217]">
                <div className="flex items-center justify-between">
                  <label htmlFor="video-url" className="text-xs font-semibold text-[#CBD5E1] flex items-center gap-1.5">
                    <span>YouTube Video URL or Direct Video Link *</span>
                  </label>
                  <span className="text-[11px] text-amber-400">
                    Auto-formats any YouTube link
                  </span>
                </div>
                <input
                  id="video-url"
                  type="text"
                  value={config.video.videoUrl}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      video: { ...prev.video, videoUrl: e.target.value },
                    }))
                  }
                  placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/... or .mp4"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#262B35] bg-[#14181F] text-xs font-mono text-[#F1F5F9] placeholder-[#64748B] focus:border-amber-500 outline-none"
                  required
                />
                <p className="text-[11px] text-[#64748B]">
                  Paste any YouTube link: <code className="text-amber-400">https://www.youtube.com/watch?v=...</code> or shortlink <code className="text-amber-400">https://youtu.be/...</code>. It will automatically embed seamlessly on the homepage!
                </p>
              </div>

              {/* Video Poster Image (Gifyu Supported) */}
              <div className="space-y-1.5 p-4 rounded-xl border border-[#1E232B] bg-[#0F1217]">
                <div className="flex items-center justify-between">
                  <label htmlFor="video-poster" className="text-xs font-semibold text-[#CBD5E1]">
                    Video Poster Thumbnail Image URL *
                  </label>
                  <span className="text-[11px] text-[#64748B]">Gifyu supported</span>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <input
                    id="video-poster"
                    type="text"
                    value={config.video.posterImage}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        video: { ...prev.video, posterImage: e.target.value },
                      }))
                    }
                    placeholder="https://s15.gifyu.com/images/... or /assets/video-poster.webp"
                    className="flex-1 w-full px-3.5 py-2.5 rounded-lg border border-[#262B35] bg-[#14181F] text-xs text-[#F1F5F9] placeholder-[#64748B] focus:border-amber-500 outline-none"
                    required
                  />
                  <div className="relative w-28 h-16 rounded-lg border border-[#262B35] overflow-hidden bg-black shrink-0">
                    <Image
                      src={
                        config.video.posterImage.startsWith("http") || config.video.posterImage.startsWith("/")
                          ? config.video.posterImage
                          : "/assets/video-poster.webp"
                      }
                      alt="Video Poster Preview"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>
              </div>

              {/* Video Title & Tag */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="video-tag" className="text-xs font-semibold text-[#CBD5E1]">
                    Section Tag
                  </label>
                  <input
                    id="video-tag"
                    type="text"
                    value={config.video.tag}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        video: { ...prev.video, tag: e.target.value },
                      }))
                    }
                    className="w-full px-3.5 py-2 rounded-lg border border-[#262B35] bg-[#0F1217] text-xs text-[#F1F5F9] focus:border-amber-500 outline-none"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label htmlFor="video-title" className="text-xs font-semibold text-[#CBD5E1]">
                    Video Breakdown Title
                  </label>
                  <input
                    id="video-title"
                    type="text"
                    value={config.video.title}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        video: { ...prev.video, title: e.target.value },
                      }))
                    }
                    className="w-full px-3.5 py-2 rounded-lg border border-[#262B35] bg-[#0F1217] text-xs text-[#F1F5F9] focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              {/* Video Description */}
              <div className="space-y-1.5">
                <label htmlFor="video-desc" className="text-xs font-semibold text-[#CBD5E1]">
                  Video Description Text
                </label>
                <textarea
                  id="video-desc"
                  rows={2}
                  value={config.video.description}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      video: { ...prev.video, description: e.target.value },
                    }))
                  }
                  className="w-full px-3.5 py-2 rounded-lg border border-[#262B35] bg-[#0F1217] text-xs text-[#F1F5F9] focus:border-amber-500 outline-none"
                />
              </div>

              {/* YouTube Channel Link & Meta Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="video-channel" className="text-xs font-semibold text-[#CBD5E1]">
                    YouTube Channel Link
                  </label>
                  <input
                    id="video-channel"
                    type="text"
                    value={config.video.youtubeChannelUrl}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        video: { ...prev.video, youtubeChannelUrl: e.target.value },
                      }))
                    }
                    className="w-full px-3.5 py-2 rounded-lg border border-[#262B35] bg-[#0F1217] text-xs text-[#F1F5F9] focus:border-amber-500 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="video-metalabel" className="text-xs font-semibold text-[#CBD5E1]">
                    Player Meta Bar Label
                  </label>
                  <input
                    id="video-metalabel"
                    type="text"
                    value={config.video.metaLabel}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        video: { ...prev.video, metaLabel: e.target.value },
                      }))
                    }
                    className="w-full px-3.5 py-2 rounded-lg border border-[#262B35] bg-[#0F1217] text-xs text-[#F1F5F9] focus:border-amber-500 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SHOWDOWN BANNER */}
          {activeTab === "showdown" && (
            <div className="space-y-4">
              {/* Showdown Banner Image (Gifyu Supported) */}
              <div className="space-y-1.5 p-4 rounded-xl border border-[#1E232B] bg-[#0F1217]">
                <div className="flex items-center justify-between">
                  <label htmlFor="showdown-banner" className="text-xs font-semibold text-[#CBD5E1]">
                    Showdown Section Banner Image URL *
                  </label>
                  <span className="text-[11px] text-[#64748B]">Gifyu supported</span>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <input
                    id="showdown-banner"
                    type="text"
                    value={config.showdown.bannerImage}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        showdown: { ...prev.showdown, bannerImage: e.target.value },
                      }))
                    }
                    placeholder="https://s15.gifyu.com/images/... or /assets/showdown-banner.jpg"
                    className="flex-1 w-full px-3.5 py-2.5 rounded-lg border border-[#262B35] bg-[#14181F] text-xs text-[#F1F5F9] placeholder-[#64748B] focus:border-amber-500 outline-none"
                    required
                  />
                  <div className="relative w-28 h-16 rounded-lg border border-[#262B35] overflow-hidden bg-black shrink-0">
                    <Image
                      src={
                        config.showdown.bannerImage.startsWith("http") || config.showdown.bannerImage.startsWith("/")
                          ? config.showdown.bannerImage
                          : "/assets/showdown-banner.jpg"
                      }
                      alt="Showdown Banner Preview"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>
              </div>

              {/* Tag & Title */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="showdown-tag" className="text-xs font-semibold text-[#CBD5E1]">
                    Pill Badge Tag
                  </label>
                  <input
                    id="showdown-tag"
                    type="text"
                    value={config.showdown.tag}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        showdown: { ...prev.showdown, tag: e.target.value },
                      }))
                    }
                    className="w-full px-3.5 py-2 rounded-lg border border-[#262B35] bg-[#0F1217] text-xs text-[#F1F5F9] focus:border-amber-500 outline-none"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label htmlFor="showdown-title" className="text-xs font-semibold text-[#CBD5E1]">
                    Showdown Banner Headline
                  </label>
                  <input
                    id="showdown-title"
                    type="text"
                    value={config.showdown.title}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        showdown: { ...prev.showdown, title: e.target.value },
                      }))
                    }
                    className="w-full px-3.5 py-2 rounded-lg border border-[#262B35] bg-[#0F1217] text-xs text-[#F1F5F9] focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label htmlFor="showdown-desc" className="text-xs font-semibold text-[#CBD5E1]">
                  Section Description
                </label>
                <textarea
                  id="showdown-desc"
                  rows={2}
                  value={config.showdown.description}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      showdown: { ...prev.showdown, description: e.target.value },
                    }))
                  }
                  className="w-full px-3.5 py-2 rounded-lg border border-[#262B35] bg-[#0F1217] text-xs text-[#F1F5F9] focus:border-amber-500 outline-none"
                />
              </div>

              {/* Button Text & Target Link */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="showdown-cta-text" className="text-xs font-semibold text-[#CBD5E1]">
                    CTA Button Label
                  </label>
                  <input
                    id="showdown-cta-text"
                    type="text"
                    value={config.showdown.ctaText}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        showdown: { ...prev.showdown, ctaText: e.target.value },
                      }))
                    }
                    className="w-full px-3.5 py-2 rounded-lg border border-[#262B35] bg-[#0F1217] text-xs text-[#F1F5F9] focus:border-amber-500 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="showdown-cta-link" className="text-xs font-semibold text-[#CBD5E1]">
                    CTA Button Link
                  </label>
                  <input
                    id="showdown-cta-link"
                    type="text"
                    value={config.showdown.ctaLink}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        showdown: { ...prev.showdown, ctaLink: e.target.value },
                      }))
                    }
                    className="w-full px-3.5 py-2 rounded-lg border border-[#262B35] bg-[#0F1217] text-xs text-[#F1F5F9] focus:border-amber-500 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5 border-t border-[#1E232B]">
            <button
              type="button"
              onClick={handleResetDefaults}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#1E232B] transition w-full sm:w-auto justify-center"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium rounded-lg border border-[#262B35] bg-[#14181F] text-[#94A3B8] hover:text-[#F1F5F9] transition flex-1 sm:flex-none"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSaving}
                className="px-5 py-2 text-xs font-semibold rounded-lg bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/20 transition flex-1 sm:flex-none flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isSaving ? "Publishing..." : "Save & Publish Changes"}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
