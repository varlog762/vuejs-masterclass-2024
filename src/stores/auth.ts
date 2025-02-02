import { profileQuery } from '@/utils/supaQueries'
import type { Session, User } from '@supabase/supabase-js'
import type { Tables } from 'database/types/supabase'

export const useAuthStore = defineStore('auth-store', () => {
  const user = ref<User | null>(null)
  const profile = ref<Tables<'profiles'> | null>(null)

  const setAuth = async (userSession: Session | null = null) => {
    if (!userSession) {
      user.value = null
      return
    }

    user.value = userSession.user
    await setProfile()
  }

  const setProfile = async () => {
    if (!user.value) {
      profile.value = null
      return
    }

    if (!profile.value || profile.value.id !== user.value.id) {
      const { data } = await profileQuery(user.value.id)

      profile.value = data || null
    }
  }

  return { user, profile, setAuth }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
