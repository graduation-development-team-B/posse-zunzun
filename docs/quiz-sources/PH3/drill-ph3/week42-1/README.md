# 42週目ミニドリル 1問目

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
  - マイグレーション、シーディングを完了後に、http://localhost に遷移してwelcomeページが表示されていれば問題に移ることができます

## 問題

week42では `/quizzes` で同期的にクイズの並び替えをしようとしています

↑ボタンの動作を作り途中なのですが、1番上の行のボタン以外はサブミットされないので解消したいです

- `/quizzes` の1番上の `↑` を押下すると処理が実行されてddの出力になります
- 他の行の `↑` ボタンを押下しても反応しない

### 修正箇所

quiz/index.blade.php 58行目 で利用している `querySelector` を `querySelectorAll` に変更したら全てのボタンで期待する動きができそうです

※ `querySelectorAll` に差し替えただけじゃ動かないので注意してください

### 終了条件

- 2行目以降の `↑` のボタンを押下して `/quizzes/up` に遷移してddの画面が表示されること
