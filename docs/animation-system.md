# OPICOC V2 Animation System

This document outlines the animation standards, duration curves, performance constraints, and Motion for React (`motion/react`) patterns for OPICOC V2.

---

## 1. Core Principles

1. **Purpose-Driven**: Animations exist to explain spatial relationships, guide user focus, confirm physical actions, and convey system state. Animations never exist merely for visual decoration.
2. **Performance First**: Animate ONLY `transform` (translate, scale, rotate) and `opacity`. Never animate layout-triggering properties (`width`, `height`, `top`, `left`, `margin`, `padding`) or paint-heavy properties (`box-shadow`, `filter`) on high-frequency interactions.
3. **Snappy & Restrained**: Gaming applications feel sluggish when UI animations take longer than 200–300ms. Keep micro-interactions under 200ms.
4. **Accessible by Default**: Strictly respect `@media (prefers-reduced-motion: reduce)`. When reduced motion is requested, instantly set opacity to 1 and transforms to 0.

---

## 2. Timing & Easing Curves

```typescript
// src/config/animation.ts
export const EASINGS = {
  // Snappy enter easing (Decelerate)
  easeOutCubic: [0.215, 0.61, 0.355, 1],
  // Smooth symmetric easing
  easeInOutCubic: [0.645, 0.045, 0.355, 1],
  // Mechanical tactical spring
  springTactical: { type: "spring", stiffness: 350, damping: 25 },
  // Gentle dialog spring
  springModal: { type: "spring", stiffness: 300, damping: 30 },
} as const;

export const DURATIONS = {
  instant: 0.1,    // 100ms: button presses, checkbox toggles
  fast: 0.18,      // 180ms: tooltips, dropdowns, hover state
  normal: 0.28,    // 280ms: modal open, drawer slide, tab switch
  slow: 0.45,      // 450ms: page transition, hero section reveal
} as const;
```

---

## 3. Standard Animation Variants

### A. Page Entrance
- **Trigger**: Next.js route change / page mount.
- **Properties**: `opacity: 0 -> 1`, `y: 12px -> 0px`.
- **Duration**: `DURATIONS.normal` (280ms).
- **Easing**: `EASINGS.easeOutCubic`.
- **Reduced Motion**: `opacity: 0 -> 1`, `y: 0`.

```typescript
export const pageTransitionVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.25, ease: [0.215, 0.61, 0.355, 1] }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.15 }
  }
};
```

---

### B. Section Reveal (Scroll-Triggered)
- **Trigger**: Entering viewport with 15% threshold (`viewport={{ once: true, amount: 0.15 }}`).
- **Properties**: `opacity: 0 -> 1`, `y: 20px -> 0px`.
- **Stagger**: Child cards staggered by `0.06s` (max 6 items to prevent waiting).
- **Duration**: 0.35s.

```typescript
export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    }
  }
};

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }
  }
};
```

---

### C. Card Hover (Base Layout Cards)
- **Target**: Town Hall and Base Layout product cards.
- **Rule**: Non-touch devices only (`@media (hover: hover)`).
- **Properties**:
  - Container: `y: 0 -> -3px`, border glow opacity `0 -> 1`.
  - Thumbnail screenshot: `scale: 1 -> 1.03` with smooth overflow clip.
- **Duration**: `DURATIONS.fast` (180ms).

```typescript
export const cardHoverMotion = {
  whileHover: { 
    y: -3, 
    transition: { duration: 0.18, ease: "easeOut" } 
  },
  whileTap: { 
    y: 0, 
    scale: 0.99, 
    transition: { duration: 0.08 } 
  }
};
```

---

### D. Button Press & Micro-Interactions
- **Target**: Primary CTA buttons ("Add To Cart", "Buy Base", "Submit").
- **Properties**: `scale: 1 -> 0.97` on tap.
- **Duration**: 80ms.
- **Rule**: Avoid large bounces or repetitive shake loops that distract users.

---

### E. Modal & Dialog Entrance / Exit
- **Target**: Base preview dialog, login prompt, confirm actions.
- **Backdrop**: `opacity: 0 -> 1` (duration: 180ms).
- **Dialog Box**: `opacity: 0 -> 1`, `scale: 0.96 -> 1` with tactical spring.

```typescript
export const modalDialogVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 350, damping: 28 }
  },
  exit: { 
    opacity: 0, 
    scale: 0.96, 
    transition: { duration: 0.15, ease: "easeIn" } 
  }
};
```

---

### F. Navigation Drawer & Mobile Menu
- **Target**: Mobile hamburger drawer navigation.
- **Properties**: `x: "-100% -> 0%"` (slide from left) with backdrop blur.
- **Duration**: 240ms with `EASINGS.easeOutCubic`.

---

### G. Accordion (FAQ Page)
- **Target**: Collapsible questions on `/faq`.
- **Properties**: `height: 0 -> "auto"`, `opacity: 0 -> 1`.
- **Duration**: 220ms. Uses Radix UI accordion CSS keyframe transition for maximum performance.

---

### H. Tabs & Filter Pills (Town Hall Selector)
- **Target**: Switching between Town Hall 15, 16, 17, 18.
- **Rule**: Use Motion's `layoutId="activeTabPill"` for hardware-accelerated shared sliding indicator beneath the selected Town Hall pill.

---

## 4. Reduced-Motion Implementation Hook

Every animated component must consume the `useReducedMotion` hook or respect the global CSS media query:

```typescript
// src/hooks/useAnimationPreference.ts
import { useReducedMotion } from "motion/react";

export function useSafeMotionVariants<T>(standardVariants: T, reducedVariants: T): T {
  const shouldReduceMotion = useReducedMotion();
  return shouldReduceMotion ? reducedVariants : standardVariants;
}
```

```css
/* Global CSS Safeguard */
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
