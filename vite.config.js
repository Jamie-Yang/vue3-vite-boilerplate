import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],

  css: {
    postcss: {
      plugins: [require('autoprefixer')],
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
    },
  },
})
