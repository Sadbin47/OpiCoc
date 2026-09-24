# OPICOC V2 Complete Functionality Map

This document defines the functional specification and audit mapping for all major features in the OPICOC platform, comparing existing legacy behavior against architectural recommendations for V2.

---

### Feature: Base Catalogue Browsing & Filtering
- **Purpose**: Allow players to discover, search, filter, and sort Clash of Clans base layouts across different Town Hall tiers (TH15–TH18+).
- **Actors/Roles**: Public visitor, Registered User, Administrator.
- **Entry points**: Navbar "Shop" dropdown, Drawer menu, Homepage "Choose Base" category cards, `/all-products`, `/bases/th/:th`.
- **User inputs**: Text search query, Town Hall selector dropdown, Sort criteria ("date-newest", "price-low", "price-high"), Pagination controls.
- **Validation**:
  - Search query sanitized, trimmed.
  - Town Hall param validated against allowed tiers (e.g., regex `^1[4-9]$`).
  - Sort parameter strictly matched to supported enum keys.
- **API/Server action**:
  - Legacy: `GET /admin/get-bases`, `GET /admin/get-townHall`, `GET /admin/bases?townHall=${tier}`.
  - V2: `GET /api/v2/bases?townHall=...&sort=...&page=...` or Next.js React Server Component direct data query with cached unstable_cache.
- **Database entities**: `Base` (`Product`), `TownHallConfig`.
- **External dependencies**: FreeImage.host (`iili.io`) for product images.
- **Success state**: Grid of responsive base layout cards displaying image, title, badge, price, countdown of meta pack validity, and "Add To Cart" / "See More" buttons.
- **Loading state**:
  - Legacy: Full-screen blocking spinner `Un` rendering nothing until complete.
  - V2: Skeleton cards matching exact aspect ratio and dimensions, preventing CLS.
- **Error state**: Red text error banner with "Retry" action.
- **Empty state**: "No bases match your search or filter criteria. Try browsing all bases." with quick CTA button.
- **Authorization requirements**: Public (unauthenticated).
- **Current implementation**: Single client-side React component (`Z8` / `dz`) fetching all bases in memory via unpaginated `/admin/get-bases`, running in-memory regex filters and pagination.
- **Problems**:
  - Severe Security Flaw: `/admin/get-bases` returns ALL base data including the private digital delivery URLs (`links`) containing Supercell layout links directly in the JSON response, allowing visitors to steal bases without paying.
  - Inefficient: Fetches full catalogue on client mount.
  - Corrupted Town Hall data in production (e.g. Town Hall field saved as `"u"`).
  - Town Hall suggestion list performs unneeded client-side array flatMap logic.
- **New implementation recommendation**: Server-side filtering and pagination via Next.js RSC with search params. Strip sensitive digital delivery `links` completely from all public-facing queries. Return only public projection `{ id, title, price, badge, description, townHall, productImage, seasonEndDate, validityDays }`.
- **Open questions**: What are the active Town Hall tiers to officially support (TH15, TH16, TH17, TH18, TH19)?

---

### Feature: Base Detail & Modal Preview
- **Purpose**: View comprehensive metadata, attack-strategy defensive focus (CWL, Anti-3-star, Trophy Pushing, Esports), and validity period for an individual base.
- **Actors/Roles**: Public visitor, Registered User.
- **Entry points**: "See more" trigger on base card in `/all-products` or `/bases/th/:th`.
- **User inputs**: Click "See more" or click base card.
- **Validation**: Product ID must be valid ObjectId / UUID.
- **API/Server action**:
  - Legacy: In-memory modal toggle displaying already-fetched card object.
  - V2: Dedicated route `/bases/[id]` with metadata + accessible modal preview option using Radix UI / shadcn/ui Dialog.
