# Week40｜認証・ミドルウェア・認可

15問。言葉の理解: 1 / 知識の選択: 6 / 知識の組み立て: 5 / 結果の確認・修正: 3

作者向け資料。独立問題。公開されるのは制作状態publishedの問題。

## question-ph3-week40-assembly-auth-middleware（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: DashboardControllerはimport済みです。GET /adminのログイン確認に、Laravel標準のauthミドルウェアを付けてください。管理者判定は別途必要です。
- 出典: curriculum/PH3.md:530 / Week 40
- ドリル接続: PH3 Week40のPOSSE課題へ接続。未ログイン時のアクセスを確認し、管理者の認可も別に設けましょう。
- 既習: Week33のBreeze、Week40のミドルウェアとGate。サーバー管理のis_adminという条件を設問で指定。
- 概念: ph3-week40-auth-middleware
- 類題: ph3-week40-assembly-auth-middleware / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

DashboardControllerはimport済みです。GET /adminのログイン確認に、Laravel標準のauthミドルウェアを付けてください。管理者判定は別途必要です。

```php
<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
Route::get('/admin', [DashboardController::class, 'index'])->__BLANK__;
```

- correct: middleware('auth')（正答）
- wrong: middleware('guest')

達成条件: DashboardControllerはimport済みです。GET /adminのログイン確認に、Laravel標準のauthミドルウェアを付けてください。管理者判定は別途必要です。

ヒント: 認証済みの利用者だけを通す標準の名前を選びます。

解説: authでログインを要求します。PCでは未ログイン時のアクセスを確認し、管理者の認可も別に設けましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: guestは未ログイン向けのミドルウェアで、ログイン必須の指定とは異なります。

## question-ph3-week40-assembly-admin-redirect（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: 認証済み$userのis_adminはサーバーで管理する真偽値です。管理者でない場合だけトップへ戻してください。
- 出典: curriculum/PH3.md:530 / Week 40
- ドリル接続: PH3 Week40のPOSSE課題へ接続。一般ユーザーがURLを直接入力しても入れないか確認しましょう。
- 既習: Week33のBreeze、Week40のミドルウェアとGate。サーバー管理のis_adminという条件を設問で指定。
- 概念: ph3-week40-admin-redirect
- 類題: ph3-week40-assembly-admin-redirect / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

認証済み$userのis_adminはサーバーで管理する真偽値です。管理者でない場合だけトップへ戻してください。

```php
<?php
function checkAdmin($user) {
  if (__BLANK__) { return redirect('/website'); }
  return 'allowed';
}
```

- correct: !$user->is_admin（正答）
- wrong: $user->is_admin

達成条件: 認証済み$userのis_adminはサーバーで管理する真偽値です。管理者でない場合だけトップへ戻してください。

ヒント: 管理者ではない時の条件に否定を使います。

解説: サーバーで確認したis_adminを否定して拒否側を処理します。PCでは一般ユーザーがURLを直接入力しても入れないか確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: 否定がないと管理者を戻し、一般ユーザーを通す逆の条件です。

## question-ph3-week40-assembly-continue-middleware（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: 管理者確認が成功したミドルウェアです。$nextは次の処理、$requestは現在のリクエストです。後続へ渡してください。
- 出典: curriculum/PH3.md:530 / Week 40
- ドリル接続: PH3 Week40のPOSSE課題へ接続。管理者の時にControllerまで到達するか確認しましょう。
- 既習: Week33のBreeze、Week40のミドルウェアとGate。サーバー管理のis_adminという条件を設問で指定。
- 概念: ph3-week40-continue-middleware
- 類題: ph3-week40-assembly-continue-middleware / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

管理者確認が成功したミドルウェアです。$nextは次の処理、$requestは現在のリクエストです。後続へ渡してください。

```php
<?php
function handle($request, $next) {
  // 認証・管理者確認は成功済み
  return __BLANK__;
}
```

- correct: $next($request)（正答）
- wrong: $next(null)

達成条件: 管理者確認が成功したミドルウェアです。$nextは次の処理、$requestは現在のリクエストです。後続へ渡してください。

