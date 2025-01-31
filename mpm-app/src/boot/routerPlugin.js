// src/boot/routerPlugin.js
export default ({ app, router }) => {
  app.config.globalProperties.$router = router;
};
