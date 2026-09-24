# OPICOC V2 Architecture Decision Records (ADR)

This log records the foundational architectural decisions established during the OPICOC V2 discovery and reconstruction phase.

---

### ADR 001: Adoption of Next.js App Router (React, TypeScript) Over Legacy Vite SPA
- **Decision**: Migrate from legacy client-side Vite Single Page Application (SPA) to Next.js App Router with React Server Components (RSC) and strict TypeScript.
- **Date**: 2026-09-24
- **Context**: The existing production website `https://www.opicoc.cc/` is an 842KB client-side SPA. It renders a blank `<div id="root"></div>` with zero server-side rendering, causing severe search engine indexability issues, slow mobile LCP, and duplicate client-side network request waterfalls on mount.
- **Options considered**:
  1. *Maintain Vite SPA with Vite-plugin-ssr*: Keeps client build simple, but lacks unified server actions, built-in image optimization, and enterprise file-based routing.
  2. *Remix / React Router v7*: High-quality web standards approach, but smaller ecosystem for pre-built accessible components.
  3. *Next.js App Router (Chosen)*: Industry standard for hybrid server-rendered e-commerce and marketing platforms with first-class image optimization, font handling, metadata APIs, and React Server Components.
- **Chosen approach**: Next.js App Router with TypeScript.
- **Reason**: Server components allow base catalogues and marketing pages to be pre-rendered to HTML with sub-second FCP, zero initial JS for static content, and automated OpenGraph/meta tag generation for social sharing.
- **Trade-offs**: Slightly higher build complexity and requires a Node.js runtime environment compared to plain static files.
- **Consequences**: Fast page loads, solved SEO, strict type safety across client and server.

---

### ADR 002: UI Component Architecture with Tailwind CSS and shadcn/ui
- **Decision**: Replace legacy Material UI (MUI) and DaisyUI classes with Tailwind CSS and accessible shadcn/ui primitives (Radix UI).
- **Date**: 2026-09-24
- **Context**: The legacy site bundled both Material UI (`@mui/material`) and DaisyUI utility classes. This caused bundle bloat (duplicate styling frameworks), inconsistent border radii, poor color contrast (white on yellow: 1.62:1), and inaccessible checkbox-hack modals.
- **Options considered**:
  1. *Keep DaisyUI + Material UI*: Retains existing class names, but perpetuates bloated bundles and poor accessibility.
  2. *Chakra UI / Mantine*: Comprehensive runtime CSS-in-JS or emotion-based libraries; poor performance with React Server Components.
  3. *Tailwind CSS + shadcn/ui (Chosen)*: Zero-runtime CSS, fully accessible Radix UI primitives, copy-and-own component model, zero bundle tax on unused styles.
- **Chosen approach**: Tailwind CSS + shadcn/ui with customized gaming/esports theme tokens.
- **Reason**: Allows full ownership of component source code, ensures WCAG AA compliance (proper focus trapping, keyboard navigation, aria attributes), and optimizes CSS down to minimal production size.
- **Trade-offs**: Requires creating and maintaining components directly in the codebase (`src/components/ui/`) rather than importing from a closed third-party npm package.
- **Consequences**: Elimination of 100KB+ runtime UI library overhead, consistent aesthetic, accessible dialogues.

---

### ADR 003: Animation Architecture with Motion for React (`motion/react`)
- **Decision**: Standardize all animations and micro-interactions on Motion for React (`motion/react`), enforcing transform/opacity constraints and global `prefers-reduced-motion` compliance.
- **Date**: 2026-09-24
- **Context**: Legacy site had uncoordinated transitions: an unoptimized slick slider, ad-hoc keyframe animations, arbitrary bounce loops, and zero respect for accessibility motion settings.
- **Options considered**:
  1. *Plain CSS Transitions*: Lightweight, but cumbersome for complex enter/exit presence and shared-layout tab switching.
  2. *GSAP*: Powerful for complex timeline animations, but heavy bundle weight and proprietary licensing considerations.
  3. *Motion for React (`motion/react`) (Chosen)*: Native React declarative ergonomics, robust gesture support, hardware-accelerated transforms, and built-in reduced motion hooks.
- **Chosen approach**: Motion for React with centralized curve tokens in `docs/animation-system.md`.
- **Reason**: Enables smooth Town Hall filter switching (`layoutId`), staggered catalogue reveals, and modal spring animations while strictly honoring user vestibular preferences.
- **Trade-offs**: Requires client components for animated wrappers.
- **Consequences**: Silky 60fps animations on mobile without layout thrashing.

---

### ADR 004: Decoupling Sensitive Digital Delivery Links (Supercell Layout URLs)
- **Decision**: Isolate Clash of Clans layout links into a dedicated, authenticated database entity, completely removing them from public catalogue responses.
- **Date**: 2026-09-24
- **Context**: In legacy V1, the public `/admin/get-bases` endpoint sends the entire product entity including `links` (the private Supercell layout URLs) in plain JSON to any unauthenticated client visiting `/all-products`. Visitors could acquire paid bases for free by inspecting browser network responses.
- **Options considered**:
  1. *Client-side link hiding*: Masking the link in the UI (ineffective, as network payload still exposes the URL).
  2. *Server-Side Link Protection (Chosen)*: Remove the `links` field from all public queries; store layout URLs in an isolated table accessible only via verified order authorization.
