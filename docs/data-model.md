# OPICOC V2 Data Model Map

This document reverse-engineers and audits the existing production database schema (MongoDB / Mongoose discovered via live API payloads and backend bundles), identifies data anomalies and technical debt, and specifies the normalized relational target data model for OPICOC V2.

---

## 1. Existing Legacy Data Model (MongoDB / Mongoose)

### A. Collection: `users`
- **Primary Key**: `_id` (ObjectId, hex string)
- **Fields**:
  - `FirstName`: string (PascalCase in DB, sometimes referenced as `firstName` in frontend)
  - `LastName`: string (PascalCase in DB)
  - `email`: string (unique, lowercase index recommended)
  - `password`: string (hashed password)
  - `role`: string (values: `"user"`, `"admin"`, default: `"user"`)
  - `isVerified`: boolean (email verified status)
  - `otp`: string (nullable, temporary 6-digit OTP code)
  - `otpExpiresAt`: Date / timestamp (nullable)
  - `image` / `userImage`: string (nullable, avatar URL or empty string)
  - `createdAt`: ISO 8601 Date
  - `updatedAt`: ISO 8601 Date
  - `__v`: number (Mongoose document versioning)
- **Suspicious / Flawed Fields**:
  - Inconsistent casing: `FirstName`, `LastName` vs `email`, `role`.
  - OTP fields stored directly on the user document without expiration clean-up or attempt counters.
  - Avatar URL stored under ambiguous keys (`image` vs `userImage`).

---

### B. Collection: `bases` (or `products`)
- **Primary Key**: `_id` (ObjectId)
- **Fields**:
  - `title`: string (e.g. "TH17 BEST CWL base This Season")
  - `price`: number (e.g. 46, represented as float/integer in USD)
  - `badge`: string (e.g. "1x3", "1x1" — pack layout tier/quantity)
  - `description`: string (multiline text describing anti-3-star / meta focus)
  - `townHall`: string (e.g. "Town Hall 17", "Town Hall 15", or corrupted `"u"`)
  - `productImage`: string (URL pointing to FreeImage.host CDN `https://iili.io/...`)
  - `createdBy`: string (denormalized admin name e.g. "Summer")
  - `updatedBy`: string (denormalized admin name)
  - `maxSell`: number (integer, sales cap e.g. 80, 100)
  - `seasonStartDate`: ISO 8601 Date string
  - `seasonEndDate`: ISO 8601 Date string
  - `links`: Array of subdocuments:
    - `_id`: ObjectId
    - `label`: string (e.g. "base 1")
    - `url`: string (e.g. "https://link.clashofclans.com/en?action=OpenLayout&id=...")
  - `createdAt`: ISO 8601 Date
  - `updatedAt`: ISO 8601 Date
  - `__v`: number
- **Suspicious / Flawed Fields**:
  - Corrupted data in production: Found records where `townHall` is set to `"u"`.
  - Severe Data Leak: `links` array is stored directly on the public product document and served over unauthenticated endpoints!
  - `createdBy` and `updatedBy` store a loose display name string (`"Summer"`) instead of a foreign key reference (`userId`).
  - No foreign key referencing an official `TownHall` entity.

---

### C. Collection: `townhalls` (`TownHallConfig`)
- **Primary Key**: `_id` (ObjectId)
- **Fields**:
  - `townhalls`: string (single string containing comma-separated values: `"Town Hall 15,Town Hall 16,Town Hall 17,Town Hall 18,Town Hall 19"`)
- **Severe Anti-Pattern**:
  - Anti-pattern: Storing a comma-delimited string in a single document row instead of discrete records or an array. Client has to run `k.townhalls.split(",").map(Q => Q.trim())`.

---

