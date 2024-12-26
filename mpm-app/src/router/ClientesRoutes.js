// mpm-app/src/router/ClientesRoutes.js
const ClientesRoutes = [
  {
    path: '/',
    children: [
      { path: '', component: () => import('pages/Clientes/ClienteLoginPage.vue') }
    ]
  }
]

export default ClientesRoutes
