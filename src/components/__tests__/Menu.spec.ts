import { mount, RouterLinkStub } from '@vue/test-utils';
import Menu from '../Menu.vue';


describe('Menu.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(Menu, {
            global: {
                stubs: {
                    RouterLink: RouterLinkStub
                }
            }
        })
    })

    it('renders the "All Tickets" navigation link', () => {
        expect(wrapper.text()).toContain('Support Scout');
        expect(wrapper.text()).toContain('Active Tickets');
        expect(wrapper.text()).toContain('Archived');
    })
})