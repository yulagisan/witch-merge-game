/* Service worker for 魔女の薬草工房 (PWA export, cache v4).
   Scope is relative ("."), so it works under a GitHub Pages project
   URL like https://<user>.github.io/<repo>/ as well as at a domain root.
   Google Fonts is deliberately NOT cached: first load needs network,
   offline it falls back to the system font stack already in index.html. */
var CACHE = "witch-atelier-pwa-v4";
var ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-512-maskable.png",
  "./banner.webp",
  "./merge.mp3",
  "./harvest.mp3",
  "./bgm.mp3",
  "./stage01.png",
  "./stage02.png",
  "./stage03.png",
  "./stage04.png",
  "./stage05.png",
  "./stage06.png",
  "./stage07.png",
  "./stage08.png",
  "./stage09.png",
  "./stage10.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) { return cache.addAll(ASSETS); })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    })
  );
});

self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(function (hit) {
      return hit || fetch(event.request);
    })
  );
});
