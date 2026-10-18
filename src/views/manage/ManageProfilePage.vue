<template>
  <!-- 个人简介管理：复用实验二的 ProfileEdit 组件完成编辑与保存 -->
  <section class="panel">
    <h2 class="panel-title">编辑个人简介</h2>
    <p class="panel-sub">修改后点击保存，数据将持久化到 localStorage，并同步到首页与关于页</p>

    <ProfileEdit v-model:form="form" @save="handleSave" @cancel="handleCancel" />

    <p v-if="tip" class="tip">{{ tip }}</p>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import ProfileEdit from '@/components/ProfileEdit.vue'
import { getProfile, saveProfile } from '@/data/profile.js'

// 使用后台数据模块读取当前个人信息，作为编辑表单的初始值
const form = reactive({ ...getProfile() })
const tip = ref('')

function handleSave() {
  saveProfile(form)
  tip.value = `✔ 个人简介已保存：${form.name}（学号 ${form.studentId}）`
}

function handleCancel() {
  // 取消编辑：重新读取已保存的数据，放弃本次修改
  Object.assign(form, getProfile())
  tip.value = '已取消修改，恢复为保存前的内容'
}
</script>

<style scoped>
.panel-title {
  font-size: 20px;
  color: var(--text-color);
  margin-bottom: 6px;
}
.panel-sub {
  font-size: 13px;
  color: var(--meta-color);
  margin-bottom: 16px;
  line-height: 1.7;
}
.tip {
  margin-top: 14px;
  padding: 10px 14px;
  border-radius: 8px;
  background: rgba(54, 198, 108, 0.12);
  color: #2ba35a;
  font-size: 13px;
}
</style>
