import { shallowMount } from '@vue/test-utils';
import Home from '../../views/Home.vue';
import SongItem from '../SongItem.vue';

describe('Home.vue', () => {
  test('renders list of songs', () => {
    const songs = [{}, {}, {}];
    const component = shallowMount(Home, {
      data() {
        return {
          songs,
        };
      },
      global: {
        mocks: {
          $t: (msg) => msg,
        },
      },
    });
    const items = component.findAllComponents(SongItem);
    expect(items).toHaveLength(songs.length);
    items.forEach((wrapper, i) => {
      expect(wrapper.props().song).toStrictEqual(songs[i]);
    });
  });
});
