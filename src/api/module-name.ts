import { request } from '@/utils/request'

export function fetchExample(data: { query1: string; query2: number }) {
  return request('/path/to', data)
}
