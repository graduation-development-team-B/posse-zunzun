# Week43｜関連データの保存・画像送信

15問。言葉の理解: 1 / 知識の選択: 5 / 知識の組み立て: 5 / 結果の確認・修正: 4

作者向け資料。独立問題。公開されるのは制作状態publishedの問題。

## question-ph3-week43-assembly-related-create（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: $quizは取得済みです。questionsはhasManyでquiz_idを補います。textはfillableです。検証済み文字列$textから設問を1件作成してください。
- 出典: curriculum/PH3.md:634 / Week 43
- ドリル接続: PH3 Week43のPOSSE課題へ接続。作った設問が選択したクイズに属するか確認しましょう。
- 既習: Week42のFormRequest。Week43のリレーション保存と関連データの検証。
- 概念: ph3-week43-related-create
- 類題: ph3-week43-assembly-related-create / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

$quizは取得済みです。questionsはhasManyでquiz_idを補います。textはfillableです。検証済み文字列$textから設問を1件作成してください。

```php
<?php
 $question = __BLANK__;
```

- correct: $quiz->questions()->create(['text' => $text])（正答）
- wrong: $quiz->questions->create(['text' => $text])

達成条件: $quizは取得済みです。questionsはhasManyでquiz_idを補います。textはfillableです。検証済み文字列$textから設問を1件作成してください。

ヒント: リレーションのメソッドを呼んでからcreateします。

解説: questions()->createでquiz_idを対応させます。PCでは作った設問が選択したクイズに属するか確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: 動的プロパティは関連モデルの集合です。保存用のリレーション呼び出しにはquestions()を使います。

## question-ph3-week43-assembly-save-choice-model（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: $questionは取得済み、choicesはhasManyです。$choiceは作成済みChoiceモデルです。そのモデルを所属付きで保存してください。
- 出典: curriculum/PH3.md:634 / Week 43
- ドリル接続: PH3 Week43のPOSSE課題へ接続。question_idが親へ対応するか確認しましょう。
- 既習: Week42のFormRequest。Week43のリレーション保存と関連データの検証。
- 概念: ph3-week43-save-choice-model
- 類題: ph3-week43-assembly-save-choice-model / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

$questionは取得済み、choicesはhasManyです。$choiceは作成済みChoiceモデルです。そのモデルを所属付きで保存してください。

```php
<?php
__BLANK__;
```

- correct: $question->choices()->save($choice)（正答）
- wrong: $question->choices()->create($choice)

達成条件: $questionは取得済み、choicesはhasManyです。$choiceは作成済みChoiceモデルです。そのモデルを所属付きで保存してください。

ヒント: 渡すものがモデルか属性配列かを区別します。

解説: saveで渡したモデルを関連先として保存します。PCではquestion_idが親へ対応するか確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: createは属性の配列を受け取るメソッドで、用意したモデルそのものを保存するsaveとは違います。

## question-ph3-week43-assembly-existing-quiz（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: quiz_idが必須で、quizzesのidとして存在することを検証してください。FormRequest内です。
- 出典: curriculum/PH3.md:634 / Week 43
- ドリル接続: PH3 Week43のPOSSE課題へ接続。存在しないクイズIDの入力も試しましょう。
- 既習: Week42のFormRequest。Week43のリレーション保存と関連データの検証。
- 概念: ph3-week43-existing-quiz
- 類題: ph3-week43-assembly-existing-quiz / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

quiz_idが必須で、quizzesのidとして存在することを検証してください。FormRequest内です。

```php
<?php
class StoreQuestionRequest extends FormRequest {
  public function rules(): array {
    return ['quiz_id' => __BLANK__];
  }
}
```

- correct: ['required', 'exists:quizzes,id']（正答）
- wrong: ['required', 'exists:questions,id']

達成条件: quiz_idが必須で、quizzesのidとして存在することを検証してください。FormRequest内です。

ヒント: 外部キーが指す親の表と列を指定します。

解説: exists:quizzes,idで親の存在を確かめます。PCでは存在しないクイズIDの入力も試しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: 確認したい親クイズではなく設問の表を参照しています。

## question-ph3-week43-assembly-correct-choice-range（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: 正解の選択肢番号correctは1〜3の整数だけを受け付けます。FormRequestのルールを作ってください。
- 出典: curriculum/PH3.md:634 / Week 43
- ドリル接続: PH3 Week43のPOSSE課題へ接続。0・1・3・4を送って確認しましょう。
- 既習: Week42のFormRequest。Week43のリレーション保存と関連データの検証。
- 概念: ph3-week43-correct-choice-range
- 類題: ph3-week43-assembly-correct-choice-range / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

正解の選択肢番号correctは1〜3の整数だけを受け付けます。FormRequestのルールを作ってください。

