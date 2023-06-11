import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/layout/index.vue'
import settingRouter from './modules/sttting'
// 动态数组
const asyncRoutes = [settingRouter] // 一个数组中有一个变量
// 固定路由
const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue'),
    hidden: true
  },
  {
    path: '/',
    redirect: '/dashboard', // 跳转
    component: Layout,
    // 子节点
    children: [
      {
        path: 'dashboard', // 二级路由的地址
        component: () => import('../views/dashborard/index.vue'),
        // 路由元信息
        meta: {
          title: '数据看板',
          icon: 'HomeOutlined'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...constantRoutes, ...asyncRoutes] // 合并固定路由 和静态路由
})

export default router
