<script setup lang="ts">
usePageStore().pageData.title = 'Homepage'
</script>

<template>
  <div>
    <h1>Home Page</h1>
    <router-link :to="{ name: '/projects/' }">to projects</router-link>
  </div>
</template>

<style lang="scss" scoped></style>
