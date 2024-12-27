import type { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'
import i18nManager from '@adonisjs/i18n/services/main'
export default class BaseController {
  i18n = i18nManager.locale('pt')
  public sendSuccess(ctx: HttpContext, messageKey?: string, status: number = 200, data?: any) {
    console.log(this.i18n)
    console.log(messageKey ? this.i18n.t(messageKey) : 'nao achou nada')
    const message = messageKey ? this.i18n.t(messageKey) : undefined
    return ctx.response.status(status).send({
      code: status,
      message,
      data,
    })
  }

  public sendError(
    ctx: HttpContext,
    messageKey?: string,
    status: number = 500,
    error?: ExceptionHandler
  ) {
    if (error) {
      logger.error({ err: error })
    }

    const message = this.i18n.t(messageKey || 'message.errors.default')

    return ctx.response.status(status).send({
      code: status,
      message,
    })
  }
}
