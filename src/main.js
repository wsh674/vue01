import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// 实验四：注册 Pinia 全局状态管理
app.use(createPinia())
// 实验四：全局注册 Element Plus（中文语言包）
app.use(ElementPlus, { locale: zhCn })
app.use(router)

app.mount('#app')
