import { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/main/home',
    component: () => import('@/views/main/home/home.vue'),
    meta: {
      title: '首页',
    },
  },
] as Array<RouteRecordRaw>
