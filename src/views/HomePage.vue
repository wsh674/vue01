<template>
  <!-- 首页（个人主页）：展示个人信息卡片与技能列表，数据来自数据模块 -->
  <ProfileCard :person="profile" :skills="skills" />
</template>

<script setup>
import ProfileCard from '@/components/ProfileCard.vue'
import { getProfile, getSkills } from '@/data/profile.js'

// 页面直接读取数据模块，不再依赖父组件传 props
const profile = getProfile()
const skills = getSkills()
</script>
