self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('hint-app-cache').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/style.css',
                '/app.js',
                '/img/icons/icon-192x192.png',
                '/img/icons/icon-512x512.png'
            ]);
        })
    );
});

