import axios from "axios";
import { Notify } from "quasar";
import { useAuthStore } from "stores/useAuthStore";

let routerInstance = null;

export function setRouter(router) {
  routerInstance = router;
}

class BaseApi {
  constructor(basePath) {
    this.api = axios;
    this.api.defaults.baseURL = process.env.ADONIS_ENDPOINT + basePath;
    this.setupRequestInterceptor();
    this.setupResponseInterceptor();
  }

  setupRequestInterceptor() {
    this.api.interceptors.request.use(
      (config) => {
        const authStore = useAuthStore();
        const token = authStore.getAccessToken;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  setupResponseInterceptor() {
    this.api.interceptors.response.use(
      this.handleResponseSuccess.bind(this),
      this.handleResponseError.bind(this)
    );
  }

  handleResponseSuccess(response) {
    const { data } = response;
    if (data && typeof data.code === "number" && data.message) {
      this.notifySuccess(data.message);
      return this.formatResponseData(data);
    }
    return response;
  }

  async handleResponseError(error) {
    const { response } = error;


    if (response && response.status === 401) {
      const authStore = useAuthStore();

      // Log para debug

      if (authStore.getRefreshToken) {
        try {
          return await this.handleUnauthorizedError(error);
        } catch (refreshError) {
          authStore.logout();
          this.notifyError("Sessão expirada. Por favor, faça login novamente.");

          if (routerInstance) {
            routerInstance.push("/login");
          } else {
            console.error("Router não disponível para redirecionamento");
          }

          return Promise.reject(error);
        }
      } else {
        authStore.logout();

        this.notifyError("Sessão inválida. Por favor, faça login.");

        if (routerInstance) {
          routerInstance.push("/login");
        }
      }
    }

    if (response?.data?.message) {
      this.notifyError(response.data.message);
    }

    return Promise.reject(error);
  }

  async handleUnauthorizedError(error) {
    const authStore = useAuthStore();

    try {
      await authStore.refreshAccessToken();

      return this.api(error.config);
    } catch (refreshError) {
      throw refreshError; // Propagar erro para ser tratado pelo catch no handleResponseError
    }
  }

  notifySuccess(message) {
    Notify.create({
      type: "positive",
      message,
    });
  }

  notifyError(message) {
    Notify.create({
      type: "negative",
      message,
      timeout: 5000,
      actions: [
        { label: 'Login', color: 'white', handler: () => {
            if (routerInstance) {
              routerInstance.push("/login");
            }
          }}
      ]
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
