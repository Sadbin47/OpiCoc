"use client";

import * as React from "react";
import { ArrowRight, CheckCircle } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  }

  return (
    <div className="pt-3 max-w-sm">
      <label
        htmlFor="footer-newsletter"
        className="text-xs font-semibold text-[#CBD5E1] uppercase tracking-wider block mb-2"
      >
        Stay Updated on CWL Metas
      </label>
      {submitted ? (
        <p className="text-xs text-emerald-400 font-medium bg-emerald-500/10 border border-emerald-500/20 p-2 rounded-md flex items-center gap-1.5">
          <CheckCircle className="w-3.5 h-3.5 shrink-0" />
          Thank you for subscribing to OPICOC meta alerts!
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            id="footer-newsletter"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="builder@clan.com"
            required
            className="flex-1 h-9 rounded-md border border-[#262B35] bg-[#12151B] px-3 text-xs text-[#F1F5F9] placeholder:text-[#64748B] outline-none focus-visible:border-amber-500 focus-visible:ring-1 focus-visible:ring-amber-500"
            aria-label="Email address for newsletter"
          />
          <button
            type="submit"
            className="h-9 px-3 rounded-md bg-amber-500 text-black text-xs font-semibold hover:bg-amber-600 transition flex items-center justify-center gap-1 shrink-0"
          >
            Join
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      )}
    </div>
  );
}
