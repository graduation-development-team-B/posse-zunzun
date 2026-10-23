# Week44｜設問編集・削除状態の表示

15問。言葉の理解: 0 / 知識の選択: 7 / 知識の組み立て: 6 / 結果の確認・修正: 2

作者向け資料。独立問題。公開されるのは制作状態publishedの問題。

## question-ph3-week44-assembly-update-question（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: $questionは認可確認済みのモデルです。quiz_idとtextはfillableで、$validatedはその2項目だけの検証済み配列です。既存設問を更新してください。
- 出典: curriculum/PH3.md:772 / Week 44
- ドリル接続: PH3 Week44のPOSSE課題へ接続。idを維持したまま所属クイズと本文が変わるか確認しましょう。
- 既習: Week43の設問・選択肢の関連保存。Week39の論理削除、Week42の検証。
- 概念: ph3-week44-update-question
- 類題: ph3-week44-assembly-update-question / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

$questionは認可確認済みのモデルです。quiz_idとtextはfillableで、$validatedはその2項目だけの検証済み配列です。既存設問を更新してください。

```php
<?php
__BLANK__;
```

- correct: $question->update($validated)（正答）
- wrong: $question->create($validated)

達成条件: $questionは認可確認済みのモデルです。quiz_idとtextはfillableで、$validatedはその2項目だけの検証済み配列です。既存設問を更新してください。

ヒント: 対象モデルに対する更新メソッドを使います。

解説: updateで設問の属性を変更します。PCではidを維持したまま所属クイズと本文が変わるか確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: createでは新しい行を作るため、既存設問の編集にはなりません。

## question-ph3-week44-assembly-include-deleted（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: QuizはSoftDeletesを使います。管理一覧に、未削除と論理削除済みの両方を取得してください。
- 出典: curriculum/PH3.md:772 / Week 44
- ドリル接続: PH3 Week44のPOSSE課題へ接続。削除状態の違う2件を管理画面で確認しましょう。
- 既習: Week43の設問・選択肢の関連保存。Week39の論理削除、Week42の検証。
- 概念: ph3-week44-include-deleted
- 類題: ph3-week44-assembly-include-deleted / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

QuizはSoftDeletesを使います。管理一覧に、未削除と論理削除済みの両方を取得してください。

```php
<?php
 $quizzes = Quiz::__BLANK__;
```

- correct: withTrashed()->get()（正答）
- wrong: onlyTrashed()->get()

達成条件: QuizはSoftDeletesを使います。管理一覧に、未削除と論理削除済みの両方を取得してください。

ヒント: 削除済みも含める指定と、削除済みだけを区別します。

解説: withTrashedで両方を取得します。PCでは削除状態の違う2件を管理画面で確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: onlyTrashedでは論理削除済みだけになり、未削除のデータが含まれません。

## question-ph3-week44-assembly-deleted-label（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: 管理一覧の$quizはSoftDeletesモデルです。削除済みなら「削除済み」、そうでなければ「公開中」と表示してください。
- 出典: curriculum/PH3.md:772 / Week 44
- ドリル接続: PH3 Week44のPOSSE課題へ接続。削除済み項目の編集導線も無効か確認しましょう。
- 既習: Week43の設問・選択肢の関連保存。Week39の論理削除、Week42の検証。
- 概念: ph3-week44-deleted-label
- 類題: ph3-week44-assembly-deleted-label / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

管理一覧の$quizはSoftDeletesモデルです。削除済みなら「削除済み」、そうでなければ「公開中」と表示してください。

```blade
@if (__BLANK__)
  削除済み
@else
  公開中
@endif
```

- correct: $quiz->trashed()（正答）
- wrong: $quiz->exists

達成条件: 管理一覧の$quizはSoftDeletesモデルです。削除済みなら「削除済み」、そうでなければ「公開中」と表示してください。

ヒント: 論理削除状態を調べるメソッドを使います。

解説: trashed()で削除状態を判別します。PCでは削除済み項目の編集導線も無効か確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。静的意味レビューのみ。Blade/Laravelは実行しない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: existsはDBに保存済みかの属性で、論理削除状態の判定ではありません。

## question-ph3-week44-assembly-custom-required-message（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: FormRequestのsample.requiredに、日本語メッセージを指定してください。messages内の返却配列です。
- 出典: curriculum/PH3.md:772 / Week 44
- ドリル接続: week44-1の関連ドリルへ接続。未入力送信でこのメッセージが出るか確認しましょう。
- 既習: Week43の設問・選択肢の関連保存。Week39の論理削除、Week42の検証。
- 概念: ph3-week44-custom-required-message
- 類題: ph3-week44-assembly-custom-required-message / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

FormRequestのsample.requiredに、日本語メッセージを指定してください。messages内の返却配列です。

