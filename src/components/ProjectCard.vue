<template>
  <article class="project-card">
    <header class="pc-head">
      <div class="pc-icon">{{ project.name.charAt(0) }}</div>
      <div class="pc-title-area">
        <!-- 具名插槽 title：定制标题区；不传时显示默认项目名 -->
        <slot name="title">
          <h3 class="pc-name">{{ project.name }}</h3>
        </slot>
      </div>
      <span class="pc-status" :class="statusClass">{{ project.status }}</span>
    </header>

    <div class="pc-body">
      <!-- 默认插槽：定制主体内容；不传时显示默认项目简介 -->
      <slot>
        <p class="pc-desc">{{ project.desc }}</p>
      </slot>
    </div>

    <div class="pc-tags">
      <span v-for="tag in project.tags" :key="tag" class="pc-tag">{{ tag }}</span>
    </div>

    <footer class="pc-foot">
      <!-- 具名插槽 actions：定制操作区；不传时显示默认按钮 -->
      <slot name="actions">
        <button class="btn-primary btn-sm" @click="emit('view', project)">查看详情</button>
      </slot>
    </footer>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  project: { type: Object, required: true }
})

const emit = defineEmits(['view'])

// 根据项目状态计算徽标样式
const statusClass = computed(() => {
  const s = props.project.status || ''
  if (s.includes('完成')) return 'status-done'
  if (s.includes('开发')) return 'status-dev'
  return 'status-plan'
})
</script>

<style scoped>
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
.pc-index {
  font-size: 12px;
  color: var(--meta-color);
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
.pc-body {
  flex: 1;
  font-size: 14px;
  line-height: 1.7;
  color: var(--meta-color);
}
.pc-desc {
  margin: 0;
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
.pc-foot {
  display: flex;
  justify-content: flex-end;
}
</style>
