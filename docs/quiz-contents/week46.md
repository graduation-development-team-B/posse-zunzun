# Week46｜記事一覧・本人の編集削除

15問。言葉の理解: 0 / 知識の選択: 7 / 知識の組み立て: 5 / 結果の確認・修正: 3

作者向け資料。独立問題。公開されるのは制作状態publishedの問題。

## question-ph3-week46-assembly-posts-with-user（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: Postのuserリレーションは定義済みです。投稿者名を一覧で使うため、投稿者を先読みしid降順に取得してください。
- 出典: curriculum/PH3.md:840 / Week 46
- ドリル接続: PH3 Week46のPOSSE課題へ接続。投稿数を増やし、表示とクエリ数を確認しましょう。
- 既習: Week45の記事モデル。Week36〜40の先読み・論理削除・認可。JSへの受け渡しは関連ドリルの復習。
- 概念: ph3-week46-posts-with-user
- 類題: ph3-week46-assembly-posts-with-user / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

Postのuserリレーションは定義済みです。投稿者名を一覧で使うため、投稿者を先読みしid降順に取得してください。

```php
<?php
 $posts = Post::__BLANK__;
```

- correct: with('user')->orderBy('id', 'desc')->get()（正答）
- wrong: with('comments')->orderBy('id', 'desc')->get()

達成条件: Postのuserリレーションは定義済みです。投稿者名を一覧で使うため、投稿者を先読みしid降順に取得してください。

ヒント: 一覧で参照する関連の名前を指定します。

解説: with('user')で投稿者を先読みします。PCでは投稿数を増やし、表示とクエリ数を確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: commentsを先読みしても、必要な投稿者userは先読みされません。

## question-ph3-week46-assembly-owner-authorization（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: Postのupdateポリシーは「投稿者本人だけ許可」と実装済みです。Controllerで取得済み$postの更新権限を要求してください。
- 出典: curriculum/PH3.md:840 / Week 46
- ドリル接続: PH3 Week46のPOSSE課題へ接続。他人の投稿を直接更新しようとしても拒否されるか確認しましょう。
- 既習: Week45の記事モデル。Week36〜40の先読み・論理削除・認可。JSへの受け渡しは関連ドリルの復習。
- 概念: ph3-week46-owner-authorization
- 類題: ph3-week46-assembly-owner-authorization / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

Postのupdateポリシーは「投稿者本人だけ許可」と実装済みです。Controllerで取得済み$postの更新権限を要求してください。

```php
<?php
class PostController extends Controller {
  public function update($post) {
    __BLANK__;
    // この後で更新する
  }
}
```

- correct: $this->authorize('update', $post)（正答）
- wrong: $this->authorize('view', $post)

達成条件: Postのupdateポリシーは「投稿者本人だけ許可」と実装済みです。Controllerで取得済み$postの更新権限を要求してください。

ヒント: 実行する操作に対応したポリシー名を使います。

解説: updateと対象モデルをauthorizeへ渡します。PCでは他人の投稿を直接更新しようとしても拒否されるか確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: 閲覧の許可を確認しても、編集できる本人かどうかのupdate権限は要求できません。

## question-ph3-week46-assembly-soft-delete-post（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: PostはSoftDeletesを使い、deleted_at列があります。$postの削除権限確認は済んでいます。論理削除してください。
- 出典: curriculum/PH3.md:840 / Week 46
- ドリル接続: PH3 Week46のPOSSE課題へ接続。一覧から消え、DBに行が残ることを確認しましょう。
- 既習: Week45の記事モデル。Week36〜40の先読み・論理削除・認可。JSへの受け渡しは関連ドリルの復習。
- 概念: ph3-week46-soft-delete-post
- 類題: ph3-week46-assembly-soft-delete-post / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

PostはSoftDeletesを使い、deleted_at列があります。$postの削除権限確認は済んでいます。論理削除してください。

```php
<?php
__BLANK__;
```

- correct: $post->delete()（正答）
- wrong: $post->forceDelete()

