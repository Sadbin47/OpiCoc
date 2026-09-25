import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  // Production Deployment & Performance Optimizations
  output: "standalone",
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  experimental: {
    // Tree shake heavy dependencies for minimal client bundles
    optimizePackageImports: ["lucide-react", "motion"],
  },

  // Image Optimization Engine (AVIF, WebP, responsive breakpoints)
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30-day edge cache
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "iili.io",
      },
    ],
  },

  // Enterprise HTTP Security Headers & Optimal Asset Caching
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https://iili.io https://*.googleusercontent.com https://images.unsplash.com; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://iili.io https://api.stripe.com; media-src 'self' https: data: blob:; frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://js.stripe.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none';",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
        ],
      },
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Backward-Compatible Redirects from Legacy V1 Routes
  async redirects() {
    return [
      {
        source: "/FAQ's",
        destination: "/faq",
        permanent: true,
      },
      {
        source: "/faqs",
        destination: "/faq",
        permanent: true,
      },
      {
        source: "/bases",
        destination: "/all-products",
        permanent: true,
      },
      {
        source: "/adminDashboard",
        destination: "/admin",
        permanent: true,
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
