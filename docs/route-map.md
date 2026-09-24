# OPICOC V2 Route Map

This document catalogs every discoverable route in the OPICOC platform, analyzing current legacy behavior, required data, SEO value, mobile requirements, and planned implementation for V2.

---

## 1. Public Marketing & Informational Routes

### `/`
- **Route**: `/`
- **Purpose**: Brand homepage, hero banner slider, value propositions, featured Town Hall tiers, Clash of Clans video showcase, and customer testimonials.
- **Access**: Public
- **Current status**: Active SPA route (`T8`). Contains 8 chained section components (`gP`, `C8`, `yP`, `bP`, `vP`, `wP`, `SP`, `E8`).
- **Important components**: `HeroSlider`, `FeaturedBaseGrid`, `TownHallCategoryCards`, `VideoShowcase`, `BrandStorySection`, `ReviewsSection`.
- **Data required**: Featured bases (`/admin/get-bases`), Town Hall list (`/admin/get-townHall`), Customer reviews (`/review/get-reviews`).
- **SEO importance**: Critical (Tier 1). Target keywords: "Clash of Clans bases", "Best CoC base layouts", "CWL base designs", "TH17 base pack".
- **Mobile considerations**: High. The hero slider and video player must adapt smoothly without layout shifts; touch carousel gestures needed; compact card grids (1 col on mobile, 2 col on tablet, 3-4 col on desktop).
- **Rebuild status**: Scheduled for Phase 03. High priority for server rendering (RSC) to achieve near-instant FCP and eliminate duplicate data waterfalls.

---

### `/about`
- **Route**: `/about`
- **Purpose**: Company story, mission, pro base-building philosophy, and builder team credentials.
- **Access**: Public
- **Current status**: Active SPA route (`cz`). Currently renders an empty title because backend `/admin/get-about` returns an empty array `[]`.
- **Important components**: `AboutHeader`, `MissionSection`, `BuilderRoster`, `ValuePillars`.
- **Data required**: About content entries from CMS/database (with fallback static defaults).
- **SEO importance**: High (Tier 2). Establishes domain authority, E-E-A-T, and brand credibility.
- **Mobile considerations**: Simple single-column responsive typography and card layout.
- **Rebuild status**: Scheduled for Phase 04.

---

### `/contact-us`
- **Route**: `/contact-us`
- **Purpose**: Inquiries, order assistance, custom clan sponsorships, and support contact form.
- **Access**: Public
- **Current status**: Active SPA route (`rz`). Basic form sending unauthenticated POST to `/contact/send`.
- **Important components**: `ContactForm`, `ContactInfoSidebar`, `SocialLinkGroup`.
- **Data required**: None on load; form inputs (name, email, subject, message) on submit.
- **SEO importance**: Medium (Tier 3).
- **Mobile considerations**: Full-width inputs, touch-friendly submit button, auto-capitalization and virtual keyboard optimization.
- **Rebuild status**: Scheduled for Phase 04.

---

### `/FAQ` (Legacy `/FAQ's`)
- **Route**: `/faq` (Redirect from legacy `/FAQ's`)
- **Purpose**: Frequently asked questions about pack updates, base delivery, account management, and CWL defense strategies.
- **Access**: Public
- **Current status**: Active SPA route (`nz`) mounted at route path `/FAQ's` (with irregular apostrophe).
- **Important components**: `Accordion`, `FaqSearch`, `SupportCta`.
- **Data required**: Static FAQ dataset with structured FAQPage JSON-LD.
- **SEO importance**: High (Tier 2). Rich snippet eligibility in Google search results via FAQPage schema markup.
- **Mobile considerations**: Collapsible animated accordions with smooth touch interaction.
- **Rebuild status**: Scheduled for Phase 04. Canonical route normalized to `/faq` with 301 redirect from `/FAQ's`.

---

### `/terms-conditions`
- **Route**: `/terms-conditions`
- **Purpose**: Terms of Service, digital goods delivery policies, refund policies, and intellectual property disclaimers.
- **Access**: Public
- **Current status**: Active SPA route (`ez`). Renders static text inside a styled container.
- **Important components**: `LegalDocumentLayout`, `TableOfContents`.
- **Data required**: Static markdown/content.
- **SEO importance**: Medium (Tier 3). Mandatory for merchant compliance.
- **Mobile considerations**: Readable typography, comfortable line height, sticky section anchor navigation.
- **Rebuild status**: Scheduled for Phase 04.

---

