# Postgres

[Postgres超入門](https://lets.postgresql.jp/)

## postgres 運用コマンド

[参考URL](https://amg-solution.jp/blog/23077#h2_1)

`PostgreSQL` だと `Ctrl+C` でクエリはキャンセルできるし、接続はプロセスで見られるから、mysqlビギナーの自分はこの挙動に驚きました、という話

## 仕組み

PostgreSQLでは「ロール」という用語を使用して「ユーザー」または「ログイン」を意味するため、エラー メッセージは、ユーザー名でPostgreSQLデータベースに接続しようとしているubuntuが、そのようなユーザーが存在しないことを意味します。

ログインするユーザーをPostgreSQLに明示的に指定しない場合、オペレーティング システムの資格情報が使用されます。つまり、ユーザーとしてLinuxにログインしている場合ubuntu、PostgreSQLはという名前のPostgreSQLユーザーとしてログインしようとしますubuntu。


## Ubuntu postgres

[参考URL](https://qiita.com/sibakenY/items/407b721ad1bd0975bd00)

## 初期パスワード

user
postgres

password
postgres

## ユーザとパスワードの設定

PostgreSQLをインストールした時点で、自動的にDBの**管理ユーザーであるpostgresユーザが作成される。**
ただ、このユーザのパスワードは未設定の状態であるためアカウントロック状態となり**このままではrootユーザーからsuコマンドでスイッチする方法以外でのログインができない。**

そこで、postgresユーザーでログインできるようにパスワードを設定する。
パスワードの設定は `passwd user名` コマンドで行う。

## postgres user に切り替える

`$ sudo -i -u postgres`

ちなみにホームディレクトリはこれ `/var/lib/postgresql`

## cli login

postgres userに切り替えて `psql`

## リモートサーバのpostgresに繋げる

[参考URL](https://qiita.com/ume-san/items/6417390507fc3c710c54)

## postgres疎通

当たり前だがpostgresはHTTPサーバではない。
そのためcurlなどの疎通通信は対応しない。
慣例としてhealth_checkなどが用意されているためそれらを使用する。

## postgres データ型

[データ型一覧](https://plus-info-tech.com/postgresql-typelist)

### Timestamp型・Date型・Time型等日付に関する型の使い分けについて

[参考URL](https://ja.stackoverflow.com/questions/27969/timestamp%E5%9E%8B-date%E5%9E%8B-time%E5%9E%8B%E7%AD%89%E6%97%A5%E4%BB%98%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E5%9E%8B%E3%81%AE%E4%BD%BF%E3%81%84%E5%88%86%E3%81%91%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)

## DB Cache

[Redisは本当に必要か？PostgreSQLだけあれば十分](https://itnews.org/news_contents/redis-postgresql)

redisなどのデータストアに移動することもあるとのこと。
しかしdefaultのDBに備え付けてあるキャッシュを使用することが多い。

## スキーマ(Schema)

[参考URLN](https://tech.pscsrv.co.jp/2021/08/02/%E3%80%90postgresql%E3%80%91postgresql%E3%81%AE%E3%82%B9%E3%82%AD%E3%83%BC%E3%83%9E%EF%BC%88schema%EF%BC%89%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6/)

スキーマ（Schema）とは、1つのデータベースの中に複数設定できる名前空間のことを指す。
デフォルトではpublicが作成される。
