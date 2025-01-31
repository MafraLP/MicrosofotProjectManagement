import { cpf, cnpj } from '../../app/utils/generators/dummy/documents_generator.js'
import { faker } from '@faker-js/faker'

class UserGenerator {
  static randomDocument() {
    return Math.random() < 0.5 ? { type: 'CPF', number: cpf() } : { type: 'CNPJ', number: cnpj() }
  }

  static generateUser(email: string, password: string, role: string) {
    const document = this.randomDocument()
    return {
      email: email,
      password: password,
      first_name: faker.person.firstName(Math.random() < 0.5 ? 'male' : 'female'),
      last_name: faker.person.lastName(),
      is_active: true,
      document_number: document.number,
      document_type: document.type,
      role: role,
    }
  }
}

export default UserGenerator
