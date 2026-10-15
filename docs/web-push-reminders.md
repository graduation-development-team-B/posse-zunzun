# PWA学習リマインダーの初期設定

PWAのサービスワーカーが通知を表示し、Supabase Edge Functionが毎時、通知時刻に達した購読を確認します。通知時刻は端末のタイムゾーンで0時から23時までの1時間単位です。送信対象ごとにタイムゾーン上の日付を計算し、その日に回答記録が1件以上あれば送信を省きます。

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
