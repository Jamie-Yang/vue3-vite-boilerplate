export default {
  path: '/misc',

  children: [
    {
      path: '/playground',
      component: () => import('@/views/misc/playground/playground.vue'),
      meta: { title: 'Playground' },
    },
  ],
}
