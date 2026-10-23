import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../../public/sw.js', import.meta.url), 'utf8');

function worker(origin) {
  const handlers = {};
  const cached = new Response('old catalog');
  const network = new Response('new catalog');
  const requests = [];
  vm.runInNewContext(source, {
    URL,
    self: {
      location: new URL(origin),
      addEventListener: (type, handler) => { handlers[type] = handler; },
    },
    caches: {
      match: async () => cached,
      open: async () => ({ put: async () => {} }),
    },
    fetch: async (request) => { requests.push(request); return network; },
  });
  return {
    cached,
    requests,
    request(path, options = {}) {
      let response;
      handlers.fetch({
        request: { method: 'GET', mode: 'cors', url: new URL(path, origin).href, ...options },
        respondWith: (value) => { response = value; },
      });
      return response;
    },
  };
}

test('localhostではページ・同じURLの開発JS・アセットを古いキャッシュから返さない', () => {
  for (const origin of ['http://localhost:8081', 'http://127.0.0.1:8081', 'http://[::1]:8081', 'http://app.localhost:8081']) {
    const sw = worker(origin);
    for (const path of ['/materials', '/entry.bundle?platform=web&dev=true', '/icon-192.png'])
      assert.equal(sw.request(path), undefined, origin + path);
    assert.equal(sw.requests.length, 0); // respondWithなしでブラウザが通常の通信を行う
  }
});

test('LANなどでもMetroのdev=trueバンドルをキャッシュから返さない', () => {
  const sw = worker('http://192.168.0.2:8081');
  assert.equal(sw.request('/entry.bundle?platform=web&dev=true'), undefined);
});

test('公開環境の静的アセットは既存のキャッシュ表示とバックグラウンド取得を維持する', async () => {
  const sw = worker('https://learning.example');
  const response = await sw.request('/_expo/static/js/web/entry-hash.js');
  assert.equal(response, sw.cached);
  assert.equal(sw.requests.length, 1);
});

test('外部APIとPOSTにはサービスワーカーが応答しない', () => {
  const sw = worker('https://learning.example');
  assert.equal(sw.request('https://api.example/answers'), undefined);
  assert.equal(sw.request('/answers', { method: 'POST' }), undefined);
});
