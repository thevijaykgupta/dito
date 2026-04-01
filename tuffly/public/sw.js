const CACHE_NAME = 'tuffly-v1';
const urlsToCache = [
  '/',
  '/categories',
  '/cart',
  '/orders',
  '/profile',
  '/help',
  '/manifest.json',
  '/images/products/logo_trans.jpg',
  '/images/products/chips.jpg',
  '/images/products/buiscuits.jpeg',
  '/images/products/chocolates.jpeg',
  '/images/products/cold-drinks.jpeg',
  '/images/products/energy-drinks.jpeg',
  '/images/products/noodles.jpeg',
  '/images/products/arduino.jpg',
  '/images/products/notebook.jpg',
  '/images/products/ultrasonicsensors.jpeg',
  '/images/products/socks.jpg',
  '/images/products/crocs.jpg',
  '/images/products/tshirts.jpg',
  '/images/products/jeans.jpg',
  '/images/products/sneakers.jpg',
  '/images/products/hoodies.jpg',
  '/patterns/circuit-pattern.svg',
  '/patterns/card-pattern.svg'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Push notification event
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New product available!',
    icon: '/images/products/logo_trans.jpg',
    badge: '/images/products/logo_trans.jpg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Products',
        icon: '/images/products/logo_trans.jpg'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/images/products/logo_trans.jpg'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Tuffly', options)
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/categories')
    );
  }
}); 