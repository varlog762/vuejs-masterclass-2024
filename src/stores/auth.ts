import type { User } from '@supabase/supabase-js'
import type { Tables } from 'database/types/supabase'

export const useAuthStore = defineStore('auth-store', () => {
  const user = ref<User | null>(null)
  const profile = ref<Tables<'profiles'> | null>(null)

  return { user, profile }
})
