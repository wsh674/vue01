<template>
  <!-- 根布局：Element Plus el-container 垂直布局（顶栏 / 内容 / 底栏） -->
  <el-container class="app-shell" :class="{ dark: isDarkTheme }">
    <el-header class="app-header" height="60px">
      <div class="header-inner">
        <RouterLink :to="{ name: 'home' }" class="brand">
          <span class="brand-logo">王</span>
          <span class="brand-name">王双红的个人主页</span>
        </RouterLink>

        <!-- el-menu：模式 horizontal 实现顶部导航，router 模式按 index 跳转命名路由 -->
        <el-menu
          :default-active="activeMenu"
          class="nav-menu"
          mode="horizontal"
          :ellipsis="false"
          router
        >
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/projects/list">项目作品</el-menu-item>
          <el-menu-item index="/articles">文章</el-menu-item>
          <el-menu-item index="/about">关于我</el-menu-item>
        </el-menu>

        <div class="header-actions">
          <el-button
            v-if="userStore.isLoggedIn"
            size="small"
            type="warning"
            plain
            @click="goManage"
          >管理后台</el-button>
          <el-button
            size="small"
            :type="userStore.isLoggedIn ? 'info' : 'primary'"
            plain
            @click="onLogout"
          >
            {{ userStore.isLoggedIn ? '退出登录' : '登录' }}
          </el-button>
          <el-button size="small" @click="switchTheme">
            {{ isDarkTheme ? '亮色' : '暗色' }}
          </el-button>
        </div>
      </div>
    </el-header>

    <el-main class="app-main">
      <RouterView />
    </el-main>

    <el-footer class="app-footer">
      © 2026 王双红（学号 249980934）· Vue3 + Pinia + Vue Router + Element Plus · 实验四
    </el-footer>
  </el-container>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/userStore.js'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const { isLoggedIn } = storeToRefs(userStore)

const isDarkTheme = ref(false)
const activeMenu = computed(() => {
  if (route.path.startsWith('/projects')) return '/projects/list'
  if (route.path.startsWith('/articles')) return '/articles'
  return route.path
})

function switchTheme() {
  isDarkTheme.value = !isDarkTheme.value
}
function goManage() {
  router.push({ name: 'manage-projects' })
}
function onLogout() {
  if (userStore.isLoggedIn) {
    userStore.logout()
    ElMessage.success('已退出登录')
    router.push({ name: 'home' })
  } else {
    router.push({ name: 'login' })
  }
}
</script>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: "Microsoft YaHei", system-ui, sans-serif; }
#app { min-height: 100vh; }

/* 全局主题变量：兼容旧页面组件（卡片/输入/按钮等） */
:root {
  --text-color: #234;
  --meta-color: #555;
  --card-bg: #ffffff;
  --card-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  --intro-bg: #f0f9ff;
  --input-bg: #ffffff;
  --input-border: #ccd6e0;
  --input-color: #222;
  --skill-bg: #e6f7ff;
  --skill-color: #1677b8;
  --avatar-border: #ffffff;
}
.app-shell.dark {
  --text-color: #e6f4ff;
  --meta-color: #adbac7;
  --card-bg: #22272e;
  --card-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
  --intro-bg: #1e4059;
  --input-bg: #2d333b;
  --input-border: #444c56;
  --input-color: #e6edf3;
  --skill-bg: #24516d;
  --skill-color: #91d5ff;
  --avatar-border: #22272e;
}
</style>

<style scoped>
.app-shell {
  min-height: 100vh;
  background: linear-gradient(135deg, #eaf6ff 0%, #cfeaff 100%);
  transition: background 0.4s ease;
}
.app-shell.dark {
  background: linear-gradient(135deg, #102a43 0%, #1d4664 100%);
}
.app-header {
  background: rgba(255, 255, 255, 0.9);
  border-bottom: 1px solid #d6e8fa;
  padding: 0;
  height: 60px !important;
  line-height: normal;
}
.dark .app-header {
  background: rgba(16, 42, 67, 0.9);
  border-bottom-color: #1d4664;
}
.header-inner {
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 24px;
  height: 60px;
  display: flex;
  align-items: center;
  gap: 18px;
}
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}
.brand-logo {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: linear-gradient(120deg, #91d5ff, #409eff);
  color: #fff; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
}
.brand-name { font-size: 17px; font-weight: 700; color: #234; }
.dark .brand-name { color: #e6f4ff; }

.nav-menu {
  flex: 1;
  border-bottom: none;
  background: transparent;
}
.dark .nav-menu :deep(.el-menu-item) { color: #adbac7; }
.dark .nav-menu :deep(.el-menu-item.is-active) { color: #91d5ff; }
.header-actions { display: flex; gap: 8px; align-items: center; }

.app-main {
  max-width: 1080px;
  width: 100%;
  margin: 0 auto;
  padding-top: 20px;
}
.app-footer {
  text-align: center;
  color: #888;
  font-size: 13px;
  padding: 20px 0;
}
</style>
