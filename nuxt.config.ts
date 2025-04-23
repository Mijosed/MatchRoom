/// <reference types="nuxt" />

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    modules: [
      '@nuxtjs/supabase',
      '@nuxtjs/tailwindcss',
      '@vite-pwa/nuxt'
    ],
    pwa: {
      manifest: {
        name: 'MatchRoom',
        short_name: 'MatchRoom',
        description: 'MatchRoom Application',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        navigateFallback: '/',
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true
      },
      client: {
        installPrompt: true,
        periodicSyncForUpdates: 20
      },
      devOptions: {
        enabled: true,
        type: 'module'
      }
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
    }
})