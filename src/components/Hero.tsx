"use client";

import { motion, useReducedMotion } from "framer-motion";
import { OWNER, HERO_STATS } from "@/content/projects";
import StatCounter from "@/components/StatCounter";

export default function Hero() {
  const reduce = useReducedMotion();
  const fade = (delay: number) => ({
    initial: reduce ? false : ({ opacity: 0, y: 30 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section id="top" className="relative flex min-h-[92vh] flex-col justify-center overflow-hidden pt-16">
      {/* 浮动光球 */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="orb absolute left-[8%] top-[18%] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.16),transparent_65%)] blur-2xl" />
        <div className="orb absolute right-[10%] top-[30%] h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.14),transparent_65%)] blur-2xl" style={{ animationDelay: "-4s" }} />
        <div className="orb absolute bottom-[8%] left-[38%] h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(129,140,248,0.12),transparent_65%)] blur-2xl" style={{ animationDelay: "-7s" }} />
      </div>

      <div className="mx-auto w-full max-w-6xl px-5">
        <motion.p {...fade(0)} className="mb-5 flex items-center gap-3 text-sm text-[var(--text-dim)]">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          {OWNER.title} · {OWNER.location}
        </motion.p>

        <motion.h1 {...fade(0.1)} className="max-w-4xl text-5xl font-bold leading-[1.12] tracking-tight md:text-7xl">
          把 AI 应用
          <br />
          做到<span className="grad-text">可被验证</span>
        </motion.h1>

        <motion.p {...fade(0.22)} className="mt-7 max-w-2xl text-lg leading-relaxed text-[var(--text-dim)]">
          {OWNER.intro}
          <br />
          <span className="text-[var(--text-faint)]">不是「我觉得效果不错」，而是评测报告怎么写。</span>
        </motion.p>

        <motion.div {...fade(0.34)} className="mt-10 flex flex-wrap items-center gap-4">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("start-tour"))}
            className="group relative overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold text-[#06121a]"
            style={{ background: "var(--grad)" }}
          >
            <span className="relative z-10">⚡ 3 分钟速览路线</span>
            <span className="shimmer-line absolute inset-0" aria-hidden />
          </button>
          <a
            href="#projects"
            className="rounded-full border border-[var(--line)] px-7 py-3.5 text-sm text-[var(--text-dim)] transition hover:border-white/25 hover:text-[var(--text)]"
          >
            自由探索 ↓
          </a>
        </motion.div>

        {/* 数字条 */}
        <motion.div {...fade(0.48)} className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-4">
          {HERO_STATS.map((s) => (
            <div key={s.label} className="bg-[#0a0b12]/90 px-6 py-5">
              <div className="text-2xl font-bold text-[var(--text)] md:text-3xl">
                <StatCounter value={s.value} />
              </div>
              <div className="mt-1 text-xs text-[var(--text-faint)]">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
