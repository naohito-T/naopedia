# MySQL




---

## 文字コード

[utf8とutf8mb4](https://penpen-dev.com/blog/mysql-utf8-utf8mb4/)

なぜ2種類あるのかはMySQL

utf8 : 1~3バイトまで対応
utf8mb4 : 1~4バイトまで対応


## 本来のUTF-8

本来はUTF-8は1~4バイトで文字を表すルール
なので、MySQLのutf8はそもそもUTF-8と呼べない。

## mysqldump

[参考URL](https://qiita.com/PlanetMeron/items/3a41e14607a65bc9b60c)