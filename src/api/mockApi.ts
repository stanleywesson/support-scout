import { getOffsetDate } from '@/utils/date'

// --- Classes ---
export const statuses = ['Open', 'In Progress', 'Closed'] as const
export type Status = (typeof statuses)[number]

export const supportAgents = ['Stan', 'Priska', 'Edward', 'Fred', 'Chaldine'] as const
export type Agent = (typeof supportAgents)[number]

export interface Ticket {
  id: number
  title: string
  description: string
  status: Status
  isArchived: boolean
  agent?: Agent
  createdAt?: Date
}

// --- In-Memory Database ---
const initialTickets: Ticket[] = [
  {
    id: 1,
    title: 'UI button is misaligned',
    description: 'The main login button on the home page is off-center on mobile.',
    status: 'Open',
    isArchived: false,
    createdAt: getOffsetDate(1),
  },
  {
    id: 2,
    title: 'API call returns 500 error',
    description: 'The user profile endpoint is crashing when no avatar is set.',
    status: 'In Progress',
    isArchived: false,
    agent: 'Stan',
    createdAt: getOffsetDate(4),
  },
]

const initialAgents: Agent[] = [...supportAgents]

let tickets: Ticket[];
let agents: Agent[];

resetState();

function resetState() {
  tickets = JSON.parse(JSON.stringify(initialTickets));
  agents = [...initialAgents];
}

// --- Simulated API methods ---
const SIMULATED_DELAY = 500

function withDelay<T>(data: T): Promise<T> {
  // Return data immediately for unit tests.
  if (import.meta.env.VITEST) {
    return Promise.resolve(data)
  }

  return new Promise((resolve) => {
    setTimeout(() => resolve(data), SIMULATED_DELAY)
  })
}

export const api = {
  reset: () => {
    resetState()
    return withDelay({})
  },

  getTickets: () => withDelay([...tickets]),

  getAgents: () => withDelay([...agents]),

  addTicket: (ticket: Omit<Ticket, 'id' | 'isArchived' | 'agent' | 'status'>) => {
    const newTicket: Ticket = {
      ...ticket,
      id: Math.max(0, ...tickets.map((x) => x.id)) + 1,
      isArchived: false,
      status: 'Open',
      createdAt: new Date(),
    }
    tickets.push(newTicket)
    return withDelay(newTicket)
  },

  updateTicketStatus: (ticketId: number, status: Status) => {
    const ticket = tickets.find((x) => x.id === ticketId)
    if (ticket) {
      ticket.status = status
      if (status !== 'Closed') {
        ticket.isArchived = false
      }
      return withDelay(ticket)
    }
    return Promise.reject(new Error('Ticket not found'))
  },

  archiveTicket: (ticketId: number) => {
    const ticket = tickets.find((x) => x.id === ticketId)
    if (ticket && ticket.status === 'Closed') {
      ticket.isArchived = true
      return withDelay(ticket)
    }
    return Promise.reject(new Error('Ticket must be closed to be archived'))
  },

  assignAgent: (ticketId: number, agent: Agent) => {
    const ticket = tickets.find((x) => x.id === ticketId)
    if (ticket) {
      ticket.agent = agent
      return withDelay(ticket)
    }
    return Promise.reject(new Error('Ticket not found'))
  },

  addAgent: (name: string) => {
    const newAgent = name as Agent
    agents.push(newAgent)
    return withDelay(newAgent)
  },

  removeAgent: (name: string) => {
    const index = agents.indexOf(name as Agent)
    if (index !== -1) {
      const removed = agents.splice(index, 1)
      return withDelay(removed[0])
    }
    return Promise.reject(new Error('Agent not found'))
  },
}
