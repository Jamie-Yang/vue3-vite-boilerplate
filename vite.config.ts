import { cwd } from 'node:process'
import { fileURLToPath, URL } from 'node:url'

import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig, loadEnv } from 'vite'
import svgLoader from 'vite-svg-loader'

import { generateProxy } from './src/utils/dev-proxy.ts'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, cwd(), '')

  return {
    base: '/',

    plugins: [
      vue(),
      legacy(),
      svgLoader(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        dts: './typings/auto-imports.d.ts',
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
        },
      }),
    ],

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    server: {
      host: true,
      open: true,
      proxy: {
        ...generateProxy(env.VITE_PROXY_TARGETS),
      },
    },
  }
})
