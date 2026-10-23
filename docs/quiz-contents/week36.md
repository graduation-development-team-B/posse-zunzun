# Week36｜一覧・リレーション・先読み

15問。言葉の理解: 2 / 知識の選択: 5 / 知識の組み立て: 6 / 結果の確認・修正: 2

作者向け資料。独立問題。公開されるのは制作状態publishedの問題。

## question-ph3-week36-assembly-list-quizzes（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: Quizはimport済みです。クイズを条件で絞らず全件取得し、$quizzesへ入れてください。
- 出典: curriculum/PH3.md:324 / Week 36
- ドリル接続: PH3 Week36のPOSSE課題へ接続。2つのカテゴリーが一覧に出るか確認しましょう。
- 既習: Week35のモデルと表の所属列。Week36の一覧・foreach・関連取得。
- 概念: ph3-week36-list-quizzes
- 類題: ph3-week36-assembly-list-quizzes / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

Quizはimport済みです。クイズを条件で絞らず全件取得し、$quizzesへ入れてください。

```php
<?php
 $quizzes = __BLANK__;
```

- correct: Quiz::all()（正答）
- wrong: Quiz::first()

達成条件: Quizはimport済みです。クイズを条件で絞らず全件取得し、$quizzesへ入れてください。

ヒント: 全件取得と先頭1件のメソッドを区別します。

解説: all()でモデルのコレクションを取得します。PCでは2つのカテゴリーが一覧に出るか確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: firstは1件だけを返し、全件の一覧にはなりません。

## question-ph3-week36-assembly-foreach-list（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: $quizzesは取得済みです。Bladeで各クイズのnameをliとして繰り返し表示してください。
- 出典: curriculum/PH3.md:324 / Week 36
- ドリル接続: PH3 Week36のPOSSE課題へ接続。一覧件数とliの数を比べましょう。
- 既習: Week35のモデルと表の所属列。Week36の一覧・foreach・関連取得。
- 概念: ph3-week36-foreach-list
- 類題: ph3-week36-assembly-foreach-list / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

$quizzesは取得済みです。Bladeで各クイズのnameをliとして繰り返し表示してください。

```blade
<ul>
__BLANK__
</ul>
```

- correct: @foreach ($quizzes as $quiz)
<li>{{ $quiz->name }}</li>
@endforeach（正答）
- wrong: @foreach ($quiz as $quizzes)
<li>{{ $quiz->name }}</li>
@endforeach

達成条件: $quizzesは取得済みです。Bladeで各クイズのnameをliとして繰り返し表示してください。

ヒント: foreachのasの前に集合、後に1件を書きます。

解説: コレクションから1件ずつ受け取って同じ表示を繰り返します。PCでは一覧件数とliの数を比べましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。静的意味レビューのみ。Blade/Laravelは実行しない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: 繰り返す集合と、1件を受け取る変数が逆です。

## question-ph3-week36-assembly-named-link（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: quizzes.indexという名前のルートは登録済みです。Bladeのリンク先をそのルートから生成してください。
- 出典: curriculum/PH3.md:324 / Week 36
- ドリル接続: PH3 Week36のPOSSE課題へ接続。リンクをクリックして/quizzesへ移動できるか確認しましょう。
- 既習: Week35のモデルと表の所属列。Week36の一覧・foreach・関連取得。
- 概念: ph3-week36-named-link
- 類題: ph3-week36-assembly-named-link / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

quizzes.indexという名前のルートは登録済みです。Bladeのリンク先をそのルートから生成してください。

```blade
<a href="{{ __BLANK__ }}">クイズ一覧</a>
```

- correct: route('quizzes.index')（正答）
- wrong: view('quizzes.index')

達成条件: quizzes.indexという名前のルートは登録済みです。Bladeのリンク先をそのルートから生成してください。

ヒント: 名前付きルートからURLを作るヘルパーを使います。

解説: routeでルート名をURLへ変換します。PCではリンクをクリックして/quizzesへ移動できるか確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。静的意味レビューのみ。Blade/Laravelは実行しない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: viewは表示するテンプレートを返す関数で、リンクのURL生成ではありません。