```php
<?php
class QuizCreateRequest extends FormRequest {
  public function messages(): array {
    return [__BLANK__];
  }
}
```

- correct: 'sample.required' => 'サンプルは必須です。'（正答）
- wrong: 'sample.max' => 'サンプルは必須です。'

達成条件: FormRequestのsample.requiredに、日本語メッセージを指定してください。messages内の返却配列です。

ヒント: 項目名とルール名をドットで結びます。

解説: sample.requiredをキーにします。PCでは未入力送信でこのメッセージが出るか確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: maxのエラーへ設定しており、requiredが失敗した時には使われません。

## question-ph3-week44-assembly-update-owned-choice（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: 取得済み$questionのchoicesリレーションから、フォームで指定した$choiceIdの1件を取得してください。親設問の認可確認は済んでいます。
- 出典: curriculum/PH3.md:772 / Week 44
- ドリル接続: PH3 Week44のPOSSE課題へ接続。別の設問の選択肢IDを送っても更新できないか確認しましょう。
- 既習: Week43の設問・選択肢の関連保存。Week39の論理削除、Week42の検証。
- 概念: ph3-week44-update-owned-choice
- 類題: ph3-week44-assembly-update-owned-choice / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

取得済み$questionのchoicesリレーションから、フォームで指定した$choiceIdの1件を取得してください。親設問の認可確認は済んでいます。

```php
<?php
 $choice = __BLANK__;
```

- correct: $question->choices()->findOrFail($choiceId)（正答）
- wrong: Choice::findOrFail($choiceId)

達成条件: 取得済み$questionのchoicesリレーションから、フォームで指定した$choiceIdの1件を取得してください。親設問の認可確認は済んでいます。

ヒント: 取得範囲を現在の親リレーションへ限定します。

解説: 親に属する選択肢の範囲でIDを探します。PCでは別の設問の選択肢IDを送っても更新できないか確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: Choice全体から探すと、別の設問に属する選択肢も取得し得ます。

## question-ph3-week44-choice-question-soft-delete（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「$question->delete();」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:772 / Week 44
- ドリル接続: PH3 Week44のPOSSE課題。DBに行とdeleted_atが残るか確認しましょう。
- 既習: Week43の設問・選択肢の関連保存。Week39の論理削除、Week42の検証。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week44-question-soft-delete
- 類題: ph3-week44-choice-question-soft-delete / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

QuestionにSoftDeletesとdeleted_atがあります。管理者が設問を論理削除する処理はどれですか？

- wrong2: Question::truncate();
- wrong3: $question->text = "削除済み"; だけ
- correct: $question->delete();（正答）
- wrong1: $question->forceDelete();

達成条件: 条件に適合する候補を1つ選ぶ：$question->delete();

ヒント: 削除日時を記録するモデルの操作です。

解説: SoftDeletesを使うdeleteで行を残します。 PCではDBに行とdeleted_atが残るか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 行を物理削除する処理になります。
- 誤答wrong2: テーブルの全行を削除する操作であり対象1件の論理削除ではありません。
- 誤答wrong3: 削除日時を記録する論理削除になりません。

## question-ph3-week44-choice-admin-includes-deleted（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「Question::withTrashed()->paginate(20)」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:772 / Week 44
- ドリル接続: PH3 Week44のPOSSE課題。通常一覧との表示の違いを確認しましょう。
- 既習: Week43の設問・選択肢の関連保存。Week39の論理削除、Week42の検証。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week44-admin-includes-deleted
- 類題: ph3-week44-choice-admin-includes-deleted / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

管理用設問一覧で未削除と削除済みを両方表示します。QuestionがSoftDeletesの場合、使う取得はどれですか？

- wrong3: Question::where("text", "削除済み")->paginate(20)
- correct: Question::withTrashed()->paginate(20)（正答）
- wrong1: Question::onlyTrashed()->paginate(20)
- wrong2: Question::paginate(20)

達成条件: 条件に適合する候補を1つ選ぶ：Question::withTrashed()->paginate(20)

ヒント: 管理一覧は削除済みも取得対象にします。

解説: withTrashedで両方を含め、状態をラベルで示します。 PCでは通常一覧との表示の違いを確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 未削除の設問が含まれません。
- 誤答wrong2: 通常は削除済みが除外されます。
- 誤答wrong3: 本文では削除状態を判定できません。

## question-ph3-week44-choice-disabled-server-update（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「サーバー側でも削除済みか確認し更新を拒否する」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:772 / Week 44
- ドリル接続: PH3 Week44のPOSSE課題。削除済みIDへの更新でデータが変わらないか確認しましょう。
- 既習: Week43の設問・選択肢の関連保存。Week39の論理削除、Week42の検証。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week44-disabled-server-update
- 類題: ph3-week44-choice-disabled-server-update / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

