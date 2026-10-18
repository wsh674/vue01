<template>
  <div class="base-info edit-mode">
    <h2>编辑个人信息</h2>
    <div class="edit-item">
      <label>姓名</label>
      <input v-model="form.name">
    </div>
    <div class="edit-item">
      <label>学号</label>
      <input v-model="form.studentId">
    </div>
    <div class="edit-item">
      <label>班级</label>
      <input v-model="form.className">
    </div>
    <div class="edit-item">
      <label>专业</label>
      <input v-model="form.major">
    </div>
    <div class="edit-item">
      <label>个人简介</label>
      <textarea v-model="form.intro" rows="4"></textarea>
    </div>
    <div class="btn-bar">
      <button class="btn-success" @click="emit('save')">保存</button>
      <button class="btn-warning" @click="emit('cancel')">取消</button>
    </div>
  </div>
</template>

<script setup>
// defineModel 实现编辑表单与父组件的双向绑定
const form = defineModel('form', { type: Object, required: true })

// defineEmits 向父组件报告保存 / 取消事件
const emit = defineEmits(['save', 'cancel'])
</script>

<style scoped>
.edit-mode {
  margin-top: 16px;
}
.edit-mode h2 {
  font-size: 22px;
  margin-bottom: 12px;
  color: var(--text-color);
}
.edit-item {
  margin: 12px 0;
}
.edit-item label {
  display: block;
  margin-bottom: 4px;
  color: var(--text-color);
}
.edit-item input,
.edit-item textarea {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid var(--input-border);
  background: var(--input-bg);
  color: var(--input-color);
  font-size: 14px;
}
.edit-item textarea {
  resize: vertical;
  font-family: inherit;
}
.btn-bar {
  margin-top: 20px;
  display: flex;
  gap: 12px;
}
</style>
