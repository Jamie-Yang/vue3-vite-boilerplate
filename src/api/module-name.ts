import { request } from '@/utils/request'

const { VITE_API_BASE_URL } = import.meta.env

interface IExample {
  query1: string
  query2: number
}

interface RExample {
  data: string
  list: string[]
}

export function fetchExample({ query1, query2 }: IExample): Promise<RExample> {
  return request(`${VITE_API_BASE_URL}/path/to`, { query1, query2 })
}

fetchExample({ query1: '', query2: 1 }).then((res) => {
  console.log(res.data, res.list)
})
