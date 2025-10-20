<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppMenu from './components/AppMenu.vue'
</script>

<template>
  <div class="md:flex h-screen bg-gray-300">
    <AppMenu></AppMenu>
    <main class="flex-1 overflow-y-auto">
      <RouterView />
    </main>
  </div>
</template>
