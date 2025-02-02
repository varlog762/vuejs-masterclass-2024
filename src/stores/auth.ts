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

  const setProfile = () => {
    if (!user.value) {
      profile.value = null
      return
    }

    if (!profile.value || profile.value.id !== user.value.id) {
    }
  }

  return { user, profile, setAuth }
})
