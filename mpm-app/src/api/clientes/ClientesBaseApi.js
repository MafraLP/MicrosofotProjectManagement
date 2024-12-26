import BaseApi from '../BaseApi';

export default class ClientesBaseApi extends BaseApi {
  constructor() {
    super('/clientes');
  }
}
