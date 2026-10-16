import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { generateKeyPairSync } from 'node:crypto';
import { sendPushNotification } from '@mmmike/web-push/send';

// A separate localhost origin and ephemeral keys keep this test independent of
// account subscriptions, Supabase, and the scheduled reminder rules.
const port = 8787;
const origin = `http://127.0.0.1:${port}`;
const { publicKey, privateKey } = generateKeyPairSync('ec', { namedCurve: 'prime256v1' });
const pub = publicKey.export({ format: 'jwk' });
const priv = privateKey.export({ format: 'jwk' });
const vapid = {
  publicKey: Buffer.concat([Buffer.from([4]), Buffer.from(pub.x, 'base64url'), Buffer.from(pub.y, 'base64url')]).toString('base64url'),
  privateKey: priv.d,
  subject: 'mailto:local-web-push-test@example.com',
};

const assets = new Map([
  ['/', ['scripts/web-push-test.html', 'text/html; charset=utf-8']],
  ['/sw.js', ['public/sw.js', 'application/javascript; charset=utf-8']],
  ['/icon-192.png', ['public/icon-192.png', 'image/png']],
  ['/icon-512.png', ['public/icon-512.png', 'image/png']],
  ['/icon-maskable-512.png', ['public/icon-maskable-512.png', 'image/png']],
  ['/apple-touch-icon.png', ['public/apple-touch-icon.png', 'image/png']],
]);

function trustedSubscription(subscription) {
  try {
    const url = new URL(subscription.endpoint);
    return url.protocol === 'https:' && url.port === '' &&
      (url.hostname === 'fcm.googleapis.com' || url.hostname.endsWith('.push.services.mozilla.com') || url.hostname.endsWith('.push.apple.com')) &&
      typeof subscription.keys?.p256dh === 'string' && typeof subscription.keys?.auth === 'string';
  } catch {
    return false;
  }
}

const server = createServer(async (request, response) => {
  const json = (status, value) => {
    response.writeHead(status, { 'content-type': 'application/json', 'cache-control': 'no-store' });
    response.end(JSON.stringify(value));
  };
  if (request.headers.host !== `127.0.0.1:${port}`) return json(403, { error: 'Unexpected host' });
  const pathname = new URL(request.url, origin).pathname;
  try {
    if (request.method === 'GET' && pathname === '/config') return json(200, { publicKey: vapid.publicKey });
    if (request.method === 'GET' && pathname === '/manifest.json') {
      const manifest = JSON.parse(await readFile(new URL('../public/manifest.json', import.meta.url), 'utf8'));
      response.writeHead(200, { 'content-type': 'application/manifest+json', 'cache-control': 'no-store' });
      response.end(JSON.stringify({ ...manifest, id: '/local-push-test', name: 'POSSEずんずん 通知テスト', short_name: 'POSSEずんずん' }));
      return;
    }
    if (request.method === 'POST' && pathname === '/send') {
      if (request.headers.origin !== origin || request.headers['content-type'] !== 'application/json') {
        return json(403, { error: 'Only the local test page may send' });
      }
      let body = '';
      for await (const chunk of request) {
        body += chunk;
        if (body.length > 8192) return json(413, { error: 'Request too large' });
      }
      let subscription;
      try { subscription = JSON.parse(body); } catch { return json(400, { error: 'Invalid JSON' }); }
      if (!trustedSubscription(subscription)) return json(400, { error: 'Invalid browser subscription' });
      const delivered = await sendPushNotification(subscription, {
        title: 'POSSEずんずん', body: '今日の3問、やってみませんか？', url: '/', tag: 'daily-learning-reminder',
      }, vapid, { ttl: 60, urgency: 'normal' });
      console.log(`Push service: ${delivered ? 'accepted' : 'subscription expired'}`);
      return json(delivered ? 200 : 410, { accepted: delivered });
    }
    const asset = request.method === 'GET' && assets.get(pathname);
    if (!asset) return json(404, { error: 'Not found' });
    const data = await readFile(new URL(`../${asset[0]}`, import.meta.url));
    response.writeHead(200, { 'content-type': asset[1], 'cache-control': 'no-store' });
    response.end(data);
  } catch (error) {
    // Never log subscription endpoints or key material.
    const status = Number(error?.statusCode) || 500;
    console.error('Local push test failed', { status });
    json(502, { error: `Push送信に失敗しました（${status}）。ブラウザーとネットワークを確認してください。` });
  }
});

server.on('error', (error) => {
  console.error(error.code === 'EADDRINUSE' ? `ポート${port}が使用中です。既存のテストサーバーを終了してください。` : error.message);
  process.exitCode = 1;
});
server.listen(port, '127.0.0.1', () => {
  console.log(`Web Push ローカルテスト: ${origin}`);
  console.log('同じpublic/sw.jsとEdge Functionと同じ送信ライブラリを使います。');
  console.log('テスト用の鍵はメモリー内だけに保持します。Supabaseの設定・学習記録は変更しません。');
});
