import { defineStore } from 'pinia'

import { store } from '@/stores/index'

type State = {
  userInfo?: {
    username: string
    avatar: string
  }
}

export const useUserStore = defineStore('user', {
  state: (): State => ({
    userInfo: undefined,
  }),

  actions: {
    setUserInfo(userInfo: State['userInfo']) {
      this.userInfo = userInfo
    },
  },
})

export function useUserStoreWithOut() {
  return useUserStore(store)
}
