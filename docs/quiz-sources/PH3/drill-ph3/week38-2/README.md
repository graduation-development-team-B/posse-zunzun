# 38週目ミニドリル 2問目

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
  - マイグレーション、シーディングを完了後に、http://localhost に遷移

## 問題

日付の操作のライブラリCarbonの利用に慣れてもらいます

HomeController:18行目で現在日時を示すCarbonクラスを取得しています

home.blade.php:25 にある

`<h1>202X/XX/XX YY:YY:YY</h1>`

部分を$nowを使って現在日時を表示するようにしてください

### 修正箇所

home.blade.php の 25行目を修正

### 終了条件

http://localhost に遷移して現在日時が正しく表示されていること
