import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import VeeValidatePlugin from './includes/validation.js';
import { auth } from './includes/firebase.js';
import Icon from './directives/icon.js';
import i18n from './includes/i18n.js';

import './assets/base.css';
import './assets/main.css';

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);

    app.use(createPinia());
    app.use(router);
    app.use(VeeValidatePlugin);
    app.use(i18n);
    app.directive('icon', Icon);

    app.mount('#app');
  }
});
