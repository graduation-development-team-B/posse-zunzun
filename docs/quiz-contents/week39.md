# Week39｜論理削除・PHPDoc・型

15問。言葉の理解: 2 / 知識の選択: 5 / 知識の組み立て: 5 / 結果の確認・修正: 3

作者向け資料。独立問題。公開されるのは制作状態publishedの問題。

## question-ph3-week39-assembly-soft-delete-trait（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: Quizで論理削除を有効にします。SoftDeletesはimport済み、deleted_at列もあります。モデル内でトレイトを使ってください。
- 出典: curriculum/PH3.md:448 / Week 39
- ドリル接続: PH3 Week39のPOSSE課題へ接続。削除してもDBの行が残るか確認しましょう。
- 既習: Week38までのモデル操作。Week39のSoftDeletes、関連ドリルのPHPDocと型宣言。
- 概念: ph3-week39-soft-delete-trait
- 類題: ph3-week39-assembly-soft-delete-trait / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

Quizで論理削除を有効にします。SoftDeletesはimport済み、deleted_at列もあります。モデル内でトレイトを使ってください。

```php
<?php
use Illuminate\Database\Eloquent\SoftDeletes;
class Quiz extends Model {
  __BLANK__
}
```

- correct: use SoftDeletes;（正答）
- wrong: use Model;

達成条件: Quizで論理削除を有効にします。SoftDeletesはimport済み、deleted_at列もあります。モデル内でトレイトを使ってください。

ヒント: モデルが使うトレイトをクラス内で宣言します。

解説: SoftDeletesを使うモデルはdeleted_atで削除状態を扱います。PCでは削除してもDBの行が残るか確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: Modelは継承元のクラスであり、論理削除のトレイトではありません。

## question-ph3-week39-assembly-deleted-at-column（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: 既存quizzesへ論理削除用のdeleted_at列を追加してください。SchemaとBlueprintはimport済みです。
- 出典: curriculum/PH3.md:448 / Week 39
- ドリル接続: PH3 Week39のPOSSE課題へ接続。マイグレーション後の表構造を確認しましょう。
- 既習: Week38までのモデル操作。Week39のSoftDeletes、関連ドリルのPHPDocと型宣言。
- 概念: ph3-week39-deleted-at-column
- 類題: ph3-week39-assembly-deleted-at-column / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

既存quizzesへ論理削除用のdeleted_at列を追加してください。SchemaとBlueprintはimport済みです。

```php
<?php
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
Schema::table('quizzes', function (Blueprint $table) {
  __BLANK__;
});
```

- correct: $table->softDeletes()（正答）
- wrong: $table->timestamps()

達成条件: 既存quizzesへ論理削除用のdeleted_at列を追加してください。SchemaとBlueprintはimport済みです。

ヒント: 論理削除専用のカラムを用意するメソッドです。

解説: softDeletes()でdeleted_atを追加します。PCではマイグレーション後の表構造を確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: timestampsはcreated_atとupdated_atを用意するヘルパーです。

## question-ph3-week39-assembly-soft-delete-model（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: $quizはSoftDeletesを使用する取得済みモデルです。論理削除してください。
- 出典: curriculum/PH3.md:448 / Week 39
- ドリル接続: PH3 Week39のPOSSE課題へ接続。通常一覧から消え、DBには残ることを確認しましょう。
- 既習: Week38までのモデル操作。Week39のSoftDeletes、関連ドリルのPHPDocと型宣言。
- 概念: ph3-week39-soft-delete-model
- 類題: ph3-week39-assembly-soft-delete-model / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

$quizはSoftDeletesを使用する取得済みモデルです。論理削除してください。

```php
<?php
__BLANK__;
```

- correct: $quiz->delete()（正答）
- wrong: $quiz->forceDelete()

達成条件: $quizはSoftDeletesを使用する取得済みモデルです。論理削除してください。

ヒント: SoftDeletesモデルの通常の削除メソッドを選びます。

解説: delete()でdeleted_atを設定します。PCでは通常一覧から消え、DBには残ることを確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: forceDeleteは行を物理削除するため、論理削除の指定に合いません。

## question-ph3-week39-assembly-phpdoc-property（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: モデルのfirst_nameが文字列だとエディターへ伝えるPHPDocを組み立ててください。実行時の検証にはなりません。
- 出典: curriculum/PH3.md:448 / Week 39
- ドリル接続: week39-1の関連ドリルへ接続。補完を確認し、実際のデータ型も別途確認しましょう。
- 既習: Week38までのモデル操作。Week39のSoftDeletes、関連ドリルのPHPDocと型宣言。
- 概念: ph3-week39-phpdoc-property
- 類題: ph3-week39-assembly-phpdoc-property / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

