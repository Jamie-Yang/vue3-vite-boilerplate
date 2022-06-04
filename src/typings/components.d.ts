export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    $messageBox: typeof import('../components/message-box').default
    $toast: typeof import('../components/toast').default
    $loading: typeof import('../components/loading').default
  }
}
