/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

import clientesRota from '#start/clientes/clientes_rotas'

router
  .group(() => {
    clientesRota()
  })
  .prefix('clientes')

// router.group(() => {
//   teamsRota()
// }).prefix('teams')
