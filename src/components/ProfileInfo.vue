<template>
  <div id="about" class="base-info">
    <div class="avatar-wrap">
      <img :src="person.avatar" alt="个人头像">
    </div>
    <h2>{{ person.name }}</h2>
    <div class="meta-row">
      <span>学号：{{ person.studentId }}</span>
      <span>班级：{{ person.className }}</span>
      <span>专业：{{ person.major }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  person: { type: Object, required: true }
})
</script>

<style scoped>
.base-info {
  margin-top: 16px;
  scroll-margin-top: 90px;
}
.avatar-wrap {
  width: 120px;
  height: 120px;
  overflow: hidden;
  border: 5px solid var(--avatar-border);
  border-radius: 50%;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
}
.avatar-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.base-info h2 {
  font-size: 28px;
  margin: 16px 0 8px;
  color: var(--text-color);
}
.meta-row {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  font-size: 15px;
  color: var(--meta-color);
}
</style>
