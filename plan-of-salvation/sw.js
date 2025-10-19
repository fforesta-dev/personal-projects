const CACHE_NAME = "plan-of-salvation-v3";
const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/styles.css",
    "/script.js",
    "/lang/en.json",
    "/lang/it.json",
    "/images/premortal-life.jpg",
    "/images/creation.jpg",
    "/images/the-fall.jpg",
    "/images/earth-life.jpg",
    "/images/spirit-world.jpg",
    "/images/resurrection.jpg",
    "/images/kingdoms.jpg",
    "/images/eternal-life.jpg",
    "/images/flag-us.png",
    "/images/flag-it.png",
    "/images/icon-192.png",
    "/images/icon-512.png"
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
        caches.keys().then((keyList) =>
            Promise.all(
                keyList.map((key) => {
                    if (key !== CACHE_NAME) return caches.delete(key);
                })
            )
        )
    );
    self.clients.claim();
});

// ---- FETCH ----
self.addEventListener("fetch", (evt) => {
    evt.respondWith(
        caches.match(evt.request).then((response) => {
            return (
                response ||
                fetch(evt.request).catch(() => {
                    return new Response("Offline content not available.", {
                        status: 200,
                        headers: { "Content-Type": "text/plain" }
                    });
                })
            );
        })
    );
});

// ---- UPDATE DETECTION ----
self.addEventListener("message", (evt) => {
    if (evt.data === "skipWaiting") {
        self.skipWaiting();
    }
});
