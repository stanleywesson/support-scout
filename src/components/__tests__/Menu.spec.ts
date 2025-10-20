import { mount, RouterLinkStub } from '@vue/test-utils'
import AppMenu from '../AppMenu.vue'

describe('AppMenu.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(AppMenu, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })
  })

  it('renders the "All Tickets" navigation link', () => {
    expect(wrapper.text()).toContain('Support Scout')
    expect(wrapper.text()).toContain('Active Tickets')
    expect(wrapper.text()).toContain('Archived')
  })
})
