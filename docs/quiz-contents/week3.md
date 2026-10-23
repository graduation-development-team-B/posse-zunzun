# Week03｜Flexboxレイアウト

17問。言葉の理解: 3 / 知識の選択: 5 / 知識の組み立て: 7 / 結果の確認・修正: 2

作者向け資料。独立問題。公開されるのは制作状態publishedの問題。

## question-week3-flex-001（版2・published）

- 形式: choice
- 主対象: 言葉の理解
- 学習目標: 条件とコード・操作を対応させて判断する：カード3枚を横に並べたい。「親要素」は、この例ではどの範囲の要素？
- 出典: curriculum/PH1/Week03.md:42 / 2. Flexboxの基本：「親」に `flex` をつける
- ドリル接続: Week03 問題1のカード一覧、問題2のヘッダー診断、問題3の料金プラン：親・方向・間隔を指定。drill-ph1/week03-2/README.md（問題3）
- 既習: Week01〜03のインプット
- 概念: week3-section-2
- 類題: week3-section-2 / 同節の他問題は視点・文脈を変える関連問題。完全な等価類題とは扱わない。
- 依存: なし。毎回この問題の初期コード／シミュレーター開始状態から開始

カード3枚を横に並べたい。「親要素」は、この例ではどの範囲の要素？

- b: カード3枚を直接包む要素（正答）
- c: ページ内のどのbodyでもよい
- d: 画像要素
- a: 各カードの中の見出し

達成条件: 問題文の条件に合う回答：カード3枚を直接包む要素

ヒント: 「Flexboxの基本：「親」に `flex` をつける」で、何を操作すると何が変わるかを確認しましょう。

解説: Flexboxでは、並べたい要素を直接包む親にflexを指定します。この例では3枚のカードを包む要素です。親と直接の子の関係を見つけると、どこにflexを付けるか判断できます。

採点: 指定した候補による限定入力。正答IDを判定。previewのクラス順序は不問。consoleは指定構文と実行結果の両方を確認

検証: 出典・条件・正誤の静的確認。実行検証は検証レポート参照

- 誤答a: 見出しはカードの中身です。カード同士を並べる親ではありません。
- 誤答c: bodyが対象カードの直接の親とは限りません。
- 誤答d: 画像はカード同士を包む要素ではありません。

## question-week3-flex-002（版2・published）

- 形式: choice
- 主対象: 言葉の理解
- 学習目標: 条件とコード・操作を対応させて判断する：`display: flex` を親要素に指定すると、子要素はデフォルトで横方向に並ぶ。
- 出典: curriculum/PH1/Week03.md:42 / 2. Flexboxの基本：「親」に `flex` をつける
- ドリル接続: Week03 問題1のカード一覧、問題2のヘッダー診断、問題3の料金プラン：親・方向・間隔を指定。drill-ph1/week03-2/README.md（問題3）
- 既習: Week01〜03のインプット
- 概念: week3-section-2
- 類題: week3-section-2 / 同節の他問題は視点・文脈を変える関連問題。完全な等価類題とは扱わない。
- 依存: なし。毎回この問題の初期コード／シミュレーター開始状態から開始

`display: flex` を親要素に指定すると、子要素はデフォルトで横方向に並ぶ。

- true: 正しい（正答）
- false: 誤り

達成条件: 問題文の条件に合う回答：正しい

ヒント: 「Flexboxの基本：「親」に `flex` をつける」で、何を操作すると何が変わるかを確認しましょう。

解説: `display: flex` を指定すると、子要素はデフォルトで主軸方向（flex-directionがrowの場合は横方向）に並びます。縦並びにするには `flex-direction: column` または Tailwindの `flex-col` を使います。

採点: 指定した候補による限定入力。正答IDを判定。previewのクラス順序は不問。consoleは指定構文と実行結果の両方を確認

検証: 出典・条件・正誤の静的確認。実行検証は検証レポート参照

- 誤答false: flex-directionのデフォルト値はrowのため、子要素は横方向（左から右）に並びます。

