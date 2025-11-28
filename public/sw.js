/// <reference lib="webworker" />

const CACHE_VERSION = 'v2';
const CACHE_NAME = 'advisor-portal-' + CACHE_VERSION;
const STATIC_CACHE_NAME = 'advisor-static-' + CACHE_VERSION;
const DYNAMIC_CACHE_NAME = 'advisor-dynamic-' + CACHE_VERSION;

// Base path for GitHub Pages (will be set during SW registration)
// For now, detect from location
const BASE_PATH = self.location.pathname.replace('/sw.js', '') || '';

// Static assets to cache on install
const STATIC_ASSETS = [
  BASE_PATH + '/',
  BASE_PATH + '/manifest.json',
  BASE_PATH + '/offline.html',
  BASE_PATH + '/favicon.png'
];

// Notification type configuration
const NOTIFICATION_CONFIG = {
  message: {
    icon: '💬',
    color: '#3B82F6',
    defaultAction: '/messages'
  },
  consultation: {
    icon: '📅',
    color: '#8B5CF6',
    defaultAction: '/consultations'
  },
  payment: {
    icon: '💰',
    color: '#10B981',
    defaultAction: '/payments'
  },
  alert: {
    icon: '⚠️',
    color: '#F59E0B',
    defaultAction: '/'
  },
  update: {
    icon: '🔔',
    color: '#6366F1',
    defaultAction: '/notifications'
  }
};

// Assets to cache on first fetch
const CACHE_FIRST_PATTERNS = [
  /\.(js|css|woff2?|ttf|eot|svg|png|jpg|jpeg|gif|ico)$/,
  /fonts\./
];

// Network first patterns (API calls, dynamic content)
const NETWORK_FIRST_PATTERNS = [
  /\/api\//,
  /supabase/
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    })
  );
  // Activate immediately
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => {
            return name !== STATIC_CACHE_NAME && 
                   name !== DYNAMIC_CACHE_NAME &&
                   name.startsWith('advisor-');
          })
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
  );
  // Claim all clients immediately
  self.clients.claim();
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Network first for API calls
  if (NETWORK_FIRST_PATTERNS.some((pattern) => pattern.test(url.href))) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Cache first for static assets
  if (CACHE_FIRST_PATTERNS.some((pattern) => pattern.test(url.pathname))) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Stale while revalidate for HTML pages
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  // Default: network first
  event.respondWith(networkFirst(request));
});

// Cache first strategy
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(STATIC_CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('[SW] Cache first fetch failed:', error);
    return new Response('Offline', { status: 503 });
  }
}

// Network first strategy
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    console.error('[SW] Network first failed:', error);
    return new Response('Offline', { status: 503 });
  }
}

// Stale while revalidate strategy
async function staleWhileRevalidate(request) {
  const cached = await caches.match(request);
  
  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) {
      const cache = caches.open(DYNAMIC_CACHE_NAME);
      cache.then((c) => c.put(request, response.clone()));
    }
    return response;
  }).catch(() => {
    // Return offline page for HTML requests
    return caches.match(BASE_PATH + '/offline.html');
  });

  return cached || fetchPromise;
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData());
  }
});

async function syncData() {
  console.log('[SW] Background sync triggered');
  // Implementation for syncing offline data
}

// Push notifications - enhanced
self.addEventListener('push', (event) => {
  if (!event.data) return;

  let data;
  try {
    data = event.data.json();
  } catch (e) {
    // If JSON parsing fails, treat as plain text
    data = {
      title: 'New Notification',
      body: event.data.text(),
      type: 'update'
    };
  }

  const type = data.type || 'update';
  const config = NOTIFICATION_CONFIG[type] || NOTIFICATION_CONFIG.update;
  
  const options = {
    body: data.body || data.description || '',
    icon: BASE_PATH + '/favicon.png',
    badge: BASE_PATH + '/favicon.png',
    vibrate: [100, 50, 100],
    tag: data.tag || `notification-${Date.now()}`,
    renotify: data.renotify || false,
    requireInteraction: data.requireInteraction || type === 'alert',
    silent: data.silent || false,
    timestamp: data.timestamp || Date.now(),
    data: {
      url: data.url || BASE_PATH + config.defaultAction,
      type: type,
      id: data.id,
      familyId: data.familyId,
      consultationId: data.consultationId
    },
    actions: data.actions || getDefaultActions(type)
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'RE:Advisor', options)
  );
});

// Get default actions based on notification type
function getDefaultActions(type) {
  switch (type) {
    case 'message':
      return [
        { action: 'reply', title: 'Reply', icon: BASE_PATH + '/icons/reply.png' },
        { action: 'view', title: 'View', icon: BASE_PATH + '/icons/view.png' }
      ];
    case 'consultation':
      return [
        { action: 'join', title: 'Join', icon: BASE_PATH + '/icons/join.png' },
        { action: 'reschedule', title: 'Reschedule', icon: BASE_PATH + '/icons/calendar.png' }
      ];
    case 'payment':
      return [
        { action: 'view', title: 'View Details', icon: BASE_PATH + '/icons/view.png' }
      ];
    default:
      return [];
  }
}

// Notification click handler - enhanced
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const data = event.notification.data || {};
  let url = data.url || BASE_PATH + '/';

  // Handle action clicks
  if (event.action) {
    switch (event.action) {
      case 'reply':
        url = `${BASE_PATH}/messages?reply=${data.id}`;
        break;
      case 'join':
        url = data.meetingLink || `${BASE_PATH}/consultations/${data.consultationId}`;
        break;
      case 'reschedule':
        url = `${BASE_PATH}/consultations?reschedule=${data.consultationId}`;
        break;
      case 'view':
      default:
        // Use default URL
        break;
    }
  }

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Try to find an existing window/tab
      for (const client of clientList) {
        if (client.url.includes(BASE_PATH) && 'focus' in client) {
          client.postMessage({
            type: 'NOTIFICATION_CLICK',
            data: data,
            action: event.action
          });
          return client.focus().then(() => {
            if ('navigate' in client) {
              return client.navigate(url);
            }
          });
        }
      }
      // If no existing window, open a new one
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});

// Handle notification close
self.addEventListener('notificationclose', (event) => {
  const data = event.notification.data || {};
  
  // Track notification dismissal for analytics
  console.log('[SW] Notification dismissed:', data.type, data.id);
});

// Message handler for communication with main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((name) => caches.delete(name))
        );
      })
    );
  }

  // Handle notification permission granted
  if (event.data && event.data.type === 'PUSH_SUBSCRIPTION_CHANGE') {
    console.log('[SW] Push subscription changed');
  }

  // Handle test notification request
  if (event.data && event.data.type === 'TEST_NOTIFICATION') {
    self.registration.showNotification('Test Notification', {
      body: 'Push notifications are working correctly!',
      icon: BASE_PATH + '/favicon.png',
      badge: BASE_PATH + '/favicon.png',
      vibrate: [100, 50, 100],
      tag: 'test-notification',
      data: { url: BASE_PATH + '/notifications' }
    });
  }
});

// Periodic background sync for checking updates
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'check-notifications') {
    event.waitUntil(checkForNewNotifications());
  }
});

async function checkForNewNotifications() {
  // This would normally check with the server for new notifications
  console.log('[SW] Checking for new notifications...');
}
