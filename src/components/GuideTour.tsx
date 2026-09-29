"use client";

import { useCallback, useEffect, useState } from "react";

// ── 用户引导路径：3 分钟速览导览 ──
// 面试官首次进入站点 → 右下角气泡邀请 → 聚光灯逐步导览 5 站 → 引导进入第一站项目详情
type Rect = { top: number; left: number; width: number; height: number };

const STEPS = [
  {
    target: "#top",
    title: "你好，我是刘晓月",
    desc: "AI 应用开发 / AI 产品工程师。这一页用 3 分钟带你看完我做过什么、做到了什么程度。",
  },
  {
    target: "#projects",
    title: "5 个主力项目",
    desc: "建议从 Resume Copilot 开始——它有最完整的工程证据链：144 个单测、零编造率的评测闭环。每个项目都可以点进「产品说明页」看细节。",
  },
  {
    target: "#course",
    title: "课程实战",
    desc: "8 个带量化评估的课程项目：RAG 年报问答、金融 ReAct Agent、Agent 记忆系统……每个都有可复现的评估数字。",
  },
  {
    target: "#research",
    title: "研究专栏",
    desc: "Agent 评测方法论、产品原型、小程序——工程之外的产品与研究能力佐证。",
  },
  {
    target: "#contact",
    title: "联系方式",
    desc: "如果某个项目引起了你的兴趣，欢迎联系我深入聊聊。导览结束 ↓",
  },
];

const SEEN_KEY = "tour-seen-v1";

export default function GuideTour() {
  const [active, setActive] = useState(false);
  const [step, setStep] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);
  const [bubble, setBubble] = useState(false);

  // 首访邀请气泡
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(SEEN_KEY)) return;
    const t = setTimeout(() => setBubble(true), 1600);
    return () => clearTimeout(t);
  }, []);

  const measure = useCallback(() => {
    const s = STEPS[step];
    const el = document.querySelector(s.target);
    if (!el) return setRect(null);
    const r = el.getBoundingClientRect();
    setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
  }, [step]);

  // 每步：滚动到目标并测量；滚动/缩放时跟随
  useEffect(() => {
    if (!active) return;
    const s = STEPS[step];
    const el = document.querySelector(s.target);
    if (el) {
      const r = el.getBoundingClientRect();
      const targetY = window.scrollY + r.top - 90;
      window.scrollTo({ top: Math.max(targetY, 0), behavior: "smooth" });
    }
    const t = setTimeout(measure, 450);
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [active, step, measure]);

  const start = () => {
    setBubble(false);
    localStorage.setItem(SEEN_KEY, "1");
    setStep(0);
    setActive(true);
  };
  const finish = () => {
    setActive(false);
    localStorage.setItem(SEEN_KEY, "1");
  };
  const next = () => (step < STEPS.length - 1 ? setStep(step + 1) : finish());

  useEffect(() => {
    const h = () => start();
    window.addEventListener("start-tour", h);
    return () => window.removeEventListener("start-tour", h);
  }, []);

  // 聚光灯 = 四块遮罩拼出挖孔
  const pad = 10;
  const hole = rect
    ? {
        top: rect.top - pad,
        left: rect.left - pad,
        width: rect.width + pad * 2,
        height: rect.height + pad * 2,
      }
    : null;
  const s = STEPS[step];
  const below = hole ? hole.top + hole.height + 180 < window.innerHeight : true;
  const tipStyle = hole
    ? below
      ? { top: hole.top + hole.height + 14, left: "50%", transform: "translateX(-50%)" }
      : { top: Math.max(hole.top - 178, 80), left: "50%", transform: "translateX(-50%)" }
    : { bottom: 120, left: "50%", transform: "translateX(-50%)" };

  return (
    <>
      {/* 首访邀请气泡 */}
      {bubble && !active && (
        <div className="fixed bottom-6 right-6 z-50 max-w-xs rounded-2xl border border-[var(--line)] bg-[#0d0e16]/95 p-5 shadow-2xl backdrop-blur">
          <p className="text-sm font-semibold">第一次来？</p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--text-dim)]">
            试试「3 分钟速览路线」，我会带你按最优顺序看完所有作品。
          </p>
          <div className="mt-4 flex gap-2">
            <button onClick={start} className="rounded-full px-4 py-1.5 text-sm font-semibold text-[#06121a]" style={{ background: "var(--grad)" }}>
              开始导览
            </button>
            <button
              onClick={() => {
                setBubble(false);
                localStorage.setItem(SEEN_KEY, "1");
              }}
              className="rounded-full border border-[var(--line)] px-4 py-1.5 text-sm text-[var(--text-faint)]"
            >
              跳过
            </button>
          </div>
        </div>
      )}

      {/* 导览层 */}
      {active && (
        <div className="fixed inset-0 z-50" role="dialog" aria-label="站点导览">
          {hole ? (
            <>
              <div className="absolute inset-x-0 top-0 bg-[#04050a]/78 backdrop-[2px]" style={{ height: Math.max(hole.top, 0) }} />
              <div className="absolute inset-x-0 bottom-0 bg-[#04050a]/78" style={{ top: hole.top + hole.height }} />
              <div className="absolute bg-[#04050a]/78" style={{ top: hole.top, height: hole.height, left: 0, width: Math.max(hole.left, 0) }} />
              <div className="absolute bg-[#04050a]/78" style={{ top: hole.top, height: hole.height, left: hole.left + hole.width, right: 0 }} />
              <div
                className="pointer-events-none absolute rounded-2xl border-2 transition-all duration-500"
                style={{
                  top: hole.top,
                  left: hole.left,
                  width: hole.width,
                  height: hole.height,
                  borderColor: "var(--cyan)",
                  boxShadow: "0 0 0 4px rgba(34,211,238,0.15), 0 0 44px rgba(34,211,238,0.28)",
                }}
              />
            </>
          ) : (
            <div className="absolute inset-0 bg-[#04050a]/78" />
          )}

          {/* 解说卡片 */}
          <div
            className="absolute left-1/2 w-[min(92vw,460px)] rounded-2xl border border-[var(--line)] bg-[#0d0e16]/97 p-5 shadow-2xl backdrop-blur"
            style={tipStyle}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[var(--text-faint)]">
                第 {step + 1} / {STEPS.length} 站
              </span>
              <div className="flex gap-1.5">
                {STEPS.map((_, i) => (
                  <span
                    key={i}
                    className="h-1.5 rounded-full transition-all"
                    style={{ width: i === step ? 18 : 6, background: i <= step ? "var(--cyan)" : "rgba(255,255,255,0.15)" }}
                  />
                ))}
              </div>
            </div>
            <h3 className="mt-2.5 text-lg font-bold">{s.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-dim)]">{s.desc}</p>
            <div className="mt-4 flex items-center justify-between">
              <button onClick={finish} className="text-sm text-[var(--text-faint)] hover:text-[var(--text)]">
                退出导览
              </button>
              <button onClick={next} className="rounded-full px-5 py-2 text-sm font-semibold text-[#06121a]" style={{ background: "var(--grad)" }}>
                {step < STEPS.length - 1 ? "下一站 →" : "完成 🎉"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
