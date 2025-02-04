import { supabase } from '@/lib/supabase-client'
import type { LoginFormInputInterface, RegisterFormInputInterface } from '@/types'

const authStore = useAuthStore()

/**
 * Registers a user with Supabase, using the provided credentials.
 *
 * @param {RegisterFormInputInterface} formData - The credentials, including email, password, username, first name, and last name.
 *
 * @returns {Promise<boolean>} - `true` if the user was successfully registered.
 */
export const register = async (formData: RegisterFormInputInterface) => {
  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  })

  if (error) {
    console.log(error)
    return
  }

  if (data.user) {
    const { error } = await supabase.from('profiles').insert({
      id: data.user.id,
      username: formData.username,
      full_name: formData.firstName.concat(' ', formData.lastName),
    })

    if (error) {
      console.log(error)
      return
    }
  }

  await authStore.setAuth(data.session)

  return true
}

/**
 * Logs the user into Supabase using the provided login credentials.
 *
 * @param {LoginFormInputInterface} formData - The login credentials, including email and password.
 *
 * @returns {Promise<boolean>} - `true` if the user was successfully logged in.
 */
export const login = async (formData: LoginFormInputInterface) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  })

  if (error) {
    console.log(error)
    return
  }

  await authStore.setAuth(data.session)

  return true
}

/**
 * Logs the user out of Supabase and resets the auth store.
 *
 * @returns {Promise<boolean>} - `true` if the user was successfully logged out.
 */
export const logout = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.log(error)
    return
  }

  await authStore.setAuth()

  return true
}
