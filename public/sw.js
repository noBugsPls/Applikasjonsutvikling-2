const cacheID = "KnittingPatternsV1";
const contentToCache = [
  "/index.html",
  "/icons/knitting_small.png",
  "/icons/knitting_big.png",
  "/images/Strikkemonster_Logo.png",
  "/css/style.css",
  "/offline.html",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(cacheID);

      await cache.addAll(contentToCache);
    })()
  );

  self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  if (!(event.request.url.startsWith("http:") || event.request.url.startsWith("https:"))) {
    return;
  }

  if (event.request.method !== "GET") {
    event.respondWith(fetch(event.request));
    return;
  }

  const url = new URL(event.request.url);
  if (url.pathname === "/patterns") {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match("/offline.html");
      })
    );
    return;
  }

  event.respondWith(
    (async () => {
      const r = await caches.match(event.request);
      if (r) {
        return r;
      }
      const response = await fetch(event.request);
      const cache = await caches.open(cacheID);
      cache.put(event.request, response.clone());

      if (!response.ok) {
        return caches.match("/offline.html");
      }

      return response;
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      const cachesToDelete = cacheNames.filter((cacheName) => cacheName !== cacheID);

      await Promise.all(
        cachesToDelete.map((cacheName) => {
          return caches.delete(cacheName);
        })
      );

      await self.clients.claim();
    })()
  );
});
