import { showToast } from '@/components/fn'
import RequestClient from '@/utils/request-client'

const request = new RequestClient({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  /* 服务层决定提示策略；取消请求和 silent 请求不会进入此回调。 */
  onError: (message) => showToast(message),
})

export default request
