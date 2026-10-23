# Week34｜ルーティング・MVC・Blade

15問。言葉の理解: 3 / 知識の選択: 4 / 知識の組み立て: 6 / 結果の確認・修正: 2

作者向け資料。独立問題。公開されるのは制作状態publishedの問題。

## question-ph3-week34-assembly-controller-route（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: UserControllerはimport済みでindexメソッドがあります。GET /usersをindexへ結び付けてください。
- 出典: curriculum/PH3.md:145 / Week 34
- ドリル接続: PH3 Week34のPOSSE課題へ接続。php artisan route:listでGETの登録を確認しましょう。
- 既習: Week33のLaravel環境。Week34のMVC・ルーティング・Blade。
- 概念: ph3-week34-controller-route
- 類題: ph3-week34-assembly-controller-route / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

UserControllerはimport済みでindexメソッドがあります。GET /usersをindexへ結び付けてください。

```php
<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
__BLANK__;
```

- correct: Route::get('/users', [UserController::class, 'index'])（正答）
- wrong: Route::post('/users', [UserController::class, 'index'])

達成条件: UserControllerはimport済みでindexメソッドがあります。GET /usersをindexへ結び付けてください。

ヒント: 表示用のHTTPメソッドとコントローラのアクションを対応させます。

解説: Route::getでURLとindexを結び付けます。PCではphp artisan route:listでGETの登録を確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: postではGETで開く一覧ページに対応できません。

## question-ph3-week34-assembly-return-view（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: resources/views/users/index.blade.phpへ、取得済み配列$usersをusersというキーで渡してください。コントローラのメソッド内です。
- 出典: curriculum/PH3.md:145 / Week 34
- ドリル接続: PH3 Week34のPOSSE課題へ接続。Bladeから$usersを参照できるか確認しましょう。
- 既習: Week33のLaravel環境。Week34のMVC・ルーティング・Blade。
- 概念: ph3-week34-return-view
- 類題: ph3-week34-assembly-return-view / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

resources/views/users/index.blade.phpへ、取得済み配列$usersをusersというキーで渡してください。コントローラのメソッド内です。

```php
<?php
function index() {
  $users = []; // 取得済みの一覧とする
  return __BLANK__;
}
```

- correct: view('users.index', ['users' => $users])（正答）
- wrong: view('users.index', ['user' => $users])

達成条件: resources/views/users/index.blade.phpへ、取得済み配列$usersをusersというキーで渡してください。コントローラのメソッド内です。

ヒント: ビュー名はディレクトリをドットで区切り、渡すキーを合わせます。

解説: viewの第2引数のキーがBladeの変数名になります。PCではBladeから$usersを参照できるか確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: ビュー側が使うusersというキーと一致しません。

## question-ph3-week34-assembly-escaped-name（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: $user->nameは利用者が入力した文字列です。BladeでHTMLとして解釈させずに名前を表示してください。
- 出典: curriculum/PH3.md:145 / Week 34
- ドリル接続: PH3 Week34のPOSSE課題へ接続。タグを含む文字も文字として表示されるか確認しましょう。
- 既習: Week33のLaravel環境。Week34のMVC・ルーティング・Blade。
- 概念: ph3-week34-escaped-name
- 類題: ph3-week34-assembly-escaped-name / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

$user->nameは利用者が入力した文字列です。BladeでHTMLとして解釈させずに名前を表示してください。

```blade
<p>__BLANK__</p>
```

- correct: {{ $user->name }}（正答）
- wrong: {!! $user->name !!}

達成条件: $user->nameは利用者が入力した文字列です。BladeでHTMLとして解釈させずに名前を表示してください。

ヒント: Bladeの通常のエコー構文でエスケープします。

解説: {{ }}で入力をエスケープして表示します。PCではタグを含む文字も文字として表示されるか確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。静的意味レビューのみ。Blade/Laravelは実行しない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: {!! !!}はエスケープしないため、入力をHTMLとして扱ってしまいます。

## question-ph3-week34-assembly-layout-component（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: 提供済みのapp-layoutコンポーネントで、見出しを囲んでください。
- 出典: curriculum/PH3.md:145 / Week 34
- ドリル接続: PH3 Week34のPOSSE課題へ接続。他ページと共通のヘッダーなどが表示されるか確認しましょう。
- 既習: Week33のLaravel環境。Week34のMVC・ルーティング・Blade。
- 概念: ph3-week34-layout-component
- 類題: ph3-week34-assembly-layout-component / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

提供済みのapp-layoutコンポーネントで、見出しを囲んでください。

```blade
__BLANK__
```

