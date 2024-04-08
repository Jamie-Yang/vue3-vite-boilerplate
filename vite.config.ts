import { fileURLToPath, URL } from 'node:url'

import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  base: '/',

  plugins: [vue(), legacy(), svgLoader()],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  server: {
    host: true,
    open: true,
    proxy: {
      // https://cn.vitejs.dev/config/server-options.html#server-proxy
      '/api': {
        target: 'https://api.target.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
