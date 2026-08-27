import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    appName: 'Vue3 Mobile',
    visitCount: 0,
  }),
  actions: {
    increaseVisitCount() {
      this.visitCount += 1
    },
  },
})
