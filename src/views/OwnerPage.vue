<template>
  <!-- 身份认证页：所有者口令验证，验证通过后进入内容管理 -->
  <main class="page">
    <section class="panel auth-panel">
      <h1 class="page-title">内容管理入口</h1>
      <p class="lead">
        公开页面无需验证，直接浏览；只有修改个人简介、项目信息等后台内容时，
        才需要确认所有者身份。
      </p>

      <div class="form-row">
        <label for="ownerCode">所有者口令</label>
        <input
          id="ownerCode"
          v-model="code"
          type="password"
          placeholder="请输入演示口令：owner"
          @keyup.enter="verify"
        >
      </div>

      <p v-if="message" class="error">{{ message }}</p>

      <button class="btn-primary" @click="verify">进入内容管理</button>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const code = ref('')
const message = ref('')

// 演示口令（课程演示用）
const OWNER_CODE = 'owner'

// useRoute()：读取 query.redirect（守卫跳转时携带的原目标地址）
const route = useRoute()
// useRouter()：验证通过后用 replace 进入原目标页面
const router = useRouter()

function verify() {
  if (code.value.trim() === OWNER_CODE) {
    // 写入 localStorage 标记所有者身份，供 beforeEach 守卫读取
    localStorage.setItem('isOwner', 'true')
    message.value = '验证成功，正在进入内容管理…'

    const redirect = route.query.redirect
    if (redirect) {
      // replace 替换当前历史记录，避免“返回”时回到认证页
      router.replace(redirect)
    } else {
      router.replace({ name: 'manage-profile' })
    }
  } else {
    message.value = '口令错误，请重新输入'
  }
}
</script>

<style scoped>
.auth-panel {
  max-width: 520px;
  margin: 24px auto 0;
  text-align: center;
}
.page-title {
  font-size: 24px;
  color: var(--text-color);
  margin-bottom: 12px;
}
.lead {
  font-size: 14px;
  line-height: 1.8;
  color: var(--meta-color);
  margin-bottom: 24px;
}
.form-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 14px;
  text-align: left;
}
.form-row label {
  font-size: 14px;
  color: var(--text-color);
}
.form-row input {
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid var(--input-border);
  font-size: 15px;
  background-color: var(--input-bg);
  color: var(--input-color);
  outline: none;
}
.form-row input:focus {
  border-color: #409eff;
}
.error {
  color: #e05c5c;
  font-size: 13px;
  margin-bottom: 12px;
  min-height: 18px;
}
</style>
