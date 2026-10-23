# Week33｜Laravelの環境構築

15問。言葉の理解: 2 / 知識の選択: 5 / 知識の組み立て: 5 / 結果の確認・修正: 3

作者向け資料。独立問題。公開されるのは制作状態publishedの問題。

## question-ph3-week33-assembly-app-shell（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: 教材のCompose構成で、サービス名appのコンテナへshで入ってください。サービスは起動済みです。
- 出典: curriculum/PH3.md:49 / Week 33
- ドリル接続: PH3 Week33のPOSSE課題へ接続。入った場所を確認してからLaravelのコマンドを使いましょう。
- 既習: PH1〜2のPHP・Composer・Docker・コマンド操作。Laravel用のコンテナ名とscriptsは設問内で指定。
- 概念: ph3-week33-app-shell
- 類題: ph3-week33-assembly-app-shell / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

教材のCompose構成で、サービス名appのコンテナへshで入ってください。サービスは起動済みです。

```sh
__BLANK__
```

- correct: docker compose exec app sh（正答）
- wrong: docker compose exec node sh

達成条件: 教材のCompose構成で、サービス名appのコンテナへshで入ってください。サービスは起動済みです。

ヒント: ComposerやArtisanを実行するサービスを選びましょう。

解説: execの後にappとshを指定します。PCでは入った場所を確認してからLaravelのコマンドを使いましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。sh -nによる構文確認のみ。コマンドは実行しない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: nodeはフロント用のサービスで、PHPを動かすappではありません。

## question-ph3-week33-assembly-composer-install（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: appコンテナ内のLaravelプロジェクト直下です。composer.jsonとlockは一致しています。PHPの依存をそろえてください。
- 出典: curriculum/PH3.md:49 / Week 33
- ドリル接続: PH3 Week33のPOSSE課題へ接続。完了後にLaravelの画面が開けるか確認しましょう。
- 既習: PH1〜2のPHP・Composer・Docker・コマンド操作。Laravel用のコンテナ名とscriptsは設問内で指定。
- 概念: ph3-week33-composer-install
- 類題: ph3-week33-assembly-composer-install / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

appコンテナ内のLaravelプロジェクト直下です。composer.jsonとlockは一致しています。PHPの依存をそろえてください。

```sh
__BLANK__
```

- correct: composer install（正答）
- wrong: npm install

達成条件: appコンテナ内のLaravelプロジェクト直下です。composer.jsonとlockは一致しています。PHPの依存をそろえてください。

ヒント: PHPのパッケージ管理ツールを使います。

解説: composer installでlockに沿って依存をそろえます。PCでは完了後にLaravelの画面が開けるか確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。sh -nによる構文確認のみ。コマンドは実行しない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: npmはJavaScriptの依存を扱うため、PHPの依存をそろえる操作ではありません。

## question-ph3-week33-assembly-run-migrations（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: appコンテナ内のLaravelプロジェクト直下です。未実行のマイグレーションを適用するコマンドを組み立ててください。
- 出典: curriculum/PH3.md:49 / Week 33
- ドリル接続: PH3 Week33のPOSSE課題へ接続。テーブルが作成されたか確認しましょう。
- 既習: PH1〜2のPHP・Composer・Docker・コマンド操作。Laravel用のコンテナ名とscriptsは設問内で指定。
- 概念: ph3-week33-run-migrations
- 類題: ph3-week33-assembly-run-migrations / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

appコンテナ内のLaravelプロジェクト直下です。未実行のマイグレーションを適用するコマンドを組み立ててください。

```sh
__BLANK__
```

- correct: php artisan migrate（正答）
- wrong: php artisan migrate:status

達成条件: appコンテナ内のLaravelプロジェクト直下です。未実行のマイグレーションを適用するコマンドを組み立ててください。

ヒント: 適用と状態表示は別のArtisanコマンドです。

解説: php artisan migrateで未適用分を実行します。PCではテーブルが作成されたか確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。sh -nによる構文確認のみ。コマンドは実行しない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: migrate:statusは実行状況の表示であり、未実行分の適用ではありません。

