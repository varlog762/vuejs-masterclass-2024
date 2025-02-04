<script setup lang="ts">
import type { LinksProps } from '@/types'

defineProps<{
  links: LinksProps[]
}>()

const emit = defineEmits<{
  actionClicked: [string]
}>()

const emitAction = (payload: string) => {
  emit('actionClicked', payload)
}
</script>

<template>
  <template v-for="link in links" :key="link.title">
    <RouterLink
      v-if="link.to"
      exactActiveClass="bg-muted text-primary"
      :to="link.to"
      class="nav-link"
    >
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span class="hidden lg:block text-nowrap">{{ link.title }}</span>
    </RouterLink>

    <div v-else class="nav-link cursor-pointer" @click="emitAction(link.title)">
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span class="hidden lg:block text-nowrap">{{ link.title }}</span>
    </div>
  </template>
</template>

<style scoped>
.nav-link {
  @apply flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground;
}
</style>
