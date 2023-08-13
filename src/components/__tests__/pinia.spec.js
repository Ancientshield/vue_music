import { setActivePinia, createPinia } from 'pinia';
import useUserStore from './../../stores/user.js';

vi.mock('../../includes/firebase.js', () => ({
  auth: {
    signInWithEmailAndPassword: () => Promise.resolve(),
  },
}));

describe('stores', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('authenticates user', async () => {
    const store = useUserStore();

    expect(store.userLoggedIn).not.toBe(true);
    await store.authenticate({});
    expect(store.userLoggedIn).toBe(true);
  });
});