- **Chosen approach**: Server-Side Link Protection with verified order ownership.
- **Reason**: Eliminates the critical revenue-leaking security vulnerability. Digital goods are delivered only after payment confirmation.
- **Trade-offs**: Requires authenticated user session and order database tracking for customers to access their purchased layouts.
- **Consequences**: Business revenue protected, customer purchases permanently available in their personal dashboard.

---

### ADR 005: Form Validation with React Hook Form and Zod
- **Decision**: Standardize all client and server form inputs on React Hook Form paired with Zod validation schemas.
- **Date**: 2026-09-24
- **Context**: Legacy V1 used an inconsistent mix of uncontrolled inputs, manual `useState` objects (`rz` contact form), and partial React Hook Form with inconsistent payload casing (`FirstName` vs `email`).
- **Options considered**:
  1. *Native HTML5 validation*: Minimal JS, but lacks rich error feedback, complex multi-field cross-validation (e.g. password confirm), and type inference.
  2. *Formik + Yup*: Older standard, heavier bundle, less type-safe than Zod.
  3. *React Hook Form + Zod (Chosen)*: Minimal re-renders, tiny bundle size, automatic TypeScript type inference from runtime schemas.
- **Chosen approach**: React Hook Form with `@hookform/resolvers/zod`.
- **Reason**: Single source of truth for validation rules shared between frontend forms and backend server actions.
- **Trade-offs**: Requires defining Zod schemas for all forms.
- **Consequences**: Predictable error messages, zero invalid payloads reaching API boundaries.

---

### ADR 006: Target Deployment Strategy for Hostinger
- **Decision**: Configure Next.js with `output: 'standalone'` support for containerized / Node.js execution on Hostinger, with an export fallback strategy if static hosting is selected.
- **Date**: 2026-09-24
- **Context**: The client currently has an active Hostinger hosting account (`u542886899` domain `opicoc.cc`) currently parked on a default PHP placeholder, while the active SPA is hosted on Netlify. Hostinger supports Node.js applications (via Node.js selector / Cloud / VPS) and static files in `public_html`.
- **Options considered**:
  1. *Hostinger Static Export (`output: 'export'`)`: Generates static HTML into `public_html`. Works on any shared hosting, but prevents Next.js server actions, dynamic server rendering, and server-side link protection without an external API.
  2. *Hostinger Node.js / VPS Standalone (Chosen)*: Leverages Next.js `output: 'standalone'` with PM2 or Docker. Supports full server capabilities, server-side data caching, dynamic OpenGraph generation, and secure server actions.
- **Chosen approach**: Architect for Next.js `output: 'standalone'` with Docker/PM2 readiness.
- **Reason**: Preserves all security protections, server-side SEO generation, and fast edge revalidation.
- **Trade-offs**: Requires Hostinger environment supporting Node.js or VPS.
- **Consequences**: Maximum architectural flexibility, enterprise-grade deployment compatibility.

---

### ADR 007: Accessible Radix UI Primitives and Class-Variance-Authority (CVA)
- **Decision**: Build UI primitives on top of unstyled Radix UI primitives (`@radix-ui/react-*`) and `class-variance-authority` (CVA) rather than heavy opinionated UI kits or raw unmanaged HTML.
- **Date**: 2026-09-24
- **Context**: The legacy platform used Material UI (MUI) alongside DaisyUI and CSS checkbox hacks for modal dialogs. Modals lacked keyboard focus trapping, `aria-modal`, or Escape key listeners. Color contrast in buttons and headers was as low as 1.62:1.
- **Options considered**:
  1. *Raw HTML5 elements*: Minimal bundle, but complex cross-browser accessibility gaps in custom dialogs, popovers, and select dropdowns.
  2. *Chakra UI / Ant Design*: Heavy bundle sizes, runtime CSS-in-JS incompatibility with React Server Components.
  3. *Radix UI Primitives + CVA (Chosen)*: Zero runtime CSS, WAI-ARIA compliant keyboard navigation, focus management, and composable type-safe variants.
- **Chosen approach**: Radix UI Primitives with custom OPICOC tactical dark tokens and CVA.
- **Reason**: Guaranteed WCAG AA compliance, full ownership of markup in `src/components/ui/`, zero bundle tax on unused features.
- **Trade-offs**: Requires maintaining the component source code locally in `src/components/ui/`.
- **Consequences**: 100% accessible dialogs, sheets, dropdowns, and tabs with zero styling conflicts.

---

### ADR 008: Server-First Global SiteShell with Leaf-Component Interactivity
- **Decision**: Keep the global `SiteShell`, `Header`, and `Footer` as React Server Components (RSC), isolating interactivity into focused leaf client components (`MobileNav`, `DesktopNav`, `NewsletterForm`).
- **Date**: 2026-09-24
- **Context**: Turning the entire layout or shell into a client component (`"use client"`) disables streaming, bloats the client JS bundle, and prevents server-side HTML pre-rendering of marketing content.
- **Options considered**:
  1. *Make entire SiteShell a client component*: Easy to manage state, but forces all layout HTML and nested content into client hydration.
  2. *Server-First SiteShell with Leaf Interactive Components (Chosen)*: Layout, Header shell, and Footer are pre-rendered server components. Client state is encapsulated in `<MobileNav />`, `<DesktopNav />`, and `<NewsletterForm />`.
- **Chosen approach**: Server-First SiteShell with leaf client boundaries.
- **Reason**: Maximizes HTML pre-rendering speed, reduces client JavaScript execution, and avoids hydration mismatches.
- **Trade-offs**: Requires separating interactive child controls from structural parent layouts.
- **Consequences**: Sub-second First Contentful Paint, cleaner component boundaries, optimal performance.
