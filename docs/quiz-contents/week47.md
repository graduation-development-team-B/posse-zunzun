# Week47｜管理者画面・環境確認

15問。言葉の理解: 0 / 知識の選択: 7 / 知識の組み立て: 5 / 結果の確認・修正: 3

作者向け資料。独立問題。公開されるのは制作状態publishedの問題。

## question-ph3-week47-assembly-admin-route-group（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: 標準authと、登録済みのadminミドルウェアで管理者一覧を保護してください。adminはサーバーで管理者を確認します。
- 出典: curriculum/PH3.md:868 / Week 47
- ドリル接続: PH3 Week47のPOSSE課題へ接続。一般ユーザーの直接アクセスも確認しましょう。
- 既習: Week40の認証・認可とWeek46の記事アプリ。管理者属性の取り扱いとコンテナ名は設問内で指定。
- 概念: ph3-week47-admin-route-group
- 類題: ph3-week47-assembly-admin-route-group / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

標準authと、登録済みのadminミドルウェアで管理者一覧を保護してください。adminはサーバーで管理者を確認します。

```php
<?php
use Illuminate\Support\Facades\Route;
Route::middleware(__BLANK__)->group(function () {
  // この中に管理者一覧のGETルートを登録する
});
```

- correct: ['auth', 'admin']（正答）
- wrong: ['auth']

達成条件: 標準authと、登録済みのadminミドルウェアで管理者一覧を保護してください。adminはサーバーで管理者を確認します。

ヒント: 認証と管理者の確認を両方適用します。

解説: 2つのミドルウェアでグループを保護します。PCでは一般ユーザーの直接アクセスも確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: ログイン確認だけでは一般ユーザーも管理者一覧へ入れてしまいます。

## question-ph3-week47-assembly-list-admin-users（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: Userのis_adminはサーバーで管理する真偽値です。管理者一覧のため、trueの利用者だけ取得してください。一覧へのアクセス認可は確認済みです。
- 出典: curriculum/PH3.md:868 / Week 47
- ドリル接続: PH3 Week47のPOSSE課題へ接続。管理者と一般ユーザーの2種類で表示を比べましょう。
- 既習: Week40の認証・認可とWeek46の記事アプリ。管理者属性の取り扱いとコンテナ名は設問内で指定。
- 概念: ph3-week47-list-admin-users
- 類題: ph3-week47-assembly-list-admin-users / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

Userのis_adminはサーバーで管理する真偽値です。管理者一覧のため、trueの利用者だけ取得してください。一覧へのアクセス認可は確認済みです。

```php
<?php
 $admins = User::__BLANK__;
```

- correct: where('is_admin', true)->get()（正答）
- wrong: where('is_admin', false)->get()

達成条件: Userのis_adminはサーバーで管理する真偽値です。管理者一覧のため、trueの利用者だけ取得してください。一覧へのアクセス認可は確認済みです。

ヒント: 管理者属性がtrueの行へ限定します。

解説: whereで管理者だけを絞ります。PCでは管理者と一般ユーザーの2種類で表示を比べましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: falseでは管理者でない利用者を取得します。

## question-ph3-week47-assembly-define-admin-gate（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: view-adminsゲートを、認証済み$userが管理者ならtrueになるよう定義してください。is_adminはサーバー管理です。
- 出典: curriculum/PH3.md:868 / Week 47
- ドリル接続: PH3 Week47のPOSSE課題へ接続。一覧のControllerでもこのゲートを要求しましょう。
- 既習: Week40の認証・認可とWeek46の記事アプリ。管理者属性の取り扱いとコンテナ名は設問内で指定。
- 概念: ph3-week47-define-admin-gate
- 類題: ph3-week47-assembly-define-admin-gate / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

view-adminsゲートを、認証済み$userが管理者ならtrueになるよう定義してください。is_adminはサーバー管理です。

```php
<?php
use Illuminate\Support\Facades\Gate;
Gate::define('view-admins', function ($user) { return __BLANK__; });
```

- correct: $user->is_admin（正答）
- wrong: !$user->is_admin

