# OPICOC V2 Visual Direction Specification

This document defines the brand personality, visual language, component aesthetics, and design rules for OPICOC V2. It establishes a distinct, tournament-grade tactical identity built specifically for competitive Clash of Clans players, clan leaders, and esports teams.

---

## 1. Brand Personality & Identity

- **Tactical Authority**: OPICOC is the premier defensive engineering workshop for Clash of Clans. The interface reflects military precision, architectural strategy, and competitive tournament rigor.
- **Elite Craftsmanship**: Pro base builders spend days testing defensive layouts against meta attack strategies (Root Riders, Super Bowlers, Zap Lalo, Queen Charge). The design conveys this high tier of craftsmanship through structured layouts, crisp typography, and restrained accents.
- **Trust & Digital Reliability**: Unlike sketchy forum links or bloated ad-supported websites, OPICOC V2 feels like a dedicated professional software platform where customer purchases, custom orders, and layout links are delivered securely and permanently.

---

## 2. Visual Keywords
- **Tactical** (Crisp borders, strategic grid alignment, HUD-like information density)
- **Defensive** (Fortress-like surfaces, robust containers, shield motifs)
- **High-Contrast** (Obsidian dark backdrops with vivid gold/amber focal points)
- **Engineered** (Structural hierarchy, tabular data, precise metadata tags)
- **Snappy** (Zero lag, instant micro-interactions, hardware-accelerated transforms)

---

## 3. Design Principles

1. **Information Density with Breathing Room**: Competitive players want to see defensive stats, meta season dates, Town Hall levels, and badges without wading through bloated decorative whitespace. Balance information density with disciplined 8-point spatial rhythm.
2. **Color as Meaning, Not Decoration**: Color is reserved for status (CWL tier, active season countdown, verified badges, action buttons). Never spray random gradients or neon borders across content.
3. **Typography Drives the Experience**: The interplay between the bold geometric shapes of `Clash` and the clean clarity of `Geist Sans` creates an unmistakable brand signature without relying on repetitive logos.
4. **Physical Tactility**: Interactive elements (buttons, cards, filter pills) respond immediately to touch, click, and keyboard focus with hardware-accelerated micro-feedback.

---

## 4. Color Strategy

- **Root Canvas**: `#0B0D11` (Obsidian Charcoal) — Deep, low-fatigue backdrop designed for gaming displays.
- **Card Surfaces**: `#12151B` — Subtle 5% lift from background; delivers visual containment without harsh contrast.
- **Elevated Surfaces**: `#1A1E26` — Popovers, dropdown menus, modal dialogs, and active card hover states.
- **Structural Borders**: `#262B35` (Default) and `#1E232B` (Subtle dividers) — 1px precision borders replace muddy shadows.
- **Primary Brand Accent**: `#F59E0B` (Amber 500) paired with `#090A0D` dark foreground — Delivers a pristine **11.2:1 contrast ratio**, completely curing the legacy site's illegible 1.62:1 white-on-yellow bug.
- **Secondary / Tactical Accent**: `#3B82F6` (Electric Blue) — Reserved for tournament tags, Clan War League (CWL) markers, and defensive classification badges.
- **Functional Semantics**:
  - `Success`: `#10B981` (Emerald) — Verified purchase badge, active base status.
  - `Warning`: `#F59E0B` (Amber) — Season ending soon (<= 7 days).
  - `Destructive`: `#EF4444` (Crimson) — Delete action, season expired.

---

## 5. Typography Strategy

- **Display & Headings**: `Clash` (`public/fonts/Clash_Regular.otf`).
  - Hero Display: 48px – 64px, Line Height 1.1, Tracking -0.02em.
  - Section Headings (H1/H2): 28px – 40px, Line Height 1.2, Tracking -0.01em.
  - Card Titles (H3): 20px – 24px, Line Height 1.25.
- **Body & Data Typography**: `Geist Sans` (`next/font/google`).
  - Lead Paragraphs: 16px – 18px, Line Height 1.6.
  - Default Body: 14px – 15px, Line Height 1.5, Slate 300 (`#CBD5E1`).
  - Helper & Meta Text: 12px – 13px, Slate 400 (`#94A3B8`).
  - Numbers & Counters: Monospace tabular numbers (`font-mono` / `tabular-nums`) to prevent jitter in countdowns and prices.

---

## 6. Layout & Surface Strategy

