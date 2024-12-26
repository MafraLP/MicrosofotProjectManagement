import type { HttpContext } from '@adonisjs/core/http'

import BaseController from '#controllers/base_controller'
import User from '#models/user'

export default class LoginController extends BaseController {
  async handle(ctx: HttpContext) {
    try {
      const { email, password } = ctx.request.all()
      console.log(email, password)
      const user = await User.verifyCredentials(email, password)
      if (!user) {
        return this.sendError(ctx, 'Credenciais inválidas', 401)
      }
      const token = await ctx.auth.use('jwt').generate(user)
      console.log(token)
      return this.sendSuccess(ctx, 'Login efetuado com sucesso', 200, token)
    } catch (error) {
      return this.sendError(ctx, 'Erro ao efetuar login', 500, error)
    }
  }
}
