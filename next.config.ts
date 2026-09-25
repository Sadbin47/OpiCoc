import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "iili.io",
      },
    ],
  },
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

export default nextConfig;
