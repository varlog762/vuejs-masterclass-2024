<script setup lang="ts">
import { ref } from 'vue'

import type { Tables } from '../../../database/types/supabase'
import { supabase } from '@/lib/supabase-client'

const tasks = ref<Tables<'tasks'>[] | null>(null)

;(async () => {
  const { data, error } = await supabase.from('tasks').select()
  if (error) {
    console.error(error)

    return
  }

  tasks.value = data
})()
</script>

<template>
  <h1>Tasks Page</h1>
  <router-link to="/">to home</router-link>
  <ul>
    <li v-for="task in tasks" :key="task.id">{{ task.name }}</li>
  </ul>
</template>

<style lang="scss" scoped></style>
