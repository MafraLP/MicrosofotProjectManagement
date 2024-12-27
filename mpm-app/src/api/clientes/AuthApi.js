import ClientesBaseApi from './ClientesBaseApi'

class AuthApi extends ClientesBaseApi {

  login(data) {
    return this.post('/login', data);
  }

  logout() {
    return this.post('/logout');
  }
}

export default new AuthApi();
