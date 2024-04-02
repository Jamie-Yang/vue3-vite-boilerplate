import { getCurrentInstance } from 'vue'

/**
 * expose public api
 * @borrows https://github.com/youzan/vant/blob/main/packages/vant/src/composables/use-expose.ts
 */
export function useExpose<T = Record<string, any>>(apis: T) {
  const instance = getCurrentInstance()
  if (instance) {
    Object.assign(instance.proxy as object, apis)
  }
}
