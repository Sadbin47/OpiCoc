"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  onComplete?: (code: string) => void;
  onResend?: () => Promise<void>;
  length?: number;
  disabled?: boolean;
  resendCooldownSeconds?: number;
}

export function OtpInput({
  value,
  onChange,
  onComplete,
  onResend,
  length = 6,
  disabled = false,
  resendCooldownSeconds = 60,
}: OtpInputProps) {
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);
  const [cooldown, setCooldown] = React.useState(resendCooldownSeconds);
  const [isResending, setIsResending] = React.useState(false);

  // Timer countdown for resend
  React.useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  // Digits array derived from value
  const digits = React.useMemo(() => {
    const arr = value.split("");
    while (arr.length < length) arr.push("");
    return arr.slice(0, length);
  }, [value, length]);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const char = e.target.value.replace(/\D/g, "").slice(-1);
    const newDigits = [...digits];
    newDigits[index] = char;
    const combined = newDigits.join("");
    onChange(combined);

    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (combined.length === length && !combined.includes("")) {
      onComplete?.(combined);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
        const newDigits = [...digits];
        newDigits[index - 1] = "";
        onChange(newDigits.join(""));
      } else {
        const newDigits = [...digits];
        newDigits[index] = "";
        onChange(newDigits.join(""));
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;

    onChange(pasted);
    const focusIndex = Math.min(pasted.length, length - 1);
    inputRefs.current[focusIndex]?.focus();

    if (pasted.length === length) {
      onComplete?.(pasted);
    }
  };

  const handleResendClick = async () => {
    if (cooldown > 0 || isResending || !onResend) return;
    setIsResending(true);
    try {
      await onResend();
      setCooldown(resendCooldownSeconds);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* 6 Segmented Inputs */}
      <div className="flex items-center justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
        {digits.map((digit, idx) => (
          <input
            key={idx}
            ref={(el) => {
              inputRefs.current[idx] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            disabled={disabled}
            onChange={(e) => handleChange(idx, e)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            className="w-11 h-13 sm:w-12 sm:h-14 text-center font-mono text-xl sm:text-2xl font-bold rounded-lg border border-[#262B35] bg-[#1A1E26] text-[#F1F5F9] focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all disabled:opacity-50"
            aria-label={`Digit ${idx + 1} of verification code`}
            autoComplete={idx === 0 ? "one-time-code" : "off"}
          />
        ))}
      </div>

      {/* Resend Action & Countdown */}
      {onResend && (
        <div className="flex items-center justify-between pt-2 text-xs text-[#94A3B8]">
          <span>Didn&apos;t receive the code?</span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleResendClick}
            disabled={cooldown > 0 || isResending || disabled}
            className="h-auto p-0 font-mono text-xs text-amber-400 hover:text-amber-300 disabled:text-[#64748B] hover:bg-transparent"
          >
            {isResending ? (
              <span className="flex items-center gap-1">
                <RefreshCw className="w-3 h-3 animate-spin" /> Sending...
              </span>
            ) : cooldown > 0 ? (
              `Resend code in ${cooldown}s`
            ) : (
              "Resend Code"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
