// ============================================================
// articleStore：文章状态管理（实验四新增）
// state    ：文章列表 list
// getters  ：totalCount / publishedCount（按发布状态派生）
// actions  ：addArticle / updateArticle / removeArticle，自动持久化
// ============================================================
import { defineStore } from 'pinia'

const STORAGE_KEY = 'articles'

const defaultArticles = [
  {
    id: 1,
    title: 'Vue3 Composition API 上手笔记',
    category: '前端框架',
    summary: '整理 setup 语法糖、ref/reactive、computed 与生命周期钩子的核心用法。',
    content:
      'Composition API 把同一逻辑关注点的代码组织在一起，相比 Options API 更易复用和维护。配合 <script setup> 语法糖，代码更加简洁。',
    published: true,
    date: '2026-09-12'
  },
  {
    id: 2,
    title: 'Pinia 状态管理实践',
    category: '状态管理',
    summary: '记录 Pinia 的 state / getters / actions 三件套以及 storeToRefs 的正确姿势。',
    content:
      'Pinia 是 Vue3 官方推荐的状态库。注意：直接解构 store 会丢失响应式，必须用 storeToRefs 包裹 state 与 getters。',
    published: true,
    date: '2026-10-08'
  },
  {
    id: 3,
    title: '我的第一个 Element Plus 页面',
    category: 'UI组件库',
    summary: '从全局注册到使用 el-table、el-dialog 搭建后台管理界面的踩坑记录。',
    content:
      'Element Plus 组件丰富，通过属性、事件、插槽即可快速搭建规范界面，是中后台系统的常用选择。',
    published: false,
    date: '2026-10-15'
  }
]

function loadList() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch (e) {
    /* ignore */
  }
  return JSON.parse(JSON.stringify(defaultArticles))
}

export const useArticleStore = defineStore('article', {
  state: () => ({
    list: loadList()
  }),

  getters: {
    totalCount: (state) => state.list.length,
    publishedCount: (state) => state.list.filter((a) => a.published).length
  },

  actions: {
    _persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.list))
    },
    addArticle(payload) {
      const maxId = this.list.reduce((m, a) => Math.max(m, a.id), 0)
      this.list.unshift({
        id: maxId + 1,
        title: payload.title || '未命名文章',
        category: payload.category || '未分类',
        summary: payload.summary || '',
        content: payload.content || '',
        published: !!payload.published,
        date: new Date().toISOString().slice(0, 10)
      })
      this._persist()
    },
    updateArticle(id, patch) {
      const idx = this.list.findIndex((a) => a.id === id)
      if (idx !== -1) {
        this.list[idx] = { ...this.list[idx], ...patch }
        this._persist()
      }
    },
    removeArticle(id) {
      this.list = this.list.filter((a) => a.id !== id)
      this._persist()
    }
  }
})
