/// <reference types="nuxt" />

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  components: true,
  css: ["~/assets/css/main.css"],
  
  modules: [
    "@nuxtjs/supabase",
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@nuxt/icon",
    "@nuxtjs/google-fonts",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
  ],

  googleFonts: {
    families: {
      Montserrat: true,
      "Bricolage Grotesque": true,
      Lato: true,
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

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    stripeSecretKey: process.env.NUXT_STRIPE_SECRET_KEY,

    public: {
      stripePublishableKey: process.env.NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      supabase: {
        redirect: false,
      },
    },
  },

  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },

  
});
