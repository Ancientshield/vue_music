import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import VeeValidatePlugin from './includes/validation.js';
import './includes/firebase.js';

import './assets/base.css';
import './assets/main.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VeeValidatePlugin);

app.mount('#app');
