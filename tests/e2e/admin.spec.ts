import { test, expect } from "@playwright/test";

test.describe("Admin System & Digital Delivery Link Protection E2E", () => {
  test("unauthenticated access to /admin redirects to login", async ({ page }) => {
    await page.goto("/admin");
    await expect(page).toHaveURL(/\/login\?redirectTo=/);
  });

  test("unauthenticated access to /admin/bases redirects to login", async ({ page }) => {
    await page.goto("/admin/bases");
    await expect(page).toHaveURL(/\/login\?redirectTo=/);
  });

  test("unauthenticated access to /admin/requests redirects to login", async ({ page }) => {
    await page.goto("/admin/requests");
    await expect(page).toHaveURL(/\/login\?redirectTo=/);
  });

  test("unauthenticated access to /admin/messages redirects to login", async ({ page }) => {
    await page.goto("/admin/messages");
    await expect(page).toHaveURL(/\/login\?redirectTo=/);
  });

  test("digital delivery layout links API enforces purchase verification", async ({ request }) => {
    // Direct attempt to fetch Supercell download link without auth token
    const response = await request.get("/api/bases/69ad8e939e02deab05921114/links");
    expect(response.status()).toBe(401);

    const body = await response.json();
    expect(body.code).toBe("UNAUTHENTICATED");
    expect(body.error).toContain("Authentication required");
  });
});
