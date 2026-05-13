import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "10.140.21.194",
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