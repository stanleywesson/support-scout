<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useTicketsStore, type Agent, supportAgents } from '@/stores/tickets';
import { toShortDate } from '@/utils/date';

const route = useRoute();
const ticketId = computed(() => Number(route.params.id));

const ticketStore = useTicketsStore();
const ticket = computed(() => ticketStore.tickets.find(x => x.id === ticketId.value));

function assignAgent(event: Event) {
    const target = event.target as HTMLSelectElement;
    const agent = target.value as Agent;
    ticketStore.assignAgent(ticketId.value, agent);
}
</script>

<template>
    <div class="p-4 sm:p-6">
        <div class="mb-4">
            <RouterLink :to="{ name: 'home' }" class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white
      hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                &larr; Back to all tickets
            </RouterLink>
        </div>
        <div v-if="ticket" class="bg-white shadow overflow-hidden sm:rounded-lg">
            <div class="px-4 py-5 sm:px-6">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                    Ticket Details
                </h3>
                <p class="mt-1 max-w-2xl text-sm text-gray-500">
                    Information about ticket #{{ ticket.id }}
                </p>
            </div>
            <div class="border-t border-gray-200">
                <dl>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">
                            Title
                        </dt>
                        <dd class="mt-1 pl-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {{ ticket.title }}
                        </dd>
                    </div>
                    <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">
                            Description
                        </dt>
                        <dd class="mt-1 pl-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {{ ticket.description }}
                        </dd>
                    </div>
                    <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">
                            Created At
                        </dt>
                        <dd class="mt-1 pl-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {{ toShortDate(ticket.createdAt) }}
                        </dd>
                    </div>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">
                            Status
                        </dt>
                        <dd class="mt-1 pl-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {{ ticket.status }}
                        </dd>
                    </div>
                    <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">
                            Agent
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <select @change="assignAgent"
                                class="mt-1 block w-full pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500  sm:text-sm rounded-md">
                                <option :value="undefined">Unassigned</option>
                                <option v-for="agent in supportAgents" :key="agent" :value="agent"
                                    :selected="ticket.agent === agent">
                                    {{ agent }}
                                </option>
                            </select>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
        <div v-else class="text-center p-8">
            <h2 class="text-2xl font-bold text-gray-800">Ticket not found</h2>
            <p class="text-gray-500">The ticket you are looking for does not exist.</p>
        </div>
    </div>
</template>