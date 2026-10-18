<template>
  <!-- 项目展示页面：复用 ProjectCard / ProjectList，综合应用插槽 -->
  <section class="projects-section">
    <h3 class="section-title">项目展示</h3>
    <p class="section-sub">可复用卡片组件 ProjectCard，通过默认插槽与具名插槽定制内容；ProjectList 通过作用域插槽提供当前项目与序号</p>
    <ProjectList :projects="projects">
      <template #default="{ project, index }">
        <ProjectCard :project="project" @view="handleViewProject">
          <!-- 具名插槽 title：定制标题区 -->
          <template #title>
            <h3 class="pc-name">{{ project.name }}</h3>
            <span class="pc-index">项目 #{{ index + 1 }}</span>
          </template>
          <!-- 具名插槽 actions：按项目状态定制操作区 -->
          <template #actions>
            <button
              v-if="project.status === '已完成'"
              class="btn-success btn-sm"
              @click="handleViewProject(project)"
            >在线预览</button>
            <button
              v-else
              class="btn-warning btn-sm"
              @click="handleViewProject(project)"
            >了解进度</button>
          </template>
        </ProjectCard>
      </template>
    </ProjectList>
  </section>
</template>

<script setup>
import ProjectList from '@/components/ProjectList.vue'
import ProjectCard from '@/components/ProjectCard.vue'

// 项目数据由根组件 App.vue 通过 props 传入（完整声明，避免属性透传）
defineProps({
  projects: { type: Array, default: () => [] },
  person: { type: Object, default: null },
  skills: { type: Array, default: () => [] }
})

const emit = defineEmits(['view'])

const handleViewProject = (project) => {
  emit('view', project)
}
</script>

<style scoped>
.projects-section {
  margin-top: 12px;
  padding-top: 8px;
}
.section-title {
  font-size: 22px;
  margin-bottom: 6px;
  color: var(--text-color);
}
.section-sub {
  font-size: 13px;
  color: var(--meta-color);
  margin-bottom: 22px;
  line-height: 1.7;
}
.btn-sm {
  padding: 7px 14px;
  font-size: 13px;
}
</style>