削除済み設問には編集リンクを出しません。更新URLへ直接送信される場合の対応はどれですか？

- correct: サーバー側でも削除済みか確認し更新を拒否する（正答）
- wrong1: 編集リンクがないので更新を無条件に許可する
- wrong2: 削除済みの日時を消して必ず更新する
- wrong3: 文字色だけ灰色へ変更する

達成条件: 条件に適合する候補を1つ選ぶ：サーバー側でも削除済みか確認し更新を拒否する

ヒント: リンクの表示以外からも更新は要求できます。

解説: 削除状態に応じた操作制限を保存処理にも適用します。 PCでは削除済みIDへの更新でデータが変わらないか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 直接リクエストを送る経路が残ります。
- 誤答wrong2: 編集禁止という要件に反します。
- 誤答wrong3: 保存処理を拒否できません。

## question-ph3-week44-choice-related-choice-update（版1・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: 提示条件に対して「$question->choices()->findOrFail($choiceId)」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:772 / Week 44
- ドリル接続: PH3 Week44のPOSSE課題。別設問の選択肢IDを送って拒否されるか確認しましょう。
- 既習: Week43の設問・選択肢の関連保存。Week39の論理削除、Week42の検証。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week44-related-choice-update
- 類題: ph3-week44-choice-related-choice-update / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

編集対象$questionのchoicesはhasManyです。送信された$choiceIdがこの設問に属することも確かめて取得するものはどれですか？

- wrong1: Choice::findOrFail($choiceId)
- wrong2: Choice::first()
- wrong3: $question->choices()->first()
- correct: $question->choices()->findOrFail($choiceId)（正答）

達成条件: 条件に適合する候補を1つ選ぶ：$question->choices()->findOrFail($choiceId)

ヒント: 親の関連から送信IDを探します。

解説: 親を起点に取得すれば別の設問の子を取り違えずに済みます。 PCでは別設問の選択肢IDを送って拒否されるか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 別の設問の選択肢IDも取得でき、所属の条件がありません。
- 誤答wrong2: 指定IDも親の所属も確認しません。
- 誤答wrong3: 親は限定されますが指定された選択肢IDを使っていません。

## question-ph3-week44-choice-reassign-quiz（版1・published）

- 形式: choice
- 主対象: 知識の組み立て
- 学習目標: 提示条件に対して「questions.quiz_id」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:772 / Week 44
- ドリル接続: PH3 Week44のPOSSE課題。変更前後の両クイズで設問一覧を確認しましょう。
- 既習: Week43の設問・選択肢の関連保存。Week39の論理削除、Week42の検証。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week44-reassign-quiz
- 類題: ph3-week44-choice-reassign-quiz / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

管理者が設問を別のクイズへ移します。検証済みの所属先IDを変更する列はどれですか？

- wrong2: choices.is_correct
- wrong3: quizzes.name
- correct: questions.quiz_id（正答）
- wrong1: questions.id

達成条件: 条件に適合する候補を1つ選ぶ：questions.quiz_id

ヒント: 子が持つ親への参照を更新します。

解説: quiz_idを更新して所属先を変えます。 PCでは変更前後の両クイズで設問一覧を確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 設問自身の主キーを変更する処理ではありません。
- 誤答wrong2: 選択肢の正誤は所属クイズを変えません。
- 誤答wrong3: 親の名前だけを変えても所属先は変わりません。

## question-ph3-week44-choice-edit-validation-retained（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「編集でも同じ要件の入力検証を適用する」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:772 / Week 44
- ドリル接続: PH3 Week44のPOSSE課題。編集で250文字を送って拒否されるか確認しましょう。
- 既習: Week43の設問・選択肢の関連保存。Week39の論理削除、Week42の検証。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week44-edit-validation-retained
- 類題: ph3-week44-choice-edit-validation-retained / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

新規設問ではtextを必須・200文字以内に検証しています。編集フォームで必要な対応はどれですか？

- wrong3: HTMLのmaxlengthだけに任せる
- correct: 編集でも同じ要件の入力検証を適用する（正答）
- wrong1: 新規時に検証したので編集では長さを調べない
- wrong2: 編集では入力をすべて画像として扱う

達成条件: 条件に適合する候補を1つ選ぶ：編集でも同じ要件の入力検証を適用する

ヒント: 保存するたびに同じ要件を守ります。

解説: 更新時も必須と長さなどの制約を確認します。 PCでは編集で250文字を送って拒否されるか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 編集で不正な長さへ変更できてしまいます。
- 誤答wrong2: 設問本文の検証要件に合いません。
- 誤答wrong3: クライアント側だけでは直接送信を防げません。

