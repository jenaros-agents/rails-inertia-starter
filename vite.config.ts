import { defineConfig } from 'vite'
import viteRuby from 'vite-plugin-ruby'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    viteRuby(),
    react(),
  ],
  resolve: {
    alias: {
      '@': '/app/frontend',
    },
  },
  build: {
    rollupOptions: {
      external: ['vite-plugin-ruby'],
    },
  },
})
