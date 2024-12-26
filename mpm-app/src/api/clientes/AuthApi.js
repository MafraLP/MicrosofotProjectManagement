import ClientesBaseApi from './ClientesBaseApi'

class AuthApi extends ClientesBaseApi {
  constructor() {
    super('/clientes/auth');
  }

  login(data) {
    return this.post('/login', data);
  }

  logout() {
    return this.post('/logout');
  }
}

export default new AuthApi();
