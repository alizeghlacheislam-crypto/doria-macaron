/* Dori Yums — minimal service worker (offline-first caching) */
var CACHE = 'doriyums-v8';
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
  'logo.png',
  'manifest.webmanifest',
  'images/m-rose.png',
  'images/m-pistachio.png',
  'images/m-chocolate.png',
  'images/m-vanilla.png',
  'images/m-lemon.png',
  'images/m-orange.png'
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
