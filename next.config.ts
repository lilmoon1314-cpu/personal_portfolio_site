import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // 静态导出 → 可部署到 Cloudflare Pages / 任意静态托管
  trailingSlash: true, // 生成 目录/index.html，任何静态服务器都能直接路由
  images: { unoptimized: true },
};

export default nextConfig;
