/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export default [
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/main/home/index.vue'),
  },
]
