import type { Session, User } from '@supabase/supabase-js'
import type { Tables } from 'database/types/supabase'

export const useAuthStore = defineStore('auth-store', () => {
  const user = ref<User | null>(null)
  const profile = ref<Tables<'profiles'> | null>(null)

  const setAuth = (userSession: Session | null = null) => {
    if (!userSession) {
      user.value = null
      return
    }

    user.value = userSession.user
  }

  return { user, profile, setAuth }
})
