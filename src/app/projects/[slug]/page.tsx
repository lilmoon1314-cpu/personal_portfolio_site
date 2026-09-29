import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/content/projects";
import Reveal from "@/components/Reveal";
import Shot from "@/components/DetailShot";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  return { title: p ? `${p.name} · 刘晓月的作品集` : "项目详情" };
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const next = getProject(p.next);
  const accent = `#${p.color}`;

  return (
    <main className="detail-hero-band" style={{ "--accent": accent } as React.CSSProperties}>
      {/* ── Hero 区 ── */}
      <section className="mx-auto max-w-6xl px-5 pb-14 pt-28">
        <Reveal>
          <div className="flex items-center justify-between">
            <Link href="/#projects" className="text-sm text-[var(--text-dim)] transition hover:text-[var(--text)]">
              ← 返回全部项目
            </Link>
            <span className="chip" style={{ color: accent, borderColor: `${accent}44` }}>
              <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
              {p.status}
            </span>
          </div>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <p className="section-label">
                {p.category === "main" ? "Featured Project" : p.category === "course" ? "Course Project" : "Research"}
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">{p.name}</h1>
              <p className="mt-4 text-lg leading-relaxed text-[var(--text-dim)]">{p.tagline}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>

              <dl className="mt-7 grid grid-cols-3 gap-4 text-sm">
                <div>
                  <dt className="text-xs text-[var(--text-faint)]">我的角色</dt>
                  <dd className="mt-1 leading-snug">{p.role}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[var(--text-faint)]">周期</dt>
                  <dd className="mt-1">{p.period}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[var(--text-faint)]">规模</dt>
                  <dd className="mt-1">{p.scale}</dd>
                </div>
              </dl>

              <div className="mt-7 flex flex-wrap gap-3">
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-[var(--line)] px-5 py-2.5 text-sm transition hover:border-white/30"
                  >
                    GitHub 仓库 ↗
                  </a>
                )}
                <a href="#detail" className="rounded-full px-5 py-2.5 text-sm font-semibold text-[#06121a]" style={{ background: `linear-gradient(120deg, ${accent}, #818cf8)` }}>
                  阅读项目说明 ↓
                </a>
              </div>
            </div>

            {/* 主视觉：截图（缺素材时优雅降级） */}
            <Shot
              src={p.shots[0] || undefined}
              alt={`${p.name} 界面截图`}
              accent={accent}
              label={`${p.name} · 演示截图采集中`}
              className="aspect-[16/10] w-full shadow-2xl"
            />
          </div>

          {/* 指标 chips */}
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-3 lg:grid-cols-6">
            {p.metrics.map((m) => (
              <div key={m.label} className="bg-[#0a0b12]/90 px-4 py-4 text-center">
                <div className="text-lg font-bold" style={{ color: accent }}>
                  {m.value}
                </div>
                <div className="mt-1 text-[11px] leading-tight text-[var(--text-faint)]">{m.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── 正文叙述 ── */}
      <section id="detail" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-14">
        <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
          {/* 粘性目录（桌面） */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-1">
              <p className="mb-3 text-xs uppercase tracking-widest text-[var(--text-faint)]">本页目录</p>
              {p.sections.map((s) => (
                <a key={s.id} href={`#${s.id}`} className="block rounded-lg px-3 py-1.5 text-sm text-[var(--text-dim)] transition hover:bg-white/5 hover:text-[var(--text)]">
                  {s.title}
                </a>
              ))}
              {p.decisions && (
                <a href="#decisions" className="block rounded-lg px-3 py-1.5 text-sm text-[var(--text-dim)] transition hover:bg-white/5 hover:text-[var(--text)]">
                  难点与取舍
                </a>
              )}
              {p.roadmap && (
                <a href="#roadmap" className="block rounded-lg px-3 py-1.5 text-sm text-[var(--text-dim)] transition hover:bg-white/5 hover:text-[var(--text)]">
                  路线图
                </a>
              )}
            </div>
          </aside>

          <div className="min-w-0 space-y-20">
            {p.summary && (
              <Reveal>
                <blockquote className="border-l-2 pl-6 text-xl font-medium leading-relaxed" style={{ borderColor: accent }}>
                  {p.summary}
                </blockquote>
              </Reveal>
            )}

            {p.sections.map((s) => (
              <Reveal key={s.id}>
                <div id={s.id} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold tracking-tight md:text-[28px]">
                    <span className="mr-3 font-mono text-sm" style={{ color: accent }}>
                      §
                    </span>
                    {s.title}
                  </h2>
                  <div className="mt-5 space-y-4">
                    {s.paras.map((t, i) => (
                      <p key={i} className="max-w-3xl text-[15px] leading-[1.9] text-[var(--text-dim)]">
                        {t}
                      </p>
                    ))}
                  </div>
                  {s.bullets && (
                    <ul className="mt-5 space-y-2.5">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex max-w-3xl gap-3 text-[15px] leading-relaxed text-[var(--text-dim)]">
                          <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent }} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.metrics && (
                    <div className="mt-6 flex flex-wrap gap-2.5">
                      {s.metrics.map((m) => (
                        <span key={m.label} className="chip">
                          <b style={{ color: accent }}>{m.value}</b> {m.label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}

            {/* 操作演示视频 */}
            {p.video && (
              <Reveal>
                <div id="demo" className="scroll-mt-24">
                  <h2 className="text-2xl font-bold tracking-tight">
                    <span className="mr-3 font-mono text-sm" style={{ color: accent }}>
                      §
                    </span>
                    操作演示
                  </h2>
                  <video
                    controls
                    preload="metadata"
                    poster={`/videos/${p.slug}-poster.jpg`}
                    src={p.video}
                    className="mt-6 w-full rounded-2xl border border-[var(--line)] shadow-2xl"
                  />
                </div>
              </Reveal>
            )}

            {/* 界面速览画廊 */}
            {p.shots.length > 1 && (
              <Reveal>
                <div id="shots" className="scroll-mt-24">
                  <h2 className="text-2xl font-bold tracking-tight">
                    <span className="mr-3 font-mono text-sm" style={{ color: accent }}>
                      §
                    </span>
                    界面速览
                  </h2>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {p.shots.slice(1).map((s, i) => (
                      <Shot key={s} src={s} alt={`${p.name} 界面 ${i + 2}`} accent={accent} label={`${p.name}`} className="aspect-[16/10] w-full" />
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            {/* 难点与取舍 */}
            {p.decisions && (
              <Reveal>
                <div id="decisions" className="scroll-mt-24">
                  <h2 className="text-2xl font-bold tracking-tight">
                    <span className="mr-3 font-mono text-sm" style={{ color: accent }}>
                      §
                    </span>
                    难点与取舍
                  </h2>
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {p.decisions.map((d) => (
                      <div key={d.title} className="rounded-2xl border border-[var(--line)] bg-[var(--glass)] p-6">
                        <h3 className="font-semibold" style={{ color: accent }}>
                          {d.title}
                        </h3>
                        <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-dim)]">{d.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            {/* 路线图 */}
            {p.roadmap && (
              <Reveal>
                <div id="roadmap" className="scroll-mt-24">
                  <h2 className="text-2xl font-bold tracking-tight">
                    <span className="mr-3 font-mono text-sm" style={{ color: accent }}>
                      §
                    </span>
                    接下来
                  </h2>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {p.roadmap.map((r) => (
                      <span key={r} className="chip">
                        <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* ── 下一站（引导链） ── */}
      {next && (
        <section className="mx-auto max-w-6xl px-5 pb-24">
          <Reveal>
            <Link
              href={`/projects/${next.slug}`}
              className="group block overflow-hidden rounded-3xl border border-[var(--line)] p-8 transition hover:border-white/25 md:p-10"
              style={{ background: `linear-gradient(120deg, #${next.color}14, transparent 60%)` }}
            >
              <p className="text-xs uppercase tracking-widest text-[var(--text-faint)]">导览路线 · 下一站</p>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold transition-colors" style={{ color: `#${next.color}` }}>
                    {next.name}
                  </h3>
                  <p className="mt-1.5 text-sm text-[var(--text-dim)]">{next.tagline}</p>
                </div>
                <span className="text-3xl transition-transform group-hover:translate-x-2" style={{ color: `#${next.color}` }}>
                  →
                </span>
              </div>
            </Link>
          </Reveal>
        </section>
      )}

      <footer className="border-t border-[var(--line)] py-8 text-center text-xs text-[var(--text-faint)]">
        © 2026 刘晓月 · AI 作品集 · <Link href="/" className="hover:text-[var(--text)]">返回首页</Link>
      </footer>
    </main>
  );
}
