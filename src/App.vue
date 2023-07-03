<template>
  <!-- Header -->
  <app-header />

  <!-- distructure a v-slot properity for an Object called Component -->
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>

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

<style>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.5s linear;
}
.fade-leave-to {
  transition: all 0.5s linear;
  opacity: 0;
}
</style>
