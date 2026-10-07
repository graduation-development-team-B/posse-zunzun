# Week10｜非同期処理・Fetch・JSON

12問。言葉の理解: 3 / 知識の選択: 3 / 知識の組み立て: 3 / 結果の確認・修正: 3

作者向け資料。独立問題。公開されるのは制作状態publishedの問題。

## question-week10-promise-001（版1・published）

- 形式: choice
- 主対象: 言葉の理解
- 学習目標: fetchのPromiseとデータ本体を区別する
- 出典: curriculum/PH1/Week10.md:53 / 「Promise」という入れ物
- ドリル接続: drill-ph1/week10-2/README.md：fetchのPromiseとデータ本体を区別する。制作全体のうち、この判断を小さく取り出す。
- 既習: Week01〜10の当該インプット。周辺の要素・データ・関数は提示されたものを使用する。
- 概念: ph1-week10-promise
- 類題: ph1-week10-promise / 独立問題。同概念の問題は判断や条件を変えた練習であり、完全に等価な類題とは扱わない。
- 依存: なし。この問題の提示コード・条件から開始する。

fetch(url)をawaitなしで呼んだ直後に受け取るものは？

- d: 通信が必ず成功したことを表すtrue
- a: 処理の完了や失敗を表すPromise（正答）
- b: APIから届いたユーザーのname文字列そのもの
- c: 完成済みのHTMLのli要素

達成条件: fetchのPromiseとデータ本体を区別する。条件に合う候補：処理の完了や失敗を表すPromise

ヒント: 「通信を頼む」と「データを使える状態にする」は同時ではありません。

解説: Promiseは非同期処理の結果を後で受け取るためのものです。fetchのPromiseをawaitしてResponseを受け取り、さらにjson()でデータを読みます。

採点: 提示された条件の下で正答となる候補を1つ選択する。正答IDで判定する。

検証: 2026-10-07：作成後に別工程で教材との対応、既習範囲、条件下の単一正答、全誤答理由を意味レビュー。出典見出し・行・SHAと形式を機械検証。選択肢IDの採点を確認。DOM・CSS・非同期・JSXは静的な候補選択であり、このコードの実行を確認したとは扱わない。 詳細はdocs/quiz-reviews/week07-16.md。

- 誤答b: fetchの戻り値はPromiseです。完了後も、まずResponseを受け取ります。
- 誤答c: fetchはDOMのliを自動で作りません。
- 誤答d: fetchを呼んだだけでは、通信やHTTP成功を確認できません。

## question-week10-response-002（版1・published）

- 形式: choice
- 主対象: 言葉の理解
- 学習目標: ResponseとJSONを読み取ったデータを区別する
- 出典: curriculum/PH1/Week10.md:89 / 受け取っても、まだ中身は使えない
- ドリル接続: drill-ph1/week10-1/README.md：ResponseとJSONを読み取ったデータを区別する。制作全体のうち、この判断を小さく取り出す。
- 既習: Week01〜10の当該インプット。周辺の要素・データ・関数は提示されたものを使用する。
- 概念: ph1-week10-response
- 類題: ph1-week10-response / 独立問題。同概念の問題は判断や条件を変えた練習であり、完全に等価な類題とは扱わない。
- 依存: なし。この問題の提示コード・条件から開始する。

await fetch(url)で受け取ったresponseは、この教材では何ですか？

- a: HTTPの状態などと、読み取り前の応答本文を持つResponse（正答）
- b: ユーザーのnameだけを取り出した文字列
- c: HTMLを表示するReactコンポーネント
- d: APIのデータを読み終えた配列と必ず同じもの

達成条件: ResponseとJSONを読み取ったデータを区別する。条件に合う候補：HTTPの状態などと、読み取り前の応答本文を持つResponse

ヒント: 応答の状態と、本文に入っているデータは別です。

解説: Responseでokやstatusを確認し、本文をawait response.json()で読み取ります。応答の状態と、その中のデータを分けて扱います。

採点: 提示された条件の下で正答となる候補を1つ選択する。正答IDで判定する。

検証: 2026-10-07：作成後に別工程で教材との対応、既習範囲、条件下の単一正答、全誤答理由を意味レビュー。出典見出し・行・SHAと形式を機械検証。選択肢IDの採点を確認。DOM・CSS・非同期・JSXは静的な候補選択であり、このコードの実行を確認したとは扱わない。 詳細はdocs/quiz-reviews/week07-16.md。

