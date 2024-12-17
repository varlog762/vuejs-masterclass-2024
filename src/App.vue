<script setup lang="ts">
import { supabase } from '@/lib/supabase-client'

console.log(supabase)
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
