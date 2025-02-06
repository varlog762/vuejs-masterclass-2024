import type { LoginFormInputInterface } from '@/types'
import type { AuthError } from '@supabase/supabase-js'

export const useFormErrors = () => {
  const serverError = ref<string>('')
  const realtimeErrors = ref()

  /**
   * Handles server errors by setting the serverError state variable to the error
   * message, unless the error is 'Invalid login credentials', in which case it
   * is set to 'Invalid email or password'.
   *
   * @param {AuthError} error The error object from Supabase.
   */
  const handleServerError = (error: AuthError) => {
    serverError.value =
      error.message === 'Invalid login credentials' ? 'Invalid email or password' : error.message
  }

  const handleLoginForm = (formData: LoginFormInputInterface) => {
    realtimeErrors.value = {
      email: [],
      password: [],
    }
  }

  return { serverError, handleServerError, realtimeErrors, handleLoginForm }
}
