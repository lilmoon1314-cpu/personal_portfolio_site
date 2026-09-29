import Link from "next/link";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import ProjectsGrid, { CapabilityLegend } from "@/components/ProjectsGrid";
import { CompactCard } from "@/components/ProjectCard";
import { projects, OWNER } from "@/content/projects";

export default function Home() {
  const course = projects.filter((p) => p.category === "course");
  const research = projects.filter((p) => p.category === "research");
  const top = projects.find((p) => p.slug === "resume-copilot")!;

  return (
    <main>
      <Hero />

      {/* ── 主力项目 ── */}
      <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24">
        <Reveal>
          <p className="section-label">Featured Projects</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            主力项目 <span className="grad-text">· 先看这三个能力维度</span>
          </h2>
          <CapabilityLegend />
        </Reveal>
        <div className="mt-10">
          <ProjectsGrid />
        </div>
      </section>

      {/* ── 操作演示视频 ── */}
      <section id="demo" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24">
        <Reveal>
          <p className="section-label">Demo Video</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            81 秒<span className="grad-text"> · 看完整个作品集</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[var(--text-dim)]">
            一段真实操作的演示：从作品集网站的引导式浏览，到 Resume Copilot 的实际界面，再到 AI Director 的 194 节点知识图谱。
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <video
            controls
            preload="metadata"
            poster="/videos/overview-poster.jpg"
            src="/videos/overview.mp4"
            className="mt-10 w-full rounded-3xl border border-[var(--line)] shadow-2xl"
          />
        </Reveal>
      </section>

      {/* ── 课程实战 ── */}
      <section id="course" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24">
        <Reveal>
          <p className="section-label">Course Projects</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            课程实战 <span className="grad-text">· 每个项目都有评估数字</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[var(--text-dim)]">
            RAG、Agent、记忆系统、工具调用、经典 NLP——培训课程期间独立完成的实战工程，
            全部保留可复现的评估结果（RAGAS 指标、hit@k、F1、吞吐倍数）。
          </p>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {course.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <CompactCard p={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 研究专栏 ── */}
      <section id="research" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24">
        <Reveal>
          <p className="section-label">Research & Prototypes</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            研究专栏 <span className="grad-text">· 工程之外</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[var(--text-dim)]">
            评测方法论、产品定义与原型、独立小程序、架构研究——证明我不只会写代码。
          </p>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {research.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <CompactCard p={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 关于 ── */}
      <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24">
        <Reveal>
          <p className="section-label">About</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">我怎么做事</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              t: "先建裁判，再做功能",
              d: "在 Resume Copilot 里，评测体系先于第三个功能存在。52 条安全探针、45 份人工标注、22 份评估报告——我认为没有评测的 AI 功能是盲飞。",
            },
            {
              t: "范围换交付，边界写清楚",
              d: "每个 README 都明确「明确不做」清单：不真投递、不做共享部署、不隐藏未实测尺寸。面试考察的是决策质量，而非名词密度。",
            },
            {
              t: "从内容到平台的完整叙事",
              d: "AI_director 不只是代码：配套的真实影视项目库、架构教学页、生图资产构成「用平台做出真内容」的证据链。",
            },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-[var(--line)] bg-[var(--glass)] p-6">
                <h3 className="text-lg font-bold" style={{ color: "var(--cyan)" }}>
                  {c.t}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-dim)]">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 联系 ── */}
      <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-[var(--line)] p-10 text-center md:p-16" style={{ background: "linear-gradient(160deg, rgba(34,211,238,0.08), rgba(167,139,250,0.08))" }}>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              看完了吗？<span className="grad-text">聊聊你最感兴趣的那个</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] text-[var(--text-dim)]">
              每个项目都可以现场运行演示。如果时间有限，推荐从 {top.name} 开始——它最能说明我如何用工程手段解决 AI 的可信问题。
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={OWNER.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-full px-7 py-3 text-sm font-semibold text-[#06121a]"
                style={{ background: "var(--grad)" }}
              >
                GitHub · lilmoon1314-cpu
              </a>
              <Link
                href={`/projects/${top.slug}`}
                className="rounded-full border border-[var(--line)] px-7 py-3 text-sm text-[var(--text-dim)] transition hover:border-white/25 hover:text-[var(--text)]"
              >
                重看 {top.name} →
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-[var(--line)] py-8 text-center text-xs text-[var(--text-faint)]">
        © 2026 {OWNER.name} · {OWNER.title} · Built with Next.js · 部署于 Cloudflare Pages
      </footer>
    </main>
  );
}
