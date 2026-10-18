<template>
  <div class="search-wrap">
    <label for="searchInput">技能搜索</label>
    <div class="search-row">
      <input
        id="searchInput"
        v-model="keyword"
        type="text"
        placeholder="输入关键词筛选技能..."
      >
      <button class="btn-clear" @click="handleClear">清空</button>
    </div>
  </div>
</template>

<script setup>
// defineModel 实现搜索词与父组件的双向绑定（v-model）
const keyword = defineModel({ type: String, default: '' })

// defineEmits 向父组件报告“清空”事件
const emit = defineEmits(['clear'])

const handleClear = () => {
  keyword.value = ''
  emit('clear')
}
</script>

<style scoped>
.search-wrap {
  margin-top: 28px;
}
.search-wrap label {
  display: inline-block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--text-color);
}
.search-row {
  display: flex;
  gap: 10px;
  align-items: center;
}
#searchInput {
  flex: 1;
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid var(--input-border);
  font-size: 15px;
  background-color: var(--input-bg);
  color: var(--input-color);
  outline: none;
}
#searchInput:focus {
  border-color: #409eff;
}
</style>
