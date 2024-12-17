<script setup lang="ts">
import { ref } from 'vue'

import type { ProjectInterface } from '@/models'
import { supabase } from '@/lib/supabase-client'

const projects = ref<ProjectInterface[]>([])

;(async () => {
  const { data, error } = await supabase.from('projects').select()
  if (error) {
    console.error(error)

    return
  }

  projects.value = data
})()
</script>

<template>
  <h1>Projects Page</h1>
  <router-link to="/">to home</router-link>
</template>

<style lang="scss" scoped></style>
