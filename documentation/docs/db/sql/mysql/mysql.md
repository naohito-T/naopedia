# MySQL

## dumpとリストアについて
[参考URL](https://tex2e.github.io/blog/database/mysql-dump-restore)

---

## デフォルト文字コード

MySQLのデフォルトの文字コードは、UTF-8ではなく`latin1`となっている。

- dbの文字コードを確認する
` SHOW VARIABLES LIKE 'character_set_database';`

- mysqlクライアントの文字コードを確認する
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

---

## MySQLのSQLについて

### UNSIGNED

符号なし（UNSIGNED）の意味。  
整数型は正の数と負の数を扱うことができますが、データ型の後に`UNSIGNED`を付けると  
**0と正の数しか格納できなくなる**このようなデータ型を符号なし整数型という。

---

## mysqldump
[参考URL](https://qiita.com/PlanetMeron/items/3a41e14607a65bc9b60c)

## Dockerで起動時に複数DBを立ち上げる
[参考URL](https://ysuzuki19.github.io/post/docker-mysql-postgres-multiple-databases)  
[参考URL](https://onexlab-io.medium.com/docker-compose-mysql-multiple-database-fe640938e06b)


## Grant系

権限操作について記載する
[ユーザの作成](https://qiita.com/ritukiii/items/afdc91e68d0cf3e0f383)
