import { cwd } from 'node:process'
import { fileURLToPath, URL } from 'node:url'

import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import autoImport from 'unplugin-auto-import/vite'
import { defineConfig, loadEnv } from 'vite'
import svgLoader from 'vite-svg-loader'

import generateProxy from './src/utils/dev-proxy/generate-proxy'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, cwd(), '')

  return {
    base: '/',

    plugins: [
      vue(),
      vueJsx(),
      legacy(),
      svgLoader(),
      autoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        dts: './typings/auto-imports.d.ts',
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