## question-ph3-week36-assembly-has-many-questions（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: Quizに複数のQuestionが所属します。questions.quiz_idが外部キーです。クイズ側のquestionsリレーションを作ってください。
- 出典: curriculum/PH3.md:324 / Week 36
- ドリル接続: PH3 Week36のPOSSE課題へ接続。quiz_idが同じ複数設問を用意して確認しましょう。
- 既習: Week35のモデルと表の所属列。Week36の一覧・foreach・関連取得。
- 概念: ph3-week36-has-many-questions
- 類題: ph3-week36-assembly-has-many-questions / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

Quizに複数のQuestionが所属します。questions.quiz_idが外部キーです。クイズ側のquestionsリレーションを作ってください。

```php
<?php
class Quiz extends Model {
  public function questions() {
    return __BLANK__;
  }
}
```

- correct: $this->hasMany(Question::class, 'quiz_id')（正答）
- wrong: $this->belongsTo(Question::class, 'quiz_id')

達成条件: Quizに複数のQuestionが所属します。questions.quiz_idが外部キーです。クイズ側のquestionsリレーションを作ってください。

ヒント: 一つの親から複数の子へのリレーションです。

解説: hasManyでクイズに属する設問を取得します。PCではquiz_idが同じ複数設問を用意して確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: Quizは複数の設問を持つ親なので、子が親に属するbelongsToではありません。

## question-ph3-week36-assembly-eager-questions（版1・published）

- 形式: assembly
- 主対象: 知識の組み立て
- 学習目標: Quizにはquestionsリレーションがあります。各クイズの設問を一覧で使うため、まとめて先読みしてください。
- 出典: curriculum/PH3.md:324 / Week 36
- ドリル接続: PH3 Week36のPOSSE課題へ接続。一覧のループごとに追加クエリが発生していないか確認しましょう。
- 既習: Week35のモデルと表の所属列。Week36の一覧・foreach・関連取得。
- 概念: ph3-week36-eager-questions
- 類題: ph3-week36-assembly-eager-questions / 新規の独立した組み立て問題。前問の状態や正解に依存しない。
- 依存: なし

Quizにはquestionsリレーションがあります。各クイズの設問を一覧で使うため、まとめて先読みしてください。

```php
<?php
 $quizzes = __BLANK__;
```

- correct: Quiz::with('questions')->get()（正答）
- wrong: Quiz::where('questions', 1)->get()

達成条件: Quizにはquestionsリレーションがあります。各クイズの設問を一覧で使うため、まとめて先読みしてください。

ヒント: 取得する関連データの名前をwithへ渡します。

解説: withで関連の先読みを指定します。PCでは一覧のループごとに追加クエリが発生していないか確認しましょう。

採点: 実行なし。候補のコード断片を順序付きで照合。過不足・未定義の組合せは不正解。ヒント利用を記録する。

検証: 2026-10-23 初稿後の別工程で教材・既習・正答・主要誤答を静的意味レビュー済み。PHP CLI -lで正答の構文確認。Laravel実行ではない。 限定トークン採点はtests/content/assembly.test.mjs。Laravelの実行はなし。

- 誤答wrong: whereは行を絞る条件で、リレーションを先読みする指定ではありません。

## question-ph3-week36-choice-has-many-direction（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「hasMany(Question::class)」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:324 / Week 36
- ドリル接続: PH3 Week36のPOSSE課題。QuizとQuestionの関係を矢印で図示しましょう。
- 既習: Week35のモデルと表の所属列。Week36の一覧・foreach・関連取得。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week36-has-many-direction
- 類題: ph3-week36-choice-has-many-direction / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

Quizは複数のQuestionを持ち、questions.quiz_idに所属IDがあります。Quiz側のquestionsの関係はどれですか？

- wrong2: hasOne(Question::class)
- wrong3: belongsToMany(Question::class)
- correct: hasMany(Question::class)（正答）
- wrong1: belongsTo(Question::class)

達成条件: 条件に適合する候補を1つ選ぶ：hasMany(Question::class)

ヒント: 親一つに子が複数あります。

解説: Quizから複数のQuestionへhasManyを定義します。 PCではQuizとQuestionの関係を矢印で図示しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 親クイズから複数の設問への関係なので向きが逆です。
- 誤答wrong2: 設問が複数ある前提と一致しません。
- 誤答wrong3: この設問では中間テーブルを使う多対多ではありません。