- 誤答b: nameは、本文を読み取って得るデータ側のプロパティです。
- 誤答c: 通信の応答とReactのUI部品は別です。
- 誤答d: 本文をjson()で読み取る手順がまだ必要です。

## question-week10-json-read-003（版1・published）

- 形式: choice
- 主対象: 言葉の理解
- 学習目標: JSON本文を読み取る操作をコードに対応させる
- 出典: curriculum/PH1/Week10.md:89 / 受け取っても、まだ中身は使えない
- ドリル接続: drill-ph1/week10-1/README.md：JSON本文を読み取る操作をコードに対応させる。制作全体のうち、この判断を小さく取り出す。
- 既習: Week01〜10の当該インプット。周辺の要素・データ・関数は提示されたものを使用する。
- 概念: ph1-week10-json-read
- 類題: ph1-week10-json-read / 独立問題。同概念の問題は判断や条件を変えた練習であり、完全に等価な類題とは扱わない。
- 依存: なし。この問題の提示コード・条件から開始する。

responseは取得済みです。JSONの本文をJavaScriptで使える値として受け取る空欄は？

```html
async function readData(response) {
  const data = ___;
  console.log(data);
}
```

- b: response.name
- c: response.json
- d: response
- a: await response.json()（正答）

達成条件: JSON本文を読み取る操作をコードに対応させる。条件に合う候補：await response.json()

ヒント: メソッドの呼び出しと、完了を待つことの両方を見ましょう。

解説: json()を呼んで応答本文を読み取り、そのPromiseの完了をawaitで待ちます。ここで得たdataの形を確認してからプロパティを使います。

採点: 提示された条件の下で正答となる候補を1つ選択する。正答IDで判定する。

検証: 2026-10-07：作成後に別工程で教材との対応、既習範囲、条件下の単一正答、全誤答理由を意味レビュー。出典見出し・行・SHAと形式を機械検証。選択肢IDの採点を確認。DOM・CSS・非同期・JSXは静的な候補選択であり、このコードの実行を確認したとは扱わない。 詳細はdocs/quiz-reviews/week07-16.md。

- 誤答b: Responseのnameではなく、本文を読み取ったデータのnameを使います。
- 誤答c: これはメソッドそのものです。呼び出して完了を待つ手順がありません。
- 誤答d: 応答オブジェクトをそのまま代入するだけで、JSONの本文を読み取りません。

## question-week10-async-function-004（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 関数内のawaitに必要なasync宣言を選ぶ
- 出典: curriculum/PH1/Week10.md:65 / async と、いちばん多い事故
- ドリル接続: drill-ph1/week10-1/README.md：関数内のawaitに必要なasync宣言を選ぶ。制作全体のうち、この判断を小さく取り出す。
- 既習: Week01〜10の当該インプット。周辺の要素・データ・関数は提示されたものを使用する。
- 概念: ph1-week10-async-function
- 類題: ph1-week10-async-function / 独立問題。同概念の問題は判断や条件を変えた練習であり、完全に等価な類題とは扱わない。
- 依存: なし。この問題の提示コード・条件から開始する。

この関数の中でawaitを使います。関数宣言の先頭へ入れるキーワードは？

```html
___ function loadPosts() {
  const response = await fetch(url);
  const posts = await response.json();
}
```

- c: return
- d: await
- a: async（正答）
- b: const

達成条件: 関数内のawaitに必要なasync宣言を選ぶ。条件に合う候補：async

ヒント: 待つ行を包んでいる関数の宣言を見ましょう。

解説: この関数の中でawaitを使うため、関数をasyncとして宣言します。ここでは関数の外のawaitやモジュールの詳細は扱いません。

採点: 提示された条件の下で正答となる候補を1つ選択する。正答IDで判定する。

検証: 2026-10-07：作成後に別工程で教材との対応、既習範囲、条件下の単一正答、全誤答理由を意味レビュー。出典見出し・行・SHAと形式を機械検証。選択肢IDの採点を確認。DOM・CSS・非同期・JSXは静的な候補選択であり、このコードの実行を確認したとは扱わない。 詳細はdocs/quiz-reviews/week07-16.md。

- 誤答b: この形の関数宣言にconstを足しても、関数をasyncにできません。
- 誤答c: returnは関数の結果を返す操作であり、関数宣言の修飾ではありません。
- 誤答d: awaitは待つ式へ付けるもので、この関数宣言のキーワードではありません。

