import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Ticket, Status, Agent } from '@/api/mockApi'
import { api, statuses } from '@/api/mockApi'

export { statuses }

export const useTicketsStore = defineStore('tickets', () => {
  const tickets = ref<Ticket[]>([])
  const supportAgents = ref<Agent[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const activeTickets = computed(() => tickets.value.filter((x) => !x.isArchived))
  const archivedTickets = computed(() => tickets.value.filter((x) => x.isArchived))

  async function fetchTickets() {
    loading.value = true
    error.value = null
    try {
      tickets.value = await api.getTickets()
    } catch {
      error.value = 'Failed to fetch tickets.'
    } finally {
      loading.value = false
    }
  }

  async function fetchAgents() {
    loading.value = true
    error.value = null
    try {
      supportAgents.value = await api.getAgents()
    } catch {
      error.value = 'Failed to fetch agents.'
    } finally {
      loading.value = false
    }
  }

  async function addTicket(ticket: Omit<Ticket, 'id' | 'isArchived' | 'agent' | 'status'>) {
    const newTicket = await api.addTicket(ticket)
    tickets.value.push(newTicket)
  }

  async function updateTicketStatus(ticketId: number, status: Status) {
    const updatedTicket = await api.updateTicketStatus(ticketId, status)
    const index = tickets.value.findIndex((x) => x.id === ticketId)

    if (index !== -1) tickets.value[index] = { ...updatedTicket }
  }

  async function archiveTicket(ticketId: number) {
    const updatedTicket = await api.archiveTicket(ticketId)
    const index = tickets.value.findIndex((x) => x.id === ticketId)

    if (index !== -1) tickets.value[index] = { ...updatedTicket }
  }

  async function assignAgent(ticketId: number, agent: Agent) {
    const updatedTicket = await api.assignAgent(ticketId, agent)
    const index = tickets.value.findIndex((x) => x.id === ticketId)

    if (index !== -1) tickets.value[index] = { ...updatedTicket }
  }

  async function addAgent(name: string) {
    const newAgent = await api.addAgent(name)
    supportAgents.value.push(newAgent as Agent)
  }

  async function removeAgent(name: string) {
    await api.removeAgent(name)
    const index = supportAgents.value.indexOf(name as Agent)

    if (index !== -1) {
      supportAgents.value.splice(index, 1)
    }
  }

  return {
    tickets,
    supportAgents,
    loading,
    error,
    fetchAgents,
    fetchTickets,
    addTicket,
    updateTicketStatus,
    activeTickets,
    archivedTickets,
    archiveTicket,
    assignAgent,
    addAgent,
    removeAgent,
  }
})
