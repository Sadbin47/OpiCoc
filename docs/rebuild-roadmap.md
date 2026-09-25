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
- **Status**: Completed
- **Delivered**:
  - `src/services/baseService.ts`: Centralized base layout service with Town Hall normalization, season validity calculations, fallback seed resiliency, and complete exclusion/sanitization of layout links to eliminate data leaks.
  - `src/services/reviewService.ts`: Customer review service with privacy sanitization (user email stripping) and fallback seed data.
  - `src/features/home/components/HeroSection.tsx`: Tactical esports hero section with responsive backdrop, value statement, dual CTAs, and trust metrics ribbon (CWL Star Denial, bases delivered, Supercell compliance, instant import).
  - `src/features/home/components/TownHallSelector.tsx`: Tactical 3D depth cards for TH15 to TH18 with custom Town Hall art (`th15.webp`–`th18.webp`), level tags, and defensive focus breakdowns.
  - `src/features/home/components/FeaturedBaseGrid.tsx`: Featured CWL base packs grid with validity countdown, prices, defensive tags, and "Add to Cart" triggers.
  - `src/features/home/components/AddToCartButton.tsx`: Client-side cart interaction component with optimistic feedback and localStorage persistence.
  - `src/features/home/components/ShowdownBanner.tsx`: Esports tournament clan pack callout banner linking to custom base commissions.
  - `src/features/home/components/VideoSection.tsx`: Lazy-loaded defense replay breakdown player replacing the 11MB eager-loading bottleneck from V1 with an optimized WebP poster (`video-poster.webp`) and click-to-play streaming.
  - `src/features/home/components/ReviewSection.tsx`: Verified testimonials grid, 5-star ratings summary, and accessible review submission modal (`Dialog`).
  - `src/features/home/components/BrandPillarsSection.tsx`: Anti-3 star defensive engineering pillars, hard-mode testing criteria, and Supercell Fair Play compliance disclaimer.
  - `src/app/page.tsx`: Server-rendered Next.js page unifying all sections with parallel data fetching.
  - `next.config.ts`: Remote image patterns configured for `iili.io`.
- **Tests**: Build compiles with 0 errors (`npm run build`), ESLint passes with 0 errors and 0 warnings (`npm run lint`), verified 0 layout link leaks in public SSR HTML, verified 0 user email exposures, HTTP 200 validated.
- **Acceptance Criteria**: 100% satisfied. All 8 legacy content blocks unified into an elegant, high-speed, server-rendered page.
- **Definition of Done**: Tested on mobile, tablet, desktop; verified against quality gates.

---

### PHASE 04: Core Public Pages & Base Layout Catalogues
- **Status**: Completed
- **Delivered**:
  - `src/components/ui/accordion.tsx`: Radix UI animated accessible accordion primitive (`@radix-ui/react-accordion`).
  - `src/features/bases/components/BaseCard.tsx`: Reusable responsive base card with badges, validity countdown, pricing, and Add-to-Cart triggers.
  - `src/features/bases/components/BaseFilterBar.tsx`: Deep-linkable search, town hall pill filter, and sorting controls.
  - `src/features/contact/components/ContactForm.tsx`: Zod-validated contact form with honeypot bot trap and optimistic feedback.
  - `src/app/all-products/page.tsx`: Server-rendered catalogue with search, Town Hall filtering, sorting, pagination, and empty state.
  - `src/app/bases/th/[th]/page.tsx`: Programmatic Town Hall landing pages for TH15-TH18 with custom graphics, metadata, and static params.
  - `src/app/bases/[id]/page.tsx`: Individual base detail permalink page with full defensive specs, sticky purchasing card, and related bases.
  - `src/app/about/page.tsx`: Company story, builder credentials, and defense philosophy (resolving legacy V1 empty about bug).
  - `src/app/faq/page.tsx`: Interactive FAQ with animated accordions and `FAQPage` JSON-LD rich snippet schema.
  - `src/app/contact-us/page.tsx`: Contact page with direct builder channels, response time guarantee, and contact form.
  - `src/app/terms-conditions/page.tsx`: Comprehensive terms of service with digital goods licensing and Supercell fair play policies.
  - `src/app/privacy-policy/page.tsx`: Transparent privacy policy disclosing minimal data retention and zero credential sharing.
  - `next.config.ts`: Added 301/308 redirects from `/FAQ's` and `/faqs` to `/faq`.