- **Database entities**: `Base`.
- **External dependencies**: Product image host.
- **Success state**: Dialog or page showing high-res base preview, tags (Anti-Air, Anti-Ground, Hybrid, CWL), meta pack validity, builder creator attribution, pricing, and Add-to-Cart / Checkout CTA.
- **Loading state**: Skeleton dialog with image shimmer.
- **Error state**: "Base layout not found or no longer active."
- **Empty state**: N/A.
- **Authorization requirements**: Public.
- **Current implementation**: Hidden HTML checkbox `<input type="checkbox" id="modal-${L._id}" className="modal-toggle">` that pops a DaisyUI modal.
- **Problems**:
  - No deep linking or unique shareable URL for individual bases (terrible for SEO and social sharing).
  - Uses inaccessible checkbox hack rather than native dialog or ARIA-compliant modal.
  - Hardcoded 5-star ratings displayed uniformly on every card (`⭐⭐⭐⭐⭐`).
- **New implementation recommendation**: Create dedicated `/bases/[id]` page with OpenGraph tags (title, base image preview) for viral Discord/X sharing, and an accessible modal component on catalogue pages. Replace fake star emojis with verified purchase review aggregation or remove until verified reviews exist.
- **Open questions**: Do base creators have public profile pages or bios?

---

### Feature: Shopping Cart Management
- **Purpose**: Allow users to collect multiple base layout packs, view subtotal, and prepare for checkout.
- **Actors/Roles**: Public visitor, Registered User.
- **Entry points**: Navbar cart icon badge, cart dropdown preview, `/cart`.
- **User inputs**: "Add to Cart" button on cards, "Remove" button in cart table, "Clear Cart".
- **Validation**: Disallow duplicate base IDs in cart; ensure prices are non-negative numbers.
- **API/Server action**: Client-side state synchronized to `localStorage` key `"cart"`.
- **Database entities**: Local client state (`CartItem`: `_id`, `title`, `price`, `productImage`).
- **External dependencies**: None.
- **Success state**: Cart counter badge in navbar updates with animation; cart view lists items with thumbnail, title, price, subtotal, and currency notice.
- **Loading state**: Instantaneous local state update.
- **Error state**: Toast notification "This item already is in Cart".
- **Empty state**: "Your cart is empty." with prominent "Continue Shopping" button.
- **Authorization requirements**: Public (local storage); requires authentication at checkout.
- **Current implementation**: Custom React Context `CartContext` using `useReducer` and `localStorage`.
- **Problems**:
  - Missing checkout button! The `/cart` page currently renders items and total price, but has no mechanism to purchase, checkout, or receive bases!
  - Prices in `localStorage` are untrusted client values; could be tampered with.
  - Cart lacks line-item count limits or stock checks against `maxSell`.
- **New implementation recommendation**: Maintain lightweight client cart with Zustand or React Context for local responsiveness; on checkout, send only base IDs to the server and validate current active prices and availability against the database.
- **Open questions**: What payment gateway should be integrated (Stripe, PayPal, Cryptomus, paddle)?

---

### Feature: Order Checkout & Digital Base Delivery
- **Purpose**: Securely process payment and immediately deliver Supercell Clash of Clans layout links (`link.clashofclans.com`) to the purchaser.
- **Actors/Roles**: Authenticated User.
- **Entry points**: Cart checkout CTA, Base detail "Buy Now" CTA.
- **User inputs**: Billing email, payment credentials (card, wallet), order notes.
- **Validation**: Cart must contain at least one valid base; user must be authenticated and email-verified.
- **API/Server action**:
  - Legacy: INCOMPLETE / MISSING in existing code.
  - V2: `POST /api/v2/checkout/create-session`, `POST /api/v2/webhooks/payment`, `GET /api/v2/user/orders`.
