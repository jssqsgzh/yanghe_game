import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '../views/index.vue'

const routes = [
    {
      path: '/',
      name: 'home',
      component: Index,
      redirect:'/egg',
      children:[
        {
            path: '/scan',
            name: '/scan',
            component: () => import('../views/scan.vue'),
            meta: {
                title: '首页',
                keepAlive: false,
                isUseCache: false
            },
        },
        {
            path: '/egg',
            name: '/egg',
            component: () => import('../views/egg.vue'),
            meta: {
                title: '抽奖页',
                keepAlive: false,
                isUseCache: false
            },
        },
      ]
    },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