- **Shell Structure**: Sticky header with subtle backdrop blur (`bg-[#0B0D11]/90 backdrop-blur-md`), centered main canvas with responsive max-width containers, and structured multi-tier footer.
- **Container Tiers**:
  - `max-w-7xl` (1280px): Catalogues, homepage grid, admin data tables.
  - `max-w-5xl` (1024px): User dashboard, shopping cart, design-system preview.
  - `max-w-3xl` (768px): Checkout, custom base request form, legal pages.
- **Surface Elevation Hierarchy**:
  ```
  Level 0: Background Canvas (#0B0D11)
    Level 1: Section Surface / Inset Well (#0E1015)
      Level 2: Card Container (#12151B + 1px #262B35 border)
        Level 3: Elevated Card / Dropdown Menu (#1A1E26)
          Level 4: Modal Dialog / Drawer (#14171D + backdrop-blur)
  ```

---

## 7. Image Strategy

- **Aspect Ratios**: 16:9 for base layout screenshots and video containers; 1:1 for builder avatars and Town Hall crests.
- **Optimization**: All images routed through Next.js `next/image` with WebP/AVIF format auto-selection, explicit width/height to eliminate CLS, and responsive `sizes` attribute.
- **Visual Treatment**: Dark subtle vignette/gradient overlay on screenshot thumbnails to guarantee overlay text (price badges, CWL tags) is 100% legible in any light condition.
- **Fallback Handling**: Graceful fallback skeleton and placeholder graphics when an image URL fails to load.

---

## 8. Icon Strategy

- **Icon Family**: `lucide-react`.
- **Stroke Weight**: Consistent 1.75px stroke width.
- **Sizing Hierarchy**:
  - Micro / Inline: 14px – 16px (`w-3.5 h-3.5` or `w-4 h-4`)
  - Standard Action / Input: 18px – 20px (`w-4.5 h-4.5` or `w-5 h-5`)
  - Feature / Section Accent: 24px – 32px (`w-6 h-6` or `w-8 h-8`)
- **Accessibility Rule**: Every icon-only button must include an `aria-label` or visually hidden screen reader text `<span className="sr-only">`.

---

## 9. Animation Strategy

- **Engine**: Motion for React (`motion/react`).
- **Timing Range**: 80ms – 280ms maximum. No lazy or delayed animations.
- **Curves**: Decelerated cubic beziers (`[0.215, 0.61, 0.355, 1]`) for snappy entrances; tactical spring (`stiffness: 350, damping: 25`) for dialogs and pills.
- **Hardware-Accelerated Only**: Transitions operate exclusively on `transform` and `opacity`.
- **Accessibility Safeguard**: Full reduced-motion bypass via `prefers-reduced-motion: reduce`.

---

## 10. Accessibility Strategy (A11y)

- **Target**: WCAG 2.1 Level AA across 100% of views.
- **Focus Rings**: High-contrast, offset 2px focus indicators (`focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0D11]`).
- **Semantic Structure**: Semantic HTML5 landmark tags (`header`, `nav`, `main`, `footer`, `section`, `article`, `aside`).
- **Touch Targets**: Minimum 44x44 CSS pixels for all interactive mobile controls.
- **Forms**: Explicit `<label>` elements linked via `htmlFor`. Error messages linked via `aria-describedby`.

---

## 11. Responsive Strategy

- **Mobile First**: All layouts designed from 320px up.
- **Breakpoints**:
  - `xs` (320px – 639px): 1-column layouts, sticky bottom actions, full-width drawers.
  - `sm` (640px – 767px): 2-column small cards, compact filters.
  - `md` (768px – 1023px): Tablet 2-column grid, collapsed header to drawer navigation.
  - `lg` (1024px – 1279px): Full desktop navigation bar, 3-column base card grid.
  - `xl` (1280px+): 4-column base grid, maximum density view.
- **Touch Adaptations**: Hover effects restricted to non-touch pointers (`@media (hover: hover)`).

---

## 12. What to Avoid (Negative Constraints)

- **NO Neon Gradient Overuse**: No massive purple/pink gradients that look like a generic crypto project.
- **NO Glassmorphism Spam**: Avoid gratuitous milky frosted glass overlays that degrade legibility and GPU performance.
- **NO Uncoordinated Animations**: No bouncing text, spinning icons, or endless auto-scrolling tickers.
- **NO Checkbox Hacks**: Never use hidden checkboxes for modals or dropdowns.
- **NO Fake Ratings**: Never render uniform hardcoded 5-star emojis on products without verified customer review counts.
- **NO Illegible Contrast**: Never render white text on yellow or amber buttons.
