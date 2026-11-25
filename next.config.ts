import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // StPageFlip memulakan DOM sendiri; mod ketat React menyebabkan permulaan berganda semasa dev.
  reactStrictMode: false,
};

export default nextConfig;
