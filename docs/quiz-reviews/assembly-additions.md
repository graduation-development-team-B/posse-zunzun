# コード組み立て135問の追加レビュー

## 対象と前提

2026-10-23。既存のHTML・Console・Git問題がない27Weekへ各5問を追加。対象はPH1 Week03・04・05・07・10〜16、PH2 Week17〜32。既存394問は変更せず、対象Weekの問題プールを12問から17問へ増やす。合計529問。

全135問は独立した1箇所の穴埋め。入力は複数トークンの選択・接続。行の並べ替えや自由入力ではない。主対象は知識の組み立て125問、結果の確認・修正10問。既習はauthor.priorKnowledge、教材とドリルはsource/supportingSources（実ファイルのSHA-256付き）に記録した。Week29〜31はPH2.mdの課題とドリルを使う。

## 作成から独立した意味レビュー

初稿135問をdraftで保存した後、教材の対応節・ドリルの要件・正答の結果・主要な誤答の理由を再確認。作者による別工程の自己レビューで、講師や受講者による評価ではない。機械検証の合格だけを意味レビューの根拠にはしていない。

修正・確認した点：

- Week11の未入力判定は、returnの置き場所が明確になるよう関数内のコードにした。
- Week20で同じSUMの完成コードを繰り返す1問を、既習のUSEによるDB選択へ変更した。
- Week26の変数クリアは、ログアウトを説明する節へ出典を修正した。
- classの順序は不問。通常コードの順序とトークンの過不足は判定する。
- 日付の「以降」は>=、DATETIMEの対象最終日は翌日未満、合計10000円以上は>=と明記した。
- Week11は既習コードを理由と確認条件から採用する練習。Week16は配列の直接変更、入力同期、key、イベントのレビューへ接続した。
- Week26は認証済みIDの保存を扱い、教材の平文パスワード例を採用しない。hiddenやリダイレクトを認可の代わりとして説明しない。
- Week27のstrlenはASCIIに限定し、emptyの0の扱い、password_hashとverifyの引数を確認した。
- Week28はjsonとlockが一致する前提を置く。Carbonは導入済み・提供済みメソッドとして扱う。
- 受け取る値・props・提供済みStudyメソッド・SQL列名は問題文または固定コードで定義した。

## 検証の範囲

アプリ内では実行しない。全135問の正答・主要誤答・不完全列・重複追加・保存復元・ヒント・二重確定・Web/Native条件の5問完了はtests/content/assembly.test.mjsで確認する。Native実機の描画確認は未実施。

補助確認（外部環境・通信の動作を証明するものではない）：

- JS/JSX37問はTypeScript parser、PHP35問はPHP CLI -lで正答の構文を確認。JSのimport/export以外はasync関数内でも構文確認。
- PHP23問、JS10問は固定入力で正答と主要誤答を比較。実DB・認証サーバーへは接続せず、一部の値の受け渡しは小さいテスト用オブジェクトを使う。
- SQL31問中27問はSQLiteのメモリ内fixtureで正誤比較。USE・DATE_FORMAT・INTERVALを使う4問は静的確認のみ。MySQLをSQLiteで検証したとは扱わない。
- HTML/CSSの見た目、Docker起動、Composerの導入、Carbon、React DOM、Google Chartsの描画は実行していない。今回採用した限定入力の静的採点の対象外。

再実行：

```sh
node scripts/check-assembly-examples.cjs
python3 scripts/check-assembly-sql.py
npm run content:validate
npm run content:build
npm run test:content
npm run typecheck
npm run lint
npm run test:ui
```

補助結果：[構文・PHP・JS](assembly-example-checks.json)、[SQL](assembly-sql-checks.json)。

## 公式仕様の補足確認