```php
<?php
class StoreQuestionRequest extends FormRequest {
  public function rules(): array {
    return ['correct' => __BLANK__];
  }
}
```

- correct: ['required', 'integer', 'between:1,3']（正答）
- wrong: ['required', 'integer', 'between:0,3']

達成条件: 正解の選択肢番号correctは1〜3の整数だけを受け付けます。FormRequestのルールを作ってください。

ヒント: 数値の範囲は両端を含む指定です。

解説: integerとbetween:1,3を組み合わせます。PCでは0・1・3・4を送って確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: 0も許可してしまい、1〜3に限定できません。

## question-ph3-week43-assembly-multipart-form（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: LaravelのPOSTフォームで画像image_fileを送ります。form開始タグに必要なエンコード指定を組み立ててください。
- 出典: curriculum/PH3.md:634 / Week 43
- ドリル接続: week43-1の関連ドリルへ接続。$request->file('image_file')で受け取れるか確認しましょう。
- 既習: Week42のFormRequest。Week43のリレーション保存と関連データの検証。
- 概念: ph3-week43-multipart-form
- 類題: ph3-week43-assembly-multipart-form / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

LaravelのPOSTフォームで画像image_fileを送ります。form開始タグに必要なエンコード指定を組み立ててください。

```blade
<form method="POST" action="{{ route('quizzes.store') }}" __BLANK__>
@csrf
<input type="file" name="image_file">
<button type="submit">保存</button>
</form>
```

- correct: enctype="multipart/form-data"（正答）
- wrong: enctype="application/x-www-form-urlencoded"

達成条件: LaravelのPOSTフォームで画像image_fileを送ります。form開始タグに必要なエンコード指定を組み立ててください。

ヒント: ファイルを含むフォームのエンコード方式を指定します。

解説: multipart/form-dataでファイルを送ります。PCでは$request->file('image_file')で受け取れるか確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。静的意味レビューのみ。Blade/Laravelは実行しない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: 通常のURLエンコードでは画像ファイルの送信形式になりません。

## question-ph3-week43-choice-relation-save-instance（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「$post->comments()->save($comment)」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:634 / Week 43
- ドリル接続: PH3 Week43のPOSSE課題。保存されたCommentのpost_idを確認しましょう。
- 既習: Week42のFormRequest。Week43のリレーション保存と関連データの検証。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week43-relation-save-instance
- 類題: ph3-week43-choice-relation-save-instance / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

取得済み$postへ新しいCommentモデル$commentを関連付けて保存します。commentsはhasManyです。適したものはどれですか？

- correct: $post->comments()->save($comment)（正答）
- wrong1: $post->comments()->create($comment)
- wrong2: $post->comments->save($comment)
- wrong3: $post->save($comment)

達成条件: 条件に適合する候補を1つ選ぶ：$post->comments()->save($comment)

ヒント: モデルインスタンスを受け取るリレーション操作を選びます。

解説: saveは渡した子モデルに親の外部キーを対応させて保存します。 PCでは保存されたCommentのpost_idを確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: createの引数はモデルではなく属性配列です。
- 誤答wrong2: 動的プロパティはコレクションであり保存用リレーションではありません。
- 誤答wrong3: 親のsaveに子モデルを渡して関連保存する形ではありません。

## question-ph3-week43-choice-relation-create-array（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「$post->comments()->create(["message" => $message])」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:634 / Week 43
- ドリル接続: PH3 Week43のPOSSE課題。post_idとmessageの保存結果を確認しましょう。
- 既習: Week42のFormRequest。Week43のリレーション保存と関連データの検証。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week43-relation-create-array
- 類題: ph3-week43-choice-relation-create-array / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

commentsはhasManyでCommentのmessageはfillableです。親$postへ検証済みのmessageを関連保存するものはどれですか？

- wrong1: $post->comments()->save(["message" => $message])
- wrong2: $post->comments->create(["message" => $message])
- wrong3: new Comment(["message" => $message])だけ
- correct: $post->comments()->create(["message" => $message])（正答）

達成条件: 条件に適合する候補を1つ選ぶ：$post->comments()->create(["message" => $message])

ヒント: 属性配列から作るメソッドです。

解説: createは属性配列を受け取り親と関連するモデルを作成します。 PCではpost_idとmessageの保存結果を確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: saveは属性配列ではなくモデルインスタンスを受け取ります。
- 誤答wrong2: コレクションではなくcomments()のリレーションを使います。
- 誤答wrong3: モデルを用意するだけでDB保存も親への関連付けも行いません。

## question-ph3-week43-choice-parent-key-auto（版1・published）

