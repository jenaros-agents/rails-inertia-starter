import { defineConfig } from 'vite'
import ruby from '@vitejs/plugin-ruby'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    ruby(),
    react(),
  ],
  resolve: {
    alias: {
      '@': '/app/frontend',
    },
  },
})
