import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  // Production Performance Optimizations
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

  // Optimal Cache-Control Headers for Static Assets & Immutable Media
  async headers() {
    return [
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
