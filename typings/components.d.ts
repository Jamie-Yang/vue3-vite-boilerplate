export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    // 扩展全局属性
    $example: string
  }
}
