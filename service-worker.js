self.addEventListener('install', (e) => {
    console.log('서비스워커 설치 완료');
    self.skipWaiting();
  });
  
  self.addEventListener('activate', (e) => {
    console.log('서비스워커 활성화 완료');
  });
  
  self.addEventListener('fetch', (e) => {
    // 일단은 요청을 그냥 보내기만 해.
});