# OPICOC V2

> **High-Performance Rebuild of the OPICOC Competitive Clash of Clans Base Layout Platform**

---

## 🛡️ Project Overview

OPICOC V2 is a ground-up reconstruction of the OPICOC platform. It replaces a legacy client-only Single Page Application with a modern, secure, and accessible Next.js App Router architecture.

- **Production Domain**: `https://www.opicoc.cc/`
- **Rebuild Codename**: OPICOC V2
- **Current Phase**: Phase 05: Secure Authentication & Account Lifecycle (Complete)

---

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router, React Server Components)
- **Language**: TypeScript 5 (Strict Mode)
- **Styling**: Tailwind CSS v4
- **UI & Primitives**: shadcn/ui (Radix UI accessible primitives)
- **Animation**: Motion for React (`motion/react`)
- **Validation**: Zod runtime schema validation
- **Icons**: Lucide React
- **Target Deployment**: Hostinger Standalone Node.js / Docker

---

## 📁 Repository Structure

```
.
├── docs/                      # Architectural specifications & audits
│   ├── functionality-map.md   # Functional specs for all 15 features
│   ├── route-map.md           # Route catalog & mobile/SEO matrix
│   ├── data-model.md          # Normalized relational schema specification
│   ├── engineering-principles.md # 22 core engineering principles
│   ├── design-system.md       # Color tokens, typography, radii & A11y
│   ├── animation-system.md    # Motion curves & reduced-motion rules
│   ├── quality-gates.md       # Pre-merge checklist & standards
│   ├── rebuild-roadmap.md     # 15-phase master implementation roadmap
│   ├── architecture-decisions.md # Architecture Decision Records (ADRs)
│   └── security-and-secrets.md # Security, secret hygiene & link protection
├── public/                    # Static assets, fonts & brand assets
│   ├── assets/                # Logos, characters, badges
│   └── fonts/                 # Clash_Regular.otf font
├── src/
│   ├── app/                   # Next.js App Router (pages & layouts)
│   ├── components/            # Composable UI components
│   │   ├── layout/            # Header, Navbar, Footer, MobileDrawer
│   │   ├── motion/            # Animation wrappers & transitions
│   │   ├── seo/               # Metadata & JSON-LD schemas
│   │   └── ui/                # shadcn/ui accessible primitives
│   ├── config/                # Site config, navigation, constants
│   ├── features/              # Domain-specific feature modules
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility functions & runtime validation
│   ├── schemas/               # Zod validation schemas
│   ├── services/              # Data fetching & domain operations
│   └── types/                 # Static TypeScript type definitions
├── .env.example               # Safe environment variable template
├── .gitignore                 # Strict secrets and artifacts exclusions
├── next.config.ts             # Next.js runtime configuration
├── package.json               # Dependency manifest
└── tsconfig.json              # TypeScript strict configuration
```

---

## 🛠️ Quick Start (Local Development)

### 1. Prerequisites
- Node.js `v20+` (tested on Node `v26.9.0`)
- npm `v10+` or bun `v1.2+`

### 2. Setup
```bash
# Clone and enter directory
cd OPI_COC_V2

# Copy environment variables
cp .env.example .env.local

# Install dependencies (already completed)
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Quality & Build Verification
```bash
# Type check & production build
npm run build

# Lint verification
npm run lint
```

---

## 📑 Rebuild Master Plan
- **Phase 01**: Discovery, Audit & Project Foundation *(Complete)*
- **Phase 02**: Design System, Theme Tokens & Global Shell *(Complete)*
- **Phase 03**: High-Performance Homepage Rebuild *(Complete)*
- **Phase 04**: Core Public Pages & Catalogues *(Complete)*
- **Phase 05**: Secure Authentication & Account Lifecycle *(Complete)*
- **Phase 06**: Dashboard, Custom Base Orders & Cart *(Complete)*
- **Phase 07**: Admin System *(Complete)*
- **Phase 08**: Relational Database & Backend API Integration *(Complete)*
- **Phase 09**: Advanced Interactions & Animation *(Complete)*
- **Phase 10**: Technical SEO & WCAG 2.1 AA Accessibility *(Complete)*
- **Phase 11**: Performance Optimization & Core Web Vitals *(Complete)*
- **Phase 12**: Security Hardening *(Complete)*
- **Phase 13**: End-to-End Testing *(Complete)*
- **Phase 14**: Hostinger Production Deployment *(Complete)*
- **Phase 15**: Observability & Day-2 Operations *(Next Phase)*

See [`docs/rebuild-roadmap.md`](docs/rebuild-roadmap.md) for full phase definitions.
