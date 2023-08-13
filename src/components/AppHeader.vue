<template>
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link
        class="text-white font-bold uppercase text-2xl mr-4"
        :to="{ name: 'home' }"
        exact-active-class="no-active"
      >
        Music
      </router-link>
      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- <li>
            <router-link class="px-2 text-white" to="/about">About</router-link>
          </li> -->
          <!-- Navigation Links -->
          <li v-if="!userStore.userLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal">
              Login / Register
            </a>
          </li>
          <template v-else>
            <li>
              <router-link class="px-2 text-white" :to="{ name: 'manage' }">Manage</router-link>
            </li>
            <li>
              <!-- <a class="px-2 text-white" href="#" @click.prevent="userStore.signOut">Logout</a> -->
              <a class="px-2 text-white" href="#" @click.prevent="signOut">Logout</a>
            </li>
          </template>
        </ul>
        <ul class="ml-auto">
          <li>
            <a class="px-2 text-white" herf="#" @click.prevent="changeLocale">
              {{ currentLocale }}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
<script>
import { mapStores } from 'pinia';
import useModalStore from '@/stores/modal.js';
import useUserStore from '@/stores/user.js';

export default {
  name: 'AppHeader',
  computed: {
    ...mapStores(useModalStore, useUserStore),
    currentLocale() {
      return this.$i18n.locale === 'fr' ? 'French' : 'English';
    },
  },
  methods: {
    toggleAuthModal() {
      // 因為在 modal.js，Pinia 的 defineStore() id 為 'modal'，
      // 所以這裡的方法指向的物件被自動命名為 'modalStore'。
      this.modalStore.isOpen = !this.modalStore.isOpen;
      console.log(this.modalStore.isOpen);
    },
    signOut() {
      this.userStore.signOut();
      // console.log(this.$route);
      // if (this.$route.name === 'manage') {
      if (this.$route.meta.requiresAuth) {
        this.$router.push({ name: 'home' });
      }
    },
    changeLocale() {
      this.$i18n.locale = this.$i18n.locale == 'fr' ? 'en' : 'fr';
    },
  },
};
</script>