達成条件: PostはSoftDeletesを使い、deleted_at列があります。$postの削除権限確認は済んでいます。論理削除してください。

ヒント: 論理削除モデルの通常の削除メソッドを使います。

解説: deleteで削除状態を記録します。PCでは一覧から消え、DBに行が残ることを確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: forceDeleteは行そのものを削除します。

## question-ph3-week46-assembly-post-detail（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: $idはルートで受け取った投稿IDです。Postを1件取得し、見つからなければ通常404としてください。
- 出典: curriculum/PH3.md:840 / Week 46
- ドリル接続: PH3 Week46のPOSSE課題へ接続。無効なIDの詳細URLを確認しましょう。
- 既習: Week45の記事モデル。Week36〜40の先読み・論理削除・認可。JSへの受け渡しは関連ドリルの復習。
- 概念: ph3-week46-post-detail
- 類題: ph3-week46-assembly-post-detail / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

$idはルートで受け取った投稿IDです。Postを1件取得し、見つからなければ通常404としてください。

```php
<?php
 $post = Post::__BLANK__;
```

- correct: findOrFail($id)（正答）
- wrong: find($id)

達成条件: $idはルートで受け取った投稿IDです。Postを1件取得し、見つからなければ通常404としてください。

ヒント: 見つからない時の失敗も含めたメソッドを選びます。

解説: findOrFailで個別取得します。PCでは無効なIDの詳細URLを確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: findは見つからない場合nullを返すため、ここで指定した404の扱いになりません。

## question-ph3-week46-assembly-safe-js-data（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: $postsはControllerから渡した配列です。Laravel 10のBladeで、文字列へ二重エンコードせず安全にJavaScriptの値へ渡してください。Jsファサードは使用可能です。
- 出典: curriculum/PH3.md:840 / Week 46
- ドリル接続: week46-1の関連ドリルへ接続。配列として参照でき、引用符を含む値も崩れないか確認しましょう。
- 既習: Week45の記事モデル。Week36〜40の先読み・論理削除・認可。JSへの受け渡しは関連ドリルの復習。
- 概念: ph3-week46-safe-js-data
- 類題: ph3-week46-assembly-safe-js-data / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

$postsはControllerから渡した配列です。Laravel 10のBladeで、文字列へ二重エンコードせず安全にJavaScriptの値へ渡してください。Jsファサードは使用可能です。

```blade
<script>
const posts = __BLANK__;
</script>
```

- correct: {{ Js::from($posts) }}（正答）
- wrong: {{ Js::from('$posts') }}

達成条件: $postsはControllerから渡した配列です。Laravel 10のBladeで、文字列へ二重エンコードせず安全にJavaScriptの値へ渡してください。Jsファサードは使用可能です。

ヒント: JavaScriptへ渡したい実際のPHP変数をヘルパーに渡します。

解説: Js::fromはHTML内へ埋め込む値を適切に変換します。PCでは配列として参照でき、引用符を含む値も崩れないか確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。静的意味レビューのみ。Blade/Laravelは実行しない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: 引用符付きの'$posts'は変数でなく固定文字列です。

## question-ph3-week46-choice-post-user-eager（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「Post::with("user")->get()」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:840 / Week 46
- ドリル接続: PH3 Week46のPOSSE課題。記事数を増やしたときのクエリ数を確認しましょう。
- 既習: Week45の記事モデル。Week36〜40の先読み・論理削除・認可。JSへの受け渡しは関連ドリルの復習。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week46-post-user-eager
- 類題: ph3-week46-choice-post-user-eager / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

記事一覧で各投稿者名も表示します。PostにuserのbelongsToがあります。先読みするものはどれですか？

- wrong2: User::all()だけ
- wrong3: Post::with("comments")->get()
- correct: Post::with("user")->get()（正答）
- wrong1: Post::all()だけ

達成条件: 条件に適合する候補を1つ選ぶ：Post::with("user")->get()

ヒント: 表示する関連の名前をwithへ渡します。

