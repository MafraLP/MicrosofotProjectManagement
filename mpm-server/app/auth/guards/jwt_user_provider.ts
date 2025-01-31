import { JwtUserProviderContract, JwtGuardUser } from './jwt.js'
import { symbols } from '@adonisjs/auth'
import User from '#models/user'

class JwtUserProvider implements JwtUserProviderContract<User> {
  [symbols.PROVIDER_REAL_USER] = new User()

  async createUserForGuard(user: User): Promise<JwtGuardUser<User>> {
    console.log('Entrando em createUserForGuard')

    const jwtGuardUser: JwtGuardUser<User> = {
      getId: () => user.id,
      getRole: () => user.role, // Verificar se a função é atribuída corretamente
      getOriginal: () => user,
    }

    // Verificar as funções do objeto retornado
    console.log('jwtGuardUser:', jwtGuardUser)
    console.log('getRole method:', jwtGuardUser.getRole)

    return jwtGuardUser
  }

  async findById(identifier: string | number | BigInt): Promise<JwtGuardUser<User> | null> {
    console.log('Chamando findById')
    const user = await User.find(identifier)
    if (!user) return null

    return {
      getId: () => user.id,
      getOriginal: () => user,
      getRole: () => user.role,
    }
  }
}

export default JwtUserProvider