- **Database entities**: `Order`, `OrderItem`, `Base`, `User`.
- **External dependencies**: Payment provider API (e.g. Stripe / PayPal) and Webhook receiver.
- **Success state**: Redirect to order confirmation page with one-click "Open in Clash of Clans" deep links, downloadable base receipt, and automated confirmation email.
- **Loading state**: Payment processing spinner with disabled interaction.
- **Error state**: "Payment declined or failed. Please check your card details or try an alternate method."
- **Empty state**: Redirect to `/all-products` if cart is empty.
- **Authorization requirements**: Authenticated User (`user` or `admin`).
- **Current implementation**: BROKEN / INCOMPLETE in legacy codebase. No checkout endpoint exists.
- **Problems**: Existing users had no automated checkout flow; manual transactions or Discord messaging was likely required.
- **New implementation recommendation**: Implement a secure checkout session flow with Webhook verification. Store purchased base links in an encrypted user order library (`/profile/orders`) accessible anytime by the authenticated buyer.
- **Open questions**: Which payment gateway provider account is currently owned or preferred by the business?

---

### Feature: User Registration & Email OTP Verification
- **Purpose**: Onboard new users and verify email ownership through a 6-digit one-time password (OTP).
- **Actors/Roles**: Unregistered visitor.
- **Entry points**: Navbar "Login / Register", `/registration`, `/verify-otp`.
- **User inputs**: First Name, Last Name, Email, Password, OTP code.
- **Validation**:
  - First name, last name: required, min 2 chars.
  - Email: valid format, normalized to lowercase.
  - Password: min 8 chars with complexity.
  - OTP: 6 numeric digits, expires in 5 minutes.
- **API/Server action**:
  - Legacy: `POST /auth/register`, `POST /auth/verify-otp`.
  - V2: `POST /api/v2/auth/register`, `POST /api/v2/auth/verify-otp`, `POST /api/v2/auth/resend-otp`.
- **Database entities**: `User` (`isVerified`, `otp`, `otpExpiresAt`).
- **External dependencies**: Transactional email service (SMTP/Resend/SendGrid).
- **Success state**: Account verified; redirected to `/login` with success toast.
- **Loading state**: Submitting button spinner with disabled inputs.
- **Error state**: Inline field error or toast "Invalid or expired OTP code".
- **Empty state**: N/A.
- **Authorization requirements**: Public.
- **Current implementation**: React Hook Form on frontend calling `/auth/register`, which redirects to `/verify-otp?email=...` with countdown timer.
- **Problems**:
  - No rate limiting on OTP attempts (vulnerable to brute force).
  - OTP expiry timer in client component is purely cosmetic and can be desynchronized.
  - Inconsistent casing in payload (`FirstName`, `LastName` PascalCase vs `email`, `password` lowercase).
- **New implementation recommendation**: Enforce server-side rate-limiting (e.g. 5 attempts per OTP), secure timing-safe string comparison, and automatic resend throttling (60s cooldown).
- **Open questions**: What SMTP or email service provider is currently configured on the Vercel backend?

---

### Feature: User Authentication & Session Management (Login/Logout)
- **Purpose**: Authenticate registered users, grant access to profile and custom requests, and maintain session persistence.
- **Actors/Roles**: Registered User, Administrator.
- **Entry points**: `/login`, Header user menu, `/auth/logout`.
- **User inputs**: Email, Password.
- **Validation**: Email format, non-empty password.
- **API/Server action**:
  - Legacy: `POST /auth/login`, `GET /auth/is-authenticated`, `POST /auth/logout`.
  - V2: `POST /api/v2/auth/login`, `POST /api/v2/auth/logout`, `GET /api/v2/auth/session`.
- **Database entities**: `User`.
- **External dependencies**: None.
- **Success state**: Secure HTTP-only session cookie set, user state stored in auth context, redirect to `/profile` (or target protected page).
- **Loading state**: "Logging in..." button state.
- **Error state**: "Invalid email or password" toast.
- **Empty state**: N/A.
- **Authorization requirements**: Public (login), Authenticated (logout).
- **Current implementation**: Axios call with `withCredentials: true`, setting HTTP-only cookie, followed by TanStack Query refetch of `/auth/is-authenticated`.
- **Problems**:
  - Unauthenticated access to protected routes (`/profile`, `/custom-base`) redirects users to `*` (404 Page Not Found) rather than `/login?redirectTo=...`.
  - No "Remember Me" option.
  - Cross-site cookie issues between frontend domain (`www.opicoc.cc`) and backend domain (`backend-omega-one-37.vercel.app`) requiring `SameSite=None; Secure`.
