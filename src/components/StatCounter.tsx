"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

// 数字滚动：SSR 直出最终值（SEO/无 JS 场景完整），进入视口且允许动效时才从 0 滚动
export default function StatCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const [played, setPlayed] = useState(false);
  const match = value.match(/^([\d,]+)(.*)$/);

  useEffect(() => {
    if (!inView || !match || reduce || played) {
      if (inView) setPlayed(true);
      return;
    }
    setPlayed(true);
    const target = parseInt(match[1].replace(/,/g, ""), 10);
    const suffix = match[2];
    const dur = 1100;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = Math.round(target * eased);
      setDisplay(cur.toLocaleString("en-US") + suffix);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value, match, played]);

  return <span ref={ref}>{display}</span>;
}
