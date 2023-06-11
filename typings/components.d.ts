export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    $messageBox: typeof import('../src/components/message-box').default
    $toast: typeof import('../src/components/toast').default
  }
}
