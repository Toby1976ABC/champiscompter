/* ChampisCompter — service worker : l'application reste utilisable sans réseau.
   Changer VERSION à chaque mise en ligne d'une nouvelle version. */
const VERSION = "champiscompter-2.1.0";
const FICHIERS = ["./", "index.html", "manifest.webmanifest",
  "icons/logo.png", "icons/icon-192.png", "icons/icon-512.png",
  "icons/icon-maskable-512.png", "icons/apple-touch-icon.png", "icons/favicon-32.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FICHIERS)));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(n => n !== VERSION).map(n => caches.delete(n))))
    .then(() => self.clients.claim()));
});
self.addEventListener("message", e => { if (e.data === "activer") self.skipWaiting(); });
self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.method !== "GET" || new URL(r.url).origin !== location.origin) return;
  if (r.mode === "navigate") {
    // page : copie locale tout de suite (rapide même sans réseau en salle),
    // rafraîchie en arrière-plan pour la prochaine ouverture
    e.respondWith(caches.open(VERSION).then(c => c.match("index.html").then(m => {
      const net = fetch(r).then(rep => { if (rep.ok) c.put("index.html", rep.clone()); return rep; });
      net.catch(() => {});
      return m || net;
    })).catch(() => caches.match("index.html")));
    return;
  }
  e.respondWith(caches.match(r).then(m => m || fetch(r)));
});
