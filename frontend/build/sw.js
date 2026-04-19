const CACHE_NAME = 'bon-cafe-v1762108965776';
const STATIC_CACHE = 'static-v1762108965776';
const DYNAMIC_CACHE = 'dynamic-v1762108965776';
const IMAGE_CACHE = 'images-v1762108965776';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/default-avatar.svg'
];

// API endpoints to cache
const API_CACHE_PATTERNS = [
  /\/api\/menu/,
  /\/api\/branches/
];

// Image patterns to cache
const IMAGE_PATTERNS = [
  /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
  /\/media\/menu_photos\//
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Static assets cached');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Failed to cache static assets', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== IMAGE_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Handle different types of requests
  if (request.url.includes('/api/')) {
    event.respondWith(handleAPIRequest(request));
  } else if (IMAGE_PATTERNS.some(pattern => pattern.test(request.url))) {
    event.respondWith(handleImageRequest(request));
  } else {
    event.respondWith(handleStaticRequest(request));
  }
});

// Handle API requests with network-first strategy
async function handleAPIRequest(request) {
  const cacheName = DYNAMIC_CACHE;
  
  try {
    // Try network first
    const networkResponse = await fetch(request);
    
    // Cache successful responses for specific endpoints
    if (networkResponse.ok && shouldCacheAPI(request.url)) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Network failed, trying cache for', request.url);
    
    // Fallback to cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline fallback for API endpoints
    if (request.url.includes('/api/')) {
      return new Response(JSON.stringify({
        offline: true,
        message: 'You are currently offline'
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    throw error;
  }
}

// Handle image requests with cache-first strategy
async function handleImageRequest(request) {
  const cacheName = IMAGE_CACHE;
  
  // Try cache first
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    // Fetch from network
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache the image
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Failed to load image', request.url);
    
    // Return placeholder image
    return new Response(
      '<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f0f0f0"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#999">Image unavailable</text></svg>',
      { headers: { 'Content-Type': 'image/svg+xml' } }
    );
  }
}

// Handle static requests with cache-first strategy
async function handleStaticRequest(request) {
  const cacheName = STATIC_CACHE;
  
  // Try cache first
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    // Fetch from network
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache static assets
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Failed to load static asset', request.url);
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      const offlineResponse = await caches.match('/');
      if (offlineResponse) {
        return offlineResponse;
      }
    }
    
    throw error;
  }
}

// Check if API endpoint should be cached
function shouldCacheAPI(url) {
  return API_CACHE_PATTERNS.some(pattern => pattern.test(url));
}

// Enhanced background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    // Process any queued offline actions
    const offlineActions = await getOfflineActions();
    
    for (const action of offlineActions) {
      try {
        await processOfflineAction(action);
        await removeOfflineAction(action.id);
      } catch (error) {
        console.error('Service Worker: Failed to process offline action', error);
      }
    }
  } catch (error) {
    console.error('Service Worker: Background sync failed', error);
  }
}

// Enhanced utility functions for offline action queue
async function getOfflineActions() {
  try {
    const db = await openDB();
    const transaction = db.transaction(['offline-actions'], 'readonly');
    const store = transaction.objectStore('offline-actions');
    return await store.getAll();
  } catch (error) {
    console.error('Failed to get offline actions:', error);
    return [];
  }
}

async function processOfflineAction(action) {
  console.log('Processing offline action:', action);
  
  switch (action.type) {
    case 'contact-form':
      return await fetch('/api/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(action.data)
      });
      
    default:
      console.warn('Unknown offline action type:', action.type);
  }
}

async function removeOfflineAction(actionId) {
  try {
    const db = await openDB();
    const transaction = db.transaction(['offline-actions'], 'readwrite');
    const store = transaction.objectStore('offline-actions');
    await store.delete(actionId);
  } catch (error) {
    console.error('Failed to remove offline action:', error);
  }
}

// IndexedDB utilities
async function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('BonCafeDB', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      // Create offline actions store
      if (!db.objectStoreNames.contains('offline-actions')) {
        const store = db.createObjectStore('offline-actions', { keyPath: 'id', autoIncrement: true });
        store.createIndex('type', 'type', { unique: false });
        store.createIndex('timestamp', 'timestamp', { unique: false });
      }
    };
  });
}

async function getStoredData(storeName, key = null) {
  try {
    const db = await openDB();
    const transaction = db.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    
    if (key) {
      return await store.get(key);
    } else {
      return await store.getAll();
    }
  } catch (error) {
    console.error(`Failed to get stored data from ${storeName}:`, error);
    return null;
  }
}

async function removeStoredData(storeName, key) {
  try {
    const db = await openDB();
    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    await store.delete(key);
  } catch (error) {
    console.error(`Failed to remove stored data from ${storeName}:`, error);
  }
}

// Push notification handling
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'New notification from Bon Cafe',
    icon: '/default-avatar.svg',
    badge: '/default-avatar.svg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View',
        icon: '/default-avatar.svg'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/default-avatar.svg'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Bon Cafe', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked');
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Message handling from main thread
self.addEventListener('message', (event) => {
  console.log('Service Worker: Message received', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(DYNAMIC_CACHE)
        .then(cache => cache.addAll(event.data.urls))
    );
  }
});

console.log('Service Worker: Loaded');