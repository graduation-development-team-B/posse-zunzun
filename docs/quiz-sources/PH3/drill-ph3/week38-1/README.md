# 38週目ミニドリル 1問目

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

HomeController:15~16行目でセッション情報の書き込み、読み込みをしています

上記セッションの操作をFacades\Sessionのクラスではなくグローバルヘルパーのsession()メソッドを利用してください

https://readouble.com/laravel/7.x/ja/session.html

### 修正箇所

`src/app/Http/Controllers/HomeController.php:15` をsessionヘルパを利用した形に修正
`src/app/Http/Controllers/HomeController.php:16` をsessionヘルパを利用した形に修正


### 終了条件

http://localhost に遷移してにddで出力したsession情報が表示されていること
