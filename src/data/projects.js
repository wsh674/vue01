// ============================================================
// 项目数据模块
// 作用：集中维护项目列表数据，为项目中心（列表 / 详情 / 统计）
//       和后台管理（项目编辑）提供数据读写接口。
// ============================================================

export const defaultProjects = [
  {
    id: 1,
    name: "个人主页",
    summary: "基于 Vue 3 与 Vite 构建的个人信息展示页面，支持暗色模式切换与技能关键词筛选。",
    description:
      "该页面由顶部导航、主体卡片和底部信息三部分组成：主体卡片展示个人资料、个人简介与技能列表，支持暗色模式切换、技能关键词筛选；组件化拆分清晰，包含 AppHeader、ProfileCard、SkillList 等多个可复用组件。",
    tags: ["Vue3", "Vite", "组件化"],
    status: "已完成",
    progress: 100
  },
  {
    id: 2,
    name: "待办事项应用",
    summary: "支持新增、勾选、删除的待办清单工具，使用 localStorage 持久化保存数据。",
    description:
      "用户可以新增待办事项、勾选完成状态、删除不再需要的事项；数据保存在浏览器 localStorage 中，刷新页面后仍然保留，界面简洁、响应快速。",
    tags: ["JavaScript", "LocalStorage"],
    status: "开发中",
    progress: 60
  },
  {
    id: 3,
    name: "天气查询工具",
    summary: "调用第三方天气 API 的实时天气查询小工具，按城市展示温度、湿度和未来三天预报。",
    description:
      "在输入框中输入城市名称，调用第三方天气接口获取实时天气数据，展示当前温度、湿度以及未来三天的天气预报，帮助用户快速了解目标城市的天气状况。",
    tags: ["API", "Fetch"],
    status: "规划中",
    progress: 20
  }
]

// 读取项目列表：优先使用后台管理保存过的数据，否则返回默认值
export function getProjects() {
  const saved = localStorage.getItem("projects")
  return saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(defaultProjects))
}

// 保存项目列表（由后台管理页调用，写入 localStorage 持久化）
export function saveProjects(data) {
  localStorage.setItem("projects", JSON.stringify(data))
}
