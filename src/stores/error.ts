import type { CustomErrorInterface, ExtendedPostgrestErrorInterface } from '@/types'
import type { PostgrestError } from '@supabase/supabase-js'

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<CustomErrorInterface | ExtendedPostgrestErrorInterface | null>(null)

  const setError = ({
    error,
    customCode,
  }: {
    error: string | PostgrestError | Error
    customCode: number
  }) => {
    if (typeof error === 'string' || error instanceof Error) {
      activeError.value = typeof error === 'string' ? Error(error) : error
      activeError.value.customCode = customCode || 500

      return
    }

    activeError.value = error
    ;(activeError.value as ExtendedPostgrestErrorInterface).statusCode = customCode
  }

  return { activeError, setError }
})
