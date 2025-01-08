export default {
  path: '/example',
  children: [
    {
      path: 'item-list',
      component: () => import('@/views/example/item-list/item-list.vue'),
      meta: { title: 'ItemList' },
    },
  ],
}
