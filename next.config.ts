import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "plus.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "source.unsplash.com", // 👈 ADD THIS
            },
            {
                protocol: "https",
                hostname: "images.pexels.com",
            },
        ],
    },
};

export default nextConfig;
