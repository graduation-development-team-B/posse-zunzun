# Week42｜入力検証・エラー表示

15問。言葉の理解: 1 / 知識の選択: 5 / 知識の組み立て: 6 / 結果の確認・修正: 3

作者向け資料。独立問題。公開されるのは制作状態publishedの問題。

## question-ph3-week42-assembly-request-rules（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: FormRequestでnameを必須・文字列・100文字以内にしてください。
- 出典: curriculum/PH3.md:592 / Week 42
- ドリル接続: PH3 Week42のPOSSE課題へ接続。空欄・100文字・101文字の結果を確認しましょう。
- 既習: Week41の管理用ルート。Week42のFormRequestとエラー確認。DOMイベントはPH1の既習。
- 概念: ph3-week42-request-rules
- 類題: ph3-week42-assembly-request-rules / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

FormRequestでnameを必須・文字列・100文字以内にしてください。

```php
<?php
class StoreQuizRequest extends FormRequest {
  public function rules(): array {
    return ['name' => __BLANK__];
  }
}
```

- correct: ['required', 'string', 'max:100']（正答）
- wrong: ['nullable', 'string', 'max:100']

達成条件: FormRequestでnameを必須・文字列・100文字以内にしてください。

ヒント: 必須であることを明示するルールが必要です。

解説: requiredを含めて入力を検証します。PCでは空欄・100文字・101文字の結果を確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: nullableでは必須という指定になりません。

## question-ph3-week42-assembly-validated-create（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: StoreQuizRequestはnameだけを検証します。Quizのnameはfillableです。検証済みの値だけで新規クイズを作ってください。
- 出典: curriculum/PH3.md:592 / Week 42
- ドリル接続: PH3 Week42のPOSSE課題へ接続。余分な入力項目が保存へ渡らないか確認しましょう。
- 既習: Week41の管理用ルート。Week42のFormRequestとエラー確認。DOMイベントはPH1の既習。
- 概念: ph3-week42-validated-create
- 類題: ph3-week42-assembly-validated-create / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

StoreQuizRequestはnameだけを検証します。Quizのnameはfillableです。検証済みの値だけで新規クイズを作ってください。

```php
<?php
function store(StoreQuizRequest $request) {
  return Quiz::create(__BLANK__);
}
```

- correct: $request->validated()（正答）
- wrong: $request->all()

達成条件: StoreQuizRequestはnameだけを検証します。Quizのnameはfillableです。検証済みの値だけで新規クイズを作ってください。

ヒント: FormRequestの検証に通ったデータを取得します。

解説: validated()から保存値を受け取ります。PCでは余分な入力項目が保存へ渡らないか確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: allは検証対象外の入力も含むため、検証済みだけという指定ではありません。

## question-ph3-week42-assembly-error-message（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: nameにバリデーションエラーがある時、そのメッセージをBladeで表示してください。
- 出典: curriculum/PH3.md:592 / Week 42
- ドリル接続: PH3 Week42のPOSSE課題へ接続。空欄送信後に理由が見えるか確認しましょう。
- 既習: Week41の管理用ルート。Week42のFormRequestとエラー確認。DOMイベントはPH1の既習。
- 概念: ph3-week42-error-message
- 類題: ph3-week42-assembly-error-message / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

nameにバリデーションエラーがある時、そのメッセージをBladeで表示してください。

```blade
@error('name')
  <p>{{ __BLANK__ }}</p>
@enderror
```

- correct: $message（正答）
- wrong: $name

達成条件: nameにバリデーションエラーがある時、そのメッセージをBladeで表示してください。

ヒント: @errorのブロックが渡すメッセージ変数を使います。

解説: @errorで対象項目のエラーを表示します。PCでは空欄送信後に理由が見えるか確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。静的意味レビューのみ。Blade/Laravelは実行しない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: エラー本文を表す提供変数は$messageです。

## question-ph3-week42-assembly-redirect-flash（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: quizzes.storeの保存は成功済みです。登録済みのadmin.quizzes.indexへ戻り、statusのフラッシュメッセージを付けてください。
- 出典: curriculum/PH3.md:592 / Week 42
- ドリル接続: PH3 Week42のPOSSE課題へ接続。一覧でsession('status')が表示されるか確認しましょう。
- 既習: Week41の管理用ルート。Week42のFormRequestとエラー確認。DOMイベントはPH1の既習。
- 概念: ph3-week42-redirect-flash
- 類題: ph3-week42-assembly-redirect-flash / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

quizzes.storeの保存は成功済みです。登録済みのadmin.quizzes.indexへ戻り、statusのフラッシュメッセージを付けてください。

```php
<?php
function afterStore() {
  return redirect()->route('admin.quizzes.index')->__BLANK__;
}
```