達成条件: view-adminsゲートを、認証済み$userが管理者ならtrueになるよう定義してください。is_adminはサーバー管理です。

ヒント: 許可条件をそのまま真偽値で返します。

解説: 管理者属性で許可を決めます。PCでは一覧のControllerでもこのゲートを要求しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 固定入力で正誤比較。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: 否定すると一般ユーザーを許可してしまいます。

## question-ph3-week47-assembly-admin-named-redirect（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: ログインと管理者確認は成功済みです。登録済みの名前付きルートadmin.indexへリダイレクトしてください。
- 出典: curriculum/PH3.md:868 / Week 47
- ドリル接続: PH3 Week47のPOSSE課題へ接続。ログイン前と一般ユーザーの導線も分けて確認しましょう。
- 既習: Week40の認証・認可とWeek46の記事アプリ。管理者属性の取り扱いとコンテナ名は設問内で指定。
- 概念: ph3-week47-admin-named-redirect
- 類題: ph3-week47-assembly-admin-named-redirect / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

ログインと管理者確認は成功済みです。登録済みの名前付きルートadmin.indexへリダイレクトしてください。

```php
<?php
function afterAdminLogin() {
  return __BLANK__;
}
```

- correct: redirect()->route('admin.index')（正答）
- wrong: redirect()->route('login')

達成条件: ログインと管理者確認は成功済みです。登録済みの名前付きルートadmin.indexへリダイレクトしてください。

ヒント: 登録済みの移動先ルート名を指定します。

解説: redirect()->routeで管理画面へ移動します。PCではログイン前と一般ユーザーの導線も分けて確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: ログイン画面へ戻す指定で、確認済み管理者を管理画面へ進められません。

## question-ph3-week47-assembly-node-version-check（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: nodeコンテナ内です。Node.jsの実際のバージョンを表示し、別途確認したLTSの指定と照合するコマンドを組み立ててください。
- 出典: curriculum/PH3.md:868 / Week 47
- ドリル接続: week47-1の関連ドリルへ接続。現在の公式LTS情報とDockerのimage指定を照合しましょう。
- 既習: Week40の認証・認可とWeek46の記事アプリ。管理者属性の取り扱いとコンテナ名は設問内で指定。
- 概念: ph3-week47-node-version-check
- 類題: ph3-week47-assembly-node-version-check / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

nodeコンテナ内です。Node.jsの実際のバージョンを表示し、別途確認したLTSの指定と照合するコマンドを組み立ててください。

```sh
__BLANK__
```

- correct: node --version（正答）
- wrong: npm --version

達成条件: nodeコンテナ内です。Node.jsの実際のバージョンを表示し、別途確認したLTSの指定と照合するコマンドを組み立ててください。

ヒント: バージョンを調べたい実行環境のコマンドを使います。

解説: node --versionで本体のバージョンを表示します。PCでは現在の公式LTS情報とDockerのimage指定を照合しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。sh -nによる構文確認のみ。コマンドは実行しない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: npmのバージョンを見てもNode.js本体のバージョン確認にはなりません。

## question-ph3-week47-choice-admin-list-auth（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「ログイン済みで、サーバー側で管理者権限も確認する」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:868 / Week 47
- ドリル接続: PH3 Week47のPOSSE課題。未ログイン・一般・管理者の3状態で確認しましょう。
- 既習: Week40の認証・認可とWeek46の記事アプリ。管理者属性の取り扱いとコンテナ名は設問内で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week47-admin-list-auth
- 類題: ph3-week47-choice-admin-list-auth / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

管理者一覧ページを守る条件はどれですか？

- correct: ログイン済みで、サーバー側で管理者権限も確認する（正答）
- wrong1: ログインしていれば一般ユーザーも全員許可する
- wrong2: URLを/adminsにしただけで許可する
- wrong3: ログイン画面へ管理者と書くだけ

達成条件: 条件に適合する候補を1つ選ぶ：ログイン済みで、サーバー側で管理者権限も確認する

ヒント: 認証と管理者の認可を組み合わせます。

