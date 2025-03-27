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
    getUser: (state) => state.user || JSON.parse(localStorage.getItem("user") || "null"),
    getAccessToken: (state) =>
      state.accessToken || localStorage.getItem("accessToken"),
    getRefreshToken: (state) =>
      state.refreshToken || localStorage.getItem("refreshToken"),
    getIsAuthenticated: (state) =>
      state.isAuthenticated || !!localStorage.getItem("accessToken"),
  },

  actions: {
    async login(data) {
      this.accessToken = data.accessToken.token;
      this.refreshToken = data.refreshToken.token;
      this.user = data.user;
      this.isAuthenticated = true;
      localStorage.setItem("accessToken", this.accessToken);
      localStorage.setItem("refreshToken", this.refreshToken);
      localStorage.setItem("user", JSON.stringify(this.user));
    },

    verifyAuth() {
      const storedToken = localStorage.getItem("accessToken");

      if (this.isAuthenticated || storedToken) {
        this.accessToken = storedToken;
        this.refreshToken = localStorage.getItem("refreshToken");
        this.isAuthenticated = true;
        return true;
      }

      return false;
    },

    isUserAdmin() {
      const user = this.getUser;
      return !!(user && user.role === "admin");
    },

    isUserCliente() {
      const user = this.getUser;
      return !!(user && user.role === "cliente");
    },

    isUserTeams() {
      const user = this.getUser;
      return !!(user && user.role === "teams");
    },

    async refreshAccessToken() {
      try {
        const response = await AuthApi.refresh();
        this.accessToken = response.data.data.accessToken;
        localStorage.setItem("accessToken", this.accessToken);
        return response;
      } catch (error) {
        this.logout();
        throw error;
      }
    },

    logout() {
      this.isAuthenticated = false;
      this.user = null;
      this.accessToken = null;
      this.refreshToken = null;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    },
  },
});
