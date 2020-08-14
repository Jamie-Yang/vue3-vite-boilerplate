import axios, { AxiosRequestConfig } from 'axios'

// 服务端接口数据结构
interface Response<T> {
  code: string
  message: string
  data: T | null
}

const instance = axios.create({
  baseURL: '',
  method: 'post',
  timeout: 15000,
  headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
})

/**
 * 基本网络请求
 * @param url 地址
 * @param data 接口入参
 * @param config axios配置
 */
async function request<T>(
  url: string,
  data: Record<string, unknown> = {},
  config: AxiosRequestConfig = {}
): Promise<T> {
  return new Promise((resolve, reject) => {
    instance
      .request<Response<T>>({ url, data, ...config })
      .then((response) => {
        const res = response.data
        const { data, code } = res

        if (code !== '000000') {
          reject(res)
        } else if (data) {
          resolve(data)
        } else {
          reject({ code: '-1000', message: '数据异常请稍后再试！' })
        }
      })
      .catch(() => {
        reject({ code: '-2000', message: '网络异常请稍后再试！' })
      })
  })
}

/**
 * 工具方法：包装promise返回数据的格式至：[异常数据,正常数据]
 * 适用于async/await形式的写法，可以避免使用try catch处理异常返回的数据
 * @borrows https://github.com/scopsy/await-to-js
 */
async function to<T>(promise: Promise<T>): Promise<[Response<null>, null] | [null, T]> {
  try {
    const data = await promise
    return [null, data]
  } catch (err) {
    return [err, null]
  }
}

export { request, to }
