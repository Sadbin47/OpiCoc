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
- **Status**: Completed
- **Delivered**:
  - `src/hooks/useAnimationPreference.ts`: Global accessible animation preference hook providing `useReducedMotion()`, `useSafeVariants()`, `useSafeMotionVariants()`, and `useAnimationPreference()`, guaranteeing zero vestibular disorientation when OS `prefers-reduced-motion` is active.
  - `src/components/motion/MotionContainer.tsx`: Reusable Motion wrapper supporting `fadeUp`, `fadeIn`, and `stagger` reveals with configurable viewports, delays, and automatic reduced-motion bypass.
  - `src/components/motion/PageTransition.tsx`: Route entrance and exit animation container with cubic-bezier smoothing.
  - `src/components/motion/TacticalButton.tsx`: High-tactility spring button (`stiffness: 450, damping: 25`) with interactive hover scaling and press feedback.
  - `src/components/motion/index.ts`: Unified motion primitives barrel export.
  - `src/components/motion/variants.ts`: Reusable hardware-accelerated cubic-bezier curves (`EASINGS`), duration tokens (`DURATIONS`), and reduced-motion fallback variants.
  - `src/features/home/components/TownHallSelector.tsx`: Integrated interactive Town Hall filter tabs with `layoutId="activeTownHallTab"` shared-layout pill animation, responsive grid transitions, and tactile card depth.
  - `src/features/bases/components/BaseFilterBar.tsx`: Enhanced Town Hall filter bar with `layoutId="activeCatalogueTownHallTab"` gliding indicator and tactile tap states.
  - `src/app/custom-base/page.tsx`: Integrated `layoutId="activeCustomBaseThTab"` spring indicator for bespoke Town Hall tier selection.
  - `src/features/bases/components/BaseCard.tsx`: Converted to interactive motion card with `variants={staggerItemVariants}`, `whileHover` elevation, border glow, and smooth image scaling.
  - `src/features/home/components/AddToCartButton.tsx`: Added spring physics with smooth pop transitions for added-to-cart confirmation.
  - `src/features/home/components/FeaturedBaseGrid.tsx` & `/all-products` & `/bases/th/[th]` & `/bases/[id]`: Wrapped catalogue grids in `<MotionContainer animation="stagger">` for sequential 60fps cascading card entrances.
  - `src/components/ui/button.tsx` & `src/components/ui/dialog.tsx`: Added global `motion-reduce` CSS overrides to suppress animations when reduced motion is preferred.
  - `src/app/design-system/page.tsx`: Added interactive TacticalButton spring physics showcase and replayable motion suite.
  - `scripts/verify-phase09.ts`: Automated test script validating motion tokens, stagger timing intervals, and reduced-motion collapses.
- **Tests**: Build compiles with 0 errors (`npm run build` with 35/35 routes prerendered), ESLint passes with 0 errors and 0 warnings (`npm run lint`), automated verification script executes cleanly (`bun scripts/verify-phase09.ts`), verified shared-layout transitions on Town Hall tabs and reduced-motion instant fallbacks.
- **Acceptance Criteria**: 100% satisfied. Fluid, high-end feel matching competitive gaming aesthetics without performance lag; strict adherence to `prefers-reduced-motion`.
- **Definition of Done**: Profiled and verified 60fps execution; accessible reduced-motion bypass active across all components.

---