- correct: with('status', '新しいクイズを作成しました！')（正答）
- wrong: with('error', '新しいクイズを作成しました！')

達成条件: quizzes.storeの保存は成功済みです。登録済みのadmin.quizzes.indexへ戻り、statusのフラッシュメッセージを付けてください。

ヒント: 受け取り側とフラッシュメッセージのキーを合わせます。

解説: withで次のリクエストへ成功情報を渡します。PCでは一覧でsession('status')が表示されるか確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: 一覧側が読むstatusとキーが合わないため、成功メッセージを受け取れません。

## question-ph3-week42-assembly-all-up-buttons（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: upToSortNumberは定義済みです。全ての.js-up-buttonにclickイベントを登録してください。
- 出典: curriculum/PH3.md:592 / Week 42
- ドリル接続: week42-1の関連ドリルへ接続。先頭以外の行のボタンも押して確認しましょう。
- 既習: Week41の管理用ルート。Week42のFormRequestとエラー確認。DOMイベントはPH1の既習。
- 概念: ph3-week42-all-up-buttons
- 類題: ph3-week42-assembly-all-up-buttons / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

upToSortNumberは定義済みです。全ての.js-up-buttonにclickイベントを登録してください。

```js
document.querySelectorAll('.js-up-button').forEach((button) => {
  __BLANK__;
});
```

- correct: button.addEventListener('click', upToSortNumber)（正答）
- wrong: button.addEventListener('input', upToSortNumber)

達成条件: upToSortNumberは定義済みです。全ての.js-up-buttonにclickイベントを登録してください。

ヒント: 全件をループし、それぞれへclickを登録します。

解説: querySelectorAllの結果をforEachし、各ボタンへ登録します。PCでは先頭以外の行のボタンも押して確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。TypeScript parserでJSの正答構文確認。 固定入力で正誤比較。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: inputではボタンのクリックを処理する指定になりません。

## question-ph3-week42-choice-form-request-role（版1・published）

- 形式: choice
- 主対象: 言葉の理解
- 学習目標: 提示条件に対して「リクエストの入力値が満たすべき検証ルール」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:592 / Week 42
- ドリル接続: PH3 Week42のPOSSE課題。保存処理の前に対象FormRequestが使われているか確認しましょう。
- 既習: Week41の管理用ルート。Week42のFormRequestとエラー確認。DOMイベントはPH1の既習。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week42-form-request-role
- 類題: ph3-week42-choice-form-request-role / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

FormRequestのrulesで指定するものはどれですか？

- wrong2: Composer依存のバージョン
- wrong3: すべてのDBのバックアップ先
- correct: リクエストの入力値が満たすべき検証ルール（正答）
- wrong1: 一覧画面のCSSの色

達成条件: 条件に適合する候補を1つ選ぶ：リクエストの入力値が満たすべき検証ルール

ヒント: 値の必須・型・長さを定義します。

解説: rulesで入力の妥当性を検証します。 PCでは保存処理の前に対象FormRequestが使われているか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 検証ルールの役割ではありません。
- 誤答wrong2: 依存の管理はcomposer.jsonなどで行います。
- 誤答wrong3: 入力検証の定義とは別です。

## question-ph3-week42-choice-title-rules（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「["required", "string", "max:100"]」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:592 / Week 42
- ドリル接続: PH3 Week42のPOSSE課題。未入力・100文字・101文字を試しましょう。
- 既習: Week41の管理用ルート。Week42のFormRequestとエラー確認。DOMイベントはPH1の既習。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week42-title-rules
- 類題: ph3-week42-choice-title-rules / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

nameを必須・文字列・100文字以内にするルールはどれですか？

- wrong3: ["required", "string", "min:100"]
- correct: ["required", "string", "max:100"]（正答）
- wrong1: ["nullable", "string", "max:100"]
- wrong2: ["required", "integer", "max:100"]

達成条件: 条件に適合する候補を1つ選ぶ：["required", "string", "max:100"]

ヒント: 必須・型・上限の3点をそろえます。

解説: required・string・maxで各条件を指定します。 PCでは未入力・100文字・101文字を試しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 未入力を許可するため必須の要件を満たしません。
- 誤答wrong2: タイトルは整数ではなく文字列です。
- 誤答wrong3: 最小100文字となり上限の指定ではありません。

## question-ph3-week42-choice-validation-boundary（版1・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: 提示条件に対して「100文字のタイトル」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:592 / Week 42
- ドリル接続: PH3 Week42のPOSSE課題。境界の100文字と101文字で結果を比較しましょう。
- 既習: Week41の管理用ルート。Week42のFormRequestとエラー確認。DOMイベントはPH1の既習。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week42-validation-boundary
- 類題: ph3-week42-choice-validation-boundary / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

nameにrequired|string|max:100を指定しています。すべて通常の文字列で前後の空白はありません。長さの条件を通るものはどれですか？

