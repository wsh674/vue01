<template>
  <!-- 项目统计页：基于项目数组用 computed 计算统计指标 -->
  <section class="panel">
    <h2 class="stat-title">项目统计</h2>

    <div class="stat-grid">
      <div class="stat-item">
        <span class="stat-num">{{ projects.length }}</span>
        <span class="stat-label">项目总数</span>
      </div>
      <div class="stat-item">
        <span class="stat-num">{{ doneCount }}</span>
        <span class="stat-label">已完成</span>
      </div>
      <div class="stat-item">
        <span class="stat-num">{{ devCount }}</span>
        <span class="stat-label">开发中</span>
      </div>
      <div class="stat-item">
        <span class="stat-num">{{ planCount }}</span>
        <span class="stat-label">规划中</span>
      </div>
    </div>

    <div class="avg-row">
      <span class="meta-label">平均完成进度</span>
      <div class="progress-wrap">
        <div class="progress-bar" :style="{ width: avgProgress + '%' }"></div>
        <span class="progress-text">{{ avgProgress }}%</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { getProjects } from '@/data/projects.js'

const projects = getProjects()

// 用 computed 基于项目数组现算各状态数量，避免手工维护统计值
const doneCount = computed(() => projects.filter((p) => p.status.includes('完成')).length)
const devCount = computed(() => projects.filter((p) => p.status.includes('开发')).length)
const planCount = computed(() => projects.filter((p) => !p.status.includes('完成') && !p.status.includes('开发')).length)
const avgProgress = computed(() => {
  if (projects.length === 0) return 0
  const total = projects.reduce((sum, p) => sum + (p.progress || 0), 0)
  return Math.round(total / projects.length)
})
</script>

<style scoped>
.stat-title {
  font-size: 20px;
  color: var(--text-color);
  margin-bottom: 20px;
}
.stat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}
.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 18px 8px;
  background: var(--intro-bg);
  border-radius: 12px;
}
.stat-num {
  font-size: 28px;
  font-weight: 700;
  color: var(--skill-color);
}
.stat-label {
  font-size: 13px;
  color: var(--meta-color);
}
.avg-row {
  margin-top: 24px;
  display: flex;
  align-items: center;
  gap: 14px;
}
.meta-label {
  font-size: 13px;
  color: var(--meta-color);
  flex-shrink: 0;
}
.progress-wrap {
  flex: 1;
  max-width: 480px;
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
</style>
