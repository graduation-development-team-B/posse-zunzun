# Week04｜Gridレイアウト・擬似クラス

12問。言葉の理解: 2 / 知識の選択: 3 / 知識の組み立て: 3 / 結果の確認・修正: 4

作者向け資料。独立問題。公開されるのは制作状態publishedの問題。

## question-week4-grid-001（版2・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 条件とコード・操作を対応させて判断する：Tailwindで3列のグリッドレイアウトを作るクラスはどれですか？
- 出典: curriculum/PH1/Week04.md:58 / 2. Gridの基本クラス
- ドリル接続: Week04 問題1のGrid親子、問題2のhover診断、問題3のFlexとGrid統合。drill-ph1/week04-1〜3/README.md
- 既習: Week01〜04のインプット
- 概念: week4-section-2
- 類題: week4-section-2 / 同節の他問題は視点・文脈を変える関連問題。完全な等価類題とは扱わない。
- 依存: なし。毎回この問題の初期コード／シミュレーター開始状態から開始

Tailwindで3列のグリッドレイアウトを作るクラスはどれですか？

- b: flex flex-cols-3
- c: grid columns-3
- d: display-grid cols-3
- a: grid grid-cols-3（正答）

達成条件: 問題文の条件に合う回答：grid grid-cols-3

ヒント: 「Gridの基本クラス」で、何を操作すると何が変わるかを確認しましょう。

解説: CSS Gridを使うにはまず親要素に `display: grid` を設定し（Tailwindでは `grid`）、列数を `grid-template-columns` で指定します（Tailwindでは `grid-cols-{n}`）。

採点: 指定した候補による限定入力。正答IDを判定。previewのクラス順序は不問。consoleは指定構文と実行結果の両方を確認

検証: 出典・条件・正誤の静的確認。実行検証は検証レポート参照

- 誤答b: flexboxにはflex-colsはありません。グリッドにはgrid grid-cols-3を使います。
- 誤答c: columnsはMulti-column Layoutの書き方です。CSS Gridではgrid-colsを使います。
- 誤答d: display-gridはTailwindのクラスではありません。正しくはgridです。

## question-week4-grid-002（版2・published）

- 形式: choice
- 主対象: 知識の組み立て
- 学習目標: 条件とコード・操作を対応させて判断する：CSS GridとFlexboxは、どちらか一方しか使えず組み合わせることはできない。
- 出典: curriculum/PH1/Week04.md:22 / 1. GridとFlexの役割の違い
- ドリル接続: Week04 問題1のGrid親子、問題2のhover診断、問題3のFlexとGrid統合。drill-ph1/week04-1〜3/README.md
- 既習: Week01〜04のインプット
- 概念: week4-section-1
- 類題: week4-section-1 / 同節の他問題は視点・文脈を変える関連問題。完全な等価類題とは扱わない。
- 依存: なし。毎回この問題の初期コード／シミュレーター開始状態から開始

CSS GridとFlexboxは、どちらか一方しか使えず組み合わせることはできない。

- true: 正しい
- false: 誤り（正答）

達成条件: 問題文の条件に合う回答：誤り

ヒント: 「GridとFlexの役割の違い」で、何を操作すると何が変わるかを確認しましょう。

解説: GridとFlexboxはそれぞれ得意な用途が異なり、組み合わせて使えます。Gridはページ全体の2次元レイアウトに、Flexboxは行内の要素配置に向いています。

採点: 指定した候補による限定入力。正答IDを判定。previewのクラス順序は不問。consoleは指定構文と実行結果の両方を確認

検証: 出典・条件・正誤の静的確認。実行検証は検証レポート参照

- 誤答true: GridとFlexboxは組み合わせて使えます。外側のレイアウトにGrid、内側の要素配置にFlexboxを使うのは一般的な手法です。

## question-week4-col-span-001（版2・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 条件とコード・操作を対応させて判断する：3列グリッドで、特定の要素を2列分の幅で表示したい。Tailwindのクラスを選んでください。
- 出典: curriculum/PH1/Week04.md:88 / 3. col-span で幅を変える
- ドリル接続: Week04 問題1のGrid親子、問題2のhover診断、問題3のFlexとGrid統合。drill-ph1/week04-1〜3/README.md
- 既習: Week01〜04のインプット
- 概念: week4-section-3
- 類題: week4-section-3 / 同節の他問題は視点・文脈を変える関連問題。完全な等価類題とは扱わない。
- 依存: なし。毎回この問題の初期コード／シミュレーター開始状態から開始

3列グリッドで、特定の要素を2列分の幅で表示したい。Tailwindのクラスを選んでください。

