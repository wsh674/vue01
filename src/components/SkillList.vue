<template>
  <div class="skill-area">
    <h4 class="skill-title">技能列表</h4>
    <div class="skill-container">
      <div v-for="skill in skills" :key="skill" class="skill-tag">
        {{ skill }}
      </div>
      <span v-if="skills.length === 0" class="empty-tip">
        {{ emptyTip }}
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  skills: { type: Array, default: () => [] },
  emptyTip: { type: String, default: '没有匹配的技能，请更换关键词' }
})
</script>

<style scoped>
.skill-area {
  scroll-margin-top: 90px;
}
.skill-title {
  margin-top: 24px;
  margin-bottom: 14px;
  font-size: 17px;
  color: var(--text-color);
}
.skill-container {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.skill-tag {
  padding: 8px 16px;
  background-color: var(--skill-bg);
  color: var(--skill-color);
  border-radius: 24px;
  font-size: 14px;
}
.empty-tip {
  color: var(--empty-color);
  padding: 10px 0;
}
</style>
