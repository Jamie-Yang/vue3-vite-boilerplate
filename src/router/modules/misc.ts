import { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/misc/playground',
    component: () => import('@/views/misc/playground/playground.vue'),
    meta: {
      title: 'Playground',
    },
  },
] as Array<RouteRecordRaw>
