// ============================================================
// projectStore：项目作品状态管理（跨项目列表/详情/统计/管理页共享）
// state    ：项目列表 list
// getters  ：totalCount / finishedCount / inProgressCount（派生统计）
// actions  ：addProject / updateProject / removeProject，修改后自动持久化
// ============================================================
import { defineStore } from 'pinia'
import { defaultProjects } from '@/data/projects.js'

const STORAGE_KEY = 'projects'

function loadList() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch (e) {
    /* ignore */
  }
  return JSON.parse(JSON.stringify(defaultProjects))
}

export const useProjectStore = defineStore('project', {
  state: () => ({
    list: loadList()
  }),

  getters: {
    totalCount: (state) => state.list.length,
    finishedCount: (state) => state.list.filter((p) => p.status === '已完成').length,
    inProgressCount: (state) => state.list.filter((p) => p.status === '开发中').length
  },

  actions: {
    _persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.list))
    },
    addProject(payload) {
      const maxId = this.list.reduce((m, p) => Math.max(m, p.id), 0)
      this.list.push({
        id: maxId + 1,
        name: payload.name || '新项目',
        summary: payload.summary || '待补充项目简介。',
        description: payload.description || '待补充项目详细描述。',
        tags: payload.tags || ['Vue3'],
        status: payload.status || '规划中',
        progress: payload.progress ?? 0
      })
      this._persist()
    },
    updateProject(id, patch) {
      const idx = this.list.findIndex((p) => p.id === id)
      if (idx !== -1) {
        this.list[idx] = { ...this.list[idx], ...patch }
        this._persist()
      }
    },
    removeProject(id) {
      this.list = this.list.filter((p) => p.id !== id)
      this._persist()
    },
    resetToDefault() {
      this.list = JSON.parse(JSON.stringify(defaultProjects))
      this._persist()
    }
  }
})
