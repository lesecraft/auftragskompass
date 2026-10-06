/* Service Worker: App-Dateien offline verfügbar machen.
   Anfragen an Firestore und Anmeldung laufen direkt durch. */
const CACHE = 'auftragskompass-v2';
const SHELL = [
  './', 'index.html', 'manifest.webmanifest', 'firebase-config.js',
  'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png',
  'icons/icon-maskable-512.png', 'icons/apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function store(req, res) {
  if (res && (res.ok || res.type === 'opaque')) {
    const copy = res.clone();
    caches.open(CACHE).then(c => c.put(req, copy));
  }
  return res;
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const isLib = url.hostname === 'www.gstatic.com' && url.pathname.startsWith('/firebasejs/');
  const isFont = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (!sameOrigin && !isLib && !isFont) return;

  if (isLib || isFont) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => store(req, res))));
    return;
  }

  /* 'no-cache': bei jedem Aufruf bei GitHub nachfragen, damit geänderte Dateien sofort ankommen */
  e.respondWith(
    fetch(req, { cache: 'no-cache' })
      .then(res => store(req, res))
      .catch(() => caches.match(req).then(hit => hit || (req.mode === 'navigate' ? caches.match('index.html') : undefined)))
  );
});
