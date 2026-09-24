# OPICOC V2 Engineering Principles

These engineering principles govern all architectural choices, code contributions, refactoring, and code reviews for the OPICOC V2 platform. Every engineer contributing to this repository must align with these standards.

---

### 1. Type Safety First
- Every function, component prop, API payload, database record, and configuration object must be strictly typed using TypeScript.
- No `any` or untyped `unknown` assertions unless properly guarded with type narrowing.
- All external inputs (request bodies, query params, headers, local storage) must be validated at runtime through Zod schemas that infer the static TypeScript types automatically.

### 2. No Unnecessary Dependencies
- Do not install an npm package for something achievable with native web APIs or small utility functions.
- Every package added to `package.json` must be justified in `docs/architecture-decisions.md` with bundle weight, license, tree-shakeability, and maintenance status evaluated.
- Deprecate legacy dependencies (e.g., SweetAlert2, raw Axios when native fetch suffices, heavy unoptimized carousel libraries).

### 3. No Duplicated Business Logic
- Business logic (price calculation, discount badges, Town Hall meta filtering, permissions, formatting) must reside in centralized services or utility modules (`src/lib` or `src/features/<feature>/services`).
- Components should never reimplement domain calculations.

### 4. No Giant Components
- Components must have a single responsibility.
- A component exceeding 150–200 lines is a prime candidate for decomposition into smaller sub-components, custom hooks, or render helpers.
- Keep layout components, presentational cards, form fields, and data-fetching boundaries distinct.

### 5. No Magic Strings Scattered Across the Codebase
- All system constants, route paths, Town Hall tiers, badge types, roles, query keys, and storage keys must be declared in dedicated enums, constants, or frozen objects in `src/config/` or feature-specific constants.
- Reference routes via typed route builders rather than raw strings like `"/bases/th/18"`.

### 6. Clear Separation of UI, Business Logic, Data Access, and Configuration
- **UI (`src/components/`, `src/features/*/components`)**: Focused exclusively on layout, styling, and user interaction.
- **Business Logic (`src/features/*/services`, `src/lib/`)**: Pure TypeScript logic, validations, and domain rules.
- **Data Access (`src/services/`, server actions, route handlers)**: API fetching, query caching, database operations.
- **Configuration (`src/config/`)**: Environment settings, metadata, constants, navigation definitions.

### 7. Server-First Rendering Where Appropriate
- Maximize the use of Next.js React Server Components (RSC) for initial page loads, catalogue listings, and informational pages.
- Ship zero unnecessary client-side JavaScript to unauthenticated visitors viewing marketing, catalogue, and about pages.

### 8. Client Components Only When Interactivity Requires Them
- Mark components with `'use client'` only when they need browser events, state (`useState`, `useReducer`), hooks, browser APIs, or real-time animations.
- Push client boundaries as far down the component tree as possible (leaf client components).

### 9. Accessible by Default (A11y)
- Target WCAG 2.1 Level AA compliance across all pages.
- Interactive controls must be keyboard operable with visible, high-contrast focus indicators.
- Form inputs must have explicit `<label>` tags with matching `htmlFor`/`id`.
- Color contrast ratios must meet or exceed 4.5:1 for normal text and 3:1 for large text.
- Modal dialogues must use accessible primitives (Radix UI / shadcn/ui) with proper focus trapping, escape key dismiss, and `aria-modal="true"`.
- Support `prefers-reduced-motion` for all transitions and animations.

### 10. Responsive by Default
- Adopt a mobile-first responsive strategy.
- Every viewport (320px mobile, 768px tablet, 1024px laptop, 1440px+ desktop) must be explicitly designed and verified.
- No horizontal scrollbars on mobile viewports.

### 11. Progressive Enhancement Where Practical
- Critical public pages (catalogues, about, FAQs, terms) must render readable HTML and content even before client-side hydration completes or if client script execution fails.
- Forms should support standard form actions where applicable.

### 12. Secure by Default
- Never trust user input; validate everything on the server boundary with Zod.
- Never expose sensitive digital delivery links (e.g. Clash of Clans layout links) in public unauthenticated API endpoints.
- Store sensitive tokens and sessions in secure, HTTP-only, SameSite=Strict cookies.
- Defend against XSS, CSRF, and SSRF. Enforce strict Content Security Policy (CSP) headers.
- Never commit credentials, private keys, or `.env` files to source control.

### 13. Performance Measured, Not Guessed
- Target Core Web Vitals in the green:
  - LCP (Largest Contentful Paint) < 2.5s
  - INP (Interaction to Next Paint) < 200ms
  - CLS (Cumulative Layout Shift) < 0.1
- Optimize images using `next/image` with modern formats (AVIF/WebP), responsive `sizes`, and explicit aspect ratios.
- Avoid sequential request waterfalls; leverage parallel data fetching and streaming with React Suspense.

### 14. SEO Considered at the Architecture Level
- Use semantic HTML (`<main>`, `<nav>`, `<article>`, `<header>`, `<footer>`, `<h1>`-`<h6>`).
- Dynamic Open Graph tags, Twitter cards, meta descriptions, and canonical URLs for every route.
- Generate valid `robots.txt` and `sitemap.xml` automatically at build/request time.
- Include structured data (JSON-LD) for products, ratings, breadcrumbs, and organization.

### 15. Reusable Design System
- Built on top of Tailwind CSS and shadcn/ui primitives.
- Consistent color tokens, typography scales, spacing units, border radii, and elevation shadows.
- Avoid ad-hoc inline arbitrary Tailwind classes (e.g., `#201F31` vs semantic background tokens) across unrelated files.

### 16. Predictable Naming Conventions
- Component files: PascalCase (e.g., `BaseCard.tsx`, `TownHallFilter.tsx`).
- Utility/hook files: camelCase (e.g., `useCart.ts`, `formatCurrency.ts`).
- Route directories: kebab-case (e.g., `all-products`, `custom-base`).
- Types & interfaces: PascalCase prefixed or suffixed logically (e.g., `BaseProduct`, `UserProfile`).

### 17. Small, Composable Components
- Favor component composition over configuration prop drilling.
- Leverage slot patterns and compound components (e.g., `Card`, `CardHeader`, `CardContent`, `CardFooter`).

### 18. Good Error Handling
- Never crash the UI to a blank screen. Use Next.js `error.tsx` error boundaries at route segment levels.
- Provide actionable, user-friendly error messages with recovery options (e.g., "Try Again", "Return Home").
- Avoid leaking raw database errors or stack traces to end users.

### 19. Explicit Loading and Empty States
- Every data-dependent view must provide dedicated:
  - **Loading states**: Skeleton loaders matching the layout geometry to avoid CLS.
  - **Empty states**: Meaningful graphics, descriptive copy, and a clear call to action (e.g., "No bases found for Town Hall 16 — Explore Town Hall 17").
  - **Error states**: Distinct recovery feedback.

### 20. Good Developer Documentation
- Architectural decisions must be recorded in `docs/architecture-decisions.md`.
- Code changes must preserve documentation integrity, clear JSDoc docstrings for domain helpers, and clean README instructions.

### 21. Every Feature Should Be Testable
- Separate pure business logic from UI rendering to allow frictionless unit testing.
- UI components should be decoupled from network clients to facilitate integration testing and storybook/mock environments.

### 22. Every Important Decision Should Have a Reason
- Architecture is deliberate. No choices driven solely by fashion or trend.
- Every architectural divergence or package inclusion must be documented with context, considered options, trade-offs, and consequences.
