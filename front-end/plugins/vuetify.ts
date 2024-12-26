import { createVuetify } from 'vuetify';
import { defineNuxtPlugin } from '#app';
import 'vuetify/styles'; // Import des styles Vuetify
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'; // Icônes Material Design

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'light',
    },
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
