# sql

SQLの普遍的なものについて記載していく。

## 生クエリ

生クエリとは、SQLそのままのこと、、？
ORMなどを使用していないとかかな？

## クエリービルダー

ORMとか使っていると、どうしても生のSQLを書きたくなる時がある。
その時はクエリービルダーで検索する

## idについて

primary_key : ソートができる。けど何か悪い？
UUID : sortができない。けど秘匿性は上がる。パフォーマンスが少し落ちる
ULID : UUIDの欠点をカバー。ULIDにはタイムスタンプが先頭にある。プライマリキーにUUIDを指定した場合はレコード数が増えていくほど、INSERT時間が増えていくことになる。
※性能劣化は2割程度

## UPSERT

[参考URL](https://blog.officekoma.co.jp/2018/06/postgresqlupdateinsertupsert.html)

データがあればUPDATE、なければINSERTができるやつ。
postgresだと高速。mysqlだと遅いとのこと。

>mysql だとそもそも upsert 周りが弱い (Postgres みたいな conflict target がない) のと primary key として使う ULID の生成を model のレイヤーでやってるせいで import が動かん

## DDL(Data Definition Language) データ定義言語

DDLとは、コンピューターで用いられる人工言語の分類のひとつで、データを格納するための構造を定義するための言語。

データベースの構造や構成を定義するために用いられるものが多く、単にDDLといった場合には、リレーショナルデータベース（RDB）の制御に用いられるSQL言語の一部の命令群を指すことが多い。

SQLにおけるDDLには、データベースやテーブル、ビューなどの作成を行う**CREATE文**や、削除する**DROP文**、変更を加える**ALTER文**、データを全削除する**TRUNCATE文**などが含まれる。

ここで言いたいのは、
プロジェクトのマイグレーションファイルで管理をするのはDDLまでじゃないの？

