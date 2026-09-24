# OPICOC V2 Comprehensive Rebuild Roadmap

This master roadmap organizes the complete reconstruction of the OPICOC platform into 15 structured, verifiable engineering phases. Each phase defines explicit prerequisites, concrete tasks, target deliverables, test plans, and Definition of Done (DoD).

---

## Phase Overview
- **Phase 01**: Discovery, Audit & Project Foundation *(Complete)*
- **Phase 02**: Design System, Theme Tokens & Global Shell *(Complete)*
- **Phase 03**: High-Performance Homepage Rebuild *(Next Phase)*
- **Phase 04**: Core Public Pages & Base Layout Catalogues
- **Phase 05**: Secure Authentication & Account Lifecycle
- **Phase 06**: User Dashboard, Custom Base Orders & Cart Flow
- **Phase 07**: Comprehensive Administrative Portal
- **Phase 08**: Relational Database & Backend API Integration
- **Phase 09**: Advanced Micro-Interactions & Animation Refinements
- **Phase 10**: Technical SEO & WCAG 2.1 AA Accessibility Hardening
- **Phase 11**: Performance Optimization & Core Web Vitals
- **Phase 12**: Security Hardening & Penetration Defense
- **Phase 13**: End-to-End & Integration Testing Suite
- **Phase 14**: Hostinger Production Deployment & Release
- **Phase 15**: Observability, Monitoring & Day-2 Operations

---

### PHASE 01: Discovery, Audit & Project Foundation
- **Objective**: Deconstruct existing legacy production system, audit information architecture, reverse-engineer API endpoints and database schema, establish engineering principles, and initialize the Next.js App Router project skeleton with TypeScript, Tailwind CSS, and shadcn/ui.
- **Prerequisites**: Access to workspace files, live site `https://www.opicoc.cc/`, and Hostinger backup archive.
- **Implementation Tasks**:
  1. Inspect live SPA bundle, network responses, and Hostinger archive.
  2. Perform full 7-dimension audit (IA, UI/UX, Functionality, Performance, SEO, A11y, Security).
  3. Create complete architecture documentation suite in `docs/`.
  4. Scaffold Next.js App Router project with TypeScript, ESLint, Tailwind CSS, and path aliases.
  5. Setup environment configuration safety rules (`.env.example`, `.gitignore`).
  6. Perform initial Git commit.
- **Files/Modules Expected**:
  - `docs/functionality-map.md`, `docs/route-map.md`, `docs/data-model.md`, `docs/engineering-principles.md`, `docs/design-system.md`, `docs/animation-system.md`, `docs/quality-gates.md`, `docs/rebuild-roadmap.md`, `docs/architecture-decisions.md`, `docs/security-and-secrets.md`.
  - Next.js root skeleton: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `src/app/layout.tsx`, `src/app/page.tsx`.
- **Tests**: `npm run build` succeeds, `npm run lint` passes, dev server starts on port 3000.
- **Acceptance Criteria**: Factual documentation completed, no secrets exposed, working runnable project skeleton.
- **Definition of Done**: Project builds cleanly without errors; git repository initialized with foundation commit; Phase 01 engineering report delivered.

---

### PHASE 02: Design System, Theme Tokens & Global Shell (Completed)
- **Objective**: Implement the unified design system tokens in Tailwind CSS, configure local Clash font and Geist Sans typography, and construct the accessible global header, mobile drawer navigation, footer, design system preview, and 404 page.
- **Prerequisites**: Phase 01 completed.
- **Implementation Tasks Delivered**:
  1. Configured CSS variables and Tailwind theme tokens (`background`, `card`, `primary`, `foreground-muted`, `accent`, `border`, `ring`, etc.) in `src/app/globals.css`.
  2. Implemented font loader for local `Clash` OTF and `Geist Sans` variable font with `font-display: swap`.
  3. Created `SiteShell`, `Container`, `Section`, `SkipToContent`, `Header`, `DesktopNav`, and `MobileNav` (Sheet drawer).
  4. Created full suite of customized accessible UI primitives (`Button`, `Badge`, `Input`, `Textarea`, `Label`, `FormField`, `Card`, `Separator`, `Dialog`, `Sheet`, `DropdownMenu`, `Tabs`, `Alert`, `Select`, `Skeleton`).
  5. Implemented Motion for React animation foundation (`MotionFadeIn`, `MotionStaggerContainer`, `MotionStaggerItem`, variants, and `useAnimationPreference` reduced-motion hook).
  6. Implemented comprehensive interactive design-system preview at `/design-system`.
  7. Implemented global `loading.tsx`, `error.tsx`, and `not-found.tsx`.