- **New implementation recommendation**: Standardize session handling with unified domain or Next.js middleware, implementing seamless redirect-to-login with return URL.
- **Open questions**: Are JWT tokens stored in cookies or memory?

---

### Feature: Password Reset Flow
- **Purpose**: Enable users who forgot their password to regain account access via email verification.
- **Actors/Roles**: Registered User.
- **Entry points**: "Forgot Password?" link on `/login`, `/reset-password`.
- **User inputs**: Email, 6-digit OTP, New Password, Confirm New Password.
- **Validation**: Email validation, 6-digit OTP code, password strength confirmation.
- **API/Server action**:
  - Legacy: `POST /auth/send-reset-otp`, `POST /auth/reset-password`.
  - V2: `POST /api/v2/auth/forgot-password`, `POST /api/v2/auth/reset-password`.
- **Database entities**: `User`.
- **External dependencies**: Email delivery service.
- **Success state**: "Password reset successfully. Please log in with your new credentials." Redirect to `/login`.
- **Loading state**: Button spinner during OTP dispatch and reset verification.
- **Error state**: "Expired OTP code" or "User not found".
- **Empty state**: N/A.
- **Authorization requirements**: Public.
- **Current implementation**: Multi-step state machine in `L8` storing `reset_email` and `reset_expiry` in browser `localStorage`.
- **Problems**:
  - Storing reset tokens and expiry in plain `localStorage` is insecure and exposes user email and reset timestamps to client script tampering.
- **New implementation recommendation**: Ephemeral server-side signed reset token or cryptographically secure OTP with server-enforced expiration.
- **Open questions**: None.

---

### Feature: User Profile & Account Settings
- **Purpose**: View profile details, update user avatar, change password, and view purchased layouts.
- **Actors/Roles**: Authenticated User, Administrator.
- **Entry points**: Header avatar menu, `/profile`.
- **User inputs**: Profile image file (multipart), Current password, New password, Confirm password.
- **Validation**: Image file format (JPEG, PNG, WebP) under 2MB; password length rules.
- **API/Server action**:
  - Legacy: `GET /user/data`, `POST /user/upload-profile-image`, `POST /user/update-profile`, `POST /user/changePassword`.
  - V2: `GET /api/v2/user/me`, `PATCH /api/v2/user/me`, `POST /api/v2/user/avatar`, `POST /api/v2/user/password`.
- **Database entities**: `User`.
- **External dependencies**: Image upload storage.
- **Success state**: Profile picture updated with instant preview; password change confirmation.
- **Loading state**: Profile skeleton loader.
- **Error state**: "Failed to update profile", "Current password incorrect".
- **Empty state**: Fallback default Clash avatar when no custom photo is uploaded.
- **Authorization requirements**: Authenticated User.
- **Current implementation**: Component `U8` using TanStack Query `userData`. If admin, displays "Go to Dashboard" button.
- **Problems**:
  - Property naming inconsistency (`o.firstName` in profile display vs `FirstName` in database response).
  - No list of purchased orders or base links displayed in profile!
- **New implementation recommendation**: Create a tabbed user dashboard with Profile Details, Security Settings, and "My Purchased Bases" with persistent Supercell layout links.
- **Open questions**: Are user avatar images stored locally on server disk or uploaded to cloud storage?

---

