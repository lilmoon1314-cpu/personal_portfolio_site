// 通用项目截图脚本：node capture-project.js <slug> <spec.json路径>
// spec: [{ "name": "cover", "url": "http://...", "wait": 2500, "click": "text=简历", "scroll": true }]
const { chromium } = require("playwright-core");
const fs = require("fs");
const path = require("path");

const EXE = "C:\\Users\\18539\\AppData\\Local\\ms-playwright\\chromium-1234\\chrome-win64\\chrome.exe";
const [slug, specFile] = process.argv.slice(2);
const spec = JSON.parse(fs.readFileSync(specFile, "utf8"));
const OUT = path.join("public", "shots", slug);
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch({ executablePath: EXE });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 });
  const log = [];
  for (const step of spec) {
    try {
      await page.goto(step.url, { waitUntil: "networkidle", timeout: 30000 });
    } catch {
      await page.waitForTimeout(3000); // SPA 持续轮询时 networkidle 可能超时，容忍
    }
    await page.waitForTimeout(step.wait ?? 2000);
    if (step.click) {
      try {
        await page.click(step.click, { timeout: 5000 });
        await page.waitForTimeout(step.waitAfterClick ?? 2500);
      } catch (e) {
        log.push(`CLICK-FAIL ${step.name}: ${step.click}`);
      }
    }
    if (step.type) {
      try {
        await page.fill(step.type.selector, step.type.text, { timeout: 5000 });
        await page.waitForTimeout(800);
      } catch {
        log.push(`TYPE-FAIL ${step.name}`);
      }
    }
    if (step.fullpage) {
      await page.evaluate(async () => {
        const h = document.body.scrollHeight;
        for (let y = 0; y <= h; y += 400) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 80));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(600);
    }
    await page.screenshot({ path: path.join(OUT, `${step.name}.jpg`), type: "jpeg", quality: 82, fullPage: !!step.fullpage });
    log.push(`OK ${step.name}`);
  }
  await browser.close();
  console.log(log.join("\n"));
})();
