# Week41｜ページネーション・ルート制限

15問。言葉の理解: 1 / 知識の選択: 6 / 知識の組み立て: 6 / 結果の確認・修正: 2

作者向け資料。独立問題。公開されるのは制作状態publishedの問題。

## question-ph3-week41-assembly-paginate-twenty（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: Quizはimport済みです。id昇順に並べ、1ページ20件ずつ取得してください。
- 出典: curriculum/PH3.md:563 / Week 41
- ドリル接続: PH3 Week41のPOSSE課題へ接続。21件以上を用意し、次のページへ移動できるか確認しましょう。
- 既習: Week40の管理者認可。Week41のページ分割と管理一覧。
- 概念: ph3-week41-paginate-twenty
- 類題: ph3-week41-assembly-paginate-twenty / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

Quizはimport済みです。id昇順に並べ、1ページ20件ずつ取得してください。

```php
<?php
 $quizzes = Quiz::orderBy('id')->__BLANK__;
```

- correct: paginate(20)（正答）
- wrong: get()

達成条件: Quizはimport済みです。id昇順に並べ、1ページ20件ずつ取得してください。

ヒント: 件数を指定してページ用の結果を取得します。

解説: paginate(20)で20件ずつに分けます。PCでは21件以上を用意し、次のページへ移動できるか確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: getではページ分割を行わず全件取得します。

## question-ph3-week41-assembly-pagination-links（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: $quizzesはpaginate(20)の結果です。Bladeでページ移動のリンクを表示してください。
- 出典: curriculum/PH3.md:563 / Week 41
- ドリル接続: PH3 Week41のPOSSE課題へ接続。次ページのリンク先と一覧の変化を確認しましょう。
- 既習: Week40の管理者認可。Week41のページ分割と管理一覧。
- 概念: ph3-week41-pagination-links
- 類題: ph3-week41-assembly-pagination-links / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

$quizzesはpaginate(20)の結果です。Bladeでページ移動のリンクを表示してください。

```blade
<nav>{{ __BLANK__ }}</nav>
```

- correct: $quizzes->links()（正答）
- wrong: $quizzes->count()

達成条件: $quizzesはpaginate(20)の結果です。Bladeでページ移動のリンクを表示してください。

ヒント: Paginatorが提供するリンクの生成メソッドを使います。

解説: links()でページ移動を表示します。PCでは次ページのリンク先と一覧の変化を確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。静的意味レビューのみ。Blade/Laravelは実行しない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: countは現在のページの件数で、移動用リンクではありません。

## question-ph3-week41-assembly-resource-index-only（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: UserControllerはimport済みです。resourceルートを一覧indexだけに制限してください。
- 出典: curriculum/PH3.md:563 / Week 41
- ドリル接続: week41-1の関連ドリルへ接続。route:listにusers.indexだけがあるか確認しましょう。
- 既習: Week40の管理者認可。Week41のページ分割と管理一覧。
- 概念: ph3-week41-resource-index-only
- 類題: ph3-week41-assembly-resource-index-only / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

UserControllerはimport済みです。resourceルートを一覧indexだけに制限してください。

```php
<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
Route::resource('users', UserController::class)->__BLANK__;
```

- correct: only(['index'])（正答）
- wrong: except(['index'])

達成条件: UserControllerはimport済みです。resourceルートを一覧indexだけに制限してください。

ヒント: 許可するアクションだけを列挙するメソッドです。

解説: onlyでindexだけを登録します。PCではroute:listにusers.indexだけがあるか確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: exceptは指定アクションを除くため、index以外を残す逆の制限です。

## question-ph3-week41-assembly-admin-edit-guard（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: GET /admin/quizzes/{id}/editは登録済みです。登録済みauthとadminの両ミドルウェアを指定してください。adminはサーバーの管理者判定です。
- 出典: curriculum/PH3.md:563 / Week 41
- ドリル接続: PH3 Week41のPOSSE課題へ接続。一般ユーザーが編集URLへ直接アクセスしても拒否されるか確認しましょう。
- 既習: Week40の管理者認可。Week41のページ分割と管理一覧。
- 概念: ph3-week41-admin-edit-guard
- 類題: ph3-week41-assembly-admin-edit-guard / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

GET /admin/quizzes/{id}/editは登録済みです。登録済みauthとadminの両ミドルウェアを指定してください。adminはサーバーの管理者判定です。

```php
<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QuizController;
Route::get('/admin/quizzes/{id}/edit', [QuizController::class, 'edit'])->middleware(__BLANK__);
```

