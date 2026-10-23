# 37週目ミニドリル 2問目

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
  - マイグレーション、シーディングを完了後に、http://localhost/ に遷移

## 問題

home.blade.phpの32行目で出力しているfull name (フルネーム) をカスタムアクセサを利用した形に直してください

カスタムアクセサはModels/Userに定義してあります

### 修正箇所

`src/resources/views/home.blade.php:32` でカスタムアクセサを利用


### 終了条件

カスタムアクセサを利用してる状態で http://localhost/ に遷移してユーザーカード一覧が表示される