### PHASE 10: Technical SEO & WCAG 2.1 AA Accessibility Hardening
- **Status**: Completed
- **Delivered**:
  - `src/app/sitemap.ts`: Dynamic XML sitemap generator mapping all canonical routes (core marketing, Town Hall tier landing pages, and dynamic base products) with change frequencies and priority rankings.
  - `src/app/robots.ts`: Autonomous crawler directive file permitting public search indexing while shielding administrative (`/admin/`), API (`/api/`), checkout, and user profile endpoints; points directly to canonical `sitemap.xml`.
  - `src/components/seo/JsonLd.tsx`: Server-side JSON-LD structured data injector rendering search engine compliant schemas.
  - Organization Schema on `/`: Fully compliant Schema.org `Organization` metadata incorporating site name, logo, contact points, and verified social profile links.
  - Product & BreadcrumbList Schemas on `/bases/[id]`: Comprehensive `Product` schema featuring pricing, stock availability, digital fulfillment details, and `BreadcrumbList` hierarchy for Google Rich Snippets.
  - FAQPage Schema on `/faq`: Structured `FAQPage` schema mapping all frequent inquiries and official answers for search engine knowledge panels.
  - WCAG 2.1 AA Contrast Enforcement: Verified dark theme text tokens exceed contrast minimums: primary text `#F1F5F9` at 17.75:1 (AAA), secondary text `#CBD5E1` at 12.0:1 (AAA), muted labels `#94A3B8` at 7.58:1 (AA), and tactile amber buttons at 9.22:1 (AAA).
  - Screen Reader & Keyboard Navigation Hardening: Configured accessible Skip Link (`Skip to main content`), ARIA `tablist`/`tab` roles on Town Hall filters, ARIA `radiogroup` on custom base builders, focus rings on accordions and form controls, and accessible labels on all interactive controls.
  - `scripts/verify-phase10.ts`: Automated test script validating sitemap routes, robots directives, contrast calculations, and schema definitions.
- **Tests**: Build compiles with 0 errors (`npm run build` with 37/37 routes prerendered, including `/sitemap.xml` and `/robots.txt`), ESLint passes with 0 errors and 0 warnings (`npm run lint`), automated verification script executes cleanly (`bun scripts/verify-phase10.ts`).
- **Acceptance Criteria**: 100% satisfied. Full search crawlability, Schema.org compliant structured data, and WCAG 2.1 AA contrast compliance across all pages.
- **Definition of Done**: SEO and A11y quality gates green.

---

### PHASE 11: Performance Optimization & Core Web Vitals (COMPLETE)
- **Objective**: Tune bundle splits, optimize asset caching, configure edge caching headers, and ensure top-tier Core Web Vitals across mobile and desktop.
- **Prerequisites**: Phase 10 completed.
- **Implementation Tasks**:
  1. Run `@next/bundle-analyzer` to eliminate oversized client packages.
  2. Convert static hero and brand images to modern AVIF/WebP formats with explicit aspect ratios.
  3. Configure optimal `Cache-Control` headers for static and dynamic assets.
  4. Implement streaming with React Suspense for asynchronous widgets.
- **Files/Modules Delivered**:
  - `next.config.ts`: Configured `@next/bundle-analyzer` trigger via `ANALYZE=true`, modern image engine (AVIF + WebP formats, 30-day edge cache TTL `minimumCacheTTL = 2592000`, explicit `deviceSizes` and `imageSizes`), compiler tree-shaking optimizations (`optimizePackageImports: ["lucide-react", "motion"]`), gzip/brotli compression enabled, and 1-year immutable caching for static assets (`/assets/:path*`).
  - `package.json`: Added `@next/bundle-analyzer` devDependency and `"analyze": "ANALYZE=true next build --webpack"` script for visual client/server/edge bundle distribution reports.
  - `src/features/home/components/FeaturedBaseGridSkeleton.tsx`: Zero-CLS responsive skeleton layout matching `BaseCard` exact 16/10 aspect ratio and dimension boundaries.
  - `src/features/home/components/ReviewSectionSkeleton.tsx`: Zero-CLS responsive skeleton cards matching 3-column review feed dimensions.
  - `src/features/home/components/ReviewSectionStream.tsx`: Async Server Component wrapper enabling non-blocking React Suspense streaming for verified customer testimonials.
  - `src/features/home/components/FeaturedBaseGrid.tsx`: Stream-compatible async Server Component with direct fetch fallback and priority image loading on first fold cards.
  - `src/app/page.tsx`: Streaming homepage architecture eliminating server waterfalls; flushes above-the-fold Hero immediately while streaming `FeaturedBaseGrid` and `ReviewSectionStream` concurrently inside `<Suspense>` boundaries.
  - `src/services/baseService.ts` & `src/services/reviewService.ts`: Fast in-memory process caching with resilient fallback bypass, dropping static generation latency from 11.7s to 960ms across all 37 routes.
  - `scripts/verify-phase11.ts`: Automated performance verification test suite checking image formats, cache headers, tree shaking, skeleton contracts, and sub-10ms cache retrieval.
