// 作品集内容数据 —— 全站唯一内容源
// category: main=主力项目(完整详情页) course=课程实战 research=研究专栏
export type Category = "main" | "course" | "research";
export type Capability = "engineering" | "product" | "visual";

export interface MetricChip {
  label: string;
  value: string;
}
export interface SectionBlock {
  id: string;
  title: string;
  paras: string[];
  bullets?: string[];
  image?: string;
  metrics?: MetricChip[];
}
export interface Project {
  slug: string;
  name: string; // 展示名
  folder: string; // 实际目录名
  tagline: string; // 一句话价值
  category: Category;
  capabilities: Capability[];
  tags: string[];
  score: number; // 汇总评分
  status: string;
  role: string;
  period: string;
  scale: string;
  stack: string[];
  color: string; // 卡片主题色 (hex, 无#)
  cover: string; // /shots/xxx/cover.jpg（构建时由素材管线生成；缺省用渐变占位）
  shots: string[];
  video?: string;
  github?: string;
  live?: string;
  metrics: MetricChip[];
  summary: string; // 卡片与详情页导语
  sections: SectionBlock[];
  decisions?: { title: string; desc: string }[];
  roadmap?: string[];
  next: string; // 引导链下一站 slug
  featured?: boolean;
}

export const OWNER = {
  name: "刘晓月",
  title: "AI 应用开发 / AI 产品工程师",
  intro:
    "做 AI 应用，也负责把 AI 应用做到可信：从 RAG、Agent、工作流编排到评测体系，我用测试和量化数据证明每一次模型调用的价值。",
  location: "中国 · 北京",
  email: "联系我 · 见页末微信/邮箱",
  github: "https://github.com/lilmoon1314-cpu",
};

export const HERO_STATS: MetricChip[] = [
  { label: "作品项目", value: "17" },
  { label: "源码行数", value: "96,000+" },
  { label: "自动化测试", value: "144+" },
  { label: "评测报告", value: "22+" },
];

export const CAPABILITY_LABELS: Record<Capability, string> = {
  engineering: "工程与评测",
  product: "产品与设计",
  visual: "视觉与内容",
};

