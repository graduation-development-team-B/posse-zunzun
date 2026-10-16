# PWA学習リマインダーの初期設定

PWAのサービスワーカーが通知を表示し、Supabase Edge Functionが毎時、通知時刻に達した購読を確認します。通知時刻は端末のタイムゾーンで0時から23時までの1時間単位です。送信対象ごとにタイムゾーン上の日付を計算し、その日に回答記録が1件以上あれば送信を省きます。

## ローカルで通知の送受信をテストする

```sh
npm run reminders:test
```

Chromeなどの通常のタブで`http://127.0.0.1:8787`を開きます。localhostのループバック接続で動作するため、HTTPS証明書は不要です。スマホ表示用の拡張機能やiframeは外してください。別の端末からのLANアクセスには対応しません。

1. 「① 通知を表示する」を押してChromeの通知許可を許可します。アプリと同じ`public/sw.js`を登録し、通知表示APIを確認します。
2. 「② 実際のWeb Pushを送る」を押します。ブラウザーで購読し、Edge Functionと同じバージョンの送信ライブラリからPushサービスへ暗号化メッセージを送ります。
3. 「Web Push受信 → アプリと同じサービスワーカーで通知表示: 成功」が出れば送受信を確認できています。バナーが見えない場合はOSの通知センター、Chromeの通知設定、集中モードを確認します。

テスト用VAPID鍵はサーバー起動時に生成し、メモリー内だけで保持します。アプリの鍵やSupabaseの購読・学習履歴には触れません。サーバーを再起動した場合はページも再読み込みしてください。テストはPushサービスへのインターネット接続が必要です。終了はターミナルでCtrl+Cです。

このテストで確認するのはブラウザー・送信ライブラリ・サービスワーカーです。Supabaseへの購読保存、Cron、学習済み判定、デプロイ先の環境変数は別途確認してください。アプリ本体のローカル検証には`.env.local`の公開鍵を確認して`npm run web`で起動し、`http://localhost:8081/account`からログインして通知をオンにします。公開鍵を追加・変更したら画面を完全に再読み込みしてください。

