# Standesk Feature Roadmap

This document outlines the development plan for the Standesk application, organized into logical phases. We will focus on building a solid foundation before moving on to more advanced features.

## Phase 1: Build the Foundation (Address Technical Debt)

**Objective:** Decouple the UI from hardcoded data by creating a mock API layer. This is the highest priority and the foundation for all future development.

- [ ] **Create a Mock API Service:**
    - [ ] Establish a new `src/api` directory.
    - [ ] Develop a `mockApi.ts` service to manage data (tickets, agents) in memory.
    - [ ] Expose functions that simulate real API calls (`getTickets`, `addTicket`, etc.), returning Promises.
- [ ] **Refactor Pinia Stores:**
    - [ ] Update all stores to fetch and manipulate data by calling the mock API service instead of using hardcoded values.

## Phase 2: Enhance Core Ticketing Features

**Objective:** Build out the essential features for managing tickets, now powered by the mock API.

- [ ] **Implement Full Ticket Lifecycle:**
    - [ ] Allow agents to update a ticket's status, priority, and assigned agent from the `TicketView`.
- [ ] **Add Comments/Discussion:**
    - [ ] Create a component to display comments on a ticket.
    - [ ] Add a form to allow users to add new comments.
- [ ] **Implement Ticket Filtering and Sorting:**
    - [ ] Add UI controls to filter tickets by status or agent.
    - [ ] Allow users to sort tickets by creation date or priority.

## Phase 3: Introduce User Context

**Objective:** Add user authentication and role-based access to create a more realistic application experience.

- [ ] **Implement User Authentication:**
    - [ ] Create a simple `Login.vue` page.
    - [ ] Add a mock `authService.ts` to handle login with hardcoded users.
    - [ ] Create an `auth.ts` Pinia store to manage the current user's state.
- [ ] **Implement Role-Based Access Control (RBAC):**
    - [ ] Restrict access and UI elements based on the user's role (e.g., Agent vs. Customer).

## Future Phases

**Objective:** Explore advanced features once the core application is stable and robust.

- [ ] **Workflow Automation Engine:**
    - [ ] Intelligent ticket routing, status management, SLA monitoring, and a custom rule builder.
- [ ] **AI-Powered Support Bot:**
    - [ ] A chat interface with an AI assistant to answer user questions.
- [ ] **Real-time Updates:**
    - [ ] Use WebSockets to provide real-time updates to the UI without requiring a page refresh.
- [ ] **Knowledge Base (Self-Service Portal):**
    - [ ] A separate section for managing and searching help articles.
