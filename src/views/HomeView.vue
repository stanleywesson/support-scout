<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useTicketsStore, statuses } from '@/stores/tickets'
import type { Status } from '@/api/mockApi'
import { storeToRefs } from 'pinia'
import AddTicketForm from '@/components/AddTicketForm.vue'
import AppModal from '@/components/AppModal.vue'
import { useToast } from 'vue-toastification'
import { toShortDate } from '@/utils/date'

const toast = useToast()

const props = defineProps<{
  filter: 'active' | 'archive'
}>()

const isModalOpen = ref(false)

const ticketStore = useTicketsStore()

onMounted(() => {
  ticketStore.fetchTickets()
})

const { activeTickets, archivedTickets } = storeToRefs(ticketStore)

const updateTicketStatus = (ticketId: number, status: Status) => {
  ticketStore.updateTicketStatus(ticketId, status)
}

const archiveTicket = (ticketId: number) => {
  ticketStore.archiveTicket(ticketId)
}

const filteredTickets = computed(() => {
  return props.filter === 'archive' ? archivedTickets.value : activeTickets.value
})

const viewTitle = computed(() => {
  return props.filter === 'archive' ? 'Archived Tickets' : 'Active Tickets'
})

function archiveAndNotify(ticketId: number) {
  archiveTicket(ticketId)
  toast.success('Ticket archived successfully')
}
</script>

<template>
  <div class="p-4 sm:p-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-2xl font-bold text-gray-800">{{ viewTitle }}</h2>
      <button
        v-if="filter === 'active'"
        @click="isModalOpen = true"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add New Ticket
      </button>
    </div>

    <!-- Loading-->
    <div v-if="ticketStore.loading" class="text-center p-8">
      <h3 class="text-2xl font-bold text-gray-800">Loading ticket...</h3>
    </div>

    <div
      v-else-if="filteredTickets.length > 0"
      class="shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg"
    >
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Title
            </th>
            <th
              scope="col"
              class="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Description
            </th>
            <th
              scope="col"
              class="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
            >
              Created At
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Agent
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              v-if="filter === 'active'"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="ticket in filteredTickets" :key="ticket.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">
              <!-- <div class="text-sm font-medium text-gray-900">{{ ticket.title }}</div> -->
              <RouterLink
                :to="{ name: 'ticket-detail', params: { id: ticket.id } }"
                class="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                {{ ticket.title }}
              </RouterLink>
            </td>
            <td class="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ ticket.description }}
            </td>
            <td class="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ toShortDate(ticket.createdAt) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ ticket.agent ?? 'Unassigned' }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <select
                @change="
                  updateTicketStatus(
                    ticket.id,
                    ($event.target as HTMLSelectElement).value as Status,
                  )
                "
                class="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option
                  v-for="status in statuses"
                  :key="status"
                  :value="status"
                  :selected="status === ticket.status"
                >
                  {{ status }}
                </option>
              </select>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium" v-if="filter === 'active'">
              <button
                v-if="ticket.status === 'Closed' && !ticket.isArchived"
                @click="archiveAndNotify(ticket.id)"
                class="text-indigo-600 hover:text-indigo-900"
              >
                Archive
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="text-center border-2 border-dashed border-gray-300 rounded-lg p-12">
      <h3 class="text-xl font-medium text-gray-900">No tickets yet</h3>
      <p class="mt-1 text-sm text-gray-500">Get started by creating a new ticket.</p>
      <div class="mt-6">
        <button
          @click="isModalOpen = true"
          type="button"
          class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          + Add New Ticket
        </button>
      </div>
    </div>

    <AppModal :show="isModalOpen" @close="isModalOpen = false">
      <AddTicketForm @ticket-added="isModalOpen = false" />
    </AppModal>
  </div>
</template>
