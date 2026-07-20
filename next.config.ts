import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // webp only — AVIF still renders black in some embedded/older WebKit rasterizers
    formats: ["image/webp"],
  },
  async redirects() {
    return [
      { source: "/", destination: "/en", permanent: false },
    ];
  },
};

export default nextConfig;
