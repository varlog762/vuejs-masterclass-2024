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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
</script>

<template>
  <nav class="h-16 border-b bg-muted/40 flex items-center justify-between px-6">
    <form class="w-full max-w-96">
      <Input type="text" class="w-full pl-8 bg-background" placeholder="Search..." />
    </form>

    <DropdownMenu>
      <DropdownMenuTrigger>
        <!-- <div class="w-8 h-8 rounded-full bg-white"></div> -->
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Some action 1</DropdownMenuItem>
        <DropdownMenuItem>Some action 2</DropdownMenuItem>
        <DropdownMenuItem>Some action 3</DropdownMenuItem>
        <DropdownMenuItem>Some action 4</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
