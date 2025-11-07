import RequestClient from '@/utils/request-client'

const request = new RequestClient({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

request.useRequestInterceptor({
  fulfilled: (config) => config,
  rejected: (error) => Promise.reject(error),
})

request.useResponseInterceptor({
  fulfilled: (response) => response,
  rejected: (error) => Promise.reject(error),
})

export default request
