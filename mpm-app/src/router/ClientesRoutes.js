// mpm-app/src/router/ClientesRoutes.js
const ClientesRoutes = [
  {
    path: "/login",
    component: () => import("pages/Clientes/ClienteLoginPage.vue"),
  },
  {
    path: "/",
    component: () => import("layouts/ClienteLayout.vue"),
    children: [
      {
        path: "/",
        component: () => import("pages/Clientes/ClienteLandingPage.vue"),
      },
      {
        path: "projects",
        component: () => import("pages/Clientes/ClienteProjects.vue"),
      },
    ],
  },
];

export default ClientesRoutes;
