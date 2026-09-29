import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import GuideTour from "@/components/GuideTour";

export const metadata: Metadata = {
  title: "刘晓月 · AI 作品集",
  description:
    "AI 应用开发 / AI 产品工程师作品集：Resume Copilot、AI Director、AI Marketing Visual 等项目，用测试与量化数据证明每一次模型调用的价值。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="mesh-bg" aria-hidden />
        <div className="grid-lines" aria-hidden />
        <Nav />
        {children}
        <GuideTour />
      </body>
    </html>
  );
}
