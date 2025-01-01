import type { ProxyOptions } from 'vite'

/**
 * 根据环境变量配置，生成本地请求代理配置
 * vite.config.ts 中使用
 */
export default function generateProxy(targetsEnv: string) {
  if (!targetsEnv) return {}

  const proxy: Record<string, ProxyOptions> = {}

  for (const str of targetsEnv.split(',')) {
    const target = str.trim()
    if (!target) continue

    const prefixed = `/${target}`
    proxy[prefixed] = {
      target,
      changeOrigin: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefixed}`), ''),
    }
  }

  return proxy
}