- **Files Delivered**:
  - `docs/visual-direction.md`.
  - `src/components/layout/SiteShell.tsx`, `src/components/layout/Container.tsx`, `src/components/layout/Section.tsx`, `src/components/layout/Header.tsx`, `src/components/layout/DesktopNav.tsx`, `src/components/layout/MobileNav.tsx`, `src/components/layout/Footer.tsx`, `src/components/layout/NewsletterForm.tsx`, `src/components/layout/SkipToContent.tsx`.
  - `src/components/ui/button.tsx`, `src/components/ui/badge.tsx`, `src/components/ui/input.tsx`, `src/components/ui/textarea.tsx`, `src/components/ui/label.tsx`, `src/components/ui/form-field.tsx`, `src/components/ui/card.tsx`, `src/components/ui/separator.tsx`, `src/components/ui/dialog.tsx`, `src/components/ui/sheet.tsx`, `src/components/ui/dropdown-menu.tsx`, `src/components/ui/tabs.tsx`, `src/components/ui/alert.tsx`, `src/components/ui/select.tsx`, `src/components/ui/skeleton.tsx`, `src/components/ui/tooltip.tsx`.
  - `src/components/motion/variants.ts`, `src/components/motion/MotionFadeIn.tsx`, `src/components/motion/MotionStagger.tsx`, `src/hooks/useAnimationPreference.ts`.
  - `src/app/design-system/page.tsx`, `src/app/loading.tsx`, `src/app/error.tsx`, `src/app/not-found.tsx`.
- **Tests**: Build compiles with 0 errors, ESLint passes with 0 warnings, verified static generation across `/`, `/_not-found`, and `/design-system`.
- **Acceptance Criteria**: 100% satisfied. Interactive design preview operating; WCAG AA contrast enforced; responsive mobile navigation operational.
- **Definition of Done**: Shell and UI primitives tested and committed.

---

### PHASE 03: High-Performance Homepage Rebuild
- **Objective**: Rebuild the OPICOC homepage (`/`) using Server-Side Rendering (RSC) to deliver high visual impact, sub-second First Contentful Paint, and zero layout shift.
- **Prerequisites**: Phase 02 completed.
- **Implementation Tasks**:
  1. Build Hero section with optimized visual banner, value statement, and primary CTA.
  2. Build Featured Bases carousel / grid with responsive cards and countdown timer.
  3. Build "Choose Base" Town Hall tier cards (TH15–TH18) with subtle 3D hover effects.
  4. Build Video Showcase section with lazy-loaded video player and fallback poster.
  5. Build Social Proof / Testimonials section with customer reviews and star ratings.
  6. Eliminate redundant duplicate data fetching of legacy V1.
- **Files/Modules Expected**:
  - `src/app/page.tsx`.
  - `src/features/home/components/HeroSection.tsx`, `src/features/home/components/TownHallSelector.tsx`, `src/features/home/components/FeaturedBaseGrid.tsx`, `src/features/home/components/VideoSection.tsx`, `src/features/home/components/ReviewSection.tsx`.
- **Tests**: Lighthouse score > 90 on Desktop; LCP < 2.0s; CLS < 0.05.
- **Acceptance Criteria**: All 8 legacy content blocks unified into an elegant, high-speed, server-rendered page.
- **Definition of Done**: Tested on mobile, tablet, desktop; passes quality gates.

---

### PHASE 04: Core Public Pages & Base Layout Catalogues
- **Objective**: Deliver all public-facing catalogue routes (`/all-products`, `/bases/th/:th`, `/bases/:id`) and informational content pages (`/about`, `/faq`, `/contact-us`, `/terms-conditions`, `/privacy-policy`).
- **Prerequisites**: Phase 03 completed.
- **Implementation Tasks**:
  1. Implement Base Catalogue page (`/all-products`) with server-driven search, filtering, and pagination.
  2. Implement Town Hall specific catalogue (`/bases/th/[th]`).
  3. Implement individual base detail page (`/bases/[id]`) with OpenGraph cards and defensive focus badges.
  4. Build About page with company story and builder credentials.
  5. Build FAQ page with accessible animated accordions and FAQPage JSON-LD schema.
  6. Build Contact Us form with validation and honeypot spam protection.
  7. Build Legal pages (`/terms-conditions`, `/privacy-policy`).
