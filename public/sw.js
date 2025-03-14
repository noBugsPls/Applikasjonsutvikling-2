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
  console.log("[Service Worker] Install");
  event.waitUntil(
    (async () => {
      const cache = await caches.open(cacheID);
      console.log("[Service Worker] Caching all: app shell and content");

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
  if(url.pathname === "/patterns"){
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match("/offline.html");
  }));
  return;
}


  event.respondWith(
    (async () => {
      const r = await caches.match(event.request);
      console.log(`[Service Worker] Fetching resource: ${event.request.url}`);
      if (r) {
        return r;
      }
      const response = await fetch(event.request);
      const cache = await caches.open(cacheID);
      console.log(`[Service Worker] Caching new resource: ${event.request.url}`);
      cache.put(event.request, response.clone());

      if (!response.ok) {
        return caches.match("/offline.html");
      }

      return response;
    })()
  );
});

self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activate");

  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      const cachesToDelete = cacheNames.filter((cacheName) => cacheName !== cacheID);

      await Promise.all(
        cachesToDelete.map((cacheName) => {
          console.log(`[Service Worker] Deleting cache: ${cacheName}`);
          return caches.delete(cacheName);
        })
      );

      console.log(`[Service Worker] Keeping cache: ${cacheID}`);

      await self.clients.claim();
      console.log("[Service Worker] Claimed clients");
    })()
  );
});
