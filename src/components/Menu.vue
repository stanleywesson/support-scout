<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isOpen = ref(false)

const navigation = [
    { name: 'Active Tickets', to: { name: 'home' } },
    { name: 'Archived Tickets', to: { name: 'archive' } },
    { name: 'Agent Manager', to: { name: 'agent-manager' } }
]
</script>

<template>
    <div>
        <!-- Mobile menu -->
        <div class="md:hidden">
            <!-- Top bar -->
            <nav class="bg-gray-800">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex items-center justify-between h-16">
                        <RouterLink :to="{ name: 'home' }" class="text-white font-bold text-xl">Support Scout
                        </RouterLink>
                        <button @click="isOpen = true" type="button"
                            class="p-2 rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-controls="mobile-menu" aria-expanded="false">
                            <span class="sr-only">Open main menu</span>
                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            <!-- Off-canvas menu -->
            <Transition name="fade">
                <div v-if="isOpen" @click="isOpen = false" class="fixed inset-0 bg-gray-900 bg-opacity-75 z-20"
                    aria-hidden="true"></div>
            </Transition>
            <Transition name="slide">
                <div v-if="isOpen" class="fixed inset-y-0 left-0 w-64 bg-gray-800 z-30">
                    <div class="flex items-center justify-between p-4 border-b border-gray-700">
                        <h2 class="text-white font-bold text-xl">Support Scout</h2>
                        <button @click="isOpen = false" class="p-2 rounded-md text-gray-400 hover:text-white">
                            <span class="sr-only">Close menu</span>
                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <nav class="mt-5 px-2 space-y-1">
                        <RouterLink v-for="item in navigation" :key="item.name" :to="item.to" @click="isOpen = false"
                            class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                            {{ item.name }}</RouterLink>
                    </nav>
                </div>
            </Transition>
        </div>

        <!-- Desktop sidebar (unchanged) -->
        <div class="hidden md:flex md:flex-col md:w-64">
            <div class="flex flex-col flex-grow pt-5 bg-gray-800 overflow-y-auto h-screen">
                <div class="flex items-center flex-shrink-0 px-4">
                    <RouterLink :to="{ name: 'home' }" class="text-white font-bold text-xl">Support Scout</RouterLink>
                </div>
                <div class="mt-5 flex-1 flex flex-col">
                    <nav class="flex-1 px-2 pb-4 space-y-1">
                        <RouterLink v-for="item in navigation" :key="item.name" :to="item.to"
                            class="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                            {{ item.name }}</RouterLink>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>