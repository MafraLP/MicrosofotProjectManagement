// mpm-app/src/api/BaseApi.js
import axios from 'axios';

class BaseApi {
  constructor(basePath) {
    this.api = axios.create({
      baseURL: `http://localhost:3333${basePath}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  get(url, params = {}) {
    return this.api.get(url, { params });
  }

  post(url, data) {
    return this.api.post(url, data);
  }

  put(url, data) {
    return this.api.put(url, data);
  }

  delete(url) {
    return this.api.delete(url);
  }
}

export default BaseApi;