解説: 管理者だけが許可される条件をサーバーで強制します。 PCでは未ログイン・一般・管理者の3状態で確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 管理者専用という要件を満たしません。
- 誤答wrong2: パス名だけでは認証・認可になりません。
- 誤答wrong3: 表示文はアクセス制御を強制しません。

## question-ph3-week47-choice-admin-only-records（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「User::where("is_admin", true)->get()」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:868 / Week 47
- ドリル接続: PH3 Week47のPOSSE課題。管理者2人と一般ユーザーで表示対象を照合しましょう。
- 既習: Week40の認証・認可とWeek46の記事アプリ。管理者属性の取り扱いとコンテナ名は設問内で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week47-admin-only-records
- 類題: ph3-week47-choice-admin-only-records / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

Userのis_adminはbooleanへcast済みです。管理者一覧へ管理者だけを取得する条件はどれですか？

- wrong1: User::all()
- wrong2: User::where("is_admin", false)->get()
- wrong3: User::where("name", "admin")->get()
- correct: User::where("is_admin", true)->get()（正答）

達成条件: 条件に適合する候補を1つ選ぶ：User::where("is_admin", true)->get()

ヒント: 権限を表すサーバー管理の属性で絞ります。

解説: is_adminの値で管理者の行だけを取得します。 PCでは管理者2人と一般ユーザーで表示対象を照合しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 一般ユーザーも含まれます。
- 誤答wrong2: 管理者ではない利用者を取得します。
- 誤答wrong3: 表示名がadminであることと管理者権限は別です。

## question-ph3-week47-choice-login-page-not-proof（版1・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: 提示条件に対して「扱わず、認証後に管理者権限も確認する」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:868 / Week 47
- ドリル接続: PH3 Week47のPOSSE課題。一般アカウントで管理者用ログインを試して確認しましょう。
- 既習: Week40の認証・認可とWeek46の記事アプリ。管理者属性の取り扱いとコンテナ名は設問内で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week47-login-page-not-proof
- 類題: ph3-week47-choice-login-page-not-proof / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

管理者用ログインページから一般ユーザーがログインしました。ページを通っただけで管理者と扱ってよいですか？

- wrong2: ページ名にadminがあるので確認を省く
- wrong3: メールアドレスを知らなくても常に管理者にする
- correct: 扱わず、認証後に管理者権限も確認する（正答）
- wrong1: そのページを通った人は全員管理者とする

達成条件: 条件に適合する候補を1つ選ぶ：扱わず、認証後に管理者権限も確認する

ヒント: 認証に成功したことと管理者であることを分けます。

解説: 認証された利用者の管理権限を別途確認します。 PCでは一般アカウントで管理者用ログインを試して確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 入口の画面は権限の証明ではありません。
- 誤答wrong2: ページ名から利用者の権限は分かりません。
- 誤答wrong3: 本人の認証も管理者認可も必要です。

## question-ph3-week47-choice-admin-flag-not-request（版1・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: 提示条件に対して「リクエスト値ではなく認証済み利用者の権限で判定する」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:868 / Week 47
- ドリル接続: PH3 Week47のPOSSE課題。クエリ値を変えても一般ユーザーが入れないか確認しましょう。
- 既習: Week40の認証・認可とWeek46の記事アプリ。管理者属性の取り扱いとコンテナ名は設問内で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week47-admin-flag-not-request
- 類題: ph3-week47-choice-admin-flag-not-request / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

管理画面へ?is_admin=1を付けると一般ユーザーも入れました。原因への修正はどれですか？

- wrong3: すべての利用者を管理者へ更新する
- correct: リクエスト値ではなく認証済み利用者の権限で判定する（正答）
- wrong1: パラメーター名を長くするだけ
- wrong2: 管理リンクを小さくするだけ

達成条件: 条件に適合する候補を1つ選ぶ：リクエスト値ではなく認証済み利用者の権限で判定する

ヒント: 利用者が指定できる値を権限の根拠にしません。

