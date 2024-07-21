# Amazon DynamoDB

[Amazon DynamoDBリファレンス](https://docs.aws.amazon.com/ja_jp/amazondynamodb/latest/developerguide/Introduction.html)  
[aws dynamodb local](https://www.wakuwakubank.com/posts/675-aws-cli-dynamodb/#index_id10)

## Overview

Amazon DynamoDBは、フルマネージドサービス型の`NoSQL`データベースサービスであり、高速で予測可能なパフォーマンスと。シームレスな拡張性が特長。  
※デフォルトで**マルチAZ**になっている。

主な利用シーンには、低レイテンシーなデータアクセスが必要なアプリケーションや、大量のデータ利用やシステムに可用性・柔軟性を持たせたい場合などがある

## RDB(リレーショナルデータベース)とNoSQLの違い

RDB（リレーショナルデータベース）とNoSQLにはメリットデメリットの点で大きな違いがある。

[![Image from Gyazo](https://i.gyazo.com/bc6c384072d5b7d7eca404ed8b3b6c0e.png)](https://gyazo.com/bc6c384072d5b7d7eca404ed8b3b6c0e)

## DynamoDBの特徴

DynamoDBには次のような特徴がある

1. 高可用性（3つのAZでレプリケーションされます）
2. データの格納と取得に高度に最適化
3. 半構造化データを保存可能
4. 1桁ミリ秒単位のレイテンシーにも対応可能
5. データベースのサイズが縮小/拡大すると、自動的にスケーリングされる

その他、Lambdaとの相性がよいため、API Gateway + Lambdaと合わせて利用されることがよくある（サーバーレス開発によく使われる）  
VPCからDynamoDBへの通信には、VPCエンドポイント（Gateway型）を使用することで、低コスト・安全な通信が可能。

### パーティションキー

DynamoDBはKey-Valueストアなので、パーティションキー(Key)に対してValueが格納されます。  
DynamoDBテーブルの項目を識別するプライマリーキーはシンプルキー（パーティションキーのみ）または複合キー（パーティションキーとソートキーの組み合わせ）で構成される。  
ソートキーはシンプルキーでパーティションを一意に特定できない場合に使用する。  
プライマリーキーだけで絞り切れない場合、プライマリーキー以外の属性を使ってデータに効率的にアクセスできるようセカンダリインデックスを作成する。

セカンダリインデックスには次の種類がある

- ローカルセカンダリインデックス（LSI）
- グローバルセカンダリインデックス（GSI）

### ローカルセカンダリインデックス(LSI)

ローカルセカンダリインデックスには次の特徴がある

1. テーブル作成時にしか作成できない
2. プライマリーキーが複合キーである必要がある
3. パーティションキーをソートキー以外でのおこなうキーを別途設定できる

### グローバルセカンダリインデックス(GSI)

グローバルセカンダリインデックスには次の特徴がある。

1. テーブル作成後も自由に追加・削除できる
2. デフォルトで20個作成できる
3. パーティションキーを別途作成できるイメージ（GSIがcである項目を検索したいときに便利）

[![Image from Gyazo](https://i.gyazo.com/2741762c08932773c8e0c21dbe288f1e.png)](https://gyazo.com/2741762c08932773c8e0c21dbe288f1e)

## DynamoDB Accelerator(DAX)

DynamoDB Accelerator（DAX）とは、DynamoDBに特化したフルマネージド型高可用性インメモリキャッシュ。  
主なユースケースとしては、高い読み取り負荷がかかるアプリケーション。  
リアルタイム処理や読み取りが一時的に集中するようなアプリケーションが例に挙がる。  
DAXは結果整合性のある読み取りワークロードの応答時間をミリ秒からマイクロ秒まで短縮できるため前述のようなアプリケーションに適している。  
また、DynamoDBと互換性があるため、既存のアプリケーションに機能的な変更を加える必要がありません。 SAA試験では、DAXの読み取り操作に関する問題がよく出題されます。ユースケースまで理解しておくとよいでしょう。

## dynamo初心者用

[dynamo初心者](https://qiita.com/hshimo/items/e5ad98b21786d796f1da)  
[DynamoDB全くわからない、から、ちょっとわかるようになるまでの道しるべ](https://dev.classmethod.jp/articles/dynamodb-chottowakaru/)

検索や集計は弱い（MySQLなどと併用する）

> DynamoDBでは以前はプライマリキーを構成するキーをハッシュキー、レンジキーと呼んでいました。
> しかし、最近ではAWSマネジメントコンソール上で下記のようにDynamoDBの以前で言うハッシュキー、レンジキーの表記が変更されていますので注意が必要です。

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

## DynamoDB Tips

DynamoDBに関連するtipsを記載

### DynamoDB Local導入

[参考URL](https://qiita.com/gzock/items/e0225fd71917c234acce)

### localで構築したDynamoDBをGUIツールで見る

[参考URL](https://zenn.dev/oku3san/articles/187651d98f09a9)