モデルのfirst_nameが文字列だとエディターへ伝えるPHPDocを組み立ててください。実行時の検証にはなりません。

```php
<?php
/**
 * __BLANK__
 */
class User extends Model {}
```

- correct: @property string $first_name（正答）
- wrong: @property int $first_name

達成条件: モデルのfirst_nameが文字列だとエディターへ伝えるPHPDocを組み立ててください。実行時の検証にはなりません。

ヒント: 属性の名前と型を対応させます。

解説: @property string $first_nameで補完向けの情報を添えます。PCでは補完を確認し、実際のデータ型も別途確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: intは整数型であり、文字列のfirst_nameの注釈に合いません。

## question-ph3-week39-assembly-integer-signature（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: strict_types=1のPHPです。整数だけを受け取り、1増やした整数を返す関数のシグネチャを作ってください。
- 出典: curriculum/PH3.md:448 / Week 39
- ドリル接続: week39-3の関連ドリルへ接続。1が2になり、null入力がエラーになることを確認しましょう。
- 既習: Week38までのモデル操作。Week39のSoftDeletes、関連ドリルのPHPDocと型宣言。
- 概念: ph3-week39-integer-signature
- 類題: ph3-week39-assembly-integer-signature / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

strict_types=1のPHPです。整数だけを受け取り、1増やした整数を返す関数のシグネチャを作ってください。

```php
<?php
declare(strict_types=1);
function __BLANK__ {
  return $number + 1;
}
```

- correct: incrementNumber(int $number): int（正答）
- wrong: incrementNumber(string $number): int

達成条件: strict_types=1のPHPです。整数だけを受け取り、1増やした整数を返す関数のシグネチャを作ってください。

ヒント: 引数と戻り値の型をそれぞれ指定します。

解説: intの引数とintの戻り値を宣言します。PCでは1が2になり、null入力がエラーになることを確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 固定入力で正誤比較。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: stringでは整数の引数を受け取るという指定と一致しません。

## question-ph3-week39-choice-soft-delete-state（版1・published）

- 形式: choice
- 主対象: 言葉の理解
- 学習目標: 提示条件に対して「deleted_atに削除日時が入り、行は残る」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:448 / Week 39
- ドリル接続: PH3 Week39のPOSSE課題。DBで行の存在とdeleted_atを照合しましょう。
- 既習: Week38までのモデル操作。Week39のSoftDeletes、関連ドリルのPHPDocと型宣言。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week39-soft-delete-state
- 類題: ph3-week39-choice-soft-delete-state / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

SoftDeletesを使うモデルをdeleteしたとき、行はどうなりますか？

- correct: deleted_atに削除日時が入り、行は残る（正答）
- wrong1: 行が必ず物理削除される
- wrong2: nameが必ず空文字になる
- wrong3: idが必ず0へ変わる

達成条件: 条件に適合する候補を1つ選ぶ：deleted_atに削除日時が入り、行は残る

ヒント: 削除扱いの日時を残す仕組みです。

解説: 行を残したまま削除日時を記録します。 PCではDBで行の存在とdeleted_atを照合しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: SoftDeletesを使うdeleteは論理削除です。
- 誤答wrong2: 論理削除の目印はdeleted_atです。
- 誤答wrong3: 主キーを書き換える仕組みではありません。

## question-ph3-week39-choice-soft-delete-prerequisites（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「モデルのSoftDeletesトレイトとテーブルのdeleted_at列」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:448 / Week 39
- ドリル接続: PH3 Week39のPOSSE課題。モデルのuseと適用済みマイグレーションを確認しましょう。
- 既習: Week38までのモデル操作。Week39のSoftDeletes、関連ドリルのPHPDocと型宣言。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week39-soft-delete-prerequisites
- 類題: ph3-week39-choice-soft-delete-prerequisites / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

論理削除を有効にする組み合わせはどれですか？

- wrong1: ビューの削除ボタンだけ
- wrong2: モデルのhiddenだけとname列
- wrong3: CSSのdisplay:noneだけ
- correct: モデルのSoftDeletesトレイトとテーブルのdeleted_at列（正答）

達成条件: 条件に適合する候補を1つ選ぶ：モデルのSoftDeletesトレイトとテーブルのdeleted_at列

ヒント: モデルの機能とDBの保存先が必要です。

解説: SoftDeletesと削除日時の列をそろえます。 PCではモデルのuseと適用済みマイグレーションを確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: ボタンの追加だけでは論理削除の保存処理になりません。
- 誤答wrong2: hiddenはJSON表示の設定であり、論理削除の設定ではありません。
- 誤答wrong3: 画面を隠してもDB上の削除状態は変わりません。

