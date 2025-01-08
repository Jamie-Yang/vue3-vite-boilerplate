export default {
  path: '/misc',
  children: [
    {
      path: 'playground',
      component: () => import('@/views/misc/playground/index.vue'),
      meta: { title: 'Playground' },
    },
  ],
}
