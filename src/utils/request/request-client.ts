import type { AxiosInstance, AxiosRequestConfig, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios'

import axios from 'axios'
import { stringify } from 'qs'

import { showToast } from '@/components/fn'

import transformProxyUrl from '../dev-proxy/transform-proxy-url'

export interface RequestClientConfig {
  /** 基础 URL */
  baseURL: string
  /** 标识成功的状态码 */
  successCode: number | string
  /** 接口响应数据 code 字段名 */
  codeKey: string
  /** 接口响应数据 data 字段名 */
  dataKey: string
  /** 接口响应数据 message 字段名 */
  messageKey: string
}

interface RequestInterceptorConfig {
  fulfilled?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>
  rejected?: (error: any) => any // eslint-disable-line @typescript-eslint/no-explicit-any
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ResponseInterceptorConfig<T = any> {
  fulfilled?: (response: AxiosResponse<T>) => Promise<AxiosResponse<T>> | AxiosResponse<T>
  rejected?: (error: any) => any // eslint-disable-line @typescript-eslint/no-explicit-any
}

export default class RequestClient {
  private instance: AxiosInstance

  private config: RequestClientConfig = {
    baseURL: import.meta.env.VITE_API_BASE_URL,
    successCode: 0,
    codeKey: 'code',
    dataKey: 'data',
    messageKey: 'message',
  }

  constructor(config: Partial<RequestClientConfig> = {}) {
    this.config = { ...this.config, ...config }
    this.instance = this.createInstance(this.config.baseURL)
    this.useDefaultResponseInterceptors()
  }

  /** 创建实例 */
  private createInstance(baseURL: string) {
    return axios.create({
      baseURL: transformProxyUrl(baseURL),
      method: 'post',
      timeout: 15000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      transformRequest: [
        (data, headers) => {
          if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
            return stringify(data)
          }
          return data
        },
      ],
    })
  }

  /** 应用默认的响应拦截器 */
  private useDefaultResponseInterceptors() {
    /** 基础响应拦截器：统一响应结构为、拦截接口错误 */
    const onFulfilled = (response: AxiosResponse) => {
      const { codeKey, dataKey, messageKey } = this.config
      const { [codeKey]: code, [dataKey]: data, [messageKey]: message } = response.data

      if (code !== this.config.successCode) {
        showToast(message || '服务异常请稍后再试！')
        return Promise.reject({ code, data, message })
      }

      return data
    }

    /** 基础响应拦截器：统一响应结构 */
    const onRejected = (error: AxiosError) => {
      console.log(error)
      showToast('网络异常请稍后再试！')

      return Promise.reject({
        code: error.code || -1,
        message: error.message || '网络异常请稍后再试！',
      })
    }

    this.useResponseInterceptor({ fulfilled: onFulfilled, rejected: onRejected })
  }

  /** 应用请求拦截器 */
  useRequestInterceptor({ fulfilled, rejected }: RequestInterceptorConfig) {
    this.instance.interceptors.request.use(fulfilled, rejected)
  }

  /** 应用响应拦截器 */
  useResponseInterceptor({ fulfilled, rejected }: ResponseInterceptorConfig) {
    this.instance.interceptors.response.use(fulfilled, rejected)
  }

  /** 发送请求 */
  request<R>(url: string, options: AxiosRequestConfig = {}) {
    return this.instance.request<R, R>({ url, ...options })
  }

  /** 发送 GET 请求 */
  get<R>(url: string, params: Record<string, unknown> = {}, options: AxiosRequestConfig = {}) {
    return this.instance.get<R, R>(url, { params, ...options })
  }

  /** 发送 POST 请求 */
  post<R>(url: string, data: Record<string, unknown> = {}, options: AxiosRequestConfig = {}) {
    return this.instance.post<R, R>(url, data, options)
  }

  /** 发送 FORMDATA 请求 */
  postForm<R>(url: string, data: Record<string, unknown> = {}, options: AxiosRequestConfig = {}) {
    return this.instance.postForm<R, R>(url, data, options)
  }
}
