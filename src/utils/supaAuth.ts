import { supabase } from '@/lib/supabase-client'
import type { RegisterFormInputInterface } from '@/types'

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

    router.push('/')
  }
}
