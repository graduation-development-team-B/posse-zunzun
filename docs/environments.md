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

ユーザーはdevとは別の本番用Supabase環境を作成済み。本番のURLとpublishable keyはまだ設定していない。dev値を本番値として保存・公開しない。

EASのpreviewにはdevの値、productionには本番の値を別々に登録する。クライアントの値はExpoの書き出し時に組み込まれるため、deploy時の環境だけ変えても接続先は変わらない。本番を書き出す作業領域ではdevの`.env.local`を混入させず、productionの値をexportに渡す。

本番公開前にSite URL・メール確認・再設定の戻り先、RLS、本人の回答保存を確認する。

## 検証の範囲

preview URLと登録ルートのHTTP 200応答を確認済み。ユーザー登録・確認メール・ログイン・DB保存・RLSのエンドツーエンド確認は未実施。本番DBへの変更や本番アクセスは行っていない。

2026-10-07の作業結果：dev DBにプロフィール・学習設定・回答履歴のマイグレーションを適用し、CLIで適用済み状態を確認した。devのAuth公開設定はHTTP 200。登録・メール配送・ログインやData APIのRLS動作は未検証。
