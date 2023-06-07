import { createApp } from 'vue'
import { createPinia } from 'pinia'
// 引入Ant组件库
import AntD from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// 全局注册antD
app.use(AntD)
app.mount('#app')
