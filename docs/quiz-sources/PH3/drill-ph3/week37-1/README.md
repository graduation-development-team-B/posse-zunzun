# 37週目ミニドリル 1問目

## 事前準備

以下手順で環境の立ち上げをお願いします。(※ 10分 ~ 15分 かかります)

`docker compose build --no-cache`

`docker compose up -d`

`docker compose exec ph3-posseapp-app bash`

- appコンテナ内

( #以降のコマンドを実行してください )

`/var/www/html# composer install`

`/var/www/html# php artisan migrate:refresh --seed`

- ブラウザ
  - マイグレーション、シーディングを完了後に、http://localhost/ に遷移

## 問題

HomeControllerのindexアクションでカスタムスコープを利用してください

Models/Userにgeneration = 1で絞り込むカスタムスコープが定義してあります

### 修正箇所

`src/app/Http/Controllers/HomeController.php:13` Userモデルに作成してあるメソッドを利用

### 終了条件

- http://localhost/ に遷移してユーザーカード一覧が表示される
