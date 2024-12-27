import { test } from '@japa/runner'
import i18nManager from '@adonisjs/i18n/services/main'
import assert from 'node:assert'

test.group('I18n', () => {
  test('verifica se o arquivo de tradução está sendo carregado corretamente', async () => {
    const i18n = i18nManager.locale('pt')
    console.log(i18n.localeTranslations)
    const message = i18n.t('messages.errosimples')
    assert.strictEqual(message, 'erro simples')
  })
})