## question-week3-justify-001（版2・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 条件とコード・操作を対応させて判断する：flex-direction: rowの親で、子要素を左右に配置するプロパティはどれ？
- 出典: curriculum/PH1/Week03.md:76 / 3. justify-content：横方向の並び方を決める
- ドリル接続: Week03 問題1のカード一覧、問題2のヘッダー診断、問題3の料金プラン：親・方向・間隔を指定。drill-ph1/week03-2/README.md（問題3）
- 既習: Week01〜03のインプット
- 概念: week3-section-3
- 類題: week3-section-3 / 同節の他問題は視点・文脈を変える関連問題。完全な等価類題とは扱わない。
- 依存: なし。毎回この問題の初期コード／シミュレーター開始状態から開始

flex-direction: rowの親で、子要素を左右に配置するプロパティはどれ？

- d: align-self
- a: justify-content（正答）
- b: align-items
- c: flex-direction

達成条件: 問題文の条件に合う回答：justify-content

ヒント: 「justify-content：横方向の並び方を決める」で、何を操作すると何が変わるかを確認しましょう。

解説: justify-contentはFlexコンテナの主軸方向における子要素の配置を制御します。flex-start（左寄せ）、center（中央）、flex-end（右寄せ）、space-between（両端+均等）などを指定できます。

採点: 指定した候補による限定入力。正答IDを判定。previewのクラス順序は不問。consoleは指定構文と実行結果の両方を確認

検証: 出典・条件・正誤の静的確認。実行検証は検証レポート参照

- 誤答b: align-itemsは交差軸（縦方向）の揃え方を制御します。
- 誤答c: flex-directionは主軸の向きを設定します。
- 誤答d: align-selfは個別の子要素の交差軸方向の揃え方を上書きします。

## question-week3-justify-002（版2・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 条件とコード・操作を対応させて判断する：ヘッダーのロゴと右側のナビゲーションを左右両端に配置したい。Tailwindのクラスを選んでください。
- 出典: curriculum/PH1/Week03.md:76 / 3. justify-content：横方向の並び方を決める
- ドリル接続: Week03 問題1のカード一覧、問題2のヘッダー診断、問題3の料金プラン：親・方向・間隔を指定。drill-ph1/week03-2/README.md（問題3）
- 既習: Week01〜03のインプット
- 概念: week3-section-3
- 類題: week3-section-3 / 同節の他問題は視点・文脈を変える関連問題。完全な等価類題とは扱わない。
- 依存: なし。毎回この問題の初期コード／シミュレーター開始状態から開始

ヘッダーのロゴと右側のナビゲーションを左右両端に配置したい。Tailwindのクラスを選んでください。

```html
<header class="flex __BLANK__ items-center">...</header>
```

- c: justify-start
- d: justify-end
- a: justify-between（正答）
- b: justify-center

達成条件: 問題文の条件に合う回答：justify-between

ヒント: 「justify-content：横方向の並び方を決める」で、何を操作すると何が変わるかを確認しましょう。

解説: justify-between（justify-content: space-between）を使うと、最初の要素を左端に、最後の要素を右端に配置し、残りのスペースを均等に分配します。ヘッダーのロゴとナビゲーションの配置によく使われます。

採点: 指定した候補による限定入力。正答IDを判定。previewのクラス順序は不問。consoleは指定構文と実行結果の両方を確認

検証: 出典・条件・正誤の静的確認。実行検証は検証レポート参照

- 誤答b: justify-centerは要素を中央に集めます。左右両端への配置にはjustify-betweenを使います。
- 誤答c: justify-startは左寄せです。左右両端への配置にはjustify-betweenを使います。
- 誤答d: justify-endは右寄せです。左右両端への配置にはjustify-betweenを使います。

