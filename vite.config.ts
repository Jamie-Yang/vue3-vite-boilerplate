import type { ProxyOptions } from 'vite'

import { cwd } from 'node:process'
import { fileURLToPath, URL } from 'node:url'

import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'
import svgLoader from 'vite-svg-loader'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, cwd(), '')

  return {
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
        ...generateProxy(env.VITE_PROXY_TARGETS),
      },
    },
  }
})

/**
 * 根据环境变量配置，生成本地请求代理配置
 * 通过与 transformProxyUrl（src/utils/http/utils.ts）配合
 */
function generateProxy(envTargets: string) {
  const targets = (JSON.parse(envTargets) || []) as string[]
  return targets.reduce(
    (acc, target) => {
      const prefixed = `/${target}`
      acc[prefixed] = {
        target,
        changeOrigin: true,
        rewrite: (path) => path.replace(new RegExp(`^${prefixed}`), ''),
      }
      return acc
    },
    {} as Record<string, ProxyOptions>,
  )
}
