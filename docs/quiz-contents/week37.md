# Week37｜個別表示とモデルの利用

15問。言葉の理解: 1 / 知識の選択: 6 / 知識の組み立て: 6 / 結果の確認・修正: 2

作者向け資料。独立問題。公開されるのは制作状態publishedの問題。

## question-ph3-week37-assembly-detail-parameter（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: QuizControllerのshowはクイズIDを受け取ります。1や2を固定せず、GET /quizzes/{id}を登録してください。Controllerはimport済みです。
- 出典: curriculum/PH3.md:358 / Week 37
- ドリル接続: PH3 Week37のPOSSE課題へ接続。/quizzes/1と/quizzes/2の両方を確認しましょう。
- 既習: Week36までのリレーション・先読み。提供済みスコープとアクセサの役割は問題文で指定。
- 概念: ph3-week37-detail-parameter
- 類題: ph3-week37-assembly-detail-parameter / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

QuizControllerのshowはクイズIDを受け取ります。1や2を固定せず、GET /quizzes/{id}を登録してください。Controllerはimport済みです。

```php
<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QuizController;
__BLANK__;
```

- correct: Route::get('/quizzes/{id}', [QuizController::class, 'show'])（正答）
- wrong: Route::get('/quizzes/1', [QuizController::class, 'show'])

達成条件: QuizControllerのshowはクイズIDを受け取ります。1や2を固定せず、GET /quizzes/{id}を登録してください。Controllerはimport済みです。

ヒント: URLの変わる部分を波括弧でパラメータにします。

解説: {id}で各クイズのIDを受け取ります。PCでは/quizzes/1と/quizzes/2の両方を確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: 1を固定すると他のクイズIDを同じルートで扱えません。

## question-ph3-week37-assembly-find-detail（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: Quizはimport済みです。$idのクイズを1件取得し、存在しない場合は404へ進むメソッドを使ってください。
- 出典: curriculum/PH3.md:358 / Week 37
- ドリル接続: PH3 Week37のPOSSE課題へ接続。存在するIDと存在しないIDを確認しましょう。
- 既習: Week36までのリレーション・先読み。提供済みスコープとアクセサの役割は問題文で指定。
- 概念: ph3-week37-find-detail
- 類題: ph3-week37-assembly-find-detail / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

Quizはimport済みです。$idのクイズを1件取得し、存在しない場合は404へ進むメソッドを使ってください。

```php
<?php
 $quiz = __BLANK__;
```

- correct: Quiz::findOrFail($id)（正答）
- wrong: Quiz::find($id)

達成条件: Quizはimport済みです。$idのクイズを1件取得し、存在しない場合は404へ進むメソッドを使ってください。

ヒント: 見つからなかった時の動きも含むメソッドです。

解説: findOrFailは見つからないモデルを例外として扱い、通常404応答へつなぎます。PCでは存在するIDと存在しないIDを確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: findは存在しない場合nullを返すため、この指定だけで404にはなりません。

## question-ph3-week37-assembly-eager-nested（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: Quizのquestions、そのQuestionのchoicesリレーションは定義済みです。設問と選択肢を先読みして$idを取得してください。
- 出典: curriculum/PH3.md:358 / Week 37
- ドリル接続: PH3 Week37のPOSSE課題へ接続。設問数を増やしてクエリ数を確認しましょう。
- 既習: Week36までのリレーション・先読み。提供済みスコープとアクセサの役割は問題文で指定。
- 概念: ph3-week37-eager-nested
- 類題: ph3-week37-assembly-eager-nested / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

Quizのquestions、そのQuestionのchoicesリレーションは定義済みです。設問と選択肢を先読みして$idを取得してください。

```php
<?php
 $quiz = __BLANK__;
```

- correct: Quiz::with('questions.choices')->findOrFail($id)（正答）
- wrong: Quiz::with('questions')->findOrFail($id)

達成条件: Quizのquestions、そのQuestionのchoicesリレーションは定義済みです。設問と選択肢を先読みして$idを取得してください。

ヒント: 入れ子のリレーションはドットで指定できます。

解説: questions.choicesで設問の選択肢まで先読みします。PCでは設問数を増やしてクエリ数を確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: questionsだけでは、その下のchoicesまで先読みする指定になりません。

## question-ph3-week37-assembly-provided-scope（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: UserにはscopeFirstGeneration($query)が定義済みで、generation=1を絞り込みます。このスコープを使って取得してください。Userはimport済みです。
- 出典: curriculum/PH3.md:358 / Week 37
- ドリル接続: week37-1の関連ドリルへ接続。generationが1以外の利用者が除かれるか確認しましょう。
- 既習: Week36までのリレーション・先読み。提供済みスコープとアクセサの役割は問題文で指定。
- 概念: ph3-week37-provided-scope
- 類題: ph3-week37-assembly-provided-scope / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

