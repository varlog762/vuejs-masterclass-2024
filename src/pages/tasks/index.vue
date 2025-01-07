<script setup lang="ts">
import { h, ref } from 'vue'

import type { Tables } from '../../../database/types/supabase'
import { supabase } from '@/lib/supabase-client'
import type { ColumnDef } from '@tanstack/vue-table'

const tasks = ref<Tables<'tasks'>[] | null>(null)

;(async () => {
  const { data, error } = await supabase.from('tasks').select()
  if (error) {
    console.error(error)

    return
  }

  tasks.value = data
})()

interface Payment {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

const payments: Payment[] = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '489e1d42',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
]

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'amount',
    header: () => h('div', { class: 'text-right' }, 'Amount'),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)

      return h('div', { class: 'text-right font-medium' }, formatted)
    },
  },
]
</script>

<template>
  <h1>Tasks Page</h1>
  <router-link to="/">to home</router-link>
  <ul>
    <li v-for="task in tasks" :key="task.id">{{ task.name }}</li>
  </ul>
</template>

<style lang="scss" scoped></style>
