# Week45｜記事投稿・下書き・画像

15問。言葉の理解: 1 / 知識の選択: 7 / 知識の組み立て: 6 / 結果の確認・修正: 1

作者向け資料。独立問題。公開されるのは制作状態publishedの問題。

## question-ph3-week45-assembly-post-auth（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: 記事作成のPOST /postsへ、標準のauthミドルウェアを付けてください。PostControllerはimport済みです。
- 出典: curriculum/PH3.md:807 / Week 45
- ドリル接続: PH3 Week45のPOSSE課題へ接続。未ログインで直接POSTしても作成されないか確認しましょう。
- 既習: Week33〜44の認証・FormRequest・モデル・セッション。CarbonImmutableの前提は設問内で指定。
- 概念: ph3-week45-post-auth
- 類題: ph3-week45-assembly-post-auth / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

記事作成のPOST /postsへ、標準のauthミドルウェアを付けてください。PostControllerはimport済みです。

```php
<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
Route::post('/posts', [PostController::class, 'store'])->__BLANK__;
```

- correct: middleware('auth')（正答）
- wrong: middleware('guest')

達成条件: 記事作成のPOST /postsへ、標準のauthミドルウェアを付けてください。PostControllerはimport済みです。

ヒント: サーバー側の作成ルートを認証で保護します。

解説: authで投稿者のログインを要求します。PCでは未ログインで直接POSTしても作成されないか確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: guestは未ログイン用で、投稿をログイン必須にする指定ではありません。

## question-ph3-week45-assembly-post-required-fields（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: 記事のtitleを必須・文字列・100文字以内にします。詳細や画像は別ルールで検証済みとします。
- 出典: curriculum/PH3.md:807 / Week 45
- ドリル接続: PH3 Week45のPOSSE課題へ接続。不足時に保存されず、入力値とエラーが戻るか確認しましょう。
- 既習: Week33〜44の認証・FormRequest・モデル・セッション。CarbonImmutableの前提は設問内で指定。
- 概念: ph3-week45-post-required-fields
- 類題: ph3-week45-assembly-post-required-fields / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

記事のtitleを必須・文字列・100文字以内にします。詳細や画像は別ルールで検証済みとします。

```php
<?php
class StorePostRequest extends FormRequest {
  public function rules(): array {
    return ['title' => __BLANK__];
  }
}
```

- correct: ['required', 'string', 'max:100']（正答）
- wrong: ['nullable', 'string', 'max:100']

達成条件: 記事のtitleを必須・文字列・100文字以内にします。詳細や画像は別ルールで検証済みとします。

ヒント: 入力不足を防ぐルールを含めます。

解説: titleをrequiredで検証します。PCでは不足時に保存されず、入力値とエラーが戻るか確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: nullableではタイトルの未入力を拒否する必須条件になりません。

## question-ph3-week45-assembly-store-image（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: $requestのimageは画像として検証済みです。publicディスクのposts配下へ保存し、返されたパスを受け取ってください。Laravelのファイル保存APIを使います。
- 出典: curriculum/PH3.md:807 / Week 45
- ドリル接続: PH3 Week45のPOSSE課題へ接続。パスをDBへ保存し、設定した公開方法で画像を参照できるか確認しましょう。
- 既習: Week33〜44の認証・FormRequest・モデル・セッション。CarbonImmutableの前提は設問内で指定。
- 概念: ph3-week45-store-image
- 類題: ph3-week45-assembly-store-image / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

$requestのimageは画像として検証済みです。publicディスクのposts配下へ保存し、返されたパスを受け取ってください。Laravelのファイル保存APIを使います。

```php
<?php
 $path = $request->file('image')->__BLANK__;
```

- correct: store('posts', 'public')（正答）
- wrong: store('posts', 'local')

達成条件: $requestのimageは画像として検証済みです。publicディスクのposts配下へ保存し、返されたパスを受け取ってください。Laravelのファイル保存APIを使います。