UserにはscopeFirstGeneration($query)が定義済みで、generation=1を絞り込みます。このスコープを使って取得してください。Userはimport済みです。

```php
<?php
 $users = __BLANK__;
```

- correct: User::firstGeneration()->get()（正答）
- wrong: User::scopeFirstGeneration()->get()

達成条件: UserにはscopeFirstGeneration($query)が定義済みで、generation=1を絞り込みます。このスコープを使って取得してください。Userはimport済みです。

ヒント: 定義のscope接頭辞を外して呼び出します。

解説: firstGeneration()で提供済みスコープを使います。PCではgenerationが1以外の利用者が除かれるか確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: 呼び出し側にscopeという接頭辞は付けません。

## question-ph3-week37-assembly-provided-accessor（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: UserにはgetFullNameAttribute()が定義済みです。Bladeでそのアクセサの値を表示してください。
- 出典: curriculum/PH3.md:358 / Week 37
- ドリル接続: week37-2の関連ドリルへ接続。姓名が結合された表示を確認しましょう。
- 既習: Week36までのリレーション・先読み。提供済みスコープとアクセサの役割は問題文で指定。
- 概念: ph3-week37-provided-accessor
- 類題: ph3-week37-assembly-provided-accessor / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

UserにはgetFullNameAttribute()が定義済みです。Bladeでそのアクセサの値を表示してください。

```blade
<p>{{ __BLANK__ }}</p>
```

- correct: $user->full_name（正答）
- wrong: $user->getFullNameAttribute

達成条件: UserにはgetFullNameAttribute()が定義済みです。Bladeでそのアクセサの値を表示してください。

ヒント: アクセサの名前に対応するsnake_caseの属性を読みます。

解説: 提供済みアクセサはfull_nameという属性として参照できます。PCでは姓名が結合された表示を確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。静的意味レビューのみ。Blade/Laravelは実行しない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: メソッド名をそのままプロパティ名にはしません。

## question-ph3-week37-choice-crud-read（版1・published）

- 形式: choice
- 主対象: 言葉の理解
- 学習目標: 提示条件に対して「Read」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:358 / Week 37
- ドリル接続: PH3 Week37のPOSSE課題。詳細画面のControllerがどのレコードを読むか確認しましょう。
- 既習: Week36までのリレーション・先読み。提供済みスコープとアクセサの役割は問題文で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week37-crud-read
- 類題: ph3-week37-choice-crud-read / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

CRUDのうち、保存済みのクイズ1件を詳細表示する操作に対応するものはどれですか？

- correct: Read（正答）
- wrong1: Create
- wrong2: Update
- wrong3: Delete

達成条件: 条件に適合する候補を1つ選ぶ：Read

ヒント: データを変更せず読み取る操作です。

解説: 詳細表示はReadに対応します。 PCでは詳細画面のControllerがどのレコードを読むか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 新しいレコードの作成です。
- 誤答wrong2: 既存レコードの変更です。
- 誤答wrong3: レコードの削除です。

## question-ph3-week37-choice-dynamic-route（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「/quizzes/{id}」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:358 / Week 37
- ドリル接続: PH3 Week37のPOSSE課題。2つのIDで同じアクションへ到達するか確認しましょう。
- 既習: Week36までのリレーション・先読み。提供済みスコープとアクセサの役割は問題文で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week37-dynamic-route
- 類題: ph3-week37-choice-dynamic-route / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

/quizzes/1と/quizzes/2を同じアクションで扱うルートのパスはどれですか？

- wrong1: /quizzes/1
- wrong2: /quizzes?id
- wrong3: /quizzes/id
- correct: /quizzes/{id}（正答）

達成条件: 条件に適合する候補を1つ選ぶ：/quizzes/{id}

ヒント: 変わる箇所を波括弧で囲みます。

解説: ルートパラメーターでIDの異なるURLを扱います。 PCでは2つのIDで同じアクションへ到達するか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: idが2のURLを同じ定義で扱えません。
- 誤答wrong2: パスの値を受け取るルートパラメーターの書式ではありません。
- 誤答wrong3: idという固定文字のパスになってしまいます。

## question-ph3-week37-choice-id-fetch（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「Quiz::findOrFail($id)」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:358 / Week 37
- ドリル接続: PH3 Week37のPOSSE課題。存在するIDと存在しないIDの応答を確認しましょう。
- 既習: Week36までのリレーション・先読み。提供済みスコープとアクセサの役割は問題文で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week37-id-fetch
- 類題: ph3-week37-choice-id-fetch / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

show($id)でURLから受け取ったIDのクイズを1件取得します。存在しなければ404にする呼び出しはどれですか？

