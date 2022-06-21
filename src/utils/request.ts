import axios, { AxiosRequestConfig } from 'axios'
import Toast from '@/components/toast'

// 服务端接口数据结构
interface Response {
  code: string
  message: string
  data: unknown
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  method: 'post',
  timeout: 15000,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
})

instance.interceptors.request.use(
  (config) => {
    if (config.method === 'get' && config.data) {
      config.params = config.data
      delete config.data
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 基本网络请求
async function request(
  url: string,
  data: Record<string, unknown> = {},
  config: AxiosRequestConfig = {}
): Promise<unknown> {
  return new Promise((resolve, reject) => {
    instance
      .request<Response>({ url, data, ...config })
      .then((response) => {
        const res = response.data
        const { code, data } = res

        if (code === '000000') {
          resolve(data)
        } else {
          reject(res)
        }
      })
      .catch((error) => {
        console.log(error)
        Toast('网络异常请稍后再试！')
        reject({ code: '-000001', message: '网络异常请稍后再试！' })
      })
  })
}

/**
 * 工具方法：包装promise返回数据的格式至：[异常数据, 正常结果]
 * 适用于async/await形式的写法，可以避免使用try catch处理异常返回的数据
 * @borrows https://github.com/scopsy/await-to-js
 */
async function to<T>(promise: Promise<T>): Promise<[Response, null] | [null, T]> {
  try {
    const data = await promise
    return [null, data]
  } catch (err) {
    return [err as Response, null]
  }
}

export default request

export { request, to }
