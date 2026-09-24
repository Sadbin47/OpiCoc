"use client";

import { useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";
import { reducedMotionVariants } from "@/components/motion/variants";

/**
 * Returns safe animation variants that collapse to instantaneous opacity transitions
 * when the user has enabled prefers-reduced-motion in their operating system.
 */
export function useSafeVariants(variants: Variants): Variants {
  const shouldReduceMotion = useReducedMotion();
  return shouldReduceMotion ? reducedMotionVariants : variants;
}
