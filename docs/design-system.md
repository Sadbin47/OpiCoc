# OPICOC V2 Design System Foundation

This document establishes the visual language, token architecture, component guidelines, and accessibility standards for OPICOC V2. It ensures the platform feels like a cohesive, premium, high-performance competitive gaming product rather than a disparate collection of pages.

---

## 1. Design Philosophy

- **Competitive Authority**: Inspired by modern e-sports and tactical command dashboards. Deep dark surfaces (`#0D0F12`, `#14171D`), high-contrast strategic accents (`#F59E0B` Gold / Amber), and clean crisp borders.
- **Clarity Over Clutter**: Every element serves an explicit purpose. No decorative visual noise, meaningless heavy gradients, or gratuitous glassmorphism.
- **Speed & Precision**: Tactile feedback, crisp micro-interactions, responsive touch targets, and zero Cumulative Layout Shift (CLS).
- **Accessible By Design**: Contrast ratios strictly surpass WCAG 2.1 AA (4.5:1 minimum for normal text, 3.0:1 for large display headers and icons).

---

## 2. Color System & Semantic Tokens

### The Legacy Contrast Problem
In legacy V1, `#F5B400` (yellow) was paired with white text (`#FFFFFF`) in the navbar and buttons, yielding a contrast ratio of **1.62:1** (an extreme accessibility violation). V2 completely eliminates this by enforcing strict semantic background and foreground pairing tokens.

### A. Core Neutral Palette (Dark Theme Primary)
| Token Name | Hex Value | Usage |
|---|---|---|
| `background` | `#0B0D11` | Root page background |
| `card` | `#12151B` | Surface container for cards, tables, modals |
| `card-elevated` | `#1A1E26` | Hover states, elevated dropdowns, popovers |
| `border` | `#262B35` | Card outlines, dividers, structural borders |
| `border-subtle` | `#1E232B` | Subtle dividers, inactive tabs |
| `foreground` | `#F1F5F9` | Primary headings, high-priority text (Slate 100) |
| `foreground-muted`| `#94A3B8` | Secondary labels, descriptions, metadata (Slate 400) |
| `foreground-subtle`| `#64748B` | Disabled text, placeholder copy (Slate 500) |

### B. Brand & Accent Tokens
| Token Name | Hex Value | Contrast on Dark | Usage |
|---|---|---|---|
| `primary` | `#F59E0B` (Amber 500) | 9.8:1 on `#0B0D11` | Primary CTA buttons, brand badges, active icons |
| `primary-hover` | `#D97706` (Amber 600) | 7.6:1 on `#0B0D11` | Hover state for primary CTAs |
| `primary-foreground`| `#090A0D` | 11.2:1 on `#F59E0B` | Text/icons rendered inside primary buttons |
| `accent` | `#3B82F6` (Blue 500) | 5.2:1 on `#0B0D11` | Clan war league indicators, tactical tags |
| `accent-muted` | `rgba(59, 130, 246, 0.12)` | N/A | Tag backgrounds, subtle highlights |

### C. Feedback & Status Tokens
| Token Name | Hex Value | Meaning |
|---|---|---|
| `success` | `#10B981` (Emerald 500) | Verified badges, order paid, base active |
| `warning` | `#F59E0B` (Amber 500) | Season expiring soon, low stock count |
| `destructive` | `#EF4444` (Red 500) | Error alerts, delete actions, season expired |
| `info` | `#0EA5E9` (Sky 500) | Informational callouts, currency notices |

---

## 3. Typography Hierarchy

### Font Strategy
- **Display & Headings**: `Clash Display` / `Clash Regular` (self-hosted local OTF/WOFF2 font). Used for high-impact brand statements, Town Hall numbers, and section headers.
- **Interface & Body Text**: `Geist Sans` or `Inter` (variable font via `next/font`). High legibility at small sizes, tabular numbers for pricing and countdowns.
- **Code & Layout IDs**: `Geist Mono` or `JetBrains Mono` for Clash of Clans layout hash keys and order numbers.

### Type Scale
| Level | Font Family | Size | Weight | Line Height | Tracking | Usage |
|---|---|---|---|---|---|---|
| `display` | Clash | 48px – 64px | Bold (700) | 1.1 | -0.02em | Hero headline |
| `h1` | Clash | 36px – 44px | Bold (700) | 1.15 | -0.02em | Page titles |
| `h2` | Clash | 28px – 32px | SemiBold (600) | 1.25 | -0.01em | Section titles, card group headers |
| `h3` | Clash / Sans | 22px – 24px | SemiBold (600) | 1.3 | 0 | Base card titles, modal titles |
| `h4` | Sans | 18px – 20px | SemiBold (600) | 1.4 | 0 | Sub-section headers |
| `body-lg` | Sans | 16px – 18px | Regular (400) | 1.6 | 0 | Lead paragraphs, about copy |
| `body` | Sans | 14px – 15px | Regular (400) | 1.5 | 0 | Default body text, descriptions |
| `body-sm` | Sans | 12px – 13px | Regular (400) | 1.4 | +0.01em | Meta tags, helper text, badges |
| `caption` | Sans | 11px – 12px | Medium (500) | 1.3 | +0.02em | Timestamps, table headers, legal |

