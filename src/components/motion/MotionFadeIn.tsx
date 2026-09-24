"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { fadeUpVariants } from "@/components/motion/variants";
import { useSafeVariants } from "@/hooks/useAnimationPreference";
import { cn } from "@/lib/utils";

export interface MotionFadeInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  direction?: "up" | "none";
}

export function MotionFadeIn({
  children,
  className,
  delay = 0,
  ...props
}: MotionFadeInProps) {
  const safeVariants = useSafeVariants(fadeUpVariants);

  return (
    <motion.div
      variants={safeVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
