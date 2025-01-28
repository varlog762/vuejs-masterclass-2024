<script setup lang="ts">
defineProps<{
  message: string
  details: string
  code: string
  hint: string | null
  statusCode: number
  customCode: number
}>()
</script>

<template>
  <div>
    <iconify-icon icon="lucide:triangle-alert" class="error__icon" />
    <h1 class="error__code">{{ customCode || code }}</h1>
    <p class="error__code" v-if="statusCode">Status code: {{ statusCode }}</p>
    <p class="error__msg">{{ message }}</p>
    <p v-if="details">{{ details }}</p>
    <p v-if="hint">{{ hint }}</p>
    <div class="error-footer">
      <p class="error-footer__text">You'll find lots to explore on the home page.</p>
      <RouterLink to="/">
        <Button class="max-w-36"> Back to homepage </Button>
      </RouterLink>
    </div>
  </div>
</template>
