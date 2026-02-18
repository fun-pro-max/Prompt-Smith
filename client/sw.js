const CACHE_NAME = "promptsmith-cache-v1";

const urlsToCache = [
  "/",
  "/dashboard.html",
  "/builder.html",
  "/style.html",
  "/style.css",
  "/icon-192.png",
  "/icon-512.png"
];

// Install Service Worker
self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate Service Worker
self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

// Fetch from Cache First
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
