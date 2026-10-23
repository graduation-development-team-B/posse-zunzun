# PH3 Week33〜48のコード組み立てレビュー

## 範囲と学習目標

2026-10-23。ユーザーの「各Week5問」の依頼を引き継ぎ、16Weekに各5問、計80問を作成。すべて独立した、実行なしのトークン組み立て。主対象は「知識の組み立て」。提示コードの言語はPHP60問、Blade11問、シェル8問、JavaScript1問。既存の529問は保持する。

各Weekの正本は`content/PH3/weeks/weekXX.json`。既習・課題への接続・ヒント・達成条件・誤答理由・出典はauthorに記録。学習目標と各問題IDの対応は後述の表。

## 根拠と前提

- 主教材は`curriculum/PH3.md`。Week33〜48の要件・チェックポイントを使用。書籍本文・動画を閲覧したとは扱わない。
- 補足は[ドリルのスナップショット](../quiz-sources/PH3/README.md)。コミット`6ec19298b9706db0a1a0baf51b2cb26f59d0ea14`のREADMEと開始コードを保存し、各問からSHA付きで参照。
- カリキュラムはLaravel 10だが、一部ドリルはLaravel 8・旧Mix。新しい問題のAPIはLaravel 10の公式資料で照合。Week48のproduction問題だけは、旧ドリルのpackage.jsonを読む問題であることを明記。
- Week33〜36はミニドリルなし。Week44〜48の教材欄はTBDだが、実在する補足ドリルを使う場合はフォルダと本文に従う。
- フォーム・モデル・ルート・リレーション・認可などの周辺設定は問題の前提で指定。アプリ内にLaravel・Composer・DBの実行環境は追加しない。

## 別工程の意味レビュー

80問をdraftとして保存してから、教材のWeek範囲、正答、誤答理由、既習、固定コードと空欄の対応を改めて確認した。作者による別工程の自己レビューであり、講師や学習者の評価ではない。

修正・確認事項：

- Week35のSchema::createの初稿に余分な閉じ括弧があり、PHP構文確認で検出して修正。
- FormRequestのrequired / nullable、max / min、存在する親ID、正解番号1〜3を区別。100・101文字、0・1・3・4などのPCで確認する境界を解説へ記載。
- createは属性配列、saveはモデルを渡す。リレーションのメソッド呼び出しとコレクションのプロパティを区別。
- SoftDeletesとdeleted_atの両方が必要。forceDeleteを論理削除として教えない。withTrashedとonlyTrashedを区別。
- ログイン確認と管理者・所有者の認可を分ける。ボタンの非表示だけを認可にしない。is_adminはサーバー管理と明記し、一般ユーザーが送った値で管理者にしない。
- Gate::allowsの戻り値を無視して通す例を誤答とし、Gate::authorizeで拒否を処理する。
- 選択肢の更新は親設問のリレーション内で対象IDを取得。コメントの本人確認はコメントidではなくuser_idを比較。
- Bladeの入力表示は通常の{{ }}、JavaScriptへの埋め込みはLaravel 10のJs::fromを使う。ファイルフォームはmultipart/form-data。
- Week45のCarbonはImmutableを明示し、基準日時を変更せず過去へ日数を引く。
- Week47は変動するLTS番号を正答に固定しない。Node本体のバージョンを確認し、PCで公式の現行情報と照合する。

## 自動確認と限界

`node scripts/check-ph3-examples.cjs`で、PHP60問の正答をPHP CLI -l、JS1問をTypeScript parser、シェル8問をsh -nで構文確認。Blade11問は静的照合のみ。5問はPHPの整数型・比較とJSの登録呼び出しを固定入力で追加確認した。[補助結果](ph3-example-checks.json)。これらはLaravel本体の動作確認ではない。

限定入力の採点・誤答・未完成列・重複列・保存復元・ヒント・二重確定・各Week5問完了は`tests/content/assembly.test.mjs`、PH3の16単元・件数・Web/Native条件・出典スナップショットは`tests/content/ph3-extension.test.mjs`で確認する。

Laravel本体でのルート実行、Blade描画、マイグレーション、認証・認可、画像保存、Composer/Mixの実行はしていない。Native実機も未確認。今回の公開条件は、教材・公式仕様との静的意味レビューと、既存アプリの限定トークン採点が成立すること。

