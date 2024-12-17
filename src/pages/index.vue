<script setup lang="ts">
import { ref } from 'vue'

import { supabase } from '@/lib/supabase-client'

const projects = ref([])
const getProjects = async () => {
  const { data, error } = await supabase.from('projects').select('*')
}
</script>

<template>
  <h1>Home Page</h1>
  <router-link :to="{ name: '/projects/' }">to projects</router-link>
</template>

<style lang="scss" scoped></style>
