import { defineStore } from 'pinia';
import { auth, usersCollection } from '@/includes/firebase.js';

export default defineStore('user', {
  state: () => ({
    userLoggedIn: false,
  }),
  // 不一定要用影片的 code，用下面自己寫的也可。
  // state: () => {
  //   return { userLoggedIn: false };
  // },
  actions: {
    async register(values) {
      const userCredential = await auth.createUserWithEmailAndPassword(
        values.email,
        values.password,
      );

      await usersCollection.doc(userCredential.user.uid).set({
        name: values.name,
        email: values.email,
        age: values.age,
        country: values.country,
      });

      await userCredential.user.updateProfile({
        displayName: values.name,
      });

      this.userLoggedIn = true;
    },
    async authenticate(values) {
      await auth.signInWithEmailAndPassword(values.email, values.password);

      this.userLoggedIn = true;
    },
  },
});
