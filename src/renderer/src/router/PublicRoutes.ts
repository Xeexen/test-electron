const PublicRoutes = {
  path: '/',
  component: () => import('@/layouts/blank/BlankLayout.vue'),
  meta: {
    requiresAuth: false
  },
  redirect: { name: 'Authentication' },
  children: [
    {
      name: 'Authentication',
      path: 'login',
      component: () => import('@/views/authentication/LoginPage.vue')
    },
    {
      name: 'Error 404',
      path: 'error',
      component: () => import('@/views/pages/maintenance/error/Error404Page.vue')
    }
  ]
}

export default PublicRoutes
