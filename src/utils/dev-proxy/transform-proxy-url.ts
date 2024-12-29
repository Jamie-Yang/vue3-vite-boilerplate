/**
 * 按配置转换请求域名，以应用本地代理
 * Axios 请求方法中使用
 */

const targetsEnv = import.meta.env.VITE_PROXY_TARGETS || ''

const targets = targetsEnv
  .split(',')
  .map((str) => str.trim())
  .filter(Boolean)

const targetMap = targets.reduce(
  (acc, target) => {
    acc[target] = true
    return acc
  },
  {} as Record<string, true>,
)

export default function transformProxyUrl(baseURL: string) {
  return targetMap[baseURL] ? `/${baseURL}` : baseURL
}
