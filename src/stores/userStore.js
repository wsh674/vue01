// ============================================================
// userStore：用户（所有者）登录状态管理
// state    ：登录标记、用户名
// getters  ：displayName（派生展示名）
// actions  ：login / logout，内部手动同步 localStorage 实现持久化
// ============================================================
import { defineStore } from 'pinia'

const STORAGE_KEY = 'userStore'

// 从 localStorage 恢复初始登录状态（刷新后不丢失）
function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (saved) return saved
  } catch (e) {
    /* 忽略损坏的缓存 */
  }
  return { isLoggedIn: false, username: '' }
}

export const useUserStore = defineStore('user', {
  state: () => loadState(),

  getters: {
    // 派生值：未登录时显示“访客”，登录后显示用户名
    displayName: (state) => (state.isLoggedIn ? state.username : '访客')
  },

  actions: {
    // 演示口令：owner。验证成功后写入 state 并持久化
    login(code) {
      if (code === 'owner') {
        this.isLoggedIn = true
        this.username = '王双红'
        this._persist()
        return true
      }
      return false
    },
    logout() {
      this.isLoggedIn = false
      this.username = ''
      this._persist()
    },
    // 私有 action：把当前 state 同步到 localStorage
    _persist() {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ isLoggedIn: this.isLoggedIn, username: this.username })
      )
    }
  }
})