### D. Collection: `reviews`
- **Primary Key**: `_id` (ObjectId)
- **Fields**:
  - `review`: string (review text)
  - `reviewImage`: string (optional image URL)
  - `rating`: number (integer 1–5)
  - `userId`: string / ObjectId (foreign key referencing `users._id`)
  - `FirstName`: string (denormalized user first name)
  - `LastName`: string (denormalized user last name)
  - `email`: string (denormalized user email)
  - `userImage`: string (denormalized user avatar)
  - `createdAt`: ISO 8601 Date
  - `updatedAt`: ISO 8601 Date
  - `__v`: number
- **Suspicious / Flawed Fields**:
  - Extreme denormalization: `FirstName`, `LastName`, `email`, `userImage` are duplicated from `User`. If the user updates their profile, past reviews contain stale/orphaned names and emails.
  - No moderation flag (`isApproved`, `status`) — reviews are live immediately.
  - No reference to `baseId` (reviews are global to the site rather than per-product).

---

### E. Collection: `requests` (`CustomBaseRequest`)
- **Primary Key**: `_id` (ObjectId)
- **Fields**:
  - `request`: string (user specification for custom base design)
  - `requestImage`: string (optional reference screenshot URL)
  - `userId`: string / ObjectId (foreign key to `users._id`)
  - `FirstName`: string (denormalized)
  - `LastName`: string (denormalized)
  - `email`: string (denormalized)
  - `userImage`: string (denormalized)
  - `createdAt`: ISO 8601 Date
  - `updatedAt`: ISO 8601 Date
  - `__v`: number
- **Suspicious / Flawed Fields**:
  - Same extreme denormalization as reviews.
  - No status field (`status: "pending" | "in_progress" | "completed" | "rejected"`).
  - No quote / price field or assigned builder field.

---

### F. Collection: `contacts` (`ContactMessage`)
- **Primary Key**: `_id` (ObjectId)
- **Fields**:
  - `name`: string
  - `email`: string
  - `subject`: string
  - `message`: string
  - `read` / `isRead`: boolean
  - `createdAt`: ISO 8601 Date
  - `updatedAt`: ISO 8601 Date
- **Audit Findings**:
  - Clean schema, but lacks reply tracking in the database (replies are dispatched via email without keeping thread history).

---

### G. Collection: `newsletters` (`NewsletterSubscription`)
- **Primary Key**: `_id` (ObjectId)
- **Fields**:
  - `email`: string (unique)
  - `createdAt`: ISO 8601 Date
  - `updatedAt`: ISO 8601 Date
- **Audit Findings**:
  - Lacks `status` ("subscribed", "unsubscribed") and unsubscribe verification token.

---

### H. Collection: `abouts` (`AboutItem`)
- **Primary Key**: `_id` (ObjectId)
- **Fields**:
  - `heading`: string
  - `content`: string
  - `createdAt`: ISO 8601 Date
  - `updatedAt`: ISO 8601 Date
- **Audit Findings**:
  - Empty in production (`[]`). Flat heading + content model is insufficient for rich branding.

---

## 2. Conceptual Relationship Map: Legacy vs Target V2

### Legacy Entity Graph
```
User (standalone)
  ├── (loose denormalized name/email) ──> Review
  └── (loose denormalized name/email) ──> CustomBaseRequest

Base [contains sensitive layout links embedded in public document!]
TownHallConfig [stores CSV string in 1 row]
ContactMessage (standalone)
Newsletter (standalone)
AboutItem (standalone)

[Orders, Payments, OrderItems: MISSING]
```

### Proposed OPICOC V2 Normalized Relational Model
```
User
├── Profile (bio, clashTag, avatarUrl)
├── Accounts (OAuth / auth providers)
├── Sessions (secure HTTP-only session tokens)
├── Orders (orderNumber, status, subtotal, currency, paymentIntentId)
│    └── OrderItems (baseId, priceAtPurchase, linksDelivered)
├── CustomBaseRequests (townHall, defensiveFocus, status, assignedBuilderId)
├── Reviews (rating, comment, status, verifiedPurchase: boolean)
└── AuditLogs (adminAction, targetEntity, timestamp)

TownHallTier (level: 15, 16, 17, 18; displayName, isActive, slug)
  └── BaseLayout (title, slug, price, badge, description, townHallId, status)
       ├── BaseAsset (type: "cover" | "screenshot", cdnUrl)
       └── BaseSecretLink (label, supercellUrl, accessLevel) [RESTRICTED TO BUYERS]

ContactInquiry
  └── InquiryReplies (repliedByUserId, messageBody, sentAt)

NewsletterSubscriber (email, status, unsubscribeToken)
```

