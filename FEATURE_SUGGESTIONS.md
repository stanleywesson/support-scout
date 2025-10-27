# Standesk Feature Roadmap

This document outlines the development plan for the Standesk application, organized by priority. Focus is on building practical features that enhance learning while creating a polished, production-ready application.

## Phase 1: Build the Foundation ✅ COMPLETED

**Objective:** Decouple the UI from hardcoded data by creating a mock API layer.

- [x] **Create a Mock API Service:**
    - [x] Establish a new `src/api` directory.
    - [x] Develop a `mockApi.ts` service to manage data (tickets, agents) in memory.
    - [x] Expose functions that simulate real API calls (`getTickets`, `addTicket`, etc.), returning Promises.
- [x] **Refactor Pinia Stores:**
    - [x] Update all stores to fetch and manipulate data by calling the mock API service instead of using hardcoded values.

## Phase 2: Core Ticketing Features (Mostly Complete)

**Objective:** Build out the essential features for managing tickets.

- [x] **Implement Full Ticket Lifecycle:**
    - [x] Allow agents to update a ticket's status, priority, and assigned agent from the `TicketView`.
- [x] **Add Comments/Discussion:**
    - [x] Create a component to display comments on a ticket.
    - [x] Add a form to allow users to add new comments.
- [ ] **Implement Ticket Filtering and Sorting:** ⭐ HIGH PRIORITY
    - [ ] Add dropdown filters for: Status (Open/In Progress/Closed), Priority (Low/Medium/High/Urgent), Agent
    - [ ] Add sort options: Creation Date (newest/oldest), Priority (high to low, low to high)
    - [ ] Display active filter/sort selections with clear buttons
    - **Learning focus:** Computed properties, array methods (filter, sort), reactive state
    - **Estimated time:** 2-3 hours
- [ ] **Add Ticket Search:** ⭐ HIGH PRIORITY
    - [ ] Search bar that filters tickets by title or description
    - [ ] Implement debouncing (wait 300ms after user stops typing)
    - [ ] Show "No results found" message when search returns nothing
    - [ ] Works in combination with filters above
    - **Learning focus:** Reactive search, debouncing, VueUse library
    - **Estimated time:** 1-2 hours

## Phase 3: Polish & Production Readiness

**Objective:** Address technical debt and improve user experience.

### Critical Fixes (Do These First)

- [ ] **Fix Priority 0 Technical Debt** ⚠️ CRITICAL
    - [ ] Add error handling to all store mutations with try-catch
    - [ ] Show toast notifications on errors
    - [ ] Replace type assertions with proper type guards
    - [ ] Fix test bugs in `tickets.spec.ts:18` and `:26`
    - **Reference:** See TECHNICAL_DEBT.md Priority 0 section
    - **Estimated time:** 4-6 hours

### User Experience Improvements

- [ ] **Separate Loading States**
    - [ ] Create `loadingTickets`, `loadingAgents`, `loadingMutations` refs
    - [ ] Show specific loading messages ("Loading tickets...", "Saving changes...")
    - [ ] Add spinner icons to action buttons during operations
    - **Learning focus:** Better state management, loading UI patterns
    - **Estimated time:** 2-3 hours

- [ ] **Input Validation**
    - [ ] Add validation to AddTicketForm (title: 3-200 chars, description: 10-2000 chars)
    - [ ] Show inline error messages for invalid input
    - [ ] Disable submit button until form is valid
    - [ ] Prevent duplicate agent names in AgentManager
    - **Learning focus:** Form validation, computed properties, validation libraries
    - **Estimated time:** 2-3 hours

- [ ] **Bulk Actions**
    - [ ] Add checkboxes to ticket table rows
    - [ ] "Select All" checkbox in header
    - [ ] Bulk actions toolbar: Assign Agent, Change Status, Archive (when all closed)
    - [ ] Show count of selected tickets
    - **Learning focus:** Complex state management, array operations
    - **Estimated time:** 3-4 hours

## Phase 4: Dashboard & Analytics

**Objective:** Add visual data representation and insights.

- [ ] **Statistics Dashboard** ⭐ RECOMMENDED
    - [ ] Create new `DashboardView.vue` route at `/dashboard`
    - [ ] Show key metrics: Total tickets, Open tickets, Average resolution time, Tickets by priority
    - [ ] Add chart showing ticket status distribution (pie chart)
    - [ ] Add chart showing tickets created over time (line chart)
    - [ ] Show top agents by ticket count
    - **Learning focus:** Chart.js or similar library, data aggregation, computed properties
    - **Estimated time:** 4-6 hours

- [ ] **Ticket History/Audit Log**
    - [ ] Track all changes to a ticket (status changes, priority changes, agent assignments)
    - [ ] Display history timeline on TicketView
    - [ ] Show who made the change and when
    - **Learning focus:** Data modeling, timestamps, Vue transitions
    - **Estimated time:** 3-4 hours