## 参照した公式仕様

- [Laravel 10 Routing](https://laravel.com/docs/10.x/routing)：HTTPメソッド・パラメータ・コントローラ・フォームメソッド。
- [Eloquent](https://laravel.com/docs/10.x/eloquent)：取得・更新・fillable・スコープ・論理削除。
- [Eloquent Relationships](https://laravel.com/docs/10.x/eloquent-relationships)：hasMany・先読み・save/create。
- [Blade](https://laravel.com/docs/10.x/blade)：エスケープ・コンポーネント・JSへの値の受け渡し。
- [Validation](https://laravel.com/docs/10.x/validation)：FormRequest・validated・ルール・エラー表示。
- [Authorization](https://laravel.com/docs/10.x/authorization)：Gate・ポリシー・拒否処理。
- [Pagination](https://laravel.com/docs/10.x/pagination)：paginate・links。
- [Session](https://laravel.com/docs/10.x/session)：ヘルパーの保存・取得。
- [File Storage](https://laravel.com/docs/10.x/filesystem)：ファイル保存先のディレクトリとディスク。
- [Carbonの加減算](https://carbon.nesbot.com/guide/date-time-manipulation/addition-and-subtraction.html)、[Immutableの性質](https://carbon.nesbot.com/guide/getting-started/instantiation.html)：subDaysと元日時の保持。

## アプリ・保存設定・最終確認

PH3の名称、プロフィール、登録画面を対応。phaseは学習上の表示設定で、権限には使わない。`20261023095930_enable_ph3_learning_phase.sql`を用意し、localhostが参照する開発プロジェクトgzulpgzzbynmmlksadswに同じ制約変更を適用。実際の制約をコピーした一時テーブルでph1/ph2/ph3の許可、ph4の拒否を確認。最後にCHECK定義、RLS=true、既存ポリシー3件を確認した。既存ユーザーの設定値は変更していない。本番プロジェクトへは適用していない。

Webの実画面でPH3を展開しWeek33〜48を確認。Week38をコード組み立て5問で開始し、PHPとBladeの入力、ヒント利用、再読み込み後の復元、正答・誤答、解説と模範コード、5問完了、XP、/materialsへの戻りを確認。プロフィールではPH3の選択確認ダイアログまで開いてキャンセルし、元のPH2設定を維持した。PH3にない4択は選択不可と明示し、組み立ての保存中に実行を促す文言が出る点も修正した。スタイル定義は変更していない。

content:validate・content:build・test:content（671件）・typecheck・lint・export:webは成功。既存529エントリは追加前と完全一致。test:uiは以前からの4件（choice-workspace・interactive-workspace・feedback-sheetのスタイル差分、choice-workspaceのQ.typeTag条件式）が残る。Native実機は未確認。

## Week別の問題と意味レビュー

各表の出典は主教材。補足ドリルの個別参照とSHAは正本のauthor.supportingSourcesに記載。正答・主要誤答は静的意味レビュー済みで、補助確認の実施範囲を分けて記録する。

### week33（5問）

PH1〜2のPHP・Composer・Docker・コマンド操作。Laravel用のコンテナ名とscriptsは設問内で指定。

| 問題ID / 学習目標 | 出典 | 正答・主要誤答 / 補助確認 |
|---|---|---|
| question-ph3-week33-assembly-app-shell<br>教材のCompose構成で、サービス名appのコンテナへshで入ってください。サービスは起動済みです。 | curriculum/PH3.md:49 | 静的意味レビュー済み。sh -nによる構文確認のみ。コマンドは実行しない。 |
| question-ph3-week33-assembly-composer-install<br>appコンテナ内のLaravelプロジェクト直下です。composer.jsonとlockは一致しています。PHPの依存をそろえてください。 | curriculum/PH3.md:49 | 静的意味レビュー済み。sh -nによる構文確認のみ。コマンドは実行しない。 |
| question-ph3-week33-assembly-run-migrations<br>appコンテナ内のLaravelプロジェクト直下です。未実行のマイグレーションを適用するコマンドを組み立ててください。 | curriculum/PH3.md:49 | 静的意味レビュー済み。sh -nによる構文確認のみ。コマンドは実行しない。 |
| question-ph3-week33-assembly-migration-status<br>マイグレーションを実行済みか一覧で確認してください。DBの構造を変更せず状態を表示します。 | curriculum/PH3.md:49 | 静的意味レビュー済み。sh -nによる構文確認のみ。コマンドは実行しない。 |
| question-ph3-week33-assembly-node-dev<br>教材のnodeコンテナ内で、scriptsのdevを起動します。package.jsonには"dev":"vite"があります。 | curriculum/PH3.md:49 | 静的意味レビュー済み。sh -nによる構文確認のみ。コマンドは実行しない。 |

### week34（5問）

Week33のLaravel環境。Week34のMVC・ルーティング・Blade。

| 問題ID / 学習目標 | 出典 | 正答・主要誤答 / 補助確認 |
|---|---|---|
| question-ph3-week34-assembly-controller-route<br>UserControllerはimport済みでindexメソッドがあります。GET /usersをindexへ結び付けてください。 | curriculum/PH3.md:145 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week34-assembly-return-view<br>resources/views/users/index.blade.phpへ、取得済み配列$usersをusersというキーで渡してください。コントローラのメソッド内です。 | curriculum/PH3.md:145 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week34-assembly-escaped-name<br>$user->nameは利用者が入力した文字列です。BladeでHTMLとして解釈させずに名前を表示してください。 | curriculum/PH3.md:145 | 静的意味レビュー済み。静的意味レビューのみ。Blade/Laravelは実行しない。 |
| question-ph3-week34-assembly-layout-component<br>提供済みのapp-layoutコンポーネントで、見出しを囲んでください。 | curriculum/PH3.md:145 | 静的意味レビュー済み。静的意味レビューのみ。Blade/Laravelは実行しない。 |
| question-ph3-week34-assembly-route-list<br>URLとControllerの結び付きを、Artisanのルート一覧で確認してください。Laravelプロジェクト直下です。 | curriculum/PH3.md:145 | 静的意味レビュー済み。sh -nによる構文確認のみ。コマンドは実行しない。 |

### week35（5問）

Week34のMVCとフォーム。Week35のマイグレーション・fillable・Seeder・バリデーション。

| 問題ID / 学習目標 | 出典 | 正答・主要誤答 / 補助確認 |
|---|---|---|
| question-ph3-week35-assembly-create-quiz-table<br>quizzesテーブルを新規作成します。SchemaとBlueprintはimport済みです。テーブル作成の呼び出しを組み立ててください。 | curriculum/PH3.md:223 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week35-assembly-question-foreign-key<br>questionsのquiz_id列は作成済みです。quizzes.idへの外部キーを定義してください。 | curriculum/PH3.md:223 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week35-assembly-fillable-name<br>Quizでnameだけを一括代入可能にします。Modelはimport済みとします。モデルのプロパティを組み立ててください。 | curriculum/PH3.md:223 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week35-assembly-seed-record<br>Quizはimport済みで、nameはfillableにあります。Seederでnameが「ITクイズ」の1件を作成してください。 | curriculum/PH3.md:223 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week35-assembly-name-validation<br>フォームのnameを、必須・文字列・100文字以内として検証します。FormRequestのrules内の項目です。 | curriculum/PH3.md:223 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |

### week36（5問）

Week35のモデルと表の所属列。Week36の一覧・foreach・関連取得。

| 問題ID / 学習目標 | 出典 | 正答・主要誤答 / 補助確認 |
|---|---|---|
| question-ph3-week36-assembly-list-quizzes<br>Quizはimport済みです。クイズを条件で絞らず全件取得し、$quizzesへ入れてください。 | curriculum/PH3.md:324 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week36-assembly-foreach-list<br>$quizzesは取得済みです。Bladeで各クイズのnameをliとして繰り返し表示してください。 | curriculum/PH3.md:324 | 静的意味レビュー済み。静的意味レビューのみ。Blade/Laravelは実行しない。 |
| question-ph3-week36-assembly-named-link<br>quizzes.indexという名前のルートは登録済みです。Bladeのリンク先をそのルートから生成してください。 | curriculum/PH3.md:324 | 静的意味レビュー済み。静的意味レビューのみ。Blade/Laravelは実行しない。 |
| question-ph3-week36-assembly-has-many-questions<br>Quizに複数のQuestionが所属します。questions.quiz_idが外部キーです。クイズ側のquestionsリレーションを作ってください。 | curriculum/PH3.md:324 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week36-assembly-eager-questions<br>Quizにはquestionsリレーションがあります。各クイズの設問を一覧で使うため、まとめて先読みしてください。 | curriculum/PH3.md:324 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |

### week37（5問）

Week36までのリレーション・先読み。提供済みスコープとアクセサの役割は問題文で指定。

| 問題ID / 学習目標 | 出典 | 正答・主要誤答 / 補助確認 |
|---|---|---|
| question-ph3-week37-assembly-detail-parameter<br>QuizControllerのshowはクイズIDを受け取ります。1や2を固定せず、GET /quizzes/{id}を登録してください。Controllerはimport済みです。 | curriculum/PH3.md:358 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week37-assembly-find-detail<br>Quizはimport済みです。$idのクイズを1件取得し、存在しない場合は404へ進むメソッドを使ってください。 | curriculum/PH3.md:358 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week37-assembly-eager-nested<br>Quizのquestions、そのQuestionのchoicesリレーションは定義済みです。設問と選択肢を先読みして$idを取得してください。 | curriculum/PH3.md:358 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week37-assembly-provided-scope<br>UserにはscopeFirstGeneration($query)が定義済みで、generation=1を絞り込みます。このスコープを使って取得してください。Userはimport済みです。 | curriculum/PH3.md:358 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week37-assembly-provided-accessor<br>UserにはgetFullNameAttribute()が定義済みです。Bladeでそのアクセサの値を表示してください。 | curriculum/PH3.md:358 | 静的意味レビュー済み。静的意味レビューのみ。Blade/Laravelは実行しない。 |

### week38（5問）

Week37までの個別取得とモデル。Week38の更新フォーム。sessionは関連ドリルのヘルパー練習。

| 問題ID / 学習目標 | 出典 | 正答・主要誤答 / 補助確認 |
|---|---|---|
| question-ph3-week38-assembly-edit-route<br>QuizControllerのupdateへ、PATCH /quizzes/{id}を結び付けてください。Controllerはimport済みです。 | curriculum/PH3.md:416 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week38-assembly-patch-form<br>WebルートにはCSRFミドルウェアがあり、更新先はPATCHです。HTML formはPOST送信するので、CSRFとPATCHの指定を追加してください。 | curriculum/PH3.md:416 | 静的意味レビュー済み。静的意味レビューのみ。Blade/Laravelは実行しない。 |
| question-ph3-week38-assembly-update-name<br>$quizは取得済みでnameはfillableです。$validatedはnameだけを含む検証済み配列です。既存クイズを更新してください。 | curriculum/PH3.md:416 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week38-assembly-session-put<br>Laravelのsessionヘルパーを使い、キーhomeに数値1を保存してください。Webセッションは利用可能です。 | curriculum/PH3.md:416 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week38-assembly-session-get<br>Laravelのsessionヘルパーからhomeを読み、未保存なら0を返してください。 | curriculum/PH3.md:416 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |

### week39（5問）

Week38までのモデル操作。Week39のSoftDeletes、関連ドリルのPHPDocと型宣言。

| 問題ID / 学習目標 | 出典 | 正答・主要誤答 / 補助確認 |
|---|---|---|
| question-ph3-week39-assembly-soft-delete-trait<br>Quizで論理削除を有効にします。SoftDeletesはimport済み、deleted_at列もあります。モデル内でトレイトを使ってください。 | curriculum/PH3.md:448 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week39-assembly-deleted-at-column<br>既存quizzesへ論理削除用のdeleted_at列を追加してください。SchemaとBlueprintはimport済みです。 | curriculum/PH3.md:448 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week39-assembly-soft-delete-model<br>$quizはSoftDeletesを使用する取得済みモデルです。論理削除してください。 | curriculum/PH3.md:448 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week39-assembly-phpdoc-property<br>モデルのfirst_nameが文字列だとエディターへ伝えるPHPDocを組み立ててください。実行時の検証にはなりません。 | curriculum/PH3.md:448 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week39-assembly-integer-signature<br>strict_types=1のPHPです。整数だけを受け取り、1増やした整数を返す関数のシグネチャを作ってください。 | curriculum/PH3.md:448 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 固定入力で正誤比較。 |

### week40（5問）

Week33のBreeze、Week40のミドルウェアとGate。サーバー管理のis_adminという条件を設問で指定。

| 問題ID / 学習目標 | 出典 | 正答・主要誤答 / 補助確認 |
|---|---|---|
| question-ph3-week40-assembly-auth-middleware<br>DashboardControllerはimport済みです。GET /adminのログイン確認に、Laravel標準のauthミドルウェアを付けてください。管理者判定は別途必要です。 | curriculum/PH3.md:530 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week40-assembly-admin-redirect<br>認証済み$userのis_adminはサーバーで管理する真偽値です。管理者でない場合だけトップへ戻してください。 | curriculum/PH3.md:530 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week40-assembly-continue-middleware<br>管理者確認が成功したミドルウェアです。$nextは次の処理、$requestは現在のリクエストです。後続へ渡してください。 | curriculum/PH3.md:530 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week40-assembly-gate-admin<br>Userのis_adminはサーバーで管理する真偽値です。manage-quizzesゲートを、管理者の時だけ許可するよう定義してください。 | curriculum/PH3.md:530 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 固定入力で正誤比較。 |
| question-ph3-week40-assembly-authorize-request<br>manage-quizzesゲートは登録済みです。管理用の更新処理を実行する前に、その権限をサーバーで要求してください。 | curriculum/PH3.md:530 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |

### week41（5問）

Week40の管理者認可。Week41のページ分割と管理一覧。

| 問題ID / 学習目標 | 出典 | 正答・主要誤答 / 補助確認 |
|---|---|---|
| question-ph3-week41-assembly-paginate-twenty<br>Quizはimport済みです。id昇順に並べ、1ページ20件ずつ取得してください。 | curriculum/PH3.md:563 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week41-assembly-pagination-links<br>$quizzesはpaginate(20)の結果です。Bladeでページ移動のリンクを表示してください。 | curriculum/PH3.md:563 | 静的意味レビュー済み。静的意味レビューのみ。Blade/Laravelは実行しない。 |
| question-ph3-week41-assembly-resource-index-only<br>UserControllerはimport済みです。resourceルートを一覧indexだけに制限してください。 | curriculum/PH3.md:563 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week41-assembly-admin-edit-guard<br>GET /admin/quizzes/{id}/editは登録済みです。登録済みauthとadminの両ミドルウェアを指定してください。adminはサーバーの管理者判定です。 | curriculum/PH3.md:563 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week41-assembly-stable-pagination<br>QuizをID昇順で安定してページ分割します。ソートを指定してから20件ずつ取得してください。 | curriculum/PH3.md:563 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |

### week42（5問）

Week41の管理用ルート。Week42のFormRequestとエラー確認。DOMイベントはPH1の既習。

| 問題ID / 学習目標 | 出典 | 正答・主要誤答 / 補助確認 |
|---|---|---|
| question-ph3-week42-assembly-request-rules<br>FormRequestでnameを必須・文字列・100文字以内にしてください。 | curriculum/PH3.md:592 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week42-assembly-validated-create<br>StoreQuizRequestはnameだけを検証します。Quizのnameはfillableです。検証済みの値だけで新規クイズを作ってください。 | curriculum/PH3.md:592 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week42-assembly-error-message<br>nameにバリデーションエラーがある時、そのメッセージをBladeで表示してください。 | curriculum/PH3.md:592 | 静的意味レビュー済み。静的意味レビューのみ。Blade/Laravelは実行しない。 |
| question-ph3-week42-assembly-redirect-flash<br>quizzes.storeの保存は成功済みです。登録済みのadmin.quizzes.indexへ戻り、statusのフラッシュメッセージを付けてください。 | curriculum/PH3.md:592 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week42-assembly-all-up-buttons<br>upToSortNumberは定義済みです。全ての.js-up-buttonにclickイベントを登録してください。 | curriculum/PH3.md:592 | 静的意味レビュー済み。TypeScript parserでJSの正答構文確認。 固定入力で正誤比較。 |

### week43（5問）

Week42のFormRequest。Week43のリレーション保存と関連データの検証。

| 問題ID / 学習目標 | 出典 | 正答・主要誤答 / 補助確認 |
|---|---|---|
| question-ph3-week43-assembly-related-create<br>$quizは取得済みです。questionsはhasManyでquiz_idを補います。textはfillableです。検証済み文字列$textから設問を1件作成してください。 | curriculum/PH3.md:634 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week43-assembly-save-choice-model<br>$questionは取得済み、choicesはhasManyです。$choiceは作成済みChoiceモデルです。そのモデルを所属付きで保存してください。 | curriculum/PH3.md:634 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week43-assembly-existing-quiz<br>quiz_idが必須で、quizzesのidとして存在することを検証してください。FormRequest内です。 | curriculum/PH3.md:634 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week43-assembly-correct-choice-range<br>正解の選択肢番号correctは1〜3の整数だけを受け付けます。FormRequestのルールを作ってください。 | curriculum/PH3.md:634 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week43-assembly-multipart-form<br>LaravelのPOSTフォームで画像image_fileを送ります。form開始タグに必要なエンコード指定を組み立ててください。 | curriculum/PH3.md:634 | 静的意味レビュー済み。静的意味レビューのみ。Blade/Laravelは実行しない。 |

### week44（5問）

Week43の設問・選択肢の関連保存。Week39の論理削除、Week42の検証。

| 問題ID / 学習目標 | 出典 | 正答・主要誤答 / 補助確認 |
|---|---|---|
| question-ph3-week44-assembly-update-question<br>$questionは認可確認済みのモデルです。quiz_idとtextはfillableで、$validatedはその2項目だけの検証済み配列です。既存設問を更新してください。 | curriculum/PH3.md:772 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week44-assembly-include-deleted<br>QuizはSoftDeletesを使います。管理一覧に、未削除と論理削除済みの両方を取得してください。 | curriculum/PH3.md:772 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week44-assembly-deleted-label<br>管理一覧の$quizはSoftDeletesモデルです。削除済みなら「削除済み」、そうでなければ「公開中」と表示してください。 | curriculum/PH3.md:772 | 静的意味レビュー済み。静的意味レビューのみ。Blade/Laravelは実行しない。 |
| question-ph3-week44-assembly-custom-required-message<br>FormRequestのsample.requiredに、日本語メッセージを指定してください。messages内の返却配列です。 | curriculum/PH3.md:772 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week44-assembly-update-owned-choice<br>取得済み$questionのchoicesリレーションから、フォームで指定した$choiceIdの1件を取得してください。親設問の認可確認は済んでいます。 | curriculum/PH3.md:772 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |

### week45（5問）

Week33〜44の認証・FormRequest・モデル・セッション。CarbonImmutableの前提は設問内で指定。

| 問題ID / 学習目標 | 出典 | 正答・主要誤答 / 補助確認 |
|---|---|---|
| question-ph3-week45-assembly-post-auth<br>記事作成のPOST /postsへ、標準のauthミドルウェアを付けてください。PostControllerはimport済みです。 | curriculum/PH3.md:807 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week45-assembly-post-required-fields<br>記事のtitleを必須・文字列・100文字以内にします。詳細や画像は別ルールで検証済みとします。 | curriculum/PH3.md:807 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week45-assembly-store-image<br>$requestのimageは画像として検証済みです。publicディスクのposts配下へ保存し、返されたパスを受け取ってください。Laravelのファイル保存APIを使います。 | curriculum/PH3.md:807 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week45-assembly-draft-session<br>$draftは下書きのtitleとbodyを含む配列です。LaravelのWebセッションへpost_draftというキーで保存してください。 | curriculum/PH3.md:807 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week45-assembly-relative-seed-date<br>$nowはCarbonImmutableの日時、$iは1〜19です。$nowを変更せず、その$i日前の日時を求めてください。 | curriculum/PH3.md:807 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |

### week46（5問）

Week45の記事モデル。Week36〜40の先読み・論理削除・認可。JSへの受け渡しは関連ドリルの復習。

| 問題ID / 学習目標 | 出典 | 正答・主要誤答 / 補助確認 |
|---|---|---|
| question-ph3-week46-assembly-posts-with-user<br>Postのuserリレーションは定義済みです。投稿者名を一覧で使うため、投稿者を先読みしid降順に取得してください。 | curriculum/PH3.md:840 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week46-assembly-owner-authorization<br>Postのupdateポリシーは「投稿者本人だけ許可」と実装済みです。Controllerで取得済み$postの更新権限を要求してください。 | curriculum/PH3.md:840 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week46-assembly-soft-delete-post<br>PostはSoftDeletesを使い、deleted_at列があります。$postの削除権限確認は済んでいます。論理削除してください。 | curriculum/PH3.md:840 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week46-assembly-post-detail<br>$idはルートで受け取った投稿IDです。Postを1件取得し、見つからなければ通常404としてください。 | curriculum/PH3.md:840 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week46-assembly-safe-js-data<br>$postsはControllerから渡した配列です。Laravel 10のBladeで、文字列へ二重エンコードせず安全にJavaScriptの値へ渡してください。Jsファサードは使用可能です。 | curriculum/PH3.md:840 | 静的意味レビュー済み。静的意味レビューのみ。Blade/Laravelは実行しない。 |

### week47（5問）

Week40の認証・認可とWeek46の記事アプリ。管理者属性の取り扱いとコンテナ名は設問内で指定。

| 問題ID / 学習目標 | 出典 | 正答・主要誤答 / 補助確認 |
|---|---|---|
| question-ph3-week47-assembly-admin-route-group<br>標準authと、登録済みのadminミドルウェアで管理者一覧を保護してください。adminはサーバーで管理者を確認します。 | curriculum/PH3.md:868 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week47-assembly-list-admin-users<br>Userのis_adminはサーバーで管理する真偽値です。管理者一覧のため、trueの利用者だけ取得してください。一覧へのアクセス認可は確認済みです。 | curriculum/PH3.md:868 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week47-assembly-define-admin-gate<br>view-adminsゲートを、認証済み$userが管理者ならtrueになるよう定義してください。is_adminはサーバー管理です。 | curriculum/PH3.md:868 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 固定入力で正誤比較。 |
| question-ph3-week47-assembly-admin-named-redirect<br>ログインと管理者確認は成功済みです。登録済みの名前付きルートadmin.indexへリダイレクトしてください。 | curriculum/PH3.md:868 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week47-assembly-node-version-check<br>nodeコンテナ内です。Node.jsの実際のバージョンを表示し、別途確認したLTSの指定と照合するコマンドを組み立ててください。 | curriculum/PH3.md:868 | 静的意味レビュー済み。sh -nによる構文確認のみ。コマンドは実行しない。 |

### week48（5問）

Week47の管理者認可。Week39のSoftDeletes、Week43の関連保存、PH1のnpm scripts。

| 問題ID / 学習目標 | 出典 | 正答・主要誤答 / 補助確認 |
|---|---|---|
| question-ph3-week48-assembly-user-soft-delete<br>管理者のユーザー削除権限は確認済みです。UserはSoftDeletesを使いdeleted_at列もあります。取得済み$userを論理削除してください。 | curriculum/PH3.md:890 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week48-assembly-create-post-comment<br>Commentのbodyはfillableです。$postはコメント可能と認可確認済みで、commentsはhasManyです。検証済み文字列$bodyからコメントを作ってください。投稿者IDはサーバー側の既存処理で設定されます。 | curriculum/PH3.md:890 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week48-assembly-comment-owner-policy<br>Commentのuser_idと、認証済みUserのidは整数です。updateポリシーで投稿者本人の時だけtrueを返してください。 | curriculum/PH3.md:890 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 固定入力で正誤比較。 |
| question-ph3-week48-assembly-authorize-comment-delete<br>Commentのdeleteポリシーは本人だけを許可します。取得済み$commentを消す前にControllerで権限を要求してください。 | curriculum/PH3.md:890 | 静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 |
| question-ph3-week48-assembly-mix-production<br>旧ミニドリルのpackage.jsonでは、scripts.productionがNODE_ENV=productionでLaravel Mixを実行し、scripts.devは開発用です。productionを実行するコマンドを組み立ててください。Laravel 10標準のVite設定とは別の教材です。 | curriculum/PH3.md:890 | 静的意味レビュー済み。sh -nによる構文確認のみ。コマンドは実行しない。 |
