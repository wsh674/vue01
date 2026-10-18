<template>
  <div class="main-card">
    <div class="card-banner"></div>
    <div class="card-body">
      <!-- 展示模式：个人基础信息 + 简介 + 技能搜索（编辑功能移至后台管理页） -->
      <ProfileInfo :person="person" />

      <div class="btn-bar">
        <button class="btn-primary" @click="toggleShowDetail">
          {{ isShowDetail ? '收起简介' : '展开简介' }}
        </button>
      </div>

      <IntroBlock v-if="isShowDetail" :intro="person.intro" />

      <div id="skills">
        <SearchBox v-model="searchKey" @clear="clearSearch" />
        <SkillList :skills="filterSkillList" empty-tip="没有匹配的技能，请更换关键词" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import ProfileInfo from './ProfileInfo.vue'
import IntroBlock from './IntroBlock.vue'
import SearchBox from './SearchBox.vue'
import SkillList from './SkillList.vue'

// defineProps：接收页面传入的个人信息与技能数据
const props = defineProps({
  person: { type: Object, required: true },
  skills: { type: Array, default: () => [] }
})

// 只影响本卡片的状态保留在组件内部
const isShowDetail = ref(false)
const searchKey = ref('')

const toggleShowDetail = () => {
  isShowDetail.value = !isShowDetail.value
}

const clearSearch = () => {
  console.log('【clearSearch】点击清空按钮，搜索词已清空')
}

// 根据关键词过滤技能列表
const filterSkillList = computed(() => {
  const keyword = searchKey.value.trim().toLowerCase()
  if (!keyword) {
    return props.skills
  }
  return props.skills.filter(skill => skill.toLowerCase().includes(keyword))
})

watch(searchKey, (newValue, oldValue) => {
  console.log(`【watch监听搜索词】旧值：${oldValue}，新值：${newValue}`)
})
</script>

<style scoped>
.main-card {
  overflow: hidden;
  background: var(--card-bg);
  border-radius: 20px;
  box-shadow: var(--card-shadow);
  transition: background 0.5s ease, box-shadow 0.5s ease;
}
.card-banner {
  height: 140px;
  background: linear-gradient(120deg, var(--banner-grad-1), var(--banner-grad-2));
}
.card-body {
  position: relative;
  margin-top: -60px;
  padding: 0 36px 36px;
}
.btn-bar {
  margin-top: 28px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
#skills {
  scroll-margin-top: 90px;
}
</style>
