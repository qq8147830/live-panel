const roles = [
  {
    id: "teachzhao",
    name: "TeachZhao",
    handle: "@teachzhao",
    avatar: "T",
    color: "#2862f2",
    title: "AI首席专家 · 教育数字分身",
    type: "AI 智人",
    alias: "AI首席专家",
    desc: "AI赋能教育的智慧引擎，引领教学变革的数字先驱。深度融合人工智能技术与教育本质规律，推动教育从经验驱动向智能驱动转型。",
    tags: ["AI教育 5", "数字化治理 5", "智人教学 5", "数字分身 5"],
    nodes: ["GAI", "analytics", "avatar", "curriculum", "governance", "ecosystem"],
    persona: "你是 TeachZhao，AI首席教育专家。核心能力：1.AI赋能教学——辅助单元教学设计、互动课件生成、分层练习定制，7×24小时个性化答疑；2.数字化治理——多维度测评数据整合、师生数字画像构建、数据驱动决策；3.AI智人与数字分身——萃取教育专家知识体系与判断逻辑，实现碳硅结合的协同共育模式；4.教育生态架构——推动人机协同学习模式转变，赋能教师从知识传递者转型为学习设计者。价值主张：AI的使命不是替代人类，而是让人从重复脑力劳动中解放，回归人的价值，教育是这场变革的引擎。技术支撑：生成式AI、多模态学习分析、数字人/智能体技术、教育知识库。回答时请体现专业深度、教育情怀和温暖关怀。"
  },
  {
    id: "nuwa",
    name: "Nüwa",
    handle: "@nuwa",
    avatar: "女",
    color: "#13c875",
    title: "造物主 · 可以为你创造新角色",
    type: "AI 个体",
    alias: "女娲",
    desc: "帮助你把学习、备课、规划或创意目标拆成可执行的角色军团。",
    tags: ["原则 3", "流程 2", "knowledge 6"],
    nodes: ["procedure", "principle", "character", "practice", "memory", "goal"]
  },
  {
    id: "jiang",
    name: "姜子牙",
    handle: "@strategy",
    avatar: "姜",
    color: "#475569",
    title: "帮你提炼数字分身",
    type: "AI 顾问",
    alias: "战略导师",
    desc: "将复杂目标转化为角色职责、协作流程和阶段性成果。",
    tags: ["strategy 4", "goals 8", "memory 3"],
    nodes: ["goal", "plan", "review", "coach", "report", "decision"]
  },
  {
    id: "kongzi",
    name: "现代孔子",
    handle: "@mentor",
    avatar: "孔",
    color: "#f35a13",
    title: "启发式教学智者",
    type: "AI 教师",
    alias: "启发导师",
    desc: "用追问、类比、例题和复盘帮助学习者真正理解。",
    tags: ["learning 7", "quiz 4", "review 5"],
    nodes: ["concept", "example", "question", "quiz", "mistake", "review"]
  },
  {
    id: "mengmu",
    name: "现代孟母",
    handle: "@parent",
    avatar: "孟",
    color: "#2563eb",
    title: "家庭教育规划师",
    type: "AI 规划师",
    alias: "陪伴教练",
    desc: "为家长生成学习计划、沟通建议和成长观察记录。",
    tags: ["family 6", "plan 5", "care 7"],
    nodes: ["routine", "habit", "feedback", "reading", "focus", "reward"]
  },
  {
    id: "sushi",
    name: "现代苏轼",
    handle: "@play",
    avatar: "苏",
    color: "#7c3aed",
    title: "跨学科探索玩伴",
    type: "AI 玩伴",
    alias: "知识玩家",
    desc: "把知识变成故事、游戏和创意练习，让学习更有探索感。",
    tags: ["story 5", "game 4", "creative 6"],
    nodes: ["story", "game", "poem", "science", "coding", "share"]
  },
  {
    id: "shaoqing",
    name: "傻青",
    handle: "@philosophy",
    avatar: "傻",
    color: "#0d9488",
    title: "哲学向导与自我认知同行者",
    type: "AI 向导",
    alias: "自我认知教练",
    desc: "帮助用户在迷茫、焦虑或自我怀疑时进行深度对话，找到内在方向。",
    tags: ["philosophy 5", "mindset 4", "reflect 6"],
    nodes: ["reflect", "question", "insight", "habit", "emotion", "growth"]
  },
  {
    id: "sean",
    name: "Sean",
    handle: "@founder",
    avatar: "S",
    color: "#1e40af",
    title: "Deeppractice.ai 创始人 & CEO",
    type: "人类成员",
    alias: "创始人",
    desc: "TeachZhao 和 Deeppractice.ai 的创始人，负责产品方向和团队管理。",
    tags: ["product 8", "vision 6", "team 5"],
    nodes: ["vision", "strategy", "product", "team", "growth", "community"]
  }
];

