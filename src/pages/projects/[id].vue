<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const projectId = route.params?.id
</script>

<template>
  <h1>Project {{ projectId }}</h1>
</template>

<style lang="scss" scoped></style>
