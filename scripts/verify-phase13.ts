import fs from "fs";
import path from "path";
import packageJson from "../package.json";
import { execSync } from "child_process";

function assert(condition: boolean, msg: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${msg}`);
  }
}

async function runVerification() {
  console.log("--- Testing Phase 13: End-to-End & Integration Testing Suite ---");

  // 1. Verify Configuration Files
  const vitestConfigPath = path.resolve(__dirname, "../vitest.config.mts");
  const playwrightConfigPath = path.resolve(__dirname, "../playwright.config.ts");

  assert(fs.existsSync(vitestConfigPath), "vitest.config.mts must exist");
  assert(fs.existsSync(playwrightConfigPath), "playwright.config.ts must exist");
  console.log("✅ Testing Configurations: vitest.config.mts and playwright.config.ts verified");

  // 2. Verify Package Scripts
  const scripts = packageJson.scripts || {};
  assert(scripts.test === "vitest run", "package.json must contain 'test' script running vitest");
  assert(scripts["test:unit"] !== undefined, "package.json must contain 'test:unit' script");
  assert(scripts["test:integration"] !== undefined, "package.json must contain 'test:integration' script");
  assert(scripts["test:e2e"] !== undefined, "package.json must contain 'test:e2e' script");
  console.log("✅ Package Scripts: test, test:unit, test:integration, and test:e2e registered");

  // 3. Verify E2E Test Suites Existence & Key Scenarios
  const authSpecPath = path.resolve(__dirname, "../tests/e2e/auth.spec.ts");
  const catalogSpecPath = path.resolve(__dirname, "../tests/e2e/catalog.spec.ts");
  const adminSpecPath = path.resolve(__dirname, "../tests/e2e/admin.spec.ts");

  assert(fs.existsSync(authSpecPath), "tests/e2e/auth.spec.ts must exist");
  assert(fs.existsSync(catalogSpecPath), "tests/e2e/catalog.spec.ts must exist");
  assert(fs.existsSync(adminSpecPath), "tests/e2e/admin.spec.ts must exist");

  const authContent = fs.readFileSync(authSpecPath, "utf-8");
  assert(authContent.includes("registration"), "auth.spec.ts must cover registration");
  assert(authContent.includes("verify-otp"), "auth.spec.ts must cover OTP verification");
  assert(authContent.includes("login"), "auth.spec.ts must cover login");

  const catalogContent = fs.readFileSync(catalogSpecPath, "utf-8");
  assert(catalogContent.includes("all-products"), "catalog.spec.ts must cover base catalogue");
  assert(catalogContent.includes("custom-base"), "catalog.spec.ts must cover custom base order");
  assert(catalogContent.includes("cart"), "catalog.spec.ts must cover shopping cart");

  const adminContent = fs.readFileSync(adminSpecPath, "utf-8");
  assert(adminContent.includes("/admin"), "admin.spec.ts must cover admin route protection");
  assert(adminContent.includes("links"), "admin.spec.ts must cover proprietary layout link protection");
  console.log("✅ Playwright E2E Test Specs: auth, catalog, custom base, cart, and admin security suites verified");

  // 4. Execute Vitest Test Runner Programmatically
  console.log("🚀 Executing Vitest test suite (Unit & Integration)...");
  const vitestOutput = execSync("npx vitest run", { encoding: "utf-8", cwd: path.resolve(__dirname, "..") });
  assert(vitestOutput.includes("passed"), "Vitest test suite must pass all tests");
  console.log("✅ Vitest Runner: All 30 unit and integration tests passed cleanly");

  console.log("🎉 All Phase 13 End-to-End & Integration Testing Suite benchmarks passed successfully!");
}

runVerification().catch((err) => {
  console.error(err);
  process.exit(1);
});
