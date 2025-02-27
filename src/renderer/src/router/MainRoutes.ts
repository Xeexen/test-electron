const MainRoutes = {
  path: '/main',
  meta: {
    requiresAuth: true
  },
  redirect: { name: 'home' },
  component: () => import('@/layouts/dashboard/DashboardLayout.vue'),
  children: [
    {
      name: 'home',
      path: '',
      component: () => import('@/views/dashboards/default/DefaultDashboard.vue')
    },
    {
      name: 'dni-documents',
      path: 'dni',
      component: () => import('@/views/dni/DNIDocuments.vue')
    },
    {
      name: 'dni-documents-add',
      path: 'dni/add',
      component: () => import('@/views/dni/AddDNIView.vue')
    },
    {
      name: 'users',
      path: 'users',
      component: () => import('@/views/users/UsersList.vue')
    },
    {
      name: 'users-add',
      path: 'users',
      component: () => import('@/views/users/AddUser.vue')
    },
    {
      name: 'reports',
      path: 'reports',
      component: () => import('@/views/reports/ReportView.vue')
    },
    {
      name: 'obligations',
      path: 'obligations',
      component: () => import('@/views/obligations/ObligationsListView.vue')
    },
    {
      name: 'task',
      path: 'task',
      component: () => import('@/views/task/TaskView.vue')
    },
    {
      name: 'my-channels',
      path: 'my-channels',
      component: () => import('@/views/account/MyNotificationsChannels.vue')
    }
  ]
}

export default MainRoutes