- correct: ['auth', 'admin']（正答）
- wrong: ['auth']

達成条件: GET /admin/quizzes/{id}/editは登録済みです。登録済みauthとadminの両ミドルウェアを指定してください。adminはサーバーの管理者判定です。

ヒント: ログインと管理者の確認を両方適用します。

解説: 認証と管理者の認可を分けて適用します。PCでは一般ユーザーが編集URLへ直接アクセスしても拒否されるか確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: authだけではログイン済み一般ユーザーの編集を防げません。

## question-ph3-week41-assembly-stable-pagination（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: QuizをID昇順で安定してページ分割します。ソートを指定してから20件ずつ取得してください。
- 出典: curriculum/PH3.md:563 / Week 41
- ドリル接続: PH3 Week41のPOSSE課題へ接続。ページをまたいで順番を確認しましょう。
- 既習: Week40の管理者認可。Week41のページ分割と管理一覧。
- 概念: ph3-week41-stable-pagination
- 類題: ph3-week41-assembly-stable-pagination / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

QuizをID昇順で安定してページ分割します。ソートを指定してから20件ずつ取得してください。

```php
<?php
 $quizzes = Quiz::__BLANK__;
```

- correct: orderBy('id')->paginate(20)（正答）
- wrong: orderBy('name')->paginate(20)

達成条件: QuizをID昇順で安定してページ分割します。ソートを指定してから20件ずつ取得してください。

ヒント: 一意なキーで明確な順序を与えます。

解説: orderByのidで並び順を固定します。PCではページをまたいで順番を確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: nameでの並べ替えは指定されたid昇順と異なり、同名もあり得ます。

## question-ph3-week41-choice-paginate-twenty（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「Quiz::orderBy("id")->paginate(20)」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:563 / Week 41
- ドリル接続: PH3 Week41のPOSSE課題。21件以上を用意して2ページ目へ進めるか確認しましょう。
- 既習: Week40の管理者認可。Week41のページ分割と管理一覧。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week41-paginate-twenty
- 類題: ph3-week41-choice-paginate-twenty / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

クイズ一覧を1ページ20件に分け、ページ情報も取得します。適した呼び出しはどれですか？

- correct: Quiz::orderBy("id")->paginate(20)（正答）
- wrong1: Quiz::all()
- wrong2: Quiz::limit(20)->get()
- wrong3: Quiz::find(20)

達成条件: 条件に適合する候補を1つ選ぶ：Quiz::orderBy("id")->paginate(20)

ヒント: 件数制限とページ分割を区別します。

解説: paginateでページごとのデータとページ情報を得ます。 PCでは21件以上を用意して2ページ目へ進めるか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 全件取得でありページ分割しません。
- 誤答wrong2: 先頭20件だけの取得で、ページ移動の情報を持ちません。
- 誤答wrong3: 20件ではなく主キー20の1件を探します。

## question-ph3-week41-choice-pagination-links（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「{{ $quizzes->links() }}」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:563 / Week 41
- ドリル接続: PH3 Week41のPOSSE課題。次へ進んだとき表示レコードが変わるか確認しましょう。
- 既習: Week40の管理者認可。Week41のページ分割と管理一覧。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week41-pagination-links
- 類題: ph3-week41-choice-pagination-links / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

ControllerからPaginatorの$quizzesを渡しています。Bladeでページ移動リンクを出すものはどれですか？

- wrong1: {{ $quizzes->name }}
- wrong2: @csrfだけ
- wrong3: {{ count($quizzes) }}だけ
- correct: {{ $quizzes->links() }}（正答）

達成条件: 条件に適合する候補を1つ選ぶ：{{ $quizzes->links() }}

ヒント: ページ分割の結果が持つリンク生成を使います。

解説: linksでページ移動用のリンクを表示します。 PCでは次へ進んだとき表示レコードが変わるか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: ページ全体をクイズ1件のように扱えません。
- 誤答wrong2: CSRFトークンはページ移動リンクではありません。
- 誤答wrong3: 件数の表示だけで移動リンクは出ません。

## question-ph3-week41-choice-page-count（版1・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: 提示条件に対して「5件」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:563 / Week 41
- ドリル接続: PH3 Week41のPOSSE課題。件数と最終ページの表示を照合しましょう。
- 既習: Week40の管理者認可。Week41のページ分割と管理一覧。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week41-page-count
- 類題: ph3-week41-choice-page-count / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

削除済みを含まない全45件を、1ページ20件でpaginateします。最後のページの表示件数は何件ですか？

- wrong2: 25件
- wrong3: 45件
- correct: 5件（正答）
- wrong1: 20件

