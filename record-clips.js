// 录制演示视频片段：真实操作流（光标移动 + 平滑滚动 + 页面切换）
// 输出 webm → 由 assemble.js 转 mp4 并合成
const { chromium } = require("playwright-core");
const fs = require("fs");

const EXE = "C:\\Users\\18539\\AppData\\Local\\ms-playwright\\chromium-1234\\chrome-win64\\chrome.exe";
const OUT = "video-work";
fs.mkdirSync(OUT, { recursive: true });

async function glide(page, x, y, steps = 22) {
  await page.mouse.move(x, y, { steps });
}
async function smoothScroll(page, dy, ms = 1400) {
  await page.evaluate(
    ({ dy, ms }) =>
      new Promise((res) => {
        const y0 = window.scrollY;
        const t0 = performance.now();
        const tick = (t) => {
          const p = Math.min((t - t0) / ms, 1);
          const e = 1 - Math.pow(1 - p, 3);
          window.scrollTo(0, y0 + dy * e);
          p < 1 ? requestAnimationFrame(tick) : res();
        };
        requestAnimationFrame(tick);
      }),
    { dy, ms }
  );
}

(async () => {
  const browser = await chromium.launch({ executablePath: EXE });

  // ── 片段1：作品集网站导览 ──
  {
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 810 },
      recordVideo: { dir: OUT, size: { width: 1440, height: 810 } },
      storageState: {
        cookies: [],
        origins: [{ origin: "http://localhost:4173", localStorage: [{ name: "tour-seen-v1", value: "1" }] }],
      },
    });
    const page = await ctx.newPage();
    await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
    await page.waitForTimeout(2600);
    await glide(page, 720, 320);
    await page.waitForTimeout(900);
    await glide(page, 420, 545); // 速览按钮
    await page.waitForTimeout(700);
    await smoothScroll(page, 900, 1800); // 项目卡片区
    await page.waitForTimeout(800);
    await glide(page, 500, 380);
    await page.waitForTimeout(600);
    await smoothScroll(page, 1000, 2000);
    await page.waitForTimeout(700);
    // 悬停第一张卡（tilt 效果）
    await page.hover("a.tilt-card").catch(() => {});
    await glide(page, 400, 400, 10);
    await glide(page, 520, 460, 12);
    await page.waitForTimeout(1500);
    await smoothScroll(page, 1600, 2400); // 课程实战
    await page.waitForTimeout(900);
    await smoothScroll(page, 1600, 2400); // 研究专栏
    await page.waitForTimeout(900);
    await smoothScroll(page, 2200, 2600); // 关于+联系
    await page.waitForTimeout(1400);
    await ctx.close(); // 关闭才落盘
    console.log("clip1 done");
  }

  // ── 片段2：Resume Copilot 操作流 ──
  {
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 810 },
      recordVideo: { dir: OUT, size: { width: 1440, height: 810 } },
    });
    const page = await ctx.newPage();
    await page.goto("http://localhost:8080/", { waitUntil: "networkidle" }).catch(() => {});
    await page.waitForTimeout(3000);
    await glide(page, 700, 350);
    await page.waitForTimeout(800);
    // 输入示例问题（不发送，展示输入联想）
    await page.keyboard.type("帮我根据项目库定制简历", { delay: 90 }).catch(() => {});
    await page.waitForTimeout(1800);
    await glide(page, 130, 200); // 侧栏：项目库
    await page.click("text=项目库").catch(() => {});
    await page.waitForTimeout(2600);
    await smoothScroll(page, 700, 1800);
    await page.waitForTimeout(900);
    await glide(page, 130, 260); // 简历工坊
    await page.click("text=简历工坊").catch(() => {});
    await page.waitForTimeout(2600);
    await smoothScroll(page, 600, 1600);
    await page.waitForTimeout(800);
    await glide(page, 130, 320); // 模拟面试
    await page.click("text=模拟面试").catch(() => {});
    await page.waitForTimeout(3000);
    await glide(page, 700, 400);
    await page.waitForTimeout(800);
    await ctx.close();
    console.log("clip2 done");
  }

  // ── 片段3：AI Director 图谱操作 ──
  {
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 810 },
      recordVideo: { dir: OUT, size: { width: 1440, height: 810 } },
    });
    const page = await ctx.newPage();
    await page.goto("http://localhost:5173/projects/project-default/create/world", { waitUntil: "networkidle" });
    await page.waitForTimeout(6000);
    await glide(page, 900, 400);
    // 拖拽平移图谱
    await page.mouse.down();
    await glide(page, 700, 480, 25);
    await page.mouse.up();
    await page.waitForTimeout(900);
    // 滚轮缩放
    await page.mouse.move(900, 420);
    for (let i = 0; i < 4; i++) {
      await page.mouse.wheel(0, -240);
      await page.waitForTimeout(320);
    }
    await page.waitForTimeout(1200);
    // 切到概览
    await page.click("text=概览").catch(() => {});
    await page.waitForTimeout(3000);
    await smoothScroll(page, 500, 1600);
    await page.waitForTimeout(900);
    await ctx.close();
    console.log("clip3 done");
  }

  await browser.close();
  console.log(fs.readdirSync(OUT).join("\n"));
})();
