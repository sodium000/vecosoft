import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/avatars/:id.jpg",
        destination: "/api/avatars/:id",
      },
    ];
  },
};

export default nextConfig;
