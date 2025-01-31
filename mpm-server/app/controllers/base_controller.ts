import type { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import { sendSuccess, sendError } from '../utils/response_formatter.ts'
import i18nManager from '@adonisjs/i18n/services/main'

export default class BaseController {
  i18n = i18nManager.locale('pt')
  public sendSuccess(
    ctx: HttpContext,
    messageKey?: string | { messageKey: string; params: object },
    status: number = 200,
    data?: any
  ) {
    return sendSuccess(ctx, messageKey, status, data)
  }

  public sendError(
    ctx: HttpContext,
    messageKey?: string,
    status: number = 500,
    error?: ExceptionHandler
  ) {
    return sendError(ctx, messageKey, status, error)
  }
}
