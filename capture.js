// 站点截图脚本 v3：禁用平滑滚动 + 渐进滚动触发动效 + 屏蔽首访气泡 + 整页截图前充分等待
const { chromium } = require("playwright-core");

const EXE = process.env.CHROME_PATH || "C:\\Users\\18539\\AppData\\Local\\ms-playwright\\chromium-1234\\chrome-win64\\chrome.exe";
const BASE = "http://localhost:4173";
const OUT = process.env.OUT_DIR || "shots-site";

async function scrollThrough(page) {
  // 注入：禁用 CSS 平滑滚动，避免 scrollTo 被动画打断
  await page.addStyleTag({ content: "html{scroll-behavior:auto!important}" });
  const ok = await page.evaluate(async () => {
    if (!("IntersectionObserver" in window)) return false;
    const h = document.body.scrollHeight;
    const step = Math.max(300, Math.floor(window.innerHeight * 0.6));
    for (let y = 0; y <= h; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 160));
    }
    window.scrollTo({ top: h, behavior: "instant" });
    await new Promise((r) => setTimeout(r, 700));
    window.scrollTo({ top: 0, behavior: "instant" });
    return true;
  });
  // 等所有 reveal 动画播完（0.7s + stagger）
  await page.waitForTimeout(ok ? 1600 : 400);
}

(async () => {
  const browser = await chromium.launch({ executablePath: EXE });
  const errors = [];
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    // 屏蔽「第一次来?」邀请气泡，避免遮挡截图内容
    storageState: {
      cookies: [],
      origins: [{ origin: BASE, localStorage: [{ name: "tour-seen-v1", value: "1" }] }],
    },
  });
  const page = await ctx.newPage();
  page.on("console", (m) => m.type() === "error" && errors.push("console: " + m.text()));
  page.on("pageerror", (e) => errors.push("pageerror: " + e.message));

  // 首页
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${OUT}/home-hero.png` });
  await scrollThrough(page);
  await page.screenshot({ path: `${OUT}/home-full.png`, fullPage: true });

  // 详情页（主力1）
  await page.goto(`${BASE}/projects/resume-copilot/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${OUT}/detail-copilot-hero.png` });
  await scrollThrough(page);
  await page.screenshot({ path: `${OUT}/detail-copilot-full.png`, fullPage: true });

  // 详情页（主力2）
  await page.goto(`${BASE}/projects/ai-director/`, { waitUntil: "networkidle" });
  await scrollThrough(page);
  await page.screenshot({ path: `${OUT}/detail-director-full.png`, fullPage: true });

  // 移动端（含菜单展开态）
  const mctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    storageState: {
      cookies: [],
      origins: [{ origin: BASE, localStorage: [{ name: "tour-seen-v1", value: "1" }] }],
    },
  });
  const mob = await mctx.newPage();
  await mob.goto(BASE, { waitUntil: "networkidle" });
  await mob.waitForTimeout(1200);
  await mob.screenshot({ path: `${OUT}/mobile-home.png` });
  await mob.click('button[aria-label="菜单"]');
  await mob.waitForTimeout(500);
  await mob.screenshot({ path: `${OUT}/mobile-menu.png` });
  await mob.click('button[aria-label="菜单"]');
  await scrollThrough(mob);
  await mob.screenshot({ path: `${OUT}/mobile-home-full.png`, fullPage: true });

  console.log("ERRORS:", errors.length ? errors.join("\n") : "none");
  await browser.close();
})();
