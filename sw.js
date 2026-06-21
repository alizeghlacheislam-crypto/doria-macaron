/* Dori Yums — minimal service worker (offline-first caching) */
var CACHE = 'doriyums-v10';
var ASSETS = [
  'Dori Yums.html',
  'app.js',
  'features.js',
  'features.css',
  'extras.js',
  'extras.css',
  'promo.js',
  'promo.css',
  'image-slot.js',
  'logo.webp',
  'manifest.webmanifest',
  'images/m-rose.webp',
  'images/m-pistachio.webp',
  'images/m-chocolate.webp',
  'images/m-vanilla.webp',
  'images/m-lemon.webp',
  'images/m-orange.webp',
  'images/m-banana.webp',
  'images/m-cherry.webp',
  'images/m-coconut.webp',
  'images/m-coconut-choc.webp',
  'images/m-pecan.webp',
  'images/m-strawberry.webp',
  'atelier-0.webp',
  'atelier-2.webp',
  'atelier-3.webp',
  'macarons_hero.webp'
];
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      return Promise.all(ASSETS.map(function (a) {
        return c.add(a).catch(function () {});
      }));
    })
  );
  self.skipWaiting();
});
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    })
  );
  self.clients.claim();
});
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(function (cached) {
      return cached || fetch(e.request).then(function (resp) {
        var copy = resp.clone();
        caches.open(CACHE).then(function (c) { c.put(e.request, copy).catch(function(){}); });
        return resp;
      }).catch(function () { return cached; });
    })
  );
});
