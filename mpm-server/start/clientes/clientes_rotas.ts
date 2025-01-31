import router from '@adonisjs/core/services/router'

const ClientesProjectsController = () =>
  import('#controllers/clientes/clientes_projects_controller')
const CreateProjectsProposalController = () =>
  import('#controllers/clientes/projects_proposal/create_projects_proposal_controller')

export default function ClientesRotas() {
  router.group(() => {
    // router.get('/me', async ({ auth, response }) => {
    //   const user = await auth.authenticate()
    //   response.send(user)
    // })

    router
      .group(() => {
        router.get('/', [ClientesProjectsController])
      })
      .prefix('/projects')

    router
      .group(() => {
        router.post('/', [CreateProjectsProposalController])
      })
      .prefix('/projects-proposal')
  })
}
