import router from '@adonisjs/core/services/router'
const LoginController = () => import('#controllers/auth/login_controller')

export default function Auth() {
  router.post('/login', [LoginController])
}
