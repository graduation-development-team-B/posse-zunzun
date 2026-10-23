# 47週目ミニドリル 1問目

## 事前準備

以下手順で環境の立ち上げをお願いします。(※ 10分 ~ 15分 かかります)

`docker compose build --no-cache`

`docker compose up -d`

## 問題

week47ではlaravel/uiというログイン関連のページをいい感じに使いやすくしてくれるパッケージを使うためにnodeのコンテナを用意します

- docker compose.ymlにnodeを指定していますが、LTS (推奨版) ではないです

[nodeの公式サイト](https://nodejs.org/ja/) よりnodeコンテナがLTSのバージョンになるように修正してください

### 修正箇所

docker compose.yml:31 にあるimageのバージョン指定を変更してみてください

### 終了条件

- `docker compose build --no-cache`
- `docker compose exec node bash`
- `node -v`
- 上記手順で確認して公式サイトのLTSのバージョンが出力されていればOK