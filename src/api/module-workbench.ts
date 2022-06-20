import http from '@/utils/request-service'

interface IExample {
  query1: string
  query2: number
}

interface RExample {
  data: string
  list: string[]
}

export function fetchExample({ query1, query2 }: IExample): Promise<RExample> {
  return http.request('get', '/path/to', { query1, query2 })
}

export function uploadImage({ query1, query2 }: IExample): Promise<RExample> {
  return http.request('post', '/path/to', { query1, query2 }, { headers: { 'Content-Type': 'multipart/form-data' } })
}