解説: サーバー側に保持した認証済み利用者の権限を参照します。 PCではクエリ値を変えても一般ユーザーが入れないか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 利用者が送る値を信頼する問題が残ります。
- 誤答wrong2: 直接URLへの要求を防げません。
- 誤答wrong3: 必要な権限制御を失います。

## question-ph3-week47-choice-admin-controller-gate（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「Gate::authorize("view-admins");」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:868 / Week 47
- ドリル接続: PH3 Week47のPOSSE課題。一般ユーザーに一覧データを返していないか確認しましょう。
- 既習: Week40の認証・認可とWeek46の記事アプリ。管理者属性の取り扱いとコンテナ名は設問内で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week47-admin-controller-gate
- 類題: ph3-week47-choice-admin-controller-gate / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

管理者一覧の認可ゲートview-adminsは定義済みです。許可されなければ中断する処理はどれですか？

- correct: Gate::authorize("view-admins");（正答）
- wrong1: Gate::allows("view-admins"); を呼んで結果を無視する
- wrong2: return view("admins.index"); だけ
- wrong3: route("admins.index"); だけ

達成条件: 条件に適合する候補を1つ選ぶ：Gate::authorize("view-admins");

ヒント: 拒否されたときに処理を止めます。

解説: authorizeで許可のないアクセスを中断します。 PCでは一般ユーザーに一覧データを返していないか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 拒否の真偽値を使わず後続の処理へ進めてしまいます。
- 誤答wrong2: 画面を返すだけでは許可を確認しません。
- 誤答wrong3: URLの生成であり認可の強制ではありません。

## question-ph3-week47-choice-admin-group-coverage（版1・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: 提示条件に対して「一覧ルートにも認証・管理者認可を適用する」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:868 / Week 47
- ドリル接続: PH3 Week47のPOSSE課題。管理URLを一つずつ直接開いて確認しましょう。
- 既習: Week40の認証・認可とWeek46の記事アプリ。管理者属性の取り扱いとコンテナ名は設問内で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week47-admin-group-coverage
- 類題: ph3-week47-choice-admin-group-coverage / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

管理トップは守られていますが、管理者一覧へ直接アクセスすると一般ユーザーにも表示されます。修正する箇所はどれですか？

- wrong1: トップの文字をさらに大きくする
- wrong2: 一覧リンクをトップから消すだけ
- wrong3: 全管理者の表示名を非公開へ変えるだけ
- correct: 一覧ルートにも認証・管理者認可を適用する（正答）

達成条件: 条件に適合する候補を1つ選ぶ：一覧ルートにも認証・管理者認可を適用する

ヒント: 入口の画面だけでなく各リクエストを守ります。

解説: 管理用の各ルートに共通の認証・認可を適用します。 PCでは管理URLを一つずつ直接開いて確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 一覧への直接アクセスを制限できません。
- 誤答wrong2: 直接URLの経路が残ります。
- 誤答wrong3: 一覧のアクセス制御は直りません。

## question-ph3-week47-choice-admin-list-safe-fields（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「必要ないため画面や一覧レスポンスへ含めない」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:868 / Week 47
- ドリル接続: PH3 Week47のPOSSE課題。HTMLやNetworkのレスポンスにも含まれないか確認しましょう。
- 既習: Week40の認証・認可とWeek46の記事アプリ。管理者属性の取り扱いとコンテナ名は設問内で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week47-admin-list-safe-fields
- 類題: ph3-week47-choice-admin-list-safe-fields / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

管理者一覧で名前とメールを表示します。認証用のパスワードハッシュについて適切な扱いはどれですか？

- wrong2: 名前の代わりに表示する
- wrong3: HTMLコメントなら必ず利用者に見えない
- correct: 必要ないため画面や一覧レスポンスへ含めない（正答）
- wrong1: ハッシュなら全利用者へ表示してよい

達成条件: 条件に適合する候補を1つ選ぶ：必要ないため画面や一覧レスポンスへ含めない

ヒント: 表示に必要な属性へ絞ります。