ヒント: 保存先のディレクトリとディスクを分けて指定します。

解説: storeの第2引数でディスクを選びます。PCではパスをDBへ保存し、設定した公開方法で画像を参照できるか確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: localを指定するとpublicディスクへの保存という条件に合いません。

## question-ph3-week45-assembly-draft-session（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: $draftは下書きのtitleとbodyを含む配列です。LaravelのWebセッションへpost_draftというキーで保存してください。
- 出典: curriculum/PH3.md:807 / Week 45
- ドリル接続: PH3 Week45のPOSSE課題へ接続。別ページから戻った時に値が復元できるか確認しましょう。
- 既習: Week33〜44の認証・FormRequest・モデル・セッション。CarbonImmutableの前提は設問内で指定。
- 概念: ph3-week45-draft-session
- 類題: ph3-week45-assembly-draft-session / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

$draftは下書きのtitleとbodyを含む配列です。LaravelのWebセッションへpost_draftというキーで保存してください。

```php
<?php
__BLANK__;
```

- correct: session(['post_draft' => $draft])（正答）
- wrong: session('post_draft', $draft)

達成条件: $draftは下書きのtitleとbodyを含む配列です。LaravelのWebセッションへpost_draftというキーで保存してください。

ヒント: 保存はキーと値の配列で渡します。

解説: セッションへ下書きを保存します。PCでは別ページから戻った時に値が復元できるか確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: キーとデフォルト値の形式では読み取りになり、下書きを保存できません。

## question-ph3-week45-assembly-relative-seed-date（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: $nowはCarbonImmutableの日時、$iは1〜19です。$nowを変更せず、その$i日前の日時を求めてください。
- 出典: curriculum/PH3.md:807 / Week 45
- ドリル接続: week45-1の関連ドリルへ接続。基準日を固定して1日前と19日前を確認しましょう。
- 既習: Week33〜44の認証・FormRequest・モデル・セッション。CarbonImmutableの前提は設問内で指定。
- 概念: ph3-week45-relative-seed-date
- 類題: ph3-week45-assembly-relative-seed-date / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

$nowはCarbonImmutableの日時、$iは1〜19です。$nowを変更せず、その$i日前の日時を求めてください。

```php
<?php
 $studyDate = __BLANK__;
```

- correct: $now->subDays($i)（正答）
- wrong: $now->addDays($i)

達成条件: $nowはCarbonImmutableの日時、$iは1〜19です。$nowを変更せず、その$i日前の日時を求めてください。

ヒント: 過去へ日数を引くメソッドを選びます。

解説: subDays($i)で過去の日時を作ります。CarbonImmutableなので元の$nowは変わりません。PCでは基準日を固定して1日前と19日前を確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: addDaysは未来へ加算するため、過去$i日前になりません。

## question-ph3-week45-choice-post-required-fields（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「保存前に両方を必須として検証する」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:807 / Week 45
- ドリル接続: PH3 Week45のPOSSE課題。titleとbodyをそれぞれ空にして送信してみましょう。
- 既習: Week33〜44の認証・FormRequest・モデル・セッション。CarbonImmutableの前提は設問内で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week45-post-required-fields
- 類題: ph3-week45-choice-post-required-fields / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

POSSE MEDIAの記事作成で、titleとbodyは必須という要件です。サーバー側で必要な対応はどれですか？

- correct: 保存前に両方を必須として検証する（正答）
- wrong1: フォームの説明文へ必須と書くだけ
- wrong2: DBへ保存してから不足を調べる
- wrong3: titleだけあればbodyの不足を無視する

達成条件: 条件に適合する候補を1つ選ぶ：保存前に両方を必須として検証する

ヒント: 画面での案内と保存時の検証を分けます。

解説: 必要な項目はサーバーでも検証してから保存します。 PCではtitleとbodyをそれぞれ空にして送信してみましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 説明文だけでは未入力の送信を拒否できません。
- 誤答wrong2: 検証前に不完全な記事が残ってしまいます。
- 誤答wrong3: 両方必須という要件を満たしません。

