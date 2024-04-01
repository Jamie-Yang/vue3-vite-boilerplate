export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    // 扩展全局属性
    // $translate: (key: string) => string
  }
}
