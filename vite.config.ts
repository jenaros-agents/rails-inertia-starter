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
  server: {
    allowedHosts: true,
    cors: true,
    origin: 'http://localhost:3000',
    strictPort: false,
    watch: {
      usePolling: false,
    },
  },
  build: {
    rollupOptions: {
      external: ['vite-plugin-ruby'],
    },
  },
})