## question-ph3-week33-assembly-migration-status（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: マイグレーションを実行済みか一覧で確認してください。DBの構造を変更せず状態を表示します。
- 出典: curriculum/PH3.md:49 / Week 33
- ドリル接続: PH3 Week33のPOSSE課題へ接続。ユーザー登録に必要なテーブルの状態を見ましょう。
- 既習: PH1〜2のPHP・Composer・Docker・コマンド操作。Laravel用のコンテナ名とscriptsは設問内で指定。
- 概念: ph3-week33-migration-status
- 類題: ph3-week33-assembly-migration-status / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

マイグレーションを実行済みか一覧で確認してください。DBの構造を変更せず状態を表示します。

```sh
__BLANK__
```

- correct: php artisan migrate:status（正答）
- wrong: php artisan migrate

達成条件: マイグレーションを実行済みか一覧で確認してください。DBの構造を変更せず状態を表示します。

ヒント: 末尾のサブコマンドで状態表示を指定します。

解説: migrate:statusで実行状況を確認します。PCではユーザー登録に必要なテーブルの状態を見ましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。sh -nによる構文確認のみ。コマンドは実行しない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: migrateは未適用分を実行する操作で、状態だけを表示するコマンドではありません。

## question-ph3-week33-assembly-node-dev（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: 教材のnodeコンテナ内で、scriptsのdevを起動します。package.jsonには"dev":"vite"があります。
- 出典: curriculum/PH3.md:49 / Week 33
- ドリル接続: PH3 Week33のPOSSE課題へ接続。表示されたアドレスや画面のアセット読み込みを確認しましょう。
- 既習: PH1〜2のPHP・Composer・Docker・コマンド操作。Laravel用のコンテナ名とscriptsは設問内で指定。
- 概念: ph3-week33-node-dev
- 類題: ph3-week33-assembly-node-dev / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

教材のnodeコンテナ内で、scriptsのdevを起動します。package.jsonには"dev":"vite"があります。

```sh
__BLANK__
```

- correct: npm run dev（正答）
- wrong: npm run build

達成条件: 教材のnodeコンテナ内で、scriptsのdevを起動します。package.jsonには"dev":"vite"があります。

ヒント: scriptsのキーをコマンドに渡します。

解説: npm run devをnodeコンテナ内で実行します。PCでは表示されたアドレスや画面のアセット読み込みを確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。sh -nによる構文確認のみ。コマンドは実行しない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: buildは本番用ファイル生成で、指定した開発サーバーの起動ではありません。

## question-ph3-week33-choice-framework-role（版1・published）

- 形式: choice
- 主対象: 言葉の理解
- 学習目標: 提示条件に対して「ルーティングやDB操作などの共通の仕組みを提供する」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:49 / Week 33
- ドリル接続: PH3 Week33のPOSSE課題。プロジェクトのroutesとappの役割を確認しましょう。
- 既習: PH1〜2のPHP・Composer・Docker・コマンド操作。Laravel用のコンテナ名とscriptsは設問内で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week33-framework-role
- 類題: ph3-week33-choice-framework-role / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

ログインやDB連携のあるWebアプリをPHPで作ります。Laravelの役割はどれですか？

- correct: ルーティングやDB操作などの共通の仕組みを提供する（正答）
- wrong1: PHPを実行せずHTMLだけを保存する
- wrong2: MySQLを不要にして全データをCSSへ保存する
- wrong3: ブラウザの代わりに画面を閲覧する

達成条件: 条件に適合する候補を1つ選ぶ：ルーティングやDB操作などの共通の仕組みを提供する

ヒント: リクエストを受けて応答する側の仕組みです。

解説: 共通機能を活用してアプリ固有の処理に集中できます。 PCではプロジェクトのroutesとappの役割を確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: LaravelはPHPで動作するフレームワークです。
- 誤答wrong2: DB接続やモデルの仕組みを提供しますが、CSSはデータ保存先ではありません。
- 誤答wrong3: 閲覧はブラウザで行い、Laravelはサーバー側の処理を担います。

