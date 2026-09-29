const { chromium } = require("playwright-core");
const EXE = "C:\\Users\\18539\\AppData\\Local\\ms-playwright\\chromium-1234\\chrome-win64\\chrome.exe";
(async () => {
  const browser = await chromium.launch({ executablePath: EXE });
  const errors = [];
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 },
    storageState: { cookies: [], origins: [{ origin: "http://localhost:4173", localStorage: [{ name: "tour-seen-v1", value: "1" }] }] } });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: "shots-site/final-home-hero.png" });
  await page.evaluate(() => document.querySelector("#demo")?.scrollIntoView());
  await page.waitForTimeout(1800);
  await page.screenshot({ path: "shots-site/final-video-section.png" });
  await page.goto("http://localhost:4173/projects/resume-copilot/", { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: "shots-site/final-copilot-hero.png" });
  await page.evaluate(() => document.querySelector("#shots")?.scrollIntoView());
  await page.waitForTimeout(1800);
  await page.screenshot({ path: "shots-site/final-copilot-gallery.png" });
  console.log("ERRORS:", errors.length ? errors.join("; ") : "none");
  await browser.close();
})();
