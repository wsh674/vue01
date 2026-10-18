<template>
  <!-- 项目列表页：遍历项目数组，用 RouterLink 通过命名路由 + params 进入详情 -->
  <section class="panel">
    <div class="grid">
      <article v-for="item in projects" :key="item.id" class="project-card">
        <header class="pc-head">
          <div class="pc-icon">{{ item.name.charAt(0) }}</div>
          <div class="pc-title-area">
            <h3 class="pc-name">{{ item.name }}</h3>
            <p class="pc-summary">{{ item.summary }}</p>
          </div>
          <span class="pc-status" :class="statusClass(item.status)">{{ item.status }}</span>
        </header>

        <div class="pc-tags">
          <span v-for="tag in item.tags" :key="tag" class="pc-tag">{{ tag }}</span>
        </div>

        <footer class="pc-foot">
          <!-- 命名路由 + 动态路由参数：跳转到 /projects/:id 项目详情 -->
          <RouterLink :to="{ name: 'project-detail', params: { id: item.id } }" class="btn-primary btn-sm">
            查看详情
          </RouterLink>
        </footer>
      </article>
    </div>
  </section>
</template>

<script setup>
import { getProjects } from '@/data/projects.js'

// 从数据模块读取项目列表（后台管理保存后自动生效）
const projects = getProjects()

// 根据项目状态返回对应的徽标样式类
const statusClass = (status) => {
  if (status.includes('完成')) return 'status-done'
  if (status.includes('开发')) return 'status-dev'
  return 'status-plan'
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}
.project-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 18px;
  background: var(--card-bg);
  border: 1px solid rgba(64, 158, 255, 0.12);
  border-radius: 14px;
  box-shadow: var(--card-shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.14);
}
.pc-head {
  display: flex;
  align-items: center;
  gap: 12px;
}
.pc-icon {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(120deg, var(--banner-grad-1), var(--banner-grad-2));
}
.pc-title-area {
  flex: 1;
  min-width: 0;
}
.pc-name {
  font-size: 17px;
  color: var(--text-color);
}
.pc-summary {
  font-size: 12px;
  color: var(--meta-color);
  margin-top: 4px;
  line-height: 1.6;
}
.pc-status {
  flex-shrink: 0;
  font-size: 12px;
  padding: 3px 10px;
  border-radius: 20px;
}
.status-done { background: rgba(54, 198, 108, 0.16); color: #2ba35a; }
.status-dev { background: rgba(64, 158, 255, 0.16); color: #2f8ce0; }
.status-plan { background: rgba(230, 162, 60, 0.18); color: #c98a28; }
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
.pc-foot {
  display: flex;
  justify-content: flex-end;
}
</style>
