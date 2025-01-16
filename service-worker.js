const CACHE_NAME = 'fact-check-cache-v1';
const OFFLINE_URL = '/offline.html';

const urlsToCache = [
  '/',
  '/index.html',
  OFFLINE_URL,
  '/static/js/main.chunk.js',
  '/static/css/main.chunk.css',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Install event - кешуємо необхідні файли
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event - видаляємо старі кеші
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - перехоплюємо мережеві запити
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Повертаємо з кешу якщо знайдено
        if (response) {
          return response;
        }

        return fetch(event.request)
          .then((response) => {
            // Перевіряємо чи відповідь валідна
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Клонуємо відповідь
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Якщо офлайн і запит на сторінку
            if (event.request.mode === 'navigate') {
              return caches.match(OFFLINE_URL);
            }
          });
      })
  );
});