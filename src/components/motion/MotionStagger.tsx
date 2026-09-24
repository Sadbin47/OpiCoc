"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import {
  staggerContainerVariants,
  staggerItemVariants,
} from "@/components/motion/variants";
import { useSafeVariants } from "@/hooks/useAnimationPreference";
import { cn } from "@/lib/utils";

export interface MotionStaggerProps extends HTMLMotionProps<"div"> {
  staggerDelay?: number;
}

export function MotionStaggerContainer({
  children,
  className,
  ...props
}: MotionStaggerProps) {
  const safeVariants = useSafeVariants(staggerContainerVariants);

  return (
    <motion.div
      variants={safeVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function MotionStaggerItem({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">) {
  const safeVariants = useSafeVariants(staggerItemVariants);

  return (
    <motion.div variants={safeVariants} className={cn(className)} {...props}>
      {children}
    </motion.div>
  );
}
