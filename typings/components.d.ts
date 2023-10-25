export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    $messageBox: typeof import('../src/components/MessageBox/function-call.ts').default
    $toast: typeof import('../src/components/Toast/function-call.ts').default
  }
}