- correct: 100文字のタイトル（正答）
- wrong1: 101文字のタイトル
- wrong2: 200文字のタイトル
- wrong3: 空文字

達成条件: 条件に適合する候補を1つ選ぶ：100文字のタイトル

ヒント: 上限そのものは許可されます。

解説: 100文字以下を許可し、空文字はrequiredで拒否します。 PCでは境界の100文字と101文字で結果を比較しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: max:100の上限を超えています。
- 誤答wrong2: 上限100文字を超えています。
- 誤答wrong3: requiredに適合しません。

## question-ph3-week42-choice-validated-input（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「$request->validated()」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:592 / Week 42
- ドリル接続: PH3 Week42のPOSSE課題。余分な入力が保存対象へ入らないか確認しましょう。
- 既習: Week41の管理用ルート。Week42のFormRequestとエラー確認。DOMイベントはPH1の既習。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week42-validated-input
- 類題: ph3-week42-choice-validated-input / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

FormRequestで検証したnameだけを保存する際、入力全体より優先して使う取得方法はどれですか？

- wrong1: $request->all()
- wrong2: $_GETだけ
- wrong3: $request->header("User-Agent")
- correct: $request->validated()（正答）

達成条件: 条件に適合する候補を1つ選ぶ：$request->validated()

ヒント: 検証を通ったキーの集合を使います。

解説: validatedで検証済みデータを取得します。 PCでは余分な入力が保存対象へ入らないか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 未検証の余分な入力も含まれ得ます。
- 誤答wrong2: FormRequestの検証済み値を取り出す方法ではありません。
- 誤答wrong3: タイトルの検証済み配列ではありません。

## question-ph3-week42-choice-field-error（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「@error("name") {{ $message }} @enderror」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:592 / Week 42
- ドリル接続: PH3 Week42のPOSSE課題。未入力の送信でname欄の近くにエラーが出るか確認しましょう。
- 既習: Week41の管理用ルート。Week42のFormRequestとエラー確認。DOMイベントはPH1の既習。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week42-field-error
- 類題: ph3-week42-choice-field-error / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

nameの検証エラーだけをBladeに表示する構文はどれですか？

- wrong2: @csrfだけ
- wrong3: {{ $request->all() }}だけ
- correct: @error("name") {{ $message }} @enderror（正答）
- wrong1: @error("email") {{ $message }} @enderror

達成条件: 条件に適合する候補を1つ選ぶ：@error("name") {{ $message }} @enderror

ヒント: フォームのname属性とエラーのキーをそろえます。

解説: errorで対象フィールドのメッセージを表示します。 PCでは未入力の送信でname欄の近くにエラーが出るか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 対象のフィールド名がnameではありません。
- 誤答wrong2: CSRFトークンは検証メッセージではありません。
- 誤答wrong3: 入力の表示はnameの検証エラー表示になりません。

## question-ph3-week42-choice-success-after-save（版1・published）

- 形式: choice
- 主対象: 知識の組み立て
- 学習目標: 提示条件に対して「検証→保存成功→フラッシュ通知付きリダイレクト」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:592 / Week 42
- ドリル接続: PH3 Week42のPOSSE課題。不正な入力では成功通知が出ないか確認しましょう。
- 既習: Week41の管理用ルート。Week42のFormRequestとエラー確認。DOMイベントはPH1の既習。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week42-success-after-save
- 類題: ph3-week42-choice-success-after-save / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

クイズ作成の成功通知を一覧へ表示します。正しい処理順はどれですか？

- wrong3: 入力を無検証で保存→成功通知
- correct: 検証→保存成功→フラッシュ通知付きリダイレクト（正答）
- wrong1: 成功通知→検証失敗→保存を省略
- wrong2: リダイレクト→その後に保存

達成条件: 条件に適合する候補を1つ選ぶ：検証→保存成功→フラッシュ通知付きリダイレクト

ヒント: 通知は成功した処理に対応させます。

解説: 検証と保存を終えてから成功を伝えます。 PCでは不正な入力では成功通知が出ないか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 失敗したのに成功したと通知してしまいます。
- 誤答wrong2: 返却後の処理を前提にせず、保存後に移動します。
- 誤答wrong3: 必須・文字数などの要件を保証できません。

## question-ph3-week42-choice-deleted-label（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「$quiz->trashed()」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:592 / Week 42
- ドリル接続: PH3 Week42のPOSSE課題。削除済みラベルとDBのdeleted_atを照合しましょう。
- 既習: Week41の管理用ルート。Week42のFormRequestとエラー確認。DOMイベントはPH1の既習。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week42-deleted-label
- 類題: ph3-week42-choice-deleted-label / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

削除済みも含む管理用一覧で、SoftDeletesモデル$quizの削除状態を判別するものはどれですか？