export const projects: Project[] = [
  // ───────────────────────────── 主力 1 ─────────────────────────────
  {
    slug: "resume-copilot",
    name: "Resume Copilot",
    folder: "dsh_learn",
    tagline: "基于项目知识库 RAG + 自研 ReAct Agent 的求职全流程助手",
    category: "main",
    capabilities: ["engineering", "product"],
    tags: ["RAG", "ReAct Agent", "NestJS", "React", "评测体系", "Docker"],
    score: 84,
    status: "本地 Docker 上线运行",
    role: "独立开发者（产品定义 / 全栈实现 / 评测体系）",
    period: "2026.08 — 至今",
    scale: "24,239 行 · 201 文件 · 4 大功能模块",
    stack: ["NestJS 10", "Prisma", "Qdrant", "React 18", "Vite", "Tailwind", "Zustand", "TanStack Query", "Docker", "nginx+SSE"],
    color: "22d3ee",
    cover: "/shots/resume-copilot/cover.jpg",
    shots: [
    "/shots/resume-copilot/cover.jpg",
    "/shots/resume-copilot/cover.jpg",
    "/shots/resume-copilot/workbench.jpg",
    "/shots/resume-copilot/projects.jpg",
    "/shots/resume-copilot/resume.jpg",
    "/shots/resume-copilot/interview.jpg",
    "/shots/resume-copilot/learning.jpg",
  ],
    video: "/videos/resume-copilot.mp4",
    github: "https://github.com/lilmoon1314-cpu/Resume-Copilot",
    metrics: [
      { label: "单元测试", value: "144/144" },
      { label: "简历数字编造率", value: "0%" },
      { label: "有出处数字", value: "82/82" },
      { label: "检索延迟 P99", value: "264ms" },
      { label: "面试评分一致性", value: "ρ=0.891" },
      { label: "错误档案闭环", value: "26 条" },
    ],
    summary:
      "不是「帮你写简历」，而是「从你的真实项目里提取最有说服力的部分」：所有写入简历的数字经过工具层机器校验，无出处数字一律拒收。我先建评测体系，再让功能在数据面前接受审判。",
    sections: [
      {
        id: "problem",
        title: "问题：AI 写简历的最大风险不是写得差，而是编得像",
        paras: [
          "求职者最痛的不是简历模板，而是把自己做过的项目讲不清楚、讲不出数字。直接让 LLM 润色简历，输出看似专业，但数字、指标、技术细节全靠模型编造——面试官一追问就穿帮，这比写得平庸危险得多。",
          "我的切入点：把「我做过什么」沉淀为可检索的项目知识库，让模型只允许引用知识库里有出处的内容，并用工程手段强制执行这条规则。",
        ],
      },
      {
        id: "solution",
        title: "方案：知识库 RAG + 自研 ReAct 引擎 + 机器门禁",
        paras: [
          "上传项目文档后建立 Qdrant 向量知识库；四大功能（简历生成 / 学习路径 / 模拟面试 / 投递预览）由自研 ReAct 引擎驱动：模型自主思考、选择工具、执行并收敛。",
          "核心差异化是「可信度工程」：写入简历的每一个数字都必须携带知识库出处，工具层拒收无出处数字——编造率从机制上归零，而不是靠 prompt 恳求。",
        ],
        metrics: [
          { label: "业务模块", value: "11 个" },
          { label: "Agent 引擎", value: "自研 ReAct" },
          { label: "向量库", value: "Qdrant" },
          { label: "实时通信", value: "SSE" },
        ],
      },
      {
        id: "evals",
        title: "评测体系：先建裁判，再做功能",
        paras: [
          "四层评测体系覆盖业务、系统能力、安全、模型横评：52 条探针（幻觉 10 / 注入 12 / 隐私 10 / 合规 20）、45 份人工标注面试答案、15 份简历评分样本，产出 22 份评估报告。",
          "评估发现问题 → 定位根因 → 修复 → 复测转绿的完整闭环沉淀为 26 条错误档案。跨 5 个模型的红线筛选让编造率越线的模型直接出局。",
        ],
        bullets: [
          "简历评估：FR 编造率 0.000，82/82 数字可溯源",
          "面试评估：跨评分者一致性 ρ=0.891（基于 45 份黄金标注）",
          "安全评估：幻觉 / 提示注入 / 隐私泄露 / 合规四组探针全部通过",
          "性能评估：本机 P99 264ms，SQLite 只读 4,700+ RPS",
        ],
      },
      {
        id: "engineering",
        title: "工程化：从代码到上线生效",
        paras: [
          "pnpm monorepo 三包结构（api / web / shared zod 契约）；Docker 三阶段多阶段构建，nginx 托管前端并反代 SSE；配套只读「上线生效性复核」脚本，避免「代码已合并但没上线」被误判为功能缺陷。",
          "16 个 spec 单测文件 144/144 通过；10 份模块测试文档 + 15 个可执行测试脚本（冒烟 / 压测 / 故障注入 / 生产复核）。",
        ],
      },
      {
        id: "limits",
        title: "诚实的边界",
        paras: [
          "最大的缺口在用户侧证据：没有真实用户与访谈，用「自用工具 + 补救计划」的诚实框架处理。投递模块刻意只保留 preview / mock——外部不可逆动作必须预览，这本身是产品敬畏心，也是安全红线。",
        ],
      },
    ],
    decisions: [
      { title: "为什么自研 ReAct 而不用框架", desc: "需要把 token 记账、工具白名单、出处校验收口在引擎层，框架的黑盒扩展点满足不了机器门禁的可审计要求。" },
      { title: "为什么投递模块不真投", desc: "外部不可逆动作必须 preview/mock。面试考察的是决策质量而非规模，把时间预算押在评测体系上。" },
    ],
    roadmap: ["前端浏览器自动化回归", "简历导出多模板", "知识库增量更新策略"],
    next: "ai-director",
    featured: true,
  },

  // ───────────────────────────── 主力 2 ─────────────────────────────
  {
    slug: "ai-director",
    name: "AI Director",
    folder: "AI_director",
    tagline: "影视多智能体协作平台：一个世界模型，驱动从设定到分镜的创作流",
    category: "main",
    capabilities: ["engineering", "visual", "product"],
    tags: ["多智能体", "FastAPI", "React", "AntV G6", "知识图谱", "数据血缘"],
    score: 79,
    status: "V4 R6 完成 · 19/20 验收通过",
    role: "架构设计 / 全栈实现 / 领域建模",
    period: "2026.09 — 至今",
    scale: "85,000+ 行 · 前后端 + 四级测试",
    stack: ["Python 3.12", "FastAPI", "SQLAlchemy async", "Alembic", "React 18", "TypeScript", "Zustand", "AntV G6 v5", "three.js", "Tailwind 4", "Playwright"],
    color: "a78bfa",
    cover: "/shots/ai-director/cover.jpg",
    shots: [
    "/shots/ai-director/cover.jpg",
    "/shots/ai-director/cover.jpg",
    "/shots/ai-director/graph.jpg",
    "/shots/ai-director/workbench-overview.jpg",
    "/shots/ai-director/story.jpg",
    "/shots/ai-director/assets.jpg",
  ],
    video: "/videos/ai-director.mp4",
    github: "https://github.com/lilmoon1314-cpu/AI-director",
    metrics: [
      { label: "产品验收", value: "19/20" },
      { label: "后端代码", value: "42,269 行" },
      { label: "领域模块", value: "19 个" },
      { label: "原子技能域", value: "10 个" },
      { label: "测试层级", value: "4 级" },
      { label: "用户旅程截图", value: "41 张" },
    ],
    summary:
      "长剧动漫开发的完整工作台：agent / lineage / timeline / production / workflow 等 19 个领域模块，10 个带 schema 与校验器的原子技能域，用数据血缘管理每一次修订，用白模预演验证每一场戏。",
    sections: [
      {
        id: "problem",
        title: "问题：AI 生成内容的失控，根源是缺少「世界状态」",
        paras: [
          "用 LLM 做长篇影视创作，最大的问题不是单次生成质量，而是一致性：人物设定前后矛盾、修订无法追溯、场景与镜头对不上账。散点式调用模型永远解决不了这个问题。",
          "AI_director 的答案是把创作对象建模为一个持续演化的世界模型（人物、门派、功法、事件、概念与 208 条关系），所有生成与修订都发生在同一个事实源之上。",
        ],
      },
      {
        id: "solution",
        title: "方案：模块化单体 + 数据血缘 + 白模预演",
        paras: [
          "后端 FastAPI 模块化单体：agent（22 个文件）、lineage（血缘 8 个）、timeline、production、workflow 等 19 个领域模块，SQLAlchemy async + Alembic 迁移。",
          "skills/ 下 10 个原子技能域（audience / continuity / dialogue / performance / production / requirement / scene / screenplay / shot / story），每个技能域都有 prompt、skill.yaml、输入输出 JSON Schema 与 validators.py——模型输出先过校验器再入库。",
          "前端 React 18 + Zustand + AntV G6 v5 知识图谱 + three.js：图谱视图、导演工作台、时间线工作台、制作工作台、资产库、导入中心 11 个视图。",
        ],
        metrics: [
          { label: "前端视图", value: "11 个" },
          { label: "技能域", value: "10 个" },
          { label: "架构测试", value: "有" },
          { label: "e2e", value: "Playwright" },
        ],
      },
      {
        id: "lineage",
        title: "数据血缘：同一帧如何同步",
        paras: [
          "任何实体修订（如 ScriptBlock B42 rev6 → rev7）都会沿血缘图传播：受影响的镜头、分镜、预演资产被标记与重算，创作者能明确知道「改一处，动哪些」。配套的架构教学页把这套机制做成了可交互动画。",
          "真实项目《行歌》第一集作为案例：从故事草案、八子人物设定、分集剧本到生图计划与白模导出，全程在平台内完成闭环。",
        ],
      },
      {
        id: "quality",
        title: "质量：验收状态机驱动开发",
        paras: [
          "feature_list.json 定义 F01–F20 共 20 个产品级验收项（含证据要求），当前 19 项 passing。后端 pytest 分 unit / integration / e2e / architecture 四级标记，架构测试约束模块依赖方向；前端 vitest + MSW + Playwright e2e。",
        ],
      },
    ],
    decisions: [
      { title: "为什么模块化单体而不是微服务", desc: "单机创作工具，边界清晰比分布式叙事更重要；19 个模块的依赖方向由架构测试强制约束。" },
      { title: "为什么撤销 souls/bodies 专有表", desc: "通用化修订：撤销过拟合单项目的 10 张专有表，Character Domain 抽象为通用实体——为多项目复用付的架构税。" },
    ],
    roadmap: ["F16 多系列剧情线", "一键部署包", "更多技能域（音效 / 配音）"],
    next: "ai-marketing-visual",
    featured: true,
  },

  // ───────────────────────────── 主力 3 ─────────────────────────────
  {
    slug: "ai-marketing-visual",
    name: "AI Marketing Visual",
    folder: "ai_marketing_visual",
    tagline: "产品图 → 合规证据 → 受控生成 → 视觉质检的营销视觉工作流",
    category: "main",
    capabilities: ["engineering", "product", "visual"],
    tags: ["Next.js 16", "React Flow", "图像生成", "QA Rubric", "SSE", "Zod"],
    score: 68,
    status: "v0.1 MVP · 真实模型全链路已验证",
    role: "独立开发者",
    period: "2026.09",
    scale: "1,042 行 · 7 节点工作流",
    stack: ["Next.js 16", "React 19", "TypeScript", "@xyflow/react 12", "openai SDK", "zod 4", "vitest", "Playwright"],
    color: "34d399",
    cover: "/shots/ai-marketing-visual/cover.jpg",
    shots: [
    "/shots/ai-marketing-visual/cover.jpg",
    "/shots/ai-marketing-visual/cover.jpg",
    "/shots/ai-marketing-visual/canvas-full.jpg",
  ],
    metrics: [
      { label: "工作流节点", value: "7 个" },
      { label: "QA 量规", value: "18 项" },
      { label: "综合评分", value: "A54+B30+C15" },
      { label: "Hard Gate", value: "全 PASS" },
    ],
    summary:
      "营销视觉生成最容易翻车的是「图好看但产品是错的」。这条工作流先从参考图提取产品证据，编译受控 prompt，生成后用确定性评分引擎按 18 项量规质检，分数不过硬门槛直接重试。",
    sections: [
      {
        id: "problem",
        title: "问题：模型会画得很美，也会把产品画错",
        paras: [
          "电商营销图对产品形态、材质、Logo 的保真度有硬要求。直接文生图的产出「形似神不似」：杯把手反了、logo 拼错了、材质不对。这类错误靠人眼一张张挑成本极高。",
          "需要的是一条可审计的流水线：证据先行、生成受控、质检确定性、失败可重试。",
        ],
      },
      {
        id: "solution",
        title: "方案：确定性 Preflight + 确定性 Score Engine",
        paras: [
          "七个节点：产品参考图 → Product Evidence（证据提取）→ Prompt Compiler（受控提示词编译）→ 确定性 Preflight（前置校验）→ Qwen Image 生成 → Visual QA（18 项量规）→ 确定性 Score Engine 汇总。",
          "React Flow 画布实时高亮运行节点，边上数据包动画展示数据流转；SSE 事件重放让每次运行可回放、可审计；最多一次手动修订，控制成本。",
        ],
        metrics: [
          { label: "运行可重放", value: "SSE" },
          { label: "Schema 校验", value: "zod" },
          { label: "结果图下载", value: "支持" },
        ],
      },
      {
        id: "evidence",
        title: "真实模型验证记录",
        paras: [
          "2026-09-28 实测通过文本 JSON、原生文生图、参考图生成、完整工作流四条链路；完整工作流分项评分 A54 / B30 / C15，由代码求和为 99，Hard Gate 全部 PASS，附请求 ID 可回查。构建产物与 40 项测试就绪。",
        ],
      },
    ],
    decisions: [
      { title: "为什么质检用确定性引擎而非模型打分", desc: "质检必须可复现：18 项量规由代码确定性汇总，模型只负责视觉证据提取，不直接给分。" },
      { title: "为什么状态用进程内 Map 而不是数据库", desc: "v0.1 范围内单机单用户，明确不做登录 / 共享 / 队列——用范围换交付速度，并在 README 声明边界。" },
    ],
    roadmap: ["4:5 / 16:9 尺寸实测", "批量出图队列", "质检量规可配置化"],
    next: "talking-practice",
    featured: true,
  },

  // ───────────────────────────── 主力 4 ─────────────────────────────
  {
    slug: "talking-practice",
    name: "Talking Practice",
    folder: "talking_practice",
    tagline: "苏格拉底式思维训练 Agent：不给答案，只给更好的问题",
    category: "main",
    capabilities: ["engineering", "product"],
    tags: ["FastAPI", "自研 LLM 管线", "EPUB 摄取", "段落检索", "教学状态机"],
    score: 63,
    status: "PRD v0.12 可运行实现",
    role: "产品定义 / 全栈实现 / 评测设计",
    period: "2026.09",
    scale: "3,866 行 · 62 项 e2e 断言",
    stack: ["FastAPI", "SQLite", "原生 JS SPA", "自研 LLM 管线", "EPUB 解析", "Mock LLM"],
    color: "fbbf24",
    cover: "/shots/talking-practice/cover.jpg",
    shots: [
    "/shots/talking-practice/cover.jpg",
    "/shots/talking-practice/cover.jpg",
    "/shots/talking-practice/ui-full.jpg",
  ],
    metrics: [
      { label: "e2e 断言", value: "62 项" },
      { label: "教学状态机", value: "595 行" },
      { label: "演示书库", value: "3 本原创" },
      { label: "零依赖框架", value: "自研管线" },
    ],
    summary:
      "基于自建书库的私人思维教练：EPUB 摄取 → 零 LLM 段落检索 → 两级教学规划 → 苏格拉底式对话。62 项断言的 e2e 用 Mock LLM 全链路跑通，不花一分钱 API 费也能回归。",
    sections: [
      {
        id: "problem",
        title: "问题：把书读完不等于想清楚",
        paras: [
          "读了很多书，遇到真实决策还是不会用——缺的不是知识输入，而是一个逼你把推理说出口、再追问漏洞的对象。市面 AI 问答工具倾向直接给答案，恰好剥夺了思考过程。",
          "产品原则：不给答案，只给更好的问题；评分量规公开（PRD 6.3），让「问得好不好」可度量。",
        ],
      },
      {
        id: "solution",
        title: "方案：书库摄取 → 检索 → 两级规划 → 教学循环",
        paras: [
          "EPUB 摄取管线（NCX/nav 父子分块 + OCR 清洗）建自建书库；检索层完全不用 LLM（段落级零成本检索）；教学层由两级规划（17.7KB plan.py）驱动 595 行教学状态机，控制追问节奏与收敛条件。",
          "LLM 层收口在 llm.py 单点：token 记账、超时、重试统一管理。62 项断言的 e2e 基于自研 Mock LLM 服务全链路跑通——架构解耦让「教学逻辑正确性」与「模型效果」可以分开验证。",
        ],
      },
      {
        id: "prd",
        title: "PRD 先行：32KB 的产品思考",
        paras: [
          "PRD v0.12 共 11 大节：用户画像、评分量规、质量评测指标、A/B 灰度方案、章级会话与两级规划的拍板记录。开发前的产品思考密度，是这个项目区别于「调 API demo」的关键。",
        ],
      },
    ],
    decisions: [
      { title: "为什么检索层零 LLM", desc: "段落检索是确定性工作，用 LLM 做检索既慢又贵还引入不确定性；LLM 只花在对话与规划上。" },
      { title: "为什么用 Mock LLM 做 e2e", desc: "教学状态机的回归测试需要确定性与零成本；模型效果由真实调用另测，两条线不混。" },
    ],
    roadmap: ["流式输出（M2）", "Docker 打包", "学习曲线可视化"],
    next: "lesson-assistant",
    featured: true,
  },

  // ───────────────────────────── 主力 5 ─────────────────────────────
  {
    slug: "lesson-assistant",
    name: "Lesson Assistant",
    folder: "chemistry",
    tagline: "LLM 工作流备课助手：从单元内容到可下载 PPTX 的完整闭环",
    category: "main",
    capabilities: ["engineering", "product"],
    tags: ["LangChain", "LCEL", "Flask", "python-pptx", "工具调用"],
    score: 62,
    status: "v4.0 · 含部署配置",
    role: "独立开发者",
    period: "2026.08",
    scale: "2,091 行 · 6 API · 5 工具",
    stack: ["LangChain 1.0 LCEL", "Flask 3", "python-pptx", "DashScope qwen-plus", "Tavily", "原生 HTML/JS"],
    color: "f472b6",
    cover: "/shots/lesson-assistant/cover.jpg",
    shots: [
    "/shots/lesson-assistant/cover.jpg",
    "/shots/lesson-assistant/cover.jpg",
    "/shots/lesson-assistant/flow-full.jpg",
  ],
    github: "https://github.com/lilmoon1314-cpu/lesson-assistant",
    metrics: [
      { label: "生成闭环", value: "大纲→课件→习题" },
      { label: "API 路由", value: "6 个" },
      { label: "工具", value: "5 个" },
      { label: "产物", value: "真实 PPTX" },
    ],
    summary:
      "虽然仓库名叫 chemistry，实际支持任意学科：输入单元内容，自动生成结构化教学大纲、幻灯片内容、练习题并导出 PPTX。LCEL 状态机编排 + 人工确认节点，Apple 风格五步流程界面。",
    sections: [
      {
        id: "solution",
        title: "方案：LCEL 状态机 + 人工确认节点",
        paras: [
          "用 LangChain LCEL 编排生成工作流：大纲生成 → 结构化课件内容 → 练习题生成（含 Tavily+LLM 真题提取）→ python-pptx 落地为可编辑 PPTX。状态机内置人工确认节点，教师在关键步骤可介入修改。",
          "Flask 提供 6 个 API 路由，前端为 748 行的 Apple 毛玻璃风格五步流程页；CLI 与 Web 双入口。",
        ],
      },
      {
        id: "output",
        title: "真实产物",
        paras: [
          "output/ 目录留存真实生成的教学 PPTX（含化学示例课），可直接下载查看效果——这是「能跑通」最直接的证据。",
        ],
      },
    ],
    decisions: [
      { title: "为什么导出 PPTX 而不是网页课件", desc: "教师的真实工作流在 Office/WPS 里；可编辑的 PPTX 才能进入既有备课流程，而不是制造新的格式孤岛。" },
    ],
    roadmap: ["Render 部署验证", "冒烟测试", "多模板课件样式"],
    next: "rag-annual-report",
    featured: true,
  },

  // ───────────────────────────── 课程实战 ─────────────────────────────
  {
    slug: "rag-annual-report",
    name: "年报 RAG 问答",
    folder: "rag_annual_report",
    tagline: "全链路 RAG：15 份年报 → 分块检索 → Rerank → RAGAS 评估",
    category: "course",
    capabilities: ["engineering"],
    tags: ["RAG", "BGE", "FAISS", "Rerank", "RAGAS", "FastAPI"],
    score: 78,
    status: "全链路可运行",
    role: "课程实战（独立完成）",
    period: "2026.07",
    scale: "3,227 行 · 593MB 全自包含",
    stack: ["pdfplumber/PyMuPDF", "BGE-small-zh", "FAISS", "Rerank", "DashScope", "FastAPI", "LangChain 对照实现"],
    color: "38bdf8",
    cover: "/shots/rag-annual-report/cover.jpg",
    shots: ["/shots/rag-annual-report/ui-full.jpg"],
    metrics: [
      { label: "忠实度 Faithfulness", value: "0.809" },
      { label: "自带语料", value: "15 份年报" },
      { label: "向量索引", value: "FAISS 40MB" },
      { label: "评估框架", value: "RAGAS" },
    ],
    summary:
      "数据、模型、索引、评估、Web 界面全部自包含的企业级 RAG 教学实现：原生链路与 LangChain 链路双实现对照，RAGAS 四指标量化检索与生成质量。",
    sections: [
      {
        id: "solution",
        title: "双实现对照 + 消融实验",
        paras: [
          "原生实现（解析 → 分块 → BGE 嵌入 → FAISS → Rerank → DashScope 生成）与 LangChain 版对照实现并行，配合 compare_strategies.py 做策略消融；RAGAS 评估（faithfulness 0.809 / answer_relevancy 0.549 / context_precision 0.260 / context_recall 0.378）暴露了纯向量检索在精确匹配型问题上的短板——这正是后续加 Rerank 与混合检索的动机。",
          "自带 FastAPI Web 界面（年报 RAG 问答 · 教学演示），检索链路本地可跑，生成环节需 DashScope key。",
        ],
      },
    ],
    roadmap: ["混合检索（BM25+向量）", "引用溯源到页码"],
    next: "react-financial-agent",
  },
  {
    slug: "react-financial-agent",
    name: "金融 ReAct Agent",
    folder: "react_financial_agent",
    tagline: "手写 ReAct 循环 + 5 工具的金融分析 Agent，附检索 A/B 报告",
    category: "course",
    capabilities: ["engineering"],
    tags: ["ReAct", "Function Calling", "AkShare", "检索对比", "ECharts"],
    score: 74,
    status: "可运行 · 含评估报告",
    role: "课程实战（独立完成）",
    period: "2026.09 最新迭代",
    scale: "2,935 行 · 13 模块",
    stack: ["ReAct Prompt", "Function Calling", "FAISS/BM25/grep/tree", "AkShare", "FastAPI", "ECharts"],
    color: "818cf8",
    cover: "/shots/react-financial-agent/cover.jpg",
    shots: ["/shots/react-financial-agent/ab-report.jpg"],
    metrics: [
      { label: "hit@5", value: "0.882" },
      { label: "工具", value: "5 个" },
      { label: "检索横评", value: "4 种" },
      { label: "评估报告", value: "1.1MB HTML" },
    ],
    summary:
      "手写 ReAct Prompt 版与 Function Calling 版双实现：公司映射、年报 RAG、财务指标、股价、计算器五工具协作；四种检索工具横评（hit@1 0.706 / hit@5 0.882），20 题端到端准确率 0.55。",
    sections: [
      {
        id: "solution",
        title: "Agent 循环与检索消融",
        paras: [
          "对比「手写 ReAct Prompt」与「原生 Function Calling」两种 Agent 实现的稳定性与 token 成本；检索侧横评 faiss / bm25 / grep / tree 四种工具在真实金融问题上的命中表现，产出 1.1MB 可视化 A/B 报告。",
        ],
      },
    ],
    roadmap: ["多轮对话记忆", "图表自动生成"],
    next: "agent-memory-system",
  },
  {
    slug: "agent-memory-system",
    name: "Agent 记忆系统",
    folder: "agent_memory_system",
    tagline: "四层记忆 + 记忆固化三 Pass + 定时主动行动",
    category: "course",
    capabilities: ["engineering"],
    tags: ["Agent 记忆", "SQLite", "FTS5", "FAISS", "APScheduler", "SSE"],
    score: 70,
    status: "可运行",
    role: "课程实战（独立完成）",
    period: "2026.08",
    scale: "2,805 行 · 12 模块",
    stack: ["SQLite 会话层", "Markdown 长期记忆", "FAISS+FTS5 混合检索", "APScheduler", "FastAPI SSE"],
    color: "2dd4bf",
    cover: "/shots/agent-memory-system/cover.jpg",
    shots: ["/shots/agent-memory-system/ui-full.jpg"],
    metrics: [
      { label: "记忆层级", value: "4 层" },
      { label: "固化 Pass", value: "3 个" },
      { label: "主动行动", value: "HEARTBEAT" },
      { label: "前端", value: "SSE 实时" },
    ],
    summary:
      "参考类人类记忆架构的 Agent 记忆系统：会话层 / 长期记忆层 / 混合检索层 / 元认知层，Memory Flush 三 Pass 把会话沉淀为结构化长期记忆，HEARTBEAT 定时器让 Agent 主动发起行动。",
    sections: [
      {
        id: "solution",
        title: "记忆的写入、检索与遗忘",
        paras: [
          "四层记忆各司其职：SQLite 管会话、Markdown 管长期画像（SOUL/USER/MEMORY/AGENTS 模板）、FAISS+FTS5 混合检索兼顾语义与关键词、三 Pass 固化（提取→去重→合并）控制记忆膨胀。",
        ],
      },
    ],
    roadmap: ["记忆衰减策略", "多用户隔离"],
    next: "function-call-mcp-cli",
  },
  {
    slug: "function-call-mcp-cli",
    name: "工具调用三方式对比",
    folder: "function_call_mcp_cli",
    tagline: "Function Call / MCP / CLI 三种工具调用范式的工程对比",
    category: "course",
    capabilities: ["engineering"],
    tags: ["Function Calling", "MCP", "CLI Agent", "检索横评"],
    score: 68,
    status: "可运行 · 实跑对比表",
    role: "课程实战（独立完成）",
    period: "2026.07",
    scale: "1,681 行 · 13 模块",
    stack: ["OpenAI Function Calling", "MCP Server (stdio JSON-RPC)", "CLI named/bash", "FAISS", "HTTP 工具"],
    color: "fb923c",
    cover: "",
    shots: [],
    metrics: [
      { label: "调用范式", value: "3 种" },
      { label: "MCP Server", value: "2 个" },
      { label: "对比问题", value: "4×4 实跑" },
      { label: "幻觉拒答", value: "已验证" },
    ],
    summary:
      "同一套后端能力（年报检索 + 天气 HTTP 工具）分别以 Function Call、MCP、CLI 三种范式接入 Agent，4 个问题 × 4 种方式实跑对比，含「超出工具范围时拒答」的幻觉控制验证。",
    sections: [
      {
        id: "solution",
        title: "范式差异的工程结论",
        paras: [
          "output/compare_result.md 留存实跑对比表：三种范式在可靠性、token 成本、错误恢复上的差异一目了然——这是选型而非粉丝之争的证据。",
        ],
      },
    ],
    next: "rag-annual-report",
  },
  {
    slug: "peoples-daily-ner",
    name: "人民日报 NER 四方案对比",
    folder: "peoples_daily_exp",
    tagline: "BERT+CRF 0.9458 领跑：命名实体识别的完整方法横评",
    category: "course",
    capabilities: ["engineering"],
    tags: ["NER", "BERT", "CRF", "LoRA", "seqeval"],
    score: 62,
    status: "评估完整",
    role: "课程实战（独立完成）",
    period: "2026.06",
    scale: "1,658 行 · 9 评估 JSON",
    stack: ["BERT", "Linear/CRF heads", "Qwen zero/few-shot", "LoRA SFT", "seqeval"],
    color: "94a3b8",
    cover: "",
    shots: [],
    metrics: [
      { label: "BERT+CRF F1", value: "0.9458" },
      { label: "对比方法", value: "4 种" },
      { label: "评估产物", value: "9 JSON" },
      { label: "对比报告", value: "SUMMARY.md" },
    ],
    summary:
      "在人民日报 NER 语料上完整横评四种方案：BERT+CRF（0.9458）> BERT+Linear（0.9415）> LoRA SFT（0.73）> LLM zero-shot（0.7075）——用数字回答「什么时候该微调、什么时候该用大模型」。",
    sections: [],
    next: "text-classification",
  },
  {
    slug: "text-classification",
    name: "文本分类三路对比",
    folder: "text_classification项目",
    tagline: "TNEWS 5.3 万条：BERT 微调 / LLM 零样本 / LoRA SFT 三路对决",
    category: "course",
    capabilities: ["engineering"],
    tags: ["文本分类", "BERT", "LoRA", "TNEWS", "混淆矩阵"],
    score: 60,
    status: "训练评估完整",
    role: "课程实战（独立完成）",
    period: "2026.05",
    scale: "2,309 行 · 7 张分析图",
    stack: ["PyTorch", "transformers", "bert-base-chinese", "Qwen2-0.5B", "PEFT LoRA", "sklearn"],
    color: "94a3b8",
    cover: "/shots/text-classification/confusion.png",
    shots: ["/shots/text-classification/label-dist.png"],
    metrics: [
      { label: "训练语料", value: "53K 条" },
      { label: "方案", value: "3 路" },
      { label: "分析图", value: "7 张" },
      { label: "SFT 验证集", value: "acc 0.58" },
    ],
    summary:
      "在 CLUE TNEWS 上对比三条技术路线并留存完整训练日志与混淆矩阵分析；LoRA SFT 验证集准确率 0.58 的诚实结果，配合 badcase 分析说明小模型 + 少样本在细分类目上的天花板。",
    sections: [],
    next: "sequence-labeling",
  },
  {
    slug: "sequence-labeling",
    name: "序列标注项目",
    folder: "序列标注项目",
    tagline: "CLUER + 人民日报双语料：序列标注四方法系统对比",
    category: "course",
    capabilities: ["engineering"],
    tags: ["序列标注", "BERT", "CRF", "LoRA"],
    score: 62,
    status: "代码与文档完整",
    role: "课程实战（独立完成）",
    period: "2026.06",
    scale: "2,320 行 · 双语料",
    stack: ["BERT+Linear", "BERT+CRF", "LLM few-shot", "LoRA SFT", "seqeval"],
    color: "94a3b8",
    cover: "/shots/sequence-labeling/entity-dist.png",
    shots: [],
    metrics: [
      { label: "语料", value: "CLUER+人民日报" },
      { label: "方案", value: "4 种" },
      { label: "实体 F1", value: "seqeval" },
    ],
    summary:
      "CLUER 与人民日报双语料上的序列标注四方案对比，配套 ARCHITECTURE / USAGE_GUIDE / RESUME_GUIDE 三份文档（复现训练需自备预训练权重）。",
    sections: [],
    next: "vllm-deployment",
  },
  {
    slug: "vllm-deployment",
    name: "vLLM 推理部署实验",
    folder: "vllm_deployment",
    tagline: "吞吐量 54 倍提升：vLLM 部署与结构化输出实测",
    category: "course",
    capabilities: ["engineering"],
    tags: ["vLLM", "推理优化", "guided decoding", "基准测试"],
    score: 58,
    status: "量化结果完整",
    role: "课程实战（独立完成）",
    period: "2026.06",
    scale: "1,285 行",
    stack: ["vLLM", "guided_json/regex/choice", "function call", "response_format"],
    color: "94a3b8",
    cover: "/shots/vllm-deployment/throughput.png",
    shots: [],
    metrics: [
      { label: "吞吐提升", value: "54×" },
      { label: "vLLM QPS", value: "43.57" },
      { label: "解码速度", value: "3,043 tps" },
    ],
    summary:
      "串行 0.80 → 批处理 3.81 → vLLM 43.57 QPS 的吞吐实测，附结构化输出（guided json/regex）与 function call 的部署演示——推理工程的价值用数字说话。",
    sections: [],
    next: "rag-annual-report",
  },

  // ───────────────────────────── 研究专栏 ─────────────────────────────
  {
    slug: "agent-browser-lab",
    name: "Browser Agent 评测实验室",
    folder: "agent-browser-lab",
    tagline: "12 探针任务 × 统一评分卡 × 失败归因五分类的评测方法论",
    category: "research",
    capabilities: ["product", "engineering"],
    tags: ["Agent 评测", "方法论", "技术写作", "实验设计"],
    score: 55,
    status: "v0.1 框架版 · 实测进行中",
    role: "发起人与执行者",
    period: "2026.09",
    scale: "9 篇文档 · 2 个实验记录",
    stack: ["探针任务矩阵", "评分卡", "角色分离协议", "污染检测"],
    color: "a3a3a3",
    cover: "",
    shots: [],
    metrics: [
      { label: "探针任务", value: "12 个" },
      { label: "难度分级", value: "L1/L2/L3" },
      { label: "失败归因", value: "5 分类" },
      { label: "实验", value: "2 个已记录" },
    ],
    summary:
      "一个系统性评测 Browser Use Agent 能力边界的开源实验项目：从任务设计、评分者与执行者角色分离，到实验污染检测与降级处理，把「评测」本身当成工程来做。",
    sections: [
      {
        id: "solution",
        title: "把评测做成工程",
        paras: [
          "12 个只读探针任务按 L1 单页查找 / L2 多步交互 / L3 跨站聚合分级；每例实验记录执行者与评分者的隔离协议、异常与局限；首例实验因发现污染被主动降级为冒烟——诚实的负结果也是产出。",
        ],
      },
    ],
    github: "https://github.com/lilmoon1314-cpu/agent-browser-lab",
    roadmap: ["Sprint 1: 12 任务横测补全", "Sprint 2: benchmark 化 + 排行榜"],
    next: "guiyi-prototype",
  },
  {
    slug: "guiyi-prototype",
    name: "归一 · AI 日程助手",
    folder: "personal_agent",
    tagline: "从竞品矩阵到可点击原型：一份 91KB PRD 的产品定义全程",
    category: "research",
    capabilities: ["product"],
    tags: ["PRD", "竞品分析", "交互原型", "Figma"],
    score: 50,
    status: "设计 100% · 实现 0%（如实声明）",
    role: "产品定义 / 原型设计",
    period: "2026.09",
    scale: "PRD 91KB · 3 个交互原型 · 25 项验收",
    stack: ["PRD v0.1/v0.2", "HTML 交互原型", "流程图编辑器", "Figma", "Edge headless 验收"],
    color: "a3a3a3",
    cover: "",
    shots: [],
    metrics: [
      { label: "竞品分析", value: "6 款" },
      { label: "验收断言", value: "25 项" },
      { label: "原型", value: "可点击" },
      { label: "Figma", value: "已交付" },
    ],
    summary:
      "「把散落在聊天里的计划找回来，告诉你今天先做哪一件。」对标 Motion / Reclaim / Sunsama 等六款产品的完整竞品矩阵，含真实可用的流程图编辑器原型（增删改 / 撤销重做 / SVG 导入导出）与 25 项浏览器验收断言。",
    sections: [
      {
        id: "solution",
        title: "诚实是产品文档的一部分",
        paras: [
          "交付文档明确声明：这是设计产物和本地交互演示，没有实现后台 Agent、LangGraph 运行、OCR、真实 RAG。产品能力的证据在定义与验收的严谨度，而非技术堆栈的名词。",
        ],
      },
    ],
    roadmap: ["LangGraph MVP（预估 5~10 天）"],
    next: "one-percent-miniprogram",
  },
  {
    slug: "one-percent-miniprogram",
    name: "「1%」 微信小程序",
    folder: "_dsh_plugin",
    tagline: "记录 1% 进步的正念小程序：7 页面 + 6 组件 + 4 云函数",
    category: "research",
    capabilities: ["product", "visual"],
    tags: ["微信小程序", "云开发", "正念产品", "组件化"],
    score: 55,
    status: "完整工程 · 已托管",
    role: "独立开发者",
    period: "2026.08",
    scale: "7 页面 · 6 组件 · 4 云函数",
    stack: ["微信小程序", "云函数 (Node)", "呼吸动画组件", "标签系统"],
    color: "a3a3a3",
    cover: "",
    shots: [],
    metrics: [
      { label: "页面", value: "7 个" },
      { label: "组件", value: "6 个" },
      { label: "云函数", value: "4 个" },
      { label: "文档", value: "开发日志+技术文档" },
    ],
    summary:
      "以「不追求 100% 完美，只记录 1% 进步」为核心理念的正念小程序：微进步记录、情绪释放、感恩瞬间三类入口，呼吸气泡动画组件与完整的云开发后端。",
    sections: [],
    github: "https://github.com/lilmoon1314-cpu/cure-record",
    next: "architecture-notes",
  },
  {
    slug: "architecture-notes",
    name: "架构研究与教学页",
    folder: "教学页",
    tagline: "对比 8 个开源影视项目后写成的可交互架构教学页",
    category: "research",
    capabilities: ["visual", "product"],
    tags: ["架构分析", "技术写作", "数据可视化", "交互教学"],
    score: 45,
    status: "已交付",
    role: "独立研究",
    period: "2026.09",
    scale: "852 行自包含 HTML + 195KB 实战版",
    stack: ["纯 HTML/JS 交互动画", "架构图", "数据血缘可视化"],
    color: "a3a3a3",
    cover: "",
    shots: [],
    metrics: [
      { label: "对比项目", value: "8 个开源" },
      { label: "章节", value: "9 个" },
      { label: "交互动画", value: "帧同步演示" },
    ],
    summary:
      "研究 OpenTimelineIO 等八个开源影视技术项目后，把导演台架构、数据血缘与「同一帧如何同步」写成自包含的可交互教学页——并明确标注每个结论的证据等级（读过代码 / 论文 / 方法论），不把 README 口号当系统能力。",
    sections: [],
    next: "resume-copilot",
  },
];

// 主力项目叙事链顺序（引导路径）
export const MAIN_ORDER = projects
  .filter((p) => p.category === "main")
  .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.score - a.score)
  .map((p) => p.slug);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
