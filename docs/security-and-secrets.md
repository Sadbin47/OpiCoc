# OPICOC V2 Environment Safety & Secret Management Rules

Security is a primary pillar of the OPICOC V2 platform. This policy dictates mandatory security rules and secrets hygiene for all developers, automated systems, and operational procedures.

---

## 1. Absolute Secret Hygiene Rules

1. **NEVER Commit `.env` Files Containing Secrets**:
   - The `.gitignore` file strictly blocks all variations of `.env`, `.env.local`, `.env.development.local`, `.env.test.local`, and `.env.production.local`.
   - Never use `git add -f` to override `.gitignore` for configuration files.

2. **Always Maintain `.env.example`**:
   - The repository maintains `.env.example` as a template containing dummy placeholders (e.g. `DATABASE_URL="postgresql://user:password@localhost:5432/opicoc"`).
   - `.env.example` must contain every required variable name with documentation comments, but NEVER real passwords, tokens, or private keys.

3. **Never Expose Secrets in Client Code**:
   - Variables prefixed with `NEXT_PUBLIC_` are embedded into the client-side JavaScript bundle and are visible to anyone in the world inspecting network assets.
   - ONLY non-sensitive, public values (such as public analytics IDs or public site URLs) may use `NEXT_PUBLIC_`.
   - Database credentials, payment gateway secret keys, JWT secret salts, SMTP passwords, and external API secret keys must NEVER be prefixed with `NEXT_PUBLIC_`.

4. **Rotate Leaked Credentials Immediately**:
   - If any credential or secret is committed to version control, pasted into an AI prompt, or captured in a screenshot, it is considered compromised immediately.
   - The credential must be revoked in the respective provider dashboard (Stripe, database host, email provider) and a new credential provisioned immediately.

5. **Sanitize Screenshots and Terminal Outputs**:
   - Never capture screenshots of `.env` files, database connection strings, or terminal runs displaying secrets.
   - Obfuscate all tokens and credentials before sharing debug logs.

6. **Protect Archives and Backups**:
   - Never place unencrypted database dumps, customer archives, or server backups into public repositories, public S3 buckets, or public web roots (`public_html`, `public/`).

---

## 2. Standard `.gitignore` Configuration

The following rules are enforced in the root `.gitignore`:

```gitignore
# Dependencies
/node_modules
/.pnp
.pnp.js
.yarn/install-state.gz

# Environment variables & local configuration
.env
.env*.local
.env.development
.env.production
.env.test

# Next.js build output
/.next/
/out/

# Production build artifacts
/build
/dist

# Debug logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Database & local backups
*.sqlite
*.sqlite3
*.db
*.sql
*.tar.gz
*.zip

# Operating System files
.DS_Store
*.pem
Thumbs.db
```

---

## 3. Digital Delivery Link Protection Policy

- **The Clash of Clans Base Layout URL Policy**:
  - Supercell layout links (`https://link.clashofclans.com/...`) are proprietary digital products sold by OPICOC.
  - They must NEVER appear in unauthenticated API responses or public GraphQL/REST queries.
  - The backend and server actions must verify that the requesting user holds an active, paid order record before returning any layout URL.
