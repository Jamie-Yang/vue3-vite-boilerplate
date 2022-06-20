import RequestCore from './request-core'

const request = new RequestCore()

request.setupInterceptors((interceptors) => {
  interceptors.request.use(
    (config) => {
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
})

export default request
