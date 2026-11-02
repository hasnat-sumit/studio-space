import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The browser calls the API through this site, so the session cookie is
  // first-party and works in browsers that block third-party cookies.
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");
    return apiUrl
      ? [{ source: "/api/:path*", destination: `${apiUrl}/:path*` }]
      : [];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
