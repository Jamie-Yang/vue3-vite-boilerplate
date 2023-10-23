import type { Component } from 'vue'
import { createVNode, render } from 'vue'

export default function mountComponent(Component: Component, props: Record<string, unknown>) {
  const container = document.createElement('div')
  const vNode = createVNode(Component, props)

  render(vNode, container)
  document.body.appendChild(container.firstElementChild as Element)

  function unmount() {
    render(null, container)
  }

  return {
    vNode,
    unmount,
  }
}
