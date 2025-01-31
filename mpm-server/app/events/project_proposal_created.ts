import { BaseEvent } from '@adonisjs/core/events'
import User from '#models/user'
import ProjectProposal from '#models/project_proposal'

export default class ProjectProposalCreated extends BaseEvent {
  /**
   * Accept event data as constructor parameters
   */
  constructor(
    public cliente: User,
    public projectProposal: ProjectProposal
  ) {
    super()
  }
}
