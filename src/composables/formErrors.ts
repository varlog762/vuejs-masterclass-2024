import type { AuthError } from '@supabase/supabase-js'

export const useFormErrors = () => {
  const serverError = ref<string>('')

  const handleServerError = (error: AuthError) => {
    serverError.value =
      error.message === 'Invalid login credentials' ? 'Invalid email or password' : error.message
  }

  return { serverError, handleServerError }
}
