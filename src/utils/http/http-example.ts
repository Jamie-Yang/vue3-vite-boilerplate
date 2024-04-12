import Http from './Http'

const http = new Http()

http.setupInstance((instance) => {
  instance.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error),
  )
})

export default http