## question-week3-align-001（版2・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 条件とコード・操作を対応させて判断する：flex-direction: rowのヘッダーで、高さの違うロゴと文字を上下中央に揃えます。親に付けるクラスは？
- 出典: curriculum/PH1/Week03.md:102 / 4. align-items：縦方向の揃え方を決める
- ドリル接続: Week03 問題1のカード一覧、問題2のヘッダー診断、問題3の料金プラン：親・方向・間隔を指定。drill-ph1/week03-2/README.md（問題3）
- 既習: Week01〜03のインプット
- 概念: week3-section-4
- 類題: week3-section-4 / 同節の他問題は視点・文脈を変える関連問題。完全な等価類題とは扱わない。
- 依存: なし。毎回この問題の初期コード／シミュレーター開始状態から開始

flex-direction: rowのヘッダーで、高さの違うロゴと文字を上下中央に揃えます。親に付けるクラスは？

- b: justify-center
- c: items-start
- d: self-center
- a: items-center（正答）

達成条件: 問題文の条件に合う回答：items-center

ヒント: 「align-items：縦方向の揃え方を決める」で、何を操作すると何が変わるかを確認しましょう。

解説: align-itemsは交差軸（flex-directionがrowの場合は縦方向）の揃え方を制御します。items-centerを親要素に指定すると、高さの異なる子要素を上下中央に揃えられます。

採点: 指定した候補による限定入力。正答IDを判定。previewのクラス順序は不問。consoleは指定構文と実行結果の両方を確認

検証: 出典・条件・正誤の静的確認。実行検証は検証レポート参照

- 誤答b: justify-centerは主軸（横）方向の中央揃えです。縦の中央揃えにはitems-centerを使います。
- 誤答c: items-startは上端揃えです。上下中央にはitems-centerを使います。
- 誤答d: self-centerは個々の子要素に指定するもので、親要素の全子要素には効きません。

## question-week3-align-002（版2・published）

- 形式: choice
- 主対象: 言葉の理解
- 学習目標: 条件とコード・操作を対応させて判断する：flex-direction: rowの親では、justify-contentは上下方向の揃え方を変える。
- 出典: curriculum/PH1/Week03.md:102 / 4. align-items：縦方向の揃え方を決める
- ドリル接続: Week03 問題1のカード一覧、問題2のヘッダー診断、問題3の料金プラン：親・方向・間隔を指定。drill-ph1/week03-2/README.md（問題3）
- 既習: Week01〜03のインプット
- 概念: week3-section-4
- 類題: week3-section-4 / 同節の他問題は視点・文脈を変える関連問題。完全な等価類題とは扱わない。
- 依存: なし。毎回この問題の初期コード／シミュレーター開始状態から開始

flex-direction: rowの親では、justify-contentは上下方向の揃え方を変える。

- true: 正しい
- false: 誤り（正答）

達成条件: 問題文の条件に合う回答：誤り

ヒント: 「align-items：縦方向の揃え方を決める」で、何を操作すると何が変わるかを確認しましょう。

解説: justify-contentは主軸方向の配置を制御し、align-itemsは交差軸方向の揃え方を制御します。flex-directionがrow（デフォルト）の場合、主軸は横方向で交差軸は縦方向です。

採点: 指定した候補による限定入力。正答IDを判定。previewのクラス順序は不問。consoleは指定構文と実行結果の両方を確認

検証: 出典・条件・正誤の静的確認。実行検証は検証レポート参照

- 誤答true: justify-contentは主軸方向（flex-directionがrowなら横方向）を制御します。交差軸の制御はalign-itemsです。

## question-week3-gap-001（版2・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 条件とコード・操作を対応させて判断する：横並びのカード間だけに一定の16pxの間隔を付けたい。親に使う方法は？
- 出典: curriculum/PH1/Week03.md:156 / 5. gap：要素と要素の間隔を決める
- ドリル接続: Week03 問題1のカード一覧、問題2のヘッダー診断、問題3の料金プラン：親・方向・間隔を指定。drill-ph1/week03-2/README.md（問題3）
- 既習: Week01〜03のインプット
- 概念: week3-section-5
- 類題: week3-section-5 / 同節の他問題は視点・文脈を変える関連問題。完全な等価類題とは扱わない。
- 依存: なし。毎回この問題の初期コード／シミュレーター開始状態から開始

