const DATA = {
  users: [
    {
      id: "usr_27908a2c3d6f",
      email: "demo@teachzhao.ai",
      name: "hh101",
      role: "teacher",
      balance: 3,
      frozen: 0
    }
  ],
  conversations: []
};

export function makeTutorReply(message = "", persona = "Nüwa", personaData = "") {
  const topic = message.trim() || "今天的学习目标";
  const simple = topic.length > 26 ? `${topic.slice(0, 26)}...` : topic;

  if (persona === "TeachZhao" || personaData.includes("AI首席教育专家")) {
    return makeTeachZhaoReply(topic, simple);
  }

  return {
    persona,
    answer: [
      `我会用 ${persona} 的方式陪你拆解「${simple}」。`,
      "第一步：先确认你已经知道的概念，把陌生词换成生活里的例子。",
      "第二步：给出一个最小练习，用反馈判断该继续讲解还是提高难度。",
      "第三步：把易错点加入复习列表，明天用 3 分钟快速回看。"
    ],
    actions: ["再讲简单一点", "给我例题", "生成 5 题测验", "整理成课程"]
  };
}

function makeTeachZhaoReply(topic, simple) {
  const lower = topic.toLowerCase();
  let focus, steps, tools;

  if (lower.includes("课") || lower.includes("教学") || lower.includes("备")) {
    focus = "AI赋能教学设计";
    steps = [
      "📋 教学设计分析：先明确课标目标与学生起点，用「逆向设计」思路从预期结果倒推评估证据和学习体验。",
      "🤖 AI赋能点：我可以用生成式AI帮你完成三件事——① 自动生成教学导入情境与问题链；② 根据班级学情数据生成分层练习；③ 把知识点转化为互动式探究任务。",
      "🎯 实施建议：建议从一个小单元开始试点，比如一个3课时的主题。先用AI生成教学设计初稿，再由教师根据经验调整，最后用课堂数据验证效果。",
      "📊 效果评估：关注三个指标——学生主动提问次数、分层任务完成率、课后自评与AI评估的一致性。"
    ];
    tools = ["生成教学设计", "分析学情数据", "定制分层练习", "输出课堂报告"];
  } else if (lower.includes("数字") || lower.includes("转型") || lower.includes("治理") || lower.includes("画像")) {
    focus = "教育数字化转型";
    steps = [
      "🏗️ 顶层设计：数字化转型不只是买系统，而是重塑教育流程。建议分三步走——数据采集标准化 → 分析模型场景化 → 决策反馈实时化。",
      "👤 数字画像：构建师生数字画像需要整合多维数据——学业表现、行为轨迹、社交互动、情感状态。画像不是贴标签，而是为个性化支持提供依据。",
      "🔗 数据治理：关键是打通数据孤岛。建议建立统一数据中台，制定数据采集规范，同时确保隐私合规（个人信息保护法、未成年人保护法）。",
      "⚡ 快速见效：选一个痛点场景做MVP，比如「作业负担智能预警」或「薄弱知识点自动推送」，3个月内看到数据改善再推广。"
    ];
    tools = ["规划转型路径", "设计数据指标", "构建数字画像", "输出治理方案"];
  } else if (lower.includes("学生") || lower.includes("学情") || lower.includes("薄弱") || lower.includes("分析")) {
    focus = "学情分析与个性化支持";
    steps = [
      "📈 多维诊断：学情分析不能只看分数。需要从知识掌握度、学习习惯、认知风格、情感状态四个维度综合判断。",
      "🔍 薄弱定位：通过错题聚类分析，可以区分三类问题——① 知识漏洞（需要补讲）；② 方法缺失（需要建模训练）；③ 粗心失误（需要审题策略）。不同类型的干预方式完全不同。",
      "🎯 个性化路径：为每个学生生成学习路径建议——核心是「最近发展区」原则，推送略高于当前水平的挑战任务，避免过难或过易。",
      "👨‍👩‍👧 家校协同：把学情报告转化为家长能理解的语言，重点说「孩子在哪里进步了」和「下一步可以怎么配合」，避免只报分数。"
    ];
    tools = ["生成学情报告", "错题聚类分析", "定制学习路径", "输出家长沟通建议"];
  } else {
    focus = "AI教育咨询";
    steps = [
      `🎯 问题分析：你提到的「${simple}」是一个很好的教育实践方向。让我从AI赋能教育的角度为你拆解。`,
      "💡 核心理念：AI在教育中的价值不是替代教师，而是让教师从重复性脑力劳动中解放出来，把更多精力放在创造性教学和个性化关怀上。",
      "🛠️ 实施路径：建议分三步——① 用AI工具处理标准化工作（出题、批改、数据统计）；② 用AI辅助教学设计（生成情境、问题链、探究任务）；③ 用AI支持个性化学习（自适应推送、智能答疑、学习报告）。",
      "📊 衡量标准：最终要看三个指标——教师工作负担是否减轻、学生学习主动性是否提升、教育公平性是否改善。"
    ];
    tools = ["生成解决方案", "规划实施路径", "设计评估指标", "输出分析报告"];
  }

  return {
    persona: "TeachZhao",
    answer: [
      `你好！作为AI首席教育专家，我来帮你深入分析「${simple}」这个问题。`,
      `🔑 聚焦方向：${focus}`,
      ...steps,
      "💬 我的价值主张：AI的使命不是替代人类，而是让人从重复脑力劳动中解放，回归人的价值。教育是这场变革的引擎。"
    ],
    actions: tools
  };
}

