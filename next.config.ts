import type { NextConfig } from "next";

// Set turbopack.root to this project to avoid workspace root inference
// (prevents Turbopack scanning parent folders / multiple lockfile issues)
const nextConfig: NextConfig & Record<string, any> = {
  turbopack: {
    root: './',
  },
};

export default nextConfig;