## question-ph3-week33-choice-breeze-timing（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「後から導入すると既存の設定ファイルなどが上書きされる可能性があるため」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:49 / Week 33
- ドリル接続: PH3 Week33のPOSSE課題。変更前後のGit差分で導入されたファイルを確認しましょう。
- 既習: PH1〜2のPHP・Composer・Docker・コマンド操作。Laravel用のコンテナ名とscriptsは設問内で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week33-breeze-timing
- 類題: ph3-week33-choice-breeze-timing / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

Week33でBreezeを先に導入するよう勧められている理由はどれですか？

- wrong1: Breezeを入れるとMySQLの保存容量が増えるため
- wrong2: すべてのクイズの正解が自動生成されるため
- wrong3: PHPの代わりにブラウザでArtisanを実行するため
- correct: 後から導入すると既存の設定ファイルなどが上書きされる可能性があるため（正答）

達成条件: 条件に適合する候補を1つ選ぶ：後から導入すると既存の設定ファイルなどが上書きされる可能性があるため

ヒント: 認証の雛形を導入する際に変わるファイルを考えましょう。

解説: Breezeは認証の雛形を生成するため、作り込む前の導入が教材で勧められています。 PCでは変更前後のGit差分で導入されたファイルを確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 認証の雛形の導入とDB容量は別です。
- 誤答wrong2: アプリ固有のクイズ内容は自分で用意します。
- 誤答wrong3: Breezeの導入後もArtisanはPHP側のコマンドです。

## question-ph3-week33-choice-env-local（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「.env」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:49 / Week 33
- ドリル接続: PH3 Week33のPOSSE課題。自分のローカル.envのDB接続先を教材と照合しましょう。
- 既習: PH1〜2のPHP・Composer・Docker・コマンド操作。Laravel用のコンテナ名とscriptsは設問内で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week33-env-local
- 類題: ph3-week33-choice-env-local / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

DB_HOSTなど環境ごとに異なる値を、Laravelのローカル開発で設定する代表的なファイルはどれですか？

- wrong2: public/favicon.ico
- wrong3: composer.lock
- correct: .env（正答）
- wrong1: resources/views/welcome.blade.php

達成条件: 条件に適合する候補を1つ選ぶ：.env

ヒント: アプリのコードと実行環境固有の値を分けます。

解説: .envに環境固有の値を置き、設定ファイルから参照します。 PCでは自分のローカル.envのDB接続先を教材と照合しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: ビューは画面を表示するためのファイルです。
- 誤答wrong2: アイコン画像へDB接続値は設定しません。
- 誤答wrong3: PHP依存の固定情報であり、環境変数を記述する場所ではありません。

## question-ph3-week33-choice-configuration-secret（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「秘密値を除いた.env.exampleを共有し、.envは管理対象から外す」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:49 / Week 33
- ドリル接続: PH3 Week33のPOSSE課題。git statusで.envが追加対象になっていないか確認しましょう。
- 既習: PH1〜2のPHP・Composer・Docker・コマンド操作。Laravel用のコンテナ名とscriptsは設問内で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week33-configuration-secret
- 類題: ph3-week33-choice-configuration-secret / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

DBのパスワードを含む.envをGitへ追加しようとしています。チームへ設定項目だけ共有する方法はどれですか？

- wrong3: チーム全員で本番DBのパスワードをソースへ直書きする
- correct: 秘密値を除いた.env.exampleを共有し、.envは管理対象から外す（正答）
- wrong1: .envを公開リポジトリへそのまま追加する
- wrong2: パスワードをBladeのコメントに移して共有する

達成条件: 条件に適合する候補を1つ選ぶ：秘密値を除いた.env.exampleを共有し、.envは管理対象から外す

ヒント: 設定の項目名と秘密の実際の値を区別します。

解説: 必要な項目は例で共有し、各環境の秘密値は別に設定します。 PCではgit statusで.envが追加対象になっていないか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: パスワードまで公開されてしまいます。
- 誤答wrong2: HTML側へ秘密値を移しても安全な設定共有になりません。
- 誤答wrong3: 本番の秘密値をコードへ含める必要はありません。

