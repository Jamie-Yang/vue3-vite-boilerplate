import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import path from 'path'

export default defineConfig({
  plugins: [vue(), legacy()],

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
