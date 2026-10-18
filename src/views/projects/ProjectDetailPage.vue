<template>
  <!-- 项目详情页：动态路由 /projects/:id，使用 useRoute 读取参数 -->
  <section v-if="project" class="panel">
    <div class="detail-head">
      <div class="pc-icon">{{ project.name.charAt(0) }}</div>
      <div>
        <h2 class="detail-name">{{ project.name }}</h2>
        <p class="detail-id">项目编号：{{ project.id }}（URL 参数 id = {{ route.params.id }}）</p>
      </div>
      <span class="pc-status" :class="statusClass(project.status)">{{ project.status }}</span>
    </div>

    <p class="lead">{{ project.description }}</p>

    <div class="detail-meta">
      <div class="meta-item">
        <span class="meta-label">技术栈</span>
        <div class="pc-tags">
          <span v-for="tag in project.tags" :key="tag" class="pc-tag">{{ tag }}</span>
        </div>
      </div>
      <div class="meta-item">
        <span class="meta-label">完成进度</span>
        <div class="progress-wrap">
          <div class="progress-bar" :style="{ width: project.progress + '%' }"></div>
          <span class="progress-text">{{ project.progress }}%</span>
        </div>
      </div>
    </div>

    <div class="btn-bar">
      <!-- 编程式导航：go(-1) 返回上一页 -->
      <button class="btn-primary" @click="goBack">返回上一页</button>
      <!-- 编程式导航：push 到命名路由返回项目列表 -->
      <button class="btn-primary" @click="goList">返回项目列表</button>
    </div>
  </section>

  <!-- 无效详情地址处理：动态参数对应的项目不存在时给出提示，并用 replace 回到列表 -->
  <section v-else class="panel not-found">
    <h2>未找到该项目</h2>
    <p class="lead">地址 /projects/{{ route.params.id }} 对应的项目不存在，可能已被删除。</p>
    <button class="btn-warning" @click="goListReplace">返回项目列表</button>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getProjects } from '@/data/projects.js'

// useRoute()：获取当前路由对象，读取动态路由参数
const route = useRoute()
// useRouter()：获取路由实例，进行编程式导航
const router = useRouter()

const projects = getProjects()

// 路由参数是字符串，需用 Number() 转换后再按数字编号查找项目
const project = computed(() =>
  projects.find((item) => item.id === Number(route.params.id))
)

// 返回上一页：go(-1) 按浏览器历史记录后退
function goBack() {
  router.go(-1)
}

// 返回列表：push 新增一条历史记录，可再通过“返回”回到详情页
function goList() {
  router.push({ name: 'project-list' })
}

// 无效地址处理：replace 替换当前历史记录，避免在历史中留下无效地址
function goListReplace() {
  router.replace({ name: 'project-list' })
}

const statusClass = (status) => {
  if (status.includes('完成')) return 'status-done'
  if (status.includes('开发')) return 'status-dev'
  return 'status-plan'
}
</script>

<style scoped>
.detail-head {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}
.pc-icon {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(120deg, var(--banner-grad-1), var(--banner-grad-2));
}
.detail-name {
  font-size: 24px;
  color: var(--text-color);
}
.detail-id {
  font-size: 13px;
  color: var(--meta-color);
  margin-top: 4px;
}
.pc-status {
  font-size: 12px;
  padding: 3px 10px;
  border-radius: 20px;
}
.status-done { background: rgba(54, 198, 108, 0.16); color: #2ba35a; }
.status-dev { background: rgba(64, 158, 255, 0.16); color: #2f8ce0; }
.status-plan { background: rgba(230, 162, 60, 0.18); color: #c98a28; }
.lead {
  margin-top: 18px;
  line-height: 1.9;
  color: var(--text-color);
  font-size: 15px;
}
.detail-meta {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.meta-item {
  display: flex;
  align-items: center;
  gap: 14px;
}
.meta-label {
  font-size: 13px;
  color: var(--meta-color);
  flex-shrink: 0;
  width: 64px;
}
.pc-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.pc-tag {
  font-size: 12px;
  padding: 2px 10px;
  border-radius: 16px;
  background: var(--skill-bg);
  color: var(--skill-color);
}
.progress-wrap {
  flex: 1;
  max-width: 360px;
  height: 12px;
  background: rgba(64, 158, 255, 0.12);
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}
.progress-bar {
  height: 100%;
  border-radius: 8px;
  background: linear-gradient(90deg, var(--banner-grad-1), var(--banner-grad-2));
  transition: width 0.5s ease;
}
.progress-text {
  position: absolute;
  right: 6px;
  top: -2px;
  font-size: 11px;
  color: var(--meta-color);
}
.btn-bar {
  margin-top: 26px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.not-found {
  text-align: center;
  padding: 40px 20px;
}
.not-found h2 {
  color: var(--text-color);
  margin-bottom: 10px;
}
</style>
