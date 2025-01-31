import { BaseSeeder } from '@adonisjs/lucid/seeders'
import UserGenerator from '#database/factories/user_factory'
import User from '#models/User'

export default class extends BaseSeeder {
  async run() {
    await User.create(UserGenerator.generateUser('admin@gmail.com', '123456', 'admin'))
  }
}