- correct: <x-app-layout><h1>ユーザー</h1></x-app-layout>（正答）
- wrong: <x-app-layout><h1>ユーザー</h1></x-user-layout>

達成条件: 提供済みのapp-layoutコンポーネントで、見出しを囲んでください。

ヒント: コンポーネント名を対応させて共通レイアウトを再利用します。

解説: 共通部分をx-app-layoutへまとめます。PCでは他ページと共通のヘッダーなどが表示されるか確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。静的意味レビューのみ。Blade/Laravelは実行しない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: 開始と終了のコンポーネント名が一致しません。

## question-ph3-week34-assembly-route-list（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: URLとControllerの結び付きを、Artisanのルート一覧で確認してください。Laravelプロジェクト直下です。
- 出典: curriculum/PH3.md:145 / Week 34
- ドリル接続: PH3 Week34のPOSSE課題へ接続。/usersがUserControllerのindexを指すか確認しましょう。
- 既習: Week33のLaravel環境。Week34のMVC・ルーティング・Blade。
- 概念: ph3-week34-route-list
- 類題: ph3-week34-assembly-route-list / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

URLとControllerの結び付きを、Artisanのルート一覧で確認してください。Laravelプロジェクト直下です。

```sh
__BLANK__
```

- correct: php artisan route:list（正答）
- wrong: php artisan migrate:status

達成条件: URLとControllerの結び付きを、Artisanのルート一覧で確認してください。Laravelプロジェクト直下です。

ヒント: routeに関する一覧表示コマンドを使います。

解説: route:listでHTTPメソッド・URI・アクションを照合します。PCでは/usersがUserControllerのindexを指すか確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。sh -nによる構文確認のみ。コマンドは実行しない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: migrate:statusはDB変更の実行状況であり、URLの一覧ではありません。

## question-ph3-week34-choice-mvc-controller（版1・published）

- 形式: choice
- 主対象: 言葉の理解
- 学習目標: 提示条件に対して「コントローラー」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:145 / Week 34
- ドリル接続: PH3 Week34のPOSSE課題。UserControllerのindexで取得とreturnを確認しましょう。
- 既習: Week33のLaravel環境。Week34のMVC・ルーティング・Blade。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week34-mvc-controller
- 類題: ph3-week34-choice-mvc-controller / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

GET /usersを受け、モデルで取得したユーザー一覧をビューへ渡す役割はどれですか？

- wrong2: CSSファイル
- wrong3: マイグレーションだけ
- correct: コントローラー（正答）
- wrong1: Bladeテンプレートだけ

達成条件: 条件に適合する候補を1つ選ぶ：コントローラー

ヒント: リクエストとモデルと表示をつなぐ役割です。

解説: コントローラーが取得と表示への受け渡しをつなぎます。 PCではUserControllerのindexで取得とreturnを確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: Bladeは主に渡されたデータの表示を担当します。
- 誤答wrong2: CSSは画面の見た目を指定します。
- 誤答wrong3: マイグレーションはDB構造の変更を管理します。

## question-ph3-week34-choice-web-route-file（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「routes/web.php」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:145 / Week 34
- ドリル接続: PH3 Week34のPOSSE課題。/usersの定義をweb.phpで探しましょう。
- 既習: Week33のLaravel環境。Week34のMVC・ルーティング・Blade。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week34-web-route-file
- 類題: ph3-week34-choice-web-route-file / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

Laravel 10で、セッションを利用する通常のWebページのルートを定義する標準のファイルはどれですか？

- wrong3: public/users.php
- correct: routes/web.php（正答）
- wrong1: resources/views/web.php
- wrong2: database/seeders/web.php

達成条件: 条件に適合する候補を1つ選ぶ：routes/web.php

ヒント: URLとアクションの結び付きを記述する場所です。

解説: 通常のWebルートはroutes/web.phpに登録します。 PCでは/usersの定義をweb.phpで探しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: ビューのディレクトリはルート定義の標準配置ではありません。
- 誤答wrong2: シーダーは初期データを登録する場所です。
- 誤答wrong3: 標準のWebルートはroutes/web.phpへ定義します。

## question-ph3-week34-choice-controller-import（版1・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: 提示条件に対して「use App\Http\Controllers\UserController; の記載」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:145 / Week 34
- ドリル接続: PH3 Week34のPOSSE課題。web.phpのuse文と実際の名前空間を照合しましょう。
- 既習: Week33のLaravel環境。Week34のMVC・ルーティング・Blade。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week34-controller-import
- 類題: ph3-week34-choice-controller-import / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

web.phpに[UserController::class, "index"]と書いたところ、クラスが見つかりません。UserControllerはApp\Http\Controllersに存在します。まず確認するものはどれですか？

