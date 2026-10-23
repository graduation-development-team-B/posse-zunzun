# Week48｜ユーザー管理・コメント

15問。言葉の理解: 1 / 知識の選択: 8 / 知識の組み立て: 5 / 結果の確認・修正: 1

作者向け資料。独立問題。公開されるのは制作状態publishedの問題。

## question-ph3-week48-assembly-user-soft-delete（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: 管理者のユーザー削除権限は確認済みです。UserはSoftDeletesを使いdeleted_at列もあります。取得済み$userを論理削除してください。
- 出典: curriculum/PH3.md:890 / Week 48
- ドリル接続: PH3 Week48のPOSSE課題へ接続。一覧表示とDBのdeleted_atを確認しましょう。
- 既習: Week47の管理者認可。Week39のSoftDeletes、Week43の関連保存、PH1のnpm scripts。
- 概念: ph3-week48-user-soft-delete
- 類題: ph3-week48-assembly-user-soft-delete / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

管理者のユーザー削除権限は確認済みです。UserはSoftDeletesを使いdeleted_at列もあります。取得済み$userを論理削除してください。

```php
<?php
__BLANK__;
```

- correct: $user->delete()（正答）
- wrong: $user->forceDelete()

達成条件: 管理者のユーザー削除権限は確認済みです。UserはSoftDeletesを使いdeleted_at列もあります。取得済み$userを論理削除してください。

ヒント: この設問では削除日時を残す操作を使います。

解説: SoftDeletesモデルのdeleteで論理削除します。PCでは一覧表示とDBのdeleted_atを確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: forceDeleteはユーザーの行を物理削除します。

## question-ph3-week48-assembly-create-post-comment（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: Commentのbodyはfillableです。$postはコメント可能と認可確認済みで、commentsはhasManyです。検証済み文字列$bodyからコメントを作ってください。投稿者IDはサーバー側の既存処理で設定されます。
- 出典: curriculum/PH3.md:890 / Week 48
- ドリル接続: PH3 Week48のPOSSE課題へ接続。別の記事へコメントが混ざらないか確認しましょう。
- 既習: Week47の管理者認可。Week39のSoftDeletes、Week43の関連保存、PH1のnpm scripts。
- 概念: ph3-week48-create-post-comment
- 類題: ph3-week48-assembly-create-post-comment / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

Commentのbodyはfillableです。$postはコメント可能と認可確認済みで、commentsはhasManyです。検証済み文字列$bodyからコメントを作ってください。投稿者IDはサーバー側の既存処理で設定されます。

```php
<?php
 $comment = __BLANK__;
```

- correct: $post->comments()->create(['body' => $body])（正答）
- wrong: $post->comments->create(['body' => $body])

達成条件: Commentのbodyはfillableです。$postはコメント可能と認可確認済みで、commentsはhasManyです。検証済み文字列$bodyからコメントを作ってください。投稿者IDはサーバー側の既存処理で設定されます。

ヒント: 親記事のリレーションへ属性配列を渡します。

解説: comments()->createで記事への所属を対応させます。PCでは別の記事へコメントが混ざらないか確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: 保存にはコレクションでなくcomments()のリレーションを使います。

## question-ph3-week48-assembly-comment-owner-policy（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: Commentのuser_idと、認証済みUserのidは整数です。updateポリシーで投稿者本人の時だけtrueを返してください。
- 出典: curriculum/PH3.md:890 / Week 48
- ドリル接続: PH3 Week48のPOSSE課題へ接続。本人と他人の両方で更新リクエストを試しましょう。
- 既習: Week47の管理者認可。Week39のSoftDeletes、Week43の関連保存、PH1のnpm scripts。
- 概念: ph3-week48-comment-owner-policy
- 類題: ph3-week48-assembly-comment-owner-policy / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

Commentのuser_idと、認証済みUserのidは整数です。updateポリシーで投稿者本人の時だけtrueを返してください。

```php
<?php
function update(User $user, Comment $comment): bool {
  return __BLANK__;
}
```

