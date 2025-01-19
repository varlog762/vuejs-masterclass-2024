<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import { RouterLink } from 'vue-router'

import type { Tables } from '../../../database/types/supabase'
import { projectsQuery } from '@/utils/supaQueries'

usePageStore().pageData.title = 'Projects'

const projects = ref<Tables<'projects'>[] | null>(null)

const getProjects = async () => {
  const { data, error } = await projectsQuery
  if (error) {
    return
  }

  projects.value = data
}

await getProjects()

const columns: ColumnDef<Tables<'projects'>>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) =>
      h(RouterLink, { to: `/projects/${row.original.slug}`, class: 'text-left font-medium' }, () =>
        row.getValue('name'),
      ),
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left' }, 'Status'),
    cell: ({ row }) => h('div', { class: 'text-left font-medium' }, row.getValue('status')),
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators'),
    cell: ({ row }) =>
      h('div', { class: 'text-left font-medium' }, JSON.stringify(row.getValue('collaborators'))),
  },
]
</script>

<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>

<style lang="scss" scoped></style>