- correct: use App\Http\Controllers\UserController; の記載（正答）
- wrong1: usersテーブルの全行削除
- wrong2: Bladeの文字色
- wrong3: MySQLのパスワードの文字数だけ

達成条件: 条件に適合する候補を1つ選ぶ：use App\Http\Controllers\UserController; の記載

ヒント: ファイルが存在しても名前空間の指定が必要です。

解説: 短いクラス名を使うには対応するimportを確認します。 PCではweb.phpのuse文と実際の名前空間を照合しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: クラスの名前解決とDBのデータは別です。
- 誤答wrong2: 表示色ではPHPのクラスを解決できません。
- 誤答wrong3: Controllerの名前空間の指定を確認する必要があります。

## question-ph3-week34-choice-view-dot-path（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「resources/views/users/index.blade.php」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:145 / Week 34
- ドリル接続: PH3 Week34のPOSSE課題。ビューのファイル名とreturn viewの指定を照合しましょう。
- 既習: Week33のLaravel環境。Week34のMVC・ルーティング・Blade。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week34-view-dot-path
- 類題: ph3-week34-choice-view-dot-path / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

view("users.index")が指す標準のBladeファイルはどれですか？

- wrong1: routes/users/index.php
- wrong2: app/Models/users.index.php
- wrong3: public/users.index.blade.php
- correct: resources/views/users/index.blade.php（正答）

達成条件: 条件に適合する候補を1つ選ぶ：resources/views/users/index.blade.php

ヒント: ドットはビューのディレクトリの区切りです。

解説: users.indexはusers内のindexビューを指します。 PCではビューのファイル名とreturn viewの指定を照合しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: ルート定義の配置とビューの配置は別です。
- 誤答wrong2: モデルの場所へビューを置く指定ではありません。
- 誤答wrong3: Laravelの標準ビュー配置はresources/viewsです。

## question-ph3-week34-choice-view-variable-key（版1・published）

- 形式: choice
- 主対象: 知識の組み立て
- 学習目標: 提示条件に対して「$members」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:145 / Week 34
- ドリル接続: PH3 Week34のPOSSE課題。Bladeのforeachとデータを渡すキーをそろえましょう。
- 既習: Week33のLaravel環境。Week34のMVC・ルーティング・Blade。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week34-view-variable-key
- 類題: ph3-week34-choice-view-variable-key / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

Controllerがview("users.index", ["members" => $users])を返します。Bladeで一覧へアクセスする変数はどれですか？

- wrong2: $index
- wrong3: $view
- correct: $members（正答）
- wrong1: $users

達成条件: 条件に適合する候補を1つ選ぶ：$members

ヒント: キーがビュー内の変数名になります。

解説: 元のPHP変数名ではなく、渡したキーを使います。 PCではBladeのforeachとデータを渡すキーをそろえましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: ビューへ渡す変数名は配列のキーmembersです。
- 誤答wrong2: ビューのファイル名が変数名になるわけではありません。
- 誤答wrong3: view呼び出しだけでこの変数が定義されるわけではありません。

## question-ph3-week34-choice-get-page（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「GET」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:145 / Week 34
- ドリル接続: PH3 Week34のPOSSE課題。route:listでGET /usersを確認しましょう。
- 既習: Week33のLaravel環境。Week34のMVC・ルーティング・Blade。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week34-get-page
- 類題: ph3-week34-choice-get-page / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

ブラウザでURLを開いたときにユーザー一覧を表示します。対応させるHTTPメソッドはどれですか？

- wrong3: PATCH
- correct: GET（正答）
- wrong1: POST
- wrong2: DELETE

達成条件: 条件に適合する候補を1つ選ぶ：GET

ヒント: 通常のリンクを開くリクエストです。

解説: GETのルートを一覧表示のアクションに結び付けます。 PCではroute:listでGET /usersを確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: POSTは一般に作成などの送信に使い、通常のURL表示のGETと異なります。
- 誤答wrong2: 削除を表すメソッドで、一覧を開く要求とは異なります。
- 誤答wrong3: 部分更新を表すメソッドで、一覧表示の要求とは異なります。

## question-ph3-week34-choice-escape-output（版1・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: 提示条件に対して「タグも含めた文字列として表示される」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:145 / Week 34
- ドリル接続: PH3 Week34のPOSSE課題。ローカル画面でタグを含む名前が文字として出るか確認しましょう。
- 既習: Week33のLaravel環境。Week34のMVC・ルーティング・Blade。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week34-escape-output
- 類題: ph3-week34-choice-escape-output / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

