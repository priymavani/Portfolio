const CACHE_NAME = 'portfolio-v1';

// Assets to cache on install
const PRECACHE_ASSETS = [
    '/',
    '/favicon.png',
    '/profile-cutout.png',
];

// Install — precache core assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(PRECACHE_ASSETS);
        })
    );
    self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        })
    );
    self.clients.claim();
});

// Fetch — network-first strategy with cache fallback
self.addEventListener('fetch', (event) => {
    const { request } = event;

    // Skip non-GET requests and API calls
    if (request.method !== 'GET') return;
    if (request.url.includes('/api/')) return;

    event.respondWith(
        fetch(request)
            .then((response) => {
                // Cache successful responses
                if (response.ok) {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, responseClone);
                    });
                }
                return response;
            })
            .catch(() => {
                // Fallback to cache if offline
                return caches.match(request).then((cachedResponse) => {
                    if (cachedResponse) return cachedResponse;
                    // For navigation requests, return cached homepage
                    if (request.mode === 'navigate') {
                        return caches.match('/');
                    }
                });
            })
    );
});
