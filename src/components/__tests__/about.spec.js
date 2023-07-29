import About from '../../views/About.vue';
// import { mount } from '@vue/test-utils';
import { shallowMount } from '@vue/test-utils';

describe('About.vue', () => {
  test('renders inner text', () => {
    // const wrapper = mount(About);
    const wrapper = shallowMount(About);

    expect(wrapper.text()).toContain('about');
  });
});