- **Tests**: Build compiles with 0 errors (`npm run build`), ESLint passes with 0 errors and 0 warnings (`npm run lint`), verified all 8 public routes return HTTP 200, verified 308 redirect on `/FAQ's`, verified 0 layout link leaks on `/bases/[id]`, verified `FAQPage` JSON-LD schema.
- **Acceptance Criteria**: 100% satisfied. All public routes operational with crawlable server-rendered HTML.
- **Definition of Done**: Core public pages verified, tested against quality gates, and committed.

---

### PHASE 05: Secure Authentication & Account Lifecycle
- **Status**: Completed
- **Delivered**:
  - `src/features/auth/schemas/authSchemas.ts`: Zod validation schemas for login, registration, OTP verification, forgot password, and password reset.
  - `src/features/auth/components/OtpInput.tsx`: Segmented 6-digit numeric input with auto-advance, backspace auto-retreat, clipboard paste parsing, and 60s resend cooldown timer.
  - `src/services/authService.ts`: Centralized authentication service with session cookie management (`opicoc_session`), login, registration, OTP verification, resend, and password recovery.
  - `src/app/(auth)/layout.tsx`: Centered auth layout shell with brand logo, return-to-home navigation, and Supercell compliance trust ribbon.
  - `src/app/(auth)/login/page.tsx`: Secure sign-in form with email/password validation, password reveal toggle, remember-me checkbox, error banners, and `?redirectTo=...` return navigation.
  - `src/app/(auth)/registration/page.tsx`: Registration form with real-time password strength checklist (length, letters, numbers), password confirmation check, and automatic handoff to OTP verification.
  - `src/app/(auth)/verify-otp/page.tsx`: 6-digit email confirmation page with embedded `OtpInput`, error handling, and account activation redirection.
  - `src/app/(auth)/reset-password/page.tsx`: 2-step password recovery flow (Request Reset Code -> Verify Code & Set New Password).
  - `src/middleware.ts`: Next.js middleware enforcing session authentication on `/profile`, `/custom-base`, `/cart/checkout`, role authorization on `/admin`, and redirecting unauthorized visitors to `/login?redirectTo=...`.
  - `src/components/layout/UserNavButton.tsx`: Dynamic header navigation component displaying "Sign In" or authenticated user's name using `useSyncExternalStore`.
- **Tests**: Build compiles with 0 errors (`npm run build`), ESLint passes with 0 errors and 0 warnings (`npm run lint`), verified all 4 auth routes return HTTP 200, verified unauthorized `/profile` and `/custom-base` redirect via HTTP 307 to `/login?redirectTo=...`, verified authenticated session cookie bypasses redirect.
- **Acceptance Criteria**: 100% satisfied. Complete secure auth lifecycle with rate-limited OTP and zero client-exposed credentials.
- **Definition of Done**: Auth flows tested end-to-end; passes security and quality gate checks.

---

