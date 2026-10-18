<template>
  <footer class="app-footer">
    <p class="footer-copy">{{ copyright }}</p>
    <p class="footer-sub">{{ subText }}</p>
    <!-- 内容管理入口：与访客浏览功能合理区分，需先通过所有者验证 -->
    <RouterLink :to="{ name: 'owner' }" class="manage-link">内容管理入口</RouterLink>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  copyright: { type: String, default: '' },
  subText: { type: String, default: '' }
})
</script>

<style scoped>
.app-footer {
  margin-top: 48px;
  padding: 24px 16px 32px;
  text-align: center;
  background: var(--footer-bg);
  border-top: 1px solid rgba(64, 158, 255, 0.15);
}
.footer-copy {
  font-size: 14px;
  color: var(--text-color);
}
.footer-sub {
  margin-top: 6px;
  font-size: 13px;
  color: var(--meta-color);
}
.manage-link {
  display: inline-block;
  margin-top: 14px;
  padding: 6px 18px;
  border-radius: 18px;
  font-size: 13px;
  text-decoration: none;
  color: var(--skill-color);
  background: var(--skill-bg);
  transition: all 0.3s ease;
}
.manage-link:hover {
  filter: brightness(0.95);
}
</style>
