# 開発・本番のSupabase環境

2026-10-07。Web配信はEAS Hosting、認証・学習記録はSupabaseを使用する計画。認証・DB保存のアプリ実装はまだ追加していない。

## 環境変数

- `EXPO_PUBLIC_SUPABASE_URL`：接続先プロジェクトのURL。
- `EXPO_PUBLIC_SUPABASE_KEY`：そのプロジェクトのpublishable key。

初期の設計書にあった`EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY`から、ユーザー指定の`EXPO_PUBLIC_SUPABASE_KEY`に統一する。

## dev

ローカルの`.env.local`に、ユーザー提供のdev用URLとpublishable keyを設定した。devのプロジェクトIDは`gzulpgzzbynmmlksadsw`。このファイルはGitに含めない。配布用の`.env.example`には置換用の値だけを置く。

ローカル開発とEASの検証用配信は、このdevプロジェクトを共用する初期案。DB変更の破壊的な試行や自動テストには、必要に応じてローカルSupabaseを使う。

## production

ユーザーはdevとは別の本番用Supabase環境を作成済み。本番のURLとpublishable keyはまだ設定していない。dev値を本番値として保存・公開しない。

EASのpreviewにはdevの値、productionには本番の値を別々に登録する。クライアントの値はExpoの書き出し時に組み込まれるため、deploy時の環境だけ変えても接続先は変わらない。本番を書き出す作業領域ではdevの`.env.local`を混入させず、productionの値をexportに渡す。

本番公開前にSite URL・メール確認・再設定の戻り先、RLS、本人の回答保存を確認する。

## 検証の範囲

環境ファイルの設定と接続先の疎通確認は、ログイン・ユーザー登録・DB保存・RLSの実装確認とは別。今回、DB変更・メール送信・ユーザー作成・本番アクセスは行わない。

2026-10-07の疎通結果：ユーザー提供のdev公開キーでAuthの公開設定を読み取り、HTTP 200とメール認証有効を確認した。ログインやDB保存は未実装・未検証。
