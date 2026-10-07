# PH2 Week17〜32 作問・レビュー記録

2026-10-07。各Week12問、16単元・192問を追加する。4分類は各48問。既存PH1・Gitの202問を保持し、公開データは合計394問・33単元となる。作成と別の工程で再確認したAIによる自己レビューであり、指導者・学習者のレビューではない。

## 方針・根拠・形式

インプットから課題へ進む間の、言葉の理解・知識の選択・知識の組み立て・結果の確認修正を小さく練習する。各問は前問に依存せず、この問題の状況から回答できる。各Weekで3問ずつを各分類へ配分したが、今後の必須比率ではない。

- インプット：curriculum/PH2/Week17〜28.mdとWeek32.md、およびPH2.md。
- ドリル：drill-ph2/src/week17〜32のREADME・開始コード、およびdb/init.sqlなど。PH1ドリルをPH2の根拠へ流用しない。
- Week29〜31はPH2.mdの各Weekで「インプット教材なし」と明記されている。存在しないWeek別インプットファイルを出典にせず、同じWeekの課題とドリルを既習知識の応用として扱う。
- Week19・20・22などには書籍の章案内だけの部分がある。書籍本文を取得したとは扱わず、確認できたローカルの説明・課題・ドリルと公式資料を根拠に制作する。
- ドリルの題材とPOSSE課題が異なるWeekでは双方を区別する。例：Week29のSQL集計とTo-Do一覧、Week30の日週月集計とCRUD、Week31の二次元配列と利用者ごとのTo-Do、Week32のチャートと非同期通信。

全192問を既存のWeb・Native共通の候補選択UIで回答する。PHP・MySQL・Docker・Composer・Carbon・Google Charts・通信をアプリ内で実行する機能は追加しない。選択肢IDによる採点と、教材上の正しさは別工程で確認する。

形式：単一選択94問、穴埋め68問、バグ診断30問。

## Weekと課題へのつながり

| Week | 学ぶ判断 | 根拠の主な課題 | 問題数 |
|---|---|---|---:|
| 17 | Dockerと開発環境 | 共有パス・ポート変更・db接続 | 12 |
| 18 | PHPの変数・配列・条件分岐・ループ | 配列の表示・forとif・商品の反復表示 | 12 |
| 19 | データベース・テーブル・SQLの絞り込み | books作成・日付/部分一致抽出・問題/選択肢の表設計 | 12 |
| 20 | SQLの実行・集計・グループ化 | 注文別の種類数・個数・代金集計 | 12 |
| 21 | PDO接続・取得・並べ替え | PDO接続・students取得・id降順の上位2件 | 12 |
| 22 | 結合・副問い合わせ・データ整形 | 注文と明細の結合・合計条件・明細の不在 | 12 |
| 23 | PHPの関数・文字列・配列変換 | 日本語の切り出し・implode・array_mapによる四捨五入 | 12 |
| 24 | GET・POST・フォーム・INSERT | GETの1件/複数値・POST入力・問題の作成 | 12 |
| 25 | UPDATE・DELETE | 学生更新・学習記録と学生の削除 | 12 |
| 26 | ログイン・セッション・ログアウト | ログイン成功時のID保存・ログアウト | 12 |
| 27 | 入力検証・パスワードのハッシュ | メール形式・必須・最小長・ハッシュ照合 | 12 |
| 28 | Composerとライブラリ | Carbonの導入/読み込みと画像用依存の管理 | 12 |
| 29 | SQLの期間集計・To-Do一覧 | 期間/学生/内容別の時間合計・To-Doの一覧 | 12 |
| 30 | 日週月の集計・To-DoのCRUD | 学生別の日週月集計・To-DoのCRUD | 12 |
| 31 | 二次元配列・ユーザーごとのTo-Do | 日付と時間の二次元配列・所有者別の取得 | 12 |
| 32 | 非同期通信・JSON・チャート | チャートの列と行・非同期の削除/追加と表示更新 | 12 |

