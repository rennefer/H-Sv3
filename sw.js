// Kill-switch service worker: replaces the old cache-first worker from the
// previous site that lived at this same path. Any browser that already has
// that old worker registered will pick this file up as an "update" the next
// time it loads a page in this scope, then this worker wipes all its caches
// and unregisters itself so the browser goes back to normal networking and
// reloads the real, current page instead of a frozen cached copy.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((name) => caches.delete(name)));
      await self.registration.unregister();
      const clientsList = await self.clients.matchAll({ type: 'window' });
      for (const client of clientsList) {
        client.navigate(client.url);
      }
    })()
  );
});
