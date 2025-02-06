import type { LoginFormInputInterface, FormErrorsType } from '@/types'
import type { AuthError } from '@supabase/supabase-js'

/**
 * Returns an object with the following properties:
 *
 * - `serverError`: a ref to a string that stores the server error message.
 * - `handleServerError`: a function that takes an `AuthError` object and sets the
 *   `serverError` ref to the error message.
 * - `realtimeErrors`: a ref to an object with the following properties:
 *   - `email`: an array of strings that stores the real-time validation errors for the email field.
 *   - `password`: an array of strings that stores the real-time validation errors for the password field.
 * - `handleLoginForm`: a function that takes a `LoginFormInputInterface` object and sets the
 *   `realtimeErrors` ref to the real-time validation errors for the form fields.
 */
export const useFormErrors = () => {
  const serverError = ref<string>('')
  const realtimeErrors = ref<FormErrorsType<LoginFormInputInterface>>()

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

  /**
   * Validates the login form fields and sets the corresponding errors in the
   * realtimeErrors state variable. If either the email or password fields have
   * errors, the corresponding array will be populated with the error messages.
   *
   * @param {LoginFormInputInterface} formData The login form data.
   */
  const handleLoginForm = async (formData: LoginFormInputInterface) => {
    realtimeErrors.value = {
      email: [],
      password: [],
    }

    const { validateEmail, validatePassword } = await import('@/utils/formValidations')

    const emailErrors = validateEmail(formData.email)
    if (emailErrors.length) realtimeErrors.value.email = emailErrors

    const passwordErrors = validatePassword(formData.password)
    if (passwordErrors.length) realtimeErrors.value.password = passwordErrors
  }

  return { serverError, handleServerError, realtimeErrors, handleLoginForm }
}
