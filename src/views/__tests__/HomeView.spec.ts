import { mount, RouterLinkStub } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import HomeView from '../HomeView.vue'
import { beforeEach, describe, it, expect } from 'vitest'

describe('HomeView.vue', () => {
  const createMockPinia = () => {
    return createTestingPinia({
      initialState: {
        tickets: {
          tickets: [
            { id: 1, title: 'Active Ticket', status: 'Open', isArchived: false },
            { id: 2, title: 'Archived Ticket', status: 'Closed', isArchived: true },
          ],
        },
      },
    })
  }

  it('displays active tickets when filter is active', () => {
    const wrapper = mount(HomeView, {
      props: {
        filter: 'active',
      },
      global: {
        plugins: [createMockPinia()],
        stubs: { RouterLink: RouterLinkStub },
      },
    })

    expect(wrapper.text()).toContain('Active Ticket')
    expect(wrapper.text()).not.toContain('Archived Ticket')
  })

  it('displays archived tickets when filter is archive', () => {
    const wrapper = mount(HomeView, {
      props: {
        filter: 'archive',
      },
      global: {
        plugins: [createMockPinia()],
        stubs: { RouterLink: RouterLinkStub },
      },
    })

    expect(wrapper.text()).not.toContain('Active Ticket')
    expect(wrapper.text()).toContain('Archived Ticket')
  })
})