```html
<div class="grid grid-cols-3 gap-4">
  <div class="__BLANK__">広い要素</div>
  <div>通常</div>
</div>
```

- d: span-2
- a: col-span-2（正答）
- b: grid-cols-2
- c: col-start-2

達成条件: 問題文の条件に合う回答：col-span-2

ヒント: 「col-span で幅を変える」で、何を操作すると何が変わるかを確認しましょう。

解説: col-span-{n}を使うと、グリッドアイテムがn列分の幅を占めるようになります。col-span-2は2列分の幅になります。

採点: 指定した候補による限定入力。正答IDを判定。previewのクラス順序は不問。consoleは指定構文と実行結果の両方を確認

検証: 出典・条件・正誤の静的確認。実行検証は検証レポート参照

- 誤答b: grid-cols-2は親要素の列数を変更するもので、子要素の幅には使いません。
- 誤答c: col-startは開始列を指定しますが、幅は変わりません。
- 誤答d: span-2はTailwindのGridクラスではありません。col-span-2が正しいです。

## question-week4-responsive-grid-001（版2・published）

- 形式: choice
- 主対象: 知識の組み立て
- 学習目標: 条件とコード・操作を対応させて判断する：375px幅で1列、768px以上（md）で2列、1024px以上（lg）で4列にするTailwindのクラスはどれですか？
- 出典: curriculum/PH1/Week04.md:106 / 4. レスポンシブGridの書き方
- ドリル接続: Week04 問題1のGrid親子、問題2のhover診断、問題3のFlexとGrid統合。drill-ph1/week04-1〜3/README.md
- 既習: Week01〜04のインプット
- 概念: week4-section-4
- 類題: week4-section-4 / 同節の他問題は視点・文脈を変える関連問題。完全な等価類題とは扱わない。
- 依存: なし。毎回この問題の初期コード／シミュレーター開始状態から開始

375px幅で1列、768px以上（md）で2列、1024px以上（lg）で4列にするTailwindのクラスはどれですか？

- c: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- d: grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- a: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4（正答）
- b: grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1

達成条件: 問題文の条件に合う回答：grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4

ヒント: 「レスポンシブGridの書き方」で、何を操作すると何が変わるかを確認しましょう。

解説: Tailwindはモバイルファーストで、基本のgrid-cols-1がスマホ用、md:grid-cols-2がタブレット用、lg:grid-cols-4がPC用に上書きします。gridクラスを忘れずに指定してください。

採点: 指定した候補による限定入力。正答IDを判定。previewのクラス順序は不問。consoleは指定構文と実行結果の両方を確認

検証: 出典・条件・正誤の静的確認。実行検証は検証レポート参照

- 誤答b: クラスの順序は動作に影響しませんが、gridクラスが必要で選択肢bは正しく動作します。ただし一般的な書き方はaです。
- 誤答c: gridクラスなしではdisplay: gridが設定されません。
- 誤答d: sm:grid-cols-1は640px以上で1列になりますが、640px未満では指定がないため動作が不安定です。

## question-week4-hover-001（版2・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 条件とコード・操作を対応させて判断する：Tailwindでホバー時に背景色を青（bg-blue-500）に変えるクラスはどれですか？
- 出典: curriculum/PH1/Week04.md:130 / 5. hover: で状態に応じたスタイル
- ドリル接続: Week04 問題1のGrid親子、問題2のhover診断、問題3のFlexとGrid統合。drill-ph1/week04-1〜3/README.md
- 既習: Week01〜04のインプット
- 概念: week4-section-5
- 類題: week4-section-5 / 同節の他問題は視点・文脈を変える関連問題。完全な等価類題とは扱わない。
- 依存: なし。毎回この問題の初期コード／シミュレーター開始状態から開始

Tailwindでホバー時に背景色を青（bg-blue-500）に変えるクラスはどれですか？

- b: bg-blue-500:hover
- c: :hover-bg-blue-500
- d: on-hover:bg-blue-500
- a: hover:bg-blue-500（正答）

達成条件: 問題文の条件に合う回答：hover:bg-blue-500

ヒント: 「hover: で状態に応じたスタイル」で、何を操作すると何が変わるかを確認しましょう。

解説: Tailwindでは `hover:` プレフィックスを使ってホバー時のスタイルを指定します。`hover:bg-blue-500` はホバー時に背景色をblue-500に変えます。

採点: 指定した候補による限定入力。正答IDを判定。previewのクラス順序は不問。consoleは指定構文と実行結果の両方を確認

検証: 出典・条件・正誤の静的確認。実行検証は検証レポート参照