横並びのカード間だけに一定の16pxの間隔を付けたい。親に使う方法は？

- d: justify-content: space-between を使う
- a: gap: 16pxを指定する（Tailwindならgap-4）（正答）
- b: 各子要素に margin-right を指定する
- c: 各子要素に padding を指定する

達成条件: 問題文の条件に合う回答：gap: 16pxを指定する（Tailwindならgap-4）

ヒント: 「gap：要素と要素の間隔を決める」で、何を操作すると何が変わるかを確認しましょう。

解説: gapプロパティはFlexコンテナの子要素の間隔を均等に設定します。各子要素にmarginを個別指定するよりシンプルで、最初・最後の要素に不要な余白が生まれません。

採点: 指定した候補による限定入力。正答IDを判定。previewのクラス順序は不問。consoleは指定構文と実行結果の両方を確認

検証: 出典・条件・正誤の静的確認。実行検証は検証レポート参照

- 誤答b: margin-rightを使うと最後の要素にも余白ができてしまいます。gapの方がシンプルです。
- 誤答c: paddingは要素の内側の余白で、要素間の間隔には向きません。
- 誤答d: space-betweenは要素間のスペースを均等にしますが、間隔のサイズを直接指定できません。

## question-week3-flex-col-001（版2・published）

- 形式: choice
- 主対象: 知識の組み立て
- 学習目標: 条件とコード・操作を対応させて判断する：Tailwindで要素を縦並びにし、かつ各要素間に16px（gap-4）の間隔を入れたい。正しいクラスの組み合わせはどれですか？
- 出典: curriculum/PH1/Week03.md:179 / 6. flex-col：縦方向に並べる
- ドリル接続: Week03 問題1のカード一覧、問題2のヘッダー診断、問題3の料金プラン：親・方向・間隔を指定。drill-ph1/week03-2/README.md（問題3）
- 既習: Week01〜03のインプット
- 概念: week3-section-6
- 類題: week3-section-6 / 同節の他問題は視点・文脈を変える関連問題。完全な等価類題とは扱わない。
- 依存: なし。毎回この問題の初期コード／シミュレーター開始状態から開始

Tailwindで要素を縦並びにし、かつ各要素間に16px（gap-4）の間隔を入れたい。正しいクラスの組み合わせはどれですか？

- c: flex-col gap-4
- d: block gap-4
- a: flex flex-col gap-4（正答）
- b: flex gap-4

達成条件: 問題文の条件に合う回答：flex flex-col gap-4

ヒント: 「flex-col：縦方向に並べる」で、何を操作すると何が変わるかを確認しましょう。

解説: flexで子を並べる仕組みを有効にし、flex-colで縦方向、gap-4で16pxの間隔を指定します。この組み合わせで、方向と間隔を別々に指定できます。

採点: 指定した候補による限定入力。正答IDを判定。previewのクラス順序は不問。consoleは指定構文と実行結果の両方を確認

検証: 出典・条件・正誤の静的確認。実行検証は検証レポート参照

- 誤答b: flexだけではデフォルトで横並びになります。縦並びにはflex-colを追加します。
- 誤答c: この要素ではflexによる配置が有効になっていません。flexも必要です。
- 誤答d: blockレイアウトではgapは機能しません。flexと組み合わせる必要があります。

## question-week3-flex-wrap-001（版2・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 条件とコード・操作を対応させて判断する：Flexboxのデフォルト動作では、子要素がコンテナの幅を超えても自動的に折り返す。
- 出典: curriculum/PH1/Week03.md:196 / 7. flex-wrap：はみ出した時に折り返す
- ドリル接続: Week03 問題1のカード一覧、問題2のヘッダー診断、問題3の料金プラン：親・方向・間隔を指定。drill-ph1/week03-2/README.md（問題3）
- 既習: Week01〜03のインプット
- 概念: week3-section-7
- 類題: week3-section-7 / 同節の他問題は視点・文脈を変える関連問題。完全な等価類題とは扱わない。
- 依存: なし。毎回この問題の初期コード／シミュレーター開始状態から開始

