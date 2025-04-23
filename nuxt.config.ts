/// <reference types="nuxt" />

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/supabase",
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@nuxt/icon",
    "@nuxtjs/google-fonts",
  ],
  googleFonts: {
    families: {
      Montserrat: true,
    },
  },
  build: {
    transpile: ["@supabase/ssr", "cookie"],
  },
  vite: {
    optimizeDeps: {
      include: ["cookie"],
    },
  },
  runtimeConfig: {
    public: {
      supabase: {
        redirect: false,
      },
    },
  },
});