## question-week10-http-ok-005（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: HTTP状態の確認にresponse.okを選ぶ
- 出典: curriculum/PH1/Week10.md:114 / 通信はわりと失敗する
- ドリル接続: drill-ph1/week10-1/README.md：HTTP状態の確認にresponse.okを選ぶ。制作全体のうち、この判断を小さく取り出す。
- 既習: Week01〜10の当該インプット。周辺の要素・データ・関数は提示されたものを使用する。
- 概念: ph1-week10-http-ok
- 類題: ph1-week10-http-ok / 独立問題。同概念の問題は判断や条件を変えた練習であり、完全に等価な類題とは扱わない。
- 依存: なし。この問題の提示コード・条件から開始する。

HTTPの成功・失敗を確認して、失敗ならcatchへ進めたい。空欄は？

```html
const response = await fetch(url);
if (___) {
  throw new Error("取得に失敗");
}
```

- d: response.status === 200
- a: !response.ok（正答）
- b: response.ok
- c: response

達成条件: HTTP状態の確認にresponse.okを選ぶ。条件に合う候補：!response.ok

ヒント: HTTPの失敗をtrueにする条件を探しましょう。

解説: HTTPが成功していない応答ではresponse.okがfalseです。!response.okで失敗を判定し、throwでcatchへ処理を移せます。

採点: 提示された条件の下で正答となる候補を1つ選択する。正答IDで判定する。

検証: 2026-10-07：作成後に別工程で教材との対応、既習範囲、条件下の単一正答、全誤答理由を意味レビュー。出典見出し・行・SHAと形式を機械検証。選択肢IDの採点を確認。DOM・CSS・非同期・JSXは静的な候補選択であり、このコードの実行を確認したとは扱わない。 詳細はdocs/quiz-reviews/week07-16.md。

- 誤答b: 成功時にエラーを投げてしまいます。
- 誤答c: Responseがあることだけでは、HTTPの成功を判定できません。
- 誤答d: 成功した200でエラーを投げてしまいます。

## question-week10-inspect-shape-006（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: DOM描画前にデータ形を確かめる手段を選ぶ
- 出典: curriculum/PH1/Week10.md:151 / 取ってきたデータを、画面に出す
- ドリル接続: drill-ph1/week10-3/README.md：DOM描画前にデータ形を確かめる手段を選ぶ。制作全体のうち、この判断を小さく取り出す。
- 既習: Week01〜10の当該インプット。周辺の要素・データ・関数は提示されたものを使用する。
- 概念: ph1-week10-inspect-shape
- 類題: ph1-week10-inspect-shape / 独立問題。同概念の問題は判断や条件を変えた練習であり、完全に等価な類題とは扱わない。
- 依存: なし。この問題の提示コード・条件から開始する。

取得したdataを一覧表示したいが、配列かオブジェクトか分かりません。DOMを組む前にする確認は？

- a: console.log(data)で形と使えるプロパティを見る（正答）
- b: 確認せずdata.forEachを使う
- c: 画面の色を変えてみる
- d: URLを毎回別のものへ変える

達成条件: DOM描画前にデータ形を確かめる手段を選ぶ。条件に合う候補：console.log(data)で形と使えるプロパティを見る

ヒント: 一覧を作る処理に、どんな形のデータが必要でしょうか。

解説: まず本文を読み取ったデータの形を確かめます。配列なら各要素をループでき、オブジェクトならプロパティを直接使う、と判断できます。

採点: 提示された条件の下で正答となる候補を1つ選択する。正答IDで判定する。

検証: 2026-10-07：作成後に別工程で教材との対応、既習範囲、条件下の単一正答、全誤答理由を意味レビュー。出典見出し・行・SHAと形式を機械検証。選択肢IDの採点を確認。DOM・CSS・非同期・JSXは静的な候補選択であり、このコードの実行を確認したとは扱わない。 詳細はdocs/quiz-reviews/week07-16.md。

- 誤答b: 配列でない場合には、forEachで処理できない可能性があります。
- 誤答c: データの形やプロパティの名前は確認できません。
- 誤答d: 欲しいデータを取得する条件を変えてしまい、形の確認になりません。

## question-week10-fetch-json-flow-007（版1・published）

