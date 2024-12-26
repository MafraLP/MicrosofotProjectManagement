import { HttpContext } from '@adonisjs/core/http'
import BaseController from '#controllers/base_controller'
import User from '#models/user'

export default class LoginController extends BaseController {
  public async handle({ request, auth, response }: HttpContext) {
    try {
      const { email, password } = request.only(['email', 'password'])

      // Valida o usuário
      const user = await User.query().where('email', email).first()
      if (!user || !(await user.verifyPassword(password))) {
        return this.sendError({ response } as HttpContext, 'Credenciais inválidas', 401)
      }

      // Gera Access e Refresh Tokens
      const tokens = await auth.use('jwt').generateTokens(user)

      // Retorna os tokens para o cliente
      return this.sendSuccess({ response } as HttpContext, 'Login bem-sucedido', 200, {
        ...tokens,
        user: {
          id: user.id,
          email: user.email,
        },
      })
    } catch (error) {
      return this.sendError({ response } as HttpContext, 'Erro durante o login', 500, error)
    }
  }
}
