# PH3 Week33〜48の4択追加レビュー

2026-10-23。直前に追加したPH3の16Weekへ、4択を各10問、計160問追加。既存のコード組み立て各5問を保持し、各Week15問、PH3全体240問、全体769問となる。既存609問のID・版・本文・作者情報は変更しない。

## 設計と根拠

主教材は`curriculum/PH3.md`の各Weekの要件。補足ドリルは[固定スナップショット](../quiz-sources/PH3/README.md)を使用。各問のauthorに実ファイルの行・SHA、必要なREADME・開始コードを記録。書籍本文・動画・見本画像を確認したとは扱わない。

4択はすべて独立した単一選択。回答IDで採点する共通UIを利用し、Laravel・DBをアプリ内で実行しない。主対象の内訳は言葉の理解20問、知識の選択95問、結果の確認・修正36問、知識の組み立て9問。組み立て問題と同じ概念でも、役割の区別、実装手段の選択、期待結果との差の特定を選択式で練習する。

正答位置はA〜Dそれぞれ40問。各問に固有の3誤答理由・ヒント・解説・次のPC操作を用意。選択だけから理解状態を断定しない。

## 初稿後の別工程の意味レビュー

作者による自己レビューであり、別の講師・学習者による評価ではない。160問の初稿を正本へ保存してから、問題文と4候補を再読し、教材・関連開始コード・公式仕様と照合した。機械検証を意味レビューの代用にしない。

- Week46のJS文字列問題で、内側の二重引用符が構文を壊していた。外側を単一引用符に修正した。
- Week37は取得・個別表示と提供済みスコープ/アクセサを中心とし、未習の編集実装を要求しない。
- Week35のfillableと入力検証、Week38のsession読み書き、Week39の論理/物理削除、Week40の認証/認可を区別する。
- 更新・削除はボタンの非表示だけで守れない。サーバー認可、親子の所属、所有者IDと対象自身のIDを区別する。
- validationの文字数境界、required、integerの番号範囲、existsの表・列を確認。FormRequestのmessagesとattributesを混同しない。
- Week45のループは1以上20未満で19件。CarbonImmutableを明示して基準日の累積変更を避ける。
- Laravel 10の仕様を基本にする。旧ドリルのアクセサを提供済み条件として利用し、Week48のMixは旧構成であることを明記。Node.jsのLTS番号を正答に固定しない。

## 公式資料の照合

