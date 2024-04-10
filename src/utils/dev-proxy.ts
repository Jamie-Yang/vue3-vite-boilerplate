/**
 * 根据环境变量配置，生成本地请求代理配置
 * vite.config.ts 中使用
 */
export function generateProxy(targetsEnv: string) {
  if (!targetsEnv) return {}

  let targets = []
  try {
    targets = JSON.parse(targetsEnv)
  } catch {
    console.error('VITE_PROXY_TARGETS 不是合法的 JSON 字符串')
  }
  if (!Array.isArray(targets)) return {}

  return targets.reduce((acc, target) => {
    const prefixed = `/${target}`
    const proxyOptions = {
      target,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(new RegExp(`^${prefixed}`), ''),
    }
    return { ...acc, [prefixed]: proxyOptions }
  }, {})
}

/**
 * 按配置转换请求域名，以应用本地代理
 * Axios 请求方法中使用
 */
export function transformProxyUrl(baseURL: string) {
  const proxyTargets = JSON.parse(import.meta.env.VITE_PROXY_TARGETS)

  if (Array.isArray(proxyTargets) && proxyTargets.includes(baseURL)) {
    return `/${baseURL}`
  }

  return baseURL
}
