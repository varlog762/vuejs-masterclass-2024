import { supabase } from '@/lib/supabase-client'
import type { LoginFormInputInterface, RegisterFormInputInterface } from '@/types'

const authStore = useAuthStore()

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
