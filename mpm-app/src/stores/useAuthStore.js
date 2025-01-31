import { defineStore } from "pinia";
import axios from "axios";
import AuthApi from "src/api/AuthApi";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
  }),

  getters: {
    getUser: (state) => state.user || JSON.parse(localStorage.getItem("user")),
    getAccessToken: (state) =>
      state.accessToken || localStorage.getItem("accessToken"),
    getRefreshToken: (state) =>
      state.refreshToken || localStorage.getItem("refreshToken"),
    getIsAuthenticated: (state) =>
      state.isAuthenticated || !!localStorage.getItem("accessToken"),
  },

  actions: {
    async login(data) {
      console.log("login", data);
      this.accessToken = data.accessToken.token;
      this.refreshToken = data.refreshToken.token;
      this.user = data.user;
      this.isAuthenticated = true;
      localStorage.setItem("accessToken", this.accessToken);
      localStorage.setItem("refreshToken", this.refreshToken);
      localStorage.setItem("user", JSON.stringify(this.user));
    },

    async verifyAuth() {
      if (this.isAuthenticated || localStorage.getItem("accessToken")) {
        this.accessToken = localStorage.getItem("accessToken");
        this.refreshToken = localStorage.getItem("refreshToken");
        this.isAuthenticated = true;
        return true;
      }

      return false;
    },

    async isUserAdmin() {
      return !!(this.user && this.user.role === "admin");
    },

    async isUserCliente() {
      return !!(this.user && this.user.role === "cliente");
    },

    async isUserTeams() {
      return !!(this.user && this.user.role === "teams");
    },

    async refreshAccessToken() {
      try {
        const response = await AuthApi.refresh();
        this.accessToken = response.data.data.accessToken;
        localStorage.setItem("accessToken", this.accessToken);
      } catch (error) {
        console.error("Erro ao renovar o token", error);
        this.logout();
      }
    },

    logout() {
      this.isAuthenticated = false;
      this.user = null;
      this.accessToken = null;
      this.refreshToken = null;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
});