利用者の名前が文字列「<b>Aya</b>」です。Bladeの{{ $name }}で表示した結果はどれですか？

- correct: タグも含めた文字列として表示される（正答）
- wrong1: Ayaだけが必ず太字で表示される
- wrong2: DBのnameが自動的に空になる
- wrong3: PHPの関数bが呼び出される

達成条件: 条件に適合する候補を1つ選ぶ：タグも含めた文字列として表示される

ヒント: 通常のBlade出力はHTMLとして解釈させません。

解説: エスケープでタグを表示用の文字として扱います。 PCではローカル画面でタグを含む名前が文字として出るか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 通常の{{ }}はHTMLをエスケープします。
- 誤答wrong2: 表示処理はDBの保存値を削除しません。
- 誤答wrong3: 文字列内のHTMLタグはPHPの関数ではありません。

## question-ph3-week34-choice-component-purpose（版1・published）

- 形式: choice
- 主対象: 言葉の理解
- 学習目標: 提示条件に対して「共通レイアウトをまとめて再利用する」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:145 / Week 34
- ドリル接続: PH3 Week34のPOSSE課題。2ページで共通ヘッダーが同じコンポーネントを使うか確認しましょう。
- 既習: Week33のLaravel環境。Week34のMVC・ルーティング・Blade。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week34-component-purpose
- 類題: ph3-week34-choice-component-purpose / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

複数ページに同じヘッダーを表示します。<x-app-layout>を使う目的はどれですか？

- wrong1: ページごとに異なるDBを必ず作成する
- wrong2: URLをすべて同じパスへ置き換える
- wrong3: すべてのデータを自動で管理者専用にする
- correct: 共通レイアウトをまとめて再利用する（正答）

達成条件: 条件に適合する候補を1つ選ぶ：共通レイアウトをまとめて再利用する

ヒント: 同じHTML構造の重複を減らします。

解説: 共通部分をコンポーネントへ集めて変更を反映しやすくします。 PCでは2ページで共通ヘッダーが同じコンポーネントを使うか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: レイアウトの再利用とDBの分割は別です。
- 誤答wrong2: 共通レイアウトを使っても各ページのURLは保てます。
- 誤答wrong3: レイアウトだけではサーバー側のアクセス制御になりません。

## question-ph3-week34-choice-route-name（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「route("users.index")」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:145 / Week 34
- ドリル接続: PH3 Week34のPOSSE課題。ルートのnameとBladeのrouteの引数を照合しましょう。
- 既習: Week33のLaravel環境。Week34のMVC・ルーティング・Blade。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week34-route-name
- 類題: ph3-week34-choice-route-name / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

URLを変えてもリンクを直す箇所を減らすため、名前付きルートusers.indexを使います。BladeでURLを作る方法はどれですか？

- wrong2: env("users.index")
- wrong3: asset("users.index")
- correct: route("users.index")（正答）
- wrong1: view("users.index")

達成条件: 条件に適合する候補を1つ選ぶ：route("users.index")

ヒント: ページのルート名からURLを作ります。

解説: routeヘルパーに登録済みの名前を渡します。 PCではルートのnameとBladeのrouteの引数を照合しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: viewはビューを返すためのヘルパーで、名前付きルートのURL生成ではありません。
- 誤答wrong2: 環境変数の取得ではルートURLを生成できません。
- 誤答wrong3: assetはアセットへのURLを作るためのヘルパーです。

## question-ph3-week34-choice-action-method（版1・published）

- 形式: choice
- 主対象: 言葉の理解
- 学習目標: 提示条件に対して「UserController内のpublic function index()」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:145 / Week 34
- ドリル接続: PH3 Week34のPOSSE課題。ルートの文字列とメソッド名が一致するか確認しましょう。
- 既習: Week33のLaravel環境。Week34のMVC・ルーティング・Blade。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week34-action-method
- 類題: ph3-week34-choice-action-method / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

ルートが[UserController::class, "index"]を参照しています。indexアクションとして定義すべきものはどれですか？

- wrong3: Bladeのclass="index"属性
- correct: UserController内のpublic function index()（正答）
- wrong1: usersテーブル内のindexという行
- wrong2: public/index.cssというCSSファイル

達成条件: 条件に適合する候補を1つ選ぶ：UserController内のpublic function index()

ヒント: クラスにある呼び出し可能なメソッドを探します。

解説: アクションはコントローラー内のpublicメソッドです。 PCではルートの文字列とメソッド名が一致するか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: アクションはコントローラーのメソッドです。
- 誤答wrong2: CSSファイルはアクションではありません。
- 誤答wrong3: HTMLのclass名とPHPのメソッドは別です。
