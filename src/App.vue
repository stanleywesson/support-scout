<script setup lang="ts">
import { RouterView } from 'vue-router'
import Menu from './components/Menu.vue';
</script>

<template>
  <div class="md:flex h-screen bg-gray-300">
    <Menu></Menu>
    <main class="flex-1 overflow-y-auto">
      <RouterView />
    </main>
  </div>
</template>