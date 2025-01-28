import { CustomErrorInterface } from '@/types'

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<Error | null>(null)

  const setError = ({ error, customCode }: { error: string; customCode: number }) => {
    activeError.value = new Error(error)
    activeError.value.customCode = customCode
  }

  return { activeError, setError }
})
