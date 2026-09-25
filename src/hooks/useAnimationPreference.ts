"use client";

import { useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";
import { reducedMotionVariants } from "@/components/motion/variants";

export { useReducedMotion };

/**
 * Returns safe animation variants that collapse to instantaneous opacity transitions
 * when the user has enabled prefers-reduced-motion in their operating system.
 */
export function useSafeVariants(variants: Variants): Variants {
  const shouldReduceMotion = useReducedMotion();
  return shouldReduceMotion ? reducedMotionVariants : variants;
}

/**
 * Generic safe variant selector
 */
export function useSafeMotionVariants<T>(standardVariants: T, reducedVariants: T): T {
  const shouldReduceMotion = useReducedMotion();
  return shouldReduceMotion ? reducedVariants : standardVariants;
}

/**
 * Hook to inspect global animation preferences and reduced-motion states
 */
export function useAnimationPreference() {
  const prefersReduced = useReducedMotion();
  return {
    prefersReduced: Boolean(prefersReduced),
    durationMultiplier: prefersReduced ? 0 : 1,
  };
}
