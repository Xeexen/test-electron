import { createRouter, createWebHistory ,createWebHashHistory} from 'vue-router'
import MainRoutes from './MainRoutes'
import PublicRoutes from './PublicRoutes'

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/pages/maintenance/error/Error404Page.vue')
    },
    MainRoutes,
    PublicRoutes
  ]
})
