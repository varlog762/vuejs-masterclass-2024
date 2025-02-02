<script setup lang="ts">
const errorStore = useErrorStore()
const authStore = useAuthStore()

onErrorCaptured((error) => {
  errorStore.setError({ error, customCode: 500 })
})

onMounted(async () => {
  await authStore.getSession()
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