## question-ph3-week33-choice-migration-evidence（版1・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: 提示条件に対して「migrate:statusを確認し、MySQLで対象テーブルも確認する」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:49 / Week 33
- ドリル接続: PH3 Week33のPOSSE課題。ローカルDBのusersテーブルを確認しましょう。
- 既習: PH1〜2のPHP・Composer・Docker・コマンド操作。Laravel用のコンテナ名とscriptsは設問内で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week33-migration-evidence
- 類題: ph3-week33-choice-migration-evidence / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

Laravelのトップ画面は表示できました。ユーザー登録用のテーブル準備を確認する次の手順はどれですか？

- correct: migrate:statusを確認し、MySQLで対象テーブルも確認する（正答）
- wrong1: トップ画面が出たのでテーブルも必ず存在すると判断する
- wrong2: faviconの色だけを変える
- wrong3: npmのバージョンだけを見る

達成条件: 条件に適合する候補を1つ選ぶ：migrate:statusを確認し、MySQLで対象テーブルも確認する

ヒント: 表示・スキーマ・保存結果を別々に確認します。

解説: マイグレーションの適用状態と実テーブルを照合します。 PCではローカルDBのusersテーブルを確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 画面表示だけではDBのスキーマを確認できません。
- 誤答wrong2: 登録用テーブルの準備は確認できません。
- 誤答wrong3: フロント用ツールの情報からDBの適用状態は分かりません。

## question-ph3-week33-choice-registration-evidence（版1・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: 提示条件に対して「対象のローカルDBのusersで登録したメールアドレスを確認する」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:49 / Week 33
- ドリル接続: PH3 Week33のPOSSE課題。接続先DB名を確かめてから登録した行を探しましょう。
- 既習: PH1〜2のPHP・Composer・Docker・コマンド操作。Laravel用のコンテナ名とscriptsは設問内で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week33-registration-evidence
- 類題: ph3-week33-choice-registration-evidence / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

/registerで登録完了画面が表示されました。入力したユーザーが保存されたことを確かめる方法はどれですか？

- wrong1: HTMLの見出しだけを確認する
- wrong2: CSSが読み込めたかだけを見る
- wrong3: 別の開発者のDBだけを見る
- correct: 対象のローカルDBのusersで登録したメールアドレスを確認する（正答）

達成条件: 条件に適合する候補を1つ選ぶ：対象のローカルDBのusersで登録したメールアドレスを確認する

ヒント: アプリが実際に使った保存先で確認します。

解説: 画面上の成功と保存されたデータを対応させます。 PCでは接続先DB名を確かめてから登録した行を探しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 見出しの表示とレコード保存は別です。
- 誤答wrong2: スタイルの成功だけでは保存を確認できません。
- 誤答wrong3: 自分のアプリの接続先で確認する必要があります。

## question-ph3-week33-choice-container-responsibility（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「appコンテナ内のLaravelプロジェクト直下」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:49 / Week 33
- ドリル接続: PH3 Week33のPOSSE課題。appへ入り、pwdとartisanファイルの有無を確認しましょう。
- 既習: PH1〜2のPHP・Composer・Docker・コマンド操作。Laravel用のコンテナ名とscriptsは設問内で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week33-container-responsibility
- 類題: ph3-week33-choice-container-responsibility / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

この教材ではappにPHP、nodeにNode.jsが入っています。php artisanを実行する場所はどれですか？

- wrong2: ブラウザのアドレスバー
- wrong3: MySQLのSQL入力欄
- correct: appコンテナ内のLaravelプロジェクト直下（正答）
- wrong1: nodeコンテナの任意のディレクトリ

達成条件: 条件に適合する候補を1つ選ぶ：appコンテナ内のLaravelプロジェクト直下

ヒント: 必要な実行環境とartisanファイルのある場所を合わせます。

解説: PHPとartisanファイルの両方が使える場所で実行します。 PCではappへ入り、pwdとartisanファイルの有無を確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: この構成でPHPがあるのはappです。
- 誤答wrong2: ArtisanはURLではなくPHPのCLIコマンドです。
- 誤答wrong3: SQLとPHPのCLIは実行する環境が異なります。

