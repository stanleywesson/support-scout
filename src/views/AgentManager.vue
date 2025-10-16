<script setup lang="ts">
import { ref, computed } from 'vue';
import { useTicketsStore } from '@/stores/tickets';
import { storeToRefs } from 'pinia';

const ticketsStore = useTicketsStore();
const { tickets, supportAgents } = storeToRefs(ticketsStore);
const { addAgent, removeAgent } = ticketsStore;

const newAgentName = ref('');

const agentsWithTicketCount = computed(() => {
    return supportAgents.value.map(agent => {
        const count = tickets.value.filter(ticket => ticket.agent === agent).length;
        return { agent, count };
    })
});

function addNewAgent() {
    if (newAgentName.value) {
        addAgent(newAgentName.value);
        newAgentName.value = '';
    }
}
</script>

<template>
    <div class="p-4 sm:p-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Agent Management</h2>

        <div class="mb-4">
            <form @submit.prevent="addNewAgent">
                <div class="flex items-center">
                    <input type="text" v-model="newAgentName" placeholder="Agent Name"
                        class="block w-full rounded-md border-gray-300 pl-2 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white">
                    <button type="submit"
                        class="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 whitespace-nowrap">
                        Add Agent
                    </button>
                </div>
            </form>
        </div>

        <div class="shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Agent
                        </th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ticket Count
                        </th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="agent in agentsWithTicketCount" :key="agent.agent">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ agent.agent }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ agent.count }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button @click="removeAgent(agent.agent)" :disabled="agent.count > 0"
                                class="text-red-600 hover:text-red-900 disabled:text-gray-400 disabled">Remove</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>