## question-ph3-week36-choice-belongs-to-direction（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「belongsTo(Quiz::class)」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:324 / Week 36
- ドリル接続: PH3 Week36のPOSSE課題。Questionからquizの名前を表示できるか確認しましょう。
- 既習: Week35のモデルと表の所属列。Week36の一覧・foreach・関連取得。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week36-belongs-to-direction
- 類題: ph3-week36-choice-belongs-to-direction / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

questions.quiz_idがquizzes.idを参照します。Question側のquizの関係はどれですか？

- wrong3: belongsToMany(User::class)
- correct: belongsTo(Quiz::class)（正答）
- wrong1: hasMany(Quiz::class)
- wrong2: hasOne(Choice::class)

達成条件: 条件に適合する候補を1つ選ぶ：belongsTo(Quiz::class)

ヒント: 所属IDを持つ子から親へたどります。

解説: Questionはquiz_idが示すQuizに属します。 PCではQuestionからquizの名前を表示できるか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 一つの設問が複数クイズを持つという向きではありません。
- 誤答wrong2: 選択肢への関係ではなく親クイズを問うています。
- 誤答wrong3: 利用者との多対多を示す条件はありません。

## question-ph3-week36-choice-get-all（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「Quiz::all()」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:324 / Week 36
- ドリル接続: PH3 Week36のPOSSE課題。取得した件数とローカルDBの件数を照合しましょう。
- 既習: Week35のモデルと表の所属列。Week36の一覧・foreach・関連取得。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week36-get-all
- 類題: ph3-week36-choice-get-all / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

論理削除を使わないQuizモデルで、クイズの全レコードをコレクションとして取得するものはどれですか？

- correct: Quiz::all()（正答）
- wrong1: Quiz::first()
- wrong2: Quiz::find(1)
- wrong3: new Quiz()

達成条件: 条件に適合する候補を1つ選ぶ：Quiz::all()

ヒント: 一つの行と行の集合を区別します。

解説: allで全レコードのコレクションを得ます。 PCでは取得した件数とローカルDBの件数を照合しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 最初の1件であり全件ではありません。
- 誤答wrong2: idが1の1件だけを探します。
- 誤答wrong3: 未保存のモデルを用意するだけで全件を取得しません。

## question-ph3-week36-choice-foreach-binding（版1・published）

- 形式: choice
- 主対象: 知識の組み立て
- 学習目標: 提示条件に対して「@foreach ($quizzes as $quiz) {{ $quiz->name }} @endforeach」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:324 / Week 36
- ドリル接続: PH3 Week36のPOSSE課題。2件以上のデータで一覧に全件が出るか確認しましょう。
- 既習: Week35のモデルと表の所属列。Week36の一覧・foreach・関連取得。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week36-foreach-binding
- 類題: ph3-week36-choice-foreach-binding / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

Controllerから$quizzesを受け取り、各クイズ名を一覧表示する繰り返しはどれですか？

- wrong1: @foreach ($quiz as $quizzes) {{ $quiz->name }} @endforeach
- wrong2: @if ($quizzes) {{ $quiz->name }} @endif
- wrong3: {{ $quizzes->name }}
- correct: @foreach ($quizzes as $quiz) {{ $quiz->name }} @endforeach（正答）

達成条件: 条件に適合する候補を1つ選ぶ：@foreach ($quizzes as $quiz) {{ $quiz->name }} @endforeach

ヒント: 集合から1件ずつ取り出します。

解説: foreachで各モデルを取り出してnameを表示します。 PCでは2件以上のデータで一覧に全件が出るか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 集合と1件の変数の向きが逆です。
- 誤答wrong2: ifだけでは各行への繰り返しや$quizの代入を行いません。
- 誤答wrong3: コレクション全体を1件のモデルのようには扱えません。

## question-ph3-week36-choice-where-condition（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「Quiz::where("name", "ITクイズ")->get()」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:324 / Week 36
- ドリル接続: PH3 Week36のPOSSE課題。他の名前のクイズが混ざらないか確認しましょう。
- 既習: Week35のモデルと表の所属列。Week36の一覧・foreach・関連取得。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week36-where-condition
- 類題: ph3-week36-choice-where-condition / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

