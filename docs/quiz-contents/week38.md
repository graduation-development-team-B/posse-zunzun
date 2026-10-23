# Week38｜編集・更新・セッション

15問。言葉の理解: 1 / 知識の選択: 8 / 知識の組み立て: 5 / 結果の確認・修正: 1

作者向け資料。独立問題。公開されるのは制作状態publishedの問題。

## question-ph3-week38-assembly-edit-route（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: QuizControllerのupdateへ、PATCH /quizzes/{id}を結び付けてください。Controllerはimport済みです。
- 出典: curriculum/PH3.md:416 / Week 38
- ドリル接続: PH3 Week38のPOSSE課題へ接続。route:listでupdateのHTTPメソッドを確認しましょう。
- 既習: Week37までの個別取得とモデル。Week38の更新フォーム。sessionは関連ドリルのヘルパー練習。
- 概念: ph3-week38-edit-route
- 類題: ph3-week38-assembly-edit-route / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

QuizControllerのupdateへ、PATCH /quizzes/{id}を結び付けてください。Controllerはimport済みです。

```php
<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QuizController;
__BLANK__;
```

- correct: Route::patch('/quizzes/{id}', [QuizController::class, 'update'])（正答）
- wrong: Route::get('/quizzes/{id}', [QuizController::class, 'update'])

達成条件: QuizControllerのupdateへ、PATCH /quizzes/{id}を結び付けてください。Controllerはimport済みです。

ヒント: 更新用ルートには指定されたHTTPメソッドを使います。

解説: PATCHで更新処理へ結び付けます。PCではroute:listでupdateのHTTPメソッドを確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: GETはデータ更新の送信方法として指定していません。

## question-ph3-week38-assembly-patch-form（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: WebルートにはCSRFミドルウェアがあり、更新先はPATCHです。HTML formはPOST送信するので、CSRFとPATCHの指定を追加してください。
- 出典: curriculum/PH3.md:416 / Week 38
- ドリル接続: PH3 Week38のPOSSE課題へ接続。送信先のupdateが呼ばれるか確認しましょう。
- 既習: Week37までの個別取得とモデル。Week38の更新フォーム。sessionは関連ドリルのヘルパー練習。
- 概念: ph3-week38-patch-form
- 類題: ph3-week38-assembly-patch-form / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

WebルートにはCSRFミドルウェアがあり、更新先はPATCHです。HTML formはPOST送信するので、CSRFとPATCHの指定を追加してください。

```blade
<form method="POST" action="{{ route('quizzes.update', $quiz) }}">
__BLANK__
<input name="name"><button type="submit">更新</button>
</form>
```

- correct: @csrf
@method('PATCH')（正答）
- wrong: @csrf
@method('GET')

達成条件: WebルートにはCSRFミドルウェアがあり、更新先はPATCHです。HTML formはPOST送信するので、CSRFとPATCHの指定を追加してください。

ヒント: フォームのPOSTに、Laravelが読むHTTPメソッド指定を添えます。

解説: @csrfと@methodを組み合わせます。PCでは送信先のupdateが呼ばれるか確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。静的意味レビューのみ。Blade/Laravelは実行しない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: GETへ偽装するとPATCHの更新ルートに一致しません。

## question-ph3-week38-assembly-update-name（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: $quizは取得済みでnameはfillableです。$validatedはnameだけを含む検証済み配列です。既存クイズを更新してください。
- 出典: curriculum/PH3.md:416 / Week 38
- ドリル接続: PH3 Week38のPOSSE課題へ接続。同じidの名前が変わり、行数が増えないか確認しましょう。
- 既習: Week37までの個別取得とモデル。Week38の更新フォーム。sessionは関連ドリルのヘルパー練習。
- 概念: ph3-week38-update-name
- 類題: ph3-week38-assembly-update-name / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

$quizは取得済みでnameはfillableです。$validatedはnameだけを含む検証済み配列です。既存クイズを更新してください。

```php
<?php
__BLANK__;
```

- correct: $quiz->update($validated)（正答）
- wrong: $quiz->create($validated)

達成条件: $quizは取得済みでnameはfillableです。$validatedはnameだけを含む検証済み配列です。既存クイズを更新してください。

ヒント: 取得したモデル自身を更新するメソッドです。

解説: updateへ検証済みの属性だけを渡します。PCでは同じidの名前が変わり、行数が増えないか確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: createは新しいレコードを作る処理で、取得済みクイズの更新ではありません。

## question-ph3-week38-assembly-session-put（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: Laravelのsessionヘルパーを使い、キーhomeに数値1を保存してください。Webセッションは利用可能です。
- 出典: curriculum/PH3.md:416 / Week 38
- ドリル接続: week38-1の関連ドリルへ接続。次の処理でhomeを読んで1か確認しましょう。
- 既習: Week37までの個別取得とモデル。Week38の更新フォーム。sessionは関連ドリルのヘルパー練習。
- 概念: ph3-week38-session-put
- 類題: ph3-week38-assembly-session-put / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

