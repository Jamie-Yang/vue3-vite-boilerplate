import { createVNode, render } from 'vue'
import type { Component } from 'vue'

export default function mountComponent(Component: Component, props: Record<string, unknown>) {
  const container = document.createElement('div')
  const vm = createVNode(Component, props)

  render(vm, container)
  document.body.appendChild(container.firstElementChild as Node)

  function unmount() {
    render(null, container)
  }

  return {
    vm,
    unmount,
  }
}