## question-ph3-week45-choice-post-author-id（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「認証済みの利用者からサーバー側で取得したID」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:807 / Week 45
- ドリル接続: PH3 Week45のPOSSE課題。別のuser_idを送っても投稿者が変わらないか確認しましょう。
- 既習: Week33〜44の認証・FormRequest・モデル・セッション。CarbonImmutableの前提は設問内で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week45-post-author-id
- 類題: ph3-week45-choice-post-author-id / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

ログイン利用者のIDを記事のuser_idとして保存します。採用する値はどれですか？

- wrong1: フォームのuser_idを検証なしでそのまま採用
- wrong2: URLの?user_idだけを採用
- wrong3: すべての記事に固定値1を設定
- correct: 認証済みの利用者からサーバー側で取得したID（正答）

達成条件: 条件に適合する候補を1つ選ぶ：認証済みの利用者からサーバー側で取得したID

ヒント: 誰が送ったかはサーバーの認証状態から決めます。

解説: 投稿者は信頼できる認証情報に結び付けます。 PCでは別のuser_idを送っても投稿者が変わらないか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 利用者が他人のIDへ書き換えられます。
- 誤答wrong2: URLの値は利用者が指定できます。
- 誤答wrong3: 投稿者が異なる場合に正しく対応しません。

## question-ph3-week45-choice-session-draft-purpose（版1・published）

- 形式: choice
- 主対象: 言葉の理解
- 学習目標: 提示条件に対して「公開用の保存と分けて入力途中の内容を保持する」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:807 / Week 45
- ドリル接続: PH3 Week45のPOSSE課題。画面を移動して戻り、入力が復元されるか確認しましょう。
- 既習: Week33〜44の認証・FormRequest・モデル・セッション。CarbonImmutableの前提は設問内で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week45-session-draft-purpose
- 類題: ph3-week45-choice-session-draft-purpose / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

公開前の入力内容を同じ利用者が後で続けられるよう、セッションへ下書きを保存します。目的はどれですか？

- wrong2: ログインパスワードを記事本文へ追加する
- wrong3: 必須チェックを永久に不要にする
- correct: 公開用の保存と分けて入力途中の内容を保持する（正答）
- wrong1: すべての利用者へ記事を公開する

達成条件: 条件に適合する候補を1つ選ぶ：公開用の保存と分けて入力途中の内容を保持する

ヒント: 入力途中と公開を区別します。

解説: 下書き保存で入力を一時的に引き継げます。 PCでは画面を移動して戻り、入力が復元されるか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 下書きは公開済み記事とは区別します。
- 誤答wrong2: 下書きの目的ではなく秘密値を扱う場所でもありません。
- 誤答wrong3: 公開時の入力検証は別に必要です。

## question-ph3-week45-choice-draft-read-default（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「session("post_draft", [])」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:807 / Week 45
- ドリル接続: PH3 Week45のPOSSE課題。下書きあり・なしの両方で表示を確認しましょう。
- 既習: Week33〜44の認証・FormRequest・モデル・セッション。CarbonImmutableの前提は設問内で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week45-draft-read-default
- 類題: ph3-week45-choice-draft-read-default / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

セッションに下書きがあれば復元し、なければ空配列を使います。適した読み取りはどれですか？

- wrong3: view("post_draft")
- correct: session("post_draft", [])（正答）
- wrong1: session(["post_draft" => []])
- wrong2: session("post_draft")を常に文字列として連結する

達成条件: 条件に適合する候補を1つ選ぶ：session("post_draft", [])

ヒント: 読み取りの第2引数はデフォルト値です。

解説: キーがなければ空配列を返し、あれば保存値を読みます。 PCでは下書きあり・なしの両方で表示を確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 毎回空配列を書き込むため既存の下書きを消してしまいます。
- 誤答wrong2: 未保存時も含めて配列として扱う前提と異なります。
- 誤答wrong3: ビューの表示でありセッションの読み取りではありません。