解説: userを先読みして各記事の投稿者名を表示します。 PCでは記事数を増やしたときのクエリ数を確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 関連userの先読みを指定していません。
- 誤答wrong2: 投稿との関連を使って記事一覧を取得する形ではありません。
- 誤答wrong3: 必要な投稿者userではなくコメントを先読みしています。

## question-ph3-week46-choice-post-owner-compare（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「$user->id === $post->user_id」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:840 / Week 46
- ドリル接続: PH3 Week46のPOSSE課題。同じIDの他人の記事を取り違えないよう確認しましょう。
- 既習: Week45の記事モデル。Week36〜40の先読み・論理削除・認可。JSへの受け渡しは関連ドリルの復習。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week46-post-owner-compare
- 類題: ph3-week46-choice-post-owner-compare / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

認証済み利用者とPostのuser_idは整数です。投稿者本人かを判定するものはどれですか？

- wrong3: $post->user_id === 1
- correct: $user->id === $post->user_id（正答）
- wrong1: $user->id === $post->id
- wrong2: $user->name === $post->title

達成条件: 条件に適合する候補を1つ選ぶ：$user->id === $post->user_id

ヒント: 記事の投稿者IDと認証済みIDを比べます。

解説: user_idで所有者を対応させます。 PCでは同じIDの他人の記事を取り違えないよう確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 記事自身のIDと利用者IDを比較しても投稿者は分かりません。
- 誤答wrong2: 利用者名とタイトルの一致は所有者の判定ではありません。
- 誤答wrong3: 現在の利用者との対応を確認していません。

## question-ph3-week46-choice-policy-update-enforce（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「$this->authorize("update", $post);」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:840 / Week 46
- ドリル接続: PH3 Week46のPOSSE課題。他人の記事の更新が拒否されるか確認しましょう。
- 既習: Week45の記事モデル。Week36〜40の先読み・論理削除・認可。JSへの受け渡しは関連ドリルの復習。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week46-policy-update-enforce
- 類題: ph3-week46-choice-policy-update-enforce / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

Postのupdateポリシーを定義済みです。更新前に権限を強制するControllerの呼び出しはどれですか？

- correct: $this->authorize("update", $post);（正答）
- wrong1: $this->authorize("view", $post);
- wrong2: $post->user_idをフォームの値へ変えてから保存
- wrong3: 編集リンクだけを非表示にする

達成条件: 条件に適合する候補を1つ選ぶ：$this->authorize("update", $post);

ヒント: これから実行する操作の権限を確認します。

解説: updateの認可後に検証済みデータを保存します。 PCでは他人の記事の更新が拒否されるか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 閲覧が許可されても更新できるとは限りません。
- 誤答wrong2: 他人の記事の投稿者を書き換える危険があります。
- 誤答wrong3: 直接の更新要求を拒否できません。

## question-ph3-week46-choice-soft-delete-post-list（版1・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: 提示条件に対して「論理削除されていない記事」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:840 / Week 46
- ドリル接続: PH3 Week46のPOSSE課題。削除前後の一覧とdeleted_atを比べましょう。
- 既習: Week45の記事モデル。Week36〜40の先読み・論理削除・認可。JSへの受け渡しは関連ドリルの復習。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week46-soft-delete-post-list
- 類題: ph3-week46-choice-soft-delete-post-list / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

PostはSoftDeletesを使用します。通常のPost::get()で取得する記事はどれですか？

- wrong1: 削除済みだけの記事
- wrong2: 削除済みも無条件にすべて含む
- wrong3: 必ずログイン利用者の記事だけ
- correct: 論理削除されていない記事（正答）

達成条件: 条件に適合する候補を1つ選ぶ：論理削除されていない記事

ヒント: 削除状態の条件と投稿者の条件を区別します。

解説: 標準では論理削除された記事が除外されます。 PCでは削除前後の一覧とdeleted_atを比べましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 通常のクエリは削除済みを除きます。
- 誤答wrong2: 削除済みを含めるにはwithTrashedなどの指定が必要です。
- 誤答wrong3: SoftDeletesだけでは投稿者による絞り込みは付きません。

