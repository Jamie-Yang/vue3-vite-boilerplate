import type * as model from './example.model'

import http from '@/utils/http/http-example'

/** 获取 */
export const fetchExample = (data: model.FetchExampleParams) => http.get<model.FetchExampleRes>('/path/to', data)

/** 上传 */
export const uploadExample = (data: model.UploadExampleParams) => http.postForm('/path/to', data)