## question-ph3-week45-choice-draft-clear-on-success（版1・published）

- 形式: choice
- 主対象: 知識の組み立て
- 学習目標: 提示条件に対して「成功後に対象の下書きキーだけをセッションから削除する」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:807 / Week 45
- ドリル接続: PH3 Week45のPOSSE課題。公開後に新規作成フォームを開いて確認しましょう。
- 既習: Week33〜44の認証・FormRequest・モデル・セッション。CarbonImmutableの前提は設問内で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week45-draft-clear-on-success
- 類題: ph3-week45-choice-draft-clear-on-success / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

下書きから記事を公開し、DB保存が成功しました。古い下書きが次の作成フォームへ残らない処理はどれですか？

- correct: 成功後に対象の下書きキーだけをセッションから削除する（正答）
- wrong1: 検証前にセッション全体を破棄する
- wrong2: 公開後も必ず同じ下書きを復元し続ける
- wrong3: DBの記事を削除して下書きだけ残す

達成条件: 条件に適合する候補を1つ選ぶ：成功後に対象の下書きキーだけをセッションから削除する

ヒント: 保存成功と下書きの片付けを対応させます。

解説: 成功後に不要になった下書きだけを消します。 PCでは公開後に新規作成フォームを開いて確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 失敗時の下書きや他のセッション情報まで失います。
- 誤答wrong2: 次の記事へ古い内容が残ります。
- 誤答wrong3: 公開した記事を保持する目的と異なります。

## question-ph3-week45-choice-uploaded-file-check（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「サーバーで画像であることや許可サイズを検証する」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:807 / Week 45
- ドリル接続: PH3 Week45のPOSSE課題。画像以外のファイルと上限超過でも拒否されるか確認しましょう。
- 既習: Week33〜44の認証・FormRequest・モデル・セッション。CarbonImmutableの前提は設問内で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week45-uploaded-file-check
- 類題: ph3-week45-choice-uploaded-file-check / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

記事画像を受け取ります。拡張子の文字列だけを信じる代わりに必要な対応はどれですか？

- wrong1: ファイル名がimageなら中身を確認しない
- wrong2: ブラウザのaccept属性だけで安全と判断する
- wrong3: 送信者が指定した絶対パスへそのまま保存する
- correct: サーバーで画像であることや許可サイズを検証する（正答）

達成条件: 条件に適合する候補を1つ選ぶ：サーバーで画像であることや許可サイズを検証する

ヒント: 送られたファイルも入力として検証します。

解説: 画像の内容とサイズなどの条件をサーバーで確認します。 PCでは画像以外のファイルと上限超過でも拒否されるか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: ファイル名だけでは内容は保証されません。
- 誤答wrong2: クライアント側の制限は回避できます。
- 誤答wrong3: 保存先を利用者任せにする必要はありません。

## question-ph3-week45-choice-upload-path-record（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「サーバーで保存したファイルのパス」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:807 / Week 45
- ドリル接続: PH3 Week45のPOSSE課題。保存後のパスから画像を表示できるか確認しましょう。
- 既習: Week33〜44の認証・FormRequest・モデル・セッション。CarbonImmutableの前提は設問内で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week45-upload-path-record
- 類題: ph3-week45-choice-upload-path-record / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

記事画像をストレージへ保存し、公開用のパスを得ました。記事の画像情報として扱う値はどれですか？

- wrong2: アップロードフォームのCSSクラス名
- wrong3: MySQLのログインパスワード
- correct: サーバーで保存したファイルのパス（正答）
- wrong1: 利用者PC上のC:\fakepathから始まる表示値

達成条件: 条件に適合する候補を1つ選ぶ：サーバーで保存したファイルのパス

ヒント: 利用者のPC上の場所と保存先を分けます。

