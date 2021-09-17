# Docker

## Docker 参考文献

[Docker での Node 環境構築](https://www.creationline.com/lab/29422)

## DockerFile とは

docker build で image を作成するファイル
公開されている Docker イメージをそのまま使う場合は必要なく、カスタマイズしたい場合に作成する。

## Docker build

Dokerfile から docker image を作成するコマンド

## docker-compose.yml 覚書

コンテナの定義やマッピングするポートなどコンテナに関する設定を記述するファイル

```yml
version: "3"
services:
  app:
    # 起動イメージ
    image: node:16
    # 環境変数
    environment:
      - DEBUG=app:*
    tty: true
    # ホスト側のポート：コンテナのポート
    ports:
      - "3000:3000"
    # ホスト側のsrcをコンテナのappにマウント
    volumes:
      - ./src:/app
    # 起動時のカレントフォルダ
    working_dir: /app
    # 起動後に実行するコマンド
    command: npm start
```

> 重要な箇所は # ホスト側の src をコンテナの app にマウントの部分で、通常 Docker コンテナを停止するとコンテナ上で作成した各種ファイルは削除されますが、上記の記述を行うことでコンテナ起動時に再度ファイルがマウント（反映）されます。
> また Docker コンテナ上で作成・変更したファイルもこちらに記述した場所に反映される。
> 基本ホスト上とコンテナ上でファイルの同期をとるための記述と考えれば OK

## Docker compose 起動 (docker-compose コマンドについて)

`$ docker-compose run --rm app /bin/bash`

※rm オプションは Docker コンテナ停止時にコンテナを削除する機能で、停止したコンテナが残り続ける問題を解決するためのオプション

## Docker コンテナの軽量化

[軽量化参考 URL](https://qiita.com/Canon11/items/da3a7795d894030865f7)

- コンテナイメージサイズが大きいことによる弊害
  イメージのビルド時間が長い
  イメージを Docker Registory にプッシュする時間が長い
  イメージを Pull する時間が長い

それらが起因して下記の弊害が起こる

トライアンドエラーに時間がかかり、生産性が低下
ビルド時間,CI 時間の増大
オートスケールでコンテナがサービスインされるまでの時間が長くなる。
Kubernetes クラスタを構成する Node ディスクの消費

- 軽量化のアプローチ

1. RUN 命令をまとめる
   基本中の基本

※RUN 命令が走る度にイメージレイヤーが生成されてしまうため、ちょっと重くなる。

```dockerfile
# npm installの後のパッケージを羅列
RUN npm install -g gulp@3.9.1 \
    && npm install gulp-load-plugins \
    gulp-plumber \
    gulp-sass \
    gulp-pleeease \
    gulp-uglify \
    gulp-rename \
    && npm init -y
```

> このように、複数の RUN コマンドを「連続で実行する 1 つのコマンド」として扱うことで、イメージレイヤーをまとめて軽量化できます。

2. RUN で apt コマンドを走らせた場合はインストール時に使った apt キャッシュ(ゴミファイル)が残ってしまうため削除する。

3. 使用したい image に slim version があるか DockerHub で探す。
   ※デフォルトの NOde がかなり色々入っている。そのため slim イメージを探す。