Flexboxのデフォルト動作では、子要素がコンテナの幅を超えても自動的に折り返す。

- true: 正しい
- false: 誤り（正答）

達成条件: 問題文の条件に合う回答：誤り

ヒント: 「flex-wrap：はみ出した時に折り返す」で、何を操作すると何が変わるかを確認しましょう。

解説: デフォルトのnowrapでは自動的に折り返しません。子要素が縮む場合もありますが、折り返す指定とは別です。折り返しにはflex-wrapを使います。

採点: 指定した候補による限定入力。正答IDを判定。previewのクラス順序は不問。consoleは指定構文と実行結果の両方を確認

検証: 出典・条件・正誤の静的確認。実行検証は検証レポート参照

- 誤答true: デフォルトのflex-wrap: nowrapでは折り返しません。折り返すにはflex-wrapまたはTailwindのflex-wrapクラスを指定します。

## question-week3-responsive-001（版2・published）

- 形式: choice
- 主対象: 知識の組み立て
- 学習目標: 条件とコード・操作を対応させて判断する：375px幅では縦並び、768px以上では横並びにするTailwindの書き方として正しいのはどれですか？
- 出典: curriculum/PH1/Week03.md:213 / 8. スマホ幅で縦並びにする（レスポンシブ対応）
- ドリル接続: Week03 問題1のカード一覧、問題2のヘッダー診断、問題3の料金プラン：親・方向・間隔を指定。drill-ph1/week03-2/README.md（問題3）
- 既習: Week01〜03のインプット
- 概念: week3-section-8
- 類題: week3-section-8 / 同節の他問題は視点・文脈を変える関連問題。完全な等価類題とは扱わない。
- 依存: なし。毎回この問題の初期コード／シミュレーター開始状態から開始

375px幅では縦並び、768px以上では横並びにするTailwindの書き方として正しいのはどれですか？

- a: flex flex-col md:flex-row（正答）
- b: md:flex md:flex-col flex-row
- c: flex flex-row md:flex-col
- d: sm:flex-col md:flex-row

達成条件: 問題文の条件に合う回答：flex flex-col md:flex-row

ヒント: 「スマホ幅で縦並びにする（レスポンシブ対応）」で、何を操作すると何が変わるかを確認しましょう。

解説: Tailwindはモバイルファーストです。まずスマホ用のスタイル（flex flex-col）を書き、mdブレイクポイント以上で上書き（md:flex-row）します。

採点: 指定した候補による限定入力。正答IDを判定。previewのクラス順序は不問。consoleは指定構文と実行結果の両方を確認

検証: 出典・条件・正誤の静的確認。実行検証は検証レポート参照

- 誤答b: Tailwindはモバイルファーストです。小さい画面のスタイルが基本で、大きい画面で上書きします。
- 誤答c: flex-rowが基本になりスマホでも横並びになります。スマホ用のflex-colを基本にしてください。
- 誤答d: flexを指定せずにflex-colだけではdisplay: flexが有効になりません。

## question-week3-mistake-001（版2・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: 条件とコード・操作を対応させて判断する：カードを横並びにしたいのに、縦並びのままになっています。バグの原因はどれですか？
- 出典: curriculum/PH1/Week03.md:42 / 2. Flexboxの基本：「親」に `flex` をつける
- ドリル接続: Week03 問題1のカード一覧、問題2のヘッダー診断、問題3の料金プラン：親・方向・間隔を指定。drill-ph1/week03-2/README.md（問題3）
- 既習: Week01〜03のインプット
- 概念: week3-section-2
- 類題: week3-section-2 / 同節の他問題は視点・文脈を変える関連問題。完全な等価類題とは扱わない。
- 依存: なし。毎回この問題の初期コード／シミュレーター開始状態から開始

カードを横並びにしたいのに、縦並びのままになっています。バグの原因はどれですか？

```html
<div>
  <div class="flex">
    カード1
  </div>
  <div class="flex">
    カード2
  </div>
  <div class="flex">
    カード3
  </div>
</div>
```

