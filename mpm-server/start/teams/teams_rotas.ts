import router from '@adonisjs/core/services/router'
export default function TeamsRotas() {
  router.get('/me', async ({ auth, response }) => {
    const user = await auth.authenticate()
    response.send(user)
  })
}
