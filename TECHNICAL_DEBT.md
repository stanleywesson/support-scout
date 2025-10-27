# Technical Debt

## Priority 0: Must Fix (Critical Issues)

These issues could cause application crashes or poor user experience and should be addressed before production.

### Error Handling

- [ ] **Add try-catch to all mutation functions in store** (`src/stores/tickets.ts`)
  - Currently only `fetchTickets` and `fetchAgents` have error handling
  - Missing in: `addTicket`, `updateTicketStatus`, `updateTicketPriority`, `archiveTicket`, `assignAgent`, `addAgent`, `removeAgent`, `addComment`
  - Impact: Unhandled promise rejections cause crashes with no user feedback

- [ ] **Implement proper error feedback in components**
  - `HomeView.vue:29-30` - Add try-catch when calling `updateTicketStatus`
  - `AgentManager.vue:20-28` - Add error handling for `addAgent` and `removeAgent`
  - `TicketComments.vue:21` - Add error handling for `addComment`
  - Show toast notifications on errors so users know what happened

- [ ] **Implement Robust API Updates:** Refactor all store actions that perform data mutations to handle potential API failures with `try...catch` blocks and inform the user if a network call fails.

### Type Safety

- [ ] **Replace unsafe type assertions with proper type guards**
  - `tickets.ts:76` - `newAgent as Agent` should validate the string is a valid agent name
  - `tickets.ts:81` - `name as Agent` needs validation
  - `HomeView.vue:122` - Validate status string against Status type
  - `TicketView.vue:29,34` - Add runtime validation for Agent and Priority types
  - Impact: Type assertions bypass TypeScript safety and can cause runtime errors

### Testing

- [ ] **Fix test bug in `src/stores/__tests__/tickets.spec.ts:18`**
  - Change `expect(ticket).toBeDefined` to `expect(ticket).toBeDefined()`
  - Missing parentheses cause test to always pass

- [ ] **Fix reactivity test assertion in `tickets.spec.ts:26`**
  - Test checks local `ticket` reference instead of fetching updated ticket from store
  - Should re-fetch ticket from store after archive to verify state change

## Priority 1: Should Fix (Important Improvements)

These issues affect user experience and code quality but aren't immediately critical.

### User Experience

- [ ] **Separate loading states for different operations** (`src/stores/tickets.ts:11`)
  - Current single `loading` ref is shared between tickets and agents
  - Create separate `loadingTickets`, `loadingAgents`, `loadingMutations` states
  - Impact: UI shows "Loading ticket..." when actually loading agents; confusing UX

- [ ] **Add loading indicators for mutation operations**
  - Actions like archive, status update, assign agent have 500ms delay with no feedback
  - Add loading states so users know their action is processing
  - Consider spinners or disabled buttons during operations

- [ ] **Implement optimistic updates with rollback**
  - Currently users wait 500ms to see changes (feels sluggish)
  - Update UI immediately, then rollback if API call fails
  - Especially important for: status changes, priority updates, agent assignment

### Input Validation

- [ ] **Add comprehensive input validation to `AddTicketForm.vue:14`**
  - Current: only checks if title and description are truthy
  - Add: maximum length validation (e.g., title max 200 chars, description max 2000)
  - Add: minimum length validation
  - Add: sanitization for special characters
  - Show user-friendly error messages when validation fails

- [ ] **Add validation feedback in forms**
  - Currently forms fail silently when validation doesn't pass
  - Add visible error messages below form fields
  - Disable submit button until form is valid

- [ ] **Prevent Duplicate Agent Names** (`AgentManager.vue:21`)
  - Check if agent name already exists before adding
  - Show error message if duplicate detected
  - Consider case-insensitive comparison

### Store Architecture

- [ ] **Refactor the `tickets` store to separate agent management logic into its own `agents` store**
  - Move `supportAgents`, `fetchAgents`, `addAgent`, `removeAgent` to new store
  - Improves separation of concerns and makes the application more scalable
  - Makes loading states easier to manage per domain

## Priority 2: Nice to Have (Quality of Life)

These improvements enhance maintainability, testing, and accessibility but aren't urgent.

### Testing

- [ ] **Expand test coverage to >70%**
  - Currently only 3 tests for 12+ store functions
  - Missing tests for: `updateTicketPriority`, `assignAgent`, `addAgent`, `removeAgent`, `addComment`
  - Add error path tests (what happens when API calls fail?)
  - Add tests for edge cases (invalid IDs, empty strings, etc.)

- [ ] **Add component tests**
  - Only found 1 component test (`Menu.spec.ts`)
  - Add tests for: `AddTicketForm`, `TicketComments`, `AgentManager`
  - Test user interactions and form submissions

- [ ] **Add E2E tests for critical user flows**
  - Test complete ticket lifecycle: create → assign → update status → archive
  - Test agent management flow
  - Test comment functionality

### Code Quality

- [ ] **Centralize error messages**
  - Move repeated strings like `'Failed to fetch tickets.'` to constants file
  - Makes messages consistent and easier to update
  - Consider i18n preparation for future localization

- [ ] **Remove commented code**
  - `HomeView.vue:100` has commented out code
  - Clean up to improve readability

- [ ] **Improve reactivity safety** (`tickets.ts:50, 57, 64, 71`)
  - Current shallow spread `{ ...updatedTicket }` works but is fragile
  - If `Ticket` gets nested objects, reactivity might break
  - Consider using `structuredClone()` or Vue's `reactive()` for deep updates

- [ ] **Add user feedback for disabled actions**
  - `AgentManager.vue:100` - Remove button is disabled but doesn't explain why
  - Add tooltip: "Cannot remove agent with assigned tickets"

### Accessibility

- [ ] **Fix missing alt attributes**
  - `TicketComments.vue:36` - `<img>` needs descriptive alt text
  - Review all images for proper alt text

- [ ] **Add consistent aria-labels**
  - Some forms have labels, but aria-label usage is inconsistent
  - Ensure screen readers can navigate the entire application
  - Add aria-live regions for dynamic content updates (loading states, errors)

- [ ] **Keyboard navigation improvements**
  - Test that all interactive elements are keyboard accessible
  - Add visible focus indicators
  - Ensure modals trap focus properly

### Data Layer

- [ ] **Replace Hardcoded Data with Mock Service**
  - Create a mock service that simulates a full REST API
  - Return JSON data with proper HTTP response patterns
  - This will prepare the application for a future transition to a real backend (C# API)

### Performance

- [ ] **Consider virtual scrolling for large ticket lists**
  - If ticket count grows significantly, table rendering could slow down
  - Libraries like `vue-virtual-scroller` can help

- [ ] **Add pagination or infinite scroll**
  - Current implementation loads all tickets at once
  - Won't scale well with hundreds of tickets

## Learning Resources

As this is your first Vue application, here are some recommended resources for addressing these items:

- **Error Handling in Vue 3:** https://vuejs.org/guide/best-practices/production-deployment.html#tracking-runtime-errors
- **Type Guards in TypeScript:** https://www.typescriptlang.org/docs/handbook/2/narrowing.html
- **Testing with Vitest:** https://vitest.dev/guide/
- **Vue 3 Composition API Best Practices:** https://vuejs.org/guide/best-practices/
- **Optimistic Updates Pattern:** Research "optimistic UI updates" for modern web apps