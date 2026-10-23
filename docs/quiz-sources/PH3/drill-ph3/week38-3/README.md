# 38週目ミニドリル 3問目

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

日付の操作のライブラリ Carbon の利用に慣れてもらいます

HomeController 16行目にて `Carbon::setTestNow('2022-01-31 00:00:00')` で疑似的に1月31日を現在日時に設定しています

20行目で翌月末の日時を取得するためにaddMonthで1ヶ月加算して 02/28 が表示されるようにしています

http://localhost に遷移すると `2022/03/03 00:00:00` と表示されており期待する表示と異なります

`2022/02/28 00:00:00` と表示されるように修正してください

### 修正箇所

HomeController の 20行目をaddMonthから別のメソッドに修正

### 終了条件

http://localhost に遷移して`2022/02/28 00:00:00` と表示されていること