ヒント: 次の処理へ、受け取ったリクエストを渡します。

解説: $next($request)で処理を続けます。PCでは管理者の時にControllerまで到達するか確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: nullでは現在のリクエストを後続へ引き渡せません。

## question-ph3-week40-assembly-gate-admin（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: Userのis_adminはサーバーで管理する真偽値です。manage-quizzesゲートを、管理者の時だけ許可するよう定義してください。
- 出典: curriculum/PH3.md:530 / Week 40
- ドリル接続: PH3 Week40のPOSSE課題へ接続。Controllerなどサーバー側でもゲートを適用しましょう。
- 既習: Week33のBreeze、Week40のミドルウェアとGate。サーバー管理のis_adminという条件を設問で指定。
- 概念: ph3-week40-gate-admin
- 類題: ph3-week40-assembly-gate-admin / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

Userのis_adminはサーバーで管理する真偽値です。manage-quizzesゲートを、管理者の時だけ許可するよう定義してください。

```php
<?php
use Illuminate\Support\Facades\Gate;
Gate::define('manage-quizzes', function ($user) {
  return __BLANK__;
});
```

- correct: $user->is_admin（正答）
- wrong: !$user->is_admin

達成条件: Userのis_adminはサーバーで管理する真偽値です。manage-quizzesゲートを、管理者の時だけ許可するよう定義してください。

ヒント: ゲートは許可する時にtrueを返します。

解説: サーバーの管理者属性で許可を判断します。PCではControllerなどサーバー側でもゲートを適用しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 固定入力で正誤比較。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: 否定すると一般ユーザーを許可し、管理者を拒否する条件になります。

## question-ph3-week40-assembly-authorize-request（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: manage-quizzesゲートは登録済みです。管理用の更新処理を実行する前に、その権限をサーバーで要求してください。
- 出典: curriculum/PH3.md:530 / Week 40
- ドリル接続: PH3 Week40のPOSSE課題へ接続。ボタンの非表示だけでなく直接リクエストも拒否できるか確認しましょう。
- 既習: Week33のBreeze、Week40のミドルウェアとGate。サーバー管理のis_adminという条件を設問で指定。
- 概念: ph3-week40-authorize-request
- 類題: ph3-week40-assembly-authorize-request / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

manage-quizzesゲートは登録済みです。管理用の更新処理を実行する前に、その権限をサーバーで要求してください。

```php
<?php
use Illuminate\Support\Facades\Gate;
__BLANK__;
// この後にクイズの更新処理
```

- correct: Gate::authorize('manage-quizzes')（正答）
- wrong: Gate::allows('manage-quizzes')

達成条件: manage-quizzesゲートは登録済みです。管理用の更新処理を実行する前に、その権限をサーバーで要求してください。

ヒント: 許可できない時に例外で止めるメソッドを使います。

解説: authorizeは許可できない場合403につなぎます。PCではボタンの非表示だけでなく直接リクエストも拒否できるか確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: allowsの戻り値を無視しただけでは、拒否された時に処理を止められません。

## question-ph3-week40-choice-auth-versus-admin（版1・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: 提示条件に対して「管理者権限があるかの認可」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:530 / Week 40
- ドリル接続: PH3 Week40のPOSSE課題。一般ユーザーで管理URLを直接開いて確認しましょう。
- 既習: Week33のBreeze、Week40のミドルウェアとGate。サーバー管理のis_adminという条件を設問で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week40-auth-versus-admin
- 類題: ph3-week40-choice-auth-versus-admin / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

authミドルウェアを付けた管理ページへ一般ユーザーがログインしてアクセスできました。追加すべき確認はどれですか？

- wrong2: ページタイトルが管理画面かだけを見る
- wrong3: URLにadminが含まれるかだけを見る
- correct: 管理者権限があるかの認可（正答）
- wrong1: ログイン済みかだけをもう一度見る

達成条件: 条件に適合する候補を1つ選ぶ：管理者権限があるかの認可

ヒント: 本人の確認と操作権限の確認は別です。

