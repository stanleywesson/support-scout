import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const statuses = ['Open', 'In Progress', 'Closed'] as const;
export const supportAgents = ref(['Stan', 'Priska', 'Edward', 'Fred', 'Chaldine'] as const);

export type Status = typeof statuses[number];
export type Agent = typeof supportAgents.value[number];

export interface Ticket {
    id: number,
    title: string,
    description: string,
    status: Status,
    isArchived: boolean,
    agent?: Agent
}

export const useTicketsStore = defineStore('tickets', () => {
    const tickets = ref<Ticket[]>([
        {
            id: 1,
            title: 'UI button is misaligned',
            description: 'The main login button on the home page is off-center on mobile.',
            status: 'Open',
            isArchived: false
        },
        {
            id: 2,
            title: 'API call returns 500 error',
            description: 'The user profile endpoint is crashing when no avatar is set.',
            status: 'In Progress',
            isArchived: false,
            agent: supportAgents.value[0]
        }
    ])

    const activeTickets = computed(() => tickets.value.filter(x => !x.isArchived));
    const archivedTickets = computed(() => tickets.value.filter(x => x.isArchived));

    function addTicket(ticket: Omit<Ticket, 'id' | 'isArchived' | 'agent' | 'status'>) {
        const newTicket: Ticket = {
            ...ticket,
            id: Math.max(0, ...tickets.value.map(x => x.id)) + 1,
            isArchived: false,
            status: 'Open'
        }

        tickets.value.push(newTicket);
    }

    function updateTicketStatus(ticketId: number, status: Status) {
        const ticket = tickets.value.find(x => x.id == ticketId);

        if (ticket) {
            ticket.status = status;

            if (status !== 'Closed') {
                ticket.isArchived = false;
            }
        }
    }

    function archiveTicket(ticketId: number) {
        const ticket = tickets.value.find(x => x.id == ticketId);

        if (ticket && ticket.status === 'Closed') {
            ticket.isArchived = true;
        }
    }

    function assignAgent(ticketId: number, agent: Agent) {
        const ticket = tickets.value.find(x => x.id == ticketId);

        if (ticket) {
            ticket.agent = agent;
        }
    }

    function addAgent(name: string) {
        // What if agents have the same name.
        (supportAgents.value as any).push(name);
    }

    function removeAgent(name: string) {
        // What if agents have the same name.
        // Can only remove agent if no tickets are assigned to them
        const index = (supportAgents.value as readonly string[]).indexOf(name);

        if (index !== -1) {
            (supportAgents.value as any).splice(index, 1);
        }
    }

    return { tickets, supportAgents, addTicket, updateTicketStatus, activeTickets, archivedTickets, archiveTicket, assignAgent, addAgent, removeAgent }
})