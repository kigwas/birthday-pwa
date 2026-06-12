/**
 * BIRTHDAY CELEBRATION PWA - SERVICE WORKER
 * Handles offline functionality and caching
 */

const CACHE_NAME = 'birthday-celebration-pwa-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/app.js',
  '/manifest.json'
];

// Install event - cache files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fall back to network
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response if available
        if (response) {
          return response;
        }

        // Otherwise, fetch from network
        return fetch(event.request).then(response => {
          // Don't cache if not a success response
          if (!response || response.status !== 200) {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Cache successful responses for future use
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });

          return response;
        });
      })
      .catch(() => {
        // Return offline page or fallback if needed
        return new Response('Offline - Please check your connection', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({
            'Content-Type': 'text/plain'
          })
        });
      })
  );
});

// Background sync for future phases
self.addEventListener('sync', event => {
  if (event.tag === 'sync-data') {
    event.waitUntil(
      // Sync logic will be added in future phases
      Promise.resolve()
    );
  }
});

// Push notification handler for future phases
self.addEventListener('push', event => {
  if (event.data) {
    const options = {
      body: event.data.text(),
      icon: '/assets/icons/icon-192.png',
      badge: '/assets/icons/icon-192.png',
      tag: 'celebration-notification',
      requireInteraction: true
    };

    event.waitUntil(
      self.registration.showNotification('Birthday Celebration', options)
    );
  }
});

// Notification click handler
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});