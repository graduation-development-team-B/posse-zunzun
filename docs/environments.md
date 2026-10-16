# 開発・本番のSupabase環境

2026-10-07。Web配信はEAS Hosting、認証・学習記録はSupabaseを使用する。認証・DB保存の実装は進行中で、dev DBへ初回マイグレーションを適用済み。

## 環境変数

- `EXPO_PUBLIC_SUPABASE_URL`：接続先プロジェクトのURL。
- `EXPO_PUBLIC_SUPABASE_KEY`：そのプロジェクトのpublishable key。

初期の設計書にあった`EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY`から、ユーザー指定の`EXPO_PUBLIC_SUPABASE_KEY`に統一する。

## dev

ローカルの`.env.local`に、ユーザー提供のdev用URLとpublishable keyを設定した。devのプロジェクトIDは`gzulpgzzbynmmlksadsw`。このファイルはGitに含めない。配布用の`.env.example`には置換用の値だけを置く。

ローカル開発とEASのpreview配信は、このdevプロジェクトを共用する。EAS Hosting previewは`@wappameshi/posse-zunzun`（project ID `f0741227-e60f-4607-aa35-b0aef3198f47`）に作成済み。URLは[固有preview](https://posse-zunzun--rvmg7i0c18.expo.app)と[preview alias](https://posse-zunzun--preview.expo.app)。公開成果物はdev Supabase向け。

dev SupabaseのAuth Redirect URLsに、previewからメール確認後に戻るURL`https://posse-zunzun--preview.expo.app/auth/callback`を追加する。ローカル開発用のlocalhost URLも保持する。

## production

`v*`タグでの公開手順と必要なCI用Secretsは[releasing.md](releasing.md)を参照する。

本番Supabaseは`posse-quiz-app-prod`（project ref `pzwptfsgdsovbxuctmue`）。EASのproduction環境には本番URL・publishable key・production専用VAPID公開鍵を登録する。VAPID秘密鍵とdispatch secretは本番SupabaseのFunction Secretsにのみ保存し、対応するURL・publishable key・dispatch secretはVaultに保存する。devとproductionのVAPID鍵は分離する。

学習データとWeb Pushの2つのmigrationを本番へ適用済み。`dispatch-learning-reminders` Edge Functionをデプロイし、`pg_cron`と`pg_net`を有効化した。Cronは毎時`0 * * * *`にリマインダーを処理し、毎日`17 3 * * *`に7日より古いCron実行履歴を削除する。EAS Hosting production URLは[https://posse-zunzun.expo.app](https://posse-zunzun.expo.app)。

クライアント用のproduction値はEASのproduction環境からWeb書き出し時に組み込む。ローカルのdev用`.env.local`をproduction値として保存・公開しない。

本番運用の確認事項として、Site URL・メール確認・再設定の戻り先、RLS、本人の回答保存を確認する。

## 検証の範囲

2026-10-16にproductionへWebをデプロイし、トップページ・manifest・Service Worker・アイコンがHTTP 200で返ること、bundleに本番Supabase URLとproduction VAPID公開鍵が含まれdev URLが含まれないことを確認した。Functionの診断でVAPID鍵ペアとsubject形式を確認し、購読0件の状態でdispatchを実行して`processed: 0`を確認した。実ユーザー端末への通知配送は、購読がないため未確認。

preview URLと登録ルートのHTTP 200応答も確認済み。ユーザー登録・確認メール・ログイン・DB保存・RLSのエンドツーエンド確認は未実施。

2026-10-07の作業結果：dev DBにプロフィール・学習設定・回答履歴のマイグレーションを適用し、CLIで適用済み状態を確認した。devのAuth公開設定はHTTP 200。登録・メール配送・ログインやData APIのRLS動作は未検証。

2026-10-16の追加確認：productionを`ddlmqbbyhg`へ更新し、Production aliasを再割り当てした。preview配信中のPWAアイコン4点を`public/`へ反映し、アイコンURLに画像の版を付け、Service Workerのキャッシュを`minidrill-v8`へ更新した。本番URLのmanifest・Service Worker・アイコン・JSを取得し、production用ビルドとの一致、本番Supabase・VAPID公開鍵、通知エラー診断の組み込みを確認した。Auth公開設定はEmailプロバイダー有効、新規登録許可、メール自動確認。これらのAuth設定変更は今回の作業では行っていない。

同日の23:00:02（日本時間）に既存購読の配信履歴が`sent`となり、Cron実行も`succeeded`を確認した。iPhoneホーム画面PWAの再起動後、通知OFF→ONの保存成功と、Safariのホーム画面追加確認画面での新アイコン表示をユーザーが確認した。ユーザーが時刻を0時へ変更した後、本番DBにも`enabled: true`・`00:00:00`・`Asia/Tokyo`の購読が保存されていることを確認した。以前の23時購読も別レコードとして残っており、削除していない。次回0時の端末への通知到着は未確認。