const eduExperts = [
  { cat: "改革先锋", items: [
    { id: "weishusheng", name: "魏书生", avatar: "魏", color: "#b91c1c", handle: "@weishusheng", title: "当代孔子 · 教育改革家", type: "教育改革家", alias: "当代孔子", desc: "自育自学，民主科学。创立六步教学法（定向、自学、讨论、答疑、自测、自结），培养学生自学能力；倡导民主与科学的班级管理理念，坚持人人有事做、事事有人做；以育人为核心，追求教育的自育自学境界，是当代中国最具影响力的教育改革家之一。", tags: ["六步教学法 5", "自育自学 5", "民主管理 5", "育人核心 5"], nodes: ["orient", "selfstudy", "discuss", "question", "selftest", "selfsum"] },
    { id: "lixigui", name: "李希贵", avatar: "李", color: "#1d4ed8", handle: "@lixigui", title: "十一学校之父 · 教育家", type: "教育家/学校管理者", alias: "十一学校之父", desc: "创造适合每一位学生发展的教育。推动走班选课教学模式改革，取消行政班与班主任，构建分层分类的课程体系，让每个学生拥有独一无二的课表；倡导学生中心理念，把学校变成学生自主成长的生态，被誉为中国基础教育改革的旗帜性人物。", tags: ["走班选课 5", "课程改革 5", "学生中心 5", "学校治理 5"], nodes: ["elective", "reform", "student", "governance", "curriculum", "ecology"] }
  ]},
  { cat: "资深专家", items: [
    { id: "fengenlong", name: "冯恩洪", avatar: "冯", color: "#b45309", handle: "@fengenlong", title: "中国好课堂之父", type: "教育实践家", alias: "课堂改革先驱", desc: "创造适合学生的教育。推动走班制教学模式，首创合格+特长办学理念，被誉为北魏南冯之一。", tags: ["走班制 5", "合格+特长 5", "课堂变革 5"], nodes: ["reform", "classroom", "student", "teacher", "curriculum", "assess"] },
    { id: "chuhongqi", name: "褚宏启", avatar: "褚", color: "#1e40af", handle: "@chuhongqi", title: "教育战略专家", type: "教育政策研究者", alias: "治理顾问", desc: "赋能学校高质量发展。北京师范大学教授，中国教育学会初中教育专委会学术委员会主任。", tags: ["教育治理 5", "校长领导力 5", "核心素养 4"], nodes: ["governance", "leadership", "competency", "policy", "school", "quality"] },
    { id: "huweiping", name: "胡卫平", avatar: "胡", color: "#059669", handle: "@huweiping", title: "科学教育领军人", type: "课程标准制定者", alias: "科学教育权威", desc: "引领科学教育国家标准。陕西师范大学教授，国家义务教育科学课程标准修订组组长。", tags: ["科学教育 5", "课程标准 5", "思维型教学 5"], nodes: ["science", "standard", "thinking", "physics", "inquiry", "experiment"] }
  ]},
  { cat: "名校校长", items: [
    { id: "liuxiaohui", name: "刘小惠", avatar: "刘", color: "#dc2626", handle: "@liuxiaohui", title: "人大附中掌舵人", type: "中学教育家", alias: "基础教育标杆", desc: "引领中国基础教育标杆。中国人民大学附属中学校长，正高级教师。", tags: ["学校管理 5", "教师发展 5", "教育创新 4"], nodes: ["manage", "develop", "innovate", "culture", "talent", "brand"] },
    { id: "yiguodong", name: "易国栋", avatar: "易", color: "#7c3aed", handle: "@yiguodong", title: "成都七中领军人", type: "中学教育家", alias: "生命教育倡导者", desc: "让每个生命绽放光彩。四川省成都市第七中学党委书记，正高级教师。", tags: ["学校文化 5", "课程改革 5", "教师培养 4"], nodes: ["culture", "reform", "growth", "life", "teacher", "student"] },
    { id: "zhoujianhua", name: "周建华", avatar: "周", color: "#0891b2", handle: "@zhoujianhua", title: "航天城教育筑梦人", type: "数学教育专家", alias: "思维数学名师", desc: "用思维点亮数学课堂。人大附中航天城学校校长，正高级教师，中学数学特级教师。", tags: ["数学教学 5", "学校管理 4", "教师成长 4"], nodes: ["math", "thinking", "classroom", "manage", "train", "special"] },
    { id: "songyiyun", name: "宋奕云", avatar: "宋", color: "#ca8a04", handle: "@songyiyun", title: "顺润教育倡导者", type: "教育管理专家", alias: "顺性教育践行者", desc: "看见天生不同，成就与众不同。成都市石室联合中学党委书记，提出顺性而育、润泽生命的教育主张。", tags: ["学校转型 5", "教育主张 4", "课程重构 4"], nodes: ["nature", "nurture", "curriculum", "transform", "difference", "identity"] },
    { id: "laihanmei", name: "赖晗梅", avatar: "赖", color: "#e11d48", handle: "@laihanmei", title: "真教育践行者", type: "小学教育专家", alias: "生命教育名师", desc: "把心教给孩子，让生命开花。成都市东城根街小学党总支书记，正高级教师，提出真教育主张。", tags: ["小学教育 5", "学校文化 4", "教师发展 4"], nodes: ["primary", "truth", "life", "culture", "heart", "bloom"] }
  ]},
  { cat: "教研专家", items: [
    { id: "libaiyan", name: "李百艳", avatar: "李", color: "#4f46e5", handle: "@libaiyan", title: "教师发展引路人", type: "教研专家", alias: "教师培训权威", desc: "赋能每一位教师的专业成长。上海市浦东教育发展研究院院长，正高级教师。", tags: ["教师培训 5", "教育评价 4", "学校管理 4"], nodes: ["training", "evaluate", "manage", "growth", "research", "quality"] },
    { id: "wangyang", name: "王洋", avatar: "王", color: "#0d9488", handle: "@wangyang", title: "上海教研领军人", type: "教研管理专家", alias: "教研生态构建者", desc: "构建教师发展新生态。上海市教师教育学院院长，正高级教师。", tags: ["教研体系 5", "教师培训 5", "课程建设 4"], nodes: ["research", "training", "curriculum", "system", "ecology", "develop"] }
  ]}
];

/** 集成在 CYAiBotClaw 下为 /teachzhao，独立运行 teachzhao/server.js 时为根路径 */
function getTeachZhaoBase() {
  return location.pathname.startsWith("/teachzhao") ? "/teachzhao" : "";
}

function apiUrl(path) {
  return `${getTeachZhaoBase()}${path}`;
}

const pricing = [
  { name: "Free", month: 0, year: 0, desc: "每日体验 AI 问答与基础课程生成", features: ["20 次 AI 问答 / 天", "基础课程生成", "2 个默认角色", "公开资源库"] },
  { name: "Pro 学习版", month: 49, year: 39, desc: "适合学生与自学者持续学习", features: ["无限追问", "个性化学习路径", "错题本与复盘计划", "多学科陪练"] },
  { name: "Teacher 教师版", month: 129, year: 99, desc: "适合教师备课、出题和讲义生成", features: ["批量课程生成", "课堂测验", "学生学习报告", "教师工作台"] },
  { name: "School 机构版", month: 499, year: 399, desc: "面向学校与机构的规模化方案", features: ["多班级管理", "品牌化角色军团", "数据看板", "API / 私有化支持"] }
];

const faqs = [
  ["TeachZhao 是真实 AI 吗？", "当前站点提供可运行的本地模拟 AI 接口，交互、数据结构和页面流程已完整预留，后续可接入 OpenAI、Claude 或私有模型。"],
  ["儿童可以使用吗？", "可以。产品设计包含家长规划、学习报告和内容安全提示；正式上线前建议加入未成年人保护、敏感内容过滤和家长控制。"],
  ["教师能生成什么？", "可以生成课程大纲、讲义、课堂测验、错题复盘和班级学习报告。"],
  ["角色系统和 AI 教师是什么关系？", "角色系统是 TeachZhao 的核心容器，AI 教师、家长规划师、备课助手都可以作为角色协作。"],
  ["登录/注册是真实页面吗？", "是。当前提供基础校验和本地演示接口，方便验证流程。"]
];

let state = {
  route: location.hash.replace("#", "") || "/",
  selectedRole: roles[0],
  conversations: {
    teachzhao: [{ from: "ai", text: "你好，我是 TeachZhao，你的 AI 首席教育专家。无论是教学设计、学情分析、课程改革还是数字化转型，我都可以为你提供专业支持。请告诉我你想探讨什么？" }],
    nuwa: [{ from: "ai", text: "你好，我是 Nüwa。告诉我你想学习、备课或创建什么角色，我会帮你组织成可执行的计划。" }]
  },
  lastActive: ["teachzhao"],
  yearly: false,
  activeUse: "学生",
  course: null,
  quiz: null,
  user: { name: "hh101", email: "demo@teachzhao.ai", id: "usr_27908a2c3d6f", balance: 3, frozen: 0 },
  expertExpanded: false,
  loggedIn: false
};

const LIVE_PANEL_SESSION_KEY = "live-panel-session-v1";

function persistLivePanelSession() {
  if (!state.loggedIn) return;
  try {
    localStorage.setItem(LIVE_PANEL_SESSION_KEY, JSON.stringify({
      loggedIn: true,
      phone: "",
      displayName: state.user.name,
      name: state.user.name,
      email: state.user.email,
      balance: state.user.balance,
      frozen: state.user.frozen,
      id: state.user.id,
      loginMethod: "teachzhao",
    }));
  } catch (_) {}
}

