"use client";

import * as React from "react";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CustomerReview } from "@/types";
import {
  Star,
  ShieldCheck,
  MessageSquarePlus,
  Quote,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface ReviewSectionProps {
  reviews: CustomerReview[];
}

export function ReviewSection({ reviews }: ReviewSectionProps) {
  const [openModal, setOpenModal] = React.useState(false);
  const [rating, setRating] = React.useState(5);
  const [reviewText, setReviewText] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim() || !firstName.trim()) return;

    setIsSubmitting(true);
    // Simulate optimistic submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setOpenModal(false);
        setReviewText("");
        setFirstName("");
      }, 1500);
    }, 800);
  };

  return (
    <section className="py-16 sm:py-24 border-b border-[#262B35] bg-[#0E1117]">
      <Container size="default">
        {/* Section Header with Overall Score Ribbon */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-amber-500">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Testimonials</span>
            </div>
            <h2 className="font-clash text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              Trusted by Competitive War Clans
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl">
              Hear directly from Champions League war leaders and Legend League pushers who trust OPICOC for their base defense.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Dialog open={openModal} onOpenChange={setOpenModal}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="font-semibold gap-2 border-amber-500/30 text-amber-400 hover:text-amber-300 hover:bg-amber-500/10">
                  <MessageSquarePlus className="w-4 h-4" />
                  Leave a Review
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-[#12151B] border-[#262B35]">
                <DialogHeader>
                  <DialogTitle className="font-clash text-xl text-[#F1F5F9] flex items-center gap-2">
                    <Quote className="w-5 h-5 text-amber-400" />
                    Share Your Defense Experience
                  </DialogTitle>
                  <DialogDescription className="text-xs text-[#94A3B8]">
                    Your verified review helps other clan leaders choose the right base defense configurations.
                  </DialogDescription>
                </DialogHeader>

                {submitted ? (
                  <div className="py-8 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-semibold text-[#F1F5F9]">Thank you for your feedback!</p>
                    <p className="text-xs text-[#94A3B8]">Your review has been submitted for verification.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitReview} className="space-y-4 pt-2">
                    {/* Star Selector */}
                    <div className="space-y-1.5">
                      <Label className="text-xs text-[#CBD5E1]">Rating</Label>
                      <div className="flex items-center gap-1.5" role="group" aria-label="Rating out of 5 stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="p-1 text-amber-400 hover:scale-110 transition-transform focus:outline-none"
                            aria-label={`Rate ${star} stars`}
                          >
                            <Star
                              className={`w-6 h-6 ${
                                star <= rating ? "fill-amber-400" : "text-[#3B4252]"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* First Name */}
                    <div className="space-y-1.5">
                      <Label htmlFor="review-name" className="text-xs text-[#CBD5E1]">
                        Display Name / In-Game Tag
                      </Label>
                      <Input
                        id="review-name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="e.g. Marcus (Chief)"
                        required
                        className="bg-[#1A1E26] border-[#262B35] text-xs"
                      />
                    </div>

                    {/* Review Body */}
                    <div className="space-y-1.5">
                      <Label htmlFor="review-body" className="text-xs text-[#CBD5E1]">
                        Your Review
                      </Label>
                      <Textarea
                        id="review-body"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="How did the base perform in CWL or Legend League? Trap effectiveness, delivery speed, etc."
                        rows={4}
                        required
                        className="bg-[#1A1E26] border-[#262B35] text-xs resize-none"
                      />
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setOpenModal(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" size="sm" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Review"}
                      </Button>
                    </div>
                  </form>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Global Rating Score Bar */}
        <div className="p-4 rounded-xl bg-[#12151B] border border-[#262B35] mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center divide-y sm:divide-y-0 sm:divide-x divide-[#1E232B]">
          <div className="py-2 sm:py-0 flex flex-col items-center justify-center">
            <div className="flex items-center gap-1 text-amber-400 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="font-mono text-sm font-bold text-[#F1F5F9]">5.0 / 5.0 Rating</span>
            <span className="text-[11px] text-[#94A3B8]">Overall Customer Satisfaction</span>
          </div>

          <div className="py-2 sm:py-0 flex flex-col items-center justify-center">
            <span className="font-mono text-lg font-bold text-emerald-400 mb-0.5">100%</span>
            <span className="text-xs font-semibold text-[#F1F5F9]">Verified Buyers</span>
            <span className="text-[11px] text-[#94A3B8]">Authenticated Purchase Reviews</span>
          </div>

          <div className="py-2 sm:py-0 flex flex-col items-center justify-center">
            <span className="font-mono text-lg font-bold text-sky-400 mb-0.5">&lt; 30 Seconds</span>
            <span className="text-xs font-semibold text-[#F1F5F9]">Average Link Delivery</span>
            <span className="text-[11px] text-[#94A3B8]">Instant Supercell Game Import</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="flex flex-col justify-between rounded-xl border border-[#262B35] bg-[#12151B] p-5 transition-all duration-300 hover:border-amber-500/30"
            >
              <div>
                {/* Stars and Verified Pill */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <Badge variant="tactical" className="text-[10px] px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                    <ShieldCheck className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>

                {/* Review Text */}
                <p className="text-xs text-[#CBD5E1] leading-relaxed italic line-clamp-4">
                  &ldquo;{rev.reviewText}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 mt-4 border-t border-[#1E232B] flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-500/20 to-sky-500/20 border border-amber-500/30 flex items-center justify-center text-xs font-bold text-amber-400">
                  {rev.firstName.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#F1F5F9]">
                    {rev.firstName} {rev.lastName}
                  </p>
                  <p className="text-[10px] text-[#64748B] font-mono">
                    {new Date(rev.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
