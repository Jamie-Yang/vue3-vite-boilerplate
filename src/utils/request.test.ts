import { request, to } from './request'

async function getExample() {
  interface ResponseData {
    name: string
    age: number
  }
  const [error, res] = await to(request<ResponseData>('example.url.com'))

  if (error) {
    console.log(error.data)
    return
  }

  if (res) {
    console.log(res.name, res.age)
  }
}

getExample()
