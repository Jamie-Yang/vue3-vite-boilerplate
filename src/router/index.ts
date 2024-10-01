import type { RouteRecordRaw } from 'vue-router'

import { createRouter, createWebHashHistory } from 'vue-router'

import { setupRouterGuard } from './guard'
import example from './modules/example'
import main from './modules/main'
import misc from './modules/misc'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main/home',
  },
  ...example,
  ...main,
  ...misc,
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

setupRouterGuard(router)

export default router
