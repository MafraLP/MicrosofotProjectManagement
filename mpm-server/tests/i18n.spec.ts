import { test } from '@japa/runner'
import assert from 'node:assert'
import i18nManager from '@adonisjs/i18n/services/main'

test('verifica se a tradução está sendo carregada corretamente', async () => {
  const i18n = i18nManager.locale('pt')
  const message = i18n.t('errosimples')
  assert.strictEqual(message, 'erro simples')
})
