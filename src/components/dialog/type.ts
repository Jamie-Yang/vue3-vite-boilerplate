export type DialogButton = string | { label: string; emphasize?: boolean }

export interface DialogOptions {
  title?: string
  message: string
  /** 是否渲染经过 DOMPurify 清洗的 HTML，默认关闭。 */
  allowHtml?: boolean
  buttons?: DialogButton[]
  align?: 'row' | 'column'
}
