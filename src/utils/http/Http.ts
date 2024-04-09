import type { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios'

import axios from 'axios'
import { stringify } from 'qs'

import { showToast } from '@/components/fn'

import { transformProxyUrl } from './utils'

export default class Http {
  private instance: AxiosInstance
  private config = {
    baseURL: import.meta.env.VITE_API_BASE_URL,
    successCode: '000000',
    codeKey: 'code',
    dataKey: 'data',
    messageKey: 'message',
  }

  constructor(config: Partial<Http['config']> = {}) {
    this.config = { ...this.config, ...config }
    this.instance = this.createInstance(this.config.baseURL)
  }

  private createInstance(baseURL: string) {
    const instance = axios.create({
      baseURL: transformProxyUrl(baseURL),
      method: 'post',
      timeout: 15000,
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      transformRequest: [
        (data, headers) => {
          if (headers?.['Content-Type'] === 'application/x-www-form-urlencoded') {
            return stringify(data)
          }
          return data
        },
      ],
    })

    instance.interceptors.response.use(
      (response) => {
        const res = response.data
        const { [this.config.codeKey]: code, [this.config.dataKey]: data, [this.config.messageKey]: message } = res
        if (code !== this.config.successCode) {
          showToast(message || '服务异常请稍后再试！')
          return Promise.reject({ code, data, message })
        }
        return data
      },
      (error: AxiosError) => {
        console.log(error)
        showToast('网络异常请稍后再试！')
        return Promise.reject({ code: '-000001', message: '网络异常请稍后再试！', data: {} })
      },
    )

    return instance
  }

  setupInstance(setter: (instance: AxiosInstance) => void) {
    setter?.(this.instance)
  }

  request<R>(url: string, options: AxiosRequestConfig = {}) {
    return this.instance.request<R, R>({ url, ...options })
  }

  get<R>(url: string, params: Record<string, unknown> = {}, options: AxiosRequestConfig = {}) {
    return this.instance.get<R, R>(url, { params, ...options })
  }

  post<R>(url: string, data: Record<string, unknown> = {}, options: AxiosRequestConfig = {}) {
    return this.instance.post<R, R>(url, data, options)
  }

  postForm<R>(url: string, data: Record<string, unknown> = {}, options: AxiosRequestConfig = {}) {
    return this.instance.postForm<R, R>(url, data, options)
  }
}
