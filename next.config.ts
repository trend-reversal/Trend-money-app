import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.1.40",
  ],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "trend-reversal-bucket.s3.us-east-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname:
          "s3.ap-south-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;