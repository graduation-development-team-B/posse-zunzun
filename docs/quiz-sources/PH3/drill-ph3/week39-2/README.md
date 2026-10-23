# 39週目ミニドリル 2問目

## 事前準備

以下手順で環境の立ち上げをお願いします。(※ 10分 ~ 15分 かかります)

`docker compose build --no-cache`

`docker compose up -d`

`docker compose exec ph3-posseapp-app bash`

- appコンテナ内

(#以降のコマンドを入力してください)

`/var/www/html# composer install`

`/var/www/html# php artisan migrate:refresh --seed`

- ブラウザ
  - マイグレーション、シーディングを完了後に、http://localhost に遷移してユーザーが表示されていれば問題開始できます

## 問題

今回はlaravelに同梱されているライブラリ以外を利用する練習問題です

前回PHPDocを記載してみましょうとしてみました。

ですが毎回テーブルのカラム毎に `@property` を書いたりするの面倒ですよね

[laravel-ide-helper](https://github.com/barryvdh/laravel-ide-helper) を利用することでコマンド一つでPHPDocを追加できるのでインストールしてみましょう

### 修正箇所

`docker compose exec ph3-posseapp-app bash`

[Installation](https://github.com/barryvdh/laravel-ide-helper#installation) に記述してあるコマンドをコンテナ内で実行

### 終了条件

- `php artisan list` でide-helperの項目がコマンド一覧に追加されていることを確認

![Sample Image](sample.png)

- +α問題
  - `php artisan ide-helper:models` を実行すると各モデルにテーブルのカラム分の`@property`が追加されることを確認