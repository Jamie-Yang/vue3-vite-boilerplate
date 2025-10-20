import type { Router } from 'vue-router'

import setupTitleGuard from './title-guard'

export function setupRouterGuard(router: Router) {
  setupTitleGuard(router)
}
