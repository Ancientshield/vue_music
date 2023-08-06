import { setActivePinia, createPinia } from 'pinia';
import useUserStore from './../../stores/user.js';
import { describe } from 'vitest';

describe('stores', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('authenticiates user', async () => {
    const store = useUserStore();

    await expect(store.userLoggedIn).not.toBe(true);
    store.authenticate({});
    await expect(store.userLoggedIn).toBe(true);
  });
});
