if ('serviceWorker' in navigator) {
navigator.serviceWorker.register('./service-worker.js')
    .then(function(registration) {
    console.log('Service Worker 등록 성공:', registration.scope);
    })
    .catch(function(error) {
    console.log('Service Worker 등록 실패:', error);
    });
}