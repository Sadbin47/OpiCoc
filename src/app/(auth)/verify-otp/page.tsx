"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { OtpInput } from "@/features/auth/components/OtpInput";
import { verifyOtp, resendOtp } from "@/services/authService";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

function VerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const redirectTo = searchParams.get("redirectTo") || "/login";

  const [otp, setOtp] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);
  const [isVerifying, setIsVerifying] = React.useState(false);

  const handleVerify = async (codeToVerify?: string) => {
    const code = codeToVerify || otp;
    if (code.length !== 6) {
      setError("Please enter the complete 6-digit verification code.");
      return;
    }

    if (!email) {
      setError("Missing email address. Please return to the registration page.");
      return;
    }

    setError(null);
    setIsVerifying(true);

    try {
      const res = await verifyOtp(email, code);
      if (res.success) {
        setSuccessMsg(res.message || "Email verified successfully!");
        setTimeout(() => {
          router.push(`/login?verified=true&redirectTo=${encodeURIComponent(redirectTo)}`);
        }, 1200);
      } else {
        setError(res.message || "Invalid or expired verification code.");
      }
    } catch {
      setError("An unexpected error occurred during verification. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;
    setError(null);
    setSuccessMsg(null);
    const res = await resendOtp(email);
    if (res.success) {
      setSuccessMsg("A new verification code has been dispatched to your email.");
    } else {
      setError(res.message || "Failed to resend verification code.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
          <Mail className="w-6 h-6" />
        </div>
        <h1 className="font-clash text-2xl font-bold text-[#F1F5F9]">Verify Your Account</h1>
        <p className="text-xs text-[#94A3B8] max-w-xs mx-auto">
          We sent a 6-digit confirmation code to:
          <span className="font-mono text-[#F1F5F9] block font-semibold mt-1">
            {email || "your email"}
          </span>
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="space-y-6 pt-2">
        {/* Segmented OTP Input */}
        <OtpInput
          value={otp}
          onChange={setOtp}
          onComplete={(code) => handleVerify(code)}
          onResend={handleResend}
          disabled={isVerifying}
        />

        {/* Verification Submit Button */}
        <Button
          type="button"
          size="lg"
          onClick={() => handleVerify()}
          disabled={isVerifying || otp.length !== 6}
          className="w-full py-5 text-sm font-bold shadow-lg shadow-amber-500/20 gap-2"
        >
          {isVerifying ? "Verifying Code..." : "Verify & Activate Account"}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Wrong email helper */}
      <div className="text-center text-xs text-[#94A3B8] pt-2">
        <span>Entered the wrong email?</span>{" "}
        <Link href="/registration" className="text-amber-400 hover:underline">
          Return to Registration
        </Link>
      </div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <React.Suspense fallback={<div className="h-64 animate-pulse rounded-xl bg-[#12151B]" />}>
      <VerifyOtpForm />
    </React.Suspense>
  );
}
