import type { RouteRecordRaw } from 'vue-router'

import { createRouter, createWebHashHistory } from 'vue-router'

import NotFound from '@/views/main/not-found/index.vue'

import { setupRouterGuard } from './guard'
import example from './modules/example'
import main from './modules/main'
import misc from './modules/misc'

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/main/home' },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },

  ...example,
  ...main,
  ...misc,
]

const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes,
})

setupRouterGuard(router)

export default router