### Feature: Custom Base Request Submission
- **Purpose**: Allow competitive players and clan leaders to commission tailored base designs for Clan War Leagues (CWL), Legend League pushing, or tournaments.
- **Actors/Roles**: Authenticated User.
- **Entry points**: Navbar "Custom Base", `/custom-base`.
- **User inputs**: Request description (requirements, anti-air/anti-ground priority, Town Hall level), optional reference layout screenshot image file.
- **Validation**: Request description minimum 20 characters; optional image must be valid image file under 5MB.
- **API/Server action**:
  - Legacy: `POST /request/create` (FormData).
  - V2: `POST /api/v2/custom-base/requests`.
- **Database entities**: `CustomBaseRequest`.
- **External dependencies**: Image upload processing.
- **Success state**: "Request submitted successfully! Our pro builders will review your requirements." Form reset.
- **Loading state**: Submitting button spinner with disabled inputs.
- **Error state**: "Failed to submit request. Please try again."
- **Empty state**: Clean empty form with helpful instructions and placeholder suggestions.
- **Authorization requirements**: Authenticated User.
- **Current implementation**: Component `fz` sending `request`, `userId`, `FirstName`, `LastName`, `email`, `userImage`, and `requestImage` to `/request/create`.
- **Problems**:
  - The client manually passes `userId`, `FirstName`, `email` in the body payload, which allows a malicious user to submit requests forged under any other user's ID or email.
  - User cannot view their past submitted requests or status (e.g., Pending, In Progress, Completed).
- **New implementation recommendation**: Derive user identity strictly from the authenticated server session. Provide a "My Requests" tracker in the user dashboard showing status and builder feedback.
- **Open questions**: How are custom bases priced and quoted to the client?

---

### Feature: Customer Testimonials & Reviews
- **Purpose**: Display social proof and feedback from verified players on the homepage, and allow customers to post star ratings and reviews.
- **Actors/Roles**: Public visitor (read), Authenticated User (submit), Administrator (moderate).
- **Entry points**: Homepage Section `E8`, "Write a Review" modal trigger.
- **User inputs**: Star rating (1–5), Review commentary text, optional screenshot image file.
- **Validation**: Rating integer between 1 and 5; review text min 10 chars, max 500 chars.
- **API/Server action**:
  - Legacy: `GET /review/get-reviews`, `POST /review/create`.
  - V2: `GET /api/v2/reviews`, `POST /api/v2/reviews`, `DELETE /api/v2/admin/reviews/:id`.
- **Database entities**: `Review`.
- **External dependencies**: Image upload storage.
- **Success state**: Review successfully submitted and displayed in the review carousel/grid.
- **Loading state**: Review card shimmer animation.
- **Error state**: "Please log in first" dialog or submission error banner.
- **Empty state**: "Be the first pro player to leave a review!"
- **Authorization requirements**: Read is public; Write requires Authenticated User.
- **Current implementation**: Component `E8` with SweetAlert2 popup prompting login if unauthenticated.
- **Problems**:
  - No admin moderation pipeline; any registered user could potentially submit inappropriate content directly to the live homepage.
  - SweetAlert2 introduces an unnecessary 100KB dependency and unstyled alert UI.
- **New implementation recommendation**: Replace SweetAlert2 with native accessible Radix UI dialog. Implement an admin approval status (`isApproved: boolean`) before reviews appear publicly.
- **Open questions**: Should only users who purchased at least one base layout be permitted to write reviews?

---

### Feature: Contact Us & Admin Inquiry Management
- **Purpose**: Enable visitors to contact support for inquiries, clan sponsorship, or order support, and allow administrators to review and reply.
- **Actors/Roles**: Public visitor (submit), Administrator (read, reply, mark as read).
- **Entry points**: `/contact-us`, Admin dashboard `/contact-messages`.
- **User inputs**: Name, Email, Subject, Message.
- **Validation**: Valid email format; name and message required (min 5 chars).
- **API/Server action**:
  - Legacy: `POST /contact/send`, `GET /contact/all`, `GET /contact/unread-count`, `PATCH /contact/mark-read/:id`, `POST /contact/reply`.
  - V2: `POST /api/v2/contact`, `GET /api/v2/admin/messages`, `PATCH /api/v2/admin/messages/:id`, `POST /api/v2/admin/messages/:id/reply`.
