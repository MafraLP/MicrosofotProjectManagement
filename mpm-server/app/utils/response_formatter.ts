import type { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'
import i18nManager from '@adonisjs/i18n/services/main'

export function sendSuccess(
  ctx: HttpContext,
  messageKey?: string | { messageKey: string; params: object },
  status: number = 200,
  data?: any
) {
  const i18n = i18nManager.locale('pt')
  let message
  if (typeof messageKey === 'object') {
    message = i18n.t(messageKey.messageKey, messageKey.params)
  } else if (typeof messageKey === 'string') {
    message = i18n.t(messageKey)
  }
  return ctx.response.status(status).send({
    code: status,
    message,
    data,
  })
}

export function sendError(
  ctx: HttpContext,
  messageKey?: string,
  status: number = 500,
  error?: ExceptionHandler
) {
  const i18n = i18nManager.locale('pt')
  if (error) {
    logger.error({ err: error })
  }

  let message

  if (messageKey) {
    message = i18n.t(messageKey)
  }

  return ctx.response.status(status).send({
    code: status,
    message,
  })
}
