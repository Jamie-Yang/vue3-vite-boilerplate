import { createStore } from 'vuex'
import type { ModuleTree } from 'vuex'

const modulesGlob = import.meta.globEager('./modules/*.ts')
const modules = Object.keys(modulesGlob).reduce<ModuleTree<unknown>>(
  (pre, k) => (pre[k] = modulesGlob[k].default),
  {}
)

const store = createStore({
  modules,
  state: {},
  mutations: {},
  actions: {},
})

export default store