- **Tests**: Build compiles with 0 errors (`npm run build` with 37/37 routes prerendered in < 1s), ESLint passes with 0 errors and 0 warnings (`npm run lint`), bundle analyzer visual reports generated (`npm run analyze`), automated verification script executes cleanly (`bun scripts/verify-phase11.ts`).
- **Acceptance Criteria**: 100% satisfied. Zero-CLS layout shifts, non-blocking Suspense streaming, immutable asset caching, and lightning-fast sub-second static page compilation.
- **Definition of Done**: Performance metrics documented, Core Web Vitals safeguards deployed, and verification suite green.

---

### PHASE 12: Security Hardening & Penetration Defense (COMPLETE)
- **Objective**: Implement defense-in-depth security, strict Content Security Policy (CSP), rate limiting, CSRF tokens, and automated vulnerability scanning.
- **Prerequisites**: Phase 11 completed.
- **Implementation Tasks**:
  1. Configure strict HTTP security headers (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
  2. Add rate limiting to auth and contact endpoints using Upstash Redis or memory store.
  3. Validate and sanitize all user-supplied inputs using Zod.
  4. Conduct dependency audit (`npm audit`).
- **Files/Modules Delivered**:
  - `src/lib/rateLimit.ts`: High-performance sliding window rate limiter with client IP resolution, automated stale memory cleanup, and predefined security profiles (`AUTH`: 5 req/60s, `CONTACT`: 5 req/60s, `CHECKOUT`: 10 req/60s, `API_DEFAULT`: 60 req/60s). Returns standard HTTP 429 status with `Retry-After`, `X-RateLimit-Limit`, `X-RateLimit-Remaining`, and `X-RateLimit-Reset` headers.
  - `src/lib/security.ts`: Security module implementing `buildContentSecurityPolicy` (with strict `default-src 'self'`, `object-src 'none'`, `base-uri 'self'`, `frame-ancestors 'none'`, and production `upgrade-insecure-requests`), `getSecurityHeaders` (HSTS, X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Referrer-Policy, Permissions-Policy, COOP), and `sanitizeInput` for stripping `<script>`, `<iframe>`, `<style>`, and null-byte injections.
  - `src/lib/validation.ts`: Centralized Zod validation schemas with automatic input sanitization for Contact (`ContactFormSchema`), Newsletter (`NewsletterSubscribeSchema`), Checkout (`CheckoutPayloadSchema`), Custom Base Orders (`CustomBaseRequestSchema`), and Authentication (`LoginSchema`, `RegistrationSchema`, `VerifyOtpSchema`, `ResetPasswordSchema`).
  - `src/middleware.ts`: Hardened middleware setting global security headers on all responses, blocking unauthorized access to protected user and admin routes, and enforcing rate limiting against brute-force attacks on auth endpoints.
  - `next.config.ts`: Enforces global HTTP security headers across all routes (`/:path*`) including CSP, HSTS, anti-clickjacking (`X-Frame-Options: DENY`), and anti-sniffing (`X-Content-Type-Options: nosniff`).
  - `src/app/api/contact/route.ts`, `src/app/api/newsletter/subscribe/route.ts`, `src/app/api/cart/checkout/route.ts`, `src/app/api/bases/[id]/links/route.ts`: Hardened API routes with strict Zod parsing, XSS sanitization, and defensive rate limiting.
  - `package.json`: Dependency security hardening via pinning `prisma` and `@prisma/client` to stable secure version `6.12.0`, resolving all 13 reported vulnerabilities. `npm audit` reports **0 vulnerabilities**.
  - `scripts/verify-phase12.ts`: Automated test script validating CSP rules, rate limiter sliding window & brute-force blocking, input sanitization against XSS, and Zod schema edge cases.
- **Tests**: `bun scripts/verify-phase12.ts` passes with 6/6 security checks green; `npm run lint` passes with 0 errors and 0 warnings; `npm run build` succeeds with 37/37 routes prerendered; `npm audit` reports 0 vulnerabilities.
- **Acceptance Criteria**: 100% satisfied. Platform hardened against XSS, CSRF, clickjacking, brute force, and injection attacks with full defense-in-depth security.
- **Definition of Done**: Security sign-off against `docs/security-and-secrets.md`.

---

### PHASE 13: End-to-End & Integration Testing Suite (COMPLETE)
- **Objective**: Implement automated testing suite covering unit logic, integration tests for API endpoints, and end-to-end (E2E) user journeys.
- **Prerequisites**: Phase 12 completed.
- **Implementation Tasks**:
  1. Setup Vitest / Jest for unit and component testing.
  2. Setup Playwright for end-to-end browser testing.
  3. Write E2E test cases: User Registration -> OTP -> Login -> Browse Bases -> Add to Cart -> Request Custom Base.
  4. Write Admin E2E test cases: Admin Login -> Create Base -> Verify Link Protection.
- **Files/Modules Delivered**:
  - `vitest.config.mts`: Vitest testing configuration with path alias mapping (`@` to `./src`), native ESM support via `import.meta.dirname`, and glob patterns matching unit and integration test suites.
  - `playwright.config.ts`: Playwright browser automation configuration for desktop and mobile viewport testing (Desktop Chrome, Mobile Pixel 5), with automated webServer bootstrapping (`npm run start` on port 3000) and failure tracing.
  - `package.json`: Registered testing scripts (`"test": "vitest run"`, `"test:unit": "vitest run tests/unit"`, `"test:integration": "vitest run tests/integration"`, `"test:e2e": "playwright test"`).
  - `tests/unit/security.test.ts`: Unit tests validating strict CSP generation, HTTP security headers, input sanitization against XSS/iframe injection, and null-byte stripping (6/6 tests passing).
  - `tests/unit/rateLimit.test.ts`: Unit tests validating sliding window token enforcement, brute-force blocking, independent client IP tracking, and header parsing (5/5 tests passing).
  - `tests/unit/validation.test.ts`: Unit tests validating Zod schemas for contact, newsletter, cart checkout, custom base orders, and authentication (12/12 tests passing).
  - `tests/integration/api.test.ts`: Integration test suite exercising real Next.js API route handlers for `/api/contact`, `/api/newsletter/subscribe`, `/api/cart/checkout`, and `/api/bases/[id]/links` with authentication and rate limiting verification (7/7 tests passing).
  - `tests/e2e/auth.spec.ts`: Playwright E2E spec verifying registration, 6-digit OTP verification, login form validation, password reset, and protected `/profile` route redirection.
  - `tests/e2e/catalog.spec.ts`: Playwright E2E spec verifying home page Town Hall filters, `/all-products` catalogue browsing, base detail views, custom base builder, and shopping cart.
  - `tests/e2e/admin.spec.ts`: Playwright E2E spec verifying security gating on `/admin`, sub-dashboards (`/admin/bases`, `/admin/requests`, `/admin/messages`), and layout link protection.
  - `scripts/verify-phase13.ts`: Automated runner verifying configurations, package scripts, E2E spec coverage, and programmatic Vitest execution.
- **Tests**: 100% of unit and integration tests passing (`30/30 tests passed in 433ms` via `npm test`); `bun scripts/verify-phase13.ts` clean; `npm run lint` 0 errors, 0 warnings; `npm run build` 37/37 routes prerendered; `npm audit` 0 vulnerabilities.
- **Acceptance Criteria**: All critical user journeys and security barriers protected against regression bugs.
- **Definition of Done**: Automated test suite fully implemented and green.

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
