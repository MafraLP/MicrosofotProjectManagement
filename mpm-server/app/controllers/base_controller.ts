import type { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'

//Essa classe existe para eu ter um padrão de retorno das requests
export default class BaseController {
  public sendSuccess(ctx: HttpContext, message: string, status: number = 200, data?: any) {
    return ctx.response.status(status).send({
      code: status,
      message,
      data
    })
  }
  public sendError(
    ctx: HttpContext,
    message: string,
    status: number = 500,
    error?: ExceptionHandler
  ) {
    if (error) {
      logger.error({ err: error })
    }
    return ctx.response.status(status).send({
      code: status,
      message,
    })
  }
}
