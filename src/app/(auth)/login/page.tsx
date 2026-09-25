"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { loginSchema } from "@/features/auth/schemas/authSchemas";
import { loginUser } from "@/services/authService";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, Mail, AlertCircle, ArrowRight } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);

  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate with Zod
    const result = loginSchema.safeParse({ email, password, rememberMe });
    if (!result.success) {
      setError(result.error.errors[0]?.message || "Please check your credentials.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await loginUser(email, password);
      if (res.success) {
        // Successful login: redirect to intended destination or home
        router.push(redirectTo);
        router.refresh();
      } else {
        // If unverified, guide to verify-otp
        if (res.message?.toLowerCase().includes("not verified") || res.message?.toLowerCase().includes("verify")) {
          router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
          return;
        }
        setError(res.message || "Invalid email or password");
      }
    } catch {
      setError("An unexpected error occurred during login. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <h1 className="font-clash text-2xl font-bold text-[#F1F5F9]">Welcome Back, Chief</h1>
        <p className="text-xs text-[#94A3B8]">
          Sign in to access your purchased bases and custom clan orders
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-1.5">
          <Label htmlFor="login-email" className="text-xs text-[#CBD5E1]">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
            <Input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="chief@example.com"
              required
              className="pl-9 bg-[#1A1E26] border-[#262B35] text-xs h-10 text-[#F1F5F9]"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="login-password" className="text-xs text-[#CBD5E1]">
              Password
            </Label>
            <Link
              href="/reset-password"
              className="text-xs font-mono text-amber-400 hover:text-amber-300 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
            <Input
              id="login-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="pl-9 pr-10 bg-[#1A1E26] border-[#262B35] text-xs h-10 text-[#F1F5F9]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#F1F5F9]"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center gap-2 pt-1">
          <input
            id="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="rounded border-[#262B35] bg-[#1A1E26] text-amber-500 focus:ring-amber-500/20"
          />
          <Label htmlFor="remember-me" className="text-xs text-[#94A3B8] cursor-pointer">
            Remember me on this device
          </Label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full py-5 text-sm font-bold shadow-lg shadow-amber-500/20 gap-2"
        >
          {isSubmitting ? "Authenticating..." : "Sign In to Account"}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </form>

      {/* Registration Redirect Link */}
      <div className="text-center text-xs text-[#94A3B8] pt-2">
        <span>Don&apos;t have an OPICOC account?</span>{" "}
        <Link
          href={`/registration${redirectTo !== "/" ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`}
          className="text-amber-400 font-semibold hover:text-amber-300 hover:underline"
        >
          Create an Account
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <React.Suspense fallback={<div className="h-64 animate-pulse rounded-xl bg-[#12151B]" />}>
      <LoginForm />
    </React.Suspense>
  );
}
