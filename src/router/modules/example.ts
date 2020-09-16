import { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/example/item-list',
    component: () => import('@/views/example/item-list/item-list.vue'),
    meta: {
      title: 'ItemList',
    },
  },
] as Array<RouteRecordRaw>
