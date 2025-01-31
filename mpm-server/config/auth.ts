import { defineConfig } from '@adonisjs/auth'
import JwtUserProvider from '../app/auth/guards/jwt_user_provider.js'
import env from '#start/env'
import { JwtGuard } from '#config/jwt/jwt_guard'

const jwtConfig = {
  secret: env.get('APP_KEY'),
  accessTokenExpiresIn: '10m',
  refreshTokenExpiresIn: '2d',
}

// Ajuste para usar JwtUserProvider
const userProvider = new JwtUserProvider()

const authConfig = defineConfig({
  default: 'jwt',
  guards: {
    jwt: (ctx) => {
      return new JwtGuard(ctx, userProvider, jwtConfig)
    },
  },
})

export default authConfig
