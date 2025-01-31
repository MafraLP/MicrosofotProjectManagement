import { BaseSeeder } from '@adonisjs/lucid/seeders'
import UserGenerator from '#database/factories/user_factory'
import User from '#models/User'

export default class extends BaseSeeder {
  async run() {
    for (let i = 0; i < 50; i++) {
      await User.create(
        UserGenerator.generateUser('client' + i + '@gmail.com', '123456', 'cliente')
      )
    }
  }
}
