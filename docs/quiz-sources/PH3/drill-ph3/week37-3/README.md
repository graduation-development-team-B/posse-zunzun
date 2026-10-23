# 37週目ミニドリル 3問目

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
  - マイグレーション、シーディングを完了後に、http://localhost/post に遷移

## 問題

HomeController:21行目でidが1のユーザー情報を更新しています

ですが、エラーなどが発生していないのに更新が反映されません

Models/Userの$fillableを修正して更新されるように修正してください

### 修正箇所

`src/app/Models/User:26` の$fillableを修正

### 終了条件

http://localhost/post に遷移して「family_name: ファミリーネーム」に更新されていること