- **Files/Modules Expected**:
  - `src/app/all-products/page.tsx`, `src/app/bases/th/[th]/page.tsx`, `src/app/bases/[id]/page.tsx`.
  - `src/app/about/page.tsx`, `src/app/faq/page.tsx`, `src/app/contact-us/page.tsx`.
  - `src/features/bases/components/BaseCard.tsx`, `src/features/bases/components/BaseFilterBar.tsx`.
- **Tests**: Search, filter, and pagination work via URL search params; 301 redirect from `/FAQ's` to `/faq`; forms validate with Zod.
- **Acceptance Criteria**: All public routes operational with crawlable server-rendered HTML.
- **Definition of Done**: Core public pages verified and reviewed against quality gates.

---

### PHASE 05: Secure Authentication & Account Lifecycle
- **Objective**: Implement robust authentication with secure session management, email verification via 6-digit OTP, password reset, and role-based route protection.
- **Prerequisites**: Phase 04 completed.
- **Implementation Tasks**:
  1. Build Auth layout and forms (`/login`, `/registration`, `/verify-otp`, `/reset-password`).
  2. Implement Zod validation schemas for registration, login, and password changes.
  3. Implement segmented 6-digit OTP input component with numeric auto-focus and resend timer.
  4. Configure secure HTTP-only cookie session handling.
  5. Build Next.js middleware for route protection (redirecting unauthorized users to `/login?redirectTo=...` instead of 404).
- **Files/Modules Expected**:
  - `src/app/(auth)/login/page.tsx`, `src/app/(auth)/registration/page.tsx`, `src/app/(auth)/verify-otp/page.tsx`, `src/app/(auth)/reset-password/page.tsx`.
  - `src/features/auth/schemas/authSchemas.ts`, `src/features/auth/components/OtpInput.tsx`.
  - `src/middleware.ts`.
- **Tests**: User registration dispatches OTP; OTP verification activates user; login sets secure cookie; unauthorized visit to `/profile` redirects to `/login`.
- **Acceptance Criteria**: Complete secure auth lifecycle with rate-limited OTP and zero client-exposed credentials.
- **Definition of Done**: Auth flows tested end-to-end; passes security gate checks.

---

### PHASE 06: User Dashboard, Custom Base Orders & Cart Flow
- **Objective**: Build the shopping cart, checkout initiation, user profile, custom base design commission flow, and purchased layouts library.
- **Prerequisites**: Phase 05 completed.
- **Implementation Tasks**:
  1. Rebuild Cart drawer and `/cart` page with items table, price totals, and checkout button.
  2. Implement user profile page (`/profile`) with avatar upload and password update.
  3. Build "My Purchased Bases" library where verified buyers can view and copy Supercell Clash of Clans layout links.
  4. Implement `/custom-base` request submission form with requirements specification and screenshot upload.
  5. Implement "My Custom Requests" tracker showing status (Pending, In Progress, Completed).
- **Files/Modules Expected**:
  - `src/app/cart/page.tsx`, `src/app/profile/page.tsx`, `src/app/custom-base/page.tsx`.
  - `src/features/cart/context/CartContext.tsx`, `src/features/profile/components/PurchasedBasesList.tsx`.
- **Tests**: Add to cart, modify quantity, remove item; profile updates persist; purchased layout links display only for authenticated owner.
- **Acceptance Criteria**: Seamless shopping experience from cart to profile base library.
- **Definition of Done**: Cart and profile features fully responsive and functional.

---

### PHASE 07: Comprehensive Administrative Portal
- **Objective**: Construct a modern, accessible admin command center (`/admin`) for product catalogue management, order review, custom requests, contact messages, and subscriber lists.
- **Prerequisites**: Phase 06 completed.
- **Implementation Tasks**:
  1. Build Admin Layout with sidebar navigation, metric cards, and unread notification badges.
  2. Implement Base Management: data table, search, filters, "+ Add New Base" form, and edit modal with link repeater.
  3. Implement Custom Requests manager with status transition dropdowns.
  4. Implement Contact Messages inbox with mark-as-read and reply composer.
  5. Implement Newsletter subscriber viewer with CSV export.
  6. Implement User accounts table with role escalation controls.
- **Files/Modules Expected**:
  - `src/app/admin/layout.tsx`, `src/app/admin/page.tsx`, `src/app/admin/bases/page.tsx`, `src/app/admin/requests/page.tsx`, `src/app/admin/messages/page.tsx`, `src/app/admin/subscribers/page.tsx`, `src/app/admin/users/page.tsx`.
  - `src/features/admin/components/AdminSidebar.tsx`, `src/features/admin/components/BaseForm.tsx`.
