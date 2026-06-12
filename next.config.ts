import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/ai", destination: "/for-ai", permanent: true }];
  },
  async rewrites() {
    return [
      { source: "/catalog.json", destination: "/api/catalog" },
      { source: "/faq.json", destination: "/api/faq" },
      { source: "/products/:slug.json", destination: "/api/products/:slug" },
    ];
  },
};

export default nextConfig;
