import { createPinia, setActivePinia } from 'pinia'
import { useTicketsStore } from '../tickets'

describe('Tickets Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('archives a closed ticket', () => {
    const store = useTicketsStore()

    // Just grab the first default ticket
    const ticketId = 1
    const ticket = () => store.tickets.find((x) => x.id === ticketId)

    expect(ticket().isArchived).toBe(false)
    store.updateTicketStatus(ticketId, 'Closed')
    expect(ticket().status).toBe('Closed')
    store.archiveTicket(ticketId)
    expect(ticket().isArchived).toBe(true)
  })

  it('does not archive a ticket that is not closed', () => {
    const store = useTicketsStore()

    // Just grab the first default ticket
    const ticketId = 1
    const ticket = () => store.tickets.find((x) => x.id === ticketId)

    expect(ticket().status).toBe('Open')
    expect(ticket().isArchived).toBe(false)
    store.archiveTicket(ticketId)
    expect(ticket().isArchived).toBe(false)
  })
})
