import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'

import transformProxyUrl from './dev-proxy/transform-proxy-url'

/** 标准 API 响应结构 */
export interface ApiResponse<T = unknown> {
  code: number | string
  data: T
  message: string
}

/** silent 仅关闭统一错误通知，请求仍会正常抛出错误。 */
export interface RequestOptions extends AxiosRequestConfig {
  silent?: boolean
}

/** 业务错误保留业务码、数据和完整 HTTP 响应。 */
export class ApiError extends Error {
  constructor(
    message: string,
    readonly code: number | string | undefined,
    readonly data: unknown,
    readonly response: AxiosResponse<unknown>,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

/** 请求客户端配置；提示方式由服务层注入。 */
interface RequestClientConfig {
  baseURL: string
  successCode: number | string
  codeKey: string
  dataKey: string
  messageKey: string
  /** 接收默认提示文案和原始错误，实例只需实现提示方式。 */
  onError?: (message: string, error: unknown) => void
}

/** 请求拦截器保持 Axios 请求配置契约。 */
interface RequestInterceptorConfig {
  fulfilled?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>
  rejected?: (error: unknown) => never | Promise<never>
}

/** 响应拦截器始终处理原始响应，业务解包在拦截器之后执行。 */
interface ResponseInterceptorConfig {
  fulfilled?: (response: AxiosResponse<unknown>) => AxiosResponse<unknown> | Promise<AxiosResponse<unknown>>
  rejected?: (error: unknown) => never | Promise<never>
}

/** 轻量请求客户端：默认解包业务数据，也提供原始响应入口。 */
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
  }

  /** 创建请求实例，使用 Axios 默认的数据转换。 */
  private createInstance(): AxiosInstance {
    return axios.create({
      baseURL: transformProxyUrl(this.config.baseURL),
      method: 'POST',
      timeout: 15000,
      headers: { Accept: 'application/json' },
    })
  }

  /** 生成通用提示文案，不改变原始错误。 */
  private getErrorMessage(error: unknown): string {
    if (error instanceof ApiError) return error.message
    if (axios.isAxiosError(error)) {
      if (error.response) return `请求失败（${error.response.status}），请稍后重试`
      if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') return '请求超时，请稍后重试'
      if (error.code === 'ERR_NETWORK') return '网络异常，请稍后重试'
    }
    return '请求失败，请稍后重试'
  }

  /** 取消请求不通知；其他错误按需通知，并原样抛出以保留上下文。 */
  private handleError(error: unknown, silent = false): never {
    if (!silent && !axios.isCancel(error)) {
      try {
        this.config.onError?.(this.getErrorMessage(error), error)
      } catch (notificationError) {
        console.error('[request-client] 错误通知失败:', notificationError)
      }
    }
    throw error
  }

  /** 注册请求拦截器，返回 Axios 拦截器 ID。 */
  useRequestInterceptor({ fulfilled, rejected }: RequestInterceptorConfig) {
    return this.instance.interceptors.request.use(fulfilled, rejected)
  }

  /** 注册原始 HTTP 响应拦截器，不在此阶段解包业务数据。 */
  useResponseInterceptor({ fulfilled, rejected }: ResponseInterceptorConfig) {
    return this.instance.interceptors.response.use(fulfilled, rejected)
  }

  /** 获取完整 HTTP 响应，适用于下载、空响应和非标准接口。T 表示响应体类型。 */
  async requestRaw<T = unknown>(url: string, options: RequestOptions = {}): Promise<AxiosResponse<T>> {
    const { silent, ...config } = options
    try {
      return await this.instance.request<T>({ url, ...config })
    } catch (error) {
      return this.handleError(error, silent)
    }
  }

  /** 发送标准业务请求，返回解包后的 data；HTTP 错误保留原始 AxiosError。 */
  async request<T = unknown>(url: string, options: RequestOptions = {}): Promise<T> {
    const response = await this.requestRaw<unknown>(url, options)
    const { codeKey, dataKey, messageKey, successCode } = this.config
    const body = response.data
    const payload = body !== null && typeof body === 'object' ? (body as Record<string, unknown>) : undefined
    const code = payload?.[codeKey]
    const data = payload?.[dataKey]

    if (code !== successCode) {
      const message = payload?.[messageKey]
      return this.handleError(
        new ApiError(
          typeof message === 'string' && message ? message : '服务异常请稍后再试！',
          typeof code === 'string' || typeof code === 'number' ? code : undefined,
          data,
          response,
        ),
        options.silent,
      )
    }

    return data as T
  }

  /** 发送 GET 请求，返回业务数据。 */
  get<T = unknown>(url: string, params: Record<string, unknown> = {}, options: RequestOptions = {}) {
    return this.request<T>(url, { method: 'GET', params, ...options })
  }

  /** 发送 POST 请求，支持对象、数组及原生 FormData 等请求体。 */
  post<T = unknown>(url: string, data: unknown = {}, options: RequestOptions = {}) {
    return this.request<T>(url, { method: 'POST', data, ...options })
  }

  /** 发送 multipart 表单，由 Axios 转换对象并处理上传边界。 */
  postForm<T = unknown>(url: string, data: Record<string, unknown> | FormData = {}, options: RequestOptions = {}) {
    const { headers } = axios.mergeConfig(options, { headers: { 'Content-Type': 'multipart/form-data' } })
    return this.post<T>(url, data, { ...options, headers })
  }
}
