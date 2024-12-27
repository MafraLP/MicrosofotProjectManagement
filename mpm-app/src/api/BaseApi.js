import api from 'axios';
import { Notify } from 'quasar';
import { useAuthStore } from 'stores/useAuthStore';

class BaseApi {
  constructor(basePath) {
    this.api = api;
    this.api.defaults.baseURL = process.env.ADONIS_ENDPOINT + basePath;
    this.setupResponseInterceptor();
  }

  setupResponseInterceptor() {
    this.api.interceptors.response.use(
      this.handleResponseSuccess,
      this.handleResponseError.bind(this)
    );
  }

  handleResponseSuccess(response) {
    const { data } = response;
    if (data && typeof data.code === 'number' && data.message) {
      this.notifySuccess(data.message);
      return this.formatResponseData(data);
    }
    return response;
  }

  async handleResponseError(error) {
    const { response } = error;

    if (response && response.status === 401 && useAuthStore().refreshToken) {
      return this.handleUnauthorizedError(error);
    }

    if (response?.data?.message) {
      this.notifyError(response.data.message);
    }

    return Promise.reject(error);
  }

  async handleUnauthorizedError(error) {
    try {
      await useAuthStore().refreshAccessToken();
      return this.api(error.config);
    } catch (refreshError) {
      console.error('Falha ao renovar token:', refreshError);
      this.notifyError($t('errors.auth.session_expired'));
      return Promise.reject(refreshError);
    }
  }

  notifySuccess(message) {
    Notify.create({
      type: 'positive',
      message,
    });
  }

  notifyError(message) {
    Notify.create({
      type: 'negative',
      message,
    });
  }

  formatResponseData(data) {
    return {
      success: data.code >= 200 && data.code < 300,
      message: data.message,
      data: data.data,
    };
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