Laravelのsessionヘルパーを使い、キーhomeに数値1を保存してください。Webセッションは利用可能です。

```php
<?php
__BLANK__;
```

- correct: session(['home' => 1])（正答）
- wrong: session('home', 1)

達成条件: Laravelのsessionヘルパーを使い、キーhomeに数値1を保存してください。Webセッションは利用可能です。

ヒント: 複数の値を保存する形ではキーと値の配列を渡します。

解説: sessionへ配列を渡すと値を保存します。PCでは次の処理でhomeを読んで1か確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: session(key, default)は読み取りで、保存の指定ではありません。

## question-ph3-week38-assembly-session-get（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: Laravelのsessionヘルパーからhomeを読み、未保存なら0を返してください。
- 出典: curriculum/PH3.md:416 / Week 38
- ドリル接続: week38-1の関連ドリルへ接続。未保存と保存済みの両方を確認しましょう。
- 既習: Week37までの個別取得とモデル。Week38の更新フォーム。sessionは関連ドリルのヘルパー練習。
- 概念: ph3-week38-session-get
- 類題: ph3-week38-assembly-session-get / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

Laravelのsessionヘルパーからhomeを読み、未保存なら0を返してください。

```php
<?php
 $home = __BLANK__;
```

- correct: session('home', 0)（正答）
- wrong: session(['home' => 0])

達成条件: Laravelのsessionヘルパーからhomeを読み、未保存なら0を返してください。

ヒント: 読み取りではキーと、値がない時の初期値を渡します。

解説: session(key, default)で読み取ります。PCでは未保存と保存済みの両方を確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: 配列を渡す形ではhomeを0で保存する操作になります。

## question-ph3-week38-choice-edit-existing-value（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「編集対象クイズの現在のname」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:416 / Week 38
- ドリル接続: PH3 Week38のPOSSE課題。異なる2件の編集ページで初期値を確認しましょう。
- 既習: Week37までの個別取得とモデル。Week38の更新フォーム。sessionは関連ドリルのヘルパー練習。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week38-edit-existing-value
- 類題: ph3-week38-choice-edit-existing-value / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

クイズ編集フォームを初めて開きました。name欄に最初から表示する値はどれですか？

- wrong2: 別のクイズのname
- wrong3: 一覧にある全クイズのnameを連結した値
- correct: 編集対象クイズの現在のname（正答）
- wrong1: 必ず空文字

達成条件: 条件に適合する候補を1つ選ぶ：編集対象クイズの現在のname

ヒント: 対象モデルから現在の値を取り出します。

解説: 編集時は既存のタイトルを初期表示します。 PCでは異なる2件の編集ページで初期値を確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 既存値を確認して編集する要件を満たしません。
- 誤答wrong2: 編集対象と一致しません。
- 誤答wrong3: 一つのクイズのタイトルを編集するフォームです。

## question-ph3-week38-choice-old-input-fallback（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「old("name", $quiz->name)」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:416 / Week 38
- ドリル接続: PH3 Week38のPOSSE課題。検証エラーの前後で入力値が維持されるか確認しましょう。
- 既習: Week37までの個別取得とモデル。Week38の更新フォーム。sessionは関連ドリルのヘルパー練習。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week38-old-input-fallback
- 類題: ph3-week38-choice-old-input-fallback / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

検証エラー後は入力し直した値、初回は既存の$quiz->nameを表示します。Bladeで使うものはどれですか？

- wrong3: session("password")
- correct: old("name", $quiz->name)（正答）
- wrong1: $quiz->nameだけ
- wrong2: old("name")だけ

達成条件: 条件に適合する候補を1つ選ぶ：old("name", $quiz->name)

ヒント: 直前の入力を優先し、なければ既存値に戻します。

解説: oldの第2引数で初期値を指定できます。 PCでは検証エラーの前後で入力値が維持されるか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: エラー後に入力し直した値を優先できません。
- 誤答wrong2: 初回の既存値へのフォールバックがありません。
- 誤答wrong3: タイトルの再表示に使う値ではありません。

## question-ph3-week38-choice-update-existing-row（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「$quiz->update($validated)」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:416 / Week 38
- ドリル接続: PH3 Week38のPOSSE課題。idと行数が変わらずnameが変わるか確認しましょう。
- 既習: Week37までの個別取得とモデル。Week38の更新フォーム。sessionは関連ドリルのヘルパー練習。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week38-update-existing-row
- 類題: ph3-week38-choice-update-existing-row / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

取得済みの$quizのnameだけを更新します。$validatedはnameのみの検証済み配列です。適切な処理はどれですか？