## question-ph3-week46-choice-post-detail-id（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「Post::findOrFail($id)」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:840 / Week 46
- ドリル接続: PH3 Week46のPOSSE課題。異なるIDの詳細画面と存在しないIDを確認しましょう。
- 既習: Week45の記事モデル。Week36〜40の先読み・論理削除・認可。JSへの受け渡しは関連ドリルの復習。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week46-post-detail-id
- 類題: ph3-week46-choice-post-detail-id / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

show($id)で記事詳細を表示します。別の記事を誤表示しない取得はどれですか？

- wrong2: Post::findOrFail(1)
- wrong3: Post::all()を1件として扱う
- correct: Post::findOrFail($id)（正答）
- wrong1: Post::first()

達成条件: 条件に適合する候補を1つ選ぶ：Post::findOrFail($id)

ヒント: URLから受け取ったIDを検索へ渡します。

解説: 指定された記事を取得し、未検出なら404にします。 PCでは異なるIDの詳細画面と存在しないIDを確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 受け取ったIDを無視して最初の記事を表示します。
- 誤答wrong2: すべてのURLでID1へ固定してしまいます。
- 誤答wrong3: 全件の集合と指定した1件は別です。

## question-ph3-week46-choice-owner-delete-test（版1・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: 提示条件に対して「本人の削除成功と、他人のIDへの直接削除要求の拒否」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:840 / Week 46
- ドリル接続: PH3 Week46のPOSSE課題。削除拒否後も他人の記事が残るか確認しましょう。
- 既習: Week45の記事モデル。Week36〜40の先読み・論理削除・認可。JSへの受け渡しは関連ドリルの復習。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week46-owner-delete-test
- 類題: ph3-week46-choice-owner-delete-test / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

本人のみ記事を削除できるか確認します。必要なテストはどれですか？

- wrong3: 全記事の削除を一度実行するだけ
- correct: 本人の削除成功と、他人のIDへの直接削除要求の拒否（正答）
- wrong1: 本人が削除できることだけ
- wrong2: 他人の削除ボタンが見えないことだけ

達成条件: 条件に適合する候補を1つ選ぶ：本人の削除成功と、他人のIDへの直接削除要求の拒否

ヒント: 許可される操作と拒否する操作を両方試します。

解説: サーバー側で他人の記事を守れているか確認します。 PCでは削除拒否後も他人の記事が残るか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 他人の記事の削除を防げるか確認できません。
- 誤答wrong2: 直接リクエストを送る経路が未確認です。
- 誤答wrong3: 所有者ごとの認可を確認できません。

## question-ph3-week46-choice-edit-author-not-change（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「編集を許可した属性だけ更新し、user_idの入力を採用しない」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:840 / Week 46
- ドリル接続: PH3 Week46のPOSSE課題。user_idを追加送信しても変化しないか確認しましょう。
- 既習: Week45の記事モデル。Week36〜40の先読み・論理削除・認可。JSへの受け渡しは関連ドリルの復習。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week46-edit-author-not-change
- 類題: ph3-week46-choice-edit-author-not-change / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

記事本文の編集フォームからuser_idも送られてきました。投稿者を変えない要件に合う処理はどれですか？

- correct: 編集を許可した属性だけ更新し、user_idの入力を採用しない（正答）
- wrong1: フォームにある全キーを無条件に保存する
- wrong2: user_idを受信値へ変えてから認可する
- wrong3: すべての記事のuser_idを同じ値へ変える

達成条件: 条件に適合する候補を1つ選ぶ：編集を許可した属性だけ更新し、user_idの入力を採用しない

ヒント: 編集できる項目を必要なものに限定します。

解説: 認可に使う投稿者情報を利用者の入力で置き換えません。 PCではuser_idを追加送信しても変化しないか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 投稿者まで改変できてしまいます。
- 誤答wrong2: 変更前の所有者による権限確認を壊してしまいます。
- 誤答wrong3: 編集対象以外の投稿者情報まで壊します。

