# docker-compose

Docker操作の補佐をするPython製のツール（ver2ではGo製に変わっている）

Docker Engineの一部ではない。
**docker-compose.yml内ではホスト側のシェルの環境変数が使える。**
→つまり、host側で環境変数が設定されているためdirenvなどで読み込ませるのが良いのではないか？
設定した環境変数にどのような値が挿入されるかは、 `docker-compose config`コマンドで確認ができる。

> docker-compose はローカルで Docker のオーケストレーションを行うためのツールです。Docker のビルドから Network や Volume の管理をコードベースで定義して行ってくれます。
docker-compose.ymlをdocker-compose.ymlというツールで読み込ませて実行すると**ボリュームやネットワークが作られ**、まとめてコンテナーが起動する。

## docker-compose で解決できるもの

Docker Composeを使えば、今までdocker runの引数で1つひとつ指定したり、起動後にdocker execでコマンドを実行していたりしたものをdocker-compose.ymlという1つの設定ファイルに集約できる。

## docker-composeですむ場合

なるべくDockerfileを書きたくない
特殊なことをやっていないのであればdocker-composeから設定できるもので基本十分。

## docker-compose depends_on

depends_onはあくまで**起動状態を制御**しているだけであり、dbがtcp受け付ける状態（mysqld)が起動するまで待つ。みたいなのができない。
以前までは、シェルで対応して欲しいと公式サイトが記載。
そのため幾つもプロジェクトはwait.shを使用し`nc`コマンドなどでdbに意思疎通をしていた。
最新だと、それはしなくて良くなった。
[Docker Compose の depends_on の使い方まとめ](https://gotohayato.com/content/533/)

**注意**
```yml
depends_on:
  service_a:
    condition: service_started
```

`depends_on.condition.service_started`は1回非推奨になったが、3.8ぐらいでまた元に戻った。しかしdocker-compose 2系じゃないと使えない。

## Docker自動起動

[参考URL](https://www.takunoko.com/blog/docker-compose%E3%81%A7docker%E3%82%B3%E3%83%B3%E3%83%86%E3%83%8A%E3%82%92os%E8%B5%B7%E5%8B%95%E6%99%82%E3%81%AB%E7%AB%8B%E3%81%A1%E4%B8%8A%E3%81%92%E3%82%8B/)

[参考URL](https://qol-kk.com/wp2/blog/2020/03/04/post-1532/)

docker-composeを使ってサーバ環境を構築した際に、ホストOSを再起動時に自動でクライアント（子機？）も起動してほしい。k8sだのを使うべきとの意見もあるが、とりあえずDocker-composeのみで戦ってみる。 systemctlコマンドを利用して、自動起動の登録をしました。

## docker-compose コマンド

**docker-composeで作成したコンテナーはdockerコマンドではなく、docker-composeを使った管理(コマンド)に一元化すべき**

`$docker-compose down`はコンテナーやネットワークを停止するだけではなく、それらの破棄までしてくれる。
**※規定ではボリュームは削除しない。**
これのメリットとしてDBなどのキャッシュ問題を回避する。

dockerとの対比コマンド
docker-composeで管理しているプロジェクトで、dockerコマンドを使用すると反故が生じる可能性もあるためdocker-composeコマンドを使用すること。

![コマンド対比](image/コマンド対比.png)

## コンテナーは常に削除する方がいい

Docker開発を進めていく上でコンテナーは常に削除することをオススメ。

理由として
1. psコマンドで確認すると一覧にコンテナーリストが溜まってくる
2. コンテナーに直接インストールしたgemやパッケージがそのまま残ってしまう。
本番環境ではDockerfileから作成されたコンテナーをデプロイしますので、コンテナーに直接インストールしたものは反映されません。
常に本番環境と同じ状態で開発を進めるためにも、コンテナーは一度削除して再度立ち上げることを心がける。

## docker-compose.yaml を読む

```yaml
version: "3.7" # docker-composeのversionを指定。特にこだわりがなければ最新のものを記述する。

services: # 起動するコンテナーの定義を行う。
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
    image: mysql:5.7 # コンテナーを起動するDocker imageを指定する。
    volumes:
      - ./mysql:/var/lib/mysql:delegated
    command: mysqld --character-set-server=utf8mb4 --collation-server=utf8mb4_general_ci
    environment:
      MYSQL_ALLOW_EMPTY_PASSWORD: "yes"
    ports:
      - 13306:3306
```

すべて3系として記載する。

- version
  versionによって書き方が変わる。3系が最新。2系だと書き方が変わる。

- services
  docker-composeでは、アプリケーションを動かすための各要素をサービスと読んでいる
  ComposeFile内の各サービス名は、わかりやすければなんでもいい。
  **ただ、ここで定義した名前は、dockerのログに表示されるので、わかりやすい名前にした方がいい**

- build
  docker buildの実行情報を記述する。ここで定義された情報を元にDockerをビルドし、そのビルドしたイメージを使用してコンテナーを起動するコーナー。
  imageもしくはbuildどちらかを記述する必要がある。

  >コマンドの場合、 `$ docker build -f docker/nginx/Dockerfile` . と同一。

  [以下参考URL](https://qiita.com/sam8helloworld/items/e7fffa9afc82aea68a7a)
  - context
  docker buildコマンドを実行したときの**カレントなワーキングディレクトリのこと**をビルドコンテキスト（build context）と呼ぶ。

  - dockerfile

---

## volumes

[参考URL](https://pc.atsuhiro-me.net/entry/2020/03/19/105714)
[Docker for Mac のボリュームの遅さを cached オプションで解消](https://qiita.com/koshigoe/items/52749db8836b4e3fbfc4)

ボリュームのマウントを行う。
volumesでは**パスを指定するとDockerエンジンはボリュームを作成する**
>コマンドの場合、`sh -v $(pwd)/public:/var/www/html/public:ro <IMAGE ID>`オプションと同一です。

1行で記述
[SOURCE:]TARGET[:MODE]

```yml
services:
  web:
    image: nginx
    volumes:
      - type: volume
        source: mydata # ホスト側
        target: /data # targetはコンテナー側
volumes:
  mydata:
```

sourceはホスト側で、targetはコンテナー側です、mydataはvolumeの名前で，パスではない
**"/"から開始すると，絶対パスとなる。**

## volumes の pathの指定

絶対パスではホストの環境が変わった時に動かなくなるため，相対パスを指定するのが慣例。
相対パスはdocker-composeのymlファイルが基準となります。
このため，ホストの環境が変わっても問題ないですが，プロジェクト内でのymlファイルの場所を変更する時は修正が必要になります。

## volumes 省略記法

いつも上記の例のように記載するのは面倒なので，短い表記法があります．[SOURCE:]TARGET[:MODE]と指定します．たとえば，以下で，sourceの./dataディレクトリとtargetの/tmp/dataディレクトリを指定します．

```yml
  volumes:
    - ./data:/tmp/data
```

**docker-composeでのvolumes指定方法**
1はバインドマウント
2はDocker内に存在しているボリューム
**※external: の中にnameを指定することで、docker-compose外で作成したボリュームを指定できる。**

**注意**
存在しない場合は、指定した名称でボリュームが生成される
指定しない場合は、無名（無意味な文字列）でボリュームが生成される

```yml
version: "3"
services:
    mysql:
        container_name: sample
        image: mysql:5.7
        environment:
            MYSQL_DATABASE:sample
            MYSQL_USER: root
            MYSQL_PASSWORD: root
            MYSQL_ROOT_PASSWORD: root
        ports:
            - 4306:3306
        ##1
        volumes:
            - mysql-data:/var/lib/mysql
        networks:
            - default

##2
volumes:
    mysql-data:
        external:
            name: project-mysql
```

## プロジェクトごとにMySQLのデータ用ボリュームを定義して使用したい場合

externalをtrueにするとComposeの外部で作成されているボリュームを指定できます。

```yml
volumes:
    mysql-data:
        external: false
```

## Volume 一覧

```yml
services:
  service_name:

    volumes:
      # ボリューム
      - /var/lib/mysql # パス指定のみ。Engine にボリュームを生成させます。
      - datavolume:/var/lib/mysql # 名前つきボリューム。

      # バインドマウント
      - /opt/data:/var/lib/mysql # 絶対パスのマッピングを指定。
      - ./cache:/tmp/cache # ホストからのパス指定。Compose ファイルからの相対パス。
      - ~/configs:/etc/configs/:ro # ユーザーディレクトリからの相対パス。

volumes:
  dattavolume:
```

---

## ports

- ports
  ポートの開放を行う。
  左にホストのポートを、右にコンテナーのポートを指定する。

  > コマンドの場合、 -p 8080:80 オプションと同一です。

docker-composeのportsとexposeの使い分け
[参考URL](https://pc.atsuhiro-me.net/entry/2020/04/10/021555)

exposeはホストからアクセスできないポート
portsはホストからアクセルできるポート

```yml
version: '3'

services:
  postgres:
    image: postgres:11-alpine
    expose:
      - "5432"

  django:
    image: django-web:latest
    command: ash -c "
      python3 manage.py migrate &&
      python3 manage.py runserver 0.0.0.0:8000"
    ports:
      - "8000:8000"
```

postgresはdjangoからアクセスできればよいのでexposeを使用する。
djangoはホストのブラウザーからアクセスするのでportsを使用する。

ホストのポートを指定するのは必要がなければdocker-composeに一任するのがよいです．たとえば，ports: "5432:5432" と指定してpostgresを起動すると，複数のpostgresを使いたい時に，ポートで競合してエラーとなります．

## Docker Compose の portsとexposeの違い

[参考URL](https://blog.tkt989.info/2017/12/19/Docker-Compose%E3%81%AEports%E3%81%A8expose%E3%81%AE%E9%81%95%E3%81%84)

**ports**
指定したポートが外部に公開されるため、誰でもアクセスできる

**expose**
ホストのみにポートを公開する

---

- environment
  起動するコンテナーへ環境変数を定義する。

  > コマンドの場合、 -e PHP_HOST=app オプションと同一で

  DBについての環境変数設定（パスワード）だが、cfcのnuxtでもやっていたからそのコンテナーの環境変数を設定できそう。

- env_file
  ファイルに定義された環境変数を読み取り、コンテナーへ定義する。

- command
  Dockerfileで定義されているCMDの上書きを行う。

- depends_on
  service同士の依存関係を記す
  docker-compose up を実行したら、依存関係のほうが先に実行していなければいけない。

- external
  Docker compose管理外のネットワークやボリュームであることを示す。
  これらのオプションが指定されたネットワークやボリュームはdocker-compose downによって削除されることはない。

## networks

[参考URL](https://amateur-engineer.com/docker-compose-network-share/)
networksを設定してネットワークを共有することで、複数のdocker-compose間での接続が可能になる。

## tty(teletypewriter（テレタイプライター)

[参考URL](https://zenn.dev/hohner/articles/43a0da20181d34)

ttyがないと、コンテナーを起動させ続けるためのプロセスが存在しないためコンテナーが正常終了してしまう。

ttyとは
>ttyとは、標準入出力となっている端末デバイス(制御端末、controlling terminal)の名前を表示するUnix系のコマンドである。元来ttyとはteletypewriter（テレタイプライター）のことを指す。

どうやらttyは標準入出力先のデバイスとのことです。
そして、その標準入出力先のデバイスを確認する方法が、ttyコマンドで、このコマンドはUnix系のコマンドであるため、ターミナルでttyとそのまま叩けます。

## docker-compose のコマンド

- up
  カレントディレクトリに存在するdocker-compose.yamlを参照し、docker-composeの起動
  `sh $docker-compose up`

- down
  カレントディレクトリのdocker-compose.yamlに紐づいてるContainerとNetworkを削除する
  `sh $ docker-compose down`

imageも削除する。
`sh $ docker-compose down --rmi all`

- rm
  Volumeを削除
  `sh $ docker-compose rm`

[ここまで記載した](https://y-ohgi.com/introduction-docker/3_production/docker-compose/)