- correct: $user->id === $comment->user_id（正答）
- wrong: $user->id === $comment->id

達成条件: Commentのuser_idと、認証済みUserのidは整数です。updateポリシーで投稿者本人の時だけtrueを返してください。

ヒント: コメントの所属ユーザーIDと認証済みIDを比べます。

解説: user_idで投稿者を確認します。PCでは本人と他人の両方で更新リクエストを試しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 固定入力で正誤比較。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: コメント自身のidと利用者idを比べても、投稿者本人か判断できません。

## question-ph3-week48-assembly-authorize-comment-delete（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: Commentのdeleteポリシーは本人だけを許可します。取得済み$commentを消す前にControllerで権限を要求してください。
- 出典: curriculum/PH3.md:890 / Week 48
- ドリル接続: PH3 Week48のPOSSE課題へ接続。他人のコメントのIDを送っても消せないか確認しましょう。
- 既習: Week47の管理者認可。Week39のSoftDeletes、Week43の関連保存、PH1のnpm scripts。
- 概念: ph3-week48-authorize-comment-delete
- 類題: ph3-week48-assembly-authorize-comment-delete / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

Commentのdeleteポリシーは本人だけを許可します。取得済み$commentを消す前にControllerで権限を要求してください。

```php
<?php
class CommentController extends Controller {
  public function destroy($comment) {
    __BLANK__;
    $comment->delete();
  }
}
```

- correct: $this->authorize('delete', $comment)（正答）
- wrong: $this->authorize('view', $comment)

達成条件: Commentのdeleteポリシーは本人だけを許可します。取得済み$commentを消す前にControllerで権限を要求してください。

ヒント: これから行う操作に対応した権限を要求します。

解説: deleteの認可を通してから削除します。PCでは他人のコメントのIDを送っても消せないか確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: 閲覧を許可しても、その人がコメントを削除できるとは限りません。

## question-ph3-week48-assembly-mix-production（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: 旧ミニドリルのpackage.jsonでは、scripts.productionがNODE_ENV=productionでLaravel Mixを実行し、scripts.devは開発用です。productionを実行するコマンドを組み立ててください。Laravel 10標準のVite設定とは別の教材です。
- 出典: curriculum/PH3.md:890 / Week 48
- ドリル接続: week48-1の関連ドリルへ接続。生成先のJSと圧縮状態を確認しましょう。
- 既習: Week47の管理者認可。Week39のSoftDeletes、Week43の関連保存、PH1のnpm scripts。
- 概念: ph3-week48-mix-production
- 類題: ph3-week48-assembly-mix-production / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

旧ミニドリルのpackage.jsonでは、scripts.productionがNODE_ENV=productionでLaravel Mixを実行し、scripts.devは開発用です。productionを実行するコマンドを組み立ててください。Laravel 10標準のVite設定とは別の教材です。

```sh
__BLANK__
```

- correct: npm run production（正答）
- wrong: npm run dev

達成条件: 旧ミニドリルのpackage.jsonでは、scripts.productionがNODE_ENV=productionでLaravel Mixを実行し、scripts.devは開発用です。productionを実行するコマンドを組み立ててください。Laravel 10標準のVite設定とは別の教材です。

ヒント: このプロジェクトのscriptsのキーを読み取ります。

解説: npm run productionで指定された本番向けビルドを実行します。PCでは生成先のJSと圧縮状態を確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。sh -nによる構文確認のみ。コマンドは実行しない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: devは開発用で、指定したproductionのスクリプトを実行しません。

## question-ph3-week48-choice-user-list-admin（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「認証済みの管理者だけ許可する」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:890 / Week 48
- ドリル接続: PH3 Week48のPOSSE課題。一般ユーザーからの直接アクセスを確認しましょう。
- 既習: Week47の管理者認可。Week39のSoftDeletes、Week43の関連保存、PH1のnpm scripts。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week48-user-list-admin
- 類題: ph3-week48-choice-user-list-admin / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

管理者用ユーザー一覧のアクセス条件はどれですか？

