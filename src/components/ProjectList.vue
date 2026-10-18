<template>
  <div class="project-list">
    <!-- 作用域插槽：将子组件遍历得到的当前项目与序号提供给父组件模板 -->
    <slot
      v-for="(project, index) in projects"
      :key="project.id"
      :project="project"
      :index="index"
    />
  </div>
</template>

<script setup>
defineProps({
  projects: { type: Array, default: () => [] }
})
</script>

<style scoped>
.project-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}
</style>