Quizのnameが「ITクイズ」のレコードだけを取得するものはどれですか？

- wrong2: Quiz::where("id", "ITクイズ")->get()
- wrong3: Quiz::orderBy("name")->get()
- correct: Quiz::where("name", "ITクイズ")->get()（正答）
- wrong1: Quiz::all()

達成条件: 条件に適合する候補を1つ選ぶ：Quiz::where("name", "ITクイズ")->get()

ヒント: 取得前に列と値の条件を指定します。

解説: whereでnameが一致するものを選びます。 PCでは他の名前のクイズが混ざらないか確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: nameによる絞り込みがありません。
- 誤答wrong2: 照合する列がnameではありません。
- 誤答wrong3: 並べ替えだけでは対象の名前に絞り込めません。

## question-ph3-week36-choice-eager-load-purpose（版1・published）

- 形式: choice
- 主対象: 言葉の理解
- 学習目標: 提示条件に対して「関連する設問を先読みし、ループ内の個別取得を減らす」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:324 / Week 36
- ドリル接続: PH3 Week36のPOSSE課題。クイズ件数を増やしてクエリ数の増え方を確認しましょう。
- 既習: Week35のモデルと表の所属列。Week36の一覧・foreach・関連取得。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week36-eager-load-purpose
- 類題: ph3-week36-choice-eager-load-purpose / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

一覧の各クイズでquestionsを表示します。with("questions")の目的はどれですか？

- wrong3: Bladeのforeachを必ず不要にする
- correct: 関連する設問を先読みし、ループ内の個別取得を減らす（正答）
- wrong1: 各クイズを自動で新規登録する
- wrong2: 設問をすべて物理削除する

達成条件: 条件に適合する候補を1つ選ぶ：関連する設問を先読みし、ループ内の個別取得を減らす

ヒント: 表示前に必要な関連をまとめて取得します。

解説: 先読みで関連へのアクセスごとのクエリを避けます。 PCではクイズ件数を増やしてクエリ数の増え方を確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: withは読み込み方の指定であり、新規作成ではありません。
- 誤答wrong2: 先読みは削除処理ではありません。
- 誤答wrong3: 先読みしても表示の繰り返しは必要です。

## question-ph3-week36-choice-n-plus-one-diagnose（版1・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: 提示条件に対して「Quiz::with("questions")->get()で先読みする」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:324 / Week 36
- ドリル接続: PH3 Week36のPOSSE課題。修正前後のクエリ数を比較しましょう。
- 既習: Week35のモデルと表の所属列。Week36の一覧・foreach・関連取得。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week36-n-plus-one-diagnose
- 類題: ph3-week36-choice-n-plus-one-diagnose / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

Quiz::all()の後、foreach内で毎回$quiz->questionsを読み、クイズ件数に応じてクエリが増えます。修正方針はどれですか？

- correct: Quiz::with("questions")->get()で先読みする（正答）
- wrong1: foreachを二重に増やす
- wrong2: 画面の文字色を変更する
- wrong3: 毎回DBを初期化する

達成条件: 条件に適合する候補を1つ選ぶ：Quiz::with("questions")->get()で先読みする

ヒント: 関連を取り出す前のクエリを見直します。

解説: 必要な関連をwithで先読みします。 PCでは修正前後のクエリ数を比較しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 繰り返しを増やしても取得回数を減らせません。
- 誤答wrong2: クエリ発行の原因は表示色ではありません。
- 誤答wrong3: データを消すことは取得方法の改善ではありません。

## question-ph3-week36-choice-relation-property-method（版1・published）

- 形式: choice
- 主対象: 言葉の理解
- 学習目標: 提示条件に対して「$quiz->questions」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:324 / Week 36
- ドリル接続: PH3 Week36のPOSSE課題。読み取る場合と条件を追加する場合の書き方を比べましょう。
- 既習: Week35のモデルと表の所属列。Week36の一覧・foreach・関連取得。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week36-relation-property-method
- 類題: ph3-week36-choice-relation-property-method / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

questionsは定義済みのhasManyです。取得済みクイズの設問コレクションを動的プロパティで読むものはどれですか？

