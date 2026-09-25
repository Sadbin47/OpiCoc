import { test, expect } from "@playwright/test";

test.describe("Product Catalogue, Base Details & Cart E2E", () => {
  test("homepage renders Town Hall selector, hero, and featured bases", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/OPICOC/i);

    // Hero headline
    const heroHeading = page.locator("h1");
    await expect(heroHeading).toBeVisible();

    // Town Hall filter navigation
    const thSelector = page.locator('a[href*="/bases/th/18"], a[href*="/all-products"]');
    await expect(thSelector.first()).toBeVisible();
  });

  test("all-products catalogue displays base cards and level filters", async ({ page }) => {
    await page.goto("/all-products");

    // Check title or heading
    await expect(page.locator("h1")).toContainText(/Base|Catalogue|Products/i);

    // At least one base card rendered
    const baseCards = page.locator("article");
    await expect(baseCards.first()).toBeVisible();

    // Town hall filter pills exist
    const filterPills = page.locator('button, a[role="tab"], a[href*="/bases/th/"]');
    await expect(filterPills.first()).toBeVisible();
  });

  test("navigates to base details page with specifications and pricing", async ({ page }) => {
    await page.goto("/all-products");

    // Click first base card link
    const firstBaseLink = page.locator('article h3 a, article a[href^="/bases/"]').first();
    const baseHref = await firstBaseLink.getAttribute("href");
    expect(baseHref).toBeTruthy();

    if (baseHref) {
      await page.goto(baseHref);
      await expect(page.locator("h1")).toBeVisible();
      // Price indicator
      await expect(page.locator("text=$").first()).toBeVisible();
    }
  });

  test("custom base request page loads with Town Hall selection and priority", async ({ page }) => {
    // Custom base requires authentication, check redirect or page view
    await page.goto("/custom-base");
    const url = page.url();

    // Either displays custom base builder or redirects to login
    if (url.includes("/login")) {
      await expect(page).toHaveURL(/\/login\?redirectTo=/);
    } else {
      await expect(page.locator("h1, h2")).toContainText(/Custom|Architect|Order/i);
    }
  });

  test("cart page loads and displays empty state or checkout summary", async ({ page }) => {
    await page.goto("/cart");
    await expect(page.locator("h1")).toContainText(/Cart|Order/i);
  });
});