## 教材の不整合とレビューでの調整

- Week18のドリルは「12より大きい」に12が含まれる。クイズは「12未満／12以上」で条件を明確化。
- Week19の「2005年以降」と例の厳密な>の差は、境界を含む>=として出題。
- Week20の代金の期待出力は、現在のdb/init.sqlの単価×個数と一致しない。クイズは小さい固定データを提示して自力で照合できるようにする。
- Week22の「10000円以上」とSQL例の>の差は>=として出題。グループ化には注文/学生のIDと必要な表示列を含め、同姓同名や集計範囲の混同を避ける。
- Week23のREADMEにはWeek24のパス・題名が混じる。実在するweek23-*の開始コードを根拠にする。roundの誤答候補strlenは3.56から偶然4を返し得るため、intvalへ変更。
- Week24のドリル2に誤ったアクセス先番号がある。受信する複数キーの目的を使い、パスの誤記を正答として引き継がない。
- Week26の登録INSERTには列数と値数の不一致、平文パスワードの例、Week27内容へのWeek28表記がある。クイズは本人確認済みの前提とセッション保存を分け、平文保存を推奨しない。次のWeek27でpassword_hash/verifyを対応させる。未習の??構文は固定コードから除いた。
- Week27のtype=passwordは表示を隠す指定であり、形式検証そのものと扱わない。strlenはASCII条件を付ける。emptyの"0"扱い、ハッシュを推測できないという断定も一般化しない。
- Week28はcomposer.lockとjsonの整合性を明記。installがjsonを無条件に無視すると教えない。
- Week29はDATETIMEの25日夜を含めるため翌日未満の範囲を使う。
- Week30の週開始の修正案で「日付に+1」は解釈によって同じ結果になるため、明確に誤りとなる「WEEKDAYの+1を+2へ変える」へ変更。
- Week31のStudyクラスとgetterは提供済みの前提として説明し、この問題でクラスの新規実装を要求しない。
- Week32は日付文字列と数値の型を明記。PHPのJSONとJSの配列を対応させ、HTTP失敗と通信完了を分ける。

