# sql

SQLの普遍的なものについて記載していく。

## 生クエリ

生クエリとは、SQLそのままのこと、、？(まだ不確定)
ORMなどを使用していないとかかな？

## クエリービルダー

ORMとか使っていると、どうしても生のSQLが書きたくなる時がある。
その時はクエリービルダーで検索する

## idについて

primary_key : ソートができる。けど何か悪い?
UUID : sortができない。けど秘匿性は上がる?。パフォーマンスが少し落ちる
ULID : UUIDの欠点をカバー。ULIDにはタイムスタンプが先頭にある
プライマリキーにUUIDを指定した場合はレコード数が増えていくほど、INSERT時間が増えていくことになる。
※性能劣化は2割程度

## UPSERT

[参考URL](https://blog.officekoma.co.jp/2018/06/postgresqlupdateinsertupsert.html)

データがあればUPDATE、なければINSERTができるやつ

postgresだと高速。mysqlだと遅いとのこと。

>mysql だとそもそも upsert 周りが弱い (Postgres みたいな conflict target がない) のと primary key として使う ULID の生成を model のレイヤーでやってるせいで import が動かん