- correct: $quiz->update($validated)（正答）
- wrong1: Quiz::create($validated)
- wrong2: $quiz->delete()
- wrong3: Quiz::all()

達成条件: 条件に適合する候補を1つ選ぶ：$quiz->update($validated)

ヒント: 既存モデルを対象に変更を保存します。

解説: updateで同じ行の属性を更新します。 PCではidと行数が変わらずnameが変わるか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 新しい行を作成するため既存行の更新になりません。
- 誤答wrong2: 削除処理でありタイトル更新ではありません。
- 誤答wrong3: 取得だけでは値を変更しません。

## question-ph3-week38-choice-patch-form（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「method="POST"と@csrfと@method("PATCH")」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:416 / Week 38
- ドリル接続: PH3 Week38のPOSSE課題。開発ツールとroute:listでメソッドを照合しましょう。
- 既習: Week37までの個別取得とモデル。Week38の更新フォーム。sessionは関連ドリルのヘルパー練習。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week38-patch-form
- 類題: ph3-week38-choice-patch-form / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

更新ルートがPATCHを受け付けます。通常のHTMLフォームから送るLaravelの組み合わせはどれですか？

- wrong1: method="PATCH"だけ
- wrong2: method="GET"と@csrfだけ
- wrong3: method="POST"だけでメソッド指定を省略
- correct: method="POST"と@csrfと@method("PATCH")（正答）

達成条件: 条件に適合する候補を1つ選ぶ：method="POST"と@csrfと@method("PATCH")

ヒント: HTMLが送るPOSTにLaravel用の更新メソッドを付けます。

解説: POSTとメソッド偽装でPATCHを表し、CSRFトークンも送ります。 PCでは開発ツールとroute:listでメソッドを照合しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 通常のHTMLフォームではPATCHを直接指定する形は使いません。
- 誤答wrong2: 更新ルートが求めるPATCHにはなりません。
- 誤答wrong3: PATCHルートへ送るためのメソッド偽装が必要です。

## question-ph3-week38-choice-redirect-after-update（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「return redirect()->route("quizzes.index");」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:416 / Week 38
- ドリル接続: PH3 Week38のPOSSE課題。更新後のURLと一覧のタイトルを確認しましょう。
- 既習: Week37までの個別取得とモデル。Week38の更新フォーム。sessionは関連ドリルのヘルパー練習。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week38-redirect-after-update
- 類題: ph3-week38-choice-redirect-after-update / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

クイズ更新後に一覧へ移動する要件です。名前付きルートquizzes.indexがある場合の返却はどれですか？

- wrong2: return Quiz::all();
- wrong3: return redirect()->route("login");
- correct: return redirect()->route("quizzes.index");（正答）
- wrong1: return view("quizzes.edit");

達成条件: 条件に適合する候補を1つ選ぶ：return redirect()->route("quizzes.index");

ヒント: 処理完了後の移動先を指定します。

解説: 更新後に一覧へリダイレクトします。 PCでは更新後のURLと一覧のタイトルを確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 編集画面の表示になり、一覧へのリダイレクトではありません。
- 誤答wrong2: データを返すだけでは一覧への遷移になりません。
- 誤答wrong3: 移動先が指定されたクイズ一覧ではありません。

## question-ph3-week38-choice-flash-message（版1・published）

- 形式: choice
- 主対象: 言葉の理解
- 学習目標: 提示条件に対して「フラッシュセッション」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:416 / Week 38
- ドリル接続: PH3 Week38のPOSSE課題。一覧で成功文が出て、その後に残り続けないか確認しましょう。
- 既習: Week37までの個別取得とモデル。Week38の更新フォーム。sessionは関連ドリルのヘルパー練習。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week38-flash-message
- 類題: ph3-week38-choice-flash-message / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

更新後のリダイレクト先で一度だけ成功メッセージを表示します。適した仕組みはどれですか？

- wrong3: すべての利用者へ同じDB行を上書きして通知する
- correct: フラッシュセッション（正答）
- wrong1: 恒久的にタイトルを成功メッセージへ変更する
- wrong2: CSSのcontentだけに更新結果を保存する

達成条件: 条件に適合する候補を1つ選ぶ：フラッシュセッション

ヒント: 次のリクエストまで値を引き継ぐ仕組みです。

解説: フラッシュ値を付けてリダイレクトし、一覧で読みます。 PCでは一覧で成功文が出て、その後に残り続けないか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: クイズ名を壊してしまい、通知の保存先として不適切です。
- 誤答wrong2: サーバーの更新結果を受け渡す仕組みにはなりません。
- 誤答wrong3: 個々の更新通知を次のリクエストへ渡す用途に合いません。