- d: items-centerを追加する必要がある
- a: flexを子要素に指定しているため、親要素にflexを指定する必要がある（正答）
- b: flexの代わりにflex-rowを使う必要がある
- c: gap-4を追加する必要がある

達成条件: 問題文の条件に合う回答：flexを子要素に指定しているため、親要素にflexを指定する必要がある

ヒント: 「Flexboxの基本：「親」に `flex` をつける」で、何を操作すると何が変わるかを確認しましょう。

解説: flexをつけるのは「子要素を横並びにしたい親要素」です。このコードでは各カード（子要素）にflexを指定していますが、横並びにしたいのはカード同士なので、カードを囲む外側のdivにflexを指定する必要があります。

採点: 指定した候補による限定入力。正答IDを判定。previewのクラス順序は不問。consoleは指定構文と実行結果の両方を確認

検証: 出典・条件・正誤の静的確認。実行検証は検証レポート参照

- 誤答b: flex-rowはflexの設定に加えて方向を指定しますが、まず親要素にflexを指定することが先決です。
- 誤答c: gapは間隔の設定で、横並びにはなりません。
- 誤答d: items-centerは縦方向の揃えで、横並びには関係ありません。

## question-week3-mistake-002（版2・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: 条件とコード・操作を対応させて判断する：ヘッダーのロゴとナビゲーションを左右に配置したいのに、両方が左寄せになっています。どこが間違っていますか？
- 出典: curriculum/PH1/Week03.md:76 / 3. justify-content：横方向の並び方を決める
- ドリル接続: Week03 問題1のカード一覧、問題2のヘッダー診断、問題3の料金プラン：親・方向・間隔を指定。drill-ph1/week03-2/README.md（問題3）
- 既習: Week01〜03のインプット
- 概念: week3-section-3
- 類題: week3-section-3 / 同節の他問題は視点・文脈を変える関連問題。完全な等価類題とは扱わない。
- 依存: なし。毎回この問題の初期コード／シミュレーター開始状態から開始

ヘッダーのロゴとナビゲーションを左右に配置したいのに、両方が左寄せになっています。どこが間違っていますか？

```html
<header class="flex items-center">
  <span class="text-xl font-bold">LOGO</span>
  <nav>
    <ul class="flex gap-4">
      <li><a href="#">About</a></li>
      <li><a href="#">Works</a></li>
    </ul>
  </nav>
</header>
```

- c: items-centerを削除して代わりにjustify-centerを使う
- d: headerにposition: relativeを追加する
- a: headerにjustify-betweenが指定されていない（正答）
- b: ulにflex gap-4ではなくflex justify-betweenを使うべき

達成条件: 問題文の条件に合う回答：headerにjustify-betweenが指定されていない

ヒント: 「justify-content：横方向の並び方を決める」で、何を操作すると何が変わるかを確認しましょう。

解説: ヘッダー内のロゴとナビゲーションを左右に配置するには、親要素（header）にjustify-betweenを追加します。justify-content: space-betweenが、最初の要素（ロゴ）を左端に、最後の要素（ナビ）を右端に配置します。

採点: 指定した候補による限定入力。正答IDを判定。previewのクラス順序は不問。consoleは指定構文と実行結果の両方を確認

検証: 出典・条件・正誤の静的確認。実行検証は検証レポート参照

- 誤答b: ul内のナビゲーション項目の配置の問題ではなく、ヘッダー内のロゴとナビゲーション自体の配置が問題です。
- 誤答c: justify-centerにすると中央寄せになります。左右両端への配置にはjustify-betweenが必要です。
- 誤答d: positionは位置取りで、flexboxのレイアウトとは別の概念です。

## question-week3-assembly-row-parent（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: リンクを横並びにし、リンク間に16pxの間隔を作ってください。親navのクラスを組み立てます。
- 出典: curriculum/PH1/Week03.md:42 / 2. Flexboxの基本：「親」に `flex` をつける
- ドリル接続: Week03の教材・ドリルで必要な構文と対象の対応を短い空欄で練習。navに指定し、リンク同士の間隔を確認しましょう。
- 既習: Week01〜03のインプット。既習コード・固定部分の役割は問題文に明記。
- 概念: ph1-week3-row-parent
- 類題: ph1-week3-assembly-row-parent / 既存の候補選択問題とは独立。複数断片の選択・接続を練習する追加問題。
- 依存: なし