達成条件: 条件に適合する候補を1つ選ぶ：5件

ヒント: 前のページで表示した件数を引きます。

解説: 45件を20件ずつ分けると20・20・5件です。 PCでは件数と最終ページの表示を照合しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 最初の2ページで40件を表示するため残りは5件です。
- 誤答wrong2: 1ページの上限20件も超えています。
- 誤答wrong3: 全件を1ページで表示する設定ではありません。

## question-ph3-week41-choice-stable-page-order（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「Quiz::orderBy("id")->paginate(20)」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:563 / Week 41
- ドリル接続: PH3 Week41のPOSSE課題。1ページ目と2ページ目でIDの並びを確認しましょう。
- 既習: Week40の管理者認可。Week41のページ分割と管理一覧。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week41-stable-page-order
- 類題: ph3-week41-choice-stable-page-order / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

ページを移動しても順序が一貫するよう、重複しないidを使って取得します。適したものはどれですか？

- wrong3: Quiz::find(1)
- correct: Quiz::orderBy("id")->paginate(20)（正答）
- wrong1: Quiz::inRandomOrder()->paginate(20)
- wrong2: Quiz::limit(20)->get()

達成条件: 条件に適合する候補を1つ選ぶ：Quiz::orderBy("id")->paginate(20)

ヒント: ページの境界が変わらない並びを指定します。

解説: 一意な列による順序を固定してページ分割します。 PCでは1ページ目と2ページ目でIDの並びを確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: ページごとにランダム取得すると同じ行の重複や欠落を招き得ます。
- 誤答wrong2: 順序やページ移動の指定になっていません。
- 誤答wrong3: 一覧をページ分割する処理ではありません。

## question-ph3-week41-choice-resource-index-only（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「Route::resource("users", UserController::class)->only(["index"]);」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:563 / Week 41
- ドリル接続: week41-1の関連ドリル。route:listでusers.index以外がないか確認しましょう。
- 既習: Week40の管理者認可。Week41のページ分割と管理一覧。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week41-resource-index-only
- 類題: ph3-week41-choice-resource-index-only / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

UserControllerはimport済みです。resourceで一覧表示だけを登録するものはどれですか？

- correct: Route::resource("users", UserController::class)->only(["index"]);（正答）
- wrong1: Route::resource("users", UserController::class)->except(["index"]);
- wrong2: Route::resource("users", UserController::class)->only(["store"]);
- wrong3: Route::resource("users", UserController::class);

達成条件: 条件に適合する候補を1つ選ぶ：Route::resource("users", UserController::class)->only(["index"]);

ヒント: 必要なアクションを許可リストへ指定します。

解説: onlyでindexだけに限定できます。 PCではroute:listでusers.index以外がないか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 一覧を除くルートを登録してしまいます。
- 誤答wrong2: 登録するのは新規保存のアクションです。
- 誤答wrong3: 一覧以外の標準アクションも登録されます。

## question-ph3-week41-choice-resource-index-method（版1・published）

- 形式: choice
- 主対象: 言葉の理解
- 学習目標: 提示条件に対して「GET /users」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:563 / Week 41
- ドリル接続: week41-1の関連ドリル。route:listのメソッド・URI・アクションを照合しましょう。
- 既習: Week40の管理者認可。Week41のページ分割と管理一覧。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week41-resource-index-method
- 類題: ph3-week41-choice-resource-index-method / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

標準のresourceルートで、ユーザー一覧indexに対応するHTTPメソッドとURIはどれですか？

- wrong1: POST /users
- wrong2: DELETE /users/{user}
- wrong3: GET /users/create
- correct: GET /users（正答）

達成条件: 条件に適合する候補を1つ選ぶ：GET /users

ヒント: 一覧の取得と作成フォームを区別します。

解説: indexはGETでコレクションの一覧を返します。 PCではroute:listのメソッド・URI・アクションを照合しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 標準ではstoreに対応します。
- 誤答wrong2: 標準ではdestroyに対応します。
- 誤答wrong3: 標準ではcreateフォームに対応します。

## question-ph3-week41-choice-resource-except（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「->except(["destroy"])」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:563 / Week 41
- ドリル接続: week41-1の関連ドリル。route:listでDELETEのルートが消えたか確認しましょう。
- 既習: Week40の管理者認可。Week41のページ分割と管理一覧。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week41-resource-except
- 類題: ph3-week41-choice-resource-except / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

標準resourceのうちdestroyだけを登録しない指定はどれですか？