- wrong2: Quiz::first()
- wrong3: new Quiz()
- correct: Quiz::findOrFail($id)（正答）
- wrong1: Quiz::all()

達成条件: 条件に適合する候補を1つ選ぶ：Quiz::findOrFail($id)

ヒント: 指定主キーで探し、見つからなければ失敗させます。

解説: findOrFailは対象のモデルか未検出の例外を返します。 PCでは存在するIDと存在しないIDの応答を確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 全件取得であり、対象の1件にも404にも対応しません。
- 誤答wrong2: 受け取ったIDを条件に使っていません。
- 誤答wrong3: DBから対象レコードを取得しません。

## question-ph3-week37-choice-detail-nested-load（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「Quiz::with("questions.choices")->findOrFail($id)」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:358 / Week 37
- ドリル接続: PH3 Week37のPOSSE課題。設問と選択肢を表示した際のクエリ数を確認しましょう。
- 既習: Week36までのリレーション・先読み。提供済みスコープとアクセサの役割は問題文で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week37-detail-nested-load
- 類題: ph3-week37-choice-detail-nested-load / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

Quizにquestions、Questionにchoicesの関係を定義済みです。両方を先読みする指定はどれですか？

- wrong3: Quiz::with("users")->findOrFail($id)
- correct: Quiz::with("questions.choices")->findOrFail($id)（正答）
- wrong1: Quiz::with("choices.questions")->findOrFail($id)
- wrong2: Quiz::findOrFail($id)だけ

達成条件: 条件に適合する候補を1つ選ぶ：Quiz::with("questions.choices")->findOrFail($id)

ヒント: 親から子へ順番にドットでつなぎます。

解説: questionsの中のchoicesまで先読みします。 PCでは設問と選択肢を表示した際のクエリ数を確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 定義された親子の順序が逆です。
- 誤答wrong2: 関連を先読みする指定がありません。
- 誤答wrong3: 必要なのは設問と選択肢の関連です。

## question-ph3-week37-choice-question-choice-loop（版1・published）

- 形式: choice
- 主対象: 知識の組み立て
- 学習目標: 提示条件に対して「$question->choices」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:358 / Week 37
- ドリル接続: PH3 Week37のPOSSE課題。別の設問の選択肢が混ざらないか確認しましょう。
- 既習: Week36までのリレーション・先読み。提供済みスコープとアクセサの役割は問題文で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week37-question-choice-loop
- 類題: ph3-week37-choice-question-choice-loop / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

Bladeで各設問に対応する選択肢を出します。外側のforeachで$questionを取り出した後、内側で回すものはどれですか？

- correct: $question->choices（正答）
- wrong1: $quiz->questions
- wrong2: Choice::all()
- wrong3: $question->quiz

達成条件: 条件に適合する候補を1つ選ぶ：$question->choices

ヒント: 現在表示している設問の関連を使います。

解説: 各設問からそのchoicesをたどります。 PCでは別の設問の選択肢が混ざらないか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 再び設問全体を回すと選択肢の表示にはなりません。
- 誤答wrong2: その設問以外の選択肢も混ざってしまいます。
- 誤答wrong3: 親クイズであり、選択肢の集合ではありません。

## question-ph3-week37-choice-named-detail-parameter（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「route("quizzes.show", ["id" => 2])」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:358 / Week 37
- ドリル接続: PH3 Week37のPOSSE課題。一覧の各リンクが異なるIDになるか確認しましょう。
- 既習: Week36までのリレーション・先読み。提供済みスコープとアクセサの役割は問題文で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week37-named-detail-parameter
- 類題: ph3-week37-choice-named-detail-parameter / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

名前付きルートquizzes.showは/quizzes/{id}です。id=2へのURLを生成するものはどれですか？

- wrong1: route("quizzes.show")
- wrong2: view("quizzes.show", ["id" => 2])
- wrong3: route("quizzes.index", ["id" => 2])
- correct: route("quizzes.show", ["id" => 2])（正答）

達成条件: 条件に適合する候補を1つ選ぶ：route("quizzes.show", ["id" => 2])

ヒント: ルート名と必要なパラメーターを渡します。

解説: ルートの{id}に2を対応させます。 PCでは一覧の各リンクが異なるIDになるか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 必須のidパラメーターがありません。
- 誤答wrong2: ビューを返す呼び出しでありURLを生成しません。
- 誤答wrong3: 指定された詳細ルートを使用していません。

## question-ph3-week37-choice-local-scope-call（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「User::firstGeneration()->get()」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:358 / Week 37
- ドリル接続: week37-1の関連ドリル。generation=1の利用者だけになるか確認しましょう。
- 既習: Week36までのリレーション・先読み。提供済みスコープとアクセサの役割は問題文で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week37-local-scope-call
- 類題: ph3-week37-choice-local-scope-call / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

