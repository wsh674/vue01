<template>
  <!-- 后台管理父页：el-tabs 子导航 + 子路由出口 -->
  <div class="page">
    <h2 class="page-title">内容管理</h2>
    <p class="page-sub">仅登录用户可访问（由 beforeEach 路由守卫 + meta.requiresAuth 控制）</p>

    <el-tabs v-model="active" @tab-change="onTabChange">
      <el-tab-pane label="个人简介" name="manage-profile" />
      <el-tab-pane label="项目管理" name="manage-projects" />
      <el-tab-pane label="文章管理" name="article-manage" />
    </el-tabs>

    <RouterView />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const active = ref(route.name)

function onTabChange(name) {
  router.push({ name })
}
watch(() => route.name, (n) => { active.value = n })
</script>

<style scoped>
.page-title { font-size: 22px; }
.page-sub { font-size: 13px; color: #888; margin: 6px 0 12px; }
</style>