- wrong2: ->except(["index"])
- wrong3: ->name("destroy")
- correct: ->except(["destroy"])（正答）
- wrong1: ->only(["destroy"])

達成条件: 条件に適合する候補を1つ選ぶ：->except(["destroy"])

ヒント: 必要ないアクションの除外を指定します。

解説: exceptは指定したアクションを登録対象から外します。 PCではroute:listでDELETEのルートが消えたか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 削除だけを登録する逆の指定です。
- 誤答wrong2: 除外対象が一覧になっています。
- 誤答wrong3: 名前を付けても削除アクションを除外しません。

## question-ph3-week41-choice-edit-endpoint-security（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「編集画面と更新処理の両方で管理者の認可を行う」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:563 / Week 41
- ドリル接続: PH3 Week41のPOSSE課題。一般ユーザーでGETと更新リクエストの両方を確認しましょう。
- 既習: Week40の管理者認可。Week41のページ分割と管理一覧。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week41-edit-endpoint-security
- 類題: ph3-week41-choice-edit-endpoint-security / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

一般ユーザー用一覧から編集ボタンを削除しました。編集機能のアクセス制御として必要な追加対応はどれですか？

- wrong3: 編集ボタンの削除だけで完了とする
- correct: 編集画面と更新処理の両方で管理者の認可を行う（正答）
- wrong1: 編集URLを知っている人だけ通す
- wrong2: 更新処理だけを誰でも通せるままにする

達成条件: 条件に適合する候補を1つ選ぶ：編集画面と更新処理の両方で管理者の認可を行う

ヒント: 表示用と保存用の入口を両方守ります。

解説: 編集画面の閲覧と更新処理のどちらにも認可が必要です。 PCでは一般ユーザーでGETと更新リクエストの両方を確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: URLを知ることは権限の証明ではありません。
- 誤答wrong2: 画面を開かず更新リクエストを送れてしまいます。
- 誤答wrong3: 直接のURLアクセスを拒否できません。

## question-ph3-week41-choice-admin-question-link（版1・published）

- 形式: choice
- 主対象: 知識の組み立て
- 学習目標: 提示条件に対して「クリックしたクイズのID」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:563 / Week 41
- ドリル接続: PH3 Week41のPOSSE課題。異なる2行で対象の設問一覧が変わるか確認しましょう。
- 既習: Week40の管理者認可。Week41のページ分割と管理一覧。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week41-admin-question-link
- 類題: ph3-week41-choice-admin-question-link / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

管理用クイズ一覧のタイトルを押すと、そのクイズの設問メンテナンスへ移動します。リンクに含める情報はどれですか？

- correct: クリックしたクイズのID（正答）
- wrong1: 一覧の件数だけ
- wrong2: 最初のクイズのIDをすべてへ固定
- wrong3: ログイン画面の見出しだけ

達成条件: 条件に適合する候補を1つ選ぶ：クリックしたクイズのID

ヒント: 一覧の各行と移動先の親を対応させます。

解説: 各クイズのIDを対応するメンテナンスルートへ渡します。 PCでは異なる2行で対象の設問一覧が変わるか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: どのクイズを選んだか区別できません。
- 誤答wrong2: 別の行を押しても同じクイズへ移動してしまいます。
- 誤答wrong3: 設問メンテナンスの対象を指定できません。

## question-ph3-week41-choice-only-is-not-authorization（版1・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: 提示条件に対して「indexにアクセスする利用者の管理者権限の確認」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:563 / Week 41
- ドリル接続: week41-1の関連ドリル。必要な認証・認可ミドルウェアも付いているか確認しましょう。
- 既習: Week40の管理者認可。Week41のページ分割と管理一覧。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week41-only-is-not-authorization
- 類題: ph3-week41-choice-only-is-not-authorization / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

resourceをonly(["index"])に限定しました。この設定だけでは行われないことはどれですか？

- wrong1: resourceからstoreを登録対象外にすること
- wrong2: resourceからdestroyを登録対象外にすること
- wrong3: resourceの対象アクションをindexへ限定すること
- correct: indexにアクセスする利用者の管理者権限の確認（正答）

達成条件: 条件に適合する候補を1つ選ぶ：indexにアクセスする利用者の管理者権限の確認

ヒント: ルートの有無と利用者の許可を分けます。

解説: onlyは登録するアクションの制限であり認可ではありません。 PCでは必要な認証・認可ミドルウェアも付いているか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: indexだけに限定すればstoreは登録されません。
- 誤答wrong2: indexだけに限定すればdestroyは登録されません。
- 誤答wrong3: それがonlyの役割です。
