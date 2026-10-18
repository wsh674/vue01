<template>
  <header class="app-header">
    <div class="header-inner">
      <!-- 命名路由跳转首页（品牌区） -->
      <RouterLink :to="{ name: 'home' }" class="brand">
        <span class="brand-logo">王</span>
        <span class="brand-name">个人主页</span>
      </RouterLink>

      <!-- 顶部导航：遍历命名路由数据，RouterLink 自动添加
           router-link-active（前缀匹配）与 router-link-exact-active（精确匹配）高亮类 -->
      <nav class="nav-list">
        <RouterLink
          v-for="item in navItems"
          :key="item.routeName"
          :to="{ name: item.routeName }"
          class="nav-item"
        >{{ item.label }}</RouterLink>
      </nav>

      <button class="btn-theme" @click="emit('toggle-theme')">
        {{ isDark ? '亮色模式' : '暗色模式' }}
      </button>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  // 命名路由导航数据：{ label, routeName }
  navItems: { type: Array, required: true },
  isDark: { type: Boolean, default: false }
})

const emit = defineEmits(['toggle-theme'])
</script>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--header-bg);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(64, 158, 255, 0.15);
}
.header-inner {
  max-width: 960px;
  margin: 0 auto;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  gap: 24px;
}
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
}
.brand-logo {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(120deg, var(--banner-grad-1), var(--banner-grad-2));
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}
.brand-name {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-color);
}
.nav-list {
  display: flex;
  gap: 20px;
  flex: 1;
}
.nav-item {
  color: var(--meta-color);
  text-decoration: none;
  font-size: 15px;
  padding: 4px 2px;
  transition: color 0.3s ease;
}
.nav-item:hover {
  color: var(--nav-hover);
}
/* 导航高亮：当前路由匹配（含子路由前缀匹配）时高亮 */
.nav-item.router-link-active {
  color: var(--nav-active);
  font-weight: 700;
  border-bottom: 2px solid var(--nav-active);
}
</style>
