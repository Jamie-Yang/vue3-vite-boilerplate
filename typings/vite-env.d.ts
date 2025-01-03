/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ENV: 'dev' | 'test' | 'pre' | 'prod'
  readonly VITE_API_BASE_URL: string
  readonly VITE_PROXY_TARGETS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