## question-ph3-week39-choice-default-excludes-deleted（版1・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: 提示条件に対して「論理削除されていないクイズ」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:448 / Week 39
- ドリル接続: PH3 Week39のPOSSE課題。1件を論理削除した前後で一覧を比較しましょう。
- 既習: Week38までのモデル操作。Week39のSoftDeletes、関連ドリルのPHPDocと型宣言。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week39-default-excludes-deleted
- 類題: ph3-week39-choice-default-excludes-deleted / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

QuizにSoftDeletesがあります。特別なスコープ追加のないQuiz::all()で取得するものはどれですか？

- wrong2: 削除済みも必ず全件含む
- wrong3: 必ず空のコレクション
- correct: 論理削除されていないクイズ（正答）
- wrong1: 論理削除されたクイズだけ

達成条件: 条件に適合する候補を1つ選ぶ：論理削除されていないクイズ

ヒント: SoftDeletesの標準の絞り込みを考えます。

解説: 通常のクエリはdeleted_atが設定された行を除きます。 PCでは1件を論理削除した前後で一覧を比較しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 削除済みだけを取るにはonlyTrashedなどを使います。
- 誤答wrong2: 通常のクエリは削除済みを除外します。
- 誤答wrong3: 未削除のレコードがあれば取得します。

## question-ph3-week39-choice-with-trashed（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「Quiz::withTrashed()->get()」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:448 / Week 39
- ドリル接続: PH3 Week39のPOSSE課題。管理用の一覧で両方が出るか確認しましょう。
- 既習: Week38までのモデル操作。Week39のSoftDeletes、関連ドリルのPHPDocと型宣言。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week39-with-trashed
- 類題: ph3-week39-choice-with-trashed / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

SoftDeletesのQuizで、未削除と削除済みの両方を取得するものはどれですか？

- wrong3: Quiz::whereNull("name")->get()
- correct: Quiz::withTrashed()->get()（正答）
- wrong1: Quiz::onlyTrashed()->get()
- wrong2: Quiz::all()

達成条件: 条件に適合する候補を1つ選ぶ：Quiz::withTrashed()->get()

ヒント: 削除済みを含める指定です。

解説: withTrashedで削除済みも対象へ含めます。 PCでは管理用の一覧で両方が出るか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 削除済みだけになり未削除を含みません。
- 誤答wrong2: 標準では削除済みを除外します。
- 誤答wrong3: 削除状態ではなくnameがNULLかで絞り込んでしまいます。

## question-ph3-week39-choice-force-delete-difference（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「forceDelete()」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:448 / Week 39
- ドリル接続: PH3 Week39のPOSSE課題。破棄可能な検証データで行が残るか比較しましょう。
- 既習: Week38までのモデル操作。Week39のSoftDeletes、関連ドリルのPHPDocと型宣言。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week39-force-delete-difference
- 類題: ph3-week39-choice-force-delete-difference / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

SoftDeletesモデルで、行自体をDBから取り除く操作はどれですか？

- correct: forceDelete()（正答）
- wrong1: delete()
- wrong2: trashed()
- wrong3: withTrashed()

達成条件: 条件に適合する候補を1つ選ぶ：forceDelete()

ヒント: 論理削除と物理削除を分けます。

解説: forceDeleteは行を物理削除します。 PCでは破棄可能な検証データで行が残るか比較しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: この前提では削除日時を付けて行を残します。
- 誤答wrong2: 削除済みかを確認するだけです。
- 誤答wrong3: 取得対象を広げる指定で削除しません。

## question-ph3-week39-choice-restore-model（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「$quiz->restore();」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:448 / Week 39
- ドリル接続: PH3 Week39のPOSSE課題。deleted_atと通常一覧への再表示を確認しましょう。
- 既習: Week38までのモデル操作。Week39のSoftDeletes、関連ドリルのPHPDocと型宣言。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week39-restore-model
- 類題: ph3-week39-choice-restore-model / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

SoftDeletesで論理削除されたモデルを取得済みです。削除状態を解除するものはどれですか？

- wrong1: $quiz->forceDelete();
- wrong2: $quiz->delete();
- wrong3: $quiz->trashed();
- correct: $quiz->restore();（正答）

達成条件: 条件に適合する候補を1つ選ぶ：$quiz->restore();

ヒント: 削除日時を解除するモデルの操作です。

解説: restoreで論理削除状態から戻します。 PCではdeleted_atと通常一覧への再表示を確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 復元ではなく行を物理削除します。
- 誤答wrong2: 削除状態を解除する操作ではありません。
- 誤答wrong3: 削除済みかの判定だけで更新しません。

## question-ph3-week39-choice-confirmation-cancel（版1・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: 提示条件に対して「削除リクエストを送らず閉じる」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:448 / Week 39
- ドリル接続: PH3 Week39のPOSSE課題。キャンセル後もDBと一覧にデータが残るか確認しましょう。
- 既習: Week38までのモデル操作。Week39のSoftDeletes、関連ドリルのPHPDocと型宣言。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week39-confirmation-cancel
- 類題: ph3-week39-choice-confirmation-cancel / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

