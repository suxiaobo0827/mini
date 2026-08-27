import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { title: '登录', hideTabbar: true },
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { title: '我的' },
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} - Vue3 Mobile` : 'Vue3 Mobile'
})

export default router