- wrong2: ユーザー名にadminが含まれれば許可する
- wrong3: URLを知っていれば未ログインでも許可する
- correct: 認証済みの管理者だけ許可する（正答）
- wrong1: すべてのログイン利用者へ無条件に許可する

達成条件: 条件に適合する候補を1つ選ぶ：認証済みの管理者だけ許可する

ヒント: ログインと管理者権限の両方を確認します。

解説: 管理者専用のルートに認証と認可を適用します。 PCでは一般ユーザーからの直接アクセスを確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 一般ユーザーにも管理機能を開いてしまいます。
- 誤答wrong2: 表示名は管理者権限の証明ではありません。
- 誤答wrong3: 管理者専用の要件を満たしません。

## question-ph3-week48-choice-soft-delete-user-evidence（版1・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: 提示条件に対して「行がDBに残り、deleted_atに削除日時が入る」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:890 / Week 48
- ドリル接続: PH3 Week48のPOSSE課題。DBの削除日時と管理一覧の状態を照合しましょう。
- 既習: Week47の管理者認可。Week39のSoftDeletes、Week43の関連保存、PH1のnpm scripts。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week48-soft-delete-user-evidence
- 類題: ph3-week48-choice-soft-delete-user-evidence / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

UserはSoftDeletesです。管理者が$user->delete()した後の確認として正しいものはどれですか？

- wrong3: すべてのユーザーのidが0になる
- correct: 行がDBに残り、deleted_atに削除日時が入る（正答）
- wrong1: usersから必ず行が消える
- wrong2: passwordだけが空になる

達成条件: 条件に適合する候補を1つ選ぶ：行がDBに残り、deleted_atに削除日時が入る

ヒント: 行の存在と通常取得からの除外を分けて確認します。

解説: SoftDeletesのdeleteは削除日時を記録します。 PCではDBの削除日時と管理一覧の状態を照合しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: この前提では論理削除であり行は残ります。
- 誤答wrong2: 削除日時による状態管理です。
- 誤答wrong3: 対象1件の削除で主キーを全件変更しません。

## question-ph3-week48-choice-user-delete-server-check（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「削除処理でも管理者の認可を強制する」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:890 / Week 48
- ドリル接続: PH3 Week48のPOSSE課題。一般ユーザーから削除を要求し行が変わらないか確認しましょう。
- 既習: Week47の管理者認可。Week39のSoftDeletes、Week43の関連保存、PH1のnpm scripts。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week48-user-delete-server-check
- 類題: ph3-week48-choice-user-delete-server-check / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

管理者だけがユーザー削除できます。削除ボタンを隠す以外に必要な対応はどれですか？

- correct: 削除処理でも管理者の認可を強制する（正答）
- wrong1: 削除URLを長い文字列にするだけ
- wrong2: 確認モーダルを出せば認可を省く
- wrong3: フォームのis_admin=1を信頼する

達成条件: 条件に適合する候補を1つ選ぶ：削除処理でも管理者の認可を強制する

ヒント: 操作の入口でサーバーが権限を判断します。

解説: 直接送信されても管理者以外を拒否します。 PCでは一般ユーザーから削除を要求し行が変わらないか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: URLを知った利用者からの要求を拒否できません。
- 誤答wrong2: モーダルは管理者権限の確認ではありません。
- 誤答wrong3: 送信値は利用者が改変できます。

## question-ph3-week48-choice-comment-post-relation（版1・published）

- 形式: choice
- 主対象: 言葉の理解
- 学習目標: 提示条件に対して「コメントが属する記事を示す」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:890 / Week 48
- ドリル接続: PH3 Week48のPOSSE課題。同じ記事のコメントが同じpost_idを持つか確認しましょう。
- 既習: Week47の管理者認可。Week39のSoftDeletes、Week43の関連保存、PH1のnpm scripts。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week48-comment-post-relation
- 類題: ph3-week48-choice-comment-post-relation / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

comments.post_idがposts.idを参照します。この列の役割はどれですか？

