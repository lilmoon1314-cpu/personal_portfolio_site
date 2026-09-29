"use client";

import Link from "next/link";
import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import type { Project } from "@/content/projects";
import StatCounter from "@/components/StatCounter";

// 主力项目大卡：光标跟随光斑 + 3D tilt
export default function ProjectCard({ p, index }: { p: Project; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || reduce) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    const rx = (0.5 - py) * 5;
    const ry = (px - 0.5) * 7;
    el.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-3px)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <Link
      ref={ref}
      href={`/projects/${p.slug}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="tilt-card group relative block overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--glass)] p-7 backdrop-blur-sm"
      style={{ "--card-accent": `#${p.color}` } as React.CSSProperties}
    >
      <div className="card-glow" aria-hidden />

      {/* 顶部：编号 + 评分 */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-[var(--text-faint)]">0{index + 1}</span>
        <span
          className="rounded-full px-3 py-1 text-xs font-semibold"
          style={{ color: `#${p.color}`, background: `#${p.color}1a`, border: `1px solid #${p.color}33` }}
        >
          综合评分 {p.score}
        </span>
      </div>

      <h3 className="mt-5 text-2xl font-bold tracking-tight transition-colors group-hover:text-[var(--card-accent)]" style={{ color: undefined }}>
        {p.name}
      </h3>
      <p className="mt-2 min-h-[44px] text-sm leading-relaxed text-[var(--text-dim)]">{p.tagline}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {p.tags.slice(0, 5).map((t) => (
          <span key={t} className="rounded-full border border-[var(--line)] px-2.5 py-0.5 text-[11px] text-[var(--text-faint)]">
            {t}
          </span>
        ))}
      </div>

      {/* 关键指标 */}
      <div className="mt-6 grid grid-cols-3 gap-3 border-t border-[var(--line)] pt-5">
        {p.metrics.slice(0, 3).map((m) => (
          <div key={m.label}>
            <div className="text-lg font-bold" style={{ color: `#${p.color}` }}>
              <StatCounter value={m.value} />
            </div>
            <div className="mt-0.5 text-[11px] leading-tight text-[var(--text-faint)]">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-2 text-sm font-medium" style={{ color: `#${p.color}` }}>
        查看项目详情
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </div>
    </Link>
  );
}

// 课程/研究项目紧凑卡
export function CompactCard({ p }: { p: Project }) {
  return (
    <Link
      href={`/projects/${p.slug}`}
      className="group relative block overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--glass)] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/20"
      style={{ "--card-accent": `#${p.color}` } as React.CSSProperties}
    >
      <div className="card-glow" aria-hidden />
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-semibold leading-snug transition-colors" style={{ color: `#${p.color}` }}>
          {p.name}
        </h4>
        <span className="shrink-0 rounded-full border border-[var(--line)] px-2 py-0.5 text-[11px] text-[var(--text-faint)]">{p.score} 分</span>
      </div>
      <p className="mt-2 text-[13px] leading-relaxed text-[var(--text-dim)]">{p.tagline}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {p.tags.slice(0, 3).map((t) => (
          <span key={t} className="rounded-full border border-[var(--line)] px-2 py-0.5 text-[10px] text-[var(--text-faint)]">
            {t}
          </span>
        ))}
      </div>
    </Link>
  );
}