---

## 3. Detailed Target Relational Schema (PostgreSQL / SQLite via Prisma or Drizzle)

### Table: `users`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID / String | PK, default `gen_random_uuid()` | Unique user identifier |
| `first_name` | VARCHAR(100) | NOT NULL | User first name |
| `last_name` | VARCHAR(100) | NOT NULL | User last name |
| `email` | VARCHAR(255) | NOT NULL, UNIQUE, index | Normalized user email |
| `password_hash` | VARCHAR(255) | NULLABLE | Argon2id / bcrypt hash (nullable for OAuth) |
| `role` | VARCHAR(20) | NOT NULL, default `'USER'` | Enum: `'USER'`, `'BUILDER'`, `'ADMIN'` |
| `is_verified` | BOOLEAN | NOT NULL, default `FALSE` | Email verification flag |
| `avatar_url` | TEXT | NULLABLE | CDN URL for profile avatar |
| `created_at` | TIMESTAMPTZ | NOT NULL, default `NOW()` | Account creation timestamp |
| `updated_at` | TIMESTAMPTZ | NOT NULL, auto-update | Account modification timestamp |

### Table: `town_hall_tiers`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | VARCHAR(10) | PK | e.g. `'th17'`, `'th18'` |
| `level` | INTEGER | NOT NULL, UNIQUE | Numeric level (15, 16, 17, 18, 19) |
| `name` | VARCHAR(50) | NOT NULL | Display name (e.g., "Town Hall 17") |
| `badge_icon_url` | TEXT | NULLABLE | Town Hall crest / icon |
| `is_active` | BOOLEAN | NOT NULL, default `TRUE` | Whether tier is currently displayed |
| `display_order` | INTEGER | NOT NULL, default `0` | Sort order |

### Table: `bases`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PK, default `gen_random_uuid()` | Unique layout ID |
| `slug` | VARCHAR(255) | NOT NULL, UNIQUE, index | SEO URL slug |
| `title` | VARCHAR(255) | NOT NULL | Marketing title |
| `price_cents` | INTEGER | NOT NULL | Price stored as integer cents ($46.00 = 4600) |
| `badge` | VARCHAR(50) | NULLABLE | Pack layout badge (e.g. "1x3", "Pro Pack") |
| `description` | TEXT | NOT NULL | Defensive analysis, meta counters |
| `town_hall_id` | VARCHAR(10) | FK -> `town_hall_tiers.id` | Town Hall tier association |
| `cover_image_url` | TEXT | NOT NULL | High-resolution cover screenshot |
| `max_sell` | INTEGER | NOT NULL, default `100` | Sales cap for exclusive packs |
| `sales_count` | INTEGER | NOT NULL, default `0` | Current verified units sold |
| `season_start_date`| TIMESTAMPTZ | NULLABLE | Meta season start |
| `season_end_date` | TIMESTAMPTZ | NULLABLE | Meta season expiry |
| `is_active` | BOOLEAN | NOT NULL, default `TRUE` | Active in catalogue |
| `created_by_user_id`| UUID | FK -> `users.id` | Admin/builder author |
| `created_at` | TIMESTAMPTZ | NOT NULL, default `NOW()` | Timestamp |
| `updated_at` | TIMESTAMPTZ | NOT NULL, auto-update | Timestamp |