- **Tests**: Admin routes reject non-admin users with 403 Forbidden; base creation and editing correctly validate Supercell layout URLs.
- **Acceptance Criteria**: All legacy admin functions consolidated into a unified, secure dashboard.
- **Definition of Done**: Admin portal tested across resolutions with role guard verification.

---

### PHASE 08: Relational Database & Backend API Integration
- **Objective**: Establish the production database connection (PostgreSQL/MySQL), configure ORM (Prisma or Drizzle), migrate data from legacy MongoDB, and implement protected Next.js Server Actions and Route Handlers.
- **Prerequisites**: Phase 07 completed; target database credentials provisioned.
- **Implementation Tasks**:
  1. Setup Prisma or Drizzle schema matching `docs/data-model.md`.
  2. Write automated data sanitization and migration script to transfer legacy bases, users, reviews, and subscribers from MongoDB to the relational schema.
  3. Decouple sensitive Clash layout links into protected `base_layout_links` records.
  4. Implement Server Actions for all CRUD mutations.
  5. Setup transactional email service (Resend / SendGrid / Postmark).
- **Files/Modules Expected**:
  - `prisma/schema.prisma` or `src/db/schema.ts`.
  - `src/services/baseService.ts`, `src/services/userService.ts`, `src/services/emailService.ts`.
  - `scripts/migrate-legacy-data.ts`.
- **Tests**: Migration script migrates records without data loss; sensitive layout links return 401 when queried without purchase session.
- **Acceptance Criteria**: Clean relational database operating with zero corrupted Town Hall records and secure digital goods delivery.
- **Definition of Done**: Database migrations tested; all API operations pass integration benchmarks.

---

### PHASE 09: Advanced Micro-Interactions & Animation Refinements
- **Objective**: Integrate Motion for React (`motion/react`) for refined tactile interactions, card hover depth, layout transitions, and page entrances while strictly respecting reduced-motion preferences.
- **Prerequisites**: Phase 08 completed.
- **Implementation Tasks**:
  1. Apply shared-layout transitions (`layoutId`) for Town Hall filter tabs.
  2. Implement smooth staggered entrance reveals for base catalogue cards.
  3. Add tactile spring animations to primary buttons and dialogs.
  4. Implement `prefers-reduced-motion` global bypass hook.
- **Files/Modules Expected**:
  - `src/components/motion/MotionContainer.tsx`, `src/components/motion/PageTransition.tsx`.
  - `src/hooks/useAnimationPreference.ts`.
- **Tests**: Animations run at solid 60fps; toggling OS reduced motion immediately disables non-essential animations.
- **Acceptance Criteria**: Fluid, high-end feel matching competitive gaming aesthetics without performance lag.
- **Definition of Done**: Frame rate profiled and verified on low-end mobile devices.

---

### PHASE 10: Technical SEO & WCAG 2.1 AA Accessibility Hardening
- **Objective**: Maximize organic search crawlability, implement JSON-LD structured data, automate sitemap and robots.txt generation, and verify complete WCAG 2.1 AA accessibility.
- **Prerequisites**: Phase 09 completed.
- **Implementation Tasks**:
  1. Generate dynamic `sitemap.xml` and `robots.txt` using Next.js Route Handlers.
  2. Add JSON-LD schemas: Product schema on `/bases/[id]`, FAQPage on `/faq`, Organization on `/`.
  3. Verify color contrast across all UI components (> 4.5:1).
  4. Conduct full keyboard navigation audit and verify screen reader announcements.
- **Files/Modules Expected**:
  - `src/app/sitemap.ts`, `src/app/robots.ts`.
  - `src/components/seo/JsonLd.tsx`.
- **Tests**: Google Rich Results Test passes with 0 errors; axe-core accessibility audit reports 0 violations; keyboard-only navigation passes.
- **Acceptance Criteria**: 100% SEO and Accessibility score in automated audits.
- **Definition of Done**: SEO and A11y quality gates green.

---

### PHASE 11: Performance Optimization & Core Web Vitals
- **Objective**: Tune bundle splits, optimize asset caching, configure edge caching headers, and ensure top-tier Core Web Vitals across mobile and desktop.
- **Prerequisites**: Phase 10 completed.
- **Implementation Tasks**:
  1. Run `@next/bundle-analyzer` to eliminate oversized client packages.
  2. Convert static hero and brand images to modern AVIF/WebP formats with explicit aspect ratios.
  3. Configure optimal `Cache-Control` headers for static and dynamic assets.
  4. Implement streaming with React Suspense for asynchronous widgets.