解説: 一覧の目的に不要な認証情報は返しません。 PCではHTMLやNetworkのレスポンスにも含まれないか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 不要な認証情報を一覧へ出す必要はありません。
- 誤答wrong2: 一覧の目的に合わず不要な情報を露出します。
- 誤答wrong3: HTMLコメントも受信した内容から読めます。

## question-ph3-week47-choice-node-lts-verification（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「Node.js公式のLTS指定とimageを照合し、起動後にnode --versionで確認する」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:868 / Week 47
- ドリル接続: week47-1の関連ドリル。コンテナ内で実際のバージョンを記録しましょう。
- 既習: Week40の認証・認可とWeek46の記事アプリ。管理者属性の取り扱いとコンテナ名は設問内で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week47-node-lts-verification
- 類題: ph3-week47-choice-node-lts-verification / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

教材のnodeコンテナをLTSへそろえます。適切な確認手順はどれですか？

- wrong3: composeを書き換えたので起動後の確認を省く
- correct: Node.js公式のLTS指定とimageを照合し、起動後にnode --versionで確認する（正答）
- wrong1: 古い教材のバージョンが永久にLTSだと判断する
- wrong2: npm --versionだけでNode.js本体の版も同じと判断する

達成条件: 条件に適合する候補を1つ選ぶ：Node.js公式のLTS指定とimageを照合し、起動後にnode --versionで確認する

ヒント: 設定値と実行環境の両方を確かめます。

解説: 現在の公式情報と実行中のNode.jsの版を対応させます。 PCではコンテナ内で実際のバージョンを記録しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: LTSの対象は時期によって変わります。
- 誤答wrong2: npmとNode.jsのバージョンは別です。
- 誤答wrong3: 実際に使われたコンテナの版は未確認です。

## question-ph3-week47-choice-compose-node-service（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「nodeサービスのimageのタグ」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:868 / Week 47
- ドリル接続: week47-1の関連ドリル。教材のcomposeと公式LTSの対応を確認しましょう。
- 既習: Week40の認証・認可とWeek46の記事アプリ。管理者属性の取り扱いとコンテナ名は設問内で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week47-compose-node-service
- 類題: ph3-week47-choice-compose-node-service / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

ComposeでnodeサービスのNode.jsの版を変えるため、まず確認する設定はどれですか？

- correct: nodeサービスのimageのタグ（正答）
- wrong1: MySQLのテーブル名
- wrong2: Bladeのh1の文言
- wrong3: 管理者のメールアドレス

達成条件: 条件に適合する候補を1つ選ぶ：nodeサービスのimageのタグ

ヒント: どのコンテナイメージを使うかの設定です。

解説: imageのタグが使うイメージの版を指定します。 PCでは教材のcomposeと公式LTSの対応を確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: Node.jsランタイムの版とは別です。
- 誤答wrong2: 表示文を変えてもランタイムは変わりません。
- 誤答wrong3: コンテナの実行環境を指定する値ではありません。

## question-ph3-week47-choice-admin-login-destination（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「return redirect()->route("admins.index");」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:868 / Week 47
- ドリル接続: PH3 Week47のPOSSE課題。成功後のURLと一覧の表示を確認しましょう。
- 既習: Week40の認証・認可とWeek46の記事アプリ。管理者属性の取り扱いとコンテナ名は設問内で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week47-admin-login-destination
- 類題: ph3-week47-choice-admin-login-destination / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

認証・管理者認可が成功したあと管理者一覧へ移動します。admins.indexが登録済みなら適した返却はどれですか？

- wrong1: return redirect()->route("login");
- wrong2: return view("register");
- wrong3: return User::all();
- correct: return redirect()->route("admins.index");（正答）

達成条件: 条件に適合する候補を1つ選ぶ：return redirect()->route("admins.index");

ヒント: 成功後の移動先を名前付きルートで示します。

解説: 認可後に管理者一覧へリダイレクトします。 PCでは成功後のURLと一覧の表示を確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: ログイン済み管理者を一覧へ進める指定ではありません。
- 誤答wrong2: 登録画面を表示する処理です。
- 誤答wrong3: 対象画面へのリダイレクトになりません。