- **Database entities**: `ContactMessage`.
- **External dependencies**: Outbound transactional email for admin reply notifications.
- **Success state**: "Message sent successfully! We will get back to you within 24 hours." Form fields reset.
- **Loading state**: Submitting button spinner.
- **Error state**: "Please fill all required fields" / network error alert.
- **Empty state**: In admin view: "No messages in inbox."
- **Authorization requirements**: Submission is public; admin management requires `role: "admin"`.
- **Current implementation**: Component `rz` (form) and `sz` (admin inbox).
- **Problems**:
  - Missing CAPTCHA or bot protection (honeypot/rate limiting) on contact form, leaving it open to automated spam bots.
  - Unread badge in admin dashboard requires polling.
- **New implementation recommendation**: Integrate honeypot field + server-side IP rate limiting. Add clean status badges (Read, Unread, Replied) and threaded conversation history.
- **Open questions**: Does the current email sender support custom domain DKIM/SPF for `support@opicoc.com`?

---

### Feature: Newsletter Subscription
- **Purpose**: Collect subscriber emails for meta updates, CWL base release alerts, and discount promotions.
- **Actors/Roles**: Public visitor (subscribe), Administrator (export/view subscribers).
- **Entry points**: Footer newsletter form, Admin `/getNewsLetter`.
- **User inputs**: Email address.
- **Validation**: Strict RFC email regex.
- **API/Server action**:
  - Legacy: `POST /newsletter/subscribe`, `GET /newsletter/get-emails`.
  - V2: `POST /api/v2/newsletter/subscribe`, `GET /api/v2/admin/newsletter/subscribers`.
- **Database entities**: `NewsletterSubscription`.
- **External dependencies**: Future integration with email marketing provider (Mailchimp/Brevo).
- **Success state**: "Subscribed successfully! Thank you for staying updated." Input cleared.
- **Loading state**: Input button disabled during submission.
- **Error state**: "Please enter a valid email" or "This email is already subscribed".
- **Empty state**: In admin view: "No subscribers yet."
- **Authorization requirements**: Subscription is public; subscriber export requires `role: "admin"`.
- **Current implementation**: Footer component `z7` making POST request to `/newsletter/subscribe`.
- **Problems**:
  - Does not check for duplicate email gracefully or provide an unsubscribe mechanism.
  - No CSV export feature for administrators.
- **New implementation recommendation**: Add double opt-in verification or secure unsubscribe token generation. Provide one-click CSV export in admin dashboard.
- **Open questions**: What email marketing platform will send the campaigns?

---

### Feature: Admin Base Layout Management (CRUD)
- **Purpose**: Full lifecycle management of Clash of Clans base layout products (uploading screenshots, configuring Town Hall level, setting pricing, defining season validity, and attaching Supercell deep links).
- **Actors/Roles**: Administrator.
- **Entry points**: Admin Dashboard `/adminDashboard`, `/create-bases`, `/get-bases`, `admin/edit-base/:id`.
- **User inputs**: Base title, price (USD), badge tag ("1x1", "1x3"), Town Hall category, max sell quota, season start date, season end date, product image file, layout links array (`[{ label, url }]`).
- **Validation**: Title required; price must be positive number; layout link URLs must start with `https://link.clashofclans.com/`; image required.
- **API/Server action**:
  - Legacy: `POST /admin/create-product`, `GET /admin/get-bases`, `GET /admin/get-base/:id`, `PUT /admin/update-base/:id`, `DELETE /admin/deleteBase/:id`.
  - V2: `POST /api/v2/admin/bases`, `GET /api/v2/admin/bases`, `GET /api/v2/admin/bases/:id`, `PUT /api/v2/admin/bases/:id`, `DELETE /api/v2/admin/bases/:id`.
