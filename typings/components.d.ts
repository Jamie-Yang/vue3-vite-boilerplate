export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    $messageBox: typeof import('../src/components/MessageBox').default
    $toast: typeof import('../src/components/Toast2').default
  }
}
