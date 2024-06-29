# MySQL

## dumpとリストアについて

[参考URL](https://tex2e.github.io/blog/database/mysql-dump-restore)
[参考URL](https://qiita.com/PlanetMeron/items/3a41e14607a65bc9b60c)

---

## MySQLの文字コードについて

[MySQLの文字コード関連設定を1つ1つ説明する](https://qiita.com/TanakanoAnchan/items/dc03ac7402c7075e1cad)

## デフォルト文字コード

MySQLのデフォルトの文字コードは、UTF-8ではなく`latin1`となっている。

dbの文字コードを確認する
` SHOW VARIABLES LIKE 'character_set_database';`

mysqlクライアントの文字コードを確認する
`status;`

## 文字コードをUTF-8にする

[utf8とutf8mb4](https://penpen-dev.com/blog/mysql-utf8-utf8mb4/)

MySQLではなぜ2種類あるのか

UTF-8  
1~3バイトまで対応

utf8mb4  
1~4バイトまで対応

## 本来のUTF8

本来のUTF8は`1~4`バイトで文字を表すルール  
そのため、MySQLのutf8はそもそもUTF-8と呼べない。

## MySQL 8.0 での UTF-8 サポートについて

[MySQL 8.0 での UTF-8 サポートについて](https://labs.gree.jp/blog/2017/04/16406/)

## UTF-8をサポートしないといけない理由

- >私たちが utf8mb4 を使っている理由の一つは、iPhone などのスマートフォンから 4byte の UTF-8 の絵文字を入力できるからです。ユーザが入力してくるデータを、我々はデータベースに INSERT し、適切に扱えるようにする必要があります。
- >MySQL が utf8mb4 をサポートしているのは、 iPhone や Android 向けにサービスを提供している私たちとしては、 MySQL を使う強いモチベーションの一つと言えます。
- >MySQL が strict に Unicode を扱ってくれることを望みます。日本のエンジニアは、かつて CP932 などでめんどくさい思いをしました。
- >日本語の Collation は、使う人によって求める答えが異なってしまうと思います。 MySQL は Collaion を XML で拡張できるようになっているので、 MySQL にdefaultで組み込まれる Collaction は、strict に Unicode を扱ってくれれば良いのではないでしょうか。
- >MySQL 8.0.1 で Unicode 9.0.0 対応してくれたことを歓迎します。
- >今後、 iOS や Android で扱える絵文字が増えていくとしたならば、 MySQL がそれらをネイティブサポートしてくれるのは、 我々がMySQL のバージョンアップを続けていく大きな理由になりえます。 Apple や Google がスマートフォンで使える絵文字を増やしていったとき、MySQLがそれに追随してくれると助かります。

## MySQL8.0のUUIDサポートについて

>Manyi さんが担当されてる機能は多岐にわたり、MySQL8.0のUTF-8サポート以外にもいろいろお話できたのですが　MySQL 8.0 の UUID サポートについて改善があったので、それについても触れておきたいと思います。
>MySQL5.7 以前の InnoDB で UUID を Primary Key にすると、次のデメリットがありました
>MySQL は組み込み型で UUID 型をサポートしていなかったので、 128bit の数値型ではなく文字列として保存しなければならないので、 Primary Key にするにはデータとして大きい
>MySQLが生成するUUIDは UUID version 1 で、 timestamp を含むのだが、 上位ビットにナノ秒が格納されるため、InnoDB の Clustered Index と極めて相性が悪い性質がある
>それに対し、 MySQL8.0 で UUID_TO_BIN(string_uuid, swap_flag) という関数ができたのですが、これがなかなかスグレモノです。 UUIDの文字列を binary format に変換することも可能ですし、 swap_flag を true にすると
>If swap_flag is 1, the format of the return value differs: The time-low and time-high parts (the first and third groups of hexadecimal digits, respectively) are swapped. This moves the more rapidly varying part to the right and can improve indexing efficiency if the result is stored in an indexed column.
>といった機能があるため、 binary に変換するとき、最上位ビットにナノ秒が格納されないため、 Clustered Index で使ったとしても、フラグメントしにくくなりました。
>MySQL 8.0 以降では、 UUID_TO_BIN(string_uuid, swap_flag) を使うならば、 UUID を Primary Key として使うことも検討して良いかもしれません。


---

## MySQLのSQLについて

### UNSIGNED

符号なし（UNSIGNED）の意味。  
整数型は正の数と負の数を扱うことができますが、データ型の後に`UNSIGNED`を付けると  
**0と正の数しか格納できなくなる**このようなデータ型を符号なし整数型という。

---

## Dockerで起動時に複数DBを立ち上げる

[参考URL](https://ysuzuki19.github.io/post/docker-mysql-postgres-multiple-databases)  
[参考URL](https://onexlab-io.medium.com/docker-compose-mysql-multiple-database-fe640938e06b)

## Grant系

権限操作について記載する
[ユーザの作成](https://qiita.com/ritukiii/items/afdc91e68d0cf3e0f383)
