import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // TypeScript 6 still exposes the compiler API, which avoids the CLI
    // config parsing issue that can appear after running the dev server.
    useTypeScriptCli: false,
  },
};

export default nextConfig;