### PHASE 06: User Dashboard, Custom Base Orders & Cart Flow
- **Status**: Completed
- **Delivered**:
  - `src/types/index.ts`: Added TypeScript interfaces for `PurchasedBase`, `CustomRequestStatus`, and `CustomBaseRequest`.
  - `src/features/cart/context/CartContext.tsx`: Full cart provider with lazy `useState` initializers, item addition/removal, total computation, and `localStorage` sync with multi-tab storage event listeners.
  - `src/components/layout/HeaderCartButton.tsx`: Dynamic cart badge component reading live `totalItems` from context.
  - `src/components/layout/Header.tsx`: Integrated `HeaderCartButton` into main navigation alongside `UserNavButton`.
  - `src/app/layout.tsx`: Wrapped application tree in `<CartProvider>`.
  - `src/app/cart/page.tsx`: Full cart experience with line items, TH badges, quantity controls, price totals, trust guarantees, instant checkout simulation, and empty state.
  - `src/features/profile/components/PurchasedBasesList.tsx`: Displays purchased layouts with 1-click "Copy Link" and "Open in CoC" buttons, keeping Supercell deep links private to authenticated purchasers.
  - `src/app/profile/page.tsx`: Full user dashboard with 3 tabs: "Purchased Layouts", "Custom Requests" tracker (`pending`, `in_progress`, `completed`), and "Account & Security" settings.
  - `src/app/custom-base/page.tsx`: Custom base commission page with Town Hall selection, defense objective selector, priority turnaround options, custom specifications, and reference attachment upload.
  - `src/middleware.ts`: Verified route protection redirecting unauthenticated requests for `/cart/checkout`, `/profile`, and `/custom-base` to `/login?redirectTo=...`.
- **Tests**: Build compiles cleanly (`npm run build` with 26/26 routes prerendered), ESLint passes with 0 errors and 0 warnings (`npm run lint`), verified unauthenticated `/cart` returns HTTP 200, unauthenticated `/profile` & `/custom-base` redirect via HTTP 307 to `/login?redirectTo=...`, authenticated session cookie accesses `/profile` and `/custom-base` with HTTP 200.
- **Acceptance Criteria**: 100% satisfied. Protected delivery of digital base links, responsive cart management, custom request commission engine, and account profile dashboard.
- **Definition of Done**: Cart, profile, and custom base ordering fully verified and tested.

---

### PHASE 07: Comprehensive Administrative Portal
- **Status**: Completed
- **Delivered**:
  - `src/types/index.ts`: Added TypeScript interfaces for `ContactMessage`, `NewsletterSubscriber`, `AdminUserAccount`, and `AdminMetricStats`.
  - `src/services/adminService.ts`: Centralized admin operational service providing real-time metric aggregates, base catalogue CRUD with Supercell link repeater, commission fulfillment, threaded support messaging, CSV subscriber export, and user role escalation management.
  - `src/features/admin/components/AdminSidebar.tsx`: High-productivity administration sidebar with live notification badges for unread inquiries and pending requests, current admin profile, and responsive mobile drawer.
  - `src/features/admin/components/AdminHeader.tsx`: Context-aware admin topbar with breadcrumb navigation, live system health badge, and quick storefront shortcut.
  - `src/features/admin/components/BaseForm.tsx`: Dedicated base creation/editing modal with Town Hall classification, price/quota inputs, and a Supercell deep-link repeater enforcing valid `https://link.clashofclans.com/` URLs.
  - `src/app/admin/layout.tsx`: Full-height admin dashboard shell isolating admin workspace from consumer storefront headers and footers.
  - `src/app/admin/page.tsx`: Executive command center with 6 metric stat cards, quick-action triggers, recent commission orders, unread support inquiries, and compliance checklists.
  - `src/app/admin/bases/page.tsx`: Base layouts catalogue table with Town Hall tier filters (All, TH18, TH17, TH16, TH15), real-time search, deep link indicators, and direct edit/delete controls.
  - `src/app/admin/requests/page.tsx`: Custom base commissions manager supporting status progression (`pending` -> `in_progress` -> `completed` / `rejected`), priority highlighting (Standard vs Express), builder strategy notes, and digital layout link attachment.
  - `src/app/admin/messages/page.tsx`: Customer inquiries inbox featuring split-pane conversation view, read/unread status toggles, and direct reply composer simulating outbound email notifications.
  - `src/app/admin/subscribers/page.tsx`: Newsletter opt-in registry with search filter and one-click RFC-compliant CSV list export (`opicoc-subscribers-[date].csv`).
  - `src/app/admin/users/page.tsx`: Registered user accounts table with role escalation controls (`user` <-> `admin`) and system-level protection prohibiting demotion of the last root administrator.
  - `next.config.ts`: Added permanent HTTP 308 redirect from legacy `/adminDashboard` to modern `/admin`.
  - `src/middleware.ts`: Enforces role authorization (`role === "admin"`). Unauthenticated requests redirect to `/login?redirectTo=%2Fadmin`; non-admin authenticated users redirect to `/`.
