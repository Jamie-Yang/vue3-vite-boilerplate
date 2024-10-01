export type DialogButton = string | { label: string; emphasize?: boolean }

export interface DialogOptions {
  title?: string
  message: string
  buttons?: DialogButton[]
  align?: 'row' | 'column'
}