削除確認モーダルで「いいえ」を押したときの適切な動作はどれですか？

- wrong2: nameだけを削除して残す
- wrong3: 確認前に削除してから閉じる
- correct: 削除リクエストを送らず閉じる（正答）
- wrong1: 閉じた後で削除リクエストを送る

達成条件: 条件に適合する候補を1つ選ぶ：削除リクエストを送らず閉じる

ヒント: キャンセルではデータを変えません。

解説: 「はい」を選んだときだけ削除処理を実行します。 PCではキャンセル後もDBと一覧にデータが残るか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: キャンセルしたのに削除が実行されます。
- 誤答wrong2: 利用者が求めていないデータ変更になります。
- 誤答wrong3: 確認が誤削除防止として機能しません。

## question-ph3-week39-choice-factory-count（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「Quiz::factory()->count(100)->create()」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:448 / Week 39
- ドリル接続: PH3 Week39のPOSSE課題。検証用DBで実行前後の件数を比べましょう。
- 既習: Week38までのモデル操作。Week39のSoftDeletes、関連ドリルのPHPDocと型宣言。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week39-factory-count
- 類題: ph3-week39-choice-factory-count / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

Factory設定済みのQuizで、ダミー100件をDBへ作成するものはどれですか？

- wrong3: Quiz::factory()->count(1)->create()
- correct: Quiz::factory()->count(100)->create()（正答）
- wrong1: Quiz::factory()->count(100)->make()
- wrong2: Quiz::all()->take(100)

達成条件: 条件に適合する候補を1つ選ぶ：Quiz::factory()->count(100)->create()

ヒント: 生成件数とDBへ保存する操作を合わせます。

解説: countで件数を指定しcreateで保存します。 PCでは検証用DBで実行前後の件数を比べましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: makeはモデルを用意しますがDBへ保存しません。
- 誤答wrong2: 既存行の取得であり新規作成ではありません。
- 誤答wrong3: 作成する件数が100件ではありません。

## question-ph3-week39-choice-phpdoc-purpose（版1・published）

- 形式: choice
- 主対象: 言葉の理解
- 学習目標: 提示条件に対して「エディターなどへ属性と型の情報を伝える」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:448 / Week 39
- ドリル接続: week39-1の関連ドリル。エディターで属性の補完が出るか確認しましょう。
- 既習: Week38までのモデル操作。Week39のSoftDeletes、関連ドリルのPHPDocと型宣言。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week39-phpdoc-purpose
- 類題: ph3-week39-choice-phpdoc-purpose / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

モデルのPHPDocに@property string $first_nameを書く主な目的はどれですか？

- correct: エディターなどへ属性と型の情報を伝える（正答）
- wrong1: DBにfirst_name列を追加する
- wrong2: 入力文字列を必須にする
- wrong3: first_nameを自動で一括代入可能にする

達成条件: 条件に適合する候補を1つ選ぶ：エディターなどへ属性と型の情報を伝える

ヒント: 説明用の型情報と実行時の検証を分けます。

解説: PHPDocは補完や静的解析に利用される情報です。 PCではエディターで属性の補完が出るか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: コメントだけではテーブル構造は変わりません。
- 誤答wrong2: PHPDocは入力バリデーションではありません。
- 誤答wrong3: 一括代入の許可にはfillableなどの設定が必要です。

## question-ph3-week39-choice-typed-increment（版1・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: 提示条件に対して「inc(1)」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:448 / Week 39
- ドリル接続: week39-3の関連ドリル。ローカルPHPで正しい入力と型の異なる入力を比較しましょう。
- 既習: Week38までのモデル操作。Week39のSoftDeletes、関連ドリルのPHPDocと型宣言。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week39-typed-increment
- 類題: ph3-week39-choice-typed-increment / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

同じPHPファイルにdeclare(strict_types=1);があり、function inc(int $n): int { return $n + 1; }を定義しています。整数2を返す呼び出しはどれですか？

- wrong1: inc("1")
- wrong2: inc(null)
- wrong3: inc([1])
- correct: inc(1)（正答）

達成条件: 条件に適合する候補を1つ選ぶ：inc(1)

ヒント: 値だけでなく引数の型も確認します。

解説: 整数の1を渡すと整数の2が返ります。 PCではローカルPHPで正しい入力と型の異なる入力を比較しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: このstrict_typesの呼び出しで文字列はint引数に適合しません。
- 誤答wrong2: 引数はnullを許可していません。
- 誤答wrong3: 配列はint引数に適合しません。
