import type { Component } from 'vue'

import { createApp, reactive } from 'vue'

import { useExpose } from '@/composables/use-expose'

export function usePopupState() {
  const state = reactive<{
    show: boolean
    [key: string]: unknown
  }>({
    show: false,
  })

  const toggle = (show: boolean) => {
    state.show = show
  }

  const open = (props: Record<string, unknown>) => {
    Object.assign(state, props, { transitionAppear: true })
    toggle(true)
  }

  const close = () => toggle(false)

  useExpose({ open, close, toggle })

  return { state, open, close, toggle }
}

export function mountComponent(RootComponent: Component) {
  const app = createApp(RootComponent)
  const root = document.createElement('div')

  document.body.appendChild(root)

  return {
    instance: app.mount(root),
    unmount() {
      app.unmount()
      document.body.removeChild(root)
    },
  }
}
