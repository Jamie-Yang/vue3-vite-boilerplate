import Http from './Http'

const http = new Http()

http.setupInstance((instance) => {
  instance.interceptors.request.use(
    (config) => {
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )
})

export default http
