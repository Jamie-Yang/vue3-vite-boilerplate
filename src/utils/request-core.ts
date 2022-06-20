import type { AxiosRequestConfig, AxiosInstance, AxiosInterceptorManager, AxiosResponse, Method } from 'axios'

import axios from 'axios'
import qs from 'qs'

interface HttpConfig {
  baseURL?: string
  successCode?: string | number
}

// 服务端接口数据结构
interface Response<T> {
  code: string
  message: string
  data: T
}

export default class RequestBase {
  baseURL: string
  successCode: string | number
  instance: AxiosInstance

  constructor(config: HttpConfig = {}) {
    this.baseURL = config.baseURL || import.meta.env.VITE_API_BASE_URL
    this.successCode = config.successCode || '000000'
    this.instance = this.createInstance()
  }

  private createInstance() {
    const instance = axios.create({
      baseURL: this.baseURL,
      method: 'post',
      timeout: 15000,
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      transformRequest: [
        (data, headers) =>
          headers?.['Content-Type'] === 'application/x-www-form-urlencoded' ? qs.stringify(data) : data,
      ],
    })
    return instance
  }

  setupInterceptors(
    setter: (interceptors: {
      request: AxiosInterceptorManager<AxiosRequestConfig>
      response: AxiosInterceptorManager<AxiosResponse>
    }) => void
  ) {
    setter(this.instance.interceptors)
  }

  request<T>(
    method: Lowercase<Method>,
    url: string,
    data: Record<string, unknown> = {},
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<Response<T>>({
          url,
          [method === 'get' ? 'params' : 'data']: data,
          ...config,
        })
        .then((response) => {
          const res = response.data
          const { code, data } = res
          return code === this.successCode ? resolve(data) : reject(res)
        })
        .catch((error) => {
          console.log(error)
          reject({ code: '-000001', message: '网络异常请稍后再试！' })
        })
    })
  }
}
