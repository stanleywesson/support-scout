# Technical Debt

## Store Architecture

- [ ] Refactor the `tickets` store to separate the agent management logic into its own `agents` store. This will improve separation of concerns and make the application more scalable.

## Agent Management

- [ ] **Prevent Duplicate Agent Names:** Add a check to prevent the creation of a new agent if an agent with the same name already exists. This will mitigate the risk of data inconsistencies and confusion.

## Data Layer

- [ ] **Replace Hardcoded Data with Mock Service:** Create a mock service that simulates a full API, not just data fetching. It should handle data manipulation operations (e.g., adding, assigning, updating tickets) and return JSON data, replacing hardcoded lists and logic within components. This will prepare the application for a future transition to a real C# client.

- [ ] **Implement Robust API Updates:** Refactor all store actions that perform data mutations (e.g., `addComment`, `updateTicketStatus`) to handle potential API failures. Implement a `try...catch` block for optimistic updates to roll back the local state and inform the user if a network call fails.