- **Tests**: Build compiles with 0 errors (`npm run build` with 32/32 routes prerendered), ESLint passes with 0 errors and 0 warnings (`npm run lint`), verified unauthenticated `/admin` returns HTTP 307 redirect to `/login?redirectTo=%2Fadmin`, non-admin user returns HTTP 307 redirect to `/`, authenticated admin cookie returns HTTP 200 on all admin routes (`/admin`, `/admin/bases`, `/admin/requests`, `/admin/messages`, `/admin/subscribers`, `/admin/users`), verified `/adminDashboard` returns HTTP 308 redirect to `/admin`.
- **Acceptance Criteria**: 100% satisfied. Complete modern administrative suite consolidating catalogue management, orders, support, marketing, and permissions into a secure dashboard.
- **Definition of Done**: Admin portal tested across resolutions with role guard verification.

---

### PHASE 08: Relational Database & Backend API Integration
- **Status**: Completed
- **Delivered**:
  - `prisma/schema.prisma`: Production Prisma relational schema matching `docs/data-model.md` with models for `User`, `TownHallTier`, `Base`, `BaseLayoutLink`, `Order`, `OrderItem`, `CustomBaseRequest`, `Review`, `ContactMessage`, and `NewsletterSubscriber`.
  - `src/db/schema.ts`: TypeScript entity models with runtime Zod validation schemas for all relational tables.
  - `src/db/client.ts`: Resilient database repository layer providing robust CRUD operations and secure layout link queries.
  - `src/services/baseService.ts`: Public base queries strictly omitting private layout URLs; added `getPurchasedBaseLayoutLinks(baseId, userId)` enforcing purchase verification.
  - `src/services/userService.ts`: User profile fetching, account modifications, and role updates.
  - `src/services/emailService.ts`: Pluggable transactional email service supporting Resend, SendGrid, Postmark, and safe local console fallback for OTPs, password recovery, order receipts, and commission status updates.
  - `scripts/migrate-legacy-data.ts`: Automated migration and data sanitization engine:
    - Repaired corrupted Town Hall records (`"u"` -> parsed to correct TH tier via title/desc analysis).
    - Normalized comma-separated Town Hall strings into structured `TownHallTier` records.
    - Decoupled sensitive Clash layout links into protected `base_layout_links` records.
    - Deduplicated newsletter subscriber emails and normalized account casing.
  - `src/app/api/bases/[id]/links/route.ts`: Protected digital goods API route returning 401 when unauthenticated and 403 when unpurchased.
  - `src/app/api/contact/route.ts`: Support contact inquiry route with Zod validation and transactional email dispatch.
  - `src/app/api/newsletter/subscribe/route.ts`: Newsletter subscription route with duplicate detection.
  - `src/app/api/cart/checkout/route.ts`: Order creation and digital goods fulfillment route.
- **Tests**: Build compiles with 0 errors (`npm run build` with 35/35 routes prerendered), ESLint passes with 0 errors and 0 warnings (`npm run lint`), migration script executes without data loss (`bun scripts/migrate-legacy-data.ts`), verified `/api/bases/[id]/links` returns HTTP 401 for unauthenticated requests, HTTP 403 for non-purchasers, and HTTP 200 with unlocked Supercell layout links for verified buyers; verified newsletter subscribe returns HTTP 200, contact inquiry returns HTTP 201, and checkout returns HTTP 201.
- **Acceptance Criteria**: 100% satisfied. Normalized relational data model, zero corrupted Town Hall records, and digital layout link protection.
- **Definition of Done**: Database migration script verified; all API operations pass integration benchmarks.

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
