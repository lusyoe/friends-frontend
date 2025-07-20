import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ["cdn.lusyoe.com"],
  },
  async rewrites() {
    return [
      {
        source: '/api/sites',
        destination: 'http://127.0.0.1:5000/api/sites',
      },
    ];
  },
  /* config options here */
};

export default nextConfig;