- 形式: choice
- 主対象: 知識の組み立て
- 学習目標: fetch・Response・JSON・データ利用を順序立てる
- 出典: curriculum/PH1/Week10.md:188 / 全部つなげた完成サンプル
- ドリル接続: drill-ph1/week10-1/README.md：fetch・Response・JSON・データ利用を順序立てる。制作全体のうち、この判断を小さく取り出す。
- 既習: Week01〜10の当該インプット。周辺の要素・データ・関数は提示されたものを使用する。
- 概念: ph1-week10-fetch-json-flow
- 類題: ph1-week10-fetch-json-flow / 独立問題。同概念の問題は判断や条件を変えた練習であり、完全に等価な類題とは扱わない。
- 依存: なし。この問題の提示コード・条件から開始する。

urlはJSONを返すAPIです。取得して本文を読み、その後に使う順になる空欄は？

```html
async function load() {
  ___
  console.log(data);
}
```

- b: const data = await response.json();
  const response = await fetch(url);
- c: const response = fetch(url);
  const data = response;
- d: const response = await fetch(url);
  const data = response.json();
- a: const response = await fetch(url);
  const data = await response.json();（正答）

達成条件: fetch・Response・JSON・データ利用を順序立てる。条件に合う候補：const response = await fetch(url);
  const data = await response.json();

ヒント: 次の行で必要な値が、前の行で準備できているか確かめましょう。

解説: fetchの完了を待ってResponseを受け取り、その本文の読み取りも待ってからdataを使います。一つずつの操作を、使う順序につなぎます。

採点: 提示された条件の下で正答となる候補を1つ選択する。正答IDで判定する。

検証: 2026-10-07：作成後に別工程で教材との対応、既習範囲、条件下の単一正答、全誤答理由を意味レビュー。出典見出し・行・SHAと形式を機械検証。選択肢IDの採点を確認。DOM・CSS・非同期・JSXは静的な候補選択であり、このコードの実行を確認したとは扱わない。 詳細はdocs/quiz-reviews/week07-16.md。

- 誤答b: responseを宣言する前に使っており、処理の順序が逆です。
- 誤答c: Promiseをdataへ入れただけで、応答やJSONを読み取れていません。
- 誤答d: json()の完了を待たず、dataはPromiseのままです。

## question-week10-data-property-008（版1・published）

- 形式: choice
- 主対象: 知識の組み立て
- 学習目標: 取得データのプロパティとDOMの表示先をつなぐ
- 出典: curriculum/PH1/Week10.md:151 / 取ってきたデータを、画面に出す
- ドリル接続: drill-ph1/week10-1/README.md：取得データのプロパティとDOMの表示先をつなぐ。制作全体のうち、この判断を小さく取り出す。
- 既習: Week01〜10の当該インプット。周辺の要素・データ・関数は提示されたものを使用する。
- 概念: ph1-week10-data-property
- 類題: ph1-week10-data-property / 独立問題。同概念の問題は判断や条件を変えた練習であり、完全に等価な類題とは扱わない。
- 依存: なし。この問題の提示コード・条件から開始する。

JSONを読み取ったdataは{name:"田中", email:"sample@example.invalid"}です。名前を表示する空欄は？

```html
const data = await response.json();
nameEl.textContent = ___;
```

- c: data.email
- d: nameEl
- a: data.name（正答）
- b: response.name

達成条件: 取得データのプロパティとDOMの表示先をつなぐ。条件に合う候補：data.name

ヒント: 取り出す元と、表示を受け取る先を分けましょう。

解説: 本文を読み取ったオブジェクトからnameを取り出し、表示先のtextContentへ渡します。通信の応答・データ・表示先の3つを区別します。

採点: 提示された条件の下で正答となる候補を1つ選択する。正答IDで判定する。

検証: 2026-10-07：作成後に別工程で教材との対応、既習範囲、条件下の単一正答、全誤答理由を意味レビュー。出典見出し・行・SHAと形式を機械検証。選択肢IDの採点を確認。DOM・CSS・非同期・JSXは静的な候補選択であり、このコードの実行を確認したとは扱わない。 詳細はdocs/quiz-reviews/week07-16.md。

- 誤答b: nameはJSONを読んだdataにあります。Response側のプロパティではありません。
- 誤答c: メールを表示しており、指定した名前ではありません。
- 誤答d: 表示先の要素そのものであり、取り出す名前ではありません。

## question-week10-list-flow-009（版1・published）

