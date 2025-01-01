/**
 * 按配置转换请求域名，以应用本地代理
 * Axios 请求方法中使用
 */

// 缓存目标域名，提高查找效率
const targetSet = new Set(
  (import.meta.env.VITE_PROXY_TARGETS || '')
    .split(',')
    .map((str) => str.trim())
    .filter(Boolean),
)

export default function transformProxyUrl(baseURL: string) {
  return import.meta.env.DEV && baseURL && targetSet.has(baseURL) ? `/${baseURL}` : baseURL
}
