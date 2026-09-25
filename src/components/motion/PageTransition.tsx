"use client";

import * as React from "react";
import { motion, type HTMLMotionProps, type Variants } from "motion/react";
import { useSafeVariants } from "@/hooks/useAnimationPreference";
import { EASINGS, DURATIONS } from "@/components/motion/variants";
import { cn } from "@/lib/utils";

const pageVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.easeOutCubic,
    },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: {
      duration: DURATIONS.fast,
      ease: EASINGS.easeInOutCubic,
    },
  },
};

export interface PageTransitionProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({
  children,
  className,
  ...props
}: PageTransitionProps) {
  const safeVariants = useSafeVariants(pageVariants);

  return (
    <motion.div
      variants={safeVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={cn("w-full", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
