# 部署指南（Cloudflare Pages）

> ✅ **已上线：https://personal-portfolio-site-6zc.pages.dev** （生产分支 main，2026-09-29 首次部署）
> 仓库：https://github.com/lilmoon1314-cpu/personal_portfolio_site
> 更新流程：改内容 → `npm run build` → `npx wrangler pages deploy out --project-name=personal-portfolio-site --branch=main`

站点已配置为 Next.js 静态导出（`output: "export"`），构建产物在 `out/`，可部署到任何静态托管。

## 方式 A：Cloudflare Dashboard + Git（推荐，后续 push 自动部署）

1. 在 GitHub 创建仓库 `portfolio`（private 即可），然后：
   ```
   git remote add origin git@github.com:lilmoon1314-cpu/portfolio.git
   git push -u origin main
   ```
2. 打开 https://dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git
3. 选择 `portfolio` 仓库，构建设置：
   - Framework preset: **Next.js (Static HTML Export)**
   - Build command: `npx @cloudflare/next-on-pages@1` 不需要 —— 本站是纯静态导出，直接填：
     - Build command: `npm run build`
     - Build output directory: `out`
   - Node version: 环境变量加 `NODE_VERSION = 22`
4. Save and Deploy → 得到 `https://<项目名>.pages.dev`
5. （可选）自定义域名：Pages 项目 → Custom domains → 绑定你的域名（自动 HTTPS，无需备案）

## 方式 B：wrangler 直传（不连 Git，本地一键上传）

```
npx wrangler login
npx wrangler pages deploy out --project-name=ai-portfolio
```
首次会跳浏览器授权一次，之后可直接重复执行更新。

## 本地预览

```
npm run build
cd out && python -m http.server 4173   # 或 npx serve out
```

## 更新内容

改 `src/content/projects.ts`（项目数据全在这一个文件）→ `npm run build` → 重新部署即可。
素材：截图放 `public/shots/<slug>/`，视频放 `public/videos/`（生成管线见 capture-project.js / record-clips.js / assemble.js）。
