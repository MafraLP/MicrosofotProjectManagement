import BaseController from '#controllers/base_controller'
import { HttpContext } from '@adonisjs/core/http'
import jwt from 'jsonwebtoken'
import User from '#models/user'

export default class RefreshTokensController extends BaseController {
  public async handle({ request, auth, response }: HttpContext) {
    const refreshToken = request.input('refreshToken') as string

    if (!refreshToken) {
      return this.sendError({ response } as HttpContext, undefined, 400)
    }

    try {
      const payload = jwt.verify(refreshToken, process.env.APP_KEY as string)
      if (typeof payload !== 'object' || !('userId' in payload) || payload.type !== 'refresh') {
        return this.sendSuccess({ response } as HttpContext, undefined, 200)
      }

      const user = await User.find(payload.userId)

      if (!user) {
        return this.sendError({ response } as HttpContext, undefined, 403)
      }

      const tokens = await auth.use('jwt').generateTokens(user)

      return this.sendSuccess({ response } as HttpContext, undefined, 200, {
        ...tokens,
        user: {
          id: user.id,
          email: user.email,
          role: user.getRole(),
        },
      })
    } catch (error) {
      return this.sendError({ response } as HttpContext, 'messages.errors.default', 500, error)
    }
  }
}
