export default {
  path: '/example',
  children: [
    {
      path: 'item-list',
      component: () => import('@/views/example/item-list/index.vue'),
      meta: { title: 'ItemList' },
    },
    {
      path: 'icons',
      component: () => import('@/views/example/icons/index.vue'),
      meta: { title: '图标示例' },
    },
    {
      path: 'popups',
      component: () => import('@/views/example/popups/index.vue'),
      meta: { title: '弹窗示例' },
    },
    {
      path: 'playground',
      component: () => import('@/views/example/playground/index.vue'),
      meta: { title: 'Playground' },
    },
  ],
}
