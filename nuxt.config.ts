/// <reference types="nuxt" />

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    modules: ['@nuxtjs/supabase', 'shadcn-nuxt', '@nuxtjs/color-mode'],
    colorMode: {
        classSuffix: '',
        preference: 'system',
        fallback: 'light',
        storageKey: 'nuxt-color-mode'
    },
    build: {
        transpile: ['@supabase/ssr', 'cookie']
    },
    vite: {
        optimizeDeps: {
            include: ['cookie']
        }
    },
    runtimeConfig: {
        public: {
            supabase: {
                redirect: false,
            }
        }
    },
    css: ['~/assets/css/main.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    shadcn: {
      /**
       * Prefix for all the imported component
       */
      prefix: '',
      /**
       * Directory that the component lives in.
       * @default "./components/ui"
       */
      componentDir: './components/ui'
    }
})