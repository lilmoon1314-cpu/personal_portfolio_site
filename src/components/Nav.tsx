"use client";

import { useEffect, useState } from "react";
import { OWNER } from "@/content/projects";

const LINKS = [
  { href: "/#projects", label: "主力项目" },
  { href: "/#course", label: "课程实战" },
  { href: "/#research", label: "研究专栏" },
  { href: "/#about", label: "关于" },
  { href: "/#contact", label: "联系" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav-shell fixed inset-x-0 top-0 z-40 ${scrolled || open ? "scrolled" : ""}`}>
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="/#top" className="flex items-center gap-2.5">
          <span className="grad-text text-lg font-bold tracking-wide">{OWNER.name}</span>
          <span className="hidden text-xs text-[var(--text-faint)] sm:inline">AI Portfolio</span>
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-[var(--text-dim)] transition-colors hover:text-[var(--text)]">
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("start-tour"))}
            className="rounded-full border border-[var(--line)] bg-white/5 px-4 py-1.5 text-sm text-[var(--text)] transition hover:border-[var(--cyan)] hover:text-[var(--cyan)]"
          >
            ⚡ 3 分钟速览
          </button>
          <button
            aria-label="菜单"
            onClick={() => setOpen(!open)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-full border border-[var(--line)] md:hidden"
          >
            <span className="h-0.5 w-4 bg-[var(--text)] transition-transform" style={open ? { transform: "translateY(3px) rotate(45deg)" } : undefined} />
            <span className="h-0.5 w-4 bg-[var(--text)] transition-transform" style={open ? { transform: "translateY(-3px) rotate(-45deg)" } : undefined} />
          </button>
        </div>
      </nav>
      {/* 移动端菜单 */}
      {open && (
        <div className="border-t border-[var(--line)] bg-[#0a0b12]/97 px-5 py-3 backdrop-blur md:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm text-[var(--text-dim)] transition hover:bg-white/5 hover:text-[var(--text)]"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
