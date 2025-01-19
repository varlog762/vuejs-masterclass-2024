<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { ColumnDef } from '@tanstack/vue-table'

import type { QueryData } from '@supabase/supabase-js'
import type { Tables } from '../../../database/types/supabase'
import { supabase } from '@/lib/supabase-client'

usePageStore().pageData.title = 'My Tasks'

const tasksWithProjectsQuery = supabase.from('tasks').select(`
    *,
    projects (
      id,
      name,
      slug
    )
  `)

type TasksWithProject = QueryData<typeof tasksWithProjectsQuery>

const tasks = ref<TasksWithProject | null>(null)
/**
 * Fetches all tasks from the database.
 *
 * @returns {Promise<void>} Nothing when resolved, error when rejected.
 */
const getTasks = async () => {
  const { data, error } = await tasksWithProjectsQuery
  if (error) {
    console.error(error)

    return
  }

  tasks.value = data
}

await getTasks()

const columns: ColumnDef<TasksWithProject[0]>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => {
      return h(
        RouterLink,
        { to: `/tasks/${row.original.id}`, class: 'text-left font-medium hover:bg-muted' },
        () => row.getValue('name'),
      )
    },
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left' }, 'Status'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, row.getValue('status'))
    },
  },
  {
    accessorKey: 'due_date',
    header: () => h('div', { class: 'text-left' }, 'Due Date'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, row.getValue('due_date'))
    },
  },
  {
    accessorKey: 'projects',
    header: () => h('div', { class: 'text-left' }, 'Project'),
    cell: ({ row }) => {
      return row.original.projects
        ? h(
            RouterLink,
            {
              to: `/projects/${row.original.projects.slug}`,
              class: 'text-left font-medium hover:bg-muted',
            },
            () => row.original.projects?.name,
          )
        : ''
    },
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-left font-medium' },
        JSON.stringify(row.getValue('collaborators')),
      )
    },
  },
]
</script>

<template>
  <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>

<style lang="scss" scoped></style>