### `/privacy-policy`
- **Route**: `/privacy-policy`
- **Purpose**: Data privacy, cookie usage, account data handling, and GDPR/CCPA compliance statement.
- **Access**: Public
- **Current status**: Active SPA route (`tz`). Renders static text.
- **Important components**: `LegalDocumentLayout`.
- **Data required**: Static legal document.
- **SEO importance**: Medium (Tier 3).
- **Mobile considerations**: Responsive legal layout.
- **Rebuild status**: Scheduled for Phase 04.

---

## 2. Base Catalogue & E-Commerce Routes

### `/all-products`
- **Route**: `/all-products` (Recommend alias `/bases`)
- **Purpose**: Comprehensive catalogue of all Clash of Clans base layout packs with search, sorting, Town Hall filtering, and pagination.
- **Access**: Public
- **Current status**: Active SPA route (`Z8`). Fetches all bases client-side, filters in memory.
- **Important components**: `ProductFilterBar`, `SearchInput`, `TownHallSelect`, `BaseCardGrid`, `BaseCard`, `PaginationControls`, `BaseDetailModal`.
- **Data required**: Base products list, Town Hall tiers.
- **SEO importance**: Critical (Tier 1). Prime landing page for search engine queries targeting multiple Town Hall levels.
- **Mobile considerations**: Sticky filter sheet/drawer on mobile viewports; 1-column card list; touch-friendly pagination buttons.
- **Rebuild status**: Scheduled for Phase 04. Re-architected with Server-Side Rendering (RSC) and URL search parameters (`?th=17&sort=newest&page=1`) for crawlability.

---

### `/bases/th/:th`
- **Route**: `/bases/th/:th` (e.g. `/bases/th/15`, `/bases/th/16`, `/bases/th/17`, `/bases/th/18`)
- **Purpose**: Tier-specific base layout collection for targeted Town Hall levels.
- **Access**: Public
- **Current status**: Active SPA route (`dz`). Dynamic route segment `:th`.
- **Important components**: `TownHallBanner`, `BaseCardGrid`, `TierFilterNav`.
- **Data required**: Base layouts filtered by Town Hall tier.
- **SEO importance**: Critical (Tier 1). Dedicated programmatic landing pages for high-intent keywords (e.g., "TH18 bases", "TH17 CWL layouts").
- **Mobile considerations**: Horizontal scrolling Town Hall selector pills at top of screen for quick switching.
- **Rebuild status**: Scheduled for Phase 04.

---

### `/bases/:id` (New in V2)
- **Route**: `/bases/:id`
- **Purpose**: Dedicated permalink product page for individual base layout packs, providing deep links, rich previews, defensive focus tags, and OpenGraph social meta cards.
- **Access**: Public
- **Current status**: Non-existent in legacy site (only an inline modal existed).
- **Important components**: `BaseGallery`, `DefenseFocusBadges`, `SeasonValidityCountdown`, `BuilderProfileCard`, `AddToCartBlock`, `RelatedBases`.
- **Data required**: Single base record by ID, creator info, related bases by Town Hall.
- **SEO importance**: Critical (Tier 1). Provides Product schema markup (name, image, offers, price, currency) for Google Rich Results.
- **Mobile considerations**: Sticky bottom "Add to Cart / Buy Now" bar on mobile.
- **Rebuild status**: Scheduled for Phase 04.

---

### `/cart`
- **Route**: `/cart`
- **Purpose**: Review selected bases, view subtotal, currency conversion disclaimers, and initiate checkout.
- **Access**: Public (Cart data in local storage); requires auth for checkout.
- **Current status**: Active SPA route (`J8`). Broken flow: displays items and total price, but contains NO checkout button!
- **Important components**: `CartItemList`, `CartItemRow`, `OrderSummary`, `CheckoutButton`, `EmptyCartState`.
- **Data required**: Client cart items validated against server price/availability API.
- **SEO importance**: None (noindex, follow).
- **Mobile considerations**: Responsive table or card list; fixed bottom checkout summary bar.
- **Rebuild status**: Scheduled for Phase 06.

---

### `/checkout` (New in V2)
- **Route**: `/checkout`
- **Purpose**: Secure payment processing interface (Stripe Elements / PayPal SDK).
- **Access**: Authenticated User
- **Current status**: Missing in legacy application.
- **Important components**: `CheckoutStepper`, `OrderReview`, `PaymentElement`, `SecurityBadges`.
- **Data required**: Session token, validated cart items, user profile.
- **SEO importance**: None (noindex, nofollow).
- **Mobile considerations**: Streamlined frictionless mobile checkout with Apple Pay / Google Pay support.
- **Rebuild status**: Scheduled for Phase 06.

