<script setup lang="ts">
import { set } from '@vueuse/core/index.cjs'
import { supabase } from './lib/supabase-client'

const errorStore = useErrorStore()

onErrorCaptured((error) => {
  errorStore.setError({ error, customCode: 500 })
})

onMounted(() => {
  supabase.auth.onAuthStateChange((event, session) => {
    setTimeout(() => {
      useAuthStore().setAuth(session)
    }, 0)
  })
})
</script>

<template>
  <AuthLayout>
    <AppErrorComponent v-if="errorStore.activeError" />

    <RouterView v-else v-slot="{ Component, route }">
      <Suspense v-if="Component" :timeout="0">
        <Component :is="Component" :key="route.name"></Component>
        <template #fallback>Loading...</template>
      </Suspense>
    </RouterView>
  </AuthLayout>
</template>