- 形式: choice
- 主対象: 言葉の理解
- 学習目標: 提示条件に対して「子のpost_idを親のIDへ対応させて保存できる」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:634 / Week 43
- ドリル接続: PH3 Week43のPOSSE課題。別の記事IDへ取り違えて保存されないか確認しましょう。
- 既習: Week42のFormRequest。Week43のリレーション保存と関連データの検証。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week43-parent-key-auto
- 類題: ph3-week43-choice-parent-key-auto / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

hasManyの$post->comments()->save($comment)を使う利点はどれですか？

- wrong2: 子の入力検証を必ずすべて自動生成する
- wrong3: 親記事を必ず物理削除する
- correct: 子のpost_idを親のIDへ対応させて保存できる（正答）
- wrong1: すべての既存コメントを別の親へ移動する

達成条件: 条件に適合する候補を1つ選ぶ：子のpost_idを親のIDへ対応させて保存できる

ヒント: 子がどの親に属するかを設定します。

解説: リレーションが所属先の外部キーを補います。 PCでは別の記事IDへ取り違えて保存されないか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 新しく保存する子への関連付けであり全件移動ではありません。
- 誤答wrong2: リレーション保存と入力検証は別です。
- 誤答wrong3: 関連保存は親の削除処理ではありません。

## question-ph3-week43-choice-save-many-models（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「$post->comments()->saveMany($comments)」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:634 / Week 43
- ドリル接続: PH3 Week43のPOSSE課題。保存した複数の子のpost_idを確認しましょう。
- 既習: Week42のFormRequest。Week43のリレーション保存と関連データの検証。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week43-save-many-models
- 類題: ph3-week43-choice-save-many-models / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

既存の親$postへ、未保存Commentモデルの配列$commentsを関連保存します。使うものはどれですか？

- wrong3: $post->refresh($comments)
- correct: $post->comments()->saveMany($comments)（正答）
- wrong1: $post->comments()->createMany($comments)
- wrong2: $post->comments()->delete($comments)

達成条件: 条件に適合する候補を1つ選ぶ：$post->comments()->saveMany($comments)

ヒント: モデルを複数受け取るメソッドです。

解説: saveManyでモデルの配列を関連保存できます。 PCでは保存した複数の子のpost_idを確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: createManyはモデル配列ではなく属性配列の配列を受け取ります。
- 誤答wrong2: 子を作成する処理ではありません。
- 誤答wrong3: 再取得は新しい子の保存ではありません。

## question-ph3-week43-choice-loaded-relation-refresh（版1・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: 提示条件に対して「$post->refresh();」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:634 / Week 43
- ドリル接続: PH3 Week43のPOSSE課題。再取得後のコメント件数を確認しましょう。
- 既習: Week42のFormRequest。Week43のリレーション保存と関連データの検証。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week43-loaded-relation-refresh
- 類題: ph3-week43-choice-loaded-relation-refresh / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

先に$post->commentsを読み込んだ後、comments()->saveで子を追加しました。メモリ内の関連も再取得するものはどれですか？

- correct: $post->refresh();（正答）
- wrong1: $post->commentsだけを再び読む
- wrong2: $post->delete();
- wrong3: $post->comments()->save($comment)を重ねる

達成条件: 条件に適合する候補を1つ選ぶ：$post->refresh();

ヒント: 保存とメモリ内の取得済み関連の更新を分けます。

解説: refreshでモデルと読み込み済み関連を読み直します。 PCでは再取得後のコメント件数を確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: すでに読み込んだ関連がキャッシュされている場合、追加前の集合を読みます。
- 誤答wrong2: 再取得ではなく親の削除です。
- 誤答wrong3: モデルと関連を読み直す操作ではありません。

## question-ph3-week43-choice-quiz-exists-rule（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「exists:quizzes,id」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:634 / Week 43
- ドリル接続: PH3 Week43のPOSSE課題。存在しないquiz_idを送って拒否されるか確認しましょう。
- 既習: Week42のFormRequest。Week43のリレーション保存と関連データの検証。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week43-quiz-exists-rule
- 類題: ph3-week43-choice-quiz-exists-rule / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

フォームのquiz_idがquizzesテーブルに存在するidか検証します。requiredとintegerに加えるルールはどれですか？

- wrong1: unique:quizzes,id
- wrong2: max:200
- wrong3: string
- correct: exists:quizzes,id（正答）

達成条件: 条件に適合する候補を1つ選ぶ：exists:quizzes,id

ヒント: 参照先の表と列を検証します。

解説: existsで指定した表に値があるか確認します。 PCでは存在しないquiz_idを送って拒否されるか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 既存IDを使う目的と逆に、重複しない値を求めてしまいます。
- 誤答wrong2: 値の上限だけでは参照先の存在を確認できません。
- 誤答wrong3: 文字列であることは参照先の存在を保証しません。

