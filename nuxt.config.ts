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
    "@nuxtjs/leaflet",
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

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    public: {
      supabase: {
        redirect: false,
      },
    },
  },

  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
        }
      ],
      script: [
        {
          src: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
        }
      ]
    }
  }
});
