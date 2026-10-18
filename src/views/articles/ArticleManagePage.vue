<template>
  <!-- 文章管理：el-table 展示，el-dialog + el-form 完成新增/编辑/删除 -->
  <div class="page">
    <div class="head-row">
      <h2>文章管理</h2>
      <el-button type="primary" :icon="Plus" @click="openCreate">新增文章</el-button>
    </div>

    <el-table :data="list" border stripe style="width: 100%">
      <el-table-column prop="id" label="ID" width="70" align="center" />
      <el-table-column prop="title" label="标题" min-width="180" show-overflow-tooltip />
      <el-table-column prop="category" label="分类" width="110" align="center">
        <template #default="{ row }">
          <el-tag size="small" effect="plain">{{ row.category }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="日期" width="110" align="center" />
      <el-table-column label="状态" width="90" align="center">
        <template #default="{ row }">
          <el-tag :type="row.published ? 'success' : 'info'" size="small">
            {{ row.published ? '已发布' : '草稿' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template #default="{ row }">
          <el-button type="primary" link @click="openEdit(row)">编辑</el-button>
          <el-button type="danger" link @click="onRemove(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增/编辑对话框 -->
    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑文章' : '新增文章'" width="560px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title" placeholder="请输入文章标题" />
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="form.category" placeholder="请选择分类">
            <el-option label="前端框架" value="前端框架" />
            <el-option label="状态管理" value="状态管理" />
            <el-option label="UI组件库" value="UI组件库" />
            <el-option label="读书笔记" value="读书笔记" />
          </el-select>
        </el-form-item>
        <el-form-item label="摘要">
          <el-input v-model="form.summary" type="textarea" :rows="2" placeholder="一句话概括" />
        </el-form-item>
        <el-form-item label="正文">
          <el-input v-model="form.content" type="textarea" :rows="4" placeholder="文章正文" />
        </el-form-item>
        <el-form-item label="发布状态">
          <el-switch v-model="form.published" active-text="发布" inactive-text="存为草稿" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useArticleStore } from '@/stores/articleStore.js'

const articleStore = useArticleStore()
const { list } = storeToRefs(articleStore)

const dialogVisible = ref(false)
const isEdit = ref(false)
const editingId = ref(null)

const form = reactive({
  title: '',
  category: '',
  summary: '',
  content: '',
  published: false
})

function resetForm() {
  Object.assign(form, { title: '', category: '', summary: '', content: '', published: false })
}

function openCreate() {
  isEdit.value = false
  editingId.value = null
  resetForm()
  dialogVisible.value = true
}

function openEdit(row) {
  isEdit.value = true
  editingId.value = row.id
  Object.assign(form, row)
  dialogVisible.value = true
}

function onSave() {
  if (!form.title.trim()) {
    ElMessage.warning('文章标题不能为空')
    return
  }
  if (isEdit.value) {
    articleStore.updateArticle(editingId.value, { ...form })
    ElMessage.success('文章已更新')
  } else {
    articleStore.addArticle({ ...form })
    ElMessage.success('文章已新增')
  }
  dialogVisible.value = false
}

function onRemove(row) {
  ElMessageBox.confirm(`确定删除文章《${row.title}》吗？`, '提示', {
    type: 'warning'
  }).then(() => {
    articleStore.removeArticle(row.id)
    ElMessage.success('删除成功')
  }).catch(() => {})
}
</script>

<style scoped>
.head-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.head-row h2 {
  font-size: 22px;
}
</style>