- [PHP array_map](https://www.php.net/manual/ja/function.array-map.php)：コールバックと対象配列、戻り値。
- [PHP mb_substr](https://www.php.net/manual/ja/function.mb-substr.php)：開始位置、文字数、文字コード。
- [MySQLの日付関数](https://dev.mysql.com/doc/refman/8.0/en/date-and-time-functions.html)：DATE_FORMAT、DATE_SUB、WEEKDAYの月曜0〜日曜6。
- [Google Charts DataTable](https://developers.google.com/chart/interactive/docs/reference#DataTable)：addColumnの型と列順。

## UI・最終検証

localhostのWebでWeek18を「コード組み立て・5問」で開始。トークン入力、1つ戻す、ヒント、再読み込み後のトークン復元、正答・誤答、誤答理由と模範コード、5問完了、XP結果、Weekを選ぶ→/materialsへの遷移を確認した。PHPの実行ボタンは表示されない。既存画面の色・レイアウトを目視確認。開発用Service Workerの古いキャッシュが最初に残っていたためハードリロードし、更新後の同じ操作で保存復元が成立することを確認した。

content:validate、content:build、test:content（588件）、typecheck、lint、export:webは成功。既存394エントリは追加前の内容と完全一致。test:uiは以前からある4件の失敗（choice-workspace・interactive-workspace・feedback-sheetのスタイル差分、choice-workspaceのQ.typeTag条件式）が残る。今回の作業ではスタイル定義を変更していない。Native実機は未確認。

## Week別の学習目標と個別レビュー

「教材・正答・誤答」は教材との静的意味レビュー。「補助確認」は実施した範囲のみ。トークン採点テストは全135問に共通。

### PH1 Week03｜Flexboxレイアウト

既存12問＋組み立て5問。各学習目標を、教材・ドリルで構文や対象を選ぶ判断へつなぐ。

| 問題ID / 学習目標 | 教材・正答・誤答 | 補助確認 |
|---|---|---|
| question-week3-assembly-row-parent<br>リンクを横並びにし、リンク間に16pxの間隔を作ってください。親navのクラスを組み立てます。 | 確認済み。curriculum/PH1/Week03.md:42 | 静的確認のみ（ランタイムなし） |
| question-week3-assembly-header-between<br>ロゴとナビを左右両端に配置し、高さの違う文字を上下中央にそろえてください。 | 確認済み。curriculum/PH1/Week03.md:76 | 静的確認のみ（ランタイムなし） |
| question-week3-assembly-vertical-gap<br>3つの手順を縦に並べ、手順の間を24px空けてください。 | 確認済み。curriculum/PH1/Week03.md:179 | 静的確認のみ（ランタイムなし） |
| question-week3-assembly-wrap-cards<br>カードの幅は固定済みです。親幅に収まらないカードを次の行へ折り返し、間隔16pxにしてください。 | 確認済み。curriculum/PH1/Week03.md:196 | 静的確認のみ（ランタイムなし） |
| question-week3-assembly-responsive-direction<br>375pxでは縦並び、768px以上では横並びにしてください。間隔は16pxです。 | 確認済み。curriculum/PH1/Week03.md:213 | 静的確認のみ（ランタイムなし） |

### PH1 Week04｜Gridレイアウト・擬似クラス

既存12問＋組み立て5問。各学習目標を、教材・ドリルで構文や対象を選ぶ判断へつなぐ。

| 問題ID / 学習目標 | 教材・正答・誤答 | 補助確認 |
|---|---|---|
| question-week4-assembly-three-columns<br>同じ幅のカードを3列で並べ、カード間を16px空けてください。 | 確認済み。curriculum/PH1/Week04.md:58 | 静的確認のみ（ランタイムなし） |
| question-week4-assembly-wide-child<br>親は3列Gridです。「訪問者数」の子だけを2列分にしてください。開始タグを組み立てます。 | 確認済み。curriculum/PH1/Week04.md:88 | 静的確認のみ（ランタイムなし） |
| question-week4-assembly-responsive-grid<br>カード一覧を375pxで1列、768pxで2列、1024px以上で4列にしてください。 | 確認済み。curriculum/PH1/Week04.md:106 | 静的確認のみ（ランタイムなし） |
| question-week4-assembly-hover-color<br>通常は青500、ホバー中だけ青700の背景にしてください。開始タグの属性を完成させます。 | 確認済み。curriculum/PH1/Week04.md:130 | 静的確認のみ（ランタイムなし） |
| question-week4-assembly-striped-list<br>各liについて、奇数番目を灰色100、偶数番目を白にしてください。 | 確認済み。curriculum/PH1/Week04.md:158 | 静的確認のみ（ランタイムなし） |

### PH1 Week05｜レスポンシブデザイン

既存12問＋組み立て5問。各学習目標を、教材・ドリルで構文や対象を選ぶ判断へつなぐ。

| 問題ID / 学習目標 | 教材・正答・誤答 | 補助確認 |
|---|---|---|
| question-week5-assembly-mobile-grid<br>説明と一覧を375pxで1列、768px以上で2列にしてください。間隔は24pxです。 | 確認済み。curriculum/PH1/Week05.md:71 | 静的確認のみ（ランタイムなし） |
| question-week5-assembly-desktop-only<br>375pxでは補足を非表示、768px以上でblock表示にしてください。 | 確認済み。curriculum/PH1/Week05.md:55 | 静的確認のみ（ランタイムなし） |
| question-week5-assembly-image-width<br>画像を375pxでは親の全幅、768px以上では親の半分の幅にしてください。 | 確認済み。curriculum/PH1/Week05.md:71 | 静的確認のみ（ランタイムなし） |
| question-week5-assembly-navigation-stack<br>ナビを375pxで縦並び、768px以上で横並びにしてください。小さい画面で8px、md以上で16pxの間隔にします。 | 確認済み。curriculum/PH1/Week05.md:71 | 静的確認のみ（ランタイムなし） |
| question-week5-assembly-prefix-repair<br>768px以上で3列にする、空白のないmd接頭辞を組み立ててください。 | 確認済み。curriculum/PH1/Week05.md:216 | 静的確認のみ（ランタイムなし） |

### PH1 Week07｜DOM操作・イベント

既存12問＋組み立て5問。各学習目標を、教材・ドリルで構文や対象を選ぶ判断へつなぐ。

| 問題ID / 学習目標 | 教材・正答・誤答 | 補助確認 |
|---|---|---|
| question-week7-assembly-find-output<br>HTMLにはid="total"の表示枠があります。その要素をtotalElへ取得してください。 | 確認済み。curriculum/PH1/Week07.md:42 | TypeScript parser; JSはimport/export以外をasync関数内で構文確認 |
| question-week7-assembly-click-message<br>btnとmessageは取得済みです。ボタンをクリックした時だけ「受付済み」と表示してください。 | 確認済み。curriculum/PH1/Week07.md:88 | TypeScript parser; JSはimport/export以外をasync関数内で構文確認 |
| question-week7-assembly-read-number<br>priceInput.valueは"1200"です。数値としてpriceへ読み取ってください。 | 確認済み。curriculum/PH1/Week07.md:119 | TypeScript parser; JSはimport/export以外をasync関数内で構文確認 / Node VM; 外部通信なし・固定入力で正答と主要誤答を比較 |
| question-week7-assembly-toggle-done<br>taskTextは取得済みです。クリックのたびにline-throughを付け外ししてください。 | 確認済み。curriculum/PH1/Week07.md:144 | TypeScript parser; JSはimport/export以外をasync関数内で構文確認 |
| question-week7-assembly-append-item<br>todoListはulです。新しいliを作り、文字を入れて一覧へ追加します。空欄のメソッド呼び出しを組み立ててください。 | 確認済み。curriculum/PH1/Week07.md:171 | TypeScript parser; JSはimport/export以外をasync関数内で構文確認 |

### PH1 Week10｜非同期処理・Fetch・JSON

既存12問＋組み立て5問。各学習目標を、教材・ドリルで構文や対象を選ぶ判断へつなぐ。

| 問題ID / 学習目標 | 教材・正答・誤答 | 補助確認 |
|---|---|---|
| question-week10-assembly-await-fetch<br>async関数の中です。通信完了後のResponseをresponseへ受け取ってください。urlは定義済みです。 | 確認済み。curriculum/PH1/Week10.md:53 | TypeScript parser; JSはimport/export以外をasync関数内で構文確認 |
| question-week10-assembly-await-json<br>responseは取得済みです。JSON本文を読んだ値をdataへ入れてください。 | 確認済み。curriculum/PH1/Week10.md:89 | TypeScript parser; JSはimport/export以外をasync関数内で構文確認 / Node VM; 外部通信なし・固定入力で正答と主要誤答を比較 |
| question-week10-assembly-async-declaration<br>JSONを取得する関数の宣言を組み立ててください。関数内ではawaitを使います。 | 確認済み。curriculum/PH1/Week10.md:65 | TypeScript parser; JSはimport/export以外をasync関数内で構文確認 |
| question-week10-assembly-http-failure<br>HTTPが成功でない時だけErrorを投げます。responseは取得済みです。 | 確認済み。curriculum/PH1/Week10.md:114 | TypeScript parser; JSはimport/export以外をasync関数内で構文確認 |
| question-week10-assembly-render-name<br>dataは{name:"佐藤", email:"sato@example.invalid"}です。nameElは取得済みです。名前を表示してください。 | 確認済み。curriculum/PH1/Week10.md:151 | TypeScript parser; JSはimport/export以外をasync関数内で構文確認 / Node VM; 外部通信なし・固定入力で正答と主要誤答を比較 |

### PH1 Week11｜AIリテラシー：AIの答えを自分のものにする

既存12問＋組み立て5問。各学習目標を、教材・ドリルで構文や対象を選ぶ判断へつなぐ。

| 問題ID / 学習目標 | 教材・正答・誤答 | 補助確認 |
|---|---|---|
| question-week11-assembly-ai-number-repair<br>AI案を確認します。入力priceInput.valueは"800"、feeは数値200です。文字の連結を避け、合計1000になる式を組み立ててください。 | 確認済み。curriculum/PH1/Week11.md:128 | TypeScript parser; JSはimport/export以外をasync関数内で構文確認 / Node VM; 外部通信なし・固定入力で正答と主要誤答を比較 |
| question-week11-assembly-ai-empty-guard<br>AIのフォーム修正案を確かめます。nameは取得済みの文字列です。空文字の時だけ受付を止める条件を組み立ててください。空白だけの入力は今回は扱いません。 | 確認済み。curriculum/PH1/Week11.md:45 | TypeScript parser; JSはimport/export以外をasync関数内で構文確認 |
| question-week11-assembly-ai-selector-fix<br>AI案のセレクターを自分で直します。HTMLは<p id="result"></p>です。対応する取得処理を組み立ててください。 | 確認済み。curriculum/PH1/Week11.md:26 | TypeScript parser; JSはimport/export以外をasync関数内で構文確認 |
| question-week11-assembly-ai-fetch-check<br>AI案のawait不足を直します。async関数内で、JSONを読んだ値をpostsへ受け取る式を組み立ててください。responseは取得済みです。 | 確認済み。curriculum/PH1/Week11.md:180 | TypeScript parser; JSはimport/export以外をasync関数内で構文確認 |
| question-week11-assembly-ai-upper-bound<br>AI案の境界条件を直します。countは0〜10、MAXは10です。上限の10で増えず、9では増える条件を組み立ててください。 | 確認済み。curriculum/PH1/Week11.md:26 | TypeScript parser; JSはimport/export以外をasync関数内で構文確認 / Node VM; 外部通信なし・固定入力で正答と主要誤答を比較 |

### PH1 Week12｜CSSアニメーション・ライブラリ活用

既存12問＋組み立て5問。各学習目標を、教材・ドリルで構文や対象を選ぶ判断へつなぐ。

| 問題ID / 学習目標 | 教材・正答・誤答 | 補助確認 |
|---|---|---|
| question-week12-assembly-transition-css<br>カードのtransformの変化を300ms、easeでなめらかにしてください。CSS宣言を組み立てます。 | 確認済み。curriculum/PH1/Week12.md:24 | 静的確認のみ（ランタイムなし） |
| question-week12-assembly-translate-hover<br>カードのホバー中だけ、見た目を上へ4px動かしてください。 | 確認済み。curriculum/PH1/Week12.md:80 | 静的確認のみ（ランタイムなし） |
| question-week12-assembly-scale-hover<br>カードをホバー時だけ1.05倍にし、300msで変化させてください。 | 確認済み。curriculum/PH1/Week12.md:80 | 静的確認のみ（ランタイムなし） |
| question-week12-assembly-group-fade<br>親にはgroupが付いています。詳細を普段は透明、親ホバー時に不透明にし、300msで変化させてください。 | 確認済み。curriculum/PH1/Week12.md:131 | 静的確認のみ（ランタイムなし） |
| question-week12-assembly-splide-list-tag<br>Splideのtrack内に、正しいクラス名のリストを作ってください。開始タグを組み立てます。 | 確認済み。curriculum/PH1/Week12.md:187 | 静的確認のみ（ランタイムなし） |

### PH1 Week13｜Node.js・pnpm・Vite（開発環境の引っ越し）

既存12問＋組み立て5問。各学習目標を、教材・ドリルで構文や対象を選ぶ判断へつなぐ。

| 問題ID / 学習目標 | 教材・正答・誤答 | 補助確認 |
|---|---|---|
| question-week13-assembly-dev-command<br>package.jsonのscriptsには"dev":"vite"があります。開発サーバーを起動するコマンドを組み立ててください。 | 確認済み。curriculum/PH1/Week13.md:243 | 静的確認のみ（ランタイムなし） |
| question-week13-assembly-install-command<br>雛形を作ったmy-counter-appの中にいます。package.jsonの依存をインストールしてください。 | 確認済み。curriculum/PH1/Week13.md:133 | 静的確認のみ（ランタイムなし） |
| question-week13-assembly-css-import<br>src/main.jsとsrc/style.cssは同じフォルダです。main.jsからCSSを読み込む文を組み立ててください。 | 確認済み。curriculum/PH1/Week13.md:280 | TypeScript parser; JSはimport/export以外をasync関数内で構文確認 |
| question-week13-assembly-module-script<br>ViteのHTMLから/src/main.jsをJavaScriptモジュールとして読み込んでください。 | 確認済み。curriculum/PH1/Week13.md:216 | 静的確認のみ（ランタイムなし） |
| question-week13-assembly-relative-base<br>GitHub Pagesのサブパスへ置くため、教材の相対base設定を組み立ててください。 | 確認済み。curriculum/PH1/Week13.md:311 | TypeScript parser; JSはimport/export以外をasync関数内で構文確認 |

### PH1 Week14｜React基礎（JSX・コンポーネント・props・map）

既存12問＋組み立て5問。各学習目標を、教材・ドリルで構文や対象を選ぶ判断へつなぐ。

| 問題ID / 学習目標 | 教材・正答・誤答 | 補助確認 |
|---|---|---|
| question-week14-assembly-jsx-title<br>titleは"イベント予定"です。JSXでtitleの値をh2へ表示してください。 | 確認済み。curriculum/PH1/Week14.md:87 | TypeScript parser; JSはimport/export以外をasync関数内で構文確認 |
| question-week14-assembly-props-card<br>MemberCardはnameとroleを受け取ります。nameを"鈴木"、roleを"デザイナー"として呼び出してください。 | 確認済み。curriculum/PH1/Week14.md:258 | TypeScript parser; JSはimport/export以外をasync関数内で構文確認 |
| question-week14-assembly-map-key<br>membersには重複しない固定idがあります。各メンバーをカードに変換し、同じidをkeyへ渡してください。 | 確認済み。curriculum/PH1/Week14.md:319 | TypeScript parser; JSはimport/export以外をasync関数内で構文確認 |
| question-week14-assembly-component-return<br>Greetingを、あいさつを表示する関数コンポーネントにしてください。返す文を組み立てます。 | 確認済み。curriculum/PH1/Week14.md:195 | TypeScript parser; JSはimport/export以外をasync関数内で構文確認 |
| question-week14-assembly-default-import<br>MemberCard.jsxはexport default済みです。src/App.jsxから同じsrc内のcomponents/MemberCard.jsxを読み込んでください。 | 確認済み。curriculum/PH1/Week14.md:402 | TypeScript parser; JSはimport/export以外をasync関数内で構文確認 |

### PH1 Week15｜React状態管理（useState・useEffect）

既存12問＋組み立て5問。各学習目標を、教材・ドリルで構文や対象を選ぶ判断へつなぐ。

| 問題ID / 学習目標 | 教材・正答・誤答 | 補助確認 |
|---|---|---|
| question-week15-assembly-state-initial<br>初期値が"all"のfilterと更新関数setFilterをuseStateで用意してください。useStateはimport済みです。 | 確認済み。curriculum/PH1/Week15.md:81 | TypeScript parser; JSはimport/export以外をasync関数内で構文確認 |
| question-week15-assembly-controlled-input<br>inputとsetInputはuseStateで用意済みです。入力文字をstateへ渡す式を組み立ててください。 | 確認済み。curriculum/PH1/Week15.md:320 | TypeScript parser; JSはimport/export以外をasync関数内で構文確認 |
| question-week15-assembly-append-state<br>tasksはstate配列、newTaskは重複しないidを持つ作成済みのタスクです。元配列を変えず、末尾に追加してください。 | 確認済み。curriculum/PH1/Week15.md:224 | TypeScript parser; JSはimport/export以外をasync関数内で構文確認 |
| question-week15-assembly-filter-visible<br>tasksを変更せず、doneがfalseのタスクだけvisibleTasksへ取り出してください。 | 確認済み。curriculum/PH1/Week15.md:168 | TypeScript parser; JSはimport/export以外をasync関数内で構文確認 |
| question-week15-assembly-effect-title<br>tasksの件数が変わるたびにブラウザのタイトルを同期します。useEffectはimport済み、tasksはstateです。 | 確認済み。curriculum/PH1/Week15.md:351 | TypeScript parser; JSはimport/export以外をasync関数内で構文確認 |

### PH1 Week16｜AIコーディング実践

既存12問＋組み立て5問。各学習目標を、教材・ドリルで構文や対象を選ぶ判断へつなぐ。

| 問題ID / 学習目標 | 教材・正答・誤答 | 補助確認 |
|---|---|---|
| question-week16-assembly-review-append<br>AI案を修正します。tasksはstate配列、newTaskは一意のidを持ちます。既存の順序を保って末尾へ追加してください。 | 確認済み。curriculum/PH1/Week16.md:142 | TypeScript parser; JSはimport/export以外をasync関数内で構文確認 |
| question-week16-assembly-review-delete<br>AI案の直接変更を直します。tasksはstateで各idは一意です。targetIdだけを除いた新配列で更新してください。 | 確認済み。curriculum/PH1/Week16.md:142 | TypeScript parser; JSはimport/export以外をasync関数内で構文確認 |
| question-week16-assembly-review-controlled<br>AI案のinputをstateにつなぎます。inputとsetInputは用意済みです。開始タグを完成させてください。 | 確認済み。curriculum/PH1/Week16.md:142 | TypeScript parser; JSはimport/export以外をasync関数内で構文確認 |
| question-week16-assembly-review-key<br>AI案の一覧を直します。tasksのidは固定で一意、textは重複します。mapが返すliに適切なkeyを付けてください。 | 確認済み。curriculum/PH1/Week16.md:142 | TypeScript parser; JSはimport/export以外をasync関数内で構文確認 |
| question-week16-assembly-review-event<br>AI案を直します。クリックした時だけtask.idをdeleteTaskへ渡してください。deleteTaskは定義済みです。 | 確認済み。curriculum/PH1/Week16.md:142 | TypeScript parser; JSはimport/export以外をasync関数内で構文確認 |

### PH2 Week17｜Dockerと開発環境

既存12問＋組み立て5問。各学習目標を、教材・ドリルで構文や対象を選ぶ判断へつなぐ。

| 問題ID / 学習目標 | 教材・正答・誤答 | 補助確認 |
|---|---|---|
| question-ph2-week17-assembly-compose-up<br>Compose設定のあるディレクトリです。全サービスをバックグラウンドで起動するコマンドを組み立ててください。 | 確認済み。curriculum/PH2/Week17.md:111 | 静的確認のみ（ランタイムなし） |
| question-ph2-week17-assembly-compose-exec<br>dbサービスは起動済みでbashが入っています。そのコンテナ内でbashを動かしてください。 | 確認済み。drill-ph2/src/week17-3/README.md:3 | 静的確認のみ（ランタイムなし） |
| question-ph2-week17-assembly-port-mapping<br>コンテナの80番は維持し、PCのlocalhost:3000から開けるようportsを組み立ててください。 | 確認済み。drill-ph2/src/week17-2/README.md:14 | 静的確認のみ（ランタイムなし） |
| question-ph2-week17-assembly-source-mount<br>PCの./srcをコンテナの/var/www/htmlへ共有します。volumesの指定を組み立ててください。 | 確認済み。drill-ph2/src/week17-1/README.md:3 | 静的確認のみ（ランタイムなし） |
| question-ph2-week17-assembly-mysql-login<br>dbコンテナ内にいます。MySQLへユーザーrootとして、パスワードを対話入力して接続してください。 | 確認済み。drill-ph2/src/week17-3/README.md:3 | 静的確認のみ（ランタイムなし） |

### PH2 Week18｜PHPの変数・配列・条件分岐・ループ

既存12問＋組み立て5問。各学習目標を、教材・ドリルで構文や対象を選ぶ判断へつなぐ。

| 問題ID / 学習目標 | 教材・正答・誤答 | 補助確認 |
|---|---|---|
| question-ph2-week18-assembly-assoc-person<br>nameが"Aoi"、ageが20の連想配列を作ってください。 | 確認済み。curriculum/PH2/Week18.md:123 | PHP CLI -l; 構文のみ / PHP CLI; 正答と主要誤答を固定入力で比較 |
| question-ph2-week18-assembly-array-lookup<br>$personのnameを出力してください。 | 確認済み。curriculum/PH2/Week18.md:123 | PHP CLI -l; 構文のみ / PHP CLI; 正答と主要誤答を固定入力で比較 |
| question-ph2-week18-assembly-range-loop<br>for文で2から5までを1ずつ増やして表示します。forの括弧内を組み立ててください。 | 確認済み。curriculum/PH2/Week18.md:186 | PHP CLI -l; 構文のみ / PHP CLI; 正答と主要誤答を固定入力で比較 |
| question-ph2-week18-assembly-foreach-total<br>価格100・200・300を足し、totalを600にしてください。 | 確認済み。curriculum/PH2/Week18.md:209 | PHP CLI -l; 構文のみ / PHP CLI; 正答と主要誤答を固定入力で比較 |
| question-ph2-week18-assembly-concat-product<br>「商品: apple」と出力するPHPの連結式を組み立ててください。 | 確認済み。curriculum/PH2/Week18.md:209 | PHP CLI -l; 構文のみ / PHP CLI; 正答と主要誤答を固定入力で比較 |

### PH2 Week19｜データベース・テーブル・SQLの絞り込み

既存12問＋組み立て5問。各学習目標を、教材・ドリルで構文や対象を選ぶ判断へつなぐ。

| 問題ID / 学習目標 | 教材・正答・誤答 | 補助確認 |
|---|---|---|
| question-ph2-week19-assembly-create-table<br>idを整数の主キー、titleを最大100文字とするbooksテーブルを作ってください。 | 確認済み。drill-ph2/src/week19-1/README.md:16 | SQLite固定データで正誤比較（MySQL実行ではない） |
| question-ph2-week19-assembly-select-title<br>booksからtitle列だけ取得するSELECTを組み立ててください。 | 確認済み。drill-ph2/src/week19-2/README.md:3 | SQLite固定データで正誤比較（MySQL実行ではない） |
| question-ph2-week19-assembly-published-range<br>2005年1月1日以降に出版された本だけ取得します。当日も含める条件を組み立ててください。 | 確認済み。drill-ph2/src/week19-2/README.md:14 | SQLite固定データで正誤比較（MySQL実行ではない） |
| question-ph2-week19-assembly-contains-title<br>titleに「PHP」をどこかに含む本を検索する条件を組み立ててください。 | 確認済み。drill-ph2/src/week19-3/README.md:15 | SQLite固定データで正誤比較（MySQL実行ではない） |
| question-ph2-week19-assembly-both-conditions<br>2005年以降で、かつtitleにPHPを含む本だけ取得してください。 | 確認済み。drill-ph2/src/week19-2/README.md:14 | SQLite固定データで正誤比較（MySQL実行ではない） |

### PH2 Week20｜SQLの実行・集計・グループ化

既存12問＋組み立て5問。各学習目標を、教材・ドリルで構文や対象を選ぶ判断へつなぐ。

| 問題ID / 学習目標 | 教材・正答・誤答 | 補助確認 |
|---|---|---|
| question-ph2-week20-assembly-count-details<br>order_detailsは1行が1種類で、同じ注文内で商品は重複しません。注文ごとの種類数をkindsへ集計してください。 | 確認済み。drill-ph2/src/week20-1/README.md:3 | SQLite固定データで正誤比較（MySQL実行ではない） |
| question-ph2-week20-assembly-sum-quantity<br>注文ごとにquantityの合計個数をamountへ求めてください。 | 確認済み。drill-ph2/src/week20-2/README.md:11 | SQLite固定データで正誤比較（MySQL実行ではない） |
| question-ph2-week20-assembly-sum-cost<br>priceは単価、quantityは個数です。注文ごとの代金合計を求めてください。 | 確認済み。drill-ph2/src/week20-3/README.md:9 | SQLite固定データで正誤比較（MySQL実行ではない） |
| question-ph2-week20-assembly-group-order<br>全明細を注文IDごとに分けて合計します。FROM以降を組み立ててください。 | 確認済み。drill-ph2/src/week20-2/README.md:3 | SQLite固定データで正誤比較（MySQL実行ではない） |
| question-ph2-week20-assembly-select-database<br>MySQLへ接続済みです。既存のph2drillを、この接続で使うデータベースに選択してください。 | 確認済み。drill-ph2/src/week19-1/README.md:16 | MySQL固有構文は教材・公式仕様との静的照合のみ |

### PH2 Week21｜PDO接続・取得・並べ替え

既存12問＋組み立て5問。各学習目標を、教材・ドリルで構文や対象を選ぶ判断へつなぐ。

| 問題ID / 学習目標 | 教材・正答・誤答 | 補助確認 |
|---|---|---|
| question-ph2-week21-assembly-dsn-db<br>PHPとDBは同じComposeネットワークです。サービス名db、DB名ph2drill、文字コードutf8mb4のDSNを組み立ててください。 | 確認済み。curriculum/PH2/Week21.md:19 | PHP CLI -l; 構文のみ |
| question-ph2-week21-assembly-pdo-query<br>$dbhは接続済みPDOです。ユーザー入力を含まない固定SQLで学生名を取得してください。 | 確認済み。curriculum/PH2/Week21.md:46 | PHP CLI -l; 構文のみ |
| question-ph2-week21-assembly-descending-query<br>studentsをidの大きい順に取得してください。 | 確認済み。drill-ph2/src/week21-2/README.md:3 | SQLite固定データで正誤比較（MySQL実行ではない） |
| question-ph2-week21-assembly-top-two<br>studentsをidの大きい順に並べて、先頭2件だけ取得してください。 | 確認済み。drill-ph2/src/week21-3/README.md:3 | SQLite固定データで正誤比較（MySQL実行ではない） |
| question-ph2-week21-assembly-read-row<br>$rowはSELECT name FROM studentsの取得行です。学生名を変数nameへ受け取ってください。 | 確認済み。curriculum/PH2/Week21.md:46 | PHP CLI -l; 構文のみ |

### PH2 Week22｜結合・副問い合わせ・データ整形

既存12問＋組み立て5問。各学習目標を、教材・ドリルで構文や対象を選ぶ判断へつなぐ。

| 問題ID / 学習目標 | 教材・正答・誤答 | 補助確認 |
|---|---|---|
| question-ph2-week22-assembly-join-condition<br>注文と明細を、orders.idと明細のorder_idで結合してください。 | 確認済み。drill-ph2/src/week22-1/README.md:3 | SQLite固定データで正誤比較（MySQL実行ではない） |
| question-ph2-week22-assembly-having-total<br>注文ごとの合計を求めた後、10000円以上の注文を残してください。 | 確認済み。drill-ph2/src/week22-2/README.md:3 | SQLite固定データで正誤比較（MySQL実行ではない） |
| question-ph2-week22-assembly-missing-details<br>明細が1件もない注文だけ残す条件を組み立ててください。 | 確認済み。drill-ph2/src/week22-3/README.md:3 | SQLite固定データで正誤比較（MySQL実行ではない） |
| question-ph2-week22-assembly-correlated-key<br>外側の注文それぞれについて、その注文に属する明細がないか調べます。サブクエリの条件を組み立ててください。 | 確認済み。drill-ph2/src/week22-3/README.md:3 | SQLite固定データで正誤比較（MySQL実行ではない） |
| question-ph2-week22-assembly-group-id-name<br>注文IDと注文者名を表示し、注文ごとに合計します。同姓同名の注文もあります。GROUP BYを組み立ててください。 | 確認済み。drill-ph2/src/week22-1/README.md:3 | SQLite固定データで正誤比較（MySQL実行ではない） |

### PH2 Week23｜PHPの関数・文字列・配列変換

既存12問＋組み立て5問。各学習目標を、教材・ドリルで構文や対象を選ぶ判断へつなぐ。

| 問題ID / 学習目標 | 教材・正答・誤答 | 補助確認 |
|---|---|---|
| question-ph2-week23-assembly-substring<br>UTF-8の「パーフェクトサントリービール」から「サントリー」だけを取り出してください。開始位置6は「サ」です。 | 確認済み。curriculum/PH2/Week23.md:8 | PHP CLI -l; 構文のみ / PHP CLI; 正答と主要誤答を固定入力で比較 |
| question-ph2-week23-assembly-implode-list<br>PHP 8の書式で、配列を2-4-6という文字列へつないでください。 | 確認済み。curriculum/PH2/Week23.md:8 | PHP CLI -l; 構文のみ / PHP CLI; 正答と主要誤答を固定入力で比較 |
| question-ph2-week23-assembly-round-one<br>3.56を四捨五入した値をroundedへ入れてください。 | 確認済み。curriculum/PH2/Week23.md:8 | PHP CLI -l; 構文のみ / PHP CLI; 正答と主要誤答を固定入力で比較 |
| question-ph2-week23-assembly-map-round<br>round_numberは1件を四捨五入して返す定義済みの関数です。valuesの全要素に適用してください。 | 確認済み。curriculum/PH2/Week23.md:8 | PHP CLI -l; 構文のみ / PHP CLI; 正答と主要誤答を固定入力で比較 |
| question-ph2-week23-assembly-function-return<br>引数の数値を四捨五入して呼び出し元へ返す関数を作ってください。 | 確認済み。curriculum/PH2/Week23.md:3 | PHP CLI -l; 構文のみ / PHP CLI; 正答と主要誤答を固定入力で比較 |

### PH2 Week24｜GET・POST・フォーム・INSERT

既存12問＋組み立て5問。各学習目標を、教材・ドリルで構文や対象を選ぶ判断へつなぐ。

| 問題ID / 学習目標 | 教材・正答・誤答 | 補助確認 |
|---|---|---|
| question-ph2-week24-assembly-get-keyword<br>URLはindex.php?keyword=quizです。keywordの文字列を変数へ読み取ってください。キーは必ず存在する前提です。 | 確認済み。curriculum/PH2/Week24.md:34 | PHP CLI -l; 構文のみ / PHP CLI; 正答と主要誤答を固定入力で比較 |
| question-ph2-week24-assembly-post-name<br>formはmethod="POST"、入力欄のnameは"nickname"です。送信済みの値を読み取ってください。キーは必ず存在する前提です。 | 確認済み。curriculum/PH2/Week24.md:59 | PHP CLI -l; 構文のみ / PHP CLI; 正答と主要誤答を固定入力で比較 |
| question-ph2-week24-assembly-post-form<br>nicknameをsave.phpへPOST送信するformの開始タグを組み立ててください。 | 確認済み。curriculum/PH2/Week24.md:59 | 静的確認のみ（ランタイムなし） |
| question-ph2-week24-assembly-insert-question<br>questionsのcontentへ新しい問題を1件保存するSQLを組み立ててください。contentはプレースホルダーです。 | 確認済み。curriculum/PH2/Week24.md:92 | SQLite固定データで正誤比較（MySQL実行ではない） |
| question-ph2-week24-assembly-bind-content<br>$stmtはcontentを含むINSERTをprepare済みです。検証済み文字列$contentを:contentへバインドしてください。 | 確認済み。curriculum/PH2/Week24.md:92 | PHP CLI -l; 構文のみ / PHP CLI; 正答と主要誤答を固定入力で比較 |

### PH2 Week25｜UPDATE・DELETE

既存12問＋組み立て5問。各学習目標を、教材・ドリルで構文や対象を選ぶ判断へつなぐ。

| 問題ID / 学習目標 | 教材・正答・誤答 | 補助確認 |
|---|---|---|
| question-ph2-week25-assembly-update-name<br>studentsの指定idだけ名前を更新するSQLを組み立ててください。 | 確認済み。curriculum/PH2/Week25.md:7 | SQLite固定データで正誤比較（MySQL実行ではない） |
| question-ph2-week25-assembly-delete-id<br>studentsの指定idだけ削除するSQLを組み立ててください。 | 確認済み。curriculum/PH2/Week25.md:47 | SQLite固定データで正誤比較（MySQL実行ではない） |
| question-ph2-week25-assembly-delete-child<br>学生を消す前に、その学生のstudiesだけ削除します。所属列はstudent_idです。 | 確認済み。curriculum/PH2/Week25.md:47 | SQLite固定データで正誤比較（MySQL実行ではない） |
| question-ph2-week25-assembly-hidden-id<br>編集対象の学生id=7をstudent_idという名前でPOST送信するhidden入力を組み立ててください。これは認可の代わりにはなりません。 | 確認済み。curriculum/PH2/Week25.md:7 | 静的確認のみ（ランタイムなし） |
| question-ph2-week25-assembly-bind-update<br>$stmtはUPDATE students SET name=:name WHERE id=:idをprepare済みです。検証済みの$idを対象IDへ渡してください。 | 確認済み。curriculum/PH2/Week25.md:7 | PHP CLI -l; 構文のみ / PHP CLI; 正答と主要誤答を固定入力で比較 |

### PH2 Week26｜ログイン・セッション・ログアウト

既存12問＋組み立て5問。各学習目標を、教材・ドリルで構文や対象を選ぶ判断へつなぐ。

| 問題ID / 学習目標 | 教材・正答・誤答 | 補助確認 |
|---|---|---|
| question-ph2-week26-assembly-session-start<br>HTMLを出力する前に、PHPのセッションを開始・再開してください。 | 確認済み。curriculum/PH2/Week26.md:221 | PHP CLI -l; 構文のみ |
| question-ph2-week26-assembly-store-user-id<br>認証は成功済みで$userのidは7です。そのidをセッションのidへ保存してください。 | 確認済み。curriculum/PH2/Week26.md:221 | PHP CLI -l; 構文のみ / PHP CLI; 正答と主要誤答を固定入力で比較 |
| question-ph2-week26-assembly-guard-session<br>session_startは済んでいます。セッションにidがない場合だけlogin.phpへ移動して処理を止めてください。 | 確認済み。curriculum/PH2/Week26.md:221 | PHP CLI -l; 構文のみ |
| question-ph2-week26-assembly-logout-values<br>session_start済みです。ログアウト時、このリクエスト内で参照するセッション変数を空の配列へ置き換えてください。Cookie削除などは別処理です。 | 確認済み。curriculum/PH2/Week26.md:249 | PHP CLI -l; 構文のみ |
| question-ph2-week26-assembly-redirect-stop<br>ログアウト処理後、login.phpへリダイレクトします。headerの引数を組み立ててください。出力はまだありません。 | 確認済み。curriculum/PH2/Week26.md:249 | PHP CLI -l; 構文のみ |

### PH2 Week27｜入力検証・パスワードのハッシュ

既存12問＋組み立て5問。各学習目標を、教材・ドリルで構文や対象を選ぶ判断へつなぐ。

| 問題ID / 学習目標 | 教材・正答・誤答 | 補助確認 |
|---|---|---|
| question-ph2-week27-assembly-email-validation<br>$emailは受信済み文字列です。メール形式でない時だけエラーにする条件を組み立ててください。 | 確認済み。curriculum/PH2/Week27.md:76 | PHP CLI -l; 構文のみ / PHP CLI; 正答と主要誤答を固定入力で比較 |
| question-ph2-week27-assembly-empty-required<br>$emailは受信済みです。空文字なら必須エラーにしてください。この問題の入力候補は空文字か通常のメール文字列だけです。 | 確認済み。curriculum/PH2/Week27.md:44 | PHP CLI -l; 構文のみ / PHP CLI; 正答と主要誤答を固定入力で比較 |
| question-ph2-week27-assembly-ascii-length<br>入力はASCII文字です。4文字未満はエラー、4文字ちょうどは許可する条件を組み立ててください。 | 確認済み。curriculum/PH2/Week27.md:65 | PHP CLI -l; 構文のみ / PHP CLI; 正答と主要誤答を固定入力で比較 |
| question-ph2-week27-assembly-hash-password<br>検証済みの$passwordから、DBに保存するハッシュを作ってください。 | 確認済み。curriculum/PH2/Week27.md:139 | PHP CLI -l; 構文のみ / PHP CLI; 正答と主要誤答を固定入力で比較 |
| question-ph2-week27-assembly-verify-password<br>$storedHashは登録時にpassword_hashで作った値です。入力$passwordが対応するか判定してください。 | 確認済み。curriculum/PH2/Week27.md:151 | PHP CLI -l; 構文のみ / PHP CLI; 正答と主要誤答を固定入力で比較 |

### PH2 Week28｜Composerとライブラリ

既存12問＋組み立て5問。各学習目標を、教材・ドリルで構文や対象を選ぶ判断へつなぐ。

| 問題ID / 学習目標 | 教材・正答・誤答 | 補助確認 |
|---|---|---|
| question-ph2-week28-assembly-composer-install<br>composer.jsonとlockは一致しています。lockに固定した依存をそろえるコマンドを組み立ててください。 | 確認済み。curriculum/PH2/Week28.md:33 | 静的確認のみ（ランタイムなし） |
| question-ph2-week28-assembly-composer-require<br>教材の画像アップロード用パッケージverot/class.upload.phpを依存へ追加してください。 | 確認済み。curriculum/PH2/Week28.md:15 | 静的確認のみ（ランタイムなし） |
| question-ph2-week28-assembly-autoload-path<br>プロジェクト直下にvendor、実行ファイルはsrc/week28/index.phpです。そのファイルからautoloadを読み込んでください。 | 確認済み。drill-ph2/src/week28/README.md:3 | PHP CLI -l; 構文のみ |
| question-ph2-week28-assembly-carbon-use<br>autoloadは読み込み済みです。Carbon名前空間のCarbonクラスをuse宣言し、続くCarbon::now()を利用できるようにしてください。 | 確認済み。drill-ph2/src/week28/README.md:3 | PHP CLI -l; 構文のみ |
| question-ph2-week28-assembly-carbon-now<br>Carbonは導入・読み込み済みです。Carbon::now()は現在時刻を返す提供済みメソッドです。その呼び出しを組み立ててください。 | 確認済み。drill-ph2/src/week28/README.md:3 | PHP CLI -l; 構文のみ |

### PH2 Week29｜SQLの期間集計・To-Do一覧

既存12問＋組み立て5問。各学習目標を、教材・ドリルで構文や対象を選ぶ判断へつなぐ。

| 問題ID / 学習目標 | 教材・正答・誤答 | 補助確認 |
|---|---|---|
| question-ph2-week29-assembly-period-start<br>dateはDATETIMEです。2022年6月20日0時以降の条件を組み立ててください。終了条件は固定済みです。 | 確認済み。drill-ph2/src/week29-1/README.md:3 | SQLite固定データで正誤比較（MySQL実行ではない） |
| question-ph2-week29-assembly-period-end<br>dateはDATETIMEです。2022年6月25日の夜も含め、26日0時は除く終了条件を組み立ててください。 | 確認済み。drill-ph2/src/week29-1/README.md:3 | SQLite固定データで正誤比較（MySQL実行ではない） |
| question-ph2-week29-assembly-student-sum<br>学生ID=2の全学習時間を合計してください。studies.idは記録ID、student_idは学生IDです。 | 確認済み。drill-ph2/src/week29-2/README.md:3 | SQLite固定データで正誤比較（MySQL実行ではない） |
| question-ph2-week29-assembly-content-sum<br>学習内容contentがPHPと等しい記録だけ、学習時間を合計してください。 | 確認済み。drill-ph2/src/week29-3/README.md:3 | SQLite固定データで正誤比較（MySQL実行ではない） |
| question-ph2-week29-assembly-todo-list-query<br>todosにはid・text・statusがあります。登録したタスクをid昇順で一覧取得してください。 | 確認済み。curriculum/PH2/PH2.md:1141 | SQLite固定データで正誤比較（MySQL実行ではない） |

### PH2 Week30｜日週月の集計・To-DoのCRUD

既存12問＋組み立て5問。各学習目標を、教材・ドリルで構文や対象を選ぶ判断へつなぐ。

| 問題ID / 学習目標 | 教材・正答・誤答 | 補助確認 |
|---|---|---|
| question-ph2-week30-assembly-daily-key<br>MySQLのDATE_FORMATで、時刻を除いた年-月-日を取り出してください。 | 確認済み。drill-ph2/src/week30-1/README.md:3 | MySQL固有構文は教材・公式仕様との静的照合のみ |
| question-ph2-week30-assembly-monthly-key<br>違う年の同じ月を混ぜず、年-月で集計するMySQLのキーを組み立ててください。 | 確認済み。drill-ph2/src/week30-3/README.md:3 | MySQL固有構文は教材・公式仕様との静的照合のみ |
| question-ph2-week30-assembly-toggle-status<br>statusは0か1です。0なら1、1なら0に切り替える式を組み立ててください。 | 確認済み。curriculum/PH2/PH2.md:1245 | SQLite固定データで正誤比較（MySQL実行ではない） |
| question-ph2-week30-assembly-weekly-monday<br>MySQLのWEEKDAYは月曜0〜日曜6です。DATE_SUBで日数を引き、各日をその週の月曜へそろえてください。 | 確認済み。drill-ph2/src/week30-2/README.md:3 | MySQL固有構文は教材・公式仕様との静的照合のみ |
| question-ph2-week30-assembly-crud-return<br>To-DoのINSERTは成功済みです。通常のフォーム送信後、/index.phpへ戻すLocationヘッダーを組み立ててください。出力前です。 | 確認済み。curriculum/PH2/PH2.md:1245 | PHP CLI -l; 構文のみ |

### PH2 Week31｜二次元配列・ユーザーごとのTo-Do

既存12問＋組み立て5問。各学習目標を、教材・ドリルで構文や対象を選ぶ判断へつなぐ。

| 問題ID / 学習目標 | 教材・正答・誤答 | 補助確認 |
|---|---|---|
| question-ph2-week31-assembly-study-pair<br>$studyのget_day()は日付文字列、get_hours()は整数時間を返す提供済みメソッドです。[日付,時間]の配列を作ってください。 | 確認済み。drill-ph2/src/week31/README.md:3 | PHP CLI -l; 構文のみ / PHP CLI; 正答と主要誤答を固定入力で比較 |
| question-ph2-week31-assembly-map-studies<br>$studiesは提供済みStudyオブジェクトの配列です。get_dayとget_hoursが日付と整数時間を返します。各結果を[日付,時間]へ変換してください。 | 確認済み。drill-ph2/src/week31/README.md:3 | PHP CLI -l; 構文のみ / PHP CLI; 正答と主要誤答を固定入力で比較 |
| question-ph2-week31-assembly-owner-select<br>ログイン確認済みです。認証済みの利用者IDを:user_idへバインドする前提で、その人のTo-Doだけ取得してください。 | 確認済み。curriculum/PH2/PH2.md:1309 | SQLite固定データで正誤比較（MySQL実行ではない） |
| question-ph2-week31-assembly-owner-bind<br>認証済みのセッションIDを取得条件へ渡してください。GETのuser_idは利用者が変更できます。session_startとログイン確認は済んでいます。 | 確認済み。curriculum/PH2/PH2.md:1309 | PHP CLI -l; 構文のみ |
| question-ph2-week31-assembly-encode-chart<br>$dataは[日付文字列,整数時間]の行を持つ二次元配列です。JavaScriptへ渡すJSON文字列を作ってください。 | 確認済み。drill-ph2/src/week31/README.md:3 | PHP CLI -l; 構文のみ / PHP CLI; 正答と主要誤答を固定入力で比較 |

### PH2 Week32｜非同期通信・JSON・チャート

既存12問＋組み立て5問。各学習目標を、教材・ドリルで構文や対象を選ぶ判断へつなぐ。

| 問題ID / 学習目標 | 教材・正答・誤答 | 補助確認 |
|---|---|---|
| question-ph2-week32-assembly-async-json<br>async関数内です。取得済みResponseのJSON本文を読んだ値をresultへ受け取ってください。 | 確認済み。curriculum/PH2/PH2.md:1383 | TypeScript parser; JSはimport/export以外をasync関数内で構文確認 / Node VM; 外部通信なし・固定入力で正答と主要誤答を比較 |
| question-ph2-week32-assembly-post-delete<br>idは整数です。PHPが$_POST["delete-id"]で読むフォーム形式のbodyを組み立ててください。ヘッダーとmethodは固定済みです。 | 確認済み。curriculum/PH2/Week32.md:65 | TypeScript parser; JSはimport/export以外をasync関数内で構文確認 / Node VM; 外部通信なし・固定入力で正答と主要誤答を比較 |
| question-ph2-week32-assembly-chart-columns<br>dataはGoogle ChartsのDataTableです。先頭を日付の文字列、2列目を時間の数値としてください。 | 確認済み。drill-ph2/src/week32/README.md:3 | TypeScript parser; JSはimport/export以外をasync関数内で構文確認 / Node VM; 外部通信なし・固定入力で正答と主要誤答を比較 |
| question-ph2-week32-assembly-http-guard<br>HTTP成功時だけ後続で要素を消します。response取得後、失敗ならErrorを投げる条件を組み立ててください。 | 確認済み。curriculum/PH2/Week32.md:65 | TypeScript parser; JSはimport/export以外をasync関数内で構文確認 / Node VM; 外部通信なし・固定入力で正答と主要誤答を比較 |
| question-ph2-week32-assembly-remove-target<br>PHPから削除成功の応答を確認済みです。todoItemは削除対象のli、buttonはその中のボタンです。li全体を取り除いてください。 | 確認済み。curriculum/PH2/Week32.md:65 | TypeScript parser; JSはimport/export以外をasync関数内で構文確認 / Node VM; 外部通信なし・固定入力で正答と主要誤答を比較 |
