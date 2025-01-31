import { symbols, errors } from '@adonisjs/auth'
import { AuthClientResponse, GuardContract } from '@adonisjs/auth/types'
import { JwtUserProviderContract } from '../../app/auth/guards/jwt.js'
import { HttpContext } from '@adonisjs/core/http'
import { sendError } from '../../app/utils/response_formatter.ts'

import jwt from 'jsonwebtoken'

export type JwtGuardOptions = {
  secret: string
  accessTokenExpiresIn: string | number
  refreshTokenExpiresIn: string | number
}

export class JwtGuard<JwtUserProvider extends JwtUserProviderContract<unknown>>
  implements GuardContract<JwtUserProvider[typeof symbols.PROVIDER_REAL_USER]>
{
  #ctx: HttpContext
  #userProvider: JwtUserProvider
  #options: JwtGuardOptions

  constructor(ctx: HttpContext, userProvider: JwtUserProvider, options: JwtGuardOptions) {
    this.#ctx = ctx
    this.#userProvider = userProvider
    this.#options = options
  }
  /**
   * A list of events and their types emitted by
   * the guard.
   */
  declare [symbols.GUARD_KNOWN_EVENTS]: {}

  /**
   * A unique name for the guard driver
   */
  driverName: 'jwt' = 'jwt'

  /**
   * A flag to know if the authentication was an attempt
   * during the current HTTP request
   */
  authenticationAttempted: boolean = false

  /**
   * A boolean to know if the current request has
   * been authenticated
   */
  isAuthenticated: boolean = false

  /**
   * Reference to the currently authenticated user
   */
  user?: JwtUserProvider[typeof symbols.PROVIDER_REAL_USER]

  /**
   * Generate a JWT token for a given user.
   */
  async generate(user: JwtUserProvider[typeof symbols.PROVIDER_REAL_USER]) {
    const providerUser = await this.#userProvider.createUserForGuard(user)

    const accessToken = jwt.sign(
      { userId: providerUser.getId(), type: 'access' },
      this.#options.secret,
      { expiresIn: '15m' }
    )

    const refreshToken = jwt.sign(
      { userId: providerUser.getId(), type: 'refresh' },
      this.#options.secret,
      { expiresIn: '7d' } // 7 dias
    )

    return {
      accessToken: {
        type: 'bearer',
        token: accessToken,
      },
      refreshToken: {
        type: 'bearer',
        token: refreshToken,
      },
    }
  }

  /**
   * Authenticate the current HTTP request and return
   * the user instance if there is a valid JWT token
   * or throw an exception
   */
  async authenticate(): Promise<JwtUserProvider[typeof symbols.PROVIDER_REAL_USER]> {
    /**
     * Evita re-autenticação quando já foi feita para a requisição atual
     */
    if (this.authenticationAttempted) {
      return this.getUserOrFail()
    }
    this.authenticationAttempted = true

    /**
     * Garante que o cabeçalho de autenticação exista
     */
    const authHeader = this.#ctx.request.header('authorization')
    if (!authHeader) {
      sendError(this.#ctx, undefined, 401)
      return
    }

    /**
     * Divide o valor do cabeçalho e lê o token dele
     */
    const [, token] = authHeader.split('Bearer ')
    if (!token) {
      sendError(this.#ctx, undefined, 401)
      return
    }

    /**
     * Verifica o token
     */
    let payload
    try {
      payload = jwt.verify(token, this.#options.secret)
    } catch (error) {
      sendError(this.#ctx, undefined, 401, error)
      return
    }

    if (typeof payload !== 'object' || !('userId' in payload) || !('role' in payload)) {
      sendError(this.#ctx, undefined, 401)
      return
    }

    /**
     * Busca o usuário pelo ID e salva uma referência a ele
     */
    const providerUser = await this.#userProvider.findById(payload.userId)
    if (!providerUser) {
      sendError(this.#ctx, undefined, 401)
      return
    }

    this.user = providerUser.getOriginal()

    return this.getUserOrFail()
  }
  async generateTokens(user: JwtUserProvider[typeof symbols.PROVIDER_REAL_USER]) {
    console.log('Chamando createUserForGuard')

    const providerUser = await this.#userProvider.createUserForGuard(user)

    const accessToken = jwt.sign(
      { userId: providerUser.getId(), type: 'access', role: providerUser.getRole() },
      this.#options.secret,
      { expiresIn: this.#options.accessTokenExpiresIn }
    )

    const refreshToken = jwt.sign(
      { userId: providerUser.getId(), type: 'refresh' },
      this.#options.secret,
      { expiresIn: this.#options.refreshTokenExpiresIn }
    )

    return {
      accessToken: {
        type: 'bearer',
        token: accessToken,
        expiresIn: this.#options.accessTokenExpiresIn,
      },
      refreshToken: {
        type: 'bearer',
        token: refreshToken,
        expiresIn: this.#options.refreshTokenExpiresIn,
      },
    }
  }
  /**
   * Same as authenticate, but does not throw an exception
   */
  async check(): Promise<boolean> {
    try {
      await this.authenticate()
      return true
    } catch {
      return false
    }
  }

  /**
   * Returns the authenticated user or throws an error
   */
  getUserOrFail(): JwtUserProvider[typeof symbols.PROVIDER_REAL_USER] {
    if (!this.user) {
      throw new errors.E_UNAUTHORIZED_ACCESS('Unauthorized access', {
        guardDriverName: this.driverName,
      })
    }

    return this.user
  }

  /**
   * This method is called by Japa during testing when "loginAs"
   * method is used to login the user.
   */
  async authenticateAsClient(
    user: JwtUserProvider[typeof symbols.PROVIDER_REAL_USER]
  ): Promise<AuthClientResponse> {
    const token = await this.generate(user)
    return {
      headers: {
        authorization: `Bearer ${token.accessToken.token}`,
      },
    }
  }
}
