# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Support Scout** is a Vue 3-based support ticket management Progressive Web App (PWA). The application uses a mock API to simulate backend operations with in-memory data storage.

**Key Technologies:**
- Vue 3 (Composition API)
- TypeScript
- Pinia (state management)
- Vue Router
- Tailwind CSS 4
- Vite 7 (build tool)
- Vitest (unit tests)
- Cypress (E2E tests)
- PWA support via vite-plugin-pwa

## Common Commands

### Development
```bash
npm run dev          # Start dev server (default: http://localhost:5173)
npm run build        # Type-check and build for production
npm run preview      # Preview production build locally
```

### Testing
```bash
npm run test:unit                    # Run all unit tests (Vitest)
npm run test:unit -- TicketView      # Run specific test file matching pattern
npm run test:e2e                     # Open Cypress E2E test runner
```

**Testing Notes:**
- Unit tests are in `__tests__` directories alongside components/stores
- E2E tests are in `cypress/e2e/`
- Vitest config is in `vite.config.ts` (uses jsdom environment, globals enabled)
- Mock API returns data immediately in test environment (no simulated delay)

### Code Quality
```bash
npm run lint         # Run ESLint with auto-fix
npm run format       # Format code with Prettier
npm run type-check   # Type-check with vue-tsc (no emit)
```

## Architecture

### State Management (Pinia)

**Main Store:** `src/stores/tickets.ts`

The tickets store manages all application state including:
- Tickets (active and archived)
- Support agents
- Loading/error states

Key patterns:
- Store actions are async and interact with the mock API
- Computed properties provide filtered views (activeTickets, archivedTickets)
- Store updates local state after successful API calls
- **Known issue:** Agent management logic is mixed with ticket logic (see TECHNICAL_DEBT.md)

### Mock API Layer

**Location:** `src/api/mockApi.ts`

- Simulates backend API with 500ms delay (disabled in tests)
- In-memory data storage with `resetState()` function for tests
- Provides TypeScript types exported for use throughout app
- Implements business rules (e.g., tickets must be closed before archiving)
- Mock data includes initial tickets with various statuses

**Types defined in mockApi:**
- `Status`: 'Open' | 'In Progress' | 'Closed'
- `Priority`: 'Low' | 'Medium' | 'High' | 'Urgent'
- `Agent`: Union type of predefined agent names
- `Ticket`: Core data model with id, title, description, status, agent, priority, comments, etc.
- `Comment`: Comment model with id, author, text, createdAt

### Routing

**Location:** `src/router/index.ts`

Routes use lazy-loaded components:
- `/` - HomeView (active tickets)
- `/archive` - HomeView with filter='archive' prop
- `/ticket/:id` - TicketView (detail page)
- `/agents` - AgentManager

**Note:** Base URL is `/support-scout/` for deployment (see vite.config.ts)

### Component Structure

**Views:**
- `HomeView.vue` - Main ticket list (handles both active/archived via props)
- `TicketView.vue` - Ticket detail page with status/priority updates
- `AgentManager.vue` - Manage support agents

**Components:**
- `AppMenu.vue` - Navigation menu
- `AppModal.vue` - Reusable modal wrapper
- `AddTicketForm.vue` - Form for creating new tickets
- `TicketComments.vue` - Display and add comments to tickets

### Styling

- Tailwind CSS 4 with Vite plugin
- Global styles in `src/assets/style.css`
- Uses utility-first approach

### Path Aliases

`@` resolves to `src/` directory (configured in vite.config.ts and tsconfig)

Example: `import { api } from '@/api/mockApi'`

## Development Patterns

### Async Operations

All store actions that interact with the API are async. Components typically:
1. Call store action (which updates loading state)
2. Display toast notification on success/error (using vue-toastification)
3. Navigate or update UI based on result

### Error Handling

Current state:
- Store sets `error` ref on API failures
- Most mutations lack try-catch for rollback (see TECHNICAL_DEBT.md)
- Toast notifications inform users of operation results

### Testing Practices

- Unit tests use Pinia Testing for store testing
- Mock API auto-detects test environment (`import.meta.env.VITEST`)
- E2E tests expect dev server running on port 5173
- Use `api.reset()` to reset mock data between tests

## Known Technical Debt

See TECHNICAL_DEBT.md for:
- Need to split agents into separate store
- Prevent duplicate agent names
- Implement optimistic update rollback on API failures
- Consider replacing mock API with full mock service pattern
