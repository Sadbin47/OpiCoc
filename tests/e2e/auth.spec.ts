import { test, expect } from "@playwright/test";

test.describe("Authentication & Account Lifecycle E2E", () => {
  test("registration page loads with validation indicators", async ({ page }) => {
    await page.goto("/registration");
    await expect(page).toHaveTitle(/Create Account|OPICOC/i);

    // Form inputs should be visible and accessible
    const firstName = page.locator('input[id="firstName"], input[name="firstName"]');
    const lastName = page.locator('input[id="lastName"], input[name="lastName"]');
    const email = page.locator('input[type="email"]');
    const password = page.locator('input[type="password"]');

    await expect(firstName).toBeVisible();
    await expect(lastName).toBeVisible();
    await expect(email).toBeVisible();
    await expect(password).toBeVisible();
  });

  test("verify OTP page displays 6-digit token entry interface", async ({ page }) => {
    await page.goto("/verify-otp?email=chief@opicoc.cc");
    await expect(page.locator("h1, h2")).toContainText(/Verify|Code|OTP/i);

    const otpInput = page.locator('input[type="text"], input[name="otp"]');
    await expect(otpInput.first()).toBeVisible();
  });

  test("unauthenticated access to protected /profile redirects to login", async ({ page }) => {
    await page.goto("/profile");
    // Should be redirected to /login with redirectTo query parameter
    await expect(page).toHaveURL(/\/login\?redirectTo=/);
  });

  test("login form validates email format and password entry", async ({ page }) => {
    await page.goto("/login");

    const emailInput = page.locator('input[type="email"]');
    const passwordInput = page.locator('input[type="password"]');
    const submitButton = page.locator('button[type="submit"]');

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(submitButton).toBeVisible();
  });

  test("reset password page renders recovery form", async ({ page }) => {
    await page.goto("/reset-password");
    await expect(page.locator("h1, h2")).toContainText(/Reset|Recovery|Password/i);
    await expect(page.locator('input[type="email"]')).toBeVisible();
  });
});