- **Database entities**: `Base` (`Product`).
- **External dependencies**: Image CDN upload handler.
- **Success state**: Base created or updated; redirect to base list with success notification.
- **Loading state**: Table row skeleton loaders; form submission progress bar for high-res images.
- **Error state**: Validation error banner highlighting missing fields or invalid Clash links.
- **Empty state**: "No bases registered. Click '+ Add New Base' to create one."
- **Authorization requirements**: Administrator only (`role: "admin"`).
- **Current implementation**: Components `G8` (create), `X8` (list), `K8` (edit).
- **Problems**:
  - Inconsistent API naming: `/admin/create-product` vs `/admin/deleteBase` vs `/admin/update-base`.
  - Links array is serialized via `JSON.stringify(links)` inside FormData rather than clean structured JSON API.
  - Missing batch actions, sorting, or pagination in admin table.
- **New implementation recommendation**: Standardize RESTful route names. Support direct cloud image upload with progress indicators and automatic WebP conversion.
- **Open questions**: Can bases be archived or unlisted without deleting past purchase history?

---

### Feature: Admin User & Role Administration
- **Purpose**: View registered members, monitor account verification status, and audit administrator privileges.
- **Actors/Roles**: Administrator.
- **Entry points**: Admin Dashboard `/getAllUsers`, `/getAllAdmins`.
- **User inputs**: Search user by name or email, role toggle.
- **Validation**: Cannot demote the last remaining root administrator.
- **API/Server action**:
  - Legacy: `GET /admin/get-users`, `GET /admin/get-admins`.
  - V2: `GET /api/v2/admin/users`, `PATCH /api/v2/admin/users/:id/role`.
- **Database entities**: `User`.
- **External dependencies**: None.
- **Success state**: Data table of users with avatar, full name, email, verification status, role, and joined date.
- **Loading state**: Table skeleton rows.
- **Error state**: "Failed to load user records."
- **Empty state**: "No users found."
- **Authorization requirements**: Administrator only.
- **Current implementation**: Components `$8` (users) and `I8` (admins).
- **Problems**:
  - Read-only table; no search, filter, pagination, or role modification capabilities.
- **New implementation recommendation**: Add full search, sorting, account ban/unban, and role escalation capabilities with audit logs.
- **Open questions**: Is there a super-admin concept distinct from standard admin?

---

### Feature: Dynamic About Content Management
- **Purpose**: Allow administrators to update marketing copy, company story, and value propositions displayed on `/about`.
- **Actors/Roles**: Public visitor (view `/about`), Administrator (manage).
- **Entry points**: `/about`, Admin `/about-list`, `/create-about`, `/edit-about/:id`.
- **User inputs**: Heading, Content body.
- **Validation**: Heading and content non-empty.
- **API/Server action**:
  - Legacy: `GET /admin/get-about`, `POST /admin/create-about`, `PUT /admin/update-about/:id`, `DELETE /admin/delete-about/:id`.
  - V2: `GET /api/v2/about`, `POST /api/v2/admin/about`, `PUT /api/v2/admin/about/:id`, `DELETE /api/v2/admin/about/:id`.
- **Database entities**: `AboutItem`.
- **External dependencies**: None.
- **Success state**: About item displayed on `/about` page.
- **Loading state**: Skeleton cards.
- **Error state**: Toast notification on failure.
- **Empty state**: Legacy `/about` currently displays completely blank cards if `about` array is empty (which returned `[]` in our API inspection!).
- **Authorization requirements**: Public (view); Admin (manage).
- **Current implementation**: Component `cz` (public view) and `iz`, `oz`, `lz` (admin).
- **Problems**:
  - Public `/about` currently returns an empty array `[]` on live production, rendering an empty title and nothing else!
  - Content is plain unformatted text without rich text or markdown support.
- **New implementation recommendation**: Provide curated default static content for `/about` that can be optionally enriched from the CMS/database, supporting rich typography and team member profiles.
- **Open questions**: Should the About page include pro builder bios and tournament history?
