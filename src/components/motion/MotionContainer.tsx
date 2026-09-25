"use client";

import * as React from "react";
import { motion, type HTMLMotionProps, type Variants } from "motion/react";
import { useSafeVariants } from "@/hooks/useAnimationPreference";
import {
  fadeUpVariants,
  fadeInVariants,
  staggerContainerVariants,
  reducedMotionVariants,
  EASINGS,
  DURATIONS,
} from "@/components/motion/variants";
import { cn } from "@/lib/utils";

export interface MotionContainerProps extends HTMLMotionProps<"div"> {
  animation?: "fadeUp" | "fadeIn" | "stagger" | "none";
  delay?: number;
  viewportAmount?: number;
  once?: boolean;
}

export function MotionContainer({
  children,
  className,
  animation = "fadeUp",
  delay = 0,
  viewportAmount = 0.15,
  once = true,
  ...props
}: MotionContainerProps) {
  let selectedVariants: Variants = fadeUpVariants;

  if (animation === "fadeIn") {
    selectedVariants = fadeInVariants;
  } else if (animation === "stagger") {
    selectedVariants = staggerContainerVariants;
  } else if (animation === "none") {
    selectedVariants = reducedMotionVariants;
  }

  const safeVariants = useSafeVariants(selectedVariants);

  return (
    <motion.div
      variants={safeVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: viewportAmount }}
      transition={{
        delay,
        duration: DURATIONS.normal,
        ease: EASINGS.easeOutCubic,
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