- wrong1: $quiz->questions()
- wrong2: $quiz->question_id
- wrong3: Quiz::class
- correct: $quiz->questions（正答）

達成条件: 条件に適合する候補を1つ選ぶ：$quiz->questions

ヒント: 動的プロパティとクエリ用のメソッドを区別します。

解説: 括弧なしで関連の結果を参照します。 PCでは読み取る場合と条件を追加する場合の書き方を比べましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 括弧付きはリレーションオブジェクトを返す呼び出しです。
- 誤答wrong2: 親クイズの設問コレクションを指す属性ではありません。
- 誤答wrong3: モデルのクラス名であり関連データではありません。

## question-ph3-week36-choice-route-link-maintain（版1・published）

- 形式: choice
- 主対象: 知識の選択
- 学習目標: 提示条件に対して「{{ route("quizzes.index") }}」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:324 / Week 36
- ドリル接続: PH3 Week36のPOSSE課題。トップから実際に一覧へ移動できるかクリックして確認しましょう。
- 既習: Week35のモデルと表の所属列。Week36の一覧・foreach・関連取得。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week36-route-link-maintain
- 類題: ph3-week36-choice-route-link-maintain / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

トップページのクイズリンクを、登録済みの名前付きルートquizzes.indexへ向けます。hrefの値はどれですか？

- wrong2: quizzes.index
- wrong3: {{ route("users.index") }}
- correct: {{ route("quizzes.index") }}（正答）
- wrong1: {{ view("quizzes.index") }}

達成条件: 条件に適合する候補を1つ選ぶ：{{ route("quizzes.index") }}

ヒント: ルート名をURLへ変換します。

解説: routeヘルパーでクイズ一覧のURLを生成します。 PCではトップから実際に一覧へ移動できるかクリックして確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: ビューの生成はURLの生成ではありません。
- 誤答wrong2: 名前を文字列で書くだけでは登録済みURLへ変換されません。
- 誤答wrong3: 指定されたクイズ一覧とは別のルートです。

## question-ph3-week36-choice-list-empty（版1・published）

- 形式: choice
- 主対象: 結果の確認・修正
- 学習目標: 提示条件に対して「@forelse ($quizzes as $quiz) … @empty … @endforelse」を選び、その理由を説明する。
- 出典: curriculum/PH3.md:324 / Week 36
- ドリル接続: PH3 Week36のPOSSE課題。データがある場合と0件の場合を両方確認しましょう。
- 既習: Week35のモデルと表の所属列。Week36の一覧・foreach・関連取得。 設問内の追加条件は固定。書籍本文・動画・画像を確認したとは扱わない。
- 概念: ph3-week36-list-empty
- 類題: ph3-week36-choice-list-empty / 新規の独立した4択問題。組み立て問題とは提示形式と判断対象を区別する。
- 依存: なし。前問の正答・操作状態に依存しない。

クイズが0件のときだけ「まだありません」と表示し、あるときは各nameを表示します。適したBlade構文はどれですか？

- wrong3: @csrfだけ
- correct: @forelse ($quizzes as $quiz) … @empty … @endforelse（正答）
- wrong1: {{ $quizzes->name }}だけ
- wrong2: @foreachを使い、空の場合の処理をループ本文だけに書く

達成条件: 条件に適合する候補を1つ選ぶ：@forelse ($quizzes as $quiz) … @empty … @endforelse

ヒント: 0件ならループ本文は実行されません。

解説: forelseは一覧の繰り返しと空の場合を分けられます。 PCではデータがある場合と0件の場合を両方確認しましょう。

採点: 単一の正答IDで採点。3つの誤答には候補別理由を表示。

検証: 2026-10-23 初稿保存後の別工程で、教材のWeek範囲・既習・提示条件での単一正答・3誤答の理由・ヒント・解説と次のPC操作を静的に意味レビュー。作者による自己レビュー。Laravel本体・DBは実行しない。docs/quiz-reviews/ph3-choice-week33-48.mdを参照。

- 誤答wrong1: 集合の0件判定と繰り返し表示にはなりません。
- 誤答wrong2: 0件なら本文は一度も実行されません。
- 誤答wrong3: CSRFトークンの出力であり、一覧の分岐ではありません。