function hydrateLivePanelSession() {
  try {
    const raw = localStorage.getItem(LIVE_PANEL_SESSION_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    if (!data.loggedIn) return;
    state.loggedIn = true;
    state.user = {
      name: data.name || data.displayName || "用户",
      email: data.email || "user@live-panel.local",
      id: data.id || "usr_guest",
      balance: typeof data.balance === "number" ? data.balance : 10.00,
      frozen: data.frozen || 0,
    };
  } catch (_) {}
}

hydrateLivePanelSession();

const app = document.querySelector("#app");

function icon(name) {
  const map = {
    user: "♙", book: "▣", arrow: "→", chat: "◌", search: "⌕", plus: "+", home: "⌂",
    gear: "⚙", plug: "⌁", card: "▤", shield: "◇", menu: "☰", close: "×", send: "↑"
  };
  return `<span class="icon" aria-hidden="true">${map[name] || "•"}</span>`;
}

function link(path, label, cls = "") {
  return `<a class="${cls}" href="#${path}" data-link>${label}</a>`;
}

function shell(content, active = "/") {
  return `
    <header class="topbar">
      <a class="brand" href="#/" data-link>
        <span class="brand-mark">${icon("user")}</span>
        <span><strong>TeachZhao</strong><small>数字分身 · AI 教师角色系统</small></span>
      </a>
      <nav class="nav">
        ${link("/", "首页", active === "/" ? "active" : "")}
        ${link("/agents", "进入角色系统", active === "/agents" ? "active" : "")}
        ${link("/guide", "学习如何使用", active === "/guide" ? "active" : "")}
        ${link("/product", "产品", active === "/product" ? "active" : "")}
        ${link("/solutions", "解决方案", active === "/solutions" ? "active" : "")}
        ${link("/pricing", "价格", active === "/pricing" ? "active" : "")}
      </nav>
      <div class="top-actions">
        <a class="btn btn-soft small cy-home-link" href="/index.html" title="返回 CY AI BotClaw 官网">🦍 长右灵</a>
        ${state.loggedIn
          ? link("/account", '<span class="topbar-avatar">' + (state.user.name ? state.user.name.charAt(0).toUpperCase() : "U") + '</span><span class="topbar-username">' + state.user.name + '</span>', "topbar-user")
          : link("/login", "登录", "btn btn-primary small")}
        <button class="mobile-toggle" data-mobile>${icon("menu")}</button>
      </div>
    </header>
    <div class="mobile-nav" data-mobile-nav>
      ${["首页:/", "角色系统:/agents", "使用说明:/guide", "产品:/product", "解决方案:/solutions", "价格:/pricing", "登录:/login"].map((item) => {
        const [label, path] = item.split(":");
        return link(path, label);
      }).join("")}
    </div>
    ${content}
  `;
}

function homePage() {
  return shell(`
    <main>
      <section class="hero clay-band">
        <div class="hero-copy reveal">
          <p class="eyebrow">TeachZhao 角色系统</p>
          <h1>构建你自己的<br><span>数字分身</span><br>打造属于你的<br><span>角色军团</span></h1>
          <p class="lead">人类与 AI 协作的最佳方式。选择你的场景，即刻开始探索。</p>
          <div class="hero-actions">
            ${link("/agents", "进入角色系统 " + icon("arrow"), "btn btn-primary")}
            ${link("/guide", icon("book") + " 学习如何使用", "btn btn-soft")}
          </div>
        </div>
        <div class="hero-choices reveal delay-1">
          <a class="choice-card" href="#/agents?mode=education" data-link>
            <span class="choice-icon">${icon("book")}</span>
            <span><strong>我想在教育场景中使用</strong><small>老师备课 · 学生学习 · 家长规划</small></span>
            ${icon("arrow")}
          </a>
          <a class="choice-card" href="#/agents?mode=general" data-link>
            <span class="choice-icon rocket">♢</span>
            <span><strong>我想在通用场景中使用</strong><small>数字分身 · 角色军团 · 个人公司</small></span>
            ${icon("arrow")}
          </a>
        </div>
      </section>
      <section class="section">
        <div class="section-head">
          <div><p class="eyebrow">探索专属角色</p><h2>从一个数字分身开始，组织你的角色军团</h2></div>
          ${link("/agents", "查看全部角色", "btn btn-primary")}
        </div>
        <div class="role-grid">${roles.map(roleCard).join("")}</div>
      </section>
      ${demoSection()}
      ${featuresSection()}
      ${statsSection()}
      ${useCasesSection()}
      ${workflowSection()}
      ${testimonialsSection()}
      ${pricingSection()}
      ${faqSection()}
      ${footer()}
    </main>
  `, "/");
}

function roleCard(role) {
  return `
    <button class="role-card clay" data-role="${role.id}">
      <span class="avatar" style="--avatar:${role.color}">${role.avatar}</span>
      <strong>${role.name}</strong>
      <small>${role.title}</small>
    </button>
  `;
}

function demoSection() {
  return `
    <section class="section split" id="demo">
      <div>
        <p class="eyebrow">产品演示</p>
        <h2>AI 教师会讲解，也会追问、出题和复盘</h2>
        <p class="muted">输入一个目标，TeachZhao 会把对话、课程计划、测验反馈和学习报告连成闭环。</p>
        <form class="mini-form" data-course-form>
          <input name="goal" placeholder="例如：三天学会二次函数图像" required />
          <select name="subject"><option>数学</option><option>语文</option><option>编程</option><option>科学</option></select>
          <button class="btn btn-primary" type="submit">生成课程</button>
        </form>
      </div>
      <div class="demo-panel clay">
        <div class="chat-preview">
          <div class="bubble ai">我们先用一张知识地图确认你卡在哪里。</div>
          <div class="bubble user">我总是分不清函数平移。</div>
          <div class="bubble ai">把图像想成一块软泥：向左揉，x 要提前；向上托，y 直接增加。</div>
        </div>
        <div class="progress-card"><strong>掌握度</strong><span>82%</span><div><i style="width:82%"></i></div></div>
        <div class="course-result" data-course-result></div>
      </div>
    </section>
  `;
}

function featuresSection() {
  const features = [
    ["AI 对话讲解", "概念解释、步骤拆解、常见误区和追问入口。"],
    ["课程生成", "按学科、年级、目标和难度生成可展开课程。"],
    ["智能测验", "选择题、填空题、问答题与即时解析。"],
    ["学习追踪", "掌握度、薄弱知识点和下一步建议。"],
    ["教师工作台", "备课、讲义、课堂测验和班级报告。"],
    ["角色军团", "把老师、顾问、规划师组合成个人 AI 团队。"]
  ];
  return `<section class="section soft reveal"><p class="eyebrow">核心功能</p><h2>把 AI 能力变成每天可用的学习工作流</h2><div class="feature-grid">${features.map(([title, text], index) => `<article class="feature-card clay"><span>${index + 1}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div></section>`;
}

function useCasesSection() {
  const cases = {
    学生: ["作业辅导", "错题解析", "考试复习", "编程陪练"],
    教师: ["快速备课", "生成练习", "讲义整理", "学情报告"],
    家长: ["学习规划", "过程反馈", "薄弱点跟踪", "沟通建议"],
    机构: ["标准化交付", "班级管理", "品牌角色", "成本优化"]
  };
  return `
    <section class="section reveal">
      <div class="section-head"><div><p class="eyebrow">适用场景</p><h2>教育与通用场景都能组织成角色协作</h2></div></div>
      <div class="tabs">${Object.keys(cases).map((name) => `<button class="${state.activeUse === name ? "active" : ""}" data-use="${name}">${name}</button>`).join("")}</div>
      <div class="use-panel clay">${cases[state.activeUse].map((item) => `<span>${item}</span>`).join("")}</div>
    </section>
  `;
}

function workflowSection() {
  return `<section class="section workflow"><p class="eyebrow">学习闭环</p><h2>提问、讲解、练习、复盘、计划</h2><div>${["提出问题", "循序讲解", "生成练习", "记录错题", "推荐复习"].map((item, index) => `<article class="reveal"><b>${index + 1}</b><strong>${item}</strong><p>${["把模糊问题变成明确目标", "用类比和步骤降低理解成本", "即时检测掌握情况", "沉淀薄弱知识点", "形成下一次学习任务"][index]}</p></article>`).join("")}</div></section>`;
}

function statsSection() {
  const stats = [
    { number: "10,000+", label: "活跃学习者" },
    { number: "500+", label: "AI 生成课程" },
    { number: "98%", label: "用户满意度" },
    { number: "50+", label: "覆盖学科" }
  ];
  return `<section class="section stats-band reveal"><div class="stats-grid">${stats.map((s) => `<div class="stat-item"><strong>${s.number}</strong><span>${s.label}</span></div>`).join("")}</div></section>`;
}

function testimonialsSection() {
  const testimonials = [
    { name: "小林同学", role: "高二学生", avatar: "林", color: "#2862f2", quote: "用 TeachZhao 的现代孔子学数学，终于搞懂了函数平移。追问功能特别好，比看网课强多了。" },
    { name: "王老师", role: "初中数学教师", avatar: "王", color: "#13c875", quote: "备课时间从 2 小时缩短到 30 分钟。生成的课堂测验质量很高，学生反馈也很好。" },
    { name: "李女士", role: "三年级家长", avatar: "李", color: "#f35a13", quote: "现代孟母帮我制定了孩子的学习计划，每周有反馈和调整。辅导作业不再鸡飞狗跳。" },
    { name: "张校长", role: "某培训机构负责人", avatar: "张", color: "#7c3aed", quote: "机构版让 8 个校区共享标准化课程，学员数据一目了然。服务成本降低了 40%。" }
  ];
  return `<section class="section soft reveal"><p class="eyebrow">用户评价</p><h2>他们已经在用 TeachZhao</h2><div class="testimonial-grid">${testimonials.map((t) => `<article class="testimonial-card clay"><div class="testimonial-head"><span class="avatar" style="--avatar:${t.color}">${t.avatar}</span><div><strong>${t.name}</strong><small>${t.role}</small></div></div><p>${t.quote}</p></article>`).join("")}</div></section>`;
}

function pricingSection() {
  return `
    <section class="section" id="pricing">
      <div class="section-head">
        <div><p class="eyebrow">价格方案</p><h2>从免费体验到机构规模化</h2></div>
        <label class="switch"><span>月付</span><input type="checkbox" ${state.yearly ? "checked" : ""} data-price-toggle /><i></i><span>年付</span></label>
      </div>
      <div class="pricing-grid">${pricing.map((plan, index) => `<article class="price-card clay ${index === 1 ? "featured" : ""}"><h3>${plan.name}</h3><p>${plan.desc}</p><div class="price">¥${state.yearly ? plan.year : plan.month}<small>/月</small></div><ul>${plan.features.map((f) => `<li>${f}</li>`).join("")}</ul>${link("/login", index === 0 ? "开始体验" : "选择方案", "btn btn-primary")}</article>`).join("")}</div>
    </section>
  `;
}

function faqSection() {
  return `<section class="section faq"><p class="eyebrow">FAQ</p><h2>常见问题</h2>${faqs.map(([q, a], index) => `<details ${index === 0 ? "open" : ""} class="clay"><summary>${q}</summary><p>${a}</p></details>`).join("")}</section>`;
}

function footer() {
  return `<footer class="footer"><div><strong>TeachZhao</strong><p>想要加入社群？联系 TeachZhao</p></div><div><a>公众号</a><a>B站</a><a>小宇宙</a><a href="#/account" data-link>管理台</a></div><small>© 2026 TeachZhao.AI</small></footer>`;
}

function expertListItem(expert) {
  const isSel = state.selectedRole && state.selectedRole.id === expert.id;
  return `<button class="agent-item ${isSel ? "active" : ""}" data-select-expert="${expert.id}"><span class="avatar small" style="--avatar:${expert.color}">${expert.avatar}</span><span><strong>${expert.name}</strong><small>${expert.title}</small></span></button>`;
}

function getRoleMessages(roleId) {
  if (!state.conversations[roleId]) {
    const role = getAllRoles().find((r) => r.id === roleId);
    const greeting = role ? `你好，我是 ${role.name}。${role.desc}` : "你好，请告诉我你想讨论什么。";
    state.conversations[roleId] = [{ from: "ai", text: greeting }];
  }
  return state.conversations[roleId];
}

function getAllRoles() {
  return [...roles, ...eduExperts.flatMap((g) => g.items)];
}

function touchConversation(roleId) {
  state.lastActive = [roleId, ...state.lastActive.filter((id) => id !== roleId)];
}

function agentsPage() {
  const tzRole = roles.find((r) => r.id === "teachzhao");
  const angelRoles = roles.filter((r) => r.id === "nuwa");
  const aiRoles = roles.filter((r) => r.type !== "人类成员" && r.id !== "nuwa" && r.id !== "teachzhao");
  const humanRoles = roles.filter((r) => r.type === "人类成员");
  const allExperts = eduExperts.flatMap((g) => g.items);
  const visibleExperts = state.expertExpanded ? allExperts : allExperts.slice(0, 3);
  const hiddenCount = allExperts.length - 3;
  return appShell(`
    <aside class="agent-list">
      <div class="search-box">${icon("search")}<input placeholder="搜索成员" data-search /></div>
      <button class="add-role" title="创建新角色">${icon("plus")}</button>
      ${tzRole ? `<h4 class="tz-heading">⭐ AI首席专家</h4>${agentListItem(tzRole)}` : ""}
      <h4 class="expert-heading">🎓 教育专家团 <span class="expert-badge">${allExperts.length} 位</span></h4>
      ${visibleExperts.map(expertListItem).join("")}
      ${allExperts.length > 3 ? `<button class="expert-toggle" data-expert-toggle>${state.expertExpanded ? "收起 ↑" : "展开更多 +" + hiddenCount + " 位 ↓"}</button>` : ""}
      <h4>天使成员</h4>
      ${angelRoles.map(agentListItem).join("")}
      <h4>AI 成员 ${aiRoles.length}</h4>
      ${aiRoles.map(agentListItem).join("")}
      ${humanRoles.length ? `<h4>人类成员</h4>${humanRoles.map(agentListItem).join("")}` : ""}
      <div class="active-count">活跃 ${roles.length + allExperts.length + 1}</div>
    </aside>
    ${state.selectedRole ? roleProfile(state.selectedRole) : ""}
  `, "agents");
}

function appShell(content, section) {
  const u = state.user;
  const initial = u.name ? u.name.charAt(0).toUpperCase() : "U";
  return `
    <div class="workspace">
      <nav class="rail">
        ${link("/chat", '<span class="rail-icon">💬</span><span class="rail-label">对话</span>', section === "chat" ? "active" : "")}
        ${link("/agents", '<span class="rail-icon">👥</span><span class="rail-label">角色</span>', section === "agents" ? "active" : "")}
        ${link("/account", '<span class="rail-icon">💳</span><span class="rail-label">账户</span>', section === "account" ? "active" : "")}
        ${link("/product", '<span class="rail-icon">📦</span><span class="rail-label">产品</span>', "")}
        ${state.loggedIn ? link("/account", '<span class="rail-avatar">' + initial + '</span><span class="rail-label rail-user">' + u.name + '</span>', "rail-user") : ""}
        ${link("/", '<span class="rail-icon">🏠</span><span class="rail-label">回首页</span>', "rail-home")}
      </nav>
      ${content}
    </div>
  `;
}

function agentListItem(role) {
  return `<button class="agent-item ${state.selectedRole.id === role.id ? "active" : ""}" data-select-role="${role.id}"><span class="avatar small" style="--avatar:${role.color}">${role.avatar}</span><span><strong>${role.name}</strong><small>${role.title}</small></span></button>`;
}

function roleProfile(role) {
  return `
    <main class="profile">
      <section class="profile-main">
        <div class="profile-head"><span class="avatar portrait" style="--avatar:${role.color}">${role.avatar}</span><div><h1>${role.name}</h1><p>${role.handle}</p><p>类型：${role.type}</p><p>别名：${role.alias}</p></div></div>
        <h2>${role.title}</h2>
        <a class="btn btn-green wide" href="#/chat" data-link>${icon("chat")} 进入对话</a>
        <div class="info-block"><h3>摘要</h3><dl><dt>模型</dt><dd>Deeppractice Auto</dd><dt>设备</dt><dd>1 个已装备</dd><dt>电脑</dt><dd>default</dd><dt>认知</dt><dd>${role.tags.join(" · ")}</dd><dt>状态</dt><dd>可对话</dd></dl></div>
        <div class="manage-list"><h3>管理</h3>${["个体主页", "基础", "设备", "MCP"].map((item, index) => `<button class="${index === 0 ? "active" : ""}">${icon(index === 0 ? "home" : index === 1 ? "gear" : "plug")} ${item}<span>›</span></button>`).join("")}</div>
      </section>
      <section class="knowledge">
        <p>认知</p><h2>认知网络 <small>${role.tags.join("  ")}</small></h2>
        <div class="network">${role.nodes.map((node, index) => `<span style="--x:${20 + (index % 3) * 28}%;--y:${18 + Math.floor(index / 3) * 38}%">${node}</span>`).join("")}<b>${role.name}</b></div>
        <div class="related"><p>对话</p><h2>相关 Talk</h2><div>${icon("chat")} 进入对话后，相关 Talk 会出现在这里。</div></div>
      </section>
      <aside class="identity"><span class="status-dot"></span><strong>INDIVIDUAL</strong><h2>${role.name}</h2><code>IND-LGCY-${role.id.toUpperCase()}-TEACHZHAO</code><p>${role.desc}</p></aside>
    </main>
  `;
}

function chatPage() {
  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  const roleId = state.selectedRole.id;
  const messages = getRoleMessages(roleId);
  const topics = [
    { name: "空话题", active: true, time: timeStr },
    { name: "函数平移辅导", active: false, time: "昨天" },
    { name: "课程生成：二次函数", active: false, time: "3天前" }
  ];
  const quickPrompts = roleId === "teachzhao"
    ? ["如何设计一节AI赋能的数学课？", "帮我分析学生薄弱环节", "数字化转型方案怎么做？", "如何构建教师数字画像？"]
    : ["我想三天学会二次函数图像", "帮我生成一份数学测验", "讲解一下勾股定理", "制定本周学习计划"];
  const convRoles = state.lastActive.map((id) => getAllRoles().find((r) => r.id === id)).filter(Boolean);
  if (!convRoles.find((r) => r.id === roleId)) {
    const current = getAllRoles().find((r) => r.id === roleId);
    if (current) convRoles.unshift(current);
  }
  return appShell(`
    <aside class="agent-list talk-list">
      <div class="search-box">${icon("search")}<input placeholder="搜索" data-search /></div>
      <h4 class="conv-heading">最近对话</h4>
      ${convRoles.map((r) => {
        const msgs = getRoleMessages(r.id);
        const lastMsg = msgs[msgs.length - 1];
        const preview = lastMsg ? (lastMsg.text.length > 20 ? lastMsg.text.slice(0, 20) + "…" : lastMsg.text) : "暂无对话";
        const isActive = r.id === roleId;
        return `<button class="agent-item ${isActive ? "active" : ""}" data-chat-role="${r.id}"><span class="avatar small" style="--avatar:${r.color}">${r.avatar}</span><span><strong>${r.name}</strong><small>${preview}</small></span></button>`;
      }).join("")}
      ${convRoles.length === 0 ? `<p class="conv-empty">还没有对话记录，从左侧选择一个角色开始。</p>` : ""}
    </aside>
    <main class="chat-room">
      <header><h2>${state.selectedRole.name}</h2><div><button>电脑</button><button class="active">话题</button></div></header>
      <section class="messages" data-messages>
        ${messages.length <= 1 ? `<div class="chat-welcome"><span class="avatar portrait" style="--avatar:${state.selectedRole.color}">${state.selectedRole.avatar}</span><h2>${state.selectedRole.name}</h2><p>${state.selectedRole.title}</p><div class="quick-prompts">${quickPrompts.map((q) => `<button class="quick-btn" data-quick="${q}">${q}</button>`).join("")}</div></div>` : ""}
        ${messages.map((message) => `<div class="message ${message.from}">${message.text}<span class="msg-time">${message.time || timeStr}</span></div>`).join("")}
      </section>
      <form class="composer" data-chat-form>
        <div class="composer-meta">Deeppractice Auto <span>上下文</span><i></i><b>空闲</b></div>
        <textarea name="message" placeholder="Message ${state.selectedRole.name}" required data-chat-input></textarea>
        <button class="send" type="submit" data-send-btn>${icon("send")}</button>
      </form>
    </main>
    <aside class="topic-pane">
      <h3>话题 <button class="topic-refresh" title="刷新">↻</button></h3>
      ${topics.map((t) => `<div class="topic-card ${t.active ? "current" : ""}"><strong>${t.name} ${t.active ? '<em>当前</em>' : ""}</strong><span>${t.time}</span></div>`).join("")}
      <button class="new-topic" data-new-topic>+ 新建话题</button>
    </aside>
  `, "chat");
}

function accountPage() {
  const user = state.user;
  const bills = [
    { time: "2026-06-08 14:32", item: "billing.tx.recharge", sub: "completed · wechat", amount: "+$5.00", type: "green" },
    { time: "2026-06-05 09:18", item: "billing.tx.course_gen", sub: "completed · auto", amount: "-$0.50", type: "" },
    { time: "2026-05-28 16:45", item: "billing.tx.quiz_gen", sub: "completed · auto", amount: "-$0.30", type: "" },
    { time: "2026-04-27 07:11", item: "billing.tx.promotion", sub: "completed · manual", amount: "+$3.00", type: "green" }
  ];
  return appShell(`
    <main class="account-page">
      <section class="account-hero clay"><span class="avatar account">H</span><div><p>TeachZhao Account</p><h1>${user.name}</h1><p>一个账户覆盖 TeachZhao 的课程、AI 助教团、内容和工具。</p></div></section>
      <div class="account-grid">
        <section class="account-card clay"><h2>${icon("user")} 账户资料</h2><p>登录身份由 TeachZhao Account 提供</p><div class="field-grid"><div><span>邮箱</span><strong>${user.email}</strong></div><div><span>昵称</span><strong>${user.name}</strong></div><div><span>用户 ID</span><strong>${user.id}</strong></div></div></section>
        <section class="account-card clay balance"><h2>${icon("card")} 余额与充值</h2><p>共享 TeachZhao 账户余额</p><span>可用余额</span><strong>$${user.balance.toFixed(2)}</strong><div class="field-grid two"><div><span>账户余额</span><b>$${user.balance.toFixed(2)}</b></div><div><span>冻结金额</span><b>$${user.frozen.toFixed(2)}</b></div></div><button class="btn btn-primary" data-recharge>+ 充值</button></section>
        <section class="account-card clay"><h2>账单记录</h2><p>最近的充值、消费与退款</p><table><thead><tr><th>时间</th><th>项目</th><th>金额</th></tr></thead><tbody>${bills.map((b) => `<tr><td>${b.time}</td><td>${b.item}<br><small>${b.sub}</small></td><td class="${b.type}">${b.amount}</td></tr>`).join("")}</tbody></table></section>
        <section class="account-card clay"><h2>${icon("shield")} 账户用途</h2><p>同一余额会用于 TeachZhao 的付费能力。</p><p>课程、AI 助教团、内容工具会逐步接入同一个 TeachZhao 账户。充值后余额可被已接入的产品能力共享使用。</p></section>
      </div>
      <section class="account-card clay danger"><h2>安全与退出</h2><p>退出会清理当前浏览器会话</p><a class="btn btn-danger" href="#/" data-logout>退出当前账号</a></section>
      <div class="modal-overlay" data-modal style="display:none">
        <div class="modal-card clay">
          <h2>充值</h2>
          <p>选择充值金额</p>
          <div class="recharge-options">
            ${[5, 10, 20, 50].map((amount) => `<button class="recharge-btn clay" data-amount="${amount}">$${amount}</button>`).join("")}
          </div>
          <div class="modal-actions"><button class="btn btn-soft" data-modal-close>取消</button><button class="btn btn-primary" data-modal-confirm>确认充值</button></div>
        </div>
      </div>
    </main>
  `, "account");
}

function loginPage() {
  return shell(`
    <main class="auth-page">
      <section class="auth-card clay">
        <div class="auth-hero">
          <p class="eyebrow">TeachZhao Account</p>
          <h1>登录或注册</h1>
          <p class="lead">进入 TeachZhao AI 角色系统、与教育名家、专家角色进行对话。</p>
          <div class="auth-features">
            ${["与AI首席专家深度对话：7×24小时智能问答，赋能个性化对话任务", "AI专家团协同智诊：多智能体联合分析，精准追踪成长轨迹与能力短板", "数字分身复刻专家思维：萃取名师智慧，让优质教育资源无限复用", "多模态数据驱动决策：融合课堂观察、测评任务、培训记录，构建全景数字画像", "AI智人伴随式成长干预：实时响应学习困惑，提供有温度的智能陪伴"].map((item) => `<div class="auth-feature"><span class="auth-check">✓</span><span>${item}</span></div>`).join("")}
          </div>
        </div>
        <form class="auth-form" data-login-form>
          <label>账号<input name="account" type="text" placeholder="demo" value="demo" required /></label>
          <label>昵称<input name="name" placeholder="hh101" /></label>
          <label>身份<select name="role"><option>教师</option><option>学生</option><option>家长</option><option>机构</option></select></label>
          <button class="btn btn-primary wide" type="submit">登录智能体系统</button>
          <p class="form-status" data-login-status></p>
          <div class="auth-divider"><span>或</span></div>
          <div class="auth-social compact">
            <button class="btn btn-soft" type="button" data-social-login="wechat">微信登录</button>
            <button class="btn btn-soft" type="button" data-social-login="feishu">飞书登录</button>
          </div>
          <p class="auth-hint">首次登录即自动注册，无需额外操作。</p>
        </form>
      </section>
      <div class="qr-overlay" data-qr-overlay style="display:none">
        <div class="qr-card clay">
          <h2 data-qr-title>扫码登录</h2>
          <div class="qr-code-box"><div class="qr-pattern"></div><p class="qr-hint" data-qr-hint>请使用<span data-qr-platform>微信</span>扫描上方二维码</p></div>
          <p class="qr-status" data-qr-status>等待扫码...</p>
          <div class="qr-actions"><button class="btn btn-soft" data-qr-close>取消</button></div>
        </div>
      </div>
    </main>
  `, "/login");
}

function simplePage(kind) {
  if (kind === "/pricing") return shell(`<main>${pricingSection()}${faqSection()}${footer()}</main>`, "/pricing");
  if (kind === "/product") return shell(`<main>
    <section class="section"><p class="eyebrow">TeachZhao 产品</p><h1>AI 教师能力，从一个角色开始</h1><p class="lead">实时讲解、课程生成、智能测验、学习报告和教师工作台——所有能力都可以通过角色系统组织和调用。</p></section>
    <section class="section soft">
      <h2>五大核心能力</h2>
      <div class="feature-grid">
        ${[
          ["实时讲解", "像真人老师一样解释概念、拆解题目。支持追问、简化、例题生成。", "🧠"],
          ["课程生成", "输入学习目标，自动生成课程大纲、每节内容和复习计划。", "📚"],
          ["智能练习", "按知识点生成选择题、填空题、问答题，即时反馈和解析。", "✏️"],
          ["学习报告", "掌握度、薄弱点、学习时长、进步曲线一目了然。", "📊"],
          ["教师工作台", "备课、出题、讲义生成、班级学情报告，教师效率翻倍。", "🎓"]
        ].map(([title, text, emoji], index) => `<article class="feature-card clay reveal"><span>${emoji}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}
      </div>
    </section>
    ${demoSection()}
    <section class="section">
      <h2>谁在用 TeachZhao？</h2>
      <div class="feature-grid">
        ${[
          ["学生自学", "K12 作业辅导、大学课程辅助、编程学习陪练。"],
          ["教师备课", "快速生成课程、讲义、测验，查看班级学情。"],
          ["家长规划", "制定学习计划、追踪薄弱点、获取沟通建议。"],
          ["机构交付", "标准化课程内容、多班级管理、品牌化角色。"]
        ].map(([title, text]) => `<article class="feature-card clay"><h3>${title}</h3><p>${text}</p></article>`).join("")}
      </div>
    </section>
    ${statsSection()}${footer()}</main>`, "/product");
  if (kind === "/solutions") return shell(`<main>
    <section class="section"><p class="eyebrow">解决方案</p><h1>每个角色，解决一个真实问题</h1><p class="lead">TeachZhao 的角色系统让教育场景和通用场景都能找到合适的 AI 协作方式。</p></section>
    <section class="section soft">
      <h2>教育场景</h2>
      <div class="solution-grid">
        ${[
          { persona: "学生", icon: "🎒", color: "#2862f2", scenarios: ["作业辅导与错题解析", "考试复习与编程陪练", "个性化学习路径推荐", "每日学习任务与打卡"], benefit: "从被动听课到主动追问，学习效率提升 3 倍。" },
          { persona: "教师", icon: "👩‍🏫", color: "#13c875", scenarios: ["课程大纲与讲义生成", "课堂测验与批改", "班级学情数据分析", "个性化辅导建议"], benefit: "备课时间从 2 小时缩短到 30 分钟。" },
          { persona: "家长", icon: "👨‍👩‍👧", color: "#f35a13", scenarios: ["孩子学习计划制定", "薄弱知识点追踪", "亲子沟通建议", "成长观察记录"], benefit: "辅导作业不再鸡飞狗跳。" },
          { persona: "机构", icon: "🏫", color: "#7c3aed", scenarios: ["标准化课程交付", "多校区班级管理", "品牌化 AI 角色", "学员数据看板"], benefit: "服务成本降低 40%，学员满意度提升。" }
        ].map((s) => `<article class="solution-card clay"><div class="solution-head"><span class="solution-icon" style="background:${s.color}15;color:${s.color}">${s.icon}</span><h3>${s.persona}</h3></div><ul class="solution-list">${s.scenarios.map((item) => `<li>${item}</li>`).join("")}</ul><p class="solution-benefit">${s.benefit}</p><a class="btn btn-primary small" href="#/agents" data-link>开始使用</a></article>`).join("")}
      </div>
    </section>
    <section class="section">
      <h2>通用场景</h2>
      <div class="feature-grid">
        ${[
          ["数字分身", "把你的思维方式和专业知识提炼为一个可对话的 AI 分身。"],
          ["角色军团", "组织多个角色协作：策略师、执行者、审核者、教练。"],
          ["个人公司", "用角色军团替代一个团队，完成从创意到交付的全流程。"]
        ].map(([title, text]) => `<article class="feature-card clay"><h3>${title}</h3><p>${text}</p></article>`).join("")}
      </div>
    </section>
    ${testimonialsSection()}${footer()}</main>`, "/solutions");
  if (kind === "/guide") return shell(`<main>
    <section class="section"><p class="eyebrow">使用指南</p><h1>5 分钟上手 TeachZhao</h1><p class="lead">从选择场景开始，进入角色系统，和角色对话，再把结果沉淀为课程与计划。</p></section>
    <section class="section soft">
      <h2>快速上手</h2>
      <div class="guide-steps">
        ${[
          { step: 1, title: "选择场景", desc: "在首页选择「教育场景」或「通用场景」，系统会为你推荐合适的角色入口。", tip: "不确定？先从「进入角色系统」浏览所有角色。" },
          { step: 2, title: "认识角色", desc: "每个角色都有专属能力：女娲创造角色、孔子启发教学、孟母规划家庭学习。点击查看角色的认知网络和简介。", tip: "点击角色卡片可以查看完整的认知网络和管理选项。" },
          { step: 3, title: "发起对话", desc: "点击「进入对话」，输入你的问题或学习目标。AI 角色会用它独特的方式回应你。", tip: "试试输入：我想三天学会二次函数图像。" },
          { step: 4, title: "生成课程与测验", desc: "对话中可以生成课程大纲、智能测验和复习计划，把学习过程结构化。", tip: "在首页演示区也可以快速体验课程生成。" },
          { step: 5, title: "追踪与复盘", desc: "进入账户页面查看学习记录、掌握度和下一步建议。错题自动进入复习列表。", tip: "教师可以在工作台查看班级整体学情。" }
        ].map((s) => `<article class="guide-step clay reveal"><div class="guide-step-num">${s.step}</div><div class="guide-step-body"><h3>${s.title}</h3><p>${s.desc}</p><p class="guide-tip">💡 ${s.tip}</p></div></article>`).join("")}
      </div>
    </section>
    <section class="section">
      <h2>常见问题</h2>
      ${faqSection().replace('<section class="section faq">', '<div class="faq">').replace(/<h2>.*?<\/h2>/, '').replace(/<p class="eyebrow">.*?<\/p>/, '')}
    </section>
    ${footer()}</main>`, "/guide");
  if (kind === "/about") return shell(`<main>
    <section class="section"><p class="eyebrow">关于 TeachZhao</p><h1>让每个人都拥有 AI 教师团队</h1><p class="lead">TeachZhao 由 Deeppractice.ai 团队打造，致力于用角色系统连接 AI 能力和真实学习场景。</p></section>
    <section class="section soft">
      <h2>我们的愿景</h2>
      <div class="feature-grid">
        <article class="feature-card clay"><span>🎯</span><h3>使命</h3><p>让优质教育不再受限于地域、师资和成本，让每个学生都有专属的 AI 教师团队。</p></article>
        <article class="feature-card clay"><span>🌱</span><h3>理念</h3><p>AI 不是替代老师，而是让老师更强。角色系统让 AI 能力可组织、可追溯、可复盘。</p></article>
        <article class="feature-card clay"><span>🤝</span><h3>团队</h3><p>由教育从业者、AI 工程师和产品设计师组成，深耕教育场景与 AI 协作。</p></article>
      </div>
    </section>
    ${footer()}</main>`, "/about");
  return shell(`<main class="simple-page"><section class="section"><p class="eyebrow">TeachZhao</p><h1>页面未找到</h1><p class="lead">请返回首页继续浏览。</p></section>${footer()}</main>`, "/");
}

function render() {
  const path = (location.hash.replace("#", "") || "/").split("?")[0];
  state.route = path;
  const routes = {
    "/": homePage,
    "/agents": agentsPage,
    "/chat": chatPage,
    "/account": accountPage,
    "/login": loginPage,
    "/product": () => simplePage("/product"),
    "/solutions": () => simplePage("/solutions"),
    "/guide": () => simplePage("/guide"),
    "/pricing": () => simplePage("/pricing"),
    "/about": () => simplePage("/about")
  };
  app.innerHTML = (routes[path] || homePage)();
  bindEvents();
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("in"); observer.unobserve(entry.target); } });
    }, { threshold: 0.12 });
    reveals.forEach((node) => observer.observe(node));
  } else {
    reveals.forEach((node) => node.classList.add("in"));
  }
}