UserにscopeFirstGeneration($query)を定義済みです。ローカルスコープの呼び出しはどれですか？

- wrong2: User::all()->firstGeneration()
- wrong3: User::find("firstGeneration")
- correct: User::firstGeneration()->get()（正答）
- wrong1: User::scopeFirstGeneration()->get()

達成条件: 条件に適合する候補を1つ選ぶ：User::firstGeneration()->get()

ヒント: 定義のscopeという接頭辞は呼び出し側で外します。

解説: クエリへfirstGenerationを適用してから取得します。 PCではgeneration=1の利用者だけになるか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 利用側ではscopeの接頭辞を除いて呼び出します。
- 誤答wrong2: 取得後のコレクションではなくモデルクエリへスコープを適用します。
- 誤答wrong3: スコープ名を主キーの値として検索してしまいます。

## question-ph3-week37-choice-accessor-read（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「$user->full_name」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:358 / Week 37
- ドリル接続: week37-2の関連ドリル。Bladeで結合処理を書かずフルネームが出るか確認しましょう。
- 既習: Week36までのリレーション・先読み。提供済みスコープとアクセサの役割は問題文で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week37-accessor-read
- 類題: ph3-week37-choice-accessor-read / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

提供済みUserにgetFullNameAttribute()アクセサがあります。計算されたフルネームを動的属性として読むものはどれですか？

- wrong3: User::full_name()
- correct: $user->full_name（正答）
- wrong1: $user->full_name()
- wrong2: $user->first_name

達成条件: 条件に適合する候補を1つ選ぶ：$user->full_name

ヒント: この形式のアクセサはsnake_caseの属性名で読みます。

解説: getFullNameAttributeはfull_nameとして読めます。 PCではBladeで結合処理を書かずフルネームが出るか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: アクセサを動的属性として読む形ではありません。
- 誤答wrong2: 名前の一部だけで、フルネームのアクセサではありません。
- 誤答wrong3: モデルインスタンスの属性参照ではありません。

## question-ph3-week37-choice-fillable-diagnosis（版1・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: 提示条件に対して「Userのfillableへfamily_nameを追加する」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:358 / Week 37
- ドリル接続: week37-3の関連ドリル。保存後にDBのfamily_nameも変わるか確認しましょう。
- 既習: Week36までのリレーション・先読み。提供済みスコープとアクセサの役割は問題文で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week37-fillable-diagnosis
- 類題: ph3-week37-choice-fillable-diagnosis / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

family_name列は存在し、値も検証済みです。$user->update(["family_name" => $value])が反映されず、fillableにはfirst_nameしかありません。見直す箇所はどれですか？

- correct: Userのfillableへfamily_nameを追加する（正答）
- wrong1: name列を新しく増やす
- wrong2: Controllerの名前をすべて小文字へ変える
- wrong3: Bladeだけで新しい値を固定表示する

達成条件: 条件に適合する候補を1つ選ぶ：Userのfillableへfamily_nameを追加する

ヒント: 列の存在と一括代入の許可は別です。

解説: 保存対象の属性をfillableに含めます。 PCでは保存後にDBのfamily_nameも変わるか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 不足しているのは存在済みfamily_nameの一括代入許可です。
- 誤答wrong2: 一括代入の許可設定を直すことになりません。
- 誤答wrong3: 保存が直ったことにはなりません。

## question-ph3-week37-choice-quiz-filter-evidence（版1・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: 提示条件に対して「取得したid=2のクイズのquestionsを表示する」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:358 / Week 37
- ドリル接続: PH3 Week37のPOSSE課題。2つの詳細URLで設問が分かれるか確認しましょう。
- 既習: Week36までのリレーション・先読み。提供済みスコープとアクセサの役割は問題文で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week37-quiz-filter-evidence
- 類題: ph3-week37-choice-quiz-filter-evidence / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

/quizzes/2で、id=1のクイズの設問も混ざります。全設問を表示していた場合の修正はどれですか？

- wrong1: クイズ名だけid=2の名前へ固定する
- wrong2: 全設問をランダムに並べる
- wrong3: 設問の文字色を薄くする
- correct: 取得したid=2のクイズのquestionsを表示する（正答）

達成条件: 条件に適合する候補を1つ選ぶ：取得したid=2のクイズのquestionsを表示する

ヒント: 詳細画面の親を起点に関連をたどります。

解説: 選んだクイズに属する設問だけを表示します。 PCでは2つの詳細URLで設問が分かれるか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 表示名を変えても所属が異なる設問は除外されません。
- 誤答wrong2: 並べ替えても別クイズの設問が混ざります。
- 誤答wrong3: 所属による絞り込みになりません。
