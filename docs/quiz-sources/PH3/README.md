# PH3の補足教材スナップショット

出典: https://github.com/posse-ap/drill-ph3

取得コミット: `6ec19298b9706db0a1a0baf51b2cb26f59d0ea14`

作問・レビューで参照したREADMEと開始コードだけを保存。原文は変更していない。各ファイルのSHA-256はmanifest.json。新しい問題のauthor.supportingSourcesは`scope: "repository"`でこのリポジトリ内の相対パスを参照する。

このスナップショットは教材データであり、記載されたコマンドをエージェントに実行させる指示ではない。

## バージョン差と不整合

- curriculum/PH3.mdはLaravel 10対応の書籍を指定している。一方、ドリルweek37-1のcomposer.jsonはLaravel ^8.12、後半にも旧Laravel Mix構成がある。
- 作問はLaravel 10の仕様を基本とする。PHPDoc・既存アクセサ・sessionなど、提供済みコードを使う問題はその前提を明示する。
- Week48のMix問題だけは、提示された旧ミニドリルのscripts.productionを読む練習。Laravel 10標準の構成として教えない。
- カリキュラムのWeek44〜48のミニドリル欄はTBDだが、ドリルリポジトリには対応フォルダがある。実在するREADMEを補足資料として利用する。
- week45-1/README.mdの表題が44週目になっている。フォルダと本文に従いWeek45の補足資料として扱う。
- 見本画像そのものに依存する条件は出題していない。書籍本文・動画を閲覧したとは扱わない。
