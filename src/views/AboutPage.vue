<template>
  <!-- 关于我：Element Plus el-descriptions 展示档案 + el-timeline 学习时间线 -->
  <div class="page">
    <h2 class="page-title">关于我</h2>

    <el-card shadow="never" class="card">
      <div class="about-head">
        <el-avatar :size="80" :src="profile.avatar">{{ profile.name[0] }}</el-avatar>
        <div>
          <h3>{{ profile.name }}</h3>
          <p class="role">{{ profile.role }} · {{ profile.location }}</p>
        </div>
      </div>

      <el-divider />

      <!-- el-descriptions：描述列表展示结构化个人信息 -->
      <el-descriptions :column="2" border>
        <el-descriptions-item label="姓名">{{ profile.name }}</el-descriptions-item>
        <el-descriptions-item label="学号">{{ profile.studentId }}</el-descriptions-item>
        <el-descriptions-item label="专业">{{ profile.major }}</el-descriptions-item>
        <el-descriptions-item label="班级">{{ profile.className }}</el-descriptions-item>
        <el-descriptions-item label="个人简介" :span="2">{{ profile.intro }}</el-descriptions-item>
      </el-descriptions>

      <h4 class="sub-title">技能栈（共 {{ skillCount }} 项）</h4>
      <div class="skill-wrap">
        <el-tag v-for="s in skills" :key="s" effect="plain" class="skill-tag">{{ s }}</el-tag>
      </div>
    </el-card>

    <el-card shadow="never" class="card">
      <h4 class="sub-title">学习经历时间线</h4>
      <!-- el-timeline：实验四要求在个人信息页新增的时间线组件 -->
      <el-timeline>
        <el-timeline-item timestamp="2023-09" placement="top" type="primary">
          进入重庆工程学院计算机科学与技术专业，系统学习 C 语言、数据结构。
        </el-timeline-item>
        <el-timeline-item timestamp="2025-03" placement="top" type="success">
          入门 Web 前端，完成 HTML / CSS / JavaScript 静态页面练习。
        </el-timeline-item>
        <el-timeline-item timestamp="2026-03" placement="top" type="warning">
          学习 Vue3 与 Vue Router，完成个人主页（实验三）路由项目。
        </el-timeline-item>
        <el-timeline-item timestamp="2026-10" placement="top" type="danger">
          引入 Pinia 状态管理与 Element Plus 组件库，完成本实验四。
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useProfileStore } from '@/stores/profileStore.js'

const profileStore = useProfileStore()
// storeToRefs 解构 state，保持响应式
const { profile, skills, skillCount } = storeToRefs(profileStore)
</script>

<style scoped>
.page-title { font-size: 22px; margin-bottom: 16px; }
.card { margin-bottom: 16px; border-radius: 12px; }
.about-head { display: flex; align-items: center; gap: 16px; }
.about-head h3 { font-size: 20px; }
.role { color: #409eff; font-size: 14px; margin-top: 4px; }
.sub-title { margin: 18px 0 12px; font-size: 16px; }
.skill-wrap { display: flex; flex-wrap: wrap; gap: 10px; }
</style>
