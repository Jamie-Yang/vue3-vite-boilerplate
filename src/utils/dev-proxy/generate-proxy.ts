import type { ProxyOptions } from 'vite'

/**
 * 根据环境变量配置，生成本地请求代理配置
 * vite.config.ts 中使用
 */
export default function generateProxy(targetsEnv: string) {
  const targets = targetsEnv
    .split(',')
    .map((str) => str.trim())
    .filter(Boolean)

  return targets.reduce(
    (acc, target) => {
      const prefixed = `/${target}`
      const proxyOptions = {
        target,
        changeOrigin: true,
        rewrite: (path: string) => path.replace(new RegExp(`^${prefixed}`), ''),
      }
      acc[prefixed] = proxyOptions
      return acc
    },
    {} as Record<string, ProxyOptions>,
  )
}
