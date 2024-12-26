import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
  }),

  actions: {
    async login(data) {
      console.log(data)
      this.accessToken = data.accessToken.token
      this.refreshToken = data.refreshToken.token
      this.isAuthenticated = true

      localStorage.setItem('accessToken', this.accessToken)
      localStorage.setItem('refreshToken', this.refreshToken)
      console.log(localStorage.getItem('accessToken'))
      console.log(localStorage.getItem('refreshToken'))
      console.log(this.accessToken)
      console.log(this.refreshToken)
    },

    async verifyAuth() {
      if (this.isAuthenticated || localStorage.getItem('accessToken')) {
        this.accessToken = localStorage.getItem('accessToken')
        this.refreshToken = localStorage.getItem('refreshToken')
        this.isAuthenticated = true
        return true
      }

      return false
    },

    async refreshAccessToken() {
      try {
        const response = await axios.post('/api/refresh', {}, {
          headers: { Authorization: `Bearer ${this.refreshToken}` }
        })
        this.accessToken = response.data.data.accessToken
        localStorage.setItem('accessToken', this.accessToken)
      } catch (error) {
        console.error('Erro ao renovar o token', error)
        this.logout()
      }
    },

    // Logout
    logout() {
      this.isAuthenticated = false
      this.user = null
      this.accessToken = null
      this.refreshToken = null

      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    }
  }
})