解説: 認証に加えて管理者に許可する認可が必要です。 PCでは一般ユーザーで管理URLを直接開いて確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 一般ユーザーもログイン済みなので管理者の判定になりません。
- 誤答wrong2: タイトルはサーバー側の権限を保証しません。
- 誤答wrong3: URLの文字列だけでは利用者の権限を判定できません。

## question-ph3-week40-choice-middleware-role（版1・published）

- 形式: choice
- 主対象: 言葉の理解
- 学習目標: 提示条件に対して「リクエストの途中で共通の条件を確認し処理を通すか決める」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:530 / Week 40
- ドリル接続: PH3 Week40のPOSSE課題。管理ルート群に必要なミドルウェアが付くか確認しましょう。
- 既習: Week33のBreeze、Week40のミドルウェアとGate。サーバー管理のis_adminという条件を設問で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week40-middleware-role
- 類題: ph3-week40-choice-middleware-role / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

管理画面の複数ルートに共通のアクセス条件を付けます。ミドルウェアの役割はどれですか？

- wrong3: コンパイル後のCSSを圧縮する
- correct: リクエストの途中で共通の条件を確認し処理を通すか決める（正答）
- wrong1: 管理画面の文字だけを太くする
- wrong2: DBの全行へ同じ名前を入れる

達成条件: 条件に適合する候補を1つ選ぶ：リクエストの途中で共通の条件を確認し処理を通すか決める

ヒント: 個別アクションの前などに共通処理を置きます。

解説: 共通の認証・認可条件をルートへ適用できます。 PCでは管理ルート群に必要なミドルウェアが付くか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: ミドルウェアは表示の装飾ではありません。
- 誤答wrong2: データの一括上書きが目的ではありません。
- 誤答wrong3: アセットのビルドとアクセス制御は別です。

## question-ph3-week40-choice-hidden-button-insufficient（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「削除リクエストを受けるサーバー側でも認可する」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:530 / Week 40
- ドリル接続: PH3 Week40のPOSSE課題。一般ユーザーで削除URLへ直接送信して拒否されるか確認しましょう。
- 既習: Week33のBreeze、Week40のミドルウェアとGate。サーバー管理のis_adminという条件を設問で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week40-hidden-button-insufficient
- 類題: ph3-week40-choice-hidden-button-insufficient / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

一般ユーザーには削除ボタンを表示しません。削除処理を守るために必要なことはどれですか？

- correct: 削除リクエストを受けるサーバー側でも認可する（正答）
- wrong1: ボタンの文字色だけを白くする
- wrong2: ボタンを非表示にしたのでサーバー側の確認を外す
- wrong3: 削除URLを長くするだけ

達成条件: 条件に適合する候補を1つ選ぶ：削除リクエストを受けるサーバー側でも認可する

ヒント: 画面以外からリクエストを送れる点を考えます。

解説: 表示の制御とサーバー側の認可を両方行います。 PCでは一般ユーザーで削除URLへ直接送信して拒否されるか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: リクエストを直接送る操作を防げません。
- 誤答wrong2: 非表示は削除権限を保証しません。
- 誤答wrong3: URLを知った利用者からのリクエストを拒否できません。

## question-ph3-week40-choice-gate-enforce（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「Gate::authorize("manage-quizzes");」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:530 / Week 40
- ドリル接続: PH3 Week40のPOSSE課題。拒否された場合にDB更新が行われないか確認しましょう。
- 既習: Week33のBreeze、Week40のミドルウェアとGate。サーバー管理のis_adminという条件を設問で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week40-gate-enforce
- 類題: ph3-week40-choice-gate-enforce / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

manage-quizzesゲートを定義済みです。Controllerで許可されない場合に処理を止める呼び出しはどれですか？

- wrong1: Gate::allows("manage-quizzes"); の結果を無視する
- wrong2: route("manage-quizzes");
- wrong3: view("admin.index");
- correct: Gate::authorize("manage-quizzes");（正答）

達成条件: 条件に適合する候補を1つ選ぶ：Gate::authorize("manage-quizzes");

ヒント: 拒否時に例外で止める仕組みを選びます。

