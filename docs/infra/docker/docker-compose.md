# docker-compose

## docker-compose とは

> docker-compose はローカルで Docker のオーケストレーションを行うためのツールです。Docker のビルドから Network や Volume の管理をコードベースで定義して行ってくれます。

## docker-compose.yaml を読む

```yaml
version: "3.7" # docker-composeのversionを指定。特にこだわりがなければ最新のものを記述する。

services: # 起動するコンテナの定義を行う。p
  nginx:
    build:
      context: .
      dockerfile: docker/nginx/Dockerfile
    volumes:
      - ./public:/var/www/html/public:ro
    ports:
      - 8080:80
    environment:
      PHP_HOST: app

  app:
    build:
      context: .
      dockerfile: Dockerfile
    env_file:
      - .env.example
    # volumes:
    #   - .:/var/www/html:cached

  mysql:
    image: mysql:5.7 # コンテナを起動するDocker imageを指定する。
    volumes:
      - ./mysql:/var/lib/mysql:delegated
    command: mysqld --character-set-server=utf8mb4 --collation-server=utf8mb4_general_ci
    environment:
      MYSQL_ALLOW_EMPTY_PASSWORD: "yes"
    ports:
      - 13306:3306
```

- build
  docker build の実行情報を記述する。ここで定義された情報を元に Docker をビルドし、そのビルドしたイメージを使用してコンテナを起動するコーナー。image もしくは build どちらかを記述する必要がある。

  > コマンドの場合、 `sh docker build -f docker/nginx/Dockerfile` . と同一です。

- volumes
  ボリュームのマウントを行う。

  > コマンドの場合、`sh -v $(pwd)/public:/var/www/html/public:ro <IMAGE ID>`オプションと同一です。

- ports
  ポートの開放を行う。
  左にホストのポートを、右にコンテナのポートを指定する。

  > コマンドの場合、 -p 8080:80 オプションと同一です。

- environment
  起動するコンテナへ環境変数を定義する。

  > コマンドの場合、 -e PHP_HOST=app オプションと同一で

- env_file
  ファイルに定義された環境変数を読み取り、コンテナへ定義する。

- command
  Dockerfile で定義されている CMD の上書きを行う。

## docker-compose のコマンド

- up
  カレントディレクトリに存在する docker-compose.yaml を参照して docker-compose の起動
  `sh $docker-compose up`

- down
  カレントディレクトリの docker-compose.yaml に紐づいてる Container と Network を削除
  `sh $ docker-compose down`

image も削除する。
`sh $ docker-compose down --rmi all`

- rm
  Volume を削除
  `sh $ docker-compose rm`

[ここまで記載した](https://y-ohgi.com/introduction-docker/3_production/docker-compose/)
