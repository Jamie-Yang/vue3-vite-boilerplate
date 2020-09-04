import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'

import main from './modules/main'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  ...main,
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
