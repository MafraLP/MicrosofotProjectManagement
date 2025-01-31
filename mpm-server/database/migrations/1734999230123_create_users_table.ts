import { BaseSchema } from '@adonisjs/lucid/schema'
import { RoleEnum } from '../../app/utils/enums/role_enum.js'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('document_number', 20).notNullable()
      table.enum('document_type', ['CPF', 'CNPJ']).notNullable()
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('password').notNullable()
      table.enum('role', Object.values(RoleEnum)).notNullable()
      table.boolean('is_active').notNullable().defaultTo(true)
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