- 形式: choice
- 主対象: 知識の組み立て
- 学習目標: 取得済み配列・件数の指定・一覧描画を組み合わせる
- 出典: curriculum/PH1/Week10.md:151 / 取ってきたデータを、画面に出す
- ドリル接続: drill-ph1/week10-1/README.md：取得済み配列・件数の指定・一覧描画を組み合わせる。制作全体のうち、この判断を小さく取り出す。
- 既習: Week01〜10の当該インプット。周辺の要素・データ・関数は提示されたものを使用する。 slice(0,5)の意味は問題文に固定の補足として提示する。
- 概念: ph1-week10-list-flow
- 類題: ph1-week10-list-flow / 独立問題。同概念の問題は判断や条件を変えた練習であり、完全に等価な類題とは扱わない。
- 依存: なし。この問題の提示コード・条件から開始する。

postsは取得済みの投稿配列です。slice(0, 5)は先頭から5件を取り出します。その5件のtitleをliとして表示する流れは？

- d: fetchしたResponseをそのままulへ追加する
- a: posts.slice(0,5) → forEach → liを作る → titleを入れる → 親ulへ追加（正答）
- b: posts.slice(0,5) → titleを変える → fetchを再び呼ぶ
- c: ulを5個作るだけ

達成条件: 取得済み配列・件数の指定・一覧描画を組み合わせる。条件に合う候補：posts.slice(0,5) → forEach → liを作る → titleを入れる → 親ulへ追加

ヒント: 通信後は、Week08の一覧表示と同じ判断が使えます。

解説: 取得は先に済ませ、必要件数のデータへ絞ってから、1件ずつDOMへ変換します。配列処理とDOM操作をつなぐ流れです。

採点: 提示された条件の下で正答となる候補を1つ選択する。正答IDで判定する。

検証: 2026-10-07：作成後に別工程で教材との対応、既習範囲、条件下の単一正答、全誤答理由を意味レビュー。出典見出し・行・SHAと形式を機械検証。選択肢IDの採点を確認。DOM・CSS・非同期・JSXは静的な候補選択であり、このコードの実行を確認したとは扱わない。 詳細はdocs/quiz-reviews/week07-16.md。

- 誤答b: 取得した各投稿をDOMへ並べる処理になっていません。
- 誤答c: 投稿タイトルを入れるliを作っていません。
- 誤答d: DOMへ追加する要素と、通信の応答は別のものです。

## question-week10-missing-await-fetch-010（版1・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: jsonメソッドのエラーからfetchのawait不足を見つける
- 出典: curriculum/PH1/Week10.md:65 / async と、いちばん多い事故
- ドリル接続: drill-ph1/week10-2/README.md：jsonメソッドのエラーからfetchのawait不足を見つける。制作全体のうち、この判断を小さく取り出す。
- 既習: Week01〜10の当該インプット。周辺の要素・データ・関数は提示されたものを使用する。
- 概念: ph1-week10-missing-await-fetch
- 類題: ph1-week10-missing-await-fetch / 独立問題。同概念の問題は判断や条件を変えた練習であり、完全に等価な類題とは扱わない。
- 依存: なし。この問題の提示コード・条件から開始する。

response.json is not a functionが出ました。fetchの結果の扱いを直す候補は？

```html
async function load() {
  const response = fetch(url);
  const data = await response.json();
}
```

- a: fetch(url)の前にawaitを付ける（正答）
- b: dataの変数名をuserにする
- c: jsonをJSONという名前に変える
- d: asyncを関数から外す

達成条件: jsonメソッドのエラーからfetchのawait不足を見つける。条件に合う候補：fetch(url)の前にawaitを付ける

ヒント: responseの時点で、PromiseかResponseかを区別しましょう。

解説: awaitなしのfetchから受け取ったresponseはPromiseです。まずawait fetch(url)でResponseを受け取り、それからjson()を呼びます。

採点: 提示された条件の下で正答となる候補を1つ選択する。正答IDで判定する。

検証: 2026-10-07：作成後に別工程で教材との対応、既習範囲、条件下の単一正答、全誤答理由を意味レビュー。出典見出し・行・SHAと形式を機械検証。選択肢IDの採点を確認。DOM・CSS・非同期・JSXは静的な候補選択であり、このコードの実行を確認したとは扱わない。 詳細はdocs/quiz-reviews/week07-16.md。

