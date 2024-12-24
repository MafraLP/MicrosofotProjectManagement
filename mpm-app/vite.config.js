import { defineConfig } from 'vite'

export default defineConfig({
    server: {
        host: '0.0.0.0',  // Permite conexões de qualquer IP, necessário para Docker
        port: 9000,        // A porta do seu frontend
    },
})
