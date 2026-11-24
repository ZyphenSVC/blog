import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    // Navigation Timing reports both kinds of refresh as "reload".
    // Mark a cache bypass for this response only.
    return [{
      source: "/",
      has: [{ type: "header", key: "cache-control", value: "no-cache" }],
      headers: [
        { key: "Server-Timing", value: "portfolio-hard-reload" },
        { key: "Cache-Control", value: "private, no-store" },
      ],
    }];
  },
  reactCompiler: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
