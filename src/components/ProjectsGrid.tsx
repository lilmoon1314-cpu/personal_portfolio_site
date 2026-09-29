"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, CAPABILITY_LABELS, type Capability } from "@/content/projects";
import ProjectCard from "@/components/ProjectCard";

const FILTERS: { key: Capability | "all"; label: string }[] = [
  { key: "all", label: "全部" },
  { key: "engineering", label: "工程与评测" },
  { key: "product", label: "产品与设计" },
  { key: "visual", label: "视觉与内容" },
];

export default function ProjectsGrid() {
  const [filter, setFilter] = useState<Capability | "all">("all");
  const mains = projects
    .filter((p) => p.category === "main")
    .filter((p) => filter === "all" || p.capabilities.includes(filter));

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className="relative rounded-full px-4 py-1.5 text-sm transition"
            style={
              filter === f.key
                ? { color: "#06121a", background: "var(--grad)", fontWeight: 600 }
                : { color: "var(--text-dim)", border: "1px solid var(--line)" }
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {mains.map((p, i) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
            >
              <ProjectCard p={p} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export function CapabilityLegend() {
  return (
    <p className="mt-4 text-xs text-[var(--text-faint)]">
      能力标签：{Object.values(CAPABILITY_LABELS).join(" / ")} —— 按你关注的能力维度筛选项目
    </p>
  );
}
