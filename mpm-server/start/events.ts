import emitter from '@adonisjs/core/services/emitter'
import ProjectProposalCreated from '#events/project_proposal_created'

emitter.listen(ProjectProposalCreated, [
  () => import('#listeners/project_proposals/send_project_proposal_notification'),
])
