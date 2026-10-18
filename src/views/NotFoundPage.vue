<template>
  <!-- 404 页面：通配符路由 /:pathMatch(.*)* 匹配所有未定义地址 -->
  <main class="page">
    <section class="panel not-found">
      <div class="nf-code">404</div>
      <h1>页面不存在</h1>
      <p class="lead">您访问的地址没有对应的页面，请检查链接是否正确。</p>
      <!-- 命名路由跳转回首页 -->
      <RouterLink :to="{ name: 'home' }" class="btn-primary">返回首页</RouterLink>
    </section>
  </main>
</template>

<style scoped>
.page {
  margin-top: 12px;
}
.not-found {
  text-align: center;
  padding: 60px 20px;
}
.nf-code {
  font-size: 72px;
  font-weight: 800;
  line-height: 1;
  background: linear-gradient(120deg, var(--banner-grad-1), var(--banner-grad-2));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.not-found h1 {
  margin-top: 14px;
  font-size: 24px;
  color: var(--text-color);
}
.lead {
  margin: 12px 0 24px;
  color: var(--meta-color);
  font-size: 14px;
}
</style>