- **Files/Modules Expected**:
  - `next.config.ts` (image optimizations, compression, bundle analyzer).
- **Tests**: Lighthouse Performance score > 95; LCP < 2.0s; INP < 150ms; CLS < 0.05.
- **Acceptance Criteria**: Flawless Core Web Vitals on mobile 4G throttling.
- **Definition of Done**: Performance metrics documented and validated.

---

### PHASE 12: Security Hardening & Penetration Defense
- **Objective**: Implement defense-in-depth security, strict Content Security Policy (CSP), rate limiting, CSRF tokens, and automated vulnerability scanning.
- **Prerequisites**: Phase 11 completed.
- **Implementation Tasks**:
  1. Configure strict HTTP security headers (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
  2. Add rate limiting to auth and contact endpoints using Upstash Redis or memory store.
  3. Validate and sanitize all user-supplied inputs using Zod.
  4. Conduct dependency audit (`npm audit`).
- **Files/Modules Expected**:
  - `src/middleware.ts` (security headers, rate limiting).
  - `src/lib/rateLimit.ts`.
- **Tests**: OWASP ZAP or equivalent scan detects 0 high/medium vulnerabilities; automated rate limiter blocks brute force attempts after 5 tries.
- **Acceptance Criteria**: Platform hardened against XSS, CSRF, brute force, and injection attacks.
- **Definition of Done**: Security sign-off against `docs/security-and-secrets.md`.

---

### PHASE 13: End-to-End & Integration Testing Suite
- **Objective**: Implement automated testing suite covering unit logic, integration tests for API endpoints, and end-to-end (E2E) user journeys.
- **Prerequisites**: Phase 12 completed.
- **Implementation Tasks**:
  1. Setup Vitest / Jest for unit and component testing.
  2. Setup Playwright for end-to-end browser testing.
  3. Write E2E test cases: User Registration -> OTP -> Login -> Browse Bases -> Add to Cart -> Request Custom Base.
  4. Write Admin E2E test cases: Admin Login -> Create Base -> Verify Link Protection.
- **Files/Modules Expected**:
  - `vitest.config.ts`, `playwright.config.ts`.
  - `tests/e2e/auth.spec.ts`, `tests/e2e/catalog.spec.ts`, `tests/e2e/admin.spec.ts`.
- **Tests**: 100% of automated tests pass in CI/CD pipeline.
- **Acceptance Criteria**: All critical user journeys protected against regression bugs.
- **Definition of Done**: CI pipeline configured and passing.

---

### PHASE 14: Hostinger Production Deployment & Release
- **Objective**: Configure and deploy the optimized OPICOC V2 production build to the Hostinger environment with zero downtime and DNS cutover.
- **Prerequisites**: Phase 13 completed; Hostinger hosting credentials and environment verified.
- **Implementation Tasks**:
  1. Configure Next.js build output mode (`standalone` for Hostinger Node.js / Docker VPS or `export` for static).
  2. Setup PM2 / Docker process manager on Hostinger.
  3. Configure production SSL certificates and reverse proxy.
  4. Perform staging deployment test on sub-domain / preview environment.
  5. Execute final DNS cutover from legacy Netlify instance to Hostinger.
- **Files/Modules Expected**:
  - `Dockerfile`, `docker-compose.yml`, `ecosystem.config.js` (PM2 config).
  - Hostinger deployment runbook in `docs/deployment-hostinger.md`.
- **Tests**: Live domain `https://www.opicoc.cc/` resolves to V2; SSL certificate valid; all endpoints operational.
- **Acceptance Criteria**: Live production cutover completed smoothly with zero data loss.
- **Definition of Done**: Live production verification signed off by stakeholders.

---

### PHASE 15: Observability, Monitoring & Day-2 Operations
- **Objective**: Install real-time error tracking, logging, performance monitoring, and automated backup schedules.
- **Prerequisites**: Phase 14 completed.
- **Implementation Tasks**:
  1. Integrate Sentry or equivalent error monitoring for client and server errors.
  2. Setup automated daily database backups with offsite storage.
  3. Configure uptime monitors and alert notifications via Discord/Slack webhook.
  4. Establish post-launch maintenance checklist.
- **Files/Modules Expected**:
  - `sentry.client.config.ts`, `sentry.server.config.ts`.
  - `docs/operations-manual.md`.
- **Tests**: Simulated production error captured in tracking dashboard; backup recovery test succeeds.
- **Acceptance Criteria**: Full visibility into system health, performance, and user errors.
- **Definition of Done**: Handover complete, operations manual delivered.
