const CACHE_NAME = 'hintapp-cache-v1';
const urlsToCache = [
  '/escape_company/',          // 홈페이지 URL
  '/escape_company/index.html',
  '/escape_company/css/style.css',
  '/escape_company/script/script.js',
  '/escape_company/script/app.js',
  '/escape_company/img/search.png',
  '/escape_company/manifest.json',
  '/escape_company/img/search.png',
  '/escape_company/css/style.css'
];

// 설치 이벤트 (처음 설치할 때 파일들 캐싱)
self.addEventListener('install', (event) => {
  console.log('[Service Worker] 설치 완료!');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] 파일 캐싱 완료!');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// 활성화 이벤트 (구버전 캐시 삭제용, 지금은 심플)
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] 활성화 완료!');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('[Service Worker] 구 캐시 삭제:', name);
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// fetch 이벤트 (캐시 먼저 확인하고 없으면 네트워크 요청)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
