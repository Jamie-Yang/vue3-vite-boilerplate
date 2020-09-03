/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export default [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/main/home/index.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '@/views/main/about/index.vue'),
  },
]
