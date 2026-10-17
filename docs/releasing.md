# Productionのタグリリース

正式版の`v1.2.3`形式のタグをGitHubへpushすると、`.github/workflows/deploy-production.yml`が動きます。`-beta`等のタグは本番公開しません。タグのcommitが`origin/main`に含まれない場合も停止します。

## 初回に登録する認証情報

[リポジトリのActions Secrets](https://github.com/graduation-development-team-B/posse-zunzun/settings/secrets/actions)で、次を登録します。対象リポジトリへ共有された組織Secretsでも利用できます。値はGitやチャットへ貼り付けません。

| GitHub Actions Secret   | 内容                                                                                                          |
| ----------------------- | ------------------------------------------------------------------------------------------------------------- |
| `EXPO_TOKEN`            | `@wappameshi/posse-zunzun`をデプロイできるExpoアクセストークン                                                |
| `SUPABASE_ACCESS_TOKEN` | 本番プロジェクトのlinkとEdge Functionデプロイ権限を持つSupabaseアクセストークン                               |
| `SUPABASE_DB_PASSWORD`  | `posse-quiz-app-prod`のデータベースパスワード。Supabaseへのログインパスワードではありません                   |
| `QUIZ_SOURCES_TOKEN`    | `posse-ap/curriculum`と`posse-ap/drill-ph2`のContents読み取り権限を持つGitHubトークン。教材出典のテストで使用 |

Supabaseアクセストークンは[SupabaseのAccess Tokens](https://supabase.com/dashboard/account/tokens)で作成します。教材リポジトリはworkflow内のcommitへ固定しています。教材改訂時は出典レビューと一緒にそのrefを更新します。

EASの`production`環境には、次の3つの公開値を設定します。GitHub Secretsへ同じ公開値を二重登録する必要はありません。

- `EXPO_PUBLIC_SUPABASE_URL`: `https://pzwptfsgdsovbxuctmue.supabase.co`
- `EXPO_PUBLIC_SUPABASE_KEY`: 本番プロジェクトのpublishable key
- `EXPO_PUBLIC_WEB_PUSH_VAPID_PUBLIC_KEY`: 本番Supabaseに保存したVAPID鍵ペアの公開鍵

VAPID秘密鍵・`VAPID_SUBJECT`・`REMINDER_DISPATCH_SECRET`は既存のSupabase Function Secretsで保持します。パイプラインは鍵を生成・更新しません。CronとVaultの初期設定も既存の設定を利用します。

## リリース操作

今回のアイコン・通知修正を含め、必要な変更をmainへコミットしてから実行します。以下のバージョンは例なので、未使用の正式版へ置き換えます。

```sh
git switch main
git status --short
# 変更をレビューし、必要なファイルをgit addしてgit commitする
git push origin main
npm run release:tag -- v1.2.3
git push origin v1.2.3
```

`release:tag`は追跡済み・staged・未追跡の変更が一つでも残っているとタグを作りません。既存タグやmain以外からの作成も拒否します。自動commit・自動pushは行いません。GitHub側からローカルの未コミット変更は見えないため、直接`git tag`でこの確認を飛ばさず、このコマンドを使います。

## 公開順序と確認内容

1. タグ・mainとの関係・CI認証情報を確認します。
2. 固定した教材revisionを取得し、lint・型チェック・全テストを実行します。
3. EAS production環境でWebを書き出します。`.env.local`は読み込みません。本番URL・publishable key・有効なP-256 VAPID公開鍵を検証し、bundleへの組み込みとdev接続先の混入を確認します。
4. `public/`と書き出したmanifest・Service Worker・アイコンが一致することを検証し、tag・commit・資産SHA-256を`dist/release.json`へ記録します。鍵や認証情報はこのファイルに保存しません。
5. 本番Supabaseへlinkし、migrationをdry-runした後、未適用のmigrationを適用します。続いて`dispatch-learning-reminders`をAPI経由でデプロイします。
6. Webを固有デプロイURLへ公開し、`release.json`と資産全件を照合します。成功したデプロイだけをProductionへ割り当てます。
7. Production URLでも同じ照合を行います。切り替え待ちの再試行でも失敗した場合、同じ検証済みデプロイへaliasを一度だけ再割り当てし、再照合します。最後まで不一致ならworkflowは失敗します。

`release.json`はActionsのartifactにも保存します。CIでは実ユーザーへの通知送信は行いません。iPhoneの通知許可・ホーム画面アイコン・バナー表示は実機で確認してください。

## Supabaseの変更と失敗時

DBとWebは単一トランザクションでは更新できません。migrationとFunctionは、直前のWeb版とも動作する追加・互換性のある変更として用意してください。削除・rename等は複数リリースに分けます。DB反映後にWeb検証が失敗しても、migrationは自動で巻き戻しません。失敗したステップを修正し、同じcommitのActionsを再実行できます。適用済みmigrationは再適用されません。

Function変更がなくてもタグの版をデプロイし、公開するWebとの組み合わせを揃えます。新しいDB変更は必ず`supabase/migrations/`へ追加してコミットします。過去のmigrationを書き換えて本番へ反映しません。

認証設定・VAPID鍵・Vault・Cronの変更はこのパイプラインの自動更新対象ではありません。[Web Push設定手順](web-push-reminders.md)と[環境設定](environments.md)を参照してください。

参考: [ExpoのEAS環境変数](https://docs.expo.dev/eas/environment-variables/usage/)、[デプロイとProduction alias](https://docs.expo.dev/eas/hosting/deployments-and-aliases/)、[SupabaseのCI/CD](https://supabase.com/docs/guides/deployment/managing-environments)。
