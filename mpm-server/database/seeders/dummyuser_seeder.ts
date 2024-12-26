import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    await User.create({
      email: 'lucasmafrapinheiro@gmail.com',
      password: '123456',
    })
  }
}
