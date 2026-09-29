// 视频合成：webm 片段 + PNG 标题卡 → mp4（h264, 1440x810, 30fps）
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const FF = require("ffmpeg-static");
const W = "video-work";
const OUTDIR = "public/videos";
fs.mkdirSync(OUTDIR, { recursive: true });

// 按修改时间排序 webm：clip1=site, clip2=copilot, clip3=director
const clips = fs
  .readdirSync(W)
  .filter((f) => f.endsWith(".webm"))
  .map((f) => ({ f, t: fs.statSync(path.join(W, f)).mtimeMs }))
  .sort((a, b) => a.t - b.t)
  .map((x) => path.join(W, x.f));
if (clips.length !== 3) throw new Error("expect 3 clips, got " + clips.length);
const [site, copilot, director] = clips;

function run(args) {
  execFileSync(FF, args, { stdio: ["pipe", "pipe", "pipe"] });
}
function log(s) {
  console.log(s);
}

// 片段规格：h264 / yuv420p / 30fps / 1440x810，首尾淡入淡出
function segFromVideo(src, out, maxDur, fadeOutAt) {
  run([
    "-y", "-i", src,
    "-t", String(maxDur),
    "-vf", `scale=1440:810:force_original_aspect_ratio=decrease,pad=1440:810:(ow-iw)/2:(oh-ih)/2,fps=30,format=yuv420p,fade=t=in:st=0:d=0.5,fade=t=out:st=${fadeOutAt}:d=0.5`,
    "-an", "-c:v", "libx264", "-preset", "veryfast", "-crf", "25",
    out,
  ]);
  log("seg " + out);
}
function segFromImage(img, out, dur) {
  run([
    "-y", "-loop", "1", "-i", img,
    "-t", String(dur),
    "-vf", `scale=1440:810,fps=30,format=yuv420p,fade=t=in:st=0:d=0.45,fade=t=out:st=${(dur - 0.45).toFixed(2)}:d=0.45`,
    "-an", "-c:v", "libx264", "-preset", "veryfast", "-crf", "24",
    out,
  ]);
  log("seg " + out);
}

function concat(list, out) {
  const lst = path.join(W, "list.txt");
  fs.writeFileSync(lst, list.map((f) => `file '${path.resolve(f).replace(/\\/g, "/")}'`).join("\n"));
  run(["-y", "-f", "concat", "-safe", "0", "-i", lst, "-c", "copy", "-movflags", "+faststart", out]);
  log("made " + out + " (" + Math.round(fs.statSync(out).size / 1024) + " KB)");
}

// ── 1) 项目短片（标题卡 2.6s + 片段 26s）──
segFromImage(`${W}/card-copilot.png`, `${W}/s-copilot-card.mp4`, 2.6);
segFromVideo(copilot, `${W}/s-copilot.mp4`, 26, 25.4);
concat([`${W}/s-copilot-card.mp4`, `${W}/s-copilot.mp4`], `${OUTDIR}/resume-copilot.mp4`);

segFromImage(`${W}/card-director.png`, `${W}/s-director-card.mp4`, 2.6);
segFromVideo(director, `${W}/s-director.mp4`, 26, 25.4);
concat([`${W}/s-director-card.mp4`, `${W}/s-director.mp4`], `${OUTDIR}/ai-director.mp4`);

// ── 2) 总览片：开场卡 + 网站片段 + 项目卡×2 + 精简片段 + 结尾卡 ──
segFromImage(`${W}/card-open.png`, `${W}/o-open.mp4`, 3.2);
segFromVideo(site, `${W}/o-site.mp4`, 34, 33.4);
segFromImage(`${W}/card-site.png`, `${W}/o-card-site.mp4`, 2.4);
segFromImage(`${W}/card-end.png`, `${W}/o-end.mp4`, 3.4);
concat(
  [
    `${W}/o-open.mp4`,
    `${W}/o-card-site.mp4`,
    `${W}/o-site.mp4`,
    `${W}/s-copilot-card.mp4`,
    `${W}/s-copilot.mp4`,
    `${W}/s-director-card.mp4`,
    `${W}/s-director.mp4`,
    `${W}/o-end.mp4`,
  ],
  `${OUTDIR}/overview.mp4`
);

// 海报帧
run(["-y", "-i", `${OUTDIR}/overview.mp4`, "-ss", "6", "-frames:v", "1", "-q:v", "3", `${OUTDIR}/overview-poster.jpg`]);
log("poster done");
console.log("ALL DONE");
