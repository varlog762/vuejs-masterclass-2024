import type { CustomErrorInterface, ExtendedPostgrestErrorInterface } from '@/types'
import type { PostgrestError } from '@supabase/supabase-js'

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<CustomErrorInterface | ExtendedPostgrestErrorInterface | null>(null)
  const isCustomError = ref<boolean>(false)

  const setError = ({
    error,
    customCode,
  }: {
    error: string | PostgrestError | Error
    customCode: number
  }) => {
    if (typeof error === 'string') isCustomError.value = true

    if (typeof error === 'string' || error instanceof Error) {
      activeError.value = typeof error === 'string' ? Error(error) : error
      activeError.value.customCode = customCode || 500

      return
    }

    activeError.value = error
    ;(activeError.value as ExtendedPostgrestErrorInterface).statusCode = customCode
  }

  const clearError = () => {
    activeError.value = null
    isCustomError.value = false
  }

  return { activeError, isCustomError, setError, clearError }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useErrorStore, import.meta.hot))
}
