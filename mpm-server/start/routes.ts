/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

import clientesRotas from '#start/clientes/clientes_rotas'
import commonRotas from '#start/common/common_rotas'
import teamsRotas from '#start/teams/teams_rotas'
import { middleware } from '#start/kernel'

router
  .group(() => {
    commonRotas()
  })
  .prefix('common')

router
  .group(() => {
    clientesRotas()
  })
  .prefix('clientes')
  .use([middleware.auth(), middleware.checkRole(['cliente', 'admin'])])

router
  .group(() => {
    teamsRotas()
  })
  .prefix('teams')
  .use([middleware.auth(), middleware.checkRole(['teams', 'admin'])])