- wrong1: コメントの投稿者を必ず示す
- wrong2: コメントが削除済みかを示す
- wrong3: 記事のタイトルの長さを示す
- correct: コメントが属する記事を示す（正答）

達成条件: 条件に適合する候補を1つ選ぶ：コメントが属する記事を示す

ヒント: 子コメントから親記事を指します。

解説: post_idで記事とコメントを関連付けます。 PCでは同じ記事のコメントが同じpost_idを持つか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 投稿者の参照は通常user_idで、post_idは記事です。
- 誤答wrong2: 削除日時やフラグの指定ではありません。
- 誤答wrong3: 記事の主キーへの参照です。

## question-ph3-week48-choice-comment-create-parent（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「$post->comments()->create(["body" => $body])」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:890 / Week 48
- ドリル接続: PH3 Week48のPOSSE課題。保存されたpost_idとbodyを確認しましょう。
- 既習: Week47の管理者認可。Week39のSoftDeletes、Week43の関連保存、PH1のnpm scripts。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week48-comment-create-parent
- 類題: ph3-week48-choice-comment-create-parent / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

commentsはhasManyでbodyはfillableです。記事$postに属するコメントを属性配列から作るものはどれですか？

- wrong2: $post->comments()->save(["body" => $body])
- wrong3: new Comment(["body" => $body])だけ
- correct: $post->comments()->create(["body" => $body])（正答）
- wrong1: $post->comments->create(["body" => $body])

達成条件: 条件に適合する候補を1つ選ぶ：$post->comments()->create(["body" => $body])

ヒント: 親のリレーションへ属性配列を渡します。

解説: createで親に関連するコメントを作れます。 PCでは保存されたpost_idとbodyを確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: コレクションではなくリレーションメソッドを使います。
- 誤答wrong2: saveはモデルインスタンスを受け取ります。
- 誤答wrong3: DB保存も記事への関連付けも行いません。

## question-ph3-week48-choice-comment-owner-reference（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「$user->id === $comment->user_id」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:890 / Week 48
- ドリル接続: PH3 Week48のPOSSE課題。他人のコメントで不許可になるか確認しましょう。
- 既習: Week47の管理者認可。Week39のSoftDeletes、Week43の関連保存、PH1のnpm scripts。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week48-comment-owner-reference
- 類題: ph3-week48-choice-comment-owner-reference / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

認証済みUserのidとCommentのuser_idは整数です。コメント投稿者本人を判定する比較はどれですか？

- wrong3: $user->name === $comment->body
- correct: $user->id === $comment->user_id（正答）
- wrong1: $user->id === $comment->id
- wrong2: $user->id === $comment->post_id

達成条件: 条件に適合する候補を1つ選ぶ：$user->id === $comment->user_id

ヒント: 投稿者への参照と現在の利用者を対応させます。

解説: commentのuser_idが認証済み利用者のidと一致するか調べます。 PCでは他人のコメントで不許可になるか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: コメント自身のIDでは投稿者を判定できません。
- 誤答wrong2: 記事のIDと利用者IDは別です。
- 誤答wrong3: 名前と本文の一致は投稿者の根拠になりません。

## question-ph3-week48-choice-comment-delete-authorize（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「$this->authorize("delete", $comment);」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:890 / Week 48
- ドリル接続: PH3 Week48のPOSSE課題。他人のIDで削除リクエストを送って拒否を確認しましょう。
- 既習: Week47の管理者認可。Week39のSoftDeletes、Week43の関連保存、PH1のnpm scripts。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week48-comment-delete-authorize
- 類題: ph3-week48-choice-comment-delete-authorize / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

Commentのdeleteポリシーは本人だけを許可します。削除前に行うものはどれですか？

- correct: $this->authorize("delete", $comment);（正答）
- wrong1: $this->authorize("view", $comment);
- wrong2: $comment->user_idを現在の利用者へ変更する
- wrong3: 削除ボタンの表示だけで許可と判断する

達成条件: 条件に適合する候補を1つ選ぶ：$this->authorize("delete", $comment);