- 誤答b: Responseを待たずにPromiseのjsonを呼ぶ問題は変わりません。
- 誤答c: メソッド名はjsonです。名前を変えてもPromiseをResponseにはできません。
- 誤答d: awaitを使う関数であり、asyncを外すと別の構文問題になります。

## question-week10-missing-await-json-011（版1・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: 本文の読み取り完了前に使う不具合を修正する
- 出典: curriculum/PH1/Week10.md:89 / 受け取っても、まだ中身は使えない
- ドリル接続: drill-ph1/week10-1/README.md：本文の読み取り完了前に使う不具合を修正する。制作全体のうち、この判断を小さく取り出す。
- 既習: Week01〜10の当該インプット。周辺の要素・データ・関数は提示されたものを使用する。
- 概念: ph1-week10-missing-await-json
- 類題: ph1-week10-missing-await-json / 独立問題。同概念の問題は判断や条件を変えた練習であり、完全に等価な類題とは扱わない。
- 依存: なし。この問題の提示コード・条件から開始する。

APIのJSON本文にはnameがあります。それでもdata.nameがundefinedです。原因を直す候補は？

```html
async function load() {
  const response = await fetch(url);
  const data = response.json();
  console.log(data.name);
}
```

- b: data.nameをresponse.nameに変える
- c: console.logを2回書く
- d: nameという文字を全部大文字にする
- a: response.json()の前にもawaitを付ける（正答）

達成条件: 本文の読み取り完了前に使う不具合を修正する。条件に合う候補：response.json()の前にもawaitを付ける

ヒント: fetchの後にも、時間のかかる操作があります。

解説: fetchを待つことと、本文を読み終わるまで待つことは別です。await response.json()を使ってからdata.nameを読みます。

採点: 提示された条件の下で正答となる候補を1つ選択する。正答IDで判定する。

検証: 2026-10-07：作成後に別工程で教材との対応、既習範囲、条件下の単一正答、全誤答理由を意味レビュー。出典見出し・行・SHAと形式を機械検証。選択肢IDの採点を確認。DOM・CSS・非同期・JSXは静的な候補選択であり、このコードの実行を確認したとは扱わない。 詳細はdocs/quiz-reviews/week07-16.md。

- 誤答b: JSON本文のnameはResponseに直接ある値ではありません。
- 誤答c: Promiseを読んでいる原因は直りません。
- 誤答d: JSONのnameとは別のキーになるだけです。

## question-week10-http-404-012（版1・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: HTTP失敗をresponse.okで確かめる必要性を説明する
- 出典: curriculum/PH1/Week10.md:114 / 通信はわりと失敗する
- ドリル接続: drill-ph1/week10-1/README.md：HTTP失敗をresponse.okで確かめる必要性を説明する。制作全体のうち、この判断を小さく取り出す。
- 既習: Week01〜10の当該インプット。周辺の要素・データ・関数は提示されたものを使用する。
- 概念: ph1-week10-http-404
- 類題: ph1-week10-http-404 / 独立問題。同概念の問題は判断や条件を変えた練習であり、完全に等価な類題とは扱わない。
- 依存: なし。この問題の提示コード・条件から開始する。

通常のfetchは、HTTP 404の応答を受け取ると、それだけで必ずPromiseを拒否してcatchへ入る。

- true: 正しい
- false: 誤り（正答）

達成条件: HTTP失敗をresponse.okで確かめる必要性を説明する。条件に合う候補：誤り

ヒント: HTTPの応答が届いた失敗と、通信が成立しない失敗を分けましょう。

解説: fetchはHTTP 404の応答でもResponseを返すため、response.okなどを自分で確認します。ネットワークの失敗で拒否される場合と区別し、HTTP失敗ではthrowしてcatchへ移せます。

採点: 提示された条件の下で正答となる候補を1つ選択する。正答IDで判定する。

検証: 2026-10-07：作成後に別工程で教材との対応、既習範囲、条件下の単一正答、全誤答理由を意味レビュー。出典見出し・行・SHAと形式を機械検証。選択肢IDの採点を確認。DOM・CSS・非同期・JSXは静的な候補選択であり、このコードの実行を確認したとは扱わない。 詳細はdocs/quiz-reviews/week07-16.md。

- 誤答true: fetchはHTTP 404の応答でもResponseを返すため、response.okなどを自分で確認します。ネットワークの失敗で拒否される場合と区別し、HTTP失敗ではthrowしてcatchへ移せます。