---

## 3. Authentication Routes

### `/login`
- **Route**: `/login`
- **Purpose**: User login via email and password with redirect support.
- **Access**: Public (redirect to `/profile` if already authenticated).
- **Current status**: Active SPA route (`O8`).
- **Important components**: `LoginForm`, `SocialLoginButtons`, `ForgotPasswordLink`, `RegisterLink`.
- **Data required**: Form state; sets HTTP-only session cookie upon success.
- **SEO importance**: Low (noindex, follow).
- **Mobile considerations**: Clean centered card, password visibility toggle, autofill attributes.
- **Rebuild status**: Scheduled for Phase 05.

---

### `/registration`
- **Route**: `/registration` (Recommend alias `/register`)
- **Purpose**: New user account creation.
- **Access**: Public (redirect if authenticated).
- **Current status**: Active SPA route (`k8`). Submits to `/auth/register` and redirects to `/verify-otp`.
- **Important components**: `RegistrationForm`, `TermsAgreementCheckbox`.
- **Data required**: First name, last name, email, password.
- **SEO importance**: Low (noindex, follow).
- **Mobile considerations**: Input validation feedback, touch-friendly buttons.
- **Rebuild status**: Scheduled for Phase 05.

---

### `/verify-otp`
- **Route**: `/verify-otp`
- **Purpose**: 6-digit email verification code entry with resend cooldown timer.
- **Access**: Public
- **Current status**: Active SPA route (`D8`). Reads email from query param `?email=...`.
- **Important components**: `OtpInput` (segmented 6-box input), `ResendCooldownTimer`.
- **Data required**: `email` query param, 6-digit OTP.
- **SEO importance**: None (noindex, nofollow).
- **Mobile considerations**: Numeric keypad trigger (`inputMode="numeric"`), auto-advance between OTP boxes.
- **Rebuild status**: Scheduled for Phase 05.

---

### `/reset-password` (Legacy `reset-password`)
- **Route**: `/reset-password`
- **Purpose**: Forgot password recovery step 1 (request OTP) and step 2 (verify OTP + submit new password).
- **Access**: Public
- **Current status**: Active SPA route (`L8`). Stores reset state in insecure `localStorage`.
- **Important components**: `RequestOtpForm`, `ResetPasswordForm`.
- **Data required**: Email, OTP, new password.
- **SEO importance**: None (noindex, nofollow).
- **Mobile considerations**: Multi-step wizard with smooth transitions.
- **Rebuild status**: Scheduled for Phase 05.

---

## 4. User Dashboard & Authenticated Routes

### `/profile`
- **Route**: `/profile`
- **Purpose**: User account overview, avatar upload, password change, order history, and access to purchased layout links.
- **Access**: Authenticated User (wrapped in `r2` guard).
- **Current status**: Active SPA route (`U8`). Flawed redirect: unauthenticated users get sent to `*` (404) instead of `/login`.
- **Important components**: `ProfileSummaryCard`, `AvatarUploader`, `PasswordChangeForm`, `PurchasedBasesLibrary`.
- **Data required**: User profile data (`/user/data`), User orders.
- **SEO importance**: None (noindex, nofollow).
- **Mobile considerations**: Tabbed navigation between Profile, Orders, and Security.
- **Rebuild status**: Scheduled for Phase 06.

---

### `/custom-base`
- **Route**: `/custom-base`
- **Purpose**: Custom base design request form for competitive CWL / tournament layouts.
- **Access**: Authenticated User (wrapped in `r2` guard).
- **Current status**: Active SPA route (`fz`). Flawed redirect to 404 for guests.
- **Important components**: `CustomBaseRequestForm`, `ImageDropzone`, `RequestHistoryList`.
- **Data required**: User session, submitted request description, screenshot image.
- **SEO importance**: Low (noindex, follow).
- **Mobile considerations**: Native file picker for photo library screenshots.
- **Rebuild status**: Scheduled for Phase 06.

---

## 5. Administrative Routes (Role: `admin`)

### `/adminDashboard` (Recommend `/admin`)
- **Route**: `/admin` (Redirect from `/adminDashboard`)
- **Purpose**: Admin command center with quick stats, unread contact message badge, and navigation to administrative modules.
- **Access**: Administrator (`Ur` guard: `role === "admin"`).
- **Current status**: Active SPA route (`H8`).
- **Important components**: `AdminSidebar`, `MetricCards`, `QuickActionPills`.
- **Data required**: Unread message count (`/contact/unread-count`), user session.
- **SEO importance**: None (noindex, nofollow).
- **Mobile considerations**: Collapsible admin drawer menu.
- **Rebuild status**: Scheduled for Phase 07.

