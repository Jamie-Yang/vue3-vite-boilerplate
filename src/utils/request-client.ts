import type { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

import axios from 'axios'
import { stringify } from 'qs'

import { showToast } from '@/components/fn'

import transformProxyUrl from './dev-proxy/transform-proxy-url'

/** 标准 API 响应结构 */
export interface ApiResponse<T = unknown> {
  /** 状态码 */
  code: number | string
  /** 响应数据 */
  data: T
  /** 响应消息 */
  message: string
}

/** 请求客户端配置 */
interface RequestClientConfig {
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

/** 请求拦截器配置 */
interface RequestInterceptorConfig {
  fulfilled?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>
  rejected?: (error: any) => any // eslint-disable-line @typescript-eslint/no-explicit-any
}

/** 响应拦截器配置 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ResponseInterceptorConfig<T = any> {
  fulfilled?: (response: AxiosResponse<T>) => Promise<AxiosResponse<T>> | AxiosResponse<T>
  rejected?: (error: any) => any // eslint-disable-line @typescript-eslint/no-explicit-any
}

/** 请求客户端 */
export default class RequestClient {
  private instance: AxiosInstance

  private config: RequestClientConfig = {
    baseURL: import.meta.env.VITE_API_BASE_URL || '',
    successCode: 0,
    codeKey: 'code',
    dataKey: 'data',
    messageKey: 'message',
  }

  constructor(config: Partial<RequestClientConfig> = {}) {
    this.config = { ...this.config, ...config }
    this.instance = this.createInstance()
    this.useDefaultResponseInterceptors()
  }

  /** 创建请求实例 */
  private createInstance(): AxiosInstance {
    return axios.create({
      baseURL: transformProxyUrl(this.config.baseURL),
      method: 'POST',
      timeout: 15000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      transformRequest: [
        (data, headers) => {
          if (headers?.['Content-Type'] === 'application/x-www-form-urlencoded') {
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
      const { codeKey, dataKey, messageKey, successCode } = this.config
      const { [codeKey]: code, [dataKey]: data, [messageKey]: message = '服务异常请稍后再试！' } = response.data

      if (code !== successCode) {
        showToast(message)
        return Promise.reject({ code, message, data })
      }

      return data
    }

    /** 基础响应拦截器：统一响应结构 */
    const onRejected = (error: AxiosError) => {
      console.error('[request-client] 请求失败:', error)
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
  useResponseInterceptor<T = unknown>({ fulfilled, rejected }: ResponseInterceptorConfig<T>) {
    this.instance.interceptors.response.use(fulfilled, rejected)
  }

  /** 发送通用请求 */
  request<T = unknown>(url: string, options: AxiosRequestConfig = {}) {
    return this.instance.request<ApiResponse<T>, T>({ url, ...options })
  }

  /** 发送 GET 请求 */
  get<T = unknown>(url: string, params: Record<string, unknown> = {}, options: AxiosRequestConfig = {}) {
    return this.instance.get<ApiResponse<T>, T>(url, { params, ...options })
  }

  /** 发送 POST 请求 */
  post<T = unknown>(url: string, data: Record<string, unknown> = {}, options: AxiosRequestConfig = {}) {
    return this.instance.post<ApiResponse<T>, T>(url, data, options)
  }

  /** 发送 FormData 请求 */
  postForm<T = unknown>(url: string, data: Record<string, unknown> = {}, options: AxiosRequestConfig = {}) {
    return this.instance.postForm<ApiResponse<T>, T>(url, data, options)
  }
}
