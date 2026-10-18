<template>
  <!-- 登录页：Element Plus 表单组件 + userStore.login -->
  <div class="page login-wrap">
    <el-card class="login-card" shadow="always">
      <template #header>
        <div class="login-title">
          <h2>内容管理登录</h2>
          <p>公开页面可直接浏览，修改个人简介 / 项目 / 文章需登录所有者身份</p>
        </div>
      </template>

      <el-form :model="form" label-position="top" @submit.prevent>
        <el-form-item label="登录账号">
          <el-input v-model="form.username" placeholder="演示账号：owner" clearable />
        </el-form-item>
        <el-form-item label="登录口令">
          <el-input
            v-model="form.password"
            type="password"
            show-password
            placeholder="演示口令：owner"
            @keyup.enter="onLogin"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Lock" class="w-full" @click="onLogin">
            登 录
          </el-button>
        </el-form-item>
      </el-form>

      <el-alert type="info" :closable="false" show-icon>
        演示账号与口令均为 <b>owner</b>（实验演示用），登录态由 Pinia + localStorage 持久化。
      </el-alert>
    </el-card>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Lock } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/userStore.js'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const form = reactive({ username: '', password: '' })

function onLogin() {
  // 演示口令统一为 owner（账号仅作展示）
  if (userStore.login(form.password || form.username)) {
    ElMessage.success('登录成功，正在跳转…')
    const redirect = route.query.redirect
    router.replace(redirect || { name: 'manage-projects' })
  } else {
    ElMessage.error('口令错误，请使用演示口令 owner 登录')
  }
}
</script>

<style scoped>
.login-wrap {
  display: flex;
  justify-content: center;
  padding-top: 24px;
}
.login-card {
  width: 100%;
  max-width: 460px;
  border-radius: 14px;
}
.login-title h2 {
  font-size: 20px;
  margin-bottom: 6px;
}
.login-title p {
  font-size: 13px;
  color: #888;
  line-height: 1.6;
}
.w-full {
  width: 100%;
}
</style>
