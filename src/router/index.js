// ============================================================
// 路由配置：Vue Router 实例与路由表（实验四：整合 Pinia + 路由守卫）
// 覆盖：基础路由 / 嵌套路由 / 动态路由 / 404 / 路由元信息 meta / 全局守卫
// ============================================================
import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import AboutPage from '@/views/AboutPage.vue'
import ProjectsPage from '@/views/projects/ProjectsPage.vue'
import ProjectListPage from '@/views/projects/ProjectListPage.vue'
import ProjectDetailPage from '@/views/projects/ProjectDetailPage.vue'
import ProjectStatsPage from '@/views/projects/ProjectStatsPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import ArticlesPage from '@/views/articles/ArticlesPage.vue'
import ArticleManagePage from '@/views/articles/ArticleManagePage.vue'
import ManagePage from '@/views/manage/ManagePage.vue'
import ManageProfilePage from '@/views/manage/ManageProfilePage.vue'
import ManageProjectsPage from '@/views/manage/ManageProjectsPage.vue'
import NotFoundPage from '@/views/NotFoundPage.vue'
import { useUserStore } from '@/stores/userStore.js'

const routes = [
  { path: '/', name: 'home', component: HomePage, meta: { title: '首页' } },
  { path: '/about', name: 'about', component: AboutPage, meta: { title: '关于我' } },

  {
    path: '/projects',
    name: 'projects',
    component: ProjectsPage,
    meta: { title: '项目中心' },
    children: [
      { path: '', redirect: { name: 'project-list' } },
      { path: 'list', name: 'project-list', component: ProjectListPage, meta: { title: '项目列表' } },
      { path: 'stats', name: 'project-stats', component: ProjectStatsPage, meta: { title: '项目统计' } },
      { path: ':id', name: 'project-detail', component: ProjectDetailPage, meta: { title: '项目详情' } }
    ]
  },

  // 登录页（公开）
  { path: '/login', name: 'login', component: LoginPage, meta: { title: '登录' } },

  // 文章模块：文章列表（公开）+ 文章管理（受保护）
  {
    path: '/articles',
    name: 'articles',
    component: ArticlesPage,
    meta: { title: '文章列表' }
  },
  {
    path: '/articles/manage',
    name: 'article-manage',
    component: ArticleManagePage,
    meta: { title: '文章管理', requiresAuth: true }
  },

  // 后台管理（受保护）
  {
    path: '/manage',
    name: 'manage',
    component: ManagePage,
    meta: { requiresAuth: true },
    children: [
      { path: 'profile', name: 'manage-profile', component: ManageProfilePage, meta: { title: '个人简介管理' } },
      { path: 'projects', name: 'manage-projects', component: ManageProjectsPage, meta: { title: '项目管理' } }
    ]
  },

  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundPage, meta: { title: '页面不存在' } }
]

const router = createRouter({
  // 用 Hash 模式部署到 GitHub Pages，避免刷新子路由时服务器返回 404
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 80 }
    return { top: 0 }
  }
})

// ============================================================
// 全局前置守卫 beforeEach：
// 1. 更新浏览器标签页标题；
// 2. 在守卫函数内部调用 useUserStore()（确保 Pinia 已初始化），
//    读取登录态；访问 meta.requiresAuth 页面时未登录则跳转登录页。
// ============================================================
router.beforeEach((to) => {
  document.title = to.meta?.title
    ? `${to.meta.title} | 王双红的个人主页`
    : '王双红的个人主页'

  const userStore = useUserStore()

  if (to.meta?.requiresAuth && !userStore.isLoggedIn) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  return true
})

export default router