## Phase 5: User Authentication (Simplified)

**Objective:** Add basic authentication to make the app feel more realistic.

- [ ] **Basic User Login** ⭐ RECOMMENDED
    - [ ] Create `Login.vue` page with username/password form
    - [ ] Create `src/api/authService.ts` with mock login (hardcoded users)
    - [ ] Create `src/stores/auth.ts` Pinia store for current user
    - [ ] Store auth token in localStorage
    - [ ] Add navigation guard to protect routes
    - [ ] Display logged-in user in app header with logout button
    - **Learning focus:** Vue Router guards, localStorage, authentication patterns
    - **Estimated time:** 3-5 hours

- [ ] **User Profile Page**
    - [ ] Create `/profile` route showing user info
    - [ ] Allow user to update their display name
    - [ ] Show user's assigned tickets
    - [ ] Show user's activity (comments, status changes)
    - **Learning focus:** More routing, forms, data filtering
    - **Estimated time:** 2-3 hours

## Phase 6: Nice-to-Have Features

**Objective:** Polish and additional functionality when core features are solid.

- [ ] **Export Tickets to CSV**
    - [ ] Add "Export" button to HomeView
    - [ ] Export currently filtered/visible tickets
    - [ ] Include all relevant fields
    - **Learning focus:** File generation, blob handling, browser download API
    - **Estimated time:** 1-2 hours

- [ ] **Dark Mode Toggle**
    - [ ] Add toggle in app header
    - [ ] Use Tailwind dark mode classes
    - [ ] Save preference to localStorage
    - **Learning focus:** CSS theming, localStorage persistence, Tailwind dark mode
    - **Estimated time:** 2-3 hours

- [ ] **Keyboard Shortcuts**
    - [ ] Press `n` to open new ticket modal
    - [ ] Press `?` to show keyboard shortcuts help
    - [ ] Press `/` to focus search bar
    - [ ] Press `Esc` to close modals
    - **Learning focus:** Event listeners, keyboard events, UX patterns
    - **Estimated time:** 2-3 hours

- [ ] **File Attachments (Mock)**
    - [ ] Add file upload to ticket creation and comments
    - [ ] Store files as base64 in mock API (or just file metadata)
    - [ ] Display attached files with download links
    - **Learning focus:** File handling, FileReader API, base64 encoding
    - **Estimated time:** 3-4 hours

- [ ] **Email Notification Simulation**
    - [ ] When ticket status changes, show toast: "Email sent to [user]"
    - [ ] Add notification preferences to user profile
    - [ ] Log simulated emails to browser console
    - **Learning focus:** Side effects, watchers, notification patterns
    - **Estimated time:** 1-2 hours

## Phase 7: Production Deployment

**Objective:** Make the application production-ready and publicly accessible.

- [ ] **Connect to Real Backend API** (Optional)
    - [ ] Replace mock API with real HTTP calls to your C# backend
    - [ ] Handle authentication tokens
    - [ ] Implement proper error handling for network failures
    - **Learning focus:** API integration, async patterns, error handling
    - **Estimated time:** 6-10 hours

- [ ] **Deploy to Production**
    - [ ] Set up build pipeline
    - [ ] Deploy to Netlify, Vercel, or GitHub Pages
    - [ ] Configure custom domain (optional)
    - [ ] Set up environment variables for production
    - **Learning focus:** DevOps basics, build tools, deployment
    - **Estimated time:** 2-4 hours

- [ ] **Add Analytics** (Optional)
    - [ ] Add Google Analytics or similar
    - [ ] Track user interactions (ticket created, status changed, etc.)
    - **Learning focus:** Analytics integration, tracking patterns
    - **Estimated time:** 1-2 hours

## 🎯 Recommended Order of Implementation

For optimal learning and progressive enhancement:

1. **Fix Priority 0 Technical Debt** (Do this first - foundation for everything else)
2. **Add Filtering & Sorting** (Makes the app actually usable)
3. **Add Search** (Complements filtering perfectly)
4. **Separate Loading States** (Better UX during operations)
5. **Input Validation** (Professional touch, important skill)
6. **Statistics Dashboard** (Fun, visual, impressive)
7. **Basic User Login** (Makes it feel like a real app)
8. **Bulk Actions** (Advanced feature, good challenge)
9. **Export to CSV** (Quick win, useful feature)
10. **Dark Mode** (Fun polish, looks great in portfolio)
11. **Deploy to Production** (Share your work!)

## 📝 Notes

- **Each feature builds on previous work** - don't skip phases
- **Fix technical debt as you go** - don't accumulate more issues
- **Write tests for new features** - practice TDD
- **Focus on completing features** - better to have 5 polished features than 15 half-done ones
- **This is a learning project** - prioritize features that teach new concepts

---

**Last Updated:** Based on code quality analysis - Focus on practical, production-ready features that enhance Vue.js learning.
