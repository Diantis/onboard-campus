import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, //Désactive ESLint pendant le build
  },
};

export default nextConfig;
