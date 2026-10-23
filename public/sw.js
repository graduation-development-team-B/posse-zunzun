/* ミニドリル PWA のサービスワーカー（手書きの最小構成）
 * - ページ遷移：ネットワーク優先、オフライン時はキャッシュ
 * - 同一オリジンの静的ファイルと Google Fonts：キャッシュ優先で裏で更新
 * - localhost と Metro の開発バンドルはキャッシュを使わない
 * 配信内容を変えたら CACHE のバージョンを上げる。 */
const CACHE = 'minidrill-v10';

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(['/', '/manifest.json'])));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  // 開発バンドルのURLは内容が変わっても同じ。古い教材を返すと、
  // 新しい問題IDを持つ途中セッションが復元時に破棄されてしまう。
  const host = self.location.hostname;
  const local = ['localhost', '127.0.0.1', '[::1]'].includes(host) || host.endsWith('.localhost');
  if (local || url.searchParams.get('dev') === 'true') return;

  const isFont = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (url.origin !== self.location.origin && !isFont) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then((hit) => hit || caches.match('/')))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((hit) => {
      const network = fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => hit);
      return hit || network;
    })
  );
});

self.addEventListener('push', (event) => {
  let payload = { title: 'POSSEずんずん', body: '今日の3問、やってみませんか？', url: '/' };
  try {
    if (event.data) payload = { ...payload, ...event.data.json() };
  } catch {
    if (event.data) payload.body = event.data.text() || payload.body;
  }

  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.body,
      icon: '/icon-192.png?v=d5850588',
      badge: '/icon-192.png?v=d5850588',
      tag: 'daily-learning-reminder',
      data: { url: payload.url },
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const target = new URL(event.notification.data?.url || '/', self.location.origin);
  if (target.origin !== self.location.origin) return;

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      const existing = clients.find((client) => new URL(client.url).pathname === target.pathname);
      if (existing) return existing.focus();
      return self.clients.openWindow(target.href);
    })
  );
});
