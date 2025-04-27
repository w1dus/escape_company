if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then((registration) => {
            console.log('Service Worker 등록 성공:', registration);
        }).catch((error) => {
            console.log('Service Worker 등록 실패:', error);
        });
    });
}

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // 기본 동작을 막고 프롬프트를 저장
    e.preventDefault();
    deferredPrompt = e;

    // 사용자가 페이지에서 첫 번째로 클릭했을 때 프롬프트 띄우기
    document.body.addEventListener('click', () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();  // 설치 프롬프트 띄우기
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('사용자가 앱 설치를 승인했어요!');
                } else {
                    console.log('사용자가 앱 설치를 거절했어요!');
                }
                deferredPrompt = null; // 프롬프트가 처리되었으면 더 이상 필요 없음
            });
        }
    });
});
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});