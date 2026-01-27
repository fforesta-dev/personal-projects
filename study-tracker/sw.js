const CACHE_NAME = "study-tracker-v1";
const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/styles.css",
    "/script.js"
];

// ---- INSTALL ----
self.addEventListener("install", (evt) => {
    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
    );
    self.skipWaiting();
});

// ---- ACTIVATE ----
self.addEventListener("activate", (evt) => {
    evt.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((cacheName) => cacheName !== CACHE_NAME)
                    .map((cacheName) => caches.delete(cacheName))
            );
        })
    );
    self.clients.claim();
});

// ---- FETCH ----
self.addEventListener("fetch", (evt) => {
    if (evt.request.method !== "GET") return;

    evt.respondWith(
        caches.match(evt.request).then((response) => {
            if (response) return response;
            return fetch(evt.request)
                .then((response) => {
                    if (!response || response.status !== 200 || response.type !== "basic") {
                        return response;
                    }
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(evt.request, responseToCache);
                    });
                    return response;
                })
                .catch(() => {
                    return caches.match("/index.html");
                });
        })
    );
});
