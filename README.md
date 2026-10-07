# POSSE ZUNZUN

POSSEのインプットとミニドリルをつなぐ、小さなクイズの学習アプリ。

## 起動

```sh
npm install
npm run web
```

Web版でWeek01〜06各12問とGit/GitHub10問、計82問に対応。問題を選び、回答・解説・実行結果を確認し、途中状態と記録を端末に保存します。

## 作問

[制作から投入まで](docs/quiz-authoring.md)を参照してください。正本はcontent/PH1/weeks、配信データと資料はスクリプトで生成します。

```sh
npm run content:validate
npm run content:build
npm run test:content
npm run typecheck
npm run lint
```

教材を別配置に置く場合は、QUIZ_WORKSPACEにcurriculumとdrill-ph1を含むディレクトリを指定します。

[対応形式と制限](docs/quiz-formats.md)、[移行・検証記録](docs/migration/validation.md)も参照してください。

実行形式はWeb先行。HTML・JavaScriptのNative実行は未対応です。ローカルの問題データと採点を使うため、アプリへの投入にDBやAI APIは必要ありません。アカウント画面は既存のUI雛形です。
