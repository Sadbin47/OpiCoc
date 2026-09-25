"use client";

import * as React from "react";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Send, AlertCircle } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().max(0, "Spam detected"),
});

export function ContactForm() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [honeypot, setHoneypot] = React.useState("");

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate with Zod
    const result = contactSchema.safeParse({
      name,
      email,
      subject,
      message,
      honeypot,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Send contact message to API or simulate success
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch {
      setErrors({ form: "Failed to send your message. Please try again or join our Discord." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="p-8 sm:p-12 text-center rounded-xl border border-emerald-500/30 bg-[#12151B] space-y-4">
        <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-clash text-2xl font-bold text-[#F1F5F9]">Message Transmitted!</h3>
        <p className="text-xs sm:text-sm text-[#94A3B8] max-w-md mx-auto leading-relaxed">
          Thank you for reaching out to OPICOC. A base architect will review your message and respond within 24 hours.
        </p>
        <div className="pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsSubmitted(false)}
          >
            Send Another Message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-[#262B35] bg-[#12151B] p-6 sm:p-8">
      {/* Honeypot anti-spam field (hidden from real users) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="botTrap">Do not fill this field</label>
        <input
          id="botTrap"
          type="text"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {errors.form && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errors.form}</span>
        </div>
      )}

      {/* Name & Email Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="contact-name" className="text-xs text-[#CBD5E1]">
            Your Name / In-Game Tag
          </Label>
          <Input
            id="contact-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Marcus (Chief)"
            required
            className="bg-[#1A1E26] border-[#262B35] text-xs h-10 text-[#F1F5F9]"
          />
          {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="contact-email" className="text-xs text-[#CBD5E1]">
            Email Address
          </Label>
          <Input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="chief@example.com"
            required
            className="bg-[#1A1E26] border-[#262B35] text-xs h-10 text-[#F1F5F9]"
          />
          {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
        </div>
      </div>

      {/* Subject */}
      <div className="space-y-1.5">
        <Label htmlFor="contact-subject" className="text-xs text-[#CBD5E1]">
          Inquiry Subject
        </Label>
        <Input
          id="contact-subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="e.g. Question about TH18 CWL Pack / Custom Base Order"
          required
          className="bg-[#1A1E26] border-[#262B35] text-xs h-10 text-[#F1F5F9]"
        />
        {errors.subject && <p className="text-[11px] text-red-400 mt-1">{errors.subject}</p>}
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <Label htmlFor="contact-message" className="text-xs text-[#CBD5E1]">
          Detailed Message
        </Label>
        <Textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Please describe your question or clan defensive requirements in detail..."
          rows={5}
          required
          className="bg-[#1A1E26] border-[#262B35] text-xs resize-none text-[#F1F5F9]"
        />
        {errors.message && <p className="text-[11px] text-red-400 mt-1">{errors.message}</p>}
      </div>

      {/* Submit Action */}
      <div className="pt-2">
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full sm:w-auto font-semibold gap-2 shadow-md"
        >
          <Send className="w-4 h-4" />
          {isSubmitting ? "Transmitting..." : "Send Message"}
        </Button>
      </div>
    </form>
  );
}
