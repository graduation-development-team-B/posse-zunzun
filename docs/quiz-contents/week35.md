# Week35｜マイグレーション・モデル・保存

15問。言葉の理解: 3 / 知識の選択: 4 / 知識の組み立て: 7 / 結果の確認・修正: 1

作者向け資料。独立問題。公開されるのは制作状態publishedの問題。

## question-ph3-week35-assembly-create-quiz-table（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: quizzesテーブルを新規作成します。SchemaとBlueprintはimport済みです。テーブル作成の呼び出しを組み立ててください。
- 出典: curriculum/PH3.md:223 / Week 35
- ドリル接続: PH3 Week35のPOSSE課題へ接続。migrate後にquizzesの列を確認しましょう。
- 既習: Week34のMVCとフォーム。Week35のマイグレーション・fillable・Seeder・バリデーション。
- 概念: ph3-week35-create-quiz-table
- 類題: ph3-week35-assembly-create-quiz-table / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

quizzesテーブルを新規作成します。SchemaとBlueprintはimport済みです。テーブル作成の呼び出しを組み立ててください。

```php
<?php
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
__BLANK__ {
  $table->id();
  $table->string('name');
});
```

- correct: Schema::create('quizzes', function (Blueprint $table)（正答）
- wrong: Schema::table('quizzes', function (Blueprint $table)

達成条件: quizzesテーブルを新規作成します。SchemaとBlueprintはimport済みです。テーブル作成の呼び出しを組み立ててください。

ヒント: 新規作成と既存変更のメソッドを分けます。

解説: Schema::createで表を新規作成します。PCではmigrate後にquizzesの列を確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: tableは既存テーブルの変更で、今回の新規作成ではありません。

## question-ph3-week35-assembly-question-foreign-key（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: questionsのquiz_id列は作成済みです。quizzes.idへの外部キーを定義してください。
- 出典: curriculum/PH3.md:223 / Week 35
- ドリル接続: PH3 Week35のPOSSE課題へ接続。親子の表を図で確認してからマイグレーションを実行しましょう。
- 既習: Week34のMVCとフォーム。Week35のマイグレーション・fillable・Seeder・バリデーション。
- 概念: ph3-week35-question-foreign-key
- 類題: ph3-week35-assembly-question-foreign-key / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

questionsのquiz_id列は作成済みです。quizzes.idへの外部キーを定義してください。

```php
<?php
// Schema::create内の$tableを使う
__BLANK__;
```

- correct: $table->foreign('quiz_id')->references('id')->on('quizzes')（正答）
- wrong: $table->foreign('quiz_id')->references('id')->on('choices')

達成条件: questionsのquiz_id列は作成済みです。quizzes.idへの外部キーを定義してください。

ヒント: 所属を示す列と参照先の親テーブルを合わせます。

解説: questions.quiz_idをquizzes.idへ対応させます。PCでは親子の表を図で確認してからマイグレーションを実行しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: quiz_idが指す先はクイズの表quizzesであり、選択肢のchoicesではありません。

## question-ph3-week35-assembly-fillable-name（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: Quizでnameだけを一括代入可能にします。Modelはimport済みとします。モデルのプロパティを組み立ててください。
- 出典: curriculum/PH3.md:223 / Week 35
- ドリル接続: PH3 Week35のPOSSE課題へ接続。検証済みのnameをcreateやupdateで保存できるか確認しましょう。
- 既習: Week34のMVCとフォーム。Week35のマイグレーション・fillable・Seeder・バリデーション。
- 概念: ph3-week35-fillable-name
- 類題: ph3-week35-assembly-fillable-name / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

Quizでnameだけを一括代入可能にします。Modelはimport済みとします。モデルのプロパティを組み立ててください。

```php
<?php
class Quiz extends Model {
  __BLANK__
}
```

- correct: protected $fillable = ['name'];（正答）
- wrong: protected $hidden = ['name'];

達成条件: Quizでnameだけを一括代入可能にします。Modelはimport済みとします。モデルのプロパティを組み立ててください。

ヒント: 一括代入で更新できる列を許可リストへ指定します。

解説: fillableへ必要な列名だけを記載します。PCでは検証済みのnameをcreateやupdateで保存できるか確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: hiddenは配列やJSONに出す属性を隠す設定で、一括代入の許可ではありません。

## question-ph3-week35-assembly-seed-record（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: Quizはimport済みで、nameはfillableにあります。Seederでnameが「ITクイズ」の1件を作成してください。
- 出典: curriculum/PH3.md:223 / Week 35
- ドリル接続: PH3 Week35のPOSSE課題へ接続。Seeder実行後にnameの保存値を確認しましょう。
- 既習: Week34のMVCとフォーム。Week35のマイグレーション・fillable・Seeder・バリデーション。
- 概念: ph3-week35-seed-record
- 類題: ph3-week35-assembly-seed-record / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

Quizはimport済みで、nameはfillableにあります。Seederでnameが「ITクイズ」の1件を作成してください。

```php
<?php
__BLANK__;
```

- correct: Quiz::create(['name' => 'ITクイズ'])（正答）
- wrong: Quiz::create(['title' => 'ITクイズ'])

達成条件: Quizはimport済みで、nameはfillableにあります。Seederでnameが「ITクイズ」の1件を作成してください。

ヒント: モデルで使う属性名をテーブルの列に合わせます。

解説: createへ属性の配列を渡します。PCではSeeder実行後にnameの保存値を確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: 用意した列はnameなので、titleを渡しても指定の列へ保存できません。

## question-ph3-week35-assembly-name-validation（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: フォームのnameを、必須・文字列・100文字以内として検証します。FormRequestのrules内の項目です。
- 出典: curriculum/PH3.md:223 / Week 35
- ドリル接続: PH3 Week35のPOSSE課題へ接続。空欄・100文字・101文字を送って確認しましょう。
- 既習: Week34のMVCとフォーム。Week35のマイグレーション・fillable・Seeder・バリデーション。
- 概念: ph3-week35-name-validation
- 類題: ph3-week35-assembly-name-validation / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

フォームのnameを、必須・文字列・100文字以内として検証します。FormRequestのrules内の項目です。

```php
<?php
class StoreQuizRequest extends FormRequest {
  public function rules(): array {
    return ['name' => __BLANK__];
  }
}
```

- correct: ['required', 'string', 'max:100']（正答）
- wrong: ['required', 'string', 'min:100']

達成条件: フォームのnameを、必須・文字列・100文字以内として検証します。FormRequestのrules内の項目です。

ヒント: 上限のルールにmaxを使います。

解説: required・string・max:100を組み合わせます。PCでは空欄・100文字・101文字を送って確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: min:100は100文字以上という逆の条件です。

## question-ph3-week35-choice-migration-purpose（版1・published）

- 形式: choice
- 主対象: 言葉の理解
- 学習目標: 提示条件に対して「テーブルや列などDB構造の変更」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:223 / Week 35
- ドリル接続: PH3 Week35のPOSSE課題。quizzesを作るupと戻すdownの対応を読みましょう。
- 既習: Week34のMVCとフォーム。Week35のマイグレーション・fillable・Seeder・バリデーション。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week35-migration-purpose
- 類題: ph3-week35-choice-migration-purpose / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

マイグレーションで主に管理するものはどれですか？

- correct: テーブルや列などDB構造の変更（正答）
- wrong1: 各利用者のログイン中のCookieだけ
- wrong2: 画面に表示するクイズの色だけ
- wrong3: すべてのPHP依存のバージョンだけ

達成条件: 条件に適合する候補を1つ選ぶ：テーブルや列などDB構造の変更

ヒント: DBの構造をコードで再現する仕組みです。

解説: マイグレーションは構造変更の履歴を共有します。 PCではquizzesを作るupと戻すdownの対応を読みましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: CookieはDBの構造変更そのものではありません。
- 誤答wrong2: 見た目はCSSやビューで扱います。
- 誤答wrong3: PHP依存の管理はComposerが担当します。

## question-ph3-week35-choice-foreign-key-direction（版1・published）

- 形式: choice
- 主対象: 知識の組み立て
- 学習目標: 提示条件に対して「各設問が所属するクイズ」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:223 / Week 35
- ドリル接続: PH3 Week35のPOSSE課題。2つのクイズに異なるquiz_idの設問を用意して確認しましょう。
- 既習: Week34のMVCとフォーム。Week35のマイグレーション・fillable・Seeder・バリデーション。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week35-foreign-key-direction
- 類題: ph3-week35-choice-foreign-key-direction / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

questions.quiz_idがquizzes.idを参照します。この列が表すものはどれですか？

- wrong1: 各クイズの表示色
- wrong2: 各選択肢の正誤
- wrong3: ログイン中の利用者のパスワード
- correct: 各設問が所属するクイズ（正答）

達成条件: 条件に適合する候補を1つ選ぶ：各設問が所属するクイズ

ヒント: 子の行から親の行を指します。

解説: questionsの各行から所属するquizzesの行へつながります。 PCでは2つのクイズに異なるquiz_idの設問を用意して確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: quiz_idは親クイズへの参照です。
- 誤答wrong2: 正誤はchoices.is_correctで扱います。
- 誤答wrong3: 設問とクイズの関係を表す列です。

## question-ph3-week35-choice-nullable-supplement（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「$table->string("supplement")->nullable();」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:223 / Week 35
- ドリル接続: PH3 Week35のPOSSE課題。DBの列定義と補足なしの保存結果を照合しましょう。
- 既習: Week34のMVCとフォーム。Week35のマイグレーション・fillable・Seeder・バリデーション。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week35-nullable-supplement
- 類題: ph3-week35-choice-nullable-supplement / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

設問補足supplementは未入力ならNULLで保存できます。マイグレーションの指定はどれですか？

- wrong2: $table->string("supplement")->default("必須");
- wrong3: $table->dropColumn("supplement");
- correct: $table->string("supplement")->nullable();（正答）
- wrong1: $table->string("supplement")->unique();

達成条件: 条件に適合する候補を1つ選ぶ：$table->string("supplement")->nullable();

ヒント: 値がない状態を列で許可します。

解説: nullableでNULLを許可します。 PCではDBの列定義と補足なしの保存結果を照合しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: uniqueは重複の制約で、NULL許可の指定とは異なります。
- 誤答wrong2: 未入力時の固定文字列とNULL許可は異なります。
- 誤答wrong3: 列を削除すると補足を保存できなくなります。

## question-ph3-week35-choice-model-table（版1・published）

- 形式: choice
- 主対象: 言葉の理解
- 学習目標: 提示条件に対して「quizzesのデータを取得・保存する処理を扱う」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:223 / Week 35
- ドリル接続: PH3 Week35のPOSSE課題。Quizモデルとquizzesテーブルの対応を確認しましょう。
- 既習: Week34のMVCとフォーム。Week35のマイグレーション・fillable・Seeder・バリデーション。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week35-model-table
- 類題: ph3-week35-choice-model-table / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

Quizモデルを用意する主な目的はどれですか？

- wrong3: Bladeの見出しを必ず生成する
- correct: quizzesのデータを取得・保存する処理を扱う（正答）
- wrong1: ブラウザのCSSを自動で全画面に配る
- wrong2: すべてのURLを定義する

達成条件: 条件に適合する候補を1つ選ぶ：quizzesのデータを取得・保存する処理を扱う

ヒント: MVCのデータを扱う役割です。

解説: Eloquentモデルを通してレコードを扱えます。 PCではQuizモデルとquizzesテーブルの対応を確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: モデルの中心的な責務はデータ操作です。
- 誤答wrong2: URLの登録はルートの役割です。
- 誤答wrong3: 表示用のHTMLはビューで扱います。

## question-ph3-week35-choice-fillable-allowlist（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「protected $fillable = ["name"];」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:223 / Week 35
- ドリル接続: PH3 Week35のPOSSE課題。モデルと保存する検証済み配列のキーを照合しましょう。
- 既習: Week34のMVCとフォーム。Week35のマイグレーション・fillable・Seeder・バリデーション。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week35-fillable-allowlist
- 類題: ph3-week35-choice-fillable-allowlist / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

Quiz::createでnameだけを一括代入させます。fillableの設定はどれですか？

- correct: protected $fillable = ["name"];（正答）
- wrong1: protected $hidden = ["name"];
- wrong2: protected $fillable = ["id", "is_admin"];
- wrong3: protected $table = "name";

達成条件: 条件に適合する候補を1つ選ぶ：protected $fillable = ["name"];

ヒント: 一括代入できる属性を許可する設定です。

解説: 必要な列だけをfillableへ指定します。 PCではモデルと保存する検証済み配列のキーを照合しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: hiddenは配列やJSONで隠す属性の指定です。
- 誤答wrong2: nameを許可せず不要な属性を指定しています。
- 誤答wrong3: tableは対応テーブル名の指定です。

## question-ph3-week35-choice-seeder-versus-migration（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「Seeder」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:223 / Week 35
- ドリル接続: PH3 Week35のPOSSE課題。Seeder実行後にquizzesのnameを確認しましょう。
- 既習: Week34のMVCとフォーム。Week35のマイグレーション・fillable・Seeder・バリデーション。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week35-seeder-versus-migration
- 類題: ph3-week35-choice-seeder-versus-migration / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

クイズのタイトル「ITクイズ」を初期データとして登録します。担当する仕組みはどれですか？

- wrong1: Bladeのコンポーネント
- wrong2: ルート名だけ
- wrong3: CSSの変数
- correct: Seeder（正答）

達成条件: 条件に適合する候補を1つ選ぶ：Seeder

ヒント: 構造を作る処理と行を入れる処理を分けます。

解説: Seederへ初期データの登録を記述します。 PCではSeeder実行後にquizzesのnameを確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 共通表示の仕組みで、初期データの登録ではありません。
- 誤答wrong2: URLの識別名だけではレコードを登録しません。
- 誤答wrong3: 見た目の値はDBの初期行を作成しません。

## question-ph3-week35-choice-factory-role（版1・published）

- 形式: choice
- 主対象: 言葉の理解
- 学習目標: 提示条件に対して「Factory」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:223 / Week 35
- ドリル接続: PH3 Week35のPOSSE課題。対象モデルのFactoryで生成される列を確認しましょう。
- 既習: Week34のMVCとフォーム。Week35のマイグレーション・fillable・Seeder・バリデーション。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week35-factory-role
- 類題: ph3-week35-choice-factory-role / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

テスト用に内容が異なるダミーレコードを多数作りたいとき、属性の生成ルールをまとめる仕組みはどれですか？

- wrong2: @foreachだけ
- wrong3: composer.lockだけ
- correct: Factory（正答）
- wrong1: Route::getだけ

達成条件: 条件に適合する候補を1つ選ぶ：Factory

ヒント: テストデータの形を定義します。

解説: Factoryに属性の生成方法を定義し、必要な件数を作れます。 PCでは対象モデルのFactoryで生成される列を確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: ルート定義はダミーデータの生成規則ではありません。
- 誤答wrong2: 既存データの繰り返し表示であり、DBの行を生成しません。
- 誤答wrong3: 依存の固定情報であり、モデル属性の生成規則ではありません。

## question-ph3-week35-choice-rollback-down（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「Schema::dropIfExists("choices");」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:223 / Week 35
- ドリル接続: PH3 Week35のPOSSE課題。破棄可能なローカルDBでロールバックの対象を確認しましょう。
- 既習: Week34のMVCとフォーム。Week35のマイグレーション・fillable・Seeder・バリデーション。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week35-rollback-down
- 類題: ph3-week35-choice-rollback-down / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

upで新規作成したchoicesテーブルをロールバック時に削除します。downの内容はどれですか？

- wrong3: return view("choices.index");
- correct: Schema::dropIfExists("choices");（正答）
- wrong1: Schema::create("choices", function ($table) {});
- wrong2: Schema::dropIfExists("users");

達成条件: 条件に適合する候補を1つ選ぶ：Schema::dropIfExists("choices");

ヒント: upで変更した対象を逆の操作で戻します。

解説: 作成したテーブルに対応する削除をdownへ書きます。 PCでは破棄可能なローカルDBでロールバックの対象を確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 作成を戻す場面で再度作成してはいけません。
- 誤答wrong2: 戻す対象はchoicesでありusersではありません。
- 誤答wrong3: 画面を返してもテーブルは削除されません。

## question-ph3-week35-choice-choice-parent（版1・published）

- 形式: choice
- 主対象: 知識の組み立て
- 学習目標: 提示条件に対して「その選択肢が属する設問」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:223 / Week 35
- ドリル接続: PH3 Week35のPOSSE課題。同じ設問の選択肢に同じquestion_idが入るか確認しましょう。
- 既習: Week34のMVCとフォーム。Week35のマイグレーション・fillable・Seeder・バリデーション。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week35-choice-parent
- 類題: ph3-week35-choice-choice-parent / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

choices.question_idが示すものはどれですか？

- correct: その選択肢が属する設問（正答）
- wrong1: 選択肢自身の主キーidと必ず同じ値
- wrong2: クイズのタイトルの文字数
- wrong3: 正解なら1、不正解なら0という値

達成条件: 条件に適合する候補を1つ選ぶ：その選択肢が属する設問

ヒント: 選択肢から一つ上の親を指します。

解説: question_idでchoicesとquestionsを対応させます。 PCでは同じ設問の選択肢に同じquestion_idが入るか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 所属先と自分自身の主キーは別です。
- 誤答wrong2: 設問への参照を示す列です。
- 誤答wrong3: 正誤のフラグはis_correctです。

## question-ph3-week35-choice-validation-versus-fillable（版1・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: 提示条件に対して「nameが必須で100文字以内であること」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:223 / Week 35
- ドリル接続: PH3 Week35のPOSSE課題。保存前のバリデーションへrequiredとmaxを用意しましょう。
- 既習: Week34のMVCとフォーム。Week35のマイグレーション・fillable・Seeder・バリデーション。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week35-validation-versus-fillable
- 類題: ph3-week35-choice-validation-versus-fillable / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

nameをfillableに追加しました。この設定だけでは保証されないものはどれですか？

- wrong1: nameを一括代入の許可対象に含めること
- wrong2: 一括代入で許可する属性を指定すること
- wrong3: createへ渡せる属性の範囲を設定すること
- correct: nameが必須で100文字以内であること（正答）

達成条件: 条件に適合する候補を1つ選ぶ：nameが必須で100文字以内であること

ヒント: 属性の許可と値の検証を区別します。

解説: fillableは必須や長さのルールを検証しません。 PCでは保存前のバリデーションへrequiredとmaxを用意しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: それはfillableの役割です。
- 誤答wrong2: fillableは属性の許可リストです。
- 誤答wrong3: それはfillableによる設定の範囲です。
