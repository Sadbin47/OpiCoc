# OPICOC Architecture Map & Operational Design

This document details the architectural boundaries, execution flow, data pipelines, and component hierarchy of the OPICOC platform.

---

## 1. Application Entry Points & Lifecycle

- **Next.js Server Lifecycle**: Next.js 16 (Turbopack) App Router running in standalone mode or development server.
- **Root Layout (`src/app/layout.tsx`)**: Global HTML shell configuring typography (`Clash Display`, `Geist Sans`, `Geist Mono`), dark theme foundation (`#0B0D11`), metadata, and viewport properties.
- **Root Shell (`src/components/layout/SiteShell.tsx`)**: Wraps public and customer routes with `Header`, `Footer`, and `CartProvider`, while providing a clean, distraction-free layout for administrative routes (`/admin/*`).
- **Security & Route Guard Middleware (`src/middleware.ts`)**:
  - Intercepts all requests before route rendering.
  - Injects defense-in-depth security headers (CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy).
  - Enforces sliding-window rate limiting on sensitive API mutations.
  - Validates `opicoc_session` cookie for protected customer routes (`/profile`, `/custom-base`, `/cart/checkout`) and administrative routes (`/admin/*`).

---

## 2. Route Structure

| Route Pattern | Rendering Mode | Security Level | Purpose |
| :--- | :--- | :--- | :--- |
| `/` | SSR / Static | Public | Landing storefront, featured bases, video breakdown, hero |
| `/all-products` | SSR / Dynamic | Public | Full town hall catalog with faceted search & filtering |
| `/bases/th/[th]` | SSG (`generateStaticParams`) | Public | Static Town Hall landing pages (TH15 - TH18) |
| `/bases/[id]` | SSG / Dynamic | Public | Detailed layout breakdown with 4K imagery and tactical video |
| `/custom-base` | Client Component | Authenticated | Multi-step interactive custom layout builder & request form |
| `/cart` | Client Component | Public | Shopping cart inspection and checkout trigger |
| `/profile` | Client Component | Authenticated | Customer dashboard showing purchased layouts & order history |
| `/login`, `/registration`, `/verify-otp`, `/reset-password` | Client Components | Unauthenticated | Authentication workflow with demo quick-fills |
| `/about`, `/faq`, `/contact-us`, `/terms-conditions`, `/privacy-policy` | SSR / Static | Public | Informational, legal, and support documentation |
| `/admin/*` | SSR / Client Hybrid | Administrator (`role === "admin"`) | Inventory management, customer orders, messages, analytics |
| `/api/*` | Route Handlers | Rate Limited / Auth Guarded | Backend REST endpoints (Contact, Newsletter, Checkout, Links) |

---

## 3. Practical MVC Organization

To ensure maintainability, testing clarity, and separation of concerns within Next.js App Router:

```
src/
├── models/             # Domain entities, database models, and Zod validation schemas
├── controllers/        # HTTP request orchestration, parameter extraction, and status mapping
├── services/           # Core domain logic, external API integrations, and database operations
├── components/         # Reusable presentation views, UI primitives, and layout shells
├── app/                # Next.js App Router pages, layouts, and route handlers
├── db/                 # Database client, unified storage interface, and mock seed data
├── lib/                # Utility functions, rate limiting, security headers, observability
├── hooks/              # Custom React hooks (e.g. useAnimationPreference)
└── config/             # Site metadata, navigation configuration, and Town Hall constants
```

### Flow of Execution
```
Client / Browser Request
         │
         ▼
Next.js Middleware (`src/middleware.ts`)
  ├── Security Headers Injection
  └── Route & Role Authentication
         │
         ▼
Next.js App Router (`src/app/api/.../route.ts`)
         │
         ▼
Controllers (`src/controllers/...`)
  ├── Rate Limit Verification
  ├── Payload Extraction & Zod Schema Validation (`src/models/...`)
  └── Response Construction
         │
         ▼
Services (`src/services/...`)
  ├── Domain Rules (Pricing, Access Verification, Links Protection)
  └── External Provider Coordination (Stripe, Resend)
         │
         ▼
Database Layer (`src/db/client.ts` / Prisma)
  └── Query Execution & State Mutation
```

---

## 4. Server vs. Client Boundaries

- **Server Components (Default)**:
  - Page routes (`/`, `/all-products`, `/bases/[id]`, `/bases/th/[th]`, `/about`, `/faq`, etc.) execute on the server.
  - Directly fetch layout and pricing data from `baseService` and `reviewService` without browser JavaScript overhead.
  - Generate metadata and JSON-LD structured data for search engine optimization.
- **Client Components (`"use client"`)**:
  - Interactive widgets (`AddToCartButton`, `CartContext`, `ContactForm`, `OtpInput`, `TownHallSelector`).
  - Animated components leveraging Motion (`MotionFadeIn`, `MotionStagger`, `TacticalButton`).
  - Form validation with reactive field error presentation.
  - Admin interactive tables and inventory forms (`BaseForm`, `AdminSidebar`).

---

## 5. Authentication & Session Architecture

- **Session Token**: `opicoc_session` HTTP cookie storing serialized JSON user identity (`id`, `firstName`, `lastName`, `email`, `role`, `isVerified`, `avatarUrl`).
- **Authorization Guard**:
  - Unauthenticated access to `/profile`, `/custom-base`, or `/cart/checkout` initiates temporary redirect to `/login?redirectTo=<dest>`.
  - Non-admin access to `/admin/*` redirects to home `/`.
  - Authenticated admin access to `/login` redirects to `/admin`.
- **Offline / Local Fallback**: Built-in accounts (`admin@opicoc.cc` and `user@opicoc.cc`) permit complete offline functional testing without remote network dependency.

---

## 6. Observability & Day-2 Operations

- **Structured Logging (`src/lib/observability/logger.ts`)**: JSON formatted logs with correlation IDs (`traceId`), timing metrics, and log levels (`INFO`, `WARN`, `ERROR`, `DEBUG`).
- **Telemetry & Tracing (`src/lib/observability/tracer.ts`)**: Distributed execution tracing tracking slow database queries and external HTTP latency.
- **Healthcheck & Monitoring (`scripts/healthcheck-monitor.ts`)**: Automated ping verification validating API responses, database connectivity, and SSL certificates.
- **Disaster Recovery (`scripts/backup-db.sh` & `scripts/restore-db.sh`)**: Automated database snapshotting with gzip compression and SHA256 checksum verification.
