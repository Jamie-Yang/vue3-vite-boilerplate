import RequestClient from './request-client'

const request = new RequestClient()

request.useRequestInterceptor({
  fulfilled: (config) => config,
  rejected: (error) => Promise.reject(error),
})

request.useResponseInterceptor({
  fulfilled: (response) => response,
  rejected: (error) => Promise.reject(error),
})

export default request
