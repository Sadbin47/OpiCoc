"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { registrationSchema } from "@/features/auth/schemas/authSchemas";
import { registerUser } from "@/services/authService";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lock, Mail, User, AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";

function RegistrationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string>>({});
  const [generalError, setGeneralError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setGeneralError(null);

    // Validate with Zod
    const result = registrationSchema.safeParse({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });

    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0].toString()] = err.message;
        }
      });
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await registerUser(firstName, lastName, email, password);
      if (res.success) {
        // Redirect to OTP verification page
        router.push(
          `/verify-otp?email=${encodeURIComponent(email)}&redirectTo=${encodeURIComponent(redirectTo)}`
        );
      } else {
        setGeneralError(res.message || "Failed to create account. Please try again.");
      }
    } catch {
      setGeneralError("An unexpected error occurred during registration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasMinLength = password.length >= 8;
  const hasLetter = /[A-Za-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <h1 className="font-clash text-2xl font-bold text-[#F1F5F9]">Join the War Roster</h1>
        <p className="text-xs text-[#94A3B8]">
          Create your account to unlock tournament-grade bases and custom defense commissions
        </p>
      </div>

      {generalError && (
        <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{generalError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="space-y-1.5">
            <Label htmlFor="reg-first-name" className="text-xs text-[#CBD5E1]">
              First Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
              <Input
                id="reg-first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Marcus"
                required
                className="pl-9 bg-[#1A1E26] border-[#262B35] text-xs h-10 text-[#F1F5F9]"
              />
            </div>
            {fieldErrors.firstName && (
              <p className="text-[11px] text-red-400">{fieldErrors.firstName}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="reg-last-name" className="text-xs text-[#CBD5E1]">
              Last Name
            </Label>
            <Input
              id="reg-last-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="V."
              required
              className="bg-[#1A1E26] border-[#262B35] text-xs h-10 text-[#F1F5F9]"
            />
            {fieldErrors.lastName && (
              <p className="text-[11px] text-red-400">{fieldErrors.lastName}</p>
            )}
          </div>
        </div>

        {/* Email Address */}
        <div className="space-y-1.5">
          <Label htmlFor="reg-email" className="text-xs text-[#CBD5E1]">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
            <Input
              id="reg-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="chief@example.com"
              required
              className="pl-9 bg-[#1A1E26] border-[#262B35] text-xs h-10 text-[#F1F5F9]"
            />
          </div>
          {fieldErrors.email && (
            <p className="text-[11px] text-red-400">{fieldErrors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <Label htmlFor="reg-password" className="text-xs text-[#CBD5E1]">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
            <Input
              id="reg-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              required
              className="pl-9 bg-[#1A1E26] border-[#262B35] text-xs h-10 text-[#F1F5F9]"
            />
          </div>
          {fieldErrors.password && (
            <p className="text-[11px] text-red-400">{fieldErrors.password}</p>
          )}

          {/* Password Strength Checklist */}
          {password && (
            <div className="pt-1.5 flex flex-wrap gap-3 text-[11px] text-[#64748B]">
              <span className={`flex items-center gap-1 ${hasMinLength ? "text-emerald-400" : ""}`}>
                <CheckCircle2 className="w-3 h-3" /> 8+ Characters
              </span>
              <span className={`flex items-center gap-1 ${hasLetter ? "text-emerald-400" : ""}`}>
                <CheckCircle2 className="w-3 h-3" /> Letters
              </span>
              <span className={`flex items-center gap-1 ${hasNumber ? "text-emerald-400" : ""}`}>
                <CheckCircle2 className="w-3 h-3" /> Numbers
              </span>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <Label htmlFor="reg-confirm-password" className="text-xs text-[#CBD5E1]">
            Confirm Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
            <Input
              id="reg-confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              required
              className="pl-9 bg-[#1A1E26] border-[#262B35] text-xs h-10 text-[#F1F5F9]"
            />
          </div>
          {fieldErrors.confirmPassword && (
            <p className="text-[11px] text-red-400">{fieldErrors.confirmPassword}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full py-5 text-sm font-bold shadow-lg shadow-amber-500/20 gap-2 mt-2"
        >
          {isSubmitting ? "Creating Account..." : "Create Account & Send OTP"}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </form>

      {/* Login Redirect */}
      <div className="text-center text-xs text-[#94A3B8] pt-2">
        <span>Already have an account?</span>{" "}
        <Link
          href={`/login${redirectTo !== "/" ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`}
          className="text-amber-400 font-semibold hover:text-amber-300 hover:underline"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default function RegistrationPage() {
  return (
    <React.Suspense fallback={<div className="h-64 animate-pulse rounded-xl bg-[#12151B]" />}>
      <RegistrationForm />
    </React.Suspense>
  );
}
