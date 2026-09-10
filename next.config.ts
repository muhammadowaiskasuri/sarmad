import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,

  // Server-only native modules — not bundled by webpack
  serverExternalPackages: [
    "sharp",
    "@prisma/adapter-libsql",
    "@libsql/client",
    "jszip",
    "bcryptjs",
  ],

  images: {
    remotePatterns: [
      { protocol: "http",  hostname: "localhost" },
      { protocol: "http",  hostname: "127.0.0.1" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
    // Allow local /api/media/... paths without hostname
    unoptimized: false,
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options",        value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options",  value: "nosniff" },
          { key: "Referrer-Policy",         value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },

  // /uploads/... → /api/media/uploads/... (backward compat for old DB URLs)
  async rewrites() {
    return [
      {
        source:      "/uploads/:path*",
        destination: "/api/media/uploads/:path*",
      },
    ];
  },
};

export default nextConfig;
