// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "nuxt-icon",
    "nuxt-security",
  ],

  runtimeConfig: {
    public: {
      domain: "http://localhost:3000/",
    },
  },
});
