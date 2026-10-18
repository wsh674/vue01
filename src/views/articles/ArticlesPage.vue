<template>
  <!-- 文章列表页：使用 storeToRefs 解构 articleStore，Element Plus 卡片/标签展示 -->
  <div class="page">
    <div class="page-head">
      <h2>文章列表</h2>
      <el-tag type="primary" effect="plain">共 {{ totalCount }} 篇 · 已发布 {{ publishedCount }} 篇</el-tag>
    </div>

    <el-empty v-if="list.length === 0" description="还没有文章，登录后可在文章管理中新增" />

    <el-row :gutter="16">
      <el-col :span="24" :md="12" v-for="art in list" :key="art.id">
        <el-card class="article-card" shadow="hover">
          <div class="card-head">
            <el-tag size="small" :type="art.published ? 'success' : 'info'">
              {{ art.published ? '已发布' : '草稿' }}
            </el-tag>
            <el-tag size="small" effect="plain" type="warning">{{ art.category }}</el-tag>
            <span class="date">{{ art.date }}</span>
          </div>
          <h3 class="title">{{ art.title }}</h3>
          <p class="summary">{{ art.summary }}</p>
          <el-divider />
          <div class="card-foot">
            <span class="foot-label">文章编号 #{{ art.id }}</span>
            <el-button type="primary" link @click="showDetail(art)">阅读全文</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 文章详情对话框 -->
    <el-dialog v-model="dialogVisible" :title="current.title" width="600px">
      <p class="detail-content">{{ current.content }}</p>
      <template #footer>
        <el-button @click="dialogVisible = false">关 闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useArticleStore } from '@/stores/articleStore.js'

const articleStore = useArticleStore()
// storeToRefs：把 state/getters 包装为 ref，解构后仍保持响应式
const { list, totalCount, publishedCount } = storeToRefs(articleStore)

const dialogVisible = ref(false)
const current = ref({ title: '', content: '' })

function showDetail(art) {
  current.value = art
  dialogVisible.value = true
}
</script>

<style scoped>
.page-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.page-head h2 {
  font-size: 22px;
}
.article-card {
  margin-bottom: 16px;
  border-radius: 12px;
}
.card-head {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}
.date {
  margin-left: auto;
  font-size: 12px;
  color: #999;
}
.title {
  font-size: 17px;
  margin-bottom: 8px;
}
.summary {
  font-size: 13px;
  color: #666;
  line-height: 1.7;
  min-height: 44px;
}
.card-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.foot-label {
  font-size: 12px;
  color: #999;
}
.detail-content {
  line-height: 1.9;
  color: #444;
}
</style>
