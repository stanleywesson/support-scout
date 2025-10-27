# GEMINI.md

## Project Overview

This is a Vue.js 3 project named "Support Scout," a support ticket management application. It is built with Vite and uses TypeScript for static typing. 

Key technologies used:
- **Framework:** Vue.js 3
- **Build Tool:** Vite
- **Language:** TypeScript
- **State Management:** Pinia
- **Routing:** Vue Router
- **Styling:** Tailwind CSS
- **Testing:** Vitest for unit tests and Cypress for end-to-end tests.
- **Linting:** ESLint
- **Formatting:** Prettier

The application is also configured as a Progressive Web App (PWA).

## Building and Running

### Installation

```sh
pnpm install
```

### Development

To run the development server with hot-reloading:

```sh
pnpm run dev
```

### Building for Production

To compile and minify for production:

```sh
pnpm run build
```

### Previewing the Production Build

To preview the production build locally:

```sh
pnpm run preview
```

### Testing

To run unit tests:

```sh
pnpm run test:unit
```

To run end-to-end tests:

```sh
pnpm run test:e2e
```

### Linting and Formatting

To lint the code:

```sh
pnpm run lint
```

To format the code:

```sh
pnpm run format
```

## Development Conventions

- **Component-Based Architecture:** The application is built using Vue's single-file components (`.vue` files).
- **TypeScript:** All new code should be written in TypeScript to maintain type safety.
- **State Management:** Global application state is managed using Pinia. The main store is located at `src/stores/tickets.ts`.
- **Routing:** Application routes are defined in `src/router/index.ts`.
- **Styling:** Utility-first CSS with Tailwind CSS is the preferred way to style components.
- **Testing:** 
  - Unit tests for components and stores should be created in `__tests__` directories.
  - End-to-end tests are located in the `cypress/e2e` directory.
- **API Interaction:** The application interacts with a mock API defined in `src/api/mockApi.ts`.
