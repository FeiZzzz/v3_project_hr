import { createApp } from 'vue'
import { createPinia } from 'pinia'
// 引入Ant组件库
import AntD from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
// 引入pinia持久化插件
import PluginState from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const piniaApp = createPinia() 
//注册持久化插件
piniaApp.use(PluginState)
app.use(piniaApp)

app.use(router)
// 全局注册antD
app.use(AntD)
app.mount('#app')
