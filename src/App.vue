<script setup lang="ts">
import Input from '@/components/ui/input/Input.vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
</script>

<template>
  <nav class="h-16 border-b bg-muted/40 flex items-center justify-between px-6">
    <form class="w-full max-w-96">
      <Input type="text" class="w-full pl-8 bg-background" placeholder="Search..." />
    </form>

    <DropdownMenu>
      <DropdownMenuTrigger>
        <div class="w-8 h-8 rounded-full bg-white"></div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem></DropdownMenuItem>
        <DropdownMenuItem></DropdownMenuItem>
        <DropdownMenuItem></DropdownMenuItem>
        <DropdownMenuItem></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