## question-ph3-week44-choice-custom-message-method（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「messages()」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:772 / Week 44
- ドリル接続: week44-1の関連ドリル。FormRequestへメソッドを追加して未入力時の文を確認しましょう。
- 既習: Week43の設問・選択肢の関連保存。Week39の論理削除、Week42の検証。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week44-custom-message-method
- 類題: ph3-week44-choice-custom-message-method / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

FormRequestで特定の検証エラー文を変更するメソッドはどれですか？

- correct: messages()（正答）
- wrong1: up()
- wrong2: index()
- wrong3: getFullNameAttribute()

達成条件: 条件に適合する候補を1つ選ぶ：messages()

ヒント: ルールの定義とは別に表示文を返します。

解説: messagesで検証エラー文を指定できます。 PCではFormRequestへメソッドを追加して未入力時の文を確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: マイグレーションの変更処理に使う名前です。
- 誤答wrong2: 一般に一覧用アクションであり検証文の定義ではありません。
- 誤答wrong3: モデルのアクセサであり検証文の定義ではありません。

## question-ph3-week44-choice-custom-message-key（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「sample.required」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:772 / Week 44
- ドリル接続: week44-1の関連ドリル。未入力と長さ超過で文が使い分けられるか確認しましょう。
- 既習: Week43の設問・選択肢の関連保存。Week39の論理削除、Week42の検証。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week44-custom-message-key
- 類題: ph3-week44-choice-custom-message-key / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

sampleのrequiredエラーだけを「入力してください」にするmessagesのキーはどれですか？

- wrong1: required.sample
- wrong2: sample.max
- wrong3: email.required
- correct: sample.required（正答）

達成条件: 条件に適合する候補を1つ選ぶ：sample.required

ヒント: 入力名と失敗したルール名をドットでつなぎます。

解説: sample.requiredでその欄の必須エラーを指定します。 PCでは未入力と長さ超過で文が使い分けられるか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 基本の指定はフィールド名.ルール名です。
- 誤答wrong2: 長さ上限のエラーへ指定してしまいます。
- 誤答wrong3: 別のフィールドの必須エラーです。

## question-ph3-week44-choice-admin-delete-auth（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「削除ルートまたはControllerで管理者認可を必須にする」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:772 / Week 44
- ドリル接続: PH3 Week44のPOSSE課題。一般ユーザーから直接削除を要求して拒否を確認しましょう。
- 既習: Week43の設問・選択肢の関連保存。Week39の論理削除、Week42の検証。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week44-admin-delete-auth
- 類題: ph3-week44-choice-admin-delete-auth / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

一般ユーザーの画面から削除ボタンを外しました。削除リクエストを管理者だけに制限する方法はどれですか？

- wrong2: 確認モーダルだけを追加してサーバー確認を省く
- wrong3: URLにadminと書くだけ
- correct: 削除ルートまたはControllerで管理者認可を必須にする（正答）
- wrong1: ボタンを隠したので削除ルートを公開したままにする

達成条件: 条件に適合する候補を1つ選ぶ：削除ルートまたはControllerで管理者認可を必須にする

ヒント: サーバーへ届いた時点で利用者の許可を調べます。

解説: 管理者認可を削除処理の入口で強制します。 PCでは一般ユーザーから直接削除を要求して拒否を確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 直接のリクエストを防げません。
- 誤答wrong2: モーダルを経由しない送信が可能です。
- 誤答wrong3: パス名は利用者の権限を確認しません。

## question-ph3-week44-choice-edit-check-related-data（版1・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: 提示条件に対して「対象クイズの画面とDBで設問・選択肢・正解フラグを照合する」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:772 / Week 44
- ドリル接続: PH3 Week44のPOSSE課題。別設問の選択肢が変わっていないことも確認しましょう。
- 既習: Week43の設問・選択肢の関連保存。Week39の論理削除、Week42の検証。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week44-edit-check-related-data
- 類題: ph3-week44-choice-edit-check-related-data / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

設問と3つの選択肢を編集し、保存の成功通知が出ました。内容の対応を確かめる確認はどれですか？

- wrong3: 画面を閉じて確認を省く
- correct: 対象クイズの画面とDBで設問・選択肢・正解フラグを照合する（正答）
- wrong1: 成功通知だけで全項目が正しいと判断する
- wrong2: 別のクイズの見出しだけを見る

達成条件: 条件に適合する候補を1つ選ぶ：対象クイズの画面とDBで設問・選択肢・正解フラグを照合する

ヒント: 保存成功と期待どおりの内容を分けて確認します。

解説: 親子の関連と選択肢の正誤をまとめて照合します。 PCでは別設問の選択肢が変わっていないことも確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 通知だけでは関連付けや個別の保存値を確認できません。
- 誤答wrong2: 変更した対象を確認していません。
- 誤答wrong3: 保存結果が要件と一致するか分かりません。