- correct: $quiz->trashed()（正答）
- wrong1: $quiz->name === "削除済み"
- wrong2: $quiz->id === 0
- wrong3: $quiz->questions->count() === 0

達成条件: 条件に適合する候補を1つ選ぶ：$quiz->trashed()

ヒント: 削除日時に基づくモデルの判定を使います。

解説: trashedで論理削除済みかを確認できます。 PCでは削除済みラベルとDBのdeleted_atを照合しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 表示名の文字列は削除状態を表す信頼できる条件ではありません。
- 誤答wrong2: 論理削除で主キーを0へ変えるわけではありません。
- 誤答wrong3: 設問が0件でも削除済みとは限りません。

## question-ph3-week42-choice-deleted-edit-block（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「編集・更新処理でも削除済み状態を確認し拒否する」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:592 / Week 42
- ドリル接続: PH3 Week42のPOSSE課題。削除済みIDを直接送って更新されないか確認しましょう。
- 既習: Week41の管理用ルート。Week42のFormRequestとエラー確認。DOMイベントはPH1の既習。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week42-deleted-edit-block
- 類題: ph3-week42-choice-deleted-edit-block / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

管理用一覧で論理削除済みクイズの編集リンクを消しました。編集を確実に禁止するにはどれですか？

- wrong1: CSSだけでリンクの色を灰色にする
- wrong2: URLを利用者へ見せないだけにする
- wrong3: 削除済みのnameを空文字に変える
- correct: 編集・更新処理でも削除済み状態を確認し拒否する（正答）

達成条件: 条件に適合する候補を1つ選ぶ：編集・更新処理でも削除済み状態を確認し拒否する

ヒント: 画面とサーバーの両方で同じ条件を守ります。

解説: 削除済みデータを編集不可にする条件をサーバーにも置きます。 PCでは削除済みIDを直接送って更新されないか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: URLへ直接アクセスした場合を拒否できません。
- 誤答wrong2: 表示を隠すだけでは保存処理を守れません。
- 誤答wrong3: 削除状態による操作制限の代わりにはなりません。

## question-ph3-week42-choice-query-selector-all（版1・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: 提示条件に対して「querySelectorAll(".up")の各要素にforEachでイベントを付ける」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:592 / Week 42
- ドリル接続: week42-1の関連ドリル。2行目以降のボタンでも動くか確認しましょう。
- 既習: Week41の管理用ルート。Week42のFormRequestとエラー確認。DOMイベントはPH1の既習。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week42-query-selector-all
- 類題: ph3-week42-choice-query-selector-all / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

各行の.upボタンすべてにクリック処理を付けます。取得後の正しい対応はどれですか？

- wrong2: NodeListへ直接addEventListenerを呼ぶ
- wrong3: 1番目のボタンだけへ毎回追加する
- correct: querySelectorAll(".up")の各要素にforEachでイベントを付ける（正答）
- wrong1: querySelector(".up")だけで全要素に付くと考える

達成条件: 条件に適合する候補を1つ選ぶ：querySelectorAll(".up")の各要素にforEachでイベントを付ける

ヒント: 取得する集合と個々の要素を区別します。

解説: 集合を走査して各ボタンにリスナーを登録します。 PCでは2行目以降のボタンでも動くか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: querySelectorが返すのは最初の1要素です。
- 誤答wrong2: NodeList全体はボタン1要素ではありません。
- 誤答wrong3: 2行目以降へイベントが付きません。

## question-ph3-week42-choice-error-investigation（版1・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: 提示条件に対して「エラー文と該当行を読み、入力と期待結果を小さく再現する」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:592 / Week 42
- ドリル接続: PH3 Week42のPOSSE課題。再現手順と最初のエラーメッセージを記録しましょう。
- 既習: Week41の管理用ルート。Week42のFormRequestとエラー確認。DOMイベントはPH1の既習。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week42-error-investigation
- 類題: ph3-week42-choice-error-investigation / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

新規作成時に例外が出ました。原因を絞る最初の調べ方として適切なのはどれですか？

- wrong3: DB全体を削除して原因が消えたと判断する
- correct: エラー文と該当行を読み、入力と期待結果を小さく再現する（正答）
- wrong1: エラー文を見ずに全ファイル名を変更する
- wrong2: 成功メッセージだけを固定表示する

達成条件: 条件に適合する候補を1つ選ぶ：エラー文と該当行を読み、入力と期待結果を小さく再現する

ヒント: 起きた事実と期待との差を具体化します。

解説: エラー箇所と入力から仮説を立て、一つずつ確認します。 PCでは再現手順と最初のエラーメッセージを記録しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 原因を絞れず新しい不具合も生みます。
- 誤答wrong2: 失敗した保存処理は直りません。
- 誤答wrong3: 再現条件と原因を確認できずデータも失います。
