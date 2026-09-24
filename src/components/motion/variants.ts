import type { Variants } from "motion/react";

export const EASINGS = {
  easeOutCubic: [0.215, 0.61, 0.355, 1],
  easeInOutCubic: [0.645, 0.045, 0.355, 1],
} as const;

export const DURATIONS = {
  instant: 0.1,
  fast: 0.18,
  normal: 0.28,
  slow: 0.45,
} as const;

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATIONS.normal, ease: EASINGS.easeOutCubic },
  },
};

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATIONS.normal, ease: EASINGS.easeOutCubic },
  },
};

export const fadeScaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATIONS.normal, ease: EASINGS.easeOutCubic },
  },
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATIONS.fast, ease: EASINGS.easeOutCubic },
  },
};

export const cardHoverMotion = {
  whileHover: { y: -3, transition: { duration: DURATIONS.fast, ease: "easeOut" } },
  whileTap: { y: 0, scale: 0.99, transition: { duration: 0.08 } },
};

export const buttonPressMotion = {
  whileTap: { scale: 0.97, transition: { duration: 0.08 } },
};

export const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
};