解説: authorizeで不許可の場合に処理を中断します。 PCでは拒否された場合にDB更新が行われないか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 真偽値を無視すると後続の処理が実行されます。
- 誤答wrong2: URL生成であり権限確認ではありません。
- 誤答wrong3: 画面を返すだけで権限を強制しません。

## question-ph3-week40-choice-server-admin-flag（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「サーバー側の管理された手段で付与し、一般登録の入力を採用しない」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:530 / Week 40
- ドリル接続: PH3 Week40のPOSSE課題。一般登録からis_adminを送っても権限が増えないか確認しましょう。
- 既習: Week33のBreeze、Week40のミドルウェアとGate。サーバー管理のis_adminという条件を設問で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week40-server-admin-flag
- 類題: ph3-week40-choice-server-admin-flag / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

is_adminで管理者を判定する設計です。この値の設定方法として適切なのはどれですか？

- wrong2: URLの?is_admin=1だけで管理者にする
- wrong3: 画面のボタン名がadminなら管理者にする
- correct: サーバー側の管理された手段で付与し、一般登録の入力を採用しない（正答）
- wrong1: 登録フォームのhidden入力をそのまま保存する

達成条件: 条件に適合する候補を1つ選ぶ：サーバー側の管理された手段で付与し、一般登録の入力を採用しない

ヒント: 利用者が自由に書き換えられる入力を信頼しません。

解説: 管理権限の付与はサーバー側で管理します。 PCでは一般登録からis_adminを送っても権限が増えないか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: hidden入力も利用者が改変できます。
- 誤答wrong2: URLの値は利用者が指定できます。
- 誤答wrong3: 表示名は利用者の権限ではありません。

## question-ph3-week40-choice-general-user-redirect（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「websiteのトップページ」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:530 / Week 40
- ドリル接続: PH3 Week40のPOSSE課題。一般ユーザーで直接/adminを開き遷移先を確認しましょう。
- 既習: Week33のBreeze、Week40のミドルウェアとGate。サーバー管理のis_adminという条件を設問で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week40-general-user-redirect
- 類題: ph3-week40-choice-general-user-redirect / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

Week40の課題では、管理者でない人が管理URLを直接開いたとき、どこへ移動させますか？

- wrong3: 管理用の編集フォームへ進める
- correct: websiteのトップページ（正答）
- wrong1: 管理者として/adminへ入れる
- wrong2: 自動的に全ユーザーを削除する

達成条件: 条件に適合する候補を1つ選ぶ：websiteのトップページ

ヒント: この週の課題で指定された導線です。

解説: 管理者以外はwebsiteのトップへリダイレクトします。 PCでは一般ユーザーで直接/adminを開き遷移先を確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 課題のアクセス制御に反します。
- 誤答wrong2: 権限のない閲覧への応答として不適切です。
- 誤答wrong3: 管理者以外のアクセスを防げません。

## question-ph3-week40-choice-admin-redirect（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「/adminのダッシュボード」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:530 / Week 40
- ドリル接続: PH3 Week40のPOSSE課題。管理者と一般ユーザーで遷移先が分かれるか確認しましょう。
- 既習: Week33のBreeze、Week40のミドルウェアとGate。サーバー管理のis_adminという条件を設問で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week40-admin-redirect
- 類題: ph3-week40-choice-admin-redirect / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

管理者のログインが成功し、権限も確認済みです。Week40で指定された遷移先はどれですか？

- correct: /adminのダッシュボード（正答）
- wrong1: 必ず/registerへ戻す
- wrong2: ログインPOSTを同じURLへ繰り返す
- wrong3: 無関係なクイズを削除するURL

達成条件: 条件に適合する候補を1つ選ぶ：/adminのダッシュボード

ヒント: ログイン成功後に管理者用の入口へ進みます。

解説: 認証・認可の後に管理ダッシュボードへ移動します。 PCでは管理者と一般ユーザーで遷移先が分かれるか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 認証済み管理者のダッシュボードへの導線と異なります。
- 誤答wrong2: 画面遷移にならずループの原因にもなります。
- 誤答wrong3: ログイン後の管理画面表示と異なります。

