import { createPinia, setActivePinia } from 'pinia'
import { useTicketsStore } from '../tickets'
import { beforeEach, describe, it, expect } from 'vitest'
import { api } from '@/api/mockApi'

describe('Tickets Store', () => {
  beforeEach(async () => {
    setActivePinia(createPinia());
    await api.reset();
    const store = useTicketsStore();
    await store.fetchTickets();
  })

  it('archives a closed ticket', async () => {
    // Get a ticket to test
    const store = useTicketsStore()
    const ticket = store.tickets.find(x => x.id === 1);
    expect(ticket).toBeDefined;

    // Close the ticket
    await store.updateTicketStatus(ticket!.id, 'Closed');
    expect(ticket!.status).toBe('Closed');

    // Archive the ticket
    await store.archiveTicket(ticket!.id);
    expect(ticket!.isArchived).toBe(true)
  })

  it('does not archive a ticket that is not closed', async () => {
    // Get a ticket to test
    const store = useTicketsStore()
    const ticket = store.tickets.find(x => x.id === 1);
    expect(ticket).toBeDefined();
    expect(ticket!.status).toBe('Open')
    expect(ticket!.isArchived).toBe(false)

    // The ticket is not allowed to be archived if it is not in Closed state
    await expect(store.archiveTicket(ticket!.id)).rejects.toThrow('Ticket must be closed to be archived');
    expect(ticket!.isArchived).toBe(false)
  })
})
