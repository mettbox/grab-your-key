import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Grab Your Key',
        short_name: 'GYK',
        description: 'A circle of fifths app for musicians',
        theme_color: '#181c20',
        icons: [
          {
            src: '/icons/48.png',
            sizes: '48x48',
            type: 'image/png',
          },
          {
            src: '/icons/72.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: '/icons/96.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: '/icons/128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: '/icons/144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: '/icons/152.png',
            sizes: '152x152',
            type: 'image/png',
          },
          {
            src: '/icons/167.png',
            sizes: '167x167',
            type: 'image/png',
          },
          {
            src: '/icons/1024.png',
            sizes: '1024x1024',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) =>
              request.destination === 'document' ||
              request.destination === 'script' ||
              request.destination === 'style' ||
              request.destination === 'image' ||
              request.destination === 'font',
            handler: 'CacheFirst',
            options: {
              cacheName: 'assets-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
        ],
        // Ignore all API requests
        navigateFallback: '/index.html',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