export function makeCourse(goal = "AI 教师入门", subject = "综合学习", level = "进阶") {
  return {
    title: `${subject} · ${goal}`,
    level,
    lessons: [
      { title: "建立知识地图", detail: "识别目标、先修知识、易错点和输出成果。" },
      { title: "互动讲解与例题", detail: "用追问、类比和即时检测完成概念理解。" },
      { title: "测验与复盘", detail: "生成练习，记录薄弱点，安排下一轮复习。" }
    ],
    reviewPlan: "第 1、3、7 天各复盘一次，并保留错题讲解。"
  };
}

export function handleApiRequest(method, pathname, body = {}) {
  if (pathname === "/api/chat" && method === "POST") {
    const reply = makeTutorReply(body.message, body.persona, body.personaData || "");
    DATA.conversations.push({
      id: `talk_${Date.now()}`,
      question: body.message,
      reply,
      createdAt: new Date().toISOString()
    });
    return { status: 200, payload: reply };
  }

  if (pathname === "/api/course" && method === "POST") {
    return { status: 200, payload: makeCourse(body.goal, body.subject, body.level) };
  }

  if (pathname === "/api/quiz" && method === "POST") {
    return {
      status: 200,
      payload: {
        topic: body.topic || "个性化学习",
        questions: [
          {
            id: 1,
            type: "choice",
            question: "AI 老师最适合在学习闭环中承担哪项任务？",
            options: ["替代所有考试", "即时讲解与反馈", "隐藏学习进度"],
            answer: "即时讲解与反馈",
            explanation: "互动讲解、练习反馈和复盘建议是 AI 教师最核心的价值。"
          },
          {
            id: 2,
            type: "short",
            question: "写出一个你希望 TeachZhao 帮你生成的学习目标。",
            answer: "清晰、可衡量的学习目标",
            explanation: "目标越具体，课程和练习越容易个性化。"
          }
        ]
      }
    };
  }

  if (pathname === "/api/login" && method === "POST") {
    const email = String(body.email || "").trim();
    if (!email.includes("@")) {
      return { status: 422, payload: { error: "请输入有效邮箱" } };
    }
    const user = DATA.users.find((item) => item.email === email) || {
      id: `usr_${Math.random().toString(16).slice(2, 14)}`,
      email,
      name: email.split("@")[0],
      role: "student",
      balance: 0,
      frozen: 0
    };
    return { status: 200, payload: { user, token: "local-demo-token" } };
  }

  if (pathname === "/api/account" && method === "GET") {
    return { status: 200, payload: DATA.users[0] };
  }

  return { status: 404, payload: { error: "Not found" } };
}
