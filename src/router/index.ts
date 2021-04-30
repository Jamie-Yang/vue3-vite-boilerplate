import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'
import example from './modules/example'
import main from './modules/main'
import misc from './modules/misc'

let routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/misc/playground',
  },
  ...example,
  ...main,
  ...misc,
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, _from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - Vue3 Mobile` : 'Vue3 Mobile'
  next()
})

export default router