解説: 保存したファイルを後で参照できるパスを記録します。 PCでは保存後のパスから画像を表示できるか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 利用者側の表示パスはサーバーの保存先ではありません。
- 誤答wrong2: 画像ファイルの保存先を表しません。
- 誤答wrong3: 画像の参照情報ではありません。

## question-ph3-week45-choice-login-required-post（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「保存処理の入口で認証を要求する」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:807 / Week 45
- ドリル接続: PH3 Week45のPOSSE課題。未ログインで直接送信して記事が増えないか確認しましょう。
- 既習: Week33〜44の認証・FormRequest・モデル・セッション。CarbonImmutableの前提は設問内で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week45-login-required-post
- 類題: ph3-week45-choice-login-required-post / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

未ログインの利用者から記事作成リクエストが届きました。ログイン必須の要件を守る対応はどれですか？

- wrong3: titleがあれば自動的に管理者として扱う
- correct: 保存処理の入口で認証を要求する（正答）
- wrong1: 投稿ボタンだけ非表示にして保存を許可する
- wrong2: 適当な既存ユーザーを投稿者にする

達成条件: 条件に適合する候補を1つ選ぶ：保存処理の入口で認証を要求する

ヒント: サーバーへ届くすべての保存経路を守ります。

解説: 認証された利用者だけが作成できるようにします。 PCでは未ログインで直接送信して記事が増えないか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 直接の送信が可能なので認証を強制できません。
- 誤答wrong2: 送信者本人の認証になりません。
- 誤答wrong3: 入力内容は利用者の認証情報ではありません。

## question-ph3-week45-choice-relative-seed-date（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「$base->subDays($i)」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:807 / Week 45
- ドリル接続: week45-1の関連ドリル。生成された日付が1日前ずつ分かれるか確認しましょう。
- 既習: Week33〜44の認証・FormRequest・モデル・セッション。CarbonImmutableの前提は設問内で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week45-relative-seed-date
- 類題: ph3-week45-choice-relative-seed-date / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

CarbonImmutableの$baseを今日とし、$i日前の日付を生成します。適した呼び出しはどれですか？

- correct: $base->subDays($i)（正答）
- wrong1: $base->addDays($i)
- wrong2: $base->subDays(1)を全行で使う
- wrong3: "2022-08-08"を全行へ固定

達成条件: 条件に適合する候補を1つ選ぶ：$base->subDays($i)

ヒント: 引く日数へループ変数を渡します。

解説: Immutableの基準日は変更せず、各$i日前を得られます。 PCでは生成された日付が1日前ずつ分かれるか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 過去ではなく未来の日付へ進みます。
- 誤答wrong2: すべて同じ1日前になり、$i日前になりません。
- 誤答wrong3: 実行時の日付からの相対日付になりません。

## question-ph3-week45-choice-seed-loop-boundary（版1・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: 提示条件に対して「1日前〜19日前の19件」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:807 / Week 45
- ドリル接続: week45-1の関連ドリル。ループの件数と最古の日付を照合しましょう。
- 既習: Week33〜44の認証・FormRequest・モデル・セッション。CarbonImmutableの前提は設問内で指定。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week45-seed-loop-boundary
- 類題: ph3-week45-choice-seed-loop-boundary / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

for ($i = 1; $i < 20; $i++)で、毎回$base->subDays($i)を使います。$baseはCarbonImmutableです。生成する日付の範囲はどれですか？

- wrong1: 1日前〜20日前の20件
- wrong2: 今日〜19日前の20件
- wrong3: 1日前だけを19件
- correct: 1日前〜19日前の19件（正答）

達成条件: 条件に適合する候補を1つ選ぶ：1日前〜19日前の19件

ヒント: 開始値と終了条件を両方読みます。

解説: 1以上20未満なので1〜19を使います。 PCではループの件数と最古の日付を照合しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 条件が$i < 20なので20は含みません。
- 誤答wrong2: 開始値は0ではなく1です。
- 誤答wrong3: $iは1ずつ増えるため引く日数も変わります。
