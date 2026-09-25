import fs from "fs";
import path from "path";
import nextConfig from "../next.config";
import packageJson from "../package.json";
import { FeaturedBaseGridSkeleton } from "../src/features/home/components/FeaturedBaseGridSkeleton";
import { ReviewSectionSkeleton } from "../src/features/home/components/ReviewSectionSkeleton";
import { getAllBases } from "../src/services/baseService";

function assert(condition: boolean, msg: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${msg}`);
  }
}

async function runVerification() {
  console.log("--- Testing Phase 11: Performance Optimization & Core Web Vitals ---");

  // 1. Next.js Config: Modern Image Optimization Engine
  assert(nextConfig.images !== undefined, "images configuration must be defined");
  const formats = nextConfig.images?.formats || [];
  assert(formats.includes("image/avif"), "images.formats must include image/avif");
  assert(formats.includes("image/webp"), "images.formats must include image/webp");
  assert(
    nextConfig.images?.minimumCacheTTL === 60 * 60 * 24 * 30,
    "images.minimumCacheTTL must be 30 days (2592000s)"
  );
  assert(
    Array.isArray(nextConfig.images?.deviceSizes) && nextConfig.images.deviceSizes.length >= 5,
    "deviceSizes must be explicitly configured"
  );
  console.log("✅ Next.js Image Optimization: AVIF + WebP formats with 30-day edge cache TTL verified");

  // 2. Next.js Config: Compiler and Bundle Optimizations
  assert(nextConfig.compress === true, "Gzip/Brotli compression must be enabled");
  assert(nextConfig.poweredByHeader === false, "X-Powered-By header must be disabled");
  assert(nextConfig.reactStrictMode === true, "React strict mode must be enabled");
  
  const optimizeImports = nextConfig.experimental?.optimizePackageImports || [];
  assert(
    optimizeImports.includes("lucide-react") && optimizeImports.includes("motion"),
    "experimental.optimizePackageImports must include lucide-react and motion"
  );
  console.log("✅ Compiler Optimizations: compression, strict mode, and package tree-shaking verified");

  // 3. Cache-Control Headers for Static Assets
  if (typeof nextConfig.headers === "function") {
    const customHeaders = await nextConfig.headers();
    const assetHeader = customHeaders.find((h) => h.source === "/assets/:path*");
    assert(assetHeader !== undefined, "/assets/:path* cache header rule must exist");
    const cacheControl = assetHeader?.headers.find((h) => h.key === "Cache-Control");
    assert(
      Boolean(cacheControl?.value.includes("max-age=31536000") && cacheControl?.value.includes("immutable")),
      "Asset cache header must be 1-year immutable"
    );
    console.log("✅ Static Assets Caching: 1-year immutable cache header verified for /assets/:path*");
  } else {
    throw new Error("nextConfig.headers must be defined as an async function");
  }

  // 4. Bundle Analyzer tooling & script
  const devDeps = packageJson.devDependencies || {};
  assert("@next/bundle-analyzer" in devDeps, "@next/bundle-analyzer must be in devDependencies");
  const scripts = packageJson.scripts || {};
  assert("analyze" in scripts, "package.json must contain an 'analyze' script");
  assert(scripts.analyze.includes("ANALYZE=true"), "'analyze' script must set ANALYZE=true");
  console.log("✅ Bundle Analyzer: @next/bundle-analyzer configured with npm run analyze script");

  // 5. Zero-CLS Skeletons & Suspense Streaming Component Presence
  assert(typeof FeaturedBaseGridSkeleton === "function", "FeaturedBaseGridSkeleton component must exist");
  assert(typeof ReviewSectionSkeleton === "function", "ReviewSectionSkeleton component must exist");

  const homePagePath = path.resolve(__dirname, "../src/app/page.tsx");
  const homePageSource = fs.readFileSync(homePagePath, "utf-8");
  assert(homePageSource.includes("<Suspense"), "HomePage must implement React Suspense boundaries");
  assert(
    homePageSource.includes("FeaturedBaseGridSkeleton"),
    "HomePage must use FeaturedBaseGridSkeleton fallback"
  );
  assert(
    homePageSource.includes("ReviewSectionSkeleton"),
    "HomePage must use ReviewSectionSkeleton fallback"
  );
  assert(
    homePageSource.includes("<ReviewSectionStream"),
    "HomePage must render ReviewSectionStream for non-blocking reviews"
  );
  console.log("✅ Core Web Vitals & Streaming: React Suspense streaming and zero-CLS skeleton boundaries verified");

  // 6. Resilient In-Memory Caching in Base Service
  const bases1 = await getAllBases();
  const t1 = Date.now();
  const bases2 = await getAllBases();
  const t2 = Date.now();
  assert(bases1.length > 0, "getAllBases must return bases");
  assert(bases2.length === bases1.length, "Cached bases must match first call");
  assert(t2 - t1 < 10, `In-memory cache must return in <10ms, took ${t2 - t1}ms`);
  console.log(`✅ Base Service In-Memory Cache: Second fetch resolved in ${t2 - t1}ms (zero server waterfalls)`);

  console.log("🎉 All Phase 11 performance and Core Web Vitals benchmarks passed successfully!");
}

runVerification().catch((err) => {
  console.error(err);
  process.exit(1);
});
