import router from '@adonisjs/core/services/router'
const LoginController = () => import('#controllers/auth/login_controller')
const RefreshTokenController = () => import('#controllers/auth/refresh_tokens_controller')

export default function CommonRotas() {
  router
    .group(() => {
      router.post('/login', [LoginController])
      router.post('/refresh', [RefreshTokenController])
      //router.post('/logout', [LogoutController])
    })
    .prefix('auth')
}
