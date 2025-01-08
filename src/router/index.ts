import type { RouteRecordRaw } from 'vue-router'

import { createRouter, createWebHashHistory } from 'vue-router'

import { setupRouterGuard } from './guard'
import example from './modules/example'
import misc from './modules/misc'

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/home' },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/main/not-found/index.vue') },
  { path: '/home', name: 'Home', component: () => import('@/views/main/home/index.vue'), meta: { title: '首页' } },

  example,
  misc,
]

const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes,
})

setupRouterGuard(router)

export default router
