import { request } from '@/utils/request'

interface IExample {
  query1: string
  query2: number
}

interface RExample {
  data: string
  list: string[]
}

export function fetchExample({ query1, query2 }: IExample): Promise<RExample> {
  return request('/path/to', { query1, query2 })
}

export function fetchExample2({ query1, query2 }: IExample): Promise<RExample> {
  return request('/path/to', { query1, query2 }, { headers: { 'Content-Type': 'multipart/form-data' } })
}