## question-ph3-week33-choice-db-host-network（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「mysql」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:49 / Week 33
- ドリル接続: PH3 Week33のPOSSE課題。composeのサービス名とローカル.envを照合しましょう。
- 既習: PH1〜2のPHP・Composer・Docker・コマンド操作。Laravel用のコンテナ名とscriptsは設問内で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week33-db-host-network
- 類題: ph3-week33-choice-db-host-network / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

Compose内のappから、同じネットワークのサービスmysqlへ接続します。mysqlがDBサービス名のときDB_HOSTの指定はどれですか？

- wrong3: /register
- correct: mysql（正答）
- wrong1: localhost
- wrong2: users

達成条件: 条件に適合する候補を1つ選ぶ：mysql

ヒント: コンテナ間ではComposeのサービス名を使います。

解説: 同じComposeネットワークのDBサービス名で接続先を指定します。 PCではcomposeのサービス名とローカル.envを照合しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: app内のlocalhostは通常app自身を指し、別サービスのmysqlではありません。
- 誤答wrong2: usersはテーブル名であり、DBサーバーのホスト名ではありません。
- 誤答wrong3: 登録ページのパスはDBのホスト名ではありません。

## question-ph3-week33-choice-install-versus-start（版1・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: 提示条件に対して「PHP依存のインストールが成功したこと」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:49 / Week 33
- ドリル接続: PH3 Week33のPOSSE課題。次に画面表示と登録操作をそれぞれ確認しましょう。
- 既習: PH1〜2のPHP・Composer・Docker・コマンド操作。Laravel用のコンテナ名とscriptsは設問内で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week33-install-versus-start
- 類題: ph3-week33-choice-install-versus-start / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

composer installが成功しました。これだけで確認できることはどれですか？

- correct: PHP依存のインストールが成功したこと（正答）
- wrong1: ユーザー登録がDBへ保存できたこと
- wrong2: すべてのURLが正しく登録されたこと
- wrong3: フロントの開発サーバーも必ず起動したこと

達成条件: 条件に適合する候補を1つ選ぶ：PHP依存のインストールが成功したこと

ヒント: コマンドが担う範囲だけを判断します。

解説: 依存をそろえたこととアプリの動作成功を区別します。 PCでは次に画面表示と登録操作をそれぞれ確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 登録操作と保存の確認はまだ行っていません。
- 誤答wrong2: ルートの登録は別途確認が必要です。
- 誤答wrong3: Composerの依存インストールはnpmの開発サーバー起動と別です。

## question-ph3-week33-choice-locale-setting（版1・published）

- 形式: choice
- 主対象: 言葉の理解
- 学習目標: 提示条件に対して「日本語の翻訳を選ぶ設定であり、必要な翻訳データも用意する」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:49 / Week 33
- ドリル接続: PH3 Week33のPOSSE課題。翻訳キーと日本語のメッセージが対応するか画面で確認しましょう。
- 既習: PH1〜2のPHP・Composer・Docker・コマンド操作。Laravel用のコンテナ名とscriptsは設問内で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week33-locale-setting
- 類題: ph3-week33-choice-locale-setting / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

Laravel 10の設定でlocaleをjaに変更しました。正しい理解はどれですか？

- wrong1: 自作の英語のHTML本文も自動で日本語に翻訳される
- wrong2: MySQLの全レコードが自動的に翻訳される
- wrong3: ブラウザから送った全入力が日本語へ変換される
- correct: 日本語の翻訳を選ぶ設定であり、必要な翻訳データも用意する（正答）

達成条件: 条件に適合する候補を1つ選ぶ：日本語の翻訳を選ぶ設定であり、必要な翻訳データも用意する

ヒント: 言語の選択と翻訳する文章の用意は別です。

解説: localeは用意された翻訳を選択する設定です。 PCでは翻訳キーと日本語のメッセージが対応するか画面で確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: localeは任意の本文を自動翻訳する機能ではありません。
- 誤答wrong2: DBに保存した文字列を一括翻訳する設定ではありません。
- 誤答wrong3: 利用者の入力自体を翻訳するものではありません。