- 誤答b: Tailwindの書き方は「状態:プロパティ」の順です。bg-blue-500:hoverは間違いです。
- 誤答c: コロンはプレフィックスの後ではなく、プレフィックスと値の間にきます。
- 誤答d: on-hoverはTailwindのプレフィックスではありません。正しくはhover:です。

## question-week4-odd-even-001（版2・published）

- 形式: choice
- 主対象: 言葉の理解
- 学習目標: 条件とコード・操作を対応させて判断する：Tailwindの `odd:` は奇数番目の要素、`even:` は偶数番目の要素にスタイルを適用する。
- 出典: curriculum/PH1/Week04.md:158 / 6. odd: / even: で行ごとに色を変える
- ドリル接続: Week04 問題1のGrid親子、問題2のhover診断、問題3のFlexとGrid統合。drill-ph1/week04-1〜3/README.md
- 既習: Week01〜04のインプット
- 概念: week4-section-6
- 類題: week4-section-6 / 同節の他問題は視点・文脈を変える関連問題。完全な等価類題とは扱わない。
- 依存: なし。毎回この問題の初期コード／シミュレーター開始状態から開始

Tailwindの `odd:` は奇数番目の要素、`even:` は偶数番目の要素にスタイルを適用する。

- true: 正しい（正答）
- false: 誤り

達成条件: 問題文の条件に合う回答：正しい

ヒント: 「odd: / even: で行ごとに色を変える」で、何を操作すると何が変わるかを確認しましょう。

解説: odd:とeven:はCSSの:nth-child(odd)と:nth-child(even)に対応するTailwindのプレフィックスです。テーブルやリストの交互の行に色をつけるストライプパターンによく使われます。

採点: 指定した候補による限定入力。正答IDを判定。previewのクラス順序は不問。consoleは指定構文と実行結果の両方を確認

検証: 出典・条件・正誤の静的確認。実行検証は検証レポート参照

- 誤答false: odd:は奇数番目（1, 3, 5...）、even:は偶数番目（2, 4, 6...）の要素にスタイルを適用します。テーブルの行に色をつけるのによく使います。

## question-week4-common-mistakes-001（版2・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: 条件とコード・操作を対応させて判断する：ホバー時に背景色が変わらないバグがあります。どこが問題ですか？
- 出典: curriculum/PH1/Week04.md:220 / 8. よくある間違いと確認ポイント
- ドリル接続: Week04 問題1のGrid親子、問題2のhover診断、問題3のFlexとGrid統合。drill-ph1/week04-1〜3/README.md
- 既習: Week01〜04のインプット
- 概念: week4-section-8
- 類題: week4-section-8 / 同節の他問題は視点・文脈を変える関連問題。完全な等価類題とは扱わない。
- 依存: なし。毎回この問題の初期コード／シミュレーター開始状態から開始

ホバー時に背景色が変わらないバグがあります。どこが問題ですか？

```html
<button class="bg-gray-200 text-gray-700
  transition-colors duration-200"
>
  ボタン
</button>
```

- d: buttonタグにはhoverスタイルが適用できない
- a: hover:bg-blue-500 が指定されていない（正答）
- b: transition-colorsをtransition-allに変える必要がある
- c: duration-200をduration-300に変える必要がある

達成条件: 問題文の条件に合う回答：hover:bg-blue-500 が指定されていない

ヒント: 「よくある間違いと確認ポイント」で、何を操作すると何が変わるかを確認しましょう。

解説: ホバー時のスタイルは `hover:` プレフィックスで指定します。transitionとdurationは変化のアニメーションを制御しますが、ホバー時に変化させる色の指定（hover:bg-blue-500など）がなければ何も変わりません。

採点: 指定した候補による限定入力。正答IDを判定。previewのクラス順序は不問。consoleは指定構文と実行結果の両方を確認

検証: 出典・条件・正誤の静的確認。実行検証は検証レポート参照

- 誤答b: transition-allでも動作しますが、根本的な問題はhover:bg-blue-500がないことです。
- 誤答c: durationの値は視覚的な調整で、バグの原因ではありません。
- 誤答d: buttonタグにもhoverスタイルは適用できます。

## question-week4-common-mistakes-002（版2・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: 条件とコード・操作を対応させて判断する：縦一列のリストで1番目・3番目だけ灰色にしたいのに、全項目が灰色です。各liのクラスをどう直しますか？
- 出典: curriculum/PH1/Week04.md:220 / 8. よくある間違いと確認ポイント
- ドリル接続: Week04 問題1のGrid親子、問題2のhover診断、問題3のFlexとGrid統合。drill-ph1/week04-1〜3/README.md
- 既習: Week01〜04のインプット
- 概念: week4-section-8
- 類題: week4-section-8 / 同節の他問題は視点・文脈を変える関連問題。完全な等価類題とは扱わない。
- 依存: なし。毎回この問題の初期コード／シミュレーター開始状態から開始

