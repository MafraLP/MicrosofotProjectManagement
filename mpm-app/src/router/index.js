import { route } from "quasar/wrappers";
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import routes from "./routes";
import ClientesRoutes from "./ClientesRoutes";
import TeamsRoutes from "./TeamsRoutes";
import { useAuthStore } from "stores/useAuthStore";
import { setRouter } from "src/api/BaseApi"; // Importando a função setRouter

let router = null;

export default route(function (/* { store, ssrContext } */) {
  if (!router) {
    const createHistory = process.env.SERVER
      ? createMemoryHistory
      : process.env.VUE_ROUTER_MODE === "history"
        ? createWebHistory
        : createWebHashHistory;

    const host = window.location.host;
    const parts = host.split(".");
    const domainLength = 2; // about.mpm => domain length = 2

    let applyAuthGuard = true;

    let selectedRoutes;

    if (parts[0] === "about") {
      selectedRoutes = routes;
      applyAuthGuard = false;
    } else if (parts.length === domainLength - 1 || parts[0] === "www") {
      selectedRoutes = routes;
    } else if (parts[0] === "clientes") {
      selectedRoutes = ClientesRoutes;
    } else if (parts[0] === "teams") {
      selectedRoutes = TeamsRoutes;
    } else {
      selectedRoutes = routes;
    }

    router = createRouter({
      scrollBehavior: () => ({ left: 0, top: 0 }),
      routes: selectedRoutes,
      history: createHistory(process.env.VUE_ROUTER_BASE),
    });

    setRouter(router);

    if (applyAuthGuard) {

      router.beforeEach((to, from, next) => {

        const authStore = useAuthStore();
        const publicPages = ['/login']; // Adicione outras rotas públicas aqui
        const authRequired = !publicPages.includes(to.path);

        if (authRequired) {
          const isAuth = authStore.verifyAuth();

          if (!isAuth) {
            next('/login');
            return;
          }
        }

        next();
      });
    } else {
      router.beforeEach((to, from, next) => {
        next();
      });
    }
  }

  return router;
});
