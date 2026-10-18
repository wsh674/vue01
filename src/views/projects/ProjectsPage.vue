<template>
  <!-- 项目中心：父路由组件，提供共享标题、子导航与子路由出口 RouterView -->
  <main class="page">
    <h1 class="page-title">项目中心</h1>
    <p class="page-sub">通过嵌套路由组织项目列表、项目详情与项目统计三个子页面</p>

    <!-- 子导航：使用命名路由跳转到子路由 -->
    <nav class="tabs">
      <RouterLink :to="{ name: 'project-list' }" class="tab">项目列表</RouterLink>
      <RouterLink :to="{ name: 'project-stats' }" class="tab">项目统计</RouterLink>
    </nav>

    <!-- 子路由出口：list / stats / :id 三个子页面渲染在此处 -->
    <RouterView />
  </main>
</template>

<style scoped>
.page {
  margin-top: 12px;
}
.page-title {
  font-size: 24px;
  color: var(--text-color);
}
.page-sub {
  font-size: 13px;
  color: var(--meta-color);
  margin: 6px 0 18px;
}
.tabs {
  display: flex;
  gap: 14px;
  margin-bottom: 22px;
  border-bottom: 1px solid rgba(64, 158, 255, 0.18);
  padding-bottom: 10px;
}
.tab {
  padding: 6px 14px;
  border-radius: 18px;
  text-decoration: none;
  font-size: 14px;
  color: var(--meta-color);
  background: rgba(64, 158, 255, 0.08);
  transition: all 0.3s ease;
}
.tab:hover {
  color: var(--nav-hover);
}
/* RouterLink 自动高亮类：当前子路由匹配时激活 */
.tab.router-link-active {
  color: #fff;
  background: linear-gradient(120deg, var(--banner-grad-1), var(--banner-grad-2));
  font-weight: 600;
}
</style>