縦一列のリストで1番目・3番目だけ灰色にしたいのに、全項目が灰色です。各liのクラスをどう直しますか？

```html
<ul>
  <li class="bg-gray-100">商品A</li>
  <li class="bg-gray-100">商品B</li>
  <li class="bg-gray-100">商品C</li>
</ul>
```

- a: 各liをodd:bg-gray-100に変える（正答）
- b: ulだけにodd:bg-gray-100を付け、liはそのまま
- c: 各liをeven:bg-gray-100に変える
- d: 各liをbg-gray-100:oddに変える

達成条件: 問題文の条件に合う回答：各liをodd:bg-gray-100に変える

ヒント: 「よくある間違いと確認ポイント」で、何を操作すると何が変わるかを確認しましょう。

解説: 各liにodd:bg-gray-100を付けると、同じ親の中で1番目・3番目の項目だけに背景が付きます。修正後は2番目に背景が付かないことも確認しましょう。

採点: 指定した候補による限定入力。正答IDを判定。previewのクラス順序は不問。consoleは指定構文と実行結果の両方を確認

検証: 出典・条件・正誤の静的確認。実行検証は検証レポート参照

- 誤答b: 各liの通常背景が残るため全項目が灰色のままです。
- 誤答c: 2番目など偶数番目が灰色になります。
- 誤答d: 状態の接頭辞はクラス名の前に付けます。

## question-week4-common-mistakes-004（版2・published）

- 形式: choice
- 主対象: 言葉の理解
- 学習目標: 条件とコード・操作を対応させて判断する：親でGridを有効にしているとき、gap-4はカード間の間隔を指定し、カード内側の余白は指定しない。
- 出典: curriculum/PH1/Week04.md:58 / 2. Gridの基本クラス
- ドリル接続: Week04 問題1のGrid親子、問題2のhover診断、問題3のFlexとGrid統合。drill-ph1/week04-1〜3/README.md
- 既習: Week01〜04のインプット
- 概念: week4-section-2
- 類題: week4-section-2 / 同節の他問題は視点・文脈を変える関連問題。完全な等価類題とは扱わない。
- 依存: なし。毎回この問題の初期コード／シミュレーター開始状態から開始

親でGridを有効にしているとき、gap-4はカード間の間隔を指定し、カード内側の余白は指定しない。

- true: 正しい（正答）
- false: 誤り

達成条件: 問題文の条件に合う回答：正しい

ヒント: 「Gridの基本クラス」で、何を操作すると何が変わるかを確認しましょう。

解説: gapは並べた要素の間隔です。カードの背景と文章の間を空けるpaddingとは異なります。カード間とカード内のどちらを変えたいかで選びます。

採点: 指定した候補による限定入力。正答IDを判定。previewのクラス順序は不問。consoleは指定構文と実行結果の両方を確認

検証: 出典・条件・正誤の静的確認。実行検証は検証レポート参照

- 誤答false: gapはカード同士の間隔です。カード内部を空けるにはp-*を使います。

## question-week4-common-mistakes-006（版2・published）

- 形式: choice
- 主対象: 知識の組み立て
- 学習目標: 条件とコード・操作を対応させて判断する：幅375pxで1列、640pxで2列、1024pxで4列にするGrid指定はどれ？
- 出典: curriculum/PH1/Week04.md:106 / 4. レスポンシブGridの書き方
- ドリル接続: Week04 問題1のGrid親子、問題2のhover診断、問題3のFlexとGrid統合。drill-ph1/week04-1〜3/README.md
- 既習: Week01〜04のインプット
- 概念: week4-section-4
- 類題: week4-section-4 / 同節の他問題は視点・文脈を変える関連問題。完全な等価類題とは扱わない。
- 依存: なし。毎回この問題の初期コード／シミュレーター開始状態から開始

幅375pxで1列、640pxで2列、1024pxで4列にするGrid指定はどれ？

- a: grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4（正答）
- b: grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- c: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- d: grid grid-cols-4 sm:grid-cols-2

達成条件: 問題文の条件に合う回答：grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4

ヒント: 「レスポンシブGridの書き方」で、何を操作すると何が変わるかを確認しましょう。

解説: 接頭辞なしのgrid-cols-1をスマホの基本値にし、sm:grid-cols-2、lg:grid-cols-4で幅が広がったときの列数を上書きします。Gridの親にはgridクラスも必要です。