[Routing](https://laravel.com/docs/10.x/routing)、[Eloquent](https://laravel.com/docs/10.x/eloquent)、[Relationships](https://laravel.com/docs/10.x/eloquent-relationships)、[Blade](https://laravel.com/docs/10.x/blade)、[Validation](https://laravel.com/docs/10.x/validation)、[Authorization](https://laravel.com/docs/10.x/authorization)、[Pagination](https://laravel.com/docs/10.x/pagination)、[Session](https://laravel.com/docs/10.x/session)、[Factories](https://laravel.com/docs/10.x/eloquent-factories)、[File Storage](https://laravel.com/docs/10.x/filesystem)、[Carbonの月加算](https://carbon.nesbot.com/guide/date-time-manipulation/addition-and-subtraction.html)、[PHP型宣言](https://www.php.net/manual/ja/language.types.declarations.php)。

## 問題別の照合

全行、出典・既習範囲・単一正答・3つの誤答理由・解説を静的確認済み。表の判断は各問題固有の正答理由。Laravelの動作確認済みを意味しない。

| 問題ID | 主対象 | 正答の判断 |
|---|---|---|
| question-ph3-week33-choice-framework-role | 言葉の理解 | 共通機能を活用してアプリ固有の処理に集中できます。 |
| question-ph3-week33-choice-breeze-timing | 知識の選択 | Breezeは認証の雛形を生成するため、作り込む前の導入が教材で勧められています。 |
| question-ph3-week33-choice-env-local | 知識の選択 | .envに環境固有の値を置き、設定ファイルから参照します。 |
| question-ph3-week33-choice-configuration-secret | 知識の選択 | 必要な項目は例で共有し、各環境の秘密値は別に設定します。 |
| question-ph3-week33-choice-migration-evidence | 結果の確認・修正 | マイグレーションの適用状態と実テーブルを照合します。 |
| question-ph3-week33-choice-registration-evidence | 結果の確認・修正 | 画面上の成功と保存されたデータを対応させます。 |
| question-ph3-week33-choice-container-responsibility | 知識の選択 | PHPとartisanファイルの両方が使える場所で実行します。 |
| question-ph3-week33-choice-db-host-network | 知識の選択 | 同じComposeネットワークのDBサービス名で接続先を指定します。 |
| question-ph3-week33-choice-install-versus-start | 結果の確認・修正 | 依存をそろえたこととアプリの動作成功を区別します。 |
| question-ph3-week33-choice-locale-setting | 言葉の理解 | localeは用意された翻訳を選択する設定です。 |
| question-ph3-week34-choice-mvc-controller | 言葉の理解 | コントローラーが取得と表示への受け渡しをつなぎます。 |
| question-ph3-week34-choice-web-route-file | 知識の選択 | 通常のWebルートはroutes/web.phpに登録します。 |
| question-ph3-week34-choice-controller-import | 結果の確認・修正 | 短いクラス名を使うには対応するimportを確認します。 |
| question-ph3-week34-choice-view-dot-path | 知識の選択 | users.indexはusers内のindexビューを指します。 |
| question-ph3-week34-choice-view-variable-key | 知識の組み立て | 元のPHP変数名ではなく、渡したキーを使います。 |
| question-ph3-week34-choice-get-page | 知識の選択 | GETのルートを一覧表示のアクションに結び付けます。 |
| question-ph3-week34-choice-escape-output | 結果の確認・修正 | エスケープでタグを表示用の文字として扱います。 |
| question-ph3-week34-choice-component-purpose | 言葉の理解 | 共通部分をコンポーネントへ集めて変更を反映しやすくします。 |
| question-ph3-week34-choice-route-name | 知識の選択 | routeヘルパーに登録済みの名前を渡します。 |
| question-ph3-week34-choice-action-method | 言葉の理解 | アクションはコントローラー内のpublicメソッドです。 |
| question-ph3-week35-choice-migration-purpose | 言葉の理解 | マイグレーションは構造変更の履歴を共有します。 |
| question-ph3-week35-choice-foreign-key-direction | 知識の組み立て | questionsの各行から所属するquizzesの行へつながります。 |
| question-ph3-week35-choice-nullable-supplement | 知識の選択 | nullableでNULLを許可します。 |
| question-ph3-week35-choice-model-table | 言葉の理解 | Eloquentモデルを通してレコードを扱えます。 |
| question-ph3-week35-choice-fillable-allowlist | 知識の選択 | 必要な列だけをfillableへ指定します。 |
| question-ph3-week35-choice-seeder-versus-migration | 知識の選択 | Seederへ初期データの登録を記述します。 |
| question-ph3-week35-choice-factory-role | 言葉の理解 | Factoryに属性の生成方法を定義し、必要な件数を作れます。 |
| question-ph3-week35-choice-rollback-down | 知識の選択 | 作成したテーブルに対応する削除をdownへ書きます。 |
| question-ph3-week35-choice-choice-parent | 知識の組み立て | question_idでchoicesとquestionsを対応させます。 |
| question-ph3-week35-choice-validation-versus-fillable | 結果の確認・修正 | fillableは必須や長さのルールを検証しません。 |
| question-ph3-week36-choice-has-many-direction | 知識の選択 | Quizから複数のQuestionへhasManyを定義します。 |
| question-ph3-week36-choice-belongs-to-direction | 知識の選択 | Questionはquiz_idが示すQuizに属します。 |
| question-ph3-week36-choice-get-all | 知識の選択 | allで全レコードのコレクションを得ます。 |
| question-ph3-week36-choice-foreach-binding | 知識の組み立て | foreachで各モデルを取り出してnameを表示します。 |
| question-ph3-week36-choice-where-condition | 知識の選択 | whereでnameが一致するものを選びます。 |
| question-ph3-week36-choice-eager-load-purpose | 言葉の理解 | 先読みで関連へのアクセスごとのクエリを避けます。 |
| question-ph3-week36-choice-n-plus-one-diagnose | 結果の確認・修正 | 必要な関連をwithで先読みします。 |
| question-ph3-week36-choice-relation-property-method | 言葉の理解 | 括弧なしで関連の結果を参照します。 |
| question-ph3-week36-choice-route-link-maintain | 知識の選択 | routeヘルパーでクイズ一覧のURLを生成します。 |
| question-ph3-week36-choice-list-empty | 結果の確認・修正 | forelseは一覧の繰り返しと空の場合を分けられます。 |
| question-ph3-week37-choice-crud-read | 言葉の理解 | 詳細表示はReadに対応します。 |
| question-ph3-week37-choice-dynamic-route | 知識の選択 | ルートパラメーターでIDの異なるURLを扱います。 |
| question-ph3-week37-choice-id-fetch | 知識の選択 | findOrFailは対象のモデルか未検出の例外を返します。 |
| question-ph3-week37-choice-detail-nested-load | 知識の選択 | questionsの中のchoicesまで先読みします。 |
| question-ph3-week37-choice-question-choice-loop | 知識の組み立て | 各設問からそのchoicesをたどります。 |
| question-ph3-week37-choice-named-detail-parameter | 知識の選択 | ルートの{id}に2を対応させます。 |
| question-ph3-week37-choice-local-scope-call | 知識の選択 | クエリへfirstGenerationを適用してから取得します。 |
| question-ph3-week37-choice-accessor-read | 知識の選択 | getFullNameAttributeはfull_nameとして読めます。 |
| question-ph3-week37-choice-fillable-diagnosis | 結果の確認・修正 | 保存対象の属性をfillableに含めます。 |
| question-ph3-week37-choice-quiz-filter-evidence | 結果の確認・修正 | 選んだクイズに属する設問だけを表示します。 |
| question-ph3-week38-choice-edit-existing-value | 知識の選択 | 編集時は既存のタイトルを初期表示します。 |
| question-ph3-week38-choice-old-input-fallback | 知識の選択 | oldの第2引数で初期値を指定できます。 |
| question-ph3-week38-choice-update-existing-row | 知識の選択 | updateで同じ行の属性を更新します。 |
| question-ph3-week38-choice-patch-form | 知識の選択 | POSTとメソッド偽装でPATCHを表し、CSRFトークンも送ります。 |
| question-ph3-week38-choice-redirect-after-update | 知識の選択 | 更新後に一覧へリダイレクトします。 |
| question-ph3-week38-choice-flash-message | 言葉の理解 | フラッシュ値を付けてリダイレクトし、一覧で読みます。 |
| question-ph3-week38-choice-session-helper-read | 結果の確認・修正 | キーがあるため保存済みの1を返します。 |
| question-ph3-week38-choice-session-helper-write | 知識の選択 | sessionへ配列を渡して値を書き込みます。 |
| question-ph3-week38-choice-carbon-format | 知識の選択 | Y/m/d H:i:sで年月日と24時間表記の時分秒を出します。 |
| question-ph3-week38-choice-month-no-overflow | 知識の選択 | NoOverflowで対象月の末日へ収めます。 |
| question-ph3-week39-choice-soft-delete-state | 言葉の理解 | 行を残したまま削除日時を記録します。 |
| question-ph3-week39-choice-soft-delete-prerequisites | 知識の選択 | SoftDeletesと削除日時の列をそろえます。 |
| question-ph3-week39-choice-default-excludes-deleted | 結果の確認・修正 | 通常のクエリはdeleted_atが設定された行を除きます。 |
| question-ph3-week39-choice-with-trashed | 知識の選択 | withTrashedで削除済みも対象へ含めます。 |
| question-ph3-week39-choice-force-delete-difference | 知識の選択 | forceDeleteは行を物理削除します。 |
| question-ph3-week39-choice-restore-model | 知識の選択 | restoreで論理削除状態から戻します。 |
| question-ph3-week39-choice-confirmation-cancel | 結果の確認・修正 | 「はい」を選んだときだけ削除処理を実行します。 |
| question-ph3-week39-choice-factory-count | 知識の選択 | countで件数を指定しcreateで保存します。 |
| question-ph3-week39-choice-phpdoc-purpose | 言葉の理解 | PHPDocは補完や静的解析に利用される情報です。 |
| question-ph3-week39-choice-typed-increment | 結果の確認・修正 | 整数の1を渡すと整数の2が返ります。 |
| question-ph3-week40-choice-auth-versus-admin | 結果の確認・修正 | 認証に加えて管理者に許可する認可が必要です。 |
| question-ph3-week40-choice-middleware-role | 言葉の理解 | 共通の認証・認可条件をルートへ適用できます。 |
| question-ph3-week40-choice-hidden-button-insufficient | 知識の選択 | 表示の制御とサーバー側の認可を両方行います。 |
| question-ph3-week40-choice-gate-enforce | 知識の選択 | authorizeで不許可の場合に処理を中断します。 |
| question-ph3-week40-choice-server-admin-flag | 知識の選択 | 管理権限の付与はサーバー側で管理します。 |
| question-ph3-week40-choice-general-user-redirect | 知識の選択 | 管理者以外はwebsiteのトップへリダイレクトします。 |
| question-ph3-week40-choice-admin-redirect | 知識の選択 | 認証・認可の後に管理ダッシュボードへ移動します。 |
| question-ph3-week40-choice-gate-view | 知識の選択 | canで認可に応じて表示を分けられます。 |
| question-ph3-week40-choice-redirect-loop-investigation | 結果の確認・修正 | ルートと認証条件と移動先を対応させて循環を探します。 |
| question-ph3-week40-choice-admin-test-matrix | 結果の確認・修正 | 異なる認証・認可状態でURLへの直接アクセスも確認します。 |
| question-ph3-week41-choice-paginate-twenty | 知識の選択 | paginateでページごとのデータとページ情報を得ます。 |
| question-ph3-week41-choice-pagination-links | 知識の選択 | linksでページ移動用のリンクを表示します。 |
| question-ph3-week41-choice-page-count | 結果の確認・修正 | 45件を20件ずつ分けると20・20・5件です。 |
| question-ph3-week41-choice-stable-page-order | 知識の選択 | 一意な列による順序を固定してページ分割します。 |
| question-ph3-week41-choice-resource-index-only | 知識の選択 | onlyでindexだけに限定できます。 |
| question-ph3-week41-choice-resource-index-method | 言葉の理解 | indexはGETでコレクションの一覧を返します。 |
| question-ph3-week41-choice-resource-except | 知識の選択 | exceptは指定したアクションを登録対象から外します。 |
| question-ph3-week41-choice-edit-endpoint-security | 知識の選択 | 編集画面の閲覧と更新処理のどちらにも認可が必要です。 |
| question-ph3-week41-choice-admin-question-link | 知識の組み立て | 各クイズのIDを対応するメンテナンスルートへ渡します。 |
| question-ph3-week41-choice-only-is-not-authorization | 結果の確認・修正 | onlyは登録するアクションの制限であり認可ではありません。 |
| question-ph3-week42-choice-form-request-role | 言葉の理解 | rulesで入力の妥当性を検証します。 |
| question-ph3-week42-choice-title-rules | 知識の選択 | required・string・maxで各条件を指定します。 |
| question-ph3-week42-choice-validation-boundary | 結果の確認・修正 | 100文字以下を許可し、空文字はrequiredで拒否します。 |
| question-ph3-week42-choice-validated-input | 知識の選択 | validatedで検証済みデータを取得します。 |
| question-ph3-week42-choice-field-error | 知識の選択 | errorで対象フィールドのメッセージを表示します。 |
| question-ph3-week42-choice-success-after-save | 知識の組み立て | 検証と保存を終えてから成功を伝えます。 |
| question-ph3-week42-choice-deleted-label | 知識の選択 | trashedで論理削除済みかを確認できます。 |
| question-ph3-week42-choice-deleted-edit-block | 知識の選択 | 削除済みデータを編集不可にする条件をサーバーにも置きます。 |
| question-ph3-week42-choice-query-selector-all | 結果の確認・修正 | 集合を走査して各ボタンにリスナーを登録します。 |
| question-ph3-week42-choice-error-investigation | 結果の確認・修正 | エラー箇所と入力から仮説を立て、一つずつ確認します。 |
| question-ph3-week43-choice-relation-save-instance | 知識の選択 | saveは渡した子モデルに親の外部キーを対応させて保存します。 |
| question-ph3-week43-choice-relation-create-array | 知識の選択 | createは属性配列を受け取り親と関連するモデルを作成します。 |
| question-ph3-week43-choice-parent-key-auto | 言葉の理解 | リレーションが所属先の外部キーを補います。 |
| question-ph3-week43-choice-save-many-models | 知識の選択 | saveManyでモデルの配列を関連保存できます。 |
| question-ph3-week43-choice-loaded-relation-refresh | 結果の確認・修正 | refreshでモデルと読み込み済み関連を読み直します。 |
| question-ph3-week43-choice-quiz-exists-rule | 知識の選択 | existsで指定した表に値があるか確認します。 |
| question-ph3-week43-choice-correct-choice-range | 知識の選択 | integerとbetweenで範囲内の整数に限定します。 |
| question-ph3-week43-choice-question-text-limit | 結果の確認・修正 | 250文字は200文字以内の条件に適合しません。 |
| question-ph3-week43-choice-choice-fields-required | 結果の確認・修正 | 3つすべてに必要なテキストを求めます。 |
| question-ph3-week43-choice-multipart-upload | 結果の確認・修正 | multipart/form-dataでファイルデータを送ります。 |
| question-ph3-week44-choice-question-soft-delete | 知識の選択 | SoftDeletesを使うdeleteで行を残します。 |
| question-ph3-week44-choice-admin-includes-deleted | 知識の選択 | withTrashedで両方を含め、状態をラベルで示します。 |
| question-ph3-week44-choice-disabled-server-update | 知識の選択 | 削除状態に応じた操作制限を保存処理にも適用します。 |
| question-ph3-week44-choice-related-choice-update | 結果の確認・修正 | 親を起点に取得すれば別の設問の子を取り違えずに済みます。 |
| question-ph3-week44-choice-reassign-quiz | 知識の組み立て | quiz_idを更新して所属先を変えます。 |
| question-ph3-week44-choice-edit-validation-retained | 知識の選択 | 更新時も必須と長さなどの制約を確認します。 |
| question-ph3-week44-choice-custom-message-method | 知識の選択 | messagesで検証エラー文を指定できます。 |
| question-ph3-week44-choice-custom-message-key | 知識の選択 | sample.requiredでその欄の必須エラーを指定します。 |
| question-ph3-week44-choice-admin-delete-auth | 知識の選択 | 管理者認可を削除処理の入口で強制します。 |
| question-ph3-week44-choice-edit-check-related-data | 結果の確認・修正 | 親子の関連と選択肢の正誤をまとめて照合します。 |
| question-ph3-week45-choice-post-required-fields | 知識の選択 | 必要な項目はサーバーでも検証してから保存します。 |
| question-ph3-week45-choice-post-author-id | 知識の選択 | 投稿者は信頼できる認証情報に結び付けます。 |
| question-ph3-week45-choice-session-draft-purpose | 言葉の理解 | 下書き保存で入力を一時的に引き継げます。 |
| question-ph3-week45-choice-draft-read-default | 知識の選択 | キーがなければ空配列を返し、あれば保存値を読みます。 |
| question-ph3-week45-choice-draft-clear-on-success | 知識の組み立て | 成功後に不要になった下書きだけを消します。 |
| question-ph3-week45-choice-uploaded-file-check | 知識の選択 | 画像の内容とサイズなどの条件をサーバーで確認します。 |
| question-ph3-week45-choice-upload-path-record | 知識の選択 | 保存したファイルを後で参照できるパスを記録します。 |
| question-ph3-week45-choice-login-required-post | 知識の選択 | 認証された利用者だけが作成できるようにします。 |
| question-ph3-week45-choice-relative-seed-date | 知識の選択 | Immutableの基準日は変更せず、各$i日前を得られます。 |
| question-ph3-week45-choice-seed-loop-boundary | 結果の確認・修正 | 1以上20未満なので1〜19を使います。 |
| question-ph3-week46-choice-post-user-eager | 知識の選択 | userを先読みして各記事の投稿者名を表示します。 |
| question-ph3-week46-choice-post-owner-compare | 知識の選択 | user_idで所有者を対応させます。 |
| question-ph3-week46-choice-policy-update-enforce | 知識の選択 | updateの認可後に検証済みデータを保存します。 |
| question-ph3-week46-choice-soft-delete-post-list | 結果の確認・修正 | 標準では論理削除された記事が除外されます。 |
| question-ph3-week46-choice-post-detail-id | 知識の選択 | 指定された記事を取得し、未検出なら404にします。 |
| question-ph3-week46-choice-owner-delete-test | 結果の確認・修正 | サーバー側で他人の記事を守れているか確認します。 |
| question-ph3-week46-choice-edit-author-not-change | 知識の選択 | 認可に使う投稿者情報を利用者の入力で置き換えません。 |
| question-ph3-week46-choice-js-safe-json | 知識の選択 | Js::fromで適切にエスケープしたJSの値を生成します。 |
| question-ph3-week46-choice-json-object-versus-string | 結果の確認・修正 | 引用符で囲んだ値は文字列であり、配列ではありません。 |
| question-ph3-week46-choice-post-title-escape | 知識の選択 | 通常の{{ }}でタイトルを文字として表示します。 |
| question-ph3-week47-choice-admin-list-auth | 知識の選択 | 管理者だけが許可される条件をサーバーで強制します。 |
| question-ph3-week47-choice-admin-only-records | 知識の選択 | is_adminの値で管理者の行だけを取得します。 |
| question-ph3-week47-choice-login-page-not-proof | 結果の確認・修正 | 認証された利用者の管理権限を別途確認します。 |
| question-ph3-week47-choice-admin-flag-not-request | 結果の確認・修正 | サーバー側に保持した認証済み利用者の権限を参照します。 |
| question-ph3-week47-choice-admin-controller-gate | 知識の選択 | authorizeで許可のないアクセスを中断します。 |
| question-ph3-week47-choice-admin-group-coverage | 結果の確認・修正 | 管理用の各ルートに共通の認証・認可を適用します。 |
| question-ph3-week47-choice-admin-list-safe-fields | 知識の選択 | 一覧の目的に不要な認証情報は返しません。 |
| question-ph3-week47-choice-node-lts-verification | 知識の選択 | 現在の公式情報と実行中のNode.jsの版を対応させます。 |
| question-ph3-week47-choice-compose-node-service | 知識の選択 | imageのタグが使うイメージの版を指定します。 |
| question-ph3-week47-choice-admin-login-destination | 知識の選択 | 認可後に管理者一覧へリダイレクトします。 |
| question-ph3-week48-choice-user-list-admin | 知識の選択 | 管理者専用のルートに認証と認可を適用します。 |
| question-ph3-week48-choice-soft-delete-user-evidence | 結果の確認・修正 | SoftDeletesのdeleteは削除日時を記録します。 |
| question-ph3-week48-choice-user-delete-server-check | 知識の選択 | 直接送信されても管理者以外を拒否します。 |
| question-ph3-week48-choice-comment-post-relation | 言葉の理解 | post_idで記事とコメントを関連付けます。 |
| question-ph3-week48-choice-comment-create-parent | 知識の選択 | createで親に関連するコメントを作れます。 |
| question-ph3-week48-choice-comment-owner-reference | 知識の選択 | commentのuser_idが認証済み利用者のidと一致するか調べます。 |
| question-ph3-week48-choice-comment-delete-authorize | 知識の選択 | 削除権限を確認してから削除します。 |
| question-ph3-week48-choice-article-comments-filter | 知識の選択 | 親記事のcommentsで所属を限定します。 |
| question-ph3-week48-choice-comment-edit-fields | 知識の選択 | 許可した本文だけを検証して更新します。 |
| question-ph3-week48-choice-legacy-build-script | 知識の選択 | npm run productionで指定された本番用ビルドを起動します。 |

## 検証範囲と限界

コンテンツ検証・生成、全候補の正誤/理由、各WeekのWeb/Native条件で10問完了・ヒント・保存復元・二重確定を自動確認する。Laravelアプリの起動、ルート実行、Blade描画、DBへの保存、認可の実動作、画像アップロード、Mixは実行していない。Native実機も未確認。これらの実行結果を正答判定に使わない4択として公開する。

## UIの修正と実画面での確認

- ChoiceWorkspaceのタグ条件を明示的なbooleanにし、View直下へ文字列が漏れる条件式を解消。既存スタイルの比較で失敗していた3件は元のスタイルを保ち、折りたたみ解説・アイコンヒントの追加スタイルを分離した。
- 誤答時に誤答理由だけでなく、正答の解説と次のPC操作も開いて読めるよう修正。折りたたみと初回読了XPの挙動は継続。
- localhostでHMR後に再読み込みすると、古いPWAキャッシュの5問版へ戻る現象を再現。新しい4択IDを旧教材が認識できず、復元時に途中セッションが破棄されていた。public/sw.jsのキャッシュをv10へ更新し、loopback環境とMetroのdev=trueリクエストではキャッシュ応答しないよう修正。通知のService Worker登録は維持する。公開環境の静的ファイルの取得方針もテストで確認。
- XpRewardとプロフィールのpointerEventsをViewのスタイルへ移し、ブラウザの非推奨警告を解消。
- Chromeのlocalhost:8081、390×844でWeek41の4択10問を重複なく完了。ヒント、正答、誤答、長いコードの折り返し、つまづきポイント、読了+5XPを確認。横スクロール幅390pxで画面幅と一致。
- キャッシュ修正後は、1問目の選択後に再読み込みしても選択状態を復元。10問完了後の再読み込みでも完了状態を保持し、「Weekを選ぶ」で/materialsへ遷移。完了時+100XPを表示し、材料一覧は10/15問へ更新。最終の新規ページ読み込みではconsole error/warnとも0件。表示幅は確認後に元へ戻した。
- 開発用アカウントへ画面確認の回答を記録した。アカウント設定の変更・回答履歴のリセットは行っていない。本番への配信は行っていない。

## 検証コマンド

- npm run content:validate / content:build：49単元、769問。
- npm run test:content：全候補の採点を含む832件に加え、JSの提示コードを実際に評価する回帰テスト1件が成功（計833件）。
- npm run test:ui：17件成功。元デザイン、文字列条件、XP計算、開発用キャッシュの回帰確認。
- npm run typecheck / lint / export:web：成功。
- npm run test:notifications：3件成功。test:release：7件成功。
- node scripts/check-ph3-examples.cjs：既存の組み立て80問の補助確認が引き続き成功。新4択を組み立て問題の検証へ混ぜないよう対象を明示した。
- 追加前の正本609件と照合し、すべての既存エントリが完全一致することを確認。既存問題の版は維持した。

Native実機とLaravel本体の実行は未確認。4択の出典・意味とアプリの選択採点は確認済み。