リンクを横並びにし、リンク間に16pxの間隔を作ってください。親navのクラスを組み立てます。

```html
<nav class="__BLANK__">
  <a href="#a">案内</a><a href="#b">予約</a>
</nav>
```

- correct: flex gap-4（正答）
- wrong: block gap-4

達成条件: リンクを横並びにし、リンク間に16pxの間隔を作ってください。親navのクラスを組み立てます。

ヒント: 子を並べる親にflexを置き、gap-4で間隔を指定します。

解説: 子を並べる親にflexを置き、gap-4で間隔を指定します。PCではnavに指定し、リンク同士の間隔を確認しましょう。

採点: 実行なし。空欄に置いた候補トークン列を正答列と照合。classの順序は不問、重複・過不足は不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿作成後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。静的確認のみ（ランタイムなし）。限定トークン採点の確認はtests/content/assembly.test.mjs。アプリ内の実行はなし。

- 誤答wrong: blockではFlexboxにならず、この指定だけではリンク間のgapを作れません。

## question-week3-assembly-header-between（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: ロゴとナビを左右両端に配置し、高さの違う文字を上下中央にそろえてください。
- 出典: curriculum/PH1/Week03.md:76 / 3. justify-content：横方向の並び方を決める
- ドリル接続: Week03の教材・ドリルで必要な構文と対象の対応を短い空欄で練習。高さを変えてそろい方を見ましょう。
- 既習: Week01〜03のインプット。既習コード・固定部分の役割は問題文に明記。
- 概念: ph1-week3-header-between
- 類題: ph1-week3-assembly-header-between / 既存の候補選択問題とは独立。複数断片の選択・接続を練習する追加問題。
- 依存: なし

ロゴとナビを左右両端に配置し、高さの違う文字を上下中央にそろえてください。

```html
<header class="__BLANK__">
  <span>LOGO</span><nav>メニュー</nav>
</header>
```

- correct: flex justify-between items-center（正答）
- wrong: flex justify-center items-center

達成条件: ロゴとナビを左右両端に配置し、高さの違う文字を上下中央にそろえてください。

ヒント: row方向のflexではjustify-betweenが横の両端、items-centerが縦の中央を指定します。

解説: row方向のflexではjustify-betweenが横の両端、items-centerが縦の中央を指定します。PCでは高さを変えてそろい方を見ましょう。

採点: 実行なし。空欄に置いた候補トークン列を正答列と照合。classの順序は不問、重複・過不足は不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿作成後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。静的確認のみ（ランタイムなし）。限定トークン採点の確認はtests/content/assembly.test.mjs。アプリ内の実行はなし。

- 誤答wrong: justify-centerでは両要素が中央へ集まり、左右両端にはなりません。

## question-week3-assembly-vertical-gap（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: 3つの手順を縦に並べ、手順の間を24px空けてください。
- 出典: curriculum/PH1/Week03.md:179 / 6. flex-col：縦方向に並べる
- ドリル接続: Week03の教材・ドリルで必要な構文と対象の対応を短い空欄で練習。olの親クラスを編集しましょう。
- 既習: Week01〜03のインプット。既習コード・固定部分の役割は問題文に明記。
- 概念: ph1-week3-vertical-gap
- 類題: ph1-week3-assembly-vertical-gap / 既存の候補選択問題とは独立。複数断片の選択・接続を練習する追加問題。
- 依存: なし

3つの手順を縦に並べ、手順の間を24px空けてください。

```html
<ol class="__BLANK__"><li>準備</li><li>実装</li><li>確認</li></ol>
```

- correct: flex flex-col gap-6（正答）
- wrong: flex flex-row gap-6

達成条件: 3つの手順を縦に並べ、手順の間を24px空けてください。

