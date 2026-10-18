<template>
  <!-- 项目管理：el-table + el-dialog + el-form，数据来自 projectStore（持久化） -->
  <div>
    <div class="head-row">
      <el-tag effect="plain">共 {{ totalCount }} 个项目 · 已完成 {{ finishedCount }} · 开发中 {{ inProgressCount }}</el-tag>
      <el-button type="primary" :icon="Plus" @click="openCreate">新增项目</el-button>
    </div>

    <el-table :data="list" border stripe>
      <el-table-column prop="id" label="ID" width="60" align="center" />
      <el-table-column prop="name" label="项目名称" min-width="140" />
      <el-table-column label="状态" width="100" align="center">
        <template #default="{ row }">
          <el-tag size="small" :type="statusType(row.status)">{{ row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="进度" width="180" align="center">
        <template #default="{ row }">
          <!-- el-progress：进度条组件 -->
          <el-progress :percentage="row.progress" :status="row.progress === 100 ? 'success' : ''" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template #default="{ row }">
          <el-button type="primary" link @click="openEdit(row)">编辑</el-button>
          <el-button type="danger" link @click="onRemove(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑项目' : '新增项目'" width="520px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="form.summary" type="textarea" :rows="2" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.status">
            <el-option label="规划中" value="规划中" />
            <el-option label="开发中" value="开发中" />
            <el-option label="已完成" value="已完成" />
          </el-select>
        </el-form-item>
        <el-form-item label="进度">
          <el-slider v-model="form.progress" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
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
import { useProjectStore } from '@/stores/projectStore.js'

const projectStore = useProjectStore()
const { list, totalCount, finishedCount, inProgressCount } = storeToRefs(projectStore)

const dialogVisible = ref(false)
const isEdit = ref(false)
const editingId = ref(null)
const form = reactive({ name: '', summary: '', status: '规划中', progress: 0 })

function statusType(s) {
  return s === '已完成' ? 'success' : s === '开发中' ? 'warning' : 'info'
}
function openCreate() {
  isEdit.value = false
  editingId.value = null
  Object.assign(form, { name: '', summary: '', status: '规划中', progress: 0 })
  dialogVisible.value = true
}
function openEdit(row) {
  isEdit.value = true
  editingId.value = row.id
  Object.assign(form, row)
  dialogVisible.value = true
}
function onSave() {
  if (!form.name.trim()) {
    ElMessage.warning('项目名称不能为空')
    return
  }
  if (isEdit.value) {
    projectStore.updateProject(editingId.value, { ...form })
    ElMessage.success('项目已更新')
  } else {
    projectStore.addProject({ ...form })
    ElMessage.success('项目已新增')
  }
  dialogVisible.value = false
}
function onRemove(row) {
  ElMessageBox.confirm(`确定删除项目《${row.name}》吗？`, '提示', { type: 'warning' })
    .then(() => {
      projectStore.removeProject(row.id)
      ElMessage.success('删除成功')
    })
    .catch(() => {})
}
</script>

<style scoped>
.head-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}
</style>
