import axios, { AxiosRequestConfig } from 'axios'

// 服务端接口数据结构
interface Response<T> {
  code: string
  message: string
  data: T
}

const instance = axios.create({
  method: 'post',
  timeout: 15000,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
})

// 基本网络请求
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
        const { code, data } = res

        if (code === '000000') {
          resolve(data)
        } else {
          reject(res)
        }
      })
      .catch(() => {
        reject({ code: '-000001', message: '网络异常请稍后再试！' })
      })
  })
}

/**
 * 工具方法：包装promise返回数据的格式至：[异常数据, 正常结果]
 * 适用于async/await形式的写法，可以避免使用try catch处理异常返回的数据
 * @borrows https://github.com/scopsy/await-to-js
 */
async function to<T>(promise: Promise<T>): Promise<[Response<null>, null] | [null, T]> {
  try {
    const data = await promise
    return [null, data]
  } catch (err) {
    return [err as Response<null>, null]
  }
}

export default request

export { request, to }
