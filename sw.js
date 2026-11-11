// Offline support. Serves from cache first and refreshes the cache in the background,
// so a new deploy shows up on the launch after next without bumping any version.
const CACHE = 'mathespeed';
const FILES = ['./','index.html','css/style.css','js/util.js','js/explain.js','js/stories.js','js/money.js','js/topics.js','js/blitz-data.js','js/rewards.js','js/state.js','js/fx.js','js/views.js','js/session.js','js/blitz.js','js/album.js','js/parents.js','js/pwa.js','js/main.js','manifest.webmanifest','icons/icon.svg','icons/icon-192.png','icons/icon-512.png','icons/apple-touch-icon.png'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  e.respondWith(caches.open(CACHE).then(async c => {
    const hit = await c.match(r, { ignoreSearch: true });
    const net = fetch(r, { cache: 'no-cache' }).then(res => { if (res.ok) c.put(r, res.clone()); return res; }).catch(() => hit);
    if (hit) e.waitUntil(net);
    return hit || net;
  }));
});
