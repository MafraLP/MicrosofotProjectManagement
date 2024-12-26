// mpm-app/src/router/TeamsRoutes.js
const TeamsRoutes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Teams/TeamLoginPage.vue') }
    ]
  }
]

export default TeamsRoutes
