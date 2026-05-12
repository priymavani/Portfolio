const CACHE_NAME = 'Priy portfolio';

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

    // Skip non-GET requests (we only cache GET)
    if (request.method !== 'GET') return;
    
    // Skip browser extensions
    if (!request.url.startsWith('http')) return;

    event.respondWith(
        fetch(request)
            .then((response) => {
                // Cache successful responses (including /api/ and /_next/ assets)
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
                    return new Response(null, { status: 404 });
                });
            })
    );
});
