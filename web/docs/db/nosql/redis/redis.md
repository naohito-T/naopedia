# Redis

[いつかRedisで構築](https://qiita.com/Fea/items/4d628d7ab31150809502)
[参考URL](https://agency-star.co.jp/column/redis)

## Redisとは

Redisはオープンソースの**永続化可能**なインメモリデータベース。  
KVS（キーバリューストア）で高速だが基本的にはキャッシュ。
ディスクにデータを保存する永続化オプションも持つがデータの完全性は担保されない（不意のプロセス死亡などで容易に欠損が発生する）  
AWSのElastiCacheでフルマネージドなRedisを使える。
ランキングやレコメンデーションの実装に便利な機能を持つ。
Twitter・GitHub・ピンタレストなどのサービスがRedisを採用しており、大規模データの処理や処理速度の向上を実現している。

また、Redisは分散キャッシュストアとしても利用され、複数のアプリケーションやサーバー間でキャッシュを共有できる。

## RedisとDynamoDBの違い

[参考URL](https://higelog.brassworks.jp/2843)

## redis CLI

cliあるらしい。
GUIで検索したらあるかも

```sh
$ bin/redis-cli -a redispass

# 設定されたkeyが見れる。
> keys *
```
