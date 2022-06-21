import http from '@/utils/http-main'

export function fetchExample(data: { a: string; b: number }) {
  return http.get('/path/to', data)
}

export function uploadExample(data: { a: File }) {
  return http.post('/path/to', data, { headers: { 'Content-Type': 'multipart/form-data' } })
}
