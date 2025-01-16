<script setup lang="ts"></script>

<template>
  <AuthLayout>
    <Suspense>
      <RouterView />

      <template #fallback> Loading... </template>
    </Suspense>
  </AuthLayout>
</template>
