import { defineStore } from 'pinia';
import { auth, usersCollection } from '@/includes/firebase.js';

export default defineStore('user', {
  state: () => {
    return { userLoggedIn: false };
  },
  // 不一定要用影片中的 code，用上面自己寫的也可。
  // state: () => ({
  //   userLoggedIn: false,
  // }),
  actions: {
    async register(values) {
      await auth.createUserWithEmailAndPassword(values.email, values.password);

      await usersCollection.add({
        name: values.name,
        email: values.email,
        age: values.age,
        country: values.country,
      });

      this.userLoggedIn = true;
    },
  },
});
