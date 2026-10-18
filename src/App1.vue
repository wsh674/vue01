<template>
  <div class="app-shell" :class="{ dark: isDarkTheme }">
    <div class="container">
      <div class="main-card">
        <div class="card-banner"></div>
        <div class="card-body">
          <div class="avatar-wrap">
            <img :src="person.avatar" :alt="ui.avatarAlt">
          </div>
          <div class="base-info" v-if="!isEditMode">
            <h2>{{ person.name }}</h2>
            <div class="meta-row">
              <span>{{ ui.studentIdLabel }}：{{ person.studentId }}</span>
              <span>{{ ui.classLabel }}：{{ person.className }}</span>
              <span>{{ ui.majorLabel }}：{{ person.major }}</span>
            </div>
          </div>
          <div class="base-info" v-if="isEditMode">
            <div class="edit-item">
              <label>姓名</label>
              <input v-model="editForm.name">
            </div>
            <div class="edit-item">
              <label>学号</label>
              <input v-model="editForm.studentId">
            </div>
            <div class="edit-item">
              <label>班级</label>
              <input v-model="editForm.className">
            </div>
            <div class="edit-item">
              <label>专业</label>
              <input v-model="editForm.major">
            </div>
          </div>
          <div class="btn-bar">
            <button class="btn-primary" @click="toggleShowDetail">
              {{ isShowDetail ? ui.collapseIntro : ui.expandIntro }}
            </button>
            <button class="btn-theme" @click="switchTheme">
              {{ isDarkTheme ? ui.lightTheme : ui.darkTheme }}
            </button>
            <button class="btn-primary" v-if="!isEditMode" @click="openEdit">编辑信息</button>
            <button class="btn-success" v-if="isEditMode" @click="saveEdit">保存</button>
            <button class="btn-warning" v-if="isEditMode" @click="cancelEdit">取消</button>
          </div>
          <div class="intro-block" v-show="isShowDetail">
            <h4>{{ ui.introTitle }}</h4>
            <p v-if="!isEditMode">{{ person.intro }}</p>
            <textarea v-if="isEditMode" v-model="editForm.intro" rows="4"></textarea>
          </div>
          <div class="search-wrap">
            <label for="searchInput">{{ ui.searchLabel }}</label>
            <div class="search-row">
              <input id="searchInput" v-model="searchKey" :placeholder="ui.searchPlaceholder" >
              <button class="btn-clear" @click="clearSearch">
                {{ ui.clearButton }}
              </button>
            </div>
          </div>
          <h4 class="skill-title">{{ ui.skillTitle }}</h4>
          <div class="skill-container">
            <div v-for="skill in filterSkillList" :key="skill" class="skill-tag" >
              {{ skill }}
            </div>
            <span v-if="filterSkillList.length === 0" class="empty-tip">
              {{ ui.emptyTip }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'

const person = reactive({
  avatar: "61be7894c7f74433771a1e608df15ed2.png",
  name: "王双红",
  studentId: "249980934",
  className: "24计科2班",
  major: "计算机科学与技术",
  intro: "对Web前端开发抱有浓厚兴趣，正在学习Vue3相关技术，掌握HTML、CSS、JavaScript基础，平时乐于编写代码，主动接触各类新技术，在开发过程中重视代码编写规范。"
})

const editForm = reactive({})
const isEditMode = ref(false)
const skillList = ref([ "HTML", "CSS", "JavaScript", "Vue3", "MySQL", "Python", "Node.js" ])
const ui = reactive({
  avatarAlt: "个人头像",
  studentIdLabel: "学号",
  classLabel: "班级",
  majorLabel: "专业",
  expandIntro: "展开简介",
  collapseIntro: "收起简介",
  lightTheme: "切换亮色模式",
  darkTheme: "切换暗色模式",
  introTitle: "个人简介",
  searchLabel: "技能搜索",
  searchPlaceholder: "输入关键词筛选技能...",
  skillTitle: "技能列表",
  emptyTip: "没有匹配的技能，请更换关键词",
  clearButton: "清空"
})
const searchKey = ref("")
const isShowDetail = ref(false)
const isDarkTheme = ref(false)

const toggleShowDetail = () => {
  isShowDetail.value = !isShowDetail.value;
}
const switchTheme = () => {
  isDarkTheme.value = !isDarkTheme.value;
  console.log("点击主题切换，isDarkTheme = ",isDarkTheme.value);
}
const clearSearch = () => {
  searchKey.value = "";
}
const openEdit = () => {
  Object.assign(editForm, person);
  isEditMode.value = true;
}
const saveEdit = () => {
  Object.assign(person, editForm);
  isEditMode.value = false;
  alert("信息保存成功！");
}
const cancelEdit = () => {
  isEditMode.value = false;
}

const filterSkillList = computed(() => {
  const keyword = searchKey.value.trim().toLowerCase();
  if (!keyword) {
    return skillList.value;
  }
  return skillList.value.filter(skill => skill.toLowerCase().includes(keyword) );
})

watch(searchKey,(newValue, oldValue) => {
  console.log(`【watch监听搜索词】旧值：${oldValue}，新值：${newValue}`);
})
watch(isDarkTheme,(newVal) => {
  console.log(`【watch监听主题】当前是否暗色模式：${newVal}`);
})

onMounted(() => {
  console.log("【onMounted】Vue页面挂载完成，个人信息页面加载完毕");
})
</script>


<style scoped>
/* 把你原来所有CSS全部粘贴在这里 */
* { margin: 0; padding: 0; box-sizing: border-box; }
body { min-height: 100vh; font-family: "Microsoft YaHei", system-ui, sans-serif; }
.app-shell { min-height: 100vh; padding: 40px 20px; color: #234; background: linear-gradient(135deg, #eaf6ff 0%, #cfeaff 100%); transition: color 0.5s ease, background 0.5s ease; }
.app-shell.dark { color: #e6f4ff; background: linear-gradient(135deg, #102a43 0%, #1d4664 100%); }
.container { max-width: 720px; margin: 0 auto; }
.main-card { overflow: hidden; background: #ffffff; border-radius: 20px; box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12); transition: background 0.5s ease, box-shadow 0.5s ease; }
.app-shell.dark .main-card { background: #22272e; box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4); }
.card-banner { height: 140px; background: linear-gradient(120deg, #91d5ff, #409eff); }
.app-shell.dark .card-banner { background: linear-gradient(120deg, #176b9c, #245b8a); }
.card-body { position: relative; margin-top: -60px; padding: 0 36px 36px; }
.avatar-wrap { width: 120px; height: 120px; overflow: hidden; border: 5px solid #fff; border-radius: 50%; box-shadow: 0 4px 14px rgba(0,0,0,0.15); }
.app-shell.dark .avatar-wrap { border-color: #22272e; }
.avatar-wrap img { width: 100%; height: 100%; object-fit: cover; }
.base-info { margin-top:16px; }
.base-info h2 { font-size:28px; margin-bottom: 8px; }
.meta-row { display:flex; gap:24px; flex-wrap:wrap; font-size:15px; color:#555; }
.app-shell.dark .meta-row { color:#adbac7; }
.btn-bar { margin-top:28px; display:flex; gap:12px; flex-wrap:wrap; }
button { padding:10px 18px; border:none; border-radius:10px; cursor:pointer; font-size:14px; transition: all 0.3s ease; }
.btn-primary { background-color: #409eff; color: #fff; }
.btn-primary:hover { background-color: #1689e8; }
.btn-theme { background-color: #69c0ff; color: #fff; }
.btn-theme:hover { background-color: #409eff; }
.btn-clear { background-color:#909399; color:#fff; }
.btn-clear:hover { background-color:#7a7c80; }
.btn-success { background-color:#36c66c; color:#fff; }
.btn-success:hover{ background-color:#28a858; }
.btn-warning{ background-color:#e6a23c; color:#fff; }
.btn-warning:hover{ background-color:#cc8c29; }
.app-shell.dark .btn-primary { background-color: #287fbd; }
.app-shell.dark .btn-theme { background-color: #176b9c; }
.intro-block { margin-top:24px; padding:20px; background-color:#f0f9ff; border-radius:12px; line-height:1.8; }
.app-shell.dark .intro-block { background-color:#1e4059; }
.intro-block h4 { margin-bottom: 10px; font-size:17px; }
.search-wrap { margin-top: 28px; }
.search-row { display:flex; gap:10px; align-items:center; }
.search-wrap label { display:inline-block; margin-bottom:8px; font-weight:500; }
#searchInput { flex:1; padding:12px 16px; border-radius:10px; border:1px solid #ccd6e0; font-size:15px; background-color:#fff; color:#222; outline:none; }
#searchInput:focus { border-color:#409eff; }
.app-shell.dark #searchInput { background-color:#2d333b; border-color:#444c56; color:#e6edf3; }
.skill-title { margin-top:24px; margin-bottom:14px; font-size:17px; }
.skill-container { display:flex; gap:12px; flex-wrap:wrap; }
.skill-tag { padding:8px 16px; background-color: #e6f7ff; color: #1677b8; border-radius: 24px; font-size:14px; }
.app-shell.dark .skill-tag { background-color: #24516d; color: #91d5ff; }
.empty-tip { color:#888; padding:10px 0; }
.app-shell.dark .empty-tip { color:#999; }
.edit-item{ margin:12px 0; }
.edit-item label{ display:block; margin-bottom:4px; }
.edit-item input,.edit-item textarea{ width:100%; padding:10px; border-radius:8px; border:1px solid #ccd6e0; }
.app-shell.dark .edit-item input, .app-shell.dark .edit-item textarea{ background:#2d333b; color:#eee; border-color:#444c56; }
</style>
