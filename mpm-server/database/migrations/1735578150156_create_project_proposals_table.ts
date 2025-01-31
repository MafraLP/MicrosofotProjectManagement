import { BaseSchema } from '@adonisjs/lucid/schema'
import { ProjectProposalsEnum } from '../../app/utils/enums/project_proposals_enum.js'

export default class extends BaseSchema {
  protected tableName = 'project_proposals'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('cliente_user_id').unsigned().notNullable().references('id').inTable('users')
      table.integer('admin_user_id').unsigned().nullable().references('id').inTable('users')
      table.string('title', 25).notNullable()
      table.string('description', 500).notNullable()
      table.enum('status', Object.values(ProjectProposalsEnum)).notNullable()
      table.text('reply').nullable()
      table.jsonb('metadata').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