### Table: `base_layout_links` (Protected Digital Goods)
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PK | Unique link ID |
| `base_id` | UUID | FK -> `bases.id` ON DELETE CASCADE | Parent base product |
| `label` | VARCHAR(100) | NOT NULL | e.g. "CWL Anti-Air Layout 1" |
| `supercell_url` | TEXT | NOT NULL | `https://link.clashofclans.com/...` |
| `sort_order` | INTEGER | NOT NULL, default `0` | Order in pack |

> **Security Rule**: The `base_layout_links` table is strictly accessible via server-authenticated queries verified against a completed `order_items` record for the calling user. It is NEVER joined in public catalogue queries.

### Table: `orders`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PK | Order UUID |
| `order_number` | VARCHAR(50) | NOT NULL, UNIQUE, index | Human-readable e.g. `OPI-2026-0001` |
| `user_id` | UUID | FK -> `users.id` | Purchasing customer |
| `status` | VARCHAR(30) | NOT NULL | `'PENDING'`, `'PAID'`, `'FAILED'`, `'REFUNDED'` |
| `total_cents` | INTEGER | NOT NULL | Total amount charged in cents |
| `currency` | VARCHAR(3) | NOT NULL, default `'USD'` | Currency code |
| `payment_provider` | VARCHAR(50) | NOT NULL | e.g. `'STRIPE'`, `'PAYPAL'` |
| `payment_id` | VARCHAR(255) | NULLABLE | Gateway transaction ID |
| `created_at` | TIMESTAMPTZ | NOT NULL, default `NOW()` | Order date |

### Table: `order_items`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PK | Line item UUID |
| `order_id` | UUID | FK -> `orders.id` ON DELETE CASCADE | Parent order |
| `base_id` | UUID | FK -> `bases.id` | Purchased layout |
| `price_cents` | INTEGER | NOT NULL | Historical price at moment of purchase |

### Table: `reviews`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PK | Review UUID |
| `user_id` | UUID | FK -> `users.id` ON DELETE CASCADE | Review author |
| `base_id` | UUID | NULLABLE, FK -> `bases.id` | Optional specific base review |
| `rating` | SMALLINT | NOT NULL, CHECK (rating >= 1 AND rating <= 5) | Star rating 1 to 5 |
| `review_text` | TEXT | NOT NULL | Commentary |
| `review_image_url` | TEXT | NULLABLE | Screenshot proof |
| `is_verified_buyer`| BOOLEAN | NOT NULL, default `FALSE` | Auto-calculated if user bought the base |
| `is_approved` | BOOLEAN | NOT NULL, default `FALSE` | Moderation approval flag |
| `created_at` | TIMESTAMPTZ | NOT NULL, default `NOW()` | Timestamp |

### Table: `custom_base_requests`
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PK | Request UUID |
| `user_id` | UUID | FK -> `users.id` | Submitting player |
| `town_hall_level` | INTEGER | NOT NULL | Desired Town Hall |
| `defensive_focus` | VARCHAR(100) | NULLABLE | e.g. "Anti-2 Star", "Anti-Air CWL" |
| `description` | TEXT | NOT NULL | Detailed specifications |
| `reference_image_url` | TEXT | NULLABLE | Screenshot of reference base |
| `status` | VARCHAR(30) | NOT NULL, default `'PENDING'` | `'PENDING'`, `'ACCEPTED'`, `'DELIVERED'`, `'DECLINED'` |
| `created_at` | TIMESTAMPTZ | NOT NULL, default `NOW()` | Timestamp |
| `updated_at` | TIMESTAMPTZ | NOT NULL, auto-update | Timestamp |

---

## 4. Integrity and Migration Safeguards
- **Zero Production Modification**: The live database on Vercel/MongoDB must NOT be altered or migrated during Phase 01.
- **Data Cleansing Requirements Prior to Future Migration**:
  1. Fix corrupted Town Hall values (`"u"` -> determine actual Town Hall level from title/description, e.g. TH15).
  2. Parse and normalize existing town hall configs into discrete structured records.
  3. Decouple embedded layout links into isolated protected child records.
  4. Deduplicate newsletter subscriber emails.
