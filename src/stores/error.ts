import type { CustomErrorInterface, ExtendedPostgrestErrorInterface } from '@/types'
import type { PostgrestError } from '@supabase/supabase-js'

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<CustomErrorInterface | ExtendedPostgrestErrorInterface | null>(null)

  const setError = ({
    error,
    customCode,
  }: {
    error: string | PostgrestError
    customCode: number
  }) => {
    if (typeof error === 'string') {
      activeError.value = new Error(error)
      activeError.value.customCode = customCode

      return
    }

    activeError.value = error
    ;(activeError.value as ExtendedPostgrestErrorInterface).statusCode = customCode
  }

  return { activeError, setError }
})