## question-ph3-week40-choice-gate-view（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「@can("manage-quizzes") … @endcan」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:530 / Week 40
- ドリル接続: PH3 Week40のPOSSE課題。管理者と一般ユーザーでリンク表示を比較しましょう。
- 既習: Week33のBreeze、Week40のミドルウェアとGate。サーバー管理のis_adminという条件を設問で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week40-gate-view
- 類題: ph3-week40-choice-gate-view / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

manage-quizzesゲートに通る場合だけ管理リンクをBladeで表示します。適した構文はどれですか？

- wrong1: @csrf … だけ
- wrong2: @foreach ("manage-quizzes" as $item) … @endforeach
- wrong3: {{ "manage-quizzes" }}だけ
- correct: @can("manage-quizzes") … @endcan（正答）

達成条件: 条件に適合する候補を1つ選ぶ：@can("manage-quizzes") … @endcan

ヒント: Bladeからゲートの許可を参照します。

解説: canで認可に応じて表示を分けられます。 PCでは管理者と一般ユーザーでリンク表示を比較しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: CSRFトークンは権限による表示分岐ではありません。
- 誤答wrong2: 文字列を繰り返しても権限確認になりません。
- 誤答wrong3: ゲート名を表示しても許可判定しません。

## question-ph3-week40-choice-redirect-loop-investigation（版1・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: 提示条件に対して「ルートのアクションとリダイレクト先、適用ミドルウェア」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:530 / Week 40
- ドリル接続: week40-1の関連ドリル。開発ツールのNetworkでリダイレクト先を追いましょう。
- 既習: Week33のBreeze、Week40のミドルウェアとGate。サーバー管理のis_adminという条件を設問で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week40-redirect-loop-investigation
- 類題: ph3-week40-choice-redirect-loop-investigation / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

GET /loginが繰り返し同じ場所へリダイレクトされます。まず確認する対象はどれですか？

- wrong2: 一覧の文字サイズだけ
- wrong3: DBのすべてのクイズを削除
- correct: ルートのアクションとリダイレクト先、適用ミドルウェア（正答）
- wrong1: faviconの縦横比だけ

達成条件: 条件に適合する候補を1つ選ぶ：ルートのアクションとリダイレクト先、適用ミドルウェア

ヒント: どの応答が次のリクエストを生むかたどります。

解説: ルートと認証条件と移動先を対応させて循環を探します。 PCでは開発ツールのNetworkでリダイレクト先を追いましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: リダイレクト先の連鎖は確認できません。
- 誤答wrong2: 認証のリダイレクト条件とは別です。
- 誤答wrong3: 原因を調べずデータを消す必要はありません。

## question-ph3-week40-choice-admin-test-matrix（版1・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: 提示条件に対して「未ログイン・一般ユーザー・管理者で直接URLを開く」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:530 / Week 40
- ドリル接続: PH3 Week40のPOSSE課題。3種類の状態で応答と遷移先を記録しましょう。
- 既習: Week33のBreeze、Week40のミドルウェアとGate。サーバー管理のis_adminという条件を設問で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week40-admin-test-matrix
- 類題: ph3-week40-choice-admin-test-matrix / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

管理ページのアクセス制御を確認する組み合わせはどれですか？

- wrong3: URLの名前にadminがあるかだけを見る
- correct: 未ログイン・一般ユーザー・管理者で直接URLを開く（正答）
- wrong1: 管理者でリンクを1回押すだけ
- wrong2: CSSを読み込まず画面を見るだけ

達成条件: 条件に適合する候補を1つ選ぶ：未ログイン・一般ユーザー・管理者で直接URLを開く

ヒント: 許可される人と拒否される人を分けて試します。

解説: 異なる認証・認可状態でURLへの直接アクセスも確認します。 PCでは3種類の状態で応答と遷移先を記録しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 未ログインや一般ユーザーの拒否を確認できません。
- 誤答wrong2: 利用者ごとの権限の違いを確認できません。
- 誤答wrong3: 実際の認証・認可の動作を確認できません。
