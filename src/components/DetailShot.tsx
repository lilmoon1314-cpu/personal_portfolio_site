"use client";

import { useEffect, useRef, useState } from "react";

// 截图组件：素材缺失时优雅降级为渐变占位块
// 注意：SSR 阶段 <img> 可能在 React 挂载前就已 404，onError 会错过 —— 挂载后用 naturalWidth 补检
export default function Shot({
  src,
  alt,
  className,
  accent = "#22d3ee",
  label,
}: {
  src?: string;
  alt: string;
  className?: string;
  accent?: string;
  label?: string;
}) {
  const ref = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(!src);

  useEffect(() => {
    const img = ref.current;
    if (!src) return;
    // 挂载时已完成加载且失败（水合前 404 的兜底）
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, [src]);

  if (failed || !src) {
    return (
      <div
        className={`flex items-center justify-center overflow-hidden rounded-2xl border border-[var(--line)] ${className ?? ""}`}
        style={{ background: `linear-gradient(135deg, ${accent}22, transparent 55%), var(--bg-soft)` }}
        aria-label={alt}
      >
        <span className="px-6 text-center text-sm text-[var(--text-faint)]">{label ?? "演示素材采集中"}</span>
      </div>
    );
  }
  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`rounded-2xl border border-[var(--line)] object-cover object-top ${className ?? ""}`}
    />
  );
}
