import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'stages'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 25).notNullable()
      table.string('stageable_type').notNullable()
      table.integer('stageable_id').unsigned().notNullable()
      table.timestamp('start_date').notNullable()
      table.timestamp('due_date').notNullable()
      table.boolean('completed').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
