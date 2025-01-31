import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { ProjectProposalsEnum } from '../utils/enums/project_proposals_enum.js'

export default class ProjectProposal extends BaseModel {
  constructor(clienteId: number, title: string, description: string, status: ProjectProposalsEnum) {
    super()
    this.clienteId = clienteId
    this.title = title
    this.description = description
    this.status = status
  }
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare status: ProjectProposalsEnum

  @column({ columnName: 'cliente_user_id' })
  public clienteId: number
}