## question-ph3-week46-choice-js-safe-json（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「const items = {{ Illuminate\Support\Js::from($items) }};」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:840 / Week 46
- ドリル接続: week46-1の関連ドリル。引用符を含むデータでJSの値とConsoleを確認しましょう。
- 既習: Week45の記事モデル。Week36〜40の先読み・論理削除・認可。JSへの受け渡しは関連ドリルの復習。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week46-js-safe-json
- 類題: ph3-week46-choice-js-safe-json / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

Laravel 10のBladeのscript内です。既存のPHP配列$itemsをJSの値へ安全に渡すものはどれですか？

- wrong1: const items = "{{ json_encode($items) }}";
- wrong2: const items = {!! $items !!};
- wrong3: const items = "items";
- correct: const items = {{ Illuminate\Support\Js::from($items) }};（正答）

達成条件: 条件に適合する候補を1つ選ぶ：const items = {{ Illuminate\Support\Js::from($items) }};

ヒント: HTMLへの埋め込みを考慮するLaravelの変換を使います。

解説: Js::fromで適切にエスケープしたJSの値を生成します。 PCでは引用符を含むデータでJSの値とConsoleを確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: HTMLエスケープと余分な引用符により期待したJSの値になりません。
- 誤答wrong2: 配列を安全なJSの値へ変換する形ではありません。
- 誤答wrong3: PHP配列ではなく固定の文字列です。

## question-ph3-week46-choice-json-object-versus-string（版1・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: 提示条件に対して「文字列」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:840 / Week 46
- ドリル接続: week46-1の関連ドリル。ConsoleでtypeofとArray.isArrayを確認しましょう。
- 既習: Week45の記事モデル。Week36〜40の先読み・論理削除・認可。JSへの受け渡しは関連ドリルの復習。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week46-json-object-versus-string
- 類題: ph3-week46-choice-json-object-versus-string / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

JSでconst data = '[{"id":1}]';とした場合、dataの型はどれですか？

- wrong2: 数値
- wrong3: PHPのコレクション
- correct: 文字列（正答）
- wrong1: オブジェクトを持つ配列

達成条件: 条件に適合する候補を1つ選ぶ：文字列

ヒント: JSONに見える内容とJSの型は別です。

解説: 引用符で囲んだ値は文字列であり、配列ではありません。 PCではConsoleでtypeofとArray.isArrayを確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 外側を引用符で囲んでいるので文字列です。
- 誤答wrong2: 引用符内のJSON風の内容全体は文字列です。
- 誤答wrong3: これはJavaScriptの変数宣言です。

## question-ph3-week46-choice-post-title-escape（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「{{ $post->title }}」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:840 / Week 46
- ドリル接続: PH3 Week46のPOSSE課題。タグを含むタイトルでも文字表示になるか確認しましょう。
- 既習: Week45の記事モデル。Week36〜40の先読み・論理削除・認可。JSへの受け渡しは関連ドリルの復習。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week46-post-title-escape
- 類題: ph3-week46-choice-post-title-escape / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

利用者の投稿タイトルを一覧に表示します。HTMLタグを実行させないBlade出力はどれですか？

- wrong3: 入力内のタグをそのままHTMLへ挿入する
- correct: {{ $post->title }}（正答）
- wrong1: {!! $post->title !!}
- wrong2: <script>内へタイトルをそのまま連結する

達成条件: 条件に適合する候補を1つ選ぶ：{{ $post->title }}

ヒント: 利用者の文字列は通常のエスケープ出力を使います。

解説: 通常の{{ }}でタイトルを文字として表示します。 PCではタグを含むタイトルでも文字表示になるか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: HTMLエスケープしない出力です。
- 誤答wrong2: 入力をコードとして解釈させる危険があります。
- 誤答wrong3: 利用者の入力をHTMLとして解釈させてしまいます。
