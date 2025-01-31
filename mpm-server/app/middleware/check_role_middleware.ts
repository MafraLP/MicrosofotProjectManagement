import { HttpContext } from '@adonisjs/core/http'
import { NextFn } from '@adonisjs/core/types/http'
import User from '#models/user'
import BaseController from '#controllers/base_controller'

export default class CheckRole extends BaseController {
  async handle(ctx: HttpContext, next: NextFn, roles: string[]) {
    try {
      const user = (await ctx.auth.authenticate()) as User | undefined
      if (!(user instanceof User) || !roles.includes(user.getRole())) {
        return this.sendError(ctx, 'messages.errors.auth.unauthorized', 403)
      }

      await next()
    } catch (error) {
      return this.sendError(ctx, 'messages.errors.default', 500, error)
    }
  }
}
