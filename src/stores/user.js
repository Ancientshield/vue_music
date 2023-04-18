import { defineStore } from 'pinia';

export default defineStore('user', {
  state: () => {
    return { userLoggedIn: false };
  },
  // state: () => ({
  //   userLoggedIn: false,
  // }),
});