## question-ph3-week43-choice-correct-choice-range（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「required|integer|between:1,3」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:634 / Week 43
- ドリル接続: PH3 Week43のPOSSE課題。0・1・3・4・未入力を試しましょう。
- 既習: Week42のFormRequest。Week43のリレーション保存と関連データの検証。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week43-correct-choice-range
- 類題: ph3-week43-choice-correct-choice-range / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

正解の番号は必須の整数で1〜3です。correct_numberのルールはどれですか？

- wrong2: required|string|max:3
- wrong3: nullable|integer|between:1,3
- correct: required|integer|between:1,3（正答）
- wrong1: required|integer|min:1

達成条件: 条件に適合する候補を1つ選ぶ：required|integer|between:1,3

ヒント: 型と上下限と必須をそろえます。

解説: integerとbetweenで範囲内の整数に限定します。 PCでは0・1・3・4・未入力を試しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 上限がなく4以上を許してしまいます。
- 誤答wrong2: 文字数の条件であり整数1〜3の制約ではありません。
- 誤答wrong3: 未入力を許可してしまいます。

## question-ph3-week43-choice-question-text-limit（版1・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: 提示条件に対して「検証エラーとして保存を止める」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:634 / Week 43
- ドリル接続: PH3 Week43のPOSSE課題。エラー表示とDBに増えていないことを確認しましょう。
- 既習: Week42のFormRequest。Week43のリレーション保存と関連データの検証。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week43-question-text-limit
- 類題: ph3-week43-choice-question-text-limit / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

設問textは必須で200文字以内の文字列です。250文字の通常の文章を送った結果はどれですか？

- wrong3: 画像ファイルとして扱う
- correct: 検証エラーとして保存を止める（正答）
- wrong1: 先頭200文字へ無通知で切り捨てて成功にする
- wrong2: 必ず新しいクイズとして保存する

達成条件: 条件に適合する候補を1つ選ぶ：検証エラーとして保存を止める

ヒント: 上限を超えた値を検証で止めます。

解説: 250文字は200文字以内の条件に適合しません。 PCではエラー表示とDBに増えていないことを確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: maxの検証は自動切り捨てではありません。
- 誤答wrong2: 設問の長さが検証条件を超えています。
- 誤答wrong3: 入力は設問の文章です。

## question-ph3-week43-choice-choice-fields-required（版1・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: 提示条件に対して「2番目の必須エラーになり保存しない」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:634 / Week 43
- ドリル接続: PH3 Week43のPOSSE課題。空にする位置を変えて各欄のエラーを確認しましょう。
- 既習: Week42のFormRequest。Week43のリレーション保存と関連データの検証。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week43-choice-fields-required
- 類題: ph3-week43-choice-choice-fields-required / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

choices.1.text、choices.2.text、choices.3.textをそれぞれrequired|string|max:100で検証します。2番目だけ未入力の場合はどうなりますか？

- correct: 2番目の必須エラーになり保存しない（正答）
- wrong1: 1番目があれば3つとも有効になる
- wrong2: 正解番号を変更すれば必須チェックが消える
- wrong3: 空の選択肢を必ず正解として保存する

達成条件: 条件に適合する候補を1つ選ぶ：2番目の必須エラーになり保存しない

ヒント: 各入力欄の条件を個別に確認します。

解説: 3つすべてに必要なテキストを求めます。 PCでは空にする位置を変えて各欄のエラーを確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 各選択肢が必須なので2番目も必要です。
- 誤答wrong2: 正解番号と選択肢の入力ルールは別です。
- 誤答wrong3: 空の値は必須条件を満たしません。

## question-ph3-week43-choice-multipart-upload（版1・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: 提示条件に対して「enctype="multipart/form-data"」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:634 / Week 43
- ドリル接続: week43-1の関連ドリル。画像選択後、サーバー側でファイルを受け取れるか確認しましょう。
- 既習: Week42のFormRequest。Week43のリレーション保存と関連データの検証。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week43-multipart-upload
- 類題: ph3-week43-choice-multipart-upload / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

POSTフォームにfile入力とCSRFトークンがあります。選択した画像をファイルとして送るため、formへ追加する属性はどれですか？

- wrong1: target="_blank"
- wrong2: autocomplete="off"
- wrong3: class="image"
- correct: enctype="multipart/form-data"（正答）

達成条件: 条件に適合する候補を1つ選ぶ：enctype="multipart/form-data"

ヒント: ファイルを含むフォームのエンコード形式です。

解説: multipart/form-dataでファイルデータを送ります。 PCでは画像選択後、サーバー側でファイルを受け取れるか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 新しい画面で開く指定でありファイル送信形式ではありません。
- 誤答wrong2: 入力補完の設定でありファイル送信形式ではありません。
- 誤答wrong3: CSSクラス名だけではファイルの送信形式は変わりません。
