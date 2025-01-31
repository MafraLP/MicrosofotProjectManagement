import type { HttpContext } from '@adonisjs/core/http'
import BaseController from '#controllers/base_controller'
import User from '#models/user'
import Project from '#models/project'

export default class ClientesProjectsController extends BaseController {
  public async handle({ auth, response }: HttpContext) {
    try {
      const user = (await auth.authenticate()) as User

      const projects = await Project.query().where('cliente_user_id', user.id)

      if (projects.length === 0) {
        return this.sendError({ response } as HttpContext, undefined, 204)
      }

      return this.sendSuccess({ response } as HttpContext, undefined, 200, {
        projects,
      })
    } catch (error) {
      return this.sendError({ response } as HttpContext, 'messages.errors.default', 500, error)
    }
  }
}
