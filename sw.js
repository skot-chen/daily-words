// Offline support: always try the network first (so new words show at once), fall back to the last saved copy.
// Only this site's own files are cached; GitHub API calls (notes sync) are never touched.
var CACHE = "daily-words-v1";
self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(["./", "data.json", "manifest.webmanifest", "icons/icon-192.png"]); })
    .catch(function () {}).then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(fetch(req).then(function (res) {
    if (res.ok) { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(req, copy); }); }
    return res;
  }).catch(function () {
    return caches.match(req, { ignoreSearch: req.mode === "navigate" }).then(function (r) { return r || caches.match("./"); });
  }));
});
