import router from '@adonisjs/core/services/router'

import auth from '#start/common/auth'
export default function ClientesRotas() {
  router.group(() => {
    auth()
  })
}
