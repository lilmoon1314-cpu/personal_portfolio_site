// 生成视频标题卡：HTML → PNG（1440x810）
const { chromium } = require("playwright-core");
const fs = require("fs");

const EXE = "C:\\Users\\18539\\AppData\\Local\\ms-playwright\\chromium-1234\\chrome-win64\\chrome.exe";
const OUT = "video-work";
fs.mkdirSync(OUT, { recursive: true });

const BASE_CSS = `
  <style>
    * { margin: 0; padding: 0; }
    body {
      width: 1440px; height: 810px; overflow: hidden;
      background:
        radial-gradient(900px 520px at 15% -10%, rgba(34,211,238,0.16), transparent 60%),
        radial-gradient(800px 480px at 88% 110%, rgba(167,139,250,0.14), transparent 60%),
        #07070c;
      color: #e8eaf0;
      font-family: -apple-system, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
      display: flex; flex-direction: column; justify-content: center; padding: 0 110px;
      box-sizing: border-box;
    }
    .kicker { font-size: 22px; letter-spacing: 0.5em; color: #6b7280; margin-bottom: 34px; }
    h1 { font-size: 92px; font-weight: 800; letter-spacing: 2px; line-height: 1.15; }
    h2 { font-size: 64px; font-weight: 800; margin-bottom: 26px; }
    .grad {
      background: linear-gradient(120deg, #22d3ee, #818cf8 55%, #a78bfa);
      -webkit-background-clip: text; background-clip: text; color: transparent;
    }
    .sub { font-size: 28px; color: #9aa3b2; margin-top: 30px; line-height: 1.7; }
    .chip {
      display: inline-block; margin-top: 46px; padding: 12px 30px; border-radius: 999px;
      border: 1px solid rgba(255,255,255,0.14); color: #9aa3b2; font-size: 20px;
    }
    .num { font-size: 24px; color: #22d3ee; letter-spacing: 0.3em; margin-bottom: 18px; }
    .line { width: 120px; height: 4px; border-radius: 2px; margin-top: 46px;
      background: linear-gradient(90deg, #22d3ee, #a78bfa); }
  </style>`;

const CARDS = [
  {
    name: "card-open",
    html: `<div class="kicker">PORTFOLIO DEMO</div>
      <h1>刘晓月 <span class="grad">AI 作品集</span></h1>
      <p class="sub">操作演示 · 一次看完 5 个主力项目与整个作品集网站<br/>工程与评测 · 产品与设计 · 视觉与内容</p>
      <span class="chip">github.com/lilmoon1314-cpu</span><div class="line"></div>`,
  },
  {
    name: "card-site",
    html: `<div class="num">01</div>
      <h2><span class="grad">作品集网站</span> · 引导式浏览</h2>
      <p class="sub">3 分钟速览路线 · 卡片 3D 悬停 · 滚动叙事 · 每个项目都是一页产品说明</p><div class="line"></div>`,
  },
  {
    name: "card-copilot",
    html: `<div class="num">02</div>
      <h2>Resume Copilot</h2>
      <p class="sub">RAG + 自研 ReAct Agent 的求职全流程助手<br/>144/144 单测 · 简历数字编造率 0% · Docker 已上线</p><div class="line"></div>`,
  },
  {
    name: "card-director",
    html: `<div class="num">03</div>
      <h2>AI Director</h2>
      <p class="sub">影视多智能体协作平台 · 知识图谱 194 节点 208 关系<br/>8.5 万行代码 · 19/20 产品验收通过</p><div class="line"></div>`,
  },
  {
    name: "card-end",
    html: `<div class="kicker">THANK YOU</div>
      <h1><span class="grad">看完了吗？</span></h1>
      <p class="sub">每个项目都可以现场运行演示<br/>所有代码与评测报告都在 GitHub</p>
      <span class="chip">github.com/lilmoon1314-cpu</span><div class="line"></div>`,
  },
];

(async () => {
  const browser = await chromium.launch({ executablePath: EXE });
  const page = await browser.newPage({ viewport: { width: 1440, height: 810 } });
  for (const c of CARDS) {
    await page.setContent(`<!DOCTYPE html><html><head><meta charset="utf-8">${BASE_CSS}</head><body>${c.html}</body></html>`);
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${OUT}/${c.name}.png` });
    console.log("card:", c.name);
  }
  await browser.close();
})();