採点: 指定した候補による限定入力。正答IDを判定。previewのクラス順序は不問。consoleは指定構文と実行結果の両方を確認

検証: 出典・条件・正誤の静的確認。実行検証は検証レポート参照

- 誤答b: 640pxではsm:grid-cols-1により1列なので、この問題の2列という条件と違います。
- 誤答c: Gridを有効にするgridクラスが必要です。
- 誤答d: 基本が4列なのでスマホでも4列になり、意図したモバイルファーストになりません。

## question-week4-common-mistakes-007（版2・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: 条件とコード・操作を対応させて判断する：カードへホバーしても影が変わりません。バグの原因はどれですか？
- 出典: curriculum/PH1/Week04.md:220 / 8. よくある間違いと確認ポイント
- ドリル接続: Week04 問題1のGrid親子、問題2のhover診断、問題3のFlexとGrid統合。drill-ph1/week04-1〜3/README.md
- 既習: Week01〜04のインプット
- 概念: week4-section-8
- 類題: week4-section-8 / 同節の他問題は視点・文脈を変える関連問題。完全な等価類題とは扱わない。
- 依存: なし。毎回この問題の初期コード／シミュレーター開始状態から開始

カードへホバーしても影が変わりません。バグの原因はどれですか？

```html
<article class="bg-white shadow">
  商品カード
</article>
```

- d: shadowを親Gridへ移す必要がある
- a: hover:shadow-lg が指定されていない（正答）
- b: カードをGridの子にしている
- c: bg-whiteを削除する必要がある

達成条件: 問題文の条件に合う回答：hover:shadow-lg が指定されていない

ヒント: 「よくある間違いと確認ポイント」で、何を操作すると何が変わるかを確認しましょう。

解説: ホバー時の影を変えるには、対象カード自身へhover:shadow-lgのような状態指定を付けます。通常のshadowだけでは常時同じ影が表示され、マウス状態による変化は起きません。

採点: 指定した候補による限定入力。正答IDを判定。previewのクラス順序は不問。consoleは指定構文と実行結果の両方を確認

検証: 出典・条件・正誤の静的確認。実行検証は検証レポート参照

- 誤答b: Gridの子要素であることはホバー指定の妨げになりません。
- 誤答c: 背景色はホバー影の変化と無関係です。
- 誤答d: 影を変えたいカード自身へhover:shadow-lgを指定します。

## question-week4-common-mistakes-009（版2・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: 条件とコード・操作を対応させて判断する：2列のカード一覧を作りたい。grid-cols-2を子に付けたため並びが変わりません。親子の指定をどう直しますか？
- 出典: curriculum/PH1/Week04.md:220 / 8. よくある間違いと確認ポイント
- ドリル接続: Week04 問題1のGrid親子、問題2のhover診断、問題3のFlexとGrid統合。drill-ph1/week04-1〜3/README.md
- 既習: Week01〜04のインプット
- 概念: week4-section-8
- 類題: week4-section-8 / 同節の他問題は視点・文脈を変える関連問題。完全な等価類題とは扱わない。
- 依存: なし。毎回この問題の初期コード／シミュレーター開始状態から開始

2列のカード一覧を作りたい。grid-cols-2を子に付けたため並びが変わりません。親子の指定をどう直しますか？

```html
<div>
  <div class="grid-cols-2">商品A</div>
  <div>商品B</div>
</div>
```

- c: 子要素へflexを追加する必要がある
- d: gap-4があるため列数が無効になる
- a: gridと列数はカードを並べる親へ指定する必要がある（正答）
- b: grid-cols-2をgrid-cols-4へ変更するだけでよい

達成条件: 問題文の条件に合う回答：gridと列数はカードを並べる親へ指定する必要がある

ヒント: 「よくある間違いと確認ポイント」で、何を操作すると何が変わるかを確認しましょう。

解説: gridとgrid-cols-*は子要素を並べる親に指定します。カード自身へgrid-cols-2だけを付けても、そのカードの子配置を指定するだけで、兄弟カードの列数は変わりません。

採点: 指定した候補による限定入力。正答IDを判定。previewのクラス順序は不問。consoleは指定構文と実行結果の両方を確認

検証: 出典・条件・正誤の静的確認。実行検証は検証レポート参照

- 誤答b: 列数の値だけでなく、並べる親をGridコンテナにするgridクラスも必要です。
- 誤答c: カード一覧の配置は親Gridで決まり、各子へのFlex指定は原因ではありません。
- 誤答d: gapは列間の余白であり、Gridの列数を無効にしません。