ヒント: flexで並べ方を有効にしてflex-colで縦方向、gap-6で間隔を指定します。

解説: flexで並べ方を有効にしてflex-colで縦方向、gap-6で間隔を指定します。PCではolの親クラスを編集しましょう。

採点: 実行なし。空欄に置いた候補トークン列を正答列と照合。classの順序は不問、重複・過不足は不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿作成後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。静的確認のみ（ランタイムなし）。限定トークン採点の確認はtests/content/assembly.test.mjs。アプリ内の実行はなし。

- 誤答wrong: flex-rowでは手順が横方向に並びます。

## question-week3-assembly-wrap-cards（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: カードの幅は固定済みです。親幅に収まらないカードを次の行へ折り返し、間隔16pxにしてください。
- 出典: curriculum/PH1/Week03.md:196 / 7. flex-wrap：はみ出した時に折り返す
- ドリル接続: Week03の教材・ドリルで必要な構文と対象の対応を短い空欄で練習。flex-wrapを親に指定すると、収まらない子が次の行へ移ります。PCで画面幅を狭めて確認しましょう。
- 既習: Week01〜03のインプット。既習コード・固定部分の役割は問題文に明記。
- 概念: ph1-week3-wrap-cards
- 類題: ph1-week3-assembly-wrap-cards / 既存の候補選択問題とは独立。複数断片の選択・接続を練習する追加問題。
- 依存: なし

カードの幅は固定済みです。親幅に収まらないカードを次の行へ折り返し、間隔16pxにしてください。

```html
<div class="__BLANK__"><article class="w-48">A</article><article class="w-48">B</article></div>
```

- correct: flex flex-wrap gap-4（正答）
- wrong: flex flex-nowrap gap-4

達成条件: カードの幅は固定済みです。親幅に収まらないカードを次の行へ折り返し、間隔16pxにしてください。

ヒント: flex-wrapを親に指定すると、収まらない子が次の行へ移ります。

解説: flex-wrapを親に指定すると、収まらない子が次の行へ移ります。PCで画面幅を狭めて確認しましょう。

採点: 実行なし。空欄に置いた候補トークン列を正答列と照合。classの順序は不問、重複・過不足は不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿作成後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。静的確認のみ（ランタイムなし）。限定トークン採点の確認はtests/content/assembly.test.mjs。アプリ内の実行はなし。

- 誤答wrong: flex-nowrapは折り返さない指定です。

## question-week3-assembly-responsive-direction（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: 375pxでは縦並び、768px以上では横並びにしてください。間隔は16pxです。
- 出典: curriculum/PH1/Week03.md:213 / 8. スマホ幅で縦並びにする（レスポンシブ対応）
- ドリル接続: Week03の教材・ドリルで必要な構文と対象の対応を短い空欄で練習。375pxと768pxの両方を確認しましょう。
- 既習: Week01〜03のインプット。既習コード・固定部分の役割は問題文に明記。
- 概念: ph1-week3-responsive-direction
- 類題: ph1-week3-assembly-responsive-direction / 既存の候補選択問題とは独立。複数断片の選択・接続を練習する追加問題。
- 依存: なし

375pxでは縦並び、768px以上では横並びにしてください。間隔は16pxです。

```html
<div class="__BLANK__"><p>説明</p><aside>補足</aside></div>
```

- correct: flex flex-col md:flex-row gap-4（正答）
- wrong: flex flex-row md:flex-col gap-4

達成条件: 375pxでは縦並び、768px以上では横並びにしてください。間隔は16pxです。

ヒント: 接頭辞なしを縦、md以上を横にします。

解説: 接頭辞なしを縦、md以上を横にします。PCでは375pxと768pxの両方を確認しましょう。

採点: 実行なし。空欄に置いた候補トークン列を正答列と照合。classの順序は不問、重複・過不足は不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿作成後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。静的確認のみ（ランタイムなし）。限定トークン採点の確認はtests/content/assembly.test.mjs。アプリ内の実行はなし。

- 誤答wrong: 基準とmd以上の向きが逆です。