## question-ph3-week38-choice-session-helper-read（版1・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: 提示条件に対して「1を読み、homeの値を99へ上書きしない」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:416 / Week 38
- ドリル接続: week38-1の関連ドリル。homeがある場合とない場合で返却値を比較しましょう。
- 既習: Week37までの個別取得とモデル。Week38の更新フォーム。sessionは関連ドリルのヘルパー練習。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week38-session-helper-read
- 類題: ph3-week38-choice-session-helper-read / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

セッションにhome=1が保存済みです。session("home", 99)の結果はどれですか？

- correct: 1を読み、homeの値を99へ上書きしない（正答）
- wrong1: 99へ上書きして99を返す
- wrong2: homeキーを削除する
- wrong3: すべてのセッション値を削除する

達成条件: 条件に適合する候補を1つ選ぶ：1を読み、homeの値を99へ上書きしない

ヒント: ヘルパーの文字列引数は読み取りです。

解説: キーがあるため保存済みの1を返します。 PCではhomeがある場合とない場合で返却値を比較しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 第2引数は未保存の場合のデフォルト値です。
- 誤答wrong2: 読み取り呼び出しでは削除しません。
- 誤答wrong3: セッションの破棄処理ではありません。

## question-ph3-week38-choice-session-helper-write（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「session(["draft_title" => "学習記録"]);」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:416 / Week 38
- ドリル接続: week38-1の関連ドリル。次のリクエストで同じキーを読み出しましょう。
- 既習: Week37までの個別取得とモデル。Week38の更新フォーム。sessionは関連ドリルのヘルパー練習。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week38-session-helper-write
- 類題: ph3-week38-choice-session-helper-write / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

sessionヘルパーでdraft_titleへ「学習記録」を保存するものはどれですか？

- wrong1: session("draft_title", "学習記録");
- wrong2: view("draft_title", ["学習記録"]);
- wrong3: route("draft_title");
- correct: session(["draft_title" => "学習記録"]);（正答）

達成条件: 条件に適合する候補を1つ選ぶ：session(["draft_title" => "学習記録"]);

ヒント: 保存はキーと値の配列で指定します。

解説: sessionへ配列を渡して値を書き込みます。 PCでは次のリクエストで同じキーを読み出しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: これは未保存時のデフォルトを指定する読み取りです。
- 誤答wrong2: ビューを返す呼び出しで、セッションに保存しません。
- 誤答wrong3: ルート名からURLを作る処理です。

## question-ph3-week38-choice-carbon-format（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「$now->format("Y/m/d H:i:s")」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:416 / Week 38
- ドリル接続: week38-2の関連ドリル。現在日時を表示して月と分の位置を確認しましょう。
- 既習: Week37までの個別取得とモデル。Week38の更新フォーム。sessionは関連ドリルのヘルパー練習。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week38-carbon-format
- 類題: ph3-week38-choice-carbon-format / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

Carbonの日時$nowを「2026/10/23 09:05:07」の形式で表示します。適切な書式はどれですか？

- wrong2: $now->format("Y-m-d")
- wrong3: $now->format("H:i:s")
- correct: $now->format("Y/m/d H:i:s")（正答）
- wrong1: $now->format("Y/m/d H:m:s")

達成条件: 条件に適合する候補を1つ選ぶ：$now->format("Y/m/d H:i:s")

ヒント: 月と分の書式文字が異なります。

解説: Y/m/d H:i:sで年月日と24時間表記の時分秒を出します。 PCでは現在日時を表示して月と分の位置を確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 分の指定はiであり、mは月です。
- 誤答wrong2: 時分秒が含まれず区切りも指定と異なります。
- 誤答wrong3: 年月日が含まれていません。

## question-ph3-week38-choice-month-no-overflow（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「addMonthNoOverflow()」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:416 / Week 38
- ドリル接続: week38-3の関連ドリル。1月31日からの結果が2月28日か確認しましょう。
- 既習: Week37までの個別取得とモデル。Week38の更新フォーム。sessionは関連ドリルのヘルパー練習。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week38-month-no-overflow
- 類題: ph3-week38-choice-month-no-overflow / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

Carbonの2022-01-31に1か月を加え、2月に存在しない31日を月末の28日に収めます。使うものはどれですか？

- wrong3: format("m")
- correct: addMonthNoOverflow()（正答）
- wrong1: addDays(31)
- wrong2: subMonthNoOverflow()

達成条件: 条件に適合する候補を1つ選ぶ：addMonthNoOverflow()

ヒント: 月末を超えた日を次の月へ繰り越さない指定です。

解説: NoOverflowで対象月の末日へ収めます。 PCでは1月31日からの結果が2月28日か確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 日数加算では2月末へ収める月加算の指定になりません。
- 誤答wrong2: 1か月前へ移動してしまいます。
- 誤答wrong3: 表示用の月を得るだけで日付を進めません。
