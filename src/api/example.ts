import type * as model from './example.model'

import request from './services/example-service'

/** 获取 */
export const fetchExample = (params: model.FetchExampleParams) => request.get<model.FetchExampleRes>('/path/to', params)

/** 上传 */
export const uploadExample = (data: model.UploadExampleParams) => request.postForm('/path/to', data)
