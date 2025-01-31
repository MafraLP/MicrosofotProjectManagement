import { BaseSchema } from '@adonisjs/lucid/schema'
import { TasksStatusEnum } from '../../app/utils/enums/tasks_status_enum.js'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 25).notNullable()
      table.text('description').notNullable()
      table.enum('status', Object.values(TasksStatusEnum)).notNullable()
      table.integer('cliente_user_id').unsigned().notNullable().references('id').inTable('users')
      table.integer('gerente_user_id').unsigned().notNullable().references('id').inTable('users')
      table.boolean('completed').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