function bindEvents() {
  document.querySelector("[data-mobile]")?.addEventListener("click", () => {
    document.querySelector("[data-mobile-nav]")?.classList.toggle("open");
  });
  document.querySelector("[data-search]")?.addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase().trim();
    document.querySelectorAll(".agent-item").forEach((item) => {
      const text = item.textContent.toLowerCase();
      item.style.display = (!query || text.includes(query)) ? "" : "none";
    });
  });
  document.querySelectorAll("[data-role]").forEach((button) => button.addEventListener("click", () => {
    state.selectedRole = roles.find((role) => role.id === button.dataset.role) || roles[0];
    location.hash = "/agents";
  }));
  document.querySelectorAll("[data-select-role]").forEach((button) => button.addEventListener("click", () => {
    const allRoles = getAllRoles();
    state.selectedRole = allRoles.find((role) => role.id === button.dataset.selectRole) || state.selectedRole;
    render();
  }));
  document.querySelector("[data-expert-toggle]")?.addEventListener("click", () => {
    state.expertExpanded = !state.expertExpanded;
    render();
  });
  document.querySelectorAll("[data-select-expert]").forEach((button) => button.addEventListener("click", () => {
    const allExperts = eduExperts.flatMap((g) => g.items);
    state.selectedRole = allExperts.find((e) => e.id === button.dataset.selectExpert) || state.selectedRole;
    render();
  }));
  document.querySelectorAll("[data-chat-role]").forEach((button) => button.addEventListener("click", () => {
    const allRoles = getAllRoles();
    const target = allRoles.find((r) => r.id === button.dataset.chatRole);
    if (target) {
      state.selectedRole = target;
      touchConversation(target.id);
      render();
    }
  }));
  document.querySelectorAll("[data-use]").forEach((button) => button.addEventListener("click", () => {
    state.activeUse = button.dataset.use;
    render();
  }));
  document.querySelector("[data-price-toggle]")?.addEventListener("change", (event) => {
    state.yearly = event.target.checked;
    render();
  });
  document.querySelectorAll("[data-quick]").forEach((button) => button.addEventListener("click", () => {
    const input = document.querySelector("[data-chat-input]");
    if (input) { input.value = button.dataset.quick; input.focus(); }
  }));
  document.querySelector("[data-new-topic]")?.addEventListener("click", () => {
    const roleId = state.selectedRole.id;
    const time = new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
    state.conversations[roleId] = [{ from: "ai", text: `你好，我是 ${state.selectedRole.name}。新话题已创建，请告诉我你想学习或讨论什么。`, time }];
    touchConversation(roleId);
    render();
  });
  document.querySelector("[data-chat-input]")?.addEventListener("input", (event) => {
    const btn = document.querySelector("[data-send-btn]");
    if (btn) btn.style.background = event.target.value.trim() ? "var(--blue)" : "#b7b7b7";
  });
  document.querySelector("[data-course-form]")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = document.querySelector("[data-course-result]");
    result.innerHTML = "<p>正在生成课程...</p>";
    const response = await fetch(apiUrl("/api/course"), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(form)) });
    state.course = await response.json();
    result.innerHTML = `<h3>${state.course.title}</h3>${state.course.lessons.map((lesson) => `<details open><summary>${lesson.title}</summary><p>${lesson.detail}</p></details>`).join("")}<p>${state.course.reviewPlan}</p>`;
  });
  document.querySelector("[data-chat-form]")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const textarea = event.currentTarget.message;
    const text = textarea.value.trim();
    if (!text) return;
    const roleId = state.selectedRole.id;
    const msgs = getRoleMessages(roleId);
    const time = new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
    msgs.push({ from: "user", text, time });
    touchConversation(roleId);
    textarea.value = "";
    render();
    const response = await fetch(apiUrl("/api/chat"), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: text, persona: state.selectedRole.name, personaData: state.selectedRole.persona || "" }) });
    const data = await response.json();
    const aiTime = new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
    const aiMsgs = getRoleMessages(roleId);
    aiMsgs.push({ from: "ai", text: `${data.answer.join("\n")}\n\n快捷操作：${data.actions.join(" / ")}`, time: aiTime });
    render();
  });
  document.querySelector("[data-recharge]")?.addEventListener("click", () => {
    const modal = document.querySelector("[data-modal]");
    if (modal) modal.style.display = "flex";
  });
  document.querySelector("[data-modal-close]")?.addEventListener("click", () => {
    const modal = document.querySelector("[data-modal]");
    if (modal) modal.style.display = "none";
  });
  document.querySelectorAll("[data-amount]").forEach((btn) => btn.addEventListener("click", () => {
    document.querySelectorAll("[data-amount]").forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");
  }));
  document.querySelector("[data-modal-confirm]")?.addEventListener("click", () => {
    const selected = document.querySelector("[data-amount].selected");
    if (selected) {
      state.user.balance += Number(selected.dataset.amount);
      document.querySelector("[data-modal]").style.display = "none";
      render();
    }
  });
  document.querySelector("[data-logout]")?.addEventListener("click", (event) => {
    event.preventDefault();
    state.loggedIn = false;
    state.user = { name: "hh101", email: "demo@teachzhao.ai", id: "usr_27908a2c3d6f", balance: 3, frozen: 0 };
    try { localStorage.removeItem(LIVE_PANEL_SESSION_KEY); } catch (_) {}
    location.hash = "/";
  });
  document.querySelector("[data-login-form]")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const status = document.querySelector("[data-login-status]");
    status.textContent = "正在进入...";
    const account = String(form.get("account") || "").trim();
    const email = account.includes("@") ? account : `${account}@teachzhao.ai`;
    const response = await fetch(apiUrl("/api/login"), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, name: form.get("name") || account, role: form.get("role") }) });
    const data = await response.json();
    if (data.error) {
      status.textContent = data.error;
      return;
    }
    state.user = data.user;
    state.loggedIn = true;
    persistLivePanelSession();
    location.hash = "/agents";
  });
  document.querySelectorAll("[data-social-login]").forEach((btn) => btn.addEventListener("click", () => {
    const platform = btn.dataset.socialLogin;
    const overlay = document.querySelector("[data-qr-overlay]");
    const titleEl = document.querySelector("[data-qr-title]");
    const platformEl = document.querySelector("[data-qr-platform]");
    const statusEl = document.querySelector("[data-qr-status]");
    if (!overlay) return;
    const label = platform === "wechat" ? "微信" : "飞书";
    titleEl.textContent = `${label}扫码登录`;
    platformEl.textContent = label;
    statusEl.textContent = "等待扫码...";
    statusEl.className = "qr-status";
    overlay.style.display = "flex";
    let countdown = 3;
    const timer = setInterval(() => {
      countdown--;
      if (countdown > 0) {
        statusEl.textContent = `扫码中... ${countdown}秒后自动确认`;
      } else {
        clearInterval(timer);
        statusEl.textContent = "✓ 扫码成功，正在登录...";
        statusEl.classList.add("success");
        setTimeout(async () => {
          const response = await fetch(apiUrl("/api/login"), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: "demo@teachzhao.ai", name: "hh101", role: "teacher" }) });
          const data = await response.json();
          state.user = data.user;
          state.loggedIn = true;
          persistLivePanelSession();
          overlay.style.display = "none";
          location.hash = "/agents";
        }, 800);
      }
    }, 1000);
    overlay._timer = timer;
  }));
  document.querySelector("[data-qr-close]")?.addEventListener("click", () => {
    const overlay = document.querySelector("[data-qr-overlay]");
    if (overlay) {
      if (overlay._timer) clearInterval(overlay._timer);
      overlay.style.display = "none";
    }
  });
}

window.addEventListener("hashchange", render);
render();
