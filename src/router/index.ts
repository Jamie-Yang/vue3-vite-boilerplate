import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'

import main from './modules/main'

const routes: Array<RouteRecordRaw> = [...main]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
