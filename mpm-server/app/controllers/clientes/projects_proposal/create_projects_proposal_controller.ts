import type { HttpContext } from '@adonisjs/core/http'
import BaseController from '#controllers/base_controller'
import User from '#models/user'
import ProjectProposal from '#models/project_proposal'
import { ProjectProposalsEnum } from '../../../utils/enums/project_proposals_enum.js'
import ProjectProposalCreated from '#events/project_proposal_created'

export default class CreateProjectsProposalController extends BaseController {
  public async handle({ request, auth, response }: HttpContext) {
    console.log(request.all())
    try {
      const { title, description } = request.only(['title', 'description'])
      const cliente = (await auth.authenticate()) as User

      const projectProposal = await new ProjectProposal(
        cliente.id,
        title,
        description,
        ProjectProposalsEnum.PENDENTE
      ).save()

      await ProjectProposalCreated.dispatch(cliente, projectProposal)

      return this.sendSuccess(
        { response } as HttpContext,
        {
          messageKey: 'messages.success.created',
          params: { object: this.i18n.t('messages.project_proposal') },
        },
        200
      )
    } catch (error) {
      return this.sendError({ response } as HttpContext, 'messages.errors.default', 500, error)
    }
  }
}
