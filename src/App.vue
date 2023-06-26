<template>
  <!-- Header -->
  <app-header />

  <router-view></router-view>

  <!-- Player -->
  <app-player />

  <!-- Auth Modal -->
  <auth />
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import Auth from '@/components/Auth.vue';
import { mapWritableState } from 'pinia';
import useUserStore from '@/stores/user.js';
import { auth } from './includes/firebase.js';
import AppPlayer from './components/Player.vue';

// 舊的寫法在 template 中，要用 html 小寫 <app-header />，不能用 <AppHeader>。
export default {
  name: 'App',
  components: { AppHeader, Auth, AppPlayer },
  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn']),
  },
  created() {
    if (auth.currentUser) {
      this.userLoggedIn = true;
    }
  },
};
</script>

<style></style>
