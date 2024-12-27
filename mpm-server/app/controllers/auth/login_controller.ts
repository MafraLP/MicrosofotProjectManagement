import type { HttpContext } from '@adonisjs/core/http'

import BaseController from '#controllers/base_controller'
import User from '#models/user'

export default class LoginController extends BaseController {
  public async handle({ request, auth, response }: HttpContext) {
    try {
      const { email, password } = request.only(['email', 'password'])

      const user = await User.query().where('email', email).first()
      if (!user || !(await user.verifyPassword(password))) {
        return this.sendError(
          { response } as HttpContext,
          'messages.errors.auth.invalid_credentials',
          401
        )
      }

      const tokens = await auth.use('jwt').generateTokens(user)

      return this.sendSuccess({ response } as HttpContext, undefined, 200, {
        ...tokens,
        user: {
          id: user.id,
          email: user.email,
        },
      })
    } catch (error) {
      return this.sendError({ response } as HttpContext, 'messages.errors.default', 500, error)
    }
  }
}