補足確認：[PHPのimplode](https://www.php.net/manual/en/function.implode.php)、[mb_substr](https://www.php.net/manual/en/function.mb-substr.php)、[array_map](https://www.php.net/manual/en/function.array-map.php)、[password_verify](https://www.php.net/manual/en/function.password-verify.php)、[session_destroy](https://www.php.net/manual/en/function.session-destroy.php)、[Composer](https://getcomposer.org/doc/01-basic-usage.md)、[MySQLの日付関数](https://dev.mysql.com/doc/refman/8.0/en/date-and-time-functions.html)、[Google ChartsのDataTable](https://developers.google.com/chart/interactive/docs/reference#DataTable)、[Composeのexec](https://docs.docker.com/reference/cli/docker/compose/exec/)。

## コードの補助検証

PHP 8.4.13 CLIで23問の全候補を通常・境界の124ケースで実行し、正答候補だけが全期待結果へ一致することを確認。実DB・ネットワーク・ログインセッションを操作しない隔離入力を使用。結果：[PHPの確認記録](ph2-php-checks.json)。再実行は`python3 scripts/check-ph2-php.py`（ローカルPHPが必要）。

SQL17問の全68候補をSQLiteのメモリDBで補助確認。日付境界、片方だけの条件を満たす行、複数明細、明細なし、対象外の所有者を含む小さい入力を使う。MySQL固有の型・モード・日付関数を実行確認したという意味ではない。MySQL固有の式は静的に公式資料と照合。結果：[SQLの確認記録](ph2-sql-checks.json)。再実行は`python3 scripts/check-ph2-sql.py`（Python標準ライブラリのみ）。

## 問題ごとの意味の確認

全192問の問題文・正答・全誤答理由・解説・出典・固定コードの前提を、作成後に再読した。以下はその確認基準。自動テストのID採点だけで教材上の正しさを判定したとは扱わない。個別の出典・行・SHA・補足ドリル・ヒント・採点条件はWeek別JSONのauthorを参照。

| 問題ID | 確認した判断・学習目標 | 検証範囲 |
|---|---|---|
| question-ph2-week17-container-001 | コンテナを実行環境として説明する | 静的な意味確認 |
| question-ph2-week17-compose-002 | Composeとアプリの処理を区別する | 静的な意味確認 |
| question-ph2-week17-port-003 | ホストとコンテナのポートを対応させる | 静的な意味確認 |
| question-ph2-week17-up-004 | 起動の目的からupを選ぶ | 静的な意味確認 |
| question-ph2-week17-exec-005 | コンテナ内に入る操作を選ぶ | 静的な意味確認 |
| question-ph2-week17-host-port-006 | アクセス先からポート対応を決める | 静的な意味確認 |
| question-ph2-week17-mount-007 | 共有元と共有先を複数サービスにつなぐ | 静的な意味確認 |
| question-ph2-week17-mysql-flow-008 | コンテナとMySQLへの接続を組み立てる | 静的な意味確認 |
| question-ph2-week17-environment-009 | 環境差と再現の必要条件を結びつける | 静的な意味確認 |
| question-ph2-week17-yaml-path-010 | 未指定の共有元を修正する | 静的な意味確認 |
| question-ph2-week17-allocated-011 | ポート競合から調査対象を絞る | 静的な意味確認 |
| question-ph2-week17-verify-start-012 | 起動結果と画面表示を照合する | 静的な意味確認 |
| question-ph2-week18-php-side-001 | PHPの実行場所と結果を区別する | 静的な意味確認 |
| question-ph2-week18-variable-002 | PHPの変数の参照を識別する | PHP全候補実行 |
| question-ph2-week18-assoc-003 | 連想配列のキーと値を区別する | 静的な意味確認 |
| question-ph2-week18-dump-004 | 値と型の確認方法を選ぶ | PHP全候補実行 |
| question-ph2-week18-if-boundary-005 | 未満と以下を条件式へ対応させる | PHP全候補実行 |
| question-ph2-week18-concat-006 | 文字列をつなぐ手段を選ぶ | PHP全候補実行 |
| question-ph2-week18-foreach-value-007 | 配列の各値と出力をつなぐ | PHP全候補実行 |
| question-ph2-week18-sum-008 | 初期値・繰り返し・累積を組む | PHP全候補実行 |
| question-ph2-week18-for-range-009 | ループの開始・終了・更新をつなぐ | PHP全候補実行 |
| question-ph2-week18-array-echo-010 | 配列と出力関数の不一致を直す | 静的な意味確認 |
| question-ph2-week18-wrong-key-011 | 出力値の違いから参照キーを修正する | 静的な意味確認 |
| question-ph2-week18-range-tests-012 | 境界での結果を照合する | 静的な意味確認 |
| question-ph2-week19-database-001 | DBの役割を説明する | 静的な意味確認 |
| question-ph2-week19-row-column-002 | 行と列を実際のデータへ対応させる | 静的な意味確認 |
| question-ph2-week19-primary-key-003 | 主キーと表示文字の役割を区別する | 静的な意味確認 |
| question-ph2-week19-create-004 | テーブル作成の命令を選ぶ | 静的な意味確認 |
| question-ph2-week19-date-column-005 | 要求から参照する列を選ぶ | SQLロジック補助確認 |
| question-ph2-week19-like-006 | 部分一致の手段を選ぶ | SQLロジック補助確認 |
| question-ph2-week19-combined-where-007 | 日付とタイトルの条件を組み合わせる | SQLロジック補助確認 |
| question-ph2-week19-table-split-008 | 表を分けた後のID関係をつなぐ | 静的な意味確認 |
| question-ph2-week19-select-result-009 | 取得する項目と保存先をつなぐ | 静的な意味確認 |
| question-ph2-week19-inclusive-date-010 | 含める境界から比較演算子を直す | 静的な意味確認 |
| question-ph2-week19-pattern-011 | 検索漏れからパターンを修正する | 静的な意味確認 |
| question-ph2-week19-verify-query-012 | 抽出条件の境界を確認する | 静的な意味確認 |
| question-ph2-week20-init-001 | 初期SQLファイルの役割を説明する | 静的な意味確認 |
| question-ph2-week20-database-box-002 | DBシステムとデータベースを区別する | 静的な意味確認 |
| question-ph2-week20-group-003 | グループのキーを集計単位へ対応させる | 静的な意味確認 |
| question-ph2-week20-count-004 | 明細の件数を数える集計を選ぶ | SQLロジック補助確認 |
| question-ph2-week20-quantity-005 | 個数合計に合う列と関数を選ぶ | SQLロジック補助確認 |
| question-ph2-week20-price-times-006 | 代金の要求から集計式を選ぶ | SQLロジック補助確認 |
| question-ph2-week20-total-example-007 | 明細の計算と全体の合計をつなぐ | 静的な意味確認 |
| question-ph2-week20-group-key-008 | 集計値とグループのキーを組む | SQLロジック補助確認 |
| question-ph2-week20-sql-flow-009 | SQLの保存・実行・照合を組む | 静的な意味確認 |
| question-ph2-week20-sum-vs-count-010 | 結果の違いから集計関数を直す | 静的な意味確認 |
| question-ph2-week20-missing-multiply-011 | 明細金額の計算漏れを修正する | 静的な意味確認 |
| question-ph2-week20-missing-table-012 | DBエラーから設定と実行結果を確認する | 静的な意味確認 |
| question-ph2-week21-pdo-001 | PDOの役割を説明する | 静的な意味確認 |
| question-ph2-week21-dsn-002 | DSNの項目を接続条件へ対応させる | 静的な意味確認 |
| question-ph2-week21-descending-003 | 降順を具体的な並びへ対応させる | 静的な意味確認 |
| question-ph2-week21-db-host-004 | Compose内のDB接続先を選ぶ | 静的な意味確認 |
| question-ph2-week21-query-005 | DBの取得方法を選ぶ | 静的な意味確認 |
| question-ph2-week21-limit-006 | 件数の要求をLIMITへ対応させる | SQLロジック補助確認 |
| question-ph2-week21-row-property-007 | SQLの列とPHPの行参照をつなぐ | 静的な意味確認 |
| question-ph2-week21-connect-render-008 | 接続・取得・出力を順につなぐ | 静的な意味確認 |
| question-ph2-week21-top-two-result-009 | 並べ替えと取り出す件数を組み合わせる | 静的な意味確認 |
| question-ph2-week21-wrong-db-010 | 接続エラーからDB名を修正する | 静的な意味確認 |
| question-ph2-week21-wrong-order-011 | 結果の順序から方向指定を修正する | 静的な意味確認 |
| question-ph2-week21-exception-012 | 例外から接続の前提を調べる | 静的な意味確認 |
| question-ph2-week22-join-001 | 結合を表同士の関係へ対応させる | 静的な意味確認 |
| question-ph2-week22-having-002 | 集計後の条件の役割を説明する | 静的な意味確認 |
| question-ph2-week22-not-exists-003 | 副問い合わせの存在条件を説明する | 静的な意味確認 |
| question-ph2-week22-join-key-004 | 関係に合う結合キーを選ぶ | SQLロジック補助確認 |
| question-ph2-week22-aggregate-filter-005 | 集計条件に合う句を選ぶ | SQLロジック補助確認 |
| question-ph2-week22-missing-child-006 | 明細の不在を抽出する条件を選ぶ | SQLロジック補助確認 |
| question-ph2-week22-group-result-007 | 結合とグループ集計をつなぐ | 静的な意味確認 |
| question-ph2-week22-join-numbers-008 | 1対多の関係を具体的な件数で確認する | 静的な意味確認 |
| question-ph2-week22-correlated-flow-009 | 外側と内側の条件をつなぐ | 静的な意味確認 |
| question-ph2-week22-wrong-join-010 | IDの意味の取り違えを修正する | 静的な意味確認 |
| question-ph2-week22-wrong-threshold-011 | 集計条件の境界を修正する | 静的な意味確認 |
| question-ph2-week22-join-check-012 | 副問い合わせの抽出結果を照合する | 静的な意味確認 |
| question-ph2-week23-function-001 | 引数と戻り値を区別する | 静的な意味確認 |
| question-ph2-week23-mb-substr-002 | 切り出し関数の引数を読める | 静的な意味確認 |
| question-ph2-week23-array-map-003 | 変換関数の戻り値を説明する | 静的な意味確認 |
| question-ph2-week23-implode-004 | 連結の目的から区切り文字を選ぶ | PHP全候補実行 |
| question-ph2-week23-substring-length-005 | 開始位置と切り出す長さを選ぶ | PHP全候補実行 |
| question-ph2-week23-round-006 | 期待する数値処理の関数を選ぶ | PHP全候補実行 |
| question-ph2-week23-callback-007 | 変換する関数と対象配列をつなぐ | PHP全候補実行 |
| question-ph2-week23-map-results-008 | 各要素の戻り値を配列へ組む | 静的な意味確認 |
| question-ph2-week23-return-009 | 関数の計算と戻り値をつなぐ | PHP全候補実行 |
| question-ph2-week23-implode-order-010 | 関数の引数の順序を修正する | 静的な意味確認 |
| question-ph2-week23-missing-return-011 | 変換の戻り値不足を直す | 静的な意味確認 |
| question-ph2-week23-read-docs-012 | 資料から関数を選び検証する | 静的な意味確認 |
| question-ph2-week24-request-response-001 | HTTPの往復を説明する | 静的な意味確認 |
| question-ph2-week24-name-002 | HTMLの属性と受信キーを区別する | 静的な意味確認 |
| question-ph2-week24-placeholder-003 | 値を渡すプレースホルダーを説明する | 静的な意味確認 |
| question-ph2-week24-get-004 | URLの値を取得する方法を選ぶ | PHP全候補実行 |
| question-ph2-week24-post-005 | フォームから値を読む手段を選ぶ | PHP全候補実行 |
| question-ph2-week24-insert-006 | 作成に合うSQLを選ぶ | 静的な意味確認 |
| question-ph2-week24-bind-007 | 受信値とバインドをつなぐ | 静的な意味確認 |
| question-ph2-week24-prepare-flow-008 | PDOの準備・バインド・実行を組む | 静的な意味確認 |
| question-ph2-week24-get-loop-009 | 受信する配列と反復をつなぐ | PHP全候補実行 |
| question-ph2-week24-input-id-only-010 | 送信されない入力の属性を修正する | 静的な意味確認 |
| question-ph2-week24-binding-mismatch-011 | SQLとバインドの不一致を直す | 静的な意味確認 |
| question-ph2-week24-post-security-012 | 送信方法と値の検証を区別する | 静的な意味確認 |
| question-ph2-week25-update-001 | 更新の対象を説明する | 静的な意味確認 |
| question-ph2-week25-where-002 | 削除の条件を説明する | 静的な意味確認 |
| question-ph2-week25-hidden-003 | 表示しないIDの役割を説明する | 静的な意味確認 |
| question-ph2-week25-update-sql-004 | 更新する値の指定を選ぶ | 静的な意味確認 |
| question-ph2-week25-delete-sql-005 | 削除に合う命令を選ぶ | 静的な意味確認 |
| question-ph2-week25-dependent-delete-006 | 関連する行の削除条件を選ぶ | SQLロジック補助確認 |
| question-ph2-week25-bind-id-007 | 対象IDとSQLの条件をつなぐ | 静的な意味確認 |
| question-ph2-week25-delete-order-008 | 関連テーブルの削除順を組む | 静的な意味確認 |
| question-ph2-week25-update-check-009 | 更新範囲を結果と照合する | 静的な意味確認 |
| question-ph2-week25-missing-where-010 | 更新対象の限定漏れを修正する | 静的な意味確認 |
| question-ph2-week25-wrong-delete-key-011 | IDの用途の混同を直す | 静的な意味確認 |
| question-ph2-week25-refresh-read-012 | 更新後の取得と表示のずれを修正する | 静的な意味確認 |
| question-ph2-week26-session-001 | セッションIDと保存する情報を区別する | 静的な意味確認 |
| question-ph2-week26-cookie-002 | CookieのセッションIDの役割を説明する | 静的な意味確認 |
| question-ph2-week26-signup-login-003 | ユーザー登録と認証を区別する | 静的な意味確認 |
| question-ph2-week26-start-session-004 | セッションを使う前の処理を選ぶ | 静的な意味確認 |
| question-ph2-week26-store-id-005 | 認証成功後に保存する値を選ぶ | PHP全候補実行 |
| question-ph2-week26-guard-006 | ログイン状態の確認条件を選ぶ | 静的な意味確認 |
| question-ph2-week26-login-flow-007 | 認証の確認と状態保存を組む | 静的な意味確認 |
| question-ph2-week26-logout-flow-008 | ログアウトの処理を順につなぐ | 静的な意味確認 |
| question-ph2-week26-redirect-exit-009 | 遷移指示と実行停止をつなぐ | 静的な意味確認 |
| question-ph2-week26-destroy-only-010 | ログアウト時に残る値を修正する | 静的な意味確認 |
| question-ph2-week26-no-user-011 | 空の検索結果への参照を修正する | 静的な意味確認 |
| question-ph2-week26-auth-tests-012 | 認証の成功・失敗を結果と照合する | 静的な意味確認 |
| question-ph2-week27-validation-001 | 入力検証の役割を説明する | 静的な意味確認 |
| question-ph2-week27-server-validation-002 | 検証する場所の役割を区別する | 静的な意味確認 |
| question-ph2-week27-hash-003 | ハッシュの保存と照合を説明する | 静的な意味確認 |
| question-ph2-week27-email-format-004 | メール形式の検証方法を選ぶ | PHP全候補実行 |
| question-ph2-week27-empty-005 | 必須入力の判定を選ぶ | PHP全候補実行 |
| question-ph2-week27-password-verify-006 | ハッシュとの照合方法を選ぶ | PHP全候補実行 |
| question-ph2-week27-validation-sequence-007 | 検証・変換・保存を組む | 静的な意味確認 |
| question-ph2-week27-minimum-length-008 | 入力の長さと境界条件をつなぐ | PHP全候補実行 |
| question-ph2-week27-store-hash-009 | ハッシュの作成と保存をつなぐ | PHP全候補実行 |
| question-ph2-week27-boundary-bug-010 | 最小文字数の境界を修正する | 静的な意味確認 |
| question-ph2-week27-plain-compare-011 | ハッシュ照合の方法の不一致を修正する | 静的な意味確認 |
| question-ph2-week27-validation-tests-012 | 検証の条件と結果を確認する | 静的な意味確認 |
| question-ph2-week28-composer-001 | Composerの役割を説明する | 静的な意味確認 |
| question-ph2-week28-json-002 | 依存の宣言を説明する | 静的な意味確認 |
| question-ph2-week28-lock-003 | 宣言とロック情報を区別する | 静的な意味確認 |
| question-ph2-week28-install-004 | 固定された依存をそろえる操作を選ぶ | 静的な意味確認 |
| question-ph2-week28-require-005 | 依存を追加する操作を選ぶ | 静的な意味確認 |
| question-ph2-week28-autoload-006 | ライブラリの読み込み先を選ぶ | 静的な意味確認 |
| question-ph2-week28-install-use-flow-007 | 依存の準備と利用をつなぐ | 静的な意味確認 |
| question-ph2-week28-carbon-now-008 | ライブラリの戻り値と出力をつなぐ | 静的な意味確認 |
| question-ph2-week28-reproduce-009 | 依存設定を環境の再現へつなぐ | 静的な意味確認 |
| question-ph2-week28-missing-autoload-010 | クラスの読み込み不足を修正する | 静的な意味確認 |
| question-ph2-week28-lock-edit-011 | 依存宣言とlockの不一致を解消する | 静的な意味確認 |
| question-ph2-week28-test-library-012 | 導入と使用の結果を確認する | 静的な意味確認 |
| question-ph2-week29-sum-hours-001 | 集計関数と対象値を説明する | 静的な意味確認 |
| question-ph2-week29-datetime-002 | 日付範囲と時刻の関係を説明する | 静的な意味確認 |
| question-ph2-week29-todo-status-003 | To-Doの状態を保存項目へ対応させる | 静的な意味確認 |
| question-ph2-week29-date-range-004 | 期間合計の対象条件を選ぶ | SQLロジック補助確認 |
| question-ph2-week29-student-filter-005 | 人の条件から所属列を選ぶ | SQLロジック補助確認 |
| question-ph2-week29-content-filter-006 | 内容の条件から列を選ぶ | SQLロジック補助確認 |
| question-ph2-week29-person-period-007 | 人と日付範囲を組み合わせる | SQLロジック補助確認 |
| question-ph2-week29-sum-example-008 | 抽出と合計を具体値で組む | 静的な意味確認 |
| question-ph2-week29-todo-list-flow-009 | 接続・検索・出力をTo-Doへ適用する | 静的な意味確認 |
| question-ph2-week29-end-date-bug-010 | DATETIMEの終端条件を修正する | 静的な意味確認 |
| question-ph2-week29-wrong-person-id-011 | 人を絞るIDの取り違えを修正する | 静的な意味確認 |
| question-ph2-week29-sum-verification-012 | 初期データと集計結果を照合する | 静的な意味確認 |
| question-ph2-week30-group-unit-001 | 複数キーの集計単位を説明する | 静的な意味確認 |
| question-ph2-week30-date-format-002 | 日付書式の年と月を読める | 静的な意味確認 |
| question-ph2-week30-crud-status-003 | 状態変更をデータ操作へ対応させる | 静的な意味確認 |
| question-ph2-week30-day-format-004 | 日別集計のキーを選ぶ | 静的な意味確認 |
| question-ph2-week30-month-format-005 | 年を含む月別のキーを選ぶ | 静的な意味確認 |
| question-ph2-week30-complete-toggle-006 | 切替仕様に合う更新式を選ぶ | 静的な意味確認 |
| question-ph2-week30-join-group-flow-007 | 結合と人・日別の集計を組む | 静的な意味確認 |
| question-ph2-week30-sum-hours-008 | 月別のキーと時間合計を組む | 静的な意味確認 |
| question-ph2-week30-crud-flow-009 | フォーム・追加・一覧への遷移をつなぐ | 静的な意味確認 |
| question-ph2-week30-month-no-year-010 | 集計キーの不足を修正する | 静的な意味確認 |
| question-ph2-week30-week-start-011 | 週の開始日の計算を境界で修正する | 静的な意味確認 |
| question-ph2-week30-crud-tests-012 | 複数の要件を操作結果と照合する | 静的な意味確認 |
| question-ph2-week31-two-dimension-001 | 二次元配列の行と項目を区別する | 静的な意味確認 |
| question-ph2-week31-object-method-002 | 既存オブジェクトの戻り値を識別する | 静的な意味確認 |
| question-ph2-week31-ownership-003 | 所有者とタスクのIDを区別する | 静的な意味確認 |
| question-ph2-week31-map-array-004 | 配列変換の対象を選ぶ | PHP全候補実行 |
| question-ph2-week31-pair-005 | 戻り値の形と順序を選ぶ | PHP全候補実行 |
| question-ph2-week31-owner-query-006 | ログイン状態から所有者の条件を選ぶ | SQLロジック補助確認 |
| question-ph2-week31-chart-data-flow-007 | 配列変換とJSON出力をつなぐ | 静的な意味確認 |
| question-ph2-week31-auth-owner-flow-008 | 認証状態とデータの取得範囲を組む | 静的な意味確認 |
| question-ph2-week31-owner-bind-009 | 認証済みIDを取得条件へ渡す | 静的な意味確認 |
| question-ph2-week31-reversed-pair-010 | 二次元配列の列順を修正する | 静的な意味確認 |
| question-ph2-week31-owner-missing-011 | 所有者の条件の欠落を修正する | 静的な意味確認 |
| question-ph2-week31-owner-tests-012 | 認証と取得範囲の結果を照合する | 静的な意味確認 |
| question-ph2-week32-async-001 | サーバーとブラウザの役割を区別する | 静的な意味確認 |
| question-ph2-week32-json-002 | JSONを値の受け渡しへ対応させる | 静的な意味確認 |
| question-ph2-week32-chart-type-003 | チャートの列の型をデータへ対応させる | 静的な意味確認 |
| question-ph2-week32-await-response-004 | 非同期結果を受け取る手段を選ぶ | 静的な意味確認 |
| question-ph2-week32-form-body-005 | 通信の形式とキーを選ぶ | 静的な意味確認 |
| question-ph2-week32-chart-column-006 | 日付列の型を渡す値へ対応させる | 静的な意味確認 |
| question-ph2-week32-delete-flow-007 | DB操作と表示更新の順序を組む | 静的な意味確認 |
| question-ph2-week32-read-json-008 | 応答本文の読み取りと表示をつなぐ | 静的な意味確認 |
| question-ph2-week32-chart-rows-009 | PHPのJSONをチャートの行へ渡す | 静的な意味確認 |
| question-ph2-week32-wrong-element-010 | 表示更新の対象を修正する | 静的な意味確認 |
| question-ph2-week32-failure-removal-011 | HTTP失敗時の表示のずれを修正する | 静的な意味確認 |
| question-ph2-week32-async-tests-012 | 非同期処理の保存と表示を照合する | 静的な意味確認 |

## アプリと公開前の検証

- `content:validate`：教材・ドリルの参照先とSHA、全192問の形式・採点契約・各Weekの分布を検証し成功。
- `npm test`：コンテンツ439件とUI回帰9件、合計448件が成功。PH1・Gitの既存202問の正本ハッシュ、PH2の全WeekでWeb/Native双方の出題・採点・保存・再開・完了を確認。
- `typecheck`・`lint`：成功。
- `export:web -- --clear`：成功。33単元・394問のカタログを使用してWebを生成。
- Web操作：新しい確認用オリジンでPH1・PH2の一覧とWeek27/32のPH2表記を確認。Week27で穴埋め・バグ診断・4択、ヒント、誤答理由、教材案内、再読み込み後の回答保持、3問完了、2/12問の進捗を確認。Week32の問題表示も確認。警告・エラーログなし。
- デザイン：既存のレイアウト、スタイル、画像、クイズ画面を維持。フェーズを示す文言とデータの接続だけを調整。

Web確認の証跡：[Week27誤答時](ph2/week27-feedback.png)、[Week27完了](ph2/week27-done.png)、[Week32出題](ph2/week32-question.png)。

## 未確認事項

- Native実機での画面操作は未確認。
- MySQL/Docker/Composer/Carbon/Google Chartsの実環境で、各設問コードを全て動かしたわけではない。アプリ上で要求する操作は候補の選択のみ。
- 全192問を画面で手操作したわけではない。代表形式と単元をWebで確認し、全候補の採点・出題・保存・再開は自動検証する。
- 書籍本文のページ単位の照合、および学習者試用での理解・所要時間・継続・ミニドリルへの効果は未確認。
- フェーズ選択の永続化や間隔反復の新しい機能は、この作問追加の対象に含めない。
