import { createApp, App, inject } from 'vue'
import Loading from './loading.vue'

const LoadingSymbol = Symbol()

export function useLoading(): typeof Loading {
  const loading = inject<typeof Loading>(LoadingSymbol)
  if (!loading) {
    throw new Error('error')
  }
  return loading
}

export default {
  install: (app: App): void => {
    const el = document.createElement('div')
    document.body.appendChild(el)

    app.provide(LoadingSymbol, createApp(Loading).mount(el))
  },
}
