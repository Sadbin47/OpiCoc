"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { forgotPasswordSchema, resetPasswordSchema } from "@/features/auth/schemas/authSchemas";
import { requestPasswordReset, resetPasswordWithOtp } from "@/services/authService";
import { OtpInput } from "@/features/auth/components/OtpInput";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { KeyRound, Mail, Lock, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";

export default function ResetPasswordPage() {
  const router = useRouter();

  // Step 1: 'request-otp' | Step 2: 'enter-otp-and-password' | Step 3: 'success'
  const [step, setStep] = React.useState<"request-otp" | "enter-otp-and-password" | "success">("request-otp");

  const [email, setEmail] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Handle Step 1: Send Reset OTP
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const valResult = forgotPasswordSchema.safeParse({ email });
    if (!valResult.success) {
      setError(valResult.error.errors[0]?.message || "Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await requestPasswordReset(email);
      if (res.success) {
        setStep("enter-otp-and-password");
      } else {
        setError(res.message || "Failed to request password reset. Please try again.");
      }
    } catch {
      setError("An unexpected network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Step 2: Submit Reset Password with OTP
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const valResult = resetPasswordSchema.safeParse({
      email,
      otp,
      newPassword,
      confirmPassword,
    });

    if (!valResult.success) {
      setError(valResult.error.errors[0]?.message || "Please check your inputs.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await resetPasswordWithOtp(email, otp, newPassword);
      if (res.success) {
        setStep("success");
      } else {
        setError(res.message || "Failed to reset password. Please check your OTP.");
      }
    } catch {
      setError("An unexpected network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === "success") {
    return (
      <div className="py-6 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h1 className="font-clash text-2xl font-bold text-[#F1F5F9]">Password Reset Complete</h1>
        <p className="text-xs text-[#94A3B8] max-w-sm mx-auto leading-relaxed">
          Your credentials have been securely updated. You can now sign in using your new password.
        </p>
        <div className="pt-2">
          <Button
            type="button"
            size="lg"
            onClick={() => router.push("/login")}
            className="w-full py-5 text-sm font-bold shadow-lg shadow-amber-500/20"
          >
            Proceed to Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-2">
          <KeyRound className="w-5 h-5" />
        </div>
        <h1 className="font-clash text-2xl font-bold text-[#F1F5F9]">
          {step === "request-otp" ? "Reset Your Password" : "Set New Password"}
        </h1>
        <p className="text-xs text-[#94A3B8]">
          {step === "request-otp"
            ? "Enter your registered email address to receive a 6-digit recovery code"
            : `Enter the 6-digit code sent to ${email} and your new password`}
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {step === "request-otp" ? (
        <form onSubmit={handleRequestOtp} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="reset-email" className="text-xs text-[#CBD5E1]">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
              <Input
                id="reset-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="chief@example.com"
                required
                className="pl-9 bg-[#1A1E26] border-[#262B35] text-xs h-10 text-[#F1F5F9]"
              />
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full py-5 text-sm font-bold shadow-lg shadow-amber-500/20 gap-2 mt-2"
          >
            {isSubmitting ? "Dispatching Code..." : "Send Recovery Code"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>
      ) : (
        <form onSubmit={handleResetPassword} className="space-y-4">
          {/* OTP Input */}
          <div className="space-y-2">
            <Label className="text-xs text-[#CBD5E1] block text-center">
              6-Digit Recovery Code
            </Label>
            <OtpInput
              value={otp}
              onChange={setOtp}
              disabled={isSubmitting}
            />
          </div>

          {/* New Password */}
          <div className="space-y-1.5 pt-2">
            <Label htmlFor="new-password" className="text-xs text-[#CBD5E1]">
              New Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 8 characters"
                required
                className="pl-9 bg-[#1A1E26] border-[#262B35] text-xs h-10 text-[#F1F5F9]"
              />
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="space-y-1.5">
            <Label htmlFor="confirm-new-password" className="text-xs text-[#CBD5E1]">
              Confirm New Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
              <Input
                id="confirm-new-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your new password"
                required
                className="pl-9 bg-[#1A1E26] border-[#262B35] text-xs h-10 text-[#F1F5F9]"
              />
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting || otp.length !== 6}
            className="w-full py-5 text-sm font-bold shadow-lg shadow-amber-500/20 gap-2 mt-2"
          >
            {isSubmitting ? "Updating Password..." : "Update Password"}
            <ArrowRight className="w-4 h-4" />
          </Button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setStep("request-otp")}
              className="text-xs text-[#64748B] hover:text-[#94A3B8]"
            >
              Use a different email address
            </button>
          </div>
        </form>
      )}

      {/* Back to Login */}
      <div className="text-center text-xs text-[#94A3B8] pt-2">
        <span>Remember your password?</span>{" "}
        <Link href="/login" className="text-amber-400 font-semibold hover:text-amber-300 hover:underline">
          Return to Sign In
        </Link>
      </div>
    </div>
  );
}
