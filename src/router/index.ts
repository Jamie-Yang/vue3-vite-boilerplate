import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'

let routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/misc/playground',
  },
]

const files = require.context('./modules', false, /\.ts$/)

files.keys().forEach((key) => {
  routes = routes.concat(files(key).default)
})

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, _from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - Vue3 Mobile` : 'Vue3 Mobile'
  next()
})

export default router
