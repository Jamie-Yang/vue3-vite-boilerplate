/**
 * 按配置转换请求域名，以应用本地代理
 */
export function transformProxyUrl(baseURL: string) {
  const proxyTargets = JSON.parse(import.meta.env.VITE_PROXY_TARGETS)

  if (Array.isArray(proxyTargets) && proxyTargets.includes(baseURL)) {
    return `/${baseURL}`
  }

  return baseURL
}
