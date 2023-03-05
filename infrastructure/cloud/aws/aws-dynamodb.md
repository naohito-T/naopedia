## Amazon DynamoDB
[Amazon DynamoDBリファレンス](https://docs.aws.amazon.com/ja_jp/amazondynamodb/latest/developerguide/Introduction.html)  
[aws dynamodb local](https://www.wakuwakubank.com/posts/675-aws-cli-dynamodb/#index_id10)

Amazon DynamoDBは、フルマネージドの`NoSQL`データベースサービスであり、高速で予測可能なパフォーマンスと。シームレスな拡張性が特長。
デフォルトで**マルチAZ**になっている。

## DynamoDB Local導入
[参考URL](https://qiita.com/gzock/items/e0225fd71917c234acce)

## localで構築したDynamoDBをGUIツールで見る
[参考URL](https://zenn.dev/oku3san/articles/187651d98f09a9)

## dynamo初心者用
[dynamo初心者](https://qiita.com/hshimo/items/e5ad98b21786d796f1da)  
[DynamoDB全くわからない、から、ちょっとわかるようになるまでの道しるべ](https://dev.classmethod.jp/articles/dynamodb-chottowakaru/)

検索や集計は弱い（MySQLなどと併用する）

>DynamoDBでは以前はプライマリキーを構成するキーをハッシュキー、レンジキーと呼んでいました。
>しかし、最近ではAWSマネジメントコンソール上で下記のようにDynamoDBの以前で言うハッシュキー、レンジキーの表記が変更されていますので注意が必要です。

ハッシュキー→パーティションキー
レンジキー→ソートキー

ハッシュキー → パーティションキー  
レンジキー → ソートキー  
にそれぞれ読み替える

データ型について（3種類しかないのは）
CloudFormationから作成するときはこの3種類のデータ型しか使えないのかと混乱しました。しかし、そんなことはありません。これはプライマリキーとソートキーに使えるデータ型がこの3種類というだけです。プライマリキーとソートキー以外のカラムはCloudFormationに書かなくてよいので、レコード挿入時に自由なデータ型を使えばよいようです。


## 例

AttributeDefinitionsに書くのはパーティションキーとソートキーのみでよく、ほかは書いてはいけないというのが正解でした。テーブル作成時ではなく、レコード挿入時に自由にカラムを増やせます。

```sh
awslocal dynamodb create-table \
    --table-name SessionCollection \
    --attribute-definitions \
        AttributeName=SessionId,AttributeType=S \
    --key-schema AttributeName=SessionId,KeyType=HASH \
    --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
    --table-class STANDARD
```