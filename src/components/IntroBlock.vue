<template>
  <div class="intro-block">
    <h4>个人简介</h4>
    <p>{{ intro }}</p>
  </div>
</template>

<script setup>
defineProps({
  intro: { type: String, default: '' }
})
</script>

<style scoped>
.intro-block {
  margin-top: 24px;
  padding: 20px;
  background-color: var(--intro-bg);
  border-radius: 12px;
  line-height: 1.8;
  color: var(--text-color);
}
.intro-block h4 {
  margin-bottom: 10px;
  font-size: 17px;
}
</style>
