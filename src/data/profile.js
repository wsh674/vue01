// ============================================================
// 个人信息数据模块
// 作用：集中维护个人主页的基础数据（基本信息、技能列表），
//       并提供 localStorage 读写接口，供所有页面组件共享。
// ============================================================

export const defaultProfile = {
  avatar: "61be7894c7f74433771a1e608df15ed2.png",
  name: "王双红",
  studentId: "249980934",
  className: "24计科2班",
  major: "计算机科学与技术",
  role: "Web 前端学习者",
  location: "中国 · 重庆",
  intro:
    "对Web前端开发抱有浓厚兴趣，正在学习Vue3相关技术，掌握HTML、CSS、JavaScript基础，平时乐于编写代码，主动接触各类新技术，在开发过程中重视代码编写规范。"
}

export const defaultSkills = [
  "HTML",
  "CSS",
  "JavaScript",
  "Vue3",
  "MySQL",
  "Python",
  "Node.js"
]

// 读取个人信息：优先使用后台管理保存过的数据，否则返回默认值
export function getProfile() {
  const saved = localStorage.getItem("profile")
  return saved ? JSON.parse(saved) : { ...defaultProfile }
}

// 保存个人信息（由后台管理页调用，写入 localStorage 持久化）
export function saveProfile(data) {
  localStorage.setItem("profile", JSON.stringify(data))
}

// 读取技能列表
export function getSkills() {
  const saved = localStorage.getItem("skills")
  return saved ? JSON.parse(saved) : [...defaultSkills]
}
