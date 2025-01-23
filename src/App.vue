<script setup lang="ts">
const { activeError } = storeToRefs(useErrorStore())
</script>

<template>
  <AuthLayout>
    <AppErrorComponent v-if="activeError" />

    <RouterView v-else v-slot="{ Component, route }">
      <Suspense v-if="Component" :timeout="0">
        <Component :is="Component" :key="route.name"></Component>
        <template #fallback>Loading...</template>
      </Suspense>
    </RouterView>
  </AuthLayout>
</template>
