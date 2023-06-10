import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      component: Layout,
      // 子节点
      children: [
        {
          path: 'dashboard', // 二级路由地址
          component: () => import('../views/dashborard/index.vue'),
          // 路由元信息
          meta: {
            title: '数据看板',
            icon: 'HomeOutlined'
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/login/index.vue'),
      hidden: true
    }
  ]
})

export default router
