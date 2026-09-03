import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'prompt',
      // Das Manifest wird hier erzeugt; public/manifest.json entfällt.
      manifest: {
        name: 'ChemLearn',
        short_name: 'ChemLearn',
        description: 'Lernbegleiter fürs Studium: Theorie, Übung, Prüfungssimulation',
        start_url: '/',
        display: 'standalone',
        theme_color: '#0d9488',
        background_color: '#0f172a',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          // Maskable braucht Rand: Android beschneidet das Bild, und SVG
          // akzeptiert es dafür gar nicht.
          { src: '/icons/maskable-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
          { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Kursinhalte sind eigene Bündel und sollen mit in den Cache.
        globPatterns: ['**/*.{js,css,html,woff2,png,svg}'],
        navigateFallback: '/index.html',
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            // Schriften dürfen lange liegen bleiben.
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\//,
            handler: 'CacheFirst',
            options: { cacheName: 'schriften', expiration: { maxAgeSeconds: 60 * 60 * 24 * 365 } },
          },
          {
            /*
             * Supabase NICHT blind cachen.
             *
             * Der handgeschriebene Service Worker legte jede erfolgreiche GET-
             * Antwort ab, auch die des Fortschritts — und servierte sie später
             * als aktuellen Stand. Hier gilt: erst Netz, Cache nur als
             * Notnagel, und nach fünf Minuten ist er wertlos.
             */
            urlPattern: /\/rest\/v1\//,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'supabase-lesen',
              networkTimeoutSeconds: 5,
              expiration: { maxEntries: 40, maxAgeSeconds: 300 },
              cacheableResponse: { statuses: [200] },
            },
          },
        ],
      },
      devOptions: { enabled: false },
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
})
