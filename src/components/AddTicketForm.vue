<script setup lang="ts">
import { useTicketsStore } from '@/stores/tickets';
import { ref } from 'vue'

const emit = defineEmits(['ticket-added'])

const ticketStore = useTicketsStore();
const title = ref('');
const description = ref('');

function onSubmit() {
    if (title.value && description.value) {
        ticketStore.addTicket({
            title: title.value,
            description: description.value,
            status: 'Open'
        });

        title.value = '';
        description.value = '';
        emit('ticket-added');
    }
}
</script>

<template>
    <form @submit.prevent="onSubmit">
        <h3 class="text-lg font-bold mb-2">Add New Ticket</h3>
        <div class="mb-2">
            <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" id="title" v-model="title"
                class="mt-1 block w-full rounded-md border-gray-300 pl-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        </div>
        <div class="mb-2">
            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="description" v-model="description" rows="3"
                class="mt-1 pl-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
        </div>
        <button type="submit"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Add Ticket
        </button>
    </form>
</template>