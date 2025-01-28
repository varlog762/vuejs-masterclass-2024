import type { CustomErrorInterface } from '@/types'

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<CustomErrorInterface | null>(null)

  const setError = ({ error, customCode }: { error: string; customCode: number }) => {
    activeError.value = new Error(error)
    activeError.value.customCode = customCode
  }

  return { activeError, setError }
})