---

### `/admin/bases` (Legacy `get-bases`, `create-bases`, `admin/edit-base/:id`)
- **Route**: `/admin/bases`
  - `/admin/bases/new` (Add Base)
  - `/admin/bases/[id]/edit` (Edit Base)
- **Purpose**: Manage base layouts catalogue, upload screenshots, configure metadata and pricing, and manage Supercell layout links.
- **Access**: Administrator
- **Current status**: Active SPA routes (`X8`, `G8`, `K8`). Fragmented URLs (`get-bases`, `create-bases`).
- **Important components**: `BaseDataTable`, `BaseForm`, `LayoutLinkRepeater`, `ImageUploadPreview`.
- **Data required**: Base records list, Town Hall tiers.
- **SEO importance**: None (noindex, nofollow).
- **Mobile considerations**: Responsive table with horizontal scroll or card view on small screens.
- **Rebuild status**: Scheduled for Phase 07.

---

### `/admin/users` (Legacy `getAllUsers`, `getAllAdmins`)
- **Route**: `/admin/users`
- **Purpose**: Inspect registered user accounts, manage roles (user vs admin), monitor verification status.
- **Access**: Administrator
- **Current status**: Active SPA routes (`$8`, `I8`).
- **Important components**: `UserDataTable`, `RoleBadge`, `SearchInput`.
- **Data required**: User records list (`/admin/get-users`, `/admin/get-admins`).
- **SEO importance**: None (noindex, nofollow).
- **Mobile considerations**: Stacked user card view on mobile.
- **Rebuild status**: Scheduled for Phase 07.

---

### `/admin/requests` (Legacy `get-requests`)
- **Route**: `/admin/requests`
- **Purpose**: Review custom base commission submissions from players.
- **Access**: Administrator
- **Current status**: Active SPA route (`hz`).
- **Important components**: `RequestCardList`, `RequestDetailModal`, `StatusDropdown`.
- **Data required**: Custom base requests (`/request/get-requests`).
- **SEO importance**: None (noindex, nofollow).
- **Mobile considerations**: Clean card list.
- **Rebuild status**: Scheduled for Phase 07.

---

### `/admin/messages` (Legacy `/contact-messages`)
- **Route**: `/admin/messages`
- **Purpose**: Support inbox, read messages, mark as read, and send email replies.
- **Access**: Administrator
- **Current status**: Active SPA route (`sz`).
- **Important components**: `MessageInboxList`, `MessageThread`, `ReplyComposer`.
- **Data required**: Messages list (`/contact/all`).
- **SEO importance**: None (noindex, nofollow).
- **Mobile considerations**: Split pane view or drill-down list.
- **Rebuild status**: Scheduled for Phase 07.

---

### `/admin/newsletter` (Legacy `getNewsLetter`)
- **Route**: `/admin/newsletter`
- **Purpose**: View newsletter subscribers and export subscriber email list as CSV.
- **Access**: Administrator
- **Current status**: Active SPA route (`pz`).
- **Important components**: `SubscriberTable`, `CsvExportButton`.
- **Data required**: Subscriber emails (`/newsletter/get-emails`).
- **SEO importance**: None (noindex, nofollow).
- **Mobile considerations**: Simple table view.
- **Rebuild status**: Scheduled for Phase 07.

---

### `/admin/about` (Legacy `about-list`, `create-about`, `edit-about/:id`)
- **Route**: `/admin/about`
- **Purpose**: Manage dynamic about page copy sections.
- **Access**: Administrator
- **Current status**: Active SPA routes (`iz`, `oz`, `lz`).
- **Important components**: `AboutContentList`, `AboutItemForm`.
- **Data required**: About items (`/admin/get-about`).
- **SEO importance**: None (noindex, nofollow).
- **Mobile considerations**: Clean form layout.
- **Rebuild status**: Scheduled for Phase 07.

---

## 6. Catch-All & Fallback Route

### `/*`
- **Route**: `not-found` (`/*`)
- **Purpose**: Display branded 404 error page when an unrecognized URL is requested.
- **Access**: Public
- **Current status**: Active SPA route (`uz`). Dark theme page with "Oops! Page not found."
- **Important components**: `NotFoundDisplay`, `BackToHomeButton`.
- **Data required**: None.
- **SEO importance**: Returns HTTP 404 status header in V2 (crucial fix over legacy 200 SPA fallback).
- **Mobile considerations**: Centered responsive hero.
- **Rebuild status**: Scheduled for Phase 02.