---

## 4. Spacing Scale

Based on an 8-point rhythm (with 4px half-steps for micro-alignment):
- `space-1`: 4px (micro gaps, badge paddings)
- `space-2`: 8px (icon-to-text gap, compact stack)
- `space-3`: 12px (form input internal vertical padding)
- `space-4`: 16px (card internal padding on mobile, standard grid gap)
- `space-6`: 24px (card padding on desktop, section sub-elements)
- `space-8`: 32px (container margins, section stack)
- `space-12`: 48px (major component separation)
- `space-16`: 64px (section vertical padding)
- `space-24`: 96px (homepage major block separation)

---

## 5. Radius Scale

Consistent border radii across the application:
- `radius-sm`: 4px (tags, small badges, inline chips)
- `radius-md`: 8px (buttons, input fields, dropdown menus)
- `radius-lg`: 12px (cards, preview containers, table wrappers)
- `radius-xl`: 16px (modals, dialogs, drawer panels)
- `radius-full`: 9999px (pill filters, avatar circles, status dots)

> **Rule**: Avoid arbitrary mixed radiuses (e.g. 24px on one card, 2px on another).

---

## 6. Elevation & Shadows

Dark mode surfaces rely primarily on 1px borders (`#262B35`) and subtle tonal shifts rather than heavy fuzzy drop shadows.
- `elevation-none`: `none`
- `elevation-card`: `0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px -1px rgba(0, 0, 0, 0.4)` + 1px border.
- `elevation-hover`: `0 8px 24px -4px rgba(0, 0, 0, 0.6), 0 4px 12px -2px rgba(0, 0, 0, 0.4)` + glowing border tint.
- `elevation-modal`: `0 20px 48px -8px rgba(0, 0, 0, 0.8)` + backdrop blur (12px).

---

## 7. Container Widths & Breakpoints

Standard Tailwind CSS breakpoints:
- `sm`: 640px (large phones, small tablets)
- `md`: 768px (tablets portrait)
- `lg`: 1024px (tablets landscape, compact laptops)
- `xl`: 1280px (standard desktops)
- `2xl`: 1536px (wide displays)

Container constraints:
- `container-narrow`: `max-w-3xl` (768px) for legal pages, checkout, single articles.
- `container-standard`: `max-w-5xl` (1024px) for profile, cart, contact.
- `container-wide`: `max-w-7xl` (1280px) for homepage, catalogues, admin tables.

---

## 8. Interactive Component States

### Buttons
- **Default**: Solid background, high-contrast readable text, subtle border.
- **Hover**: 10% brightness increase, subtle translateY(-1px) on non-touch devices.
- **Active / Press**: translateY(0), brightness decrease.
- **Focus-Visible**: 2px solid `#F59E0B` outline with 2px offset (`ring-2 ring-primary ring-offset-2 ring-offset-background`).
- **Disabled**: Opacity 0.45, cursor not-allowed, pointer-events none.

### Forms & Inputs
- **Default**: Background `#12151B`, border 1px solid `#262B35`, text `#F1F5F9`, placeholder `#64748B`.
- **Hover**: Border color transitions to `#3B4252`.
- **Focus**: Border `#F59E0B`, subtle glow `ring-1 ring-primary`.
- **Invalid**: Border `#EF4444`, error text `#F87171` rendered beneath with an alert icon.
- **Disabled**: Background `#0B0D11`, text `#475569`.

---

## 9. Iconography & Media Treatment

- **Icon Set**: `lucide-react` (clean, stroke-based 24x24 icons with 1.75px default stroke width).
- **Town Hall Crests**: Explicit Town Hall badge icons (SVG or optimized WebP with fixed aspect ratios).
- **Product Screenshots**:
  - Maintained at 16:9 or 4:3 standard aspect ratios.
  - Image wrappers use `overflow-hidden` with `next/image` to prevent layout shifts.
  - Subdued dark gradient overlay behind screenshots to ensure text overlays are legible.
- **Video Embeds**:
  - Always `playsinline`, `muted`, lazy-loaded via IntersectionObserver, with a fallback static poster frame.

---

## 10. Accessibility Rules (A11y)

1. **Strict Focus Rings**: All interactive controls must have visible `focus-visible` styling; never use `outline: none` without providing an alternative.
2. **Accessible Modals**: Use Radix UI primitive `<Dialog.Root>` with automatic focus trapping, restore focus on close, and escape key listener.
3. **Form Labels**: Every input, select, and textarea must be linked to a `<label>` via `htmlFor` or `aria-labelledby`.
4. **Touch Targets**: Minimum 44x44 CSS pixels for all interactive mobile buttons and links.
5. **Reduced Motion**: Respect `@media (prefers-reduced-motion: reduce)` globally.