ヒント: 対象と実行する操作の権限を確認します。

解説: 削除権限を確認してから削除します。 PCでは他人のIDで削除リクエストを送って拒否を確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 閲覧許可は削除許可と異なります。
- 誤答wrong2: 所有者を書き換えて認可を通すのは要件に反します。
- 誤答wrong3: サーバー側で直接のリクエストを確認できません。

## question-ph3-week48-choice-article-comments-filter（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「$post->comments」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:890 / Week 48
- ドリル接続: PH3 Week48のPOSSE課題。別の記事へコメントが混ざらないか確認しましょう。
- 既習: Week47の管理者認可。Week39のSoftDeletes、Week43の関連保存、PH1のnpm scripts。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week48-article-comments-filter
- 類題: ph3-week48-choice-article-comments-filter / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

記事詳細で、その記事のコメントだけを表示します。Postにcommentsを定義済みです。読むものはどれですか？

- wrong1: Comment::all()
- wrong2: User::all()
- wrong3: $post->user
- correct: $post->comments（正答）

達成条件: 条件に適合する候補を1つ選ぶ：$post->comments

ヒント: 詳細画面の親記事から関連をたどります。

解説: 親記事のcommentsで所属を限定します。 PCでは別の記事へコメントが混ざらないか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 他の記事のコメントも取得してしまいます。
- 誤答wrong2: 記事のコメントではなく利用者の一覧です。
- 誤答wrong3: 記事の投稿者でありコメント集合ではありません。

## question-ph3-week48-choice-comment-edit-fields（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「検証済みのbodyだけ」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:890 / Week 48
- ドリル接続: PH3 Week48のPOSSE課題。余分なuser_idやpost_idを送っても変わらないか確認しましょう。
- 既習: Week47の管理者認可。Week39のSoftDeletes、Week43の関連保存、PH1のnpm scripts。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week48-comment-edit-fields
- 類題: ph3-week48-choice-comment-edit-fields / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

本人確認後にコメント本文だけを更新します。保存対象として適切なのはどれですか？

- wrong2: 他人のコメントも一緒に同じ本文へ更新する
- wrong3: 入力検証を省いてすべてのキーを保存する
- correct: 検証済みのbodyだけ（正答）
- wrong1: 受信したuser_idとpost_idも無条件に保存する

達成条件: 条件に適合する候補を1つ選ぶ：検証済みのbodyだけ

ヒント: 本人確認と更新できる項目の限定を両方行います。

解説: 許可した本文だけを検証して更新します。 PCでは余分なuser_idやpost_idを送っても変わらないか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 投稿者や所属記事まで改変できてしまいます。
- 誤答wrong2: 対象のコメントだけを編集する要件と異なります。
- 誤答wrong3: 本文の条件も保存可能な属性の範囲も保証できません。

## question-ph3-week48-choice-legacy-build-script（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「npm run production」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:890 / Week 48
- ドリル接続: week48-1の関連ドリル。生成されたpublic/js/main.jsと圧縮状態を確認しましょう。
- 既習: Week47の管理者認可。Week39のSoftDeletes、Week43の関連保存、PH1のnpm scripts。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week48-legacy-build-script
- 類題: ph3-week48-choice-legacy-build-script / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

旧ドリルのscriptsはdevが開発用、productionが本番向けMixビルドです。productionを実行するものはどれですか？ Laravel 10標準のViteとは別の構成です。

- wrong3: php artisan migrate
- correct: npm run production（正答）
- wrong1: npm run dev
- wrong2: composer install

達成条件: 条件に適合する候補を1つ選ぶ：npm run production

ヒント: このプロジェクトのscriptsにあるキーを使います。

解説: npm run productionで指定された本番用ビルドを起動します。 PCでは生成されたpublic/js/main.jsと圧縮状態を確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: この構成では開発用のスクリプトです。
- 誤答wrong2: PHPの依存をそろえる処理で、指定のnpmスクリプトを実行しません。
- 誤答wrong3: DB構造を適用する処理で、アセットのビルドではありません。