macOSの通知バナー左側のChromeアイコンは、通知の`icon`指定では変更できません。[Chrome 152以降の仕様](https://developer.chrome.com/blog/notification-attribution-macos)では、PWAとしてインストールすると送信元にアプリ自身の名前とアイコンが使われます。ローカルテスト画面もインストールに対応しています。インストールした「POSSEずんずん 通知テスト」を開き、macOS側の通知許可も許可してから再テストします。既にブラウザーで許可していても、PWA側のOS通知許可は別途必要です。

## macOSでアプリ独自の通知設定を使う

Chrome 152以降では、PWAをインストールしてアプリ用のOS通知権限を許可すると、ChromeがmacOSにアプリ独自の通知設定を提供します。JavaScriptからmacOSの設定項目を作ったり、OSの許可状態を直接変更したりするAPIはありません。

アプリ本体のmanifestでは`id: "/"`（以前の`start_url: "/"`由来の識別子を維持）、名前は「POSSEずんずん」、`display: "standalone"`、専用アイコンを指定しています。アカウント画面にはMac版Chrome向けのインストール案内を表示します。ブラウザーがインストールイベントを提供した場合はアプリ内のインストールボタンを使えます。イベントが発火しない場合や既にインストール済みの場合は、ChromeのメニューやDockから操作してください。

1. HTTPSの公開アプリ、またはローカルのアプリをChromeで開きます。スマホ表示の拡張機能は外してください。
2. アカウント画面からPWAをインストールし、インストールした「POSSEずんずん」を開きます。
3. 学習リマインダーをオンにするか「テスト通知を表示」を押して、macOS側の通知許可を許可します。テスト通知は学習済み判定を行わず、配信記録や通知時刻を変更しません。
4. macOSの「システム設定 → 通知 → POSSEずんずん」で通知の許可・スタイル・サウンドなどを確認します。OSの通知設定はユーザー自身が変更します。

既に「ミニドリル」の名前でインストールしている場合、OS上の表示名が更新されるまで旧名が残ることがあります。ローカル専用テストは「POSSEずんずん 通知テスト」という別アプリであり、実際の公開アプリの通知設定とは別です。`Notification.permission === 'granted'`や通知表示APIの成功だけでは、OS側でバナーが表示されたことの確認にはなりません。

## VAPID鍵

一度だけ鍵を作成します。

```sh
npm run reminders:keys
```

出力された`EXPO_PUBLIC_WEB_PUSH_VAPID_PUBLIC_KEY`を、Webビルドに使う`.env.local`へ追加します。`VAPID_PUBLIC_KEY`と`VAPID_PRIVATE_KEY`はSupabaseのFunction Secretとして設定します。秘密鍵はリポジトリやブラウザー向け環境変数へ保存しないでください。`VAPID_SUBJECT`には連絡先URLまたは`mailto:`アドレスを設定します。

Edge Functionを保護するためのランダムな値も一つ作成します。

```sh
openssl rand -hex 32
```

その値を`REMINDER_DISPATCH_SECRET`としてFunction Secretに設定し、後述のVaultにも同じ値を保存します。

## Supabaseへ適用

既存のSupabaseプロジェクトにマイグレーションを適用し、Edge Functionを配信します。

```sh
supabase db push
supabase functions deploy dispatch-learning-reminders
supabase secrets set VAPID_PUBLIC_KEY='<公開鍵>' VAPID_PRIVATE_KEY='<秘密鍵>' VAPID_SUBJECT='mailto:運用連絡先@example.com' REMINDER_DISPATCH_SECRET='<ランダムな値>'
```

Supabase DashboardのDatabase → Extensionsで`pg_cron`と`pg_net`を有効にします。VaultへプロジェクトURL、Publishable key、Function Secretと同じディスパッチ用秘密値を保存します。

```sql
select vault.create_secret('https://<project-ref>.supabase.co', 'reminder_project_url');
select vault.create_secret('<Supabase publishable key>', 'reminder_publishable_key');
select vault.create_secret('<REMINDER_DISPATCH_SECRETと同じ値>', 'reminder_dispatch_secret');
```

次のCronを一度登録します。Edge FunctionのJWT検証は無効ですが、Function内でVaultに保存した秘密値を照合します。

```sql
select cron.schedule(
  'dispatch-learning-reminders',
  '0 * * * *',
  $$
  select net.http_post(
    url := (select decrypted_secret from vault.decrypted_secrets where name = 'reminder_project_url') || '/functions/v1/dispatch-learning-reminders',
    headers := jsonb_build_object(
      'content-type', 'application/json',
      'apikey', (select decrypted_secret from vault.decrypted_secrets where name = 'reminder_publishable_key'),
      'x-reminder-secret', (select decrypted_secret from vault.decrypted_secrets where name = 'reminder_dispatch_secret')
    ),
    body := '{}'::jsonb
  );
  $$
);

-- Cronの実行履歴は自動削除されないため、7日より古い履歴を毎日削除します。
select cron.schedule(
  'cleanup-old-cron-runs',
  '17 3 * * *',
  $$delete from cron.job_run_details where end_time < now() - interval '7 days'$$
);
```

設定時刻は端末のタイムゾーンで保存します。ブラウザーのPush APIが利用できるHTTPS環境が必要です。iPhone／iPadではホーム画面に追加したPWAから通知を許可してください。ユーザーがアカウント画面で通知をオンにすると購読が作成され、オフにすると以後の配信を止めます。

回答記録と通知時刻はSupabaseの同じアカウントに保存します。通知時刻に日付が変わった直後の端末も、ローカル日付の開始・終了をタイムゾーンで比較します。同一購読へ同じ日の通知を重複送信しないよう配信記録を残します。
