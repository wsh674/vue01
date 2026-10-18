// ============================================================
// profileStore：个人信息与技能状态管理
// state    ：个人档案 profile、技能列表 skills
// getters  ：skillCount（派生技能数量）
// actions  ：saveProfile / saveSkills，自动持久化
// ============================================================
import { defineStore } from 'pinia'
import { defaultProfile, defaultSkills } from '@/data/profile.js'

function loadProfile() {
  try {
    const saved = localStorage.getItem('profile')
    if (saved) return JSON.parse(saved)
  } catch (e) {
    /* ignore */
  }
  return { ...defaultProfile }
}

function loadSkills() {
  try {
    const saved = localStorage.getItem('skills')
    if (saved) return JSON.parse(saved)
  } catch (e) {
    /* ignore */
  }
  return [...defaultSkills]
}

export const useProfileStore = defineStore('profile', {
  state: () => ({
    profile: loadProfile(),
    skills: loadSkills()
  }),

  getters: {
    skillCount: (state) => state.skills.length
  },

  actions: {
    saveProfile(patch) {
      this.profile = { ...this.profile, ...patch }
      localStorage.setItem('profile', JSON.stringify(this.profile))
    },
    saveSkills(list) {
      this.skills = [...list]
      localStorage.setItem('skills', JSON.stringify(this.skills))
    }
  }
})
