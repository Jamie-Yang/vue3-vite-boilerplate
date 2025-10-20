import type * as model from './example.model'

import request from '@/utils/request/request-example'

/** 获取 */
export const fetchExample = (data: model.FetchExampleParams) => request.get<model.FetchExampleRes>('/path/to', data)

/** 上传 */
export const uploadExample = (data: model.UploadExampleParams) => request.postForm('/path/to', data)
