import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', () => {
  const showHeaderFooter = ref(true)

  const setShowHeaderFooter = (show: boolean) => {
    showHeaderFooter.value = show
  }

  return { 
    showHeaderFooter,
    setShowHeaderFooter
  }
})