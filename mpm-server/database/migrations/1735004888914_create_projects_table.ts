import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'projects'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title', 25).notNullable()
      table.text('description').notNullable()
      table.integer('cliente_user_id').unsigned().notNullable().references('id').inTable('users')
      table.integer('gerente_user_id').unsigned().notNullable().references('id').inTable('users')
      table.boolean('completed').notNullable()
      table.jsonb('metadata').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
