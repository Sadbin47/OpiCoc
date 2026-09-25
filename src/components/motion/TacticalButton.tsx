"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { useAnimationPreference } from "@/hooks/useAnimationPreference";
import { cn } from "@/lib/utils";

export interface TacticalButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function TacticalButton({
  children,
  className,
  variant = "primary",
  size = "md",
  disabled,
  ...props
}: TacticalButtonProps) {
  const { prefersReduced } = useAnimationPreference();

  const variantStyles = {
    primary:
      "bg-amber-500 hover:bg-amber-400 text-black font-semibold shadow-lg shadow-amber-500/10 border border-amber-400/20",
    secondary:
      "bg-[#1A1F29] hover:bg-[#222834] text-[#F1F5F9] border border-[#262B35]",
    outline:
      "bg-transparent hover:bg-[#161A22] text-[#CBD5E1] hover:text-[#F1F5F9] border border-[#262B35] hover:border-[#3B4252]",
    ghost:
      "bg-transparent hover:bg-[#161A22] text-[#94A3B8] hover:text-[#F1F5F9]",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
    md: "px-4 py-2.5 text-xs sm:text-sm rounded-lg gap-2",
    lg: "px-6 py-3 text-sm sm:text-base rounded-xl gap-2.5",
  };

  return (
    <motion.button
      whileHover={prefersReduced || disabled ? undefined : { scale: 1.02 }}
      whileTap={prefersReduced || disabled ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 450, damping: 25 }}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
