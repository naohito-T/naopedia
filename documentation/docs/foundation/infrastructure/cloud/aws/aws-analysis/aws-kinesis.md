# Amazon Kinesis

## Overview

Amazon Kinesisは、動画・音声・アプリケーションログ・IoTデバイスからのセンサーデータなどのストリーミングデータをリアルタイムで収集・処理・分析できるサービス。  
AWS上でストリーミングデータを扱う方法としては、EC2インスタンスをアプリケーションサーバーとしてリクエストを直接処理したりAmazon SQSでキューイングしたりといった方法がありますが、Kinesisを利用するとそれらと比べて低コストかつ大容量のデータを扱うことができる。  
なお、Kinesisは処理したデータを即時削除することなく**24時間から7日間**保持することができるため、複数のコンシューマーが同じデータを取得することをサポートしている。  
コンシューマーとは、Kinesisからデータを取得するアプリケーションを持つEC2やLambdaなどを指し、DynamoDBやS3などの他サービスへデータを受け渡す役割を担っている。  

## Kinesis 4つの機能

Kinesisには次の4つの機能が備わっている。

### Kinesis Data Streams

**データを低レイテンシーでリアルタイム**に利用できる機能。  
大量のデータを効率よく処理するために、『シャード』と呼ばれる単位でデータを分割して並列処理を行う。  
シャードとは、データストリーム内の一意に識別されたデータレコードの単位です。

[![Image from Gyazo](https://i.gyazo.com/0ba656b8e11137a1c9f7eb268f3e0968.png)](https://gyazo.com/0ba656b8e11137a1c9f7eb268f3e0968)

### Kinesis Data Analytics

ストリーミングデータに対してリアルタイムで分析が可能な機能。  
SQLクエリを実行し分析するため、ストリーミングデータの合計値や平均値などを簡単に計算できる。  
次の図はゲームなどの分析で使用される例

[![Image from Gyazo](https://i.gyazo.com/9c66a513d1745ac2ec9bae5c5755c3ed.png)](https://gyazo.com/9c66a513d1745ac2ec9bae5c5755c3ed)

### Kinesis Data Firehose

簡単な設定でストレージサービスにデータを流し込むことができる機能。  
暗号化や圧縮技術にも対応している。  
Kinesis Data FirehoseはストリーミングデータをS3やRedshiftなどのデータストアや分析サービスに送信したり、ストリーミングデータ動作環境の一部としてKinesis Data AnalyticsやKinesis Data Streams・Kinesis Video Streamsと併せて使用されるケースもある。  
次の図はKinesis Data AnalyticsとKinesis Data Firehoseを併用した使用例です。

[![Image from Gyazo](https://i.gyazo.com/b7a3a67bdef02ef356d6715f747f6797.png)](https://gyazo.com/b7a3a67bdef02ef356d6715f747f6797)

### Kinesis Video Streams

動画撮影デバイスから直接AWS上にストリーミング配信が可能な機能。  
次の図では監視カメラ・ドライブレコーダーなどで使用される例

[![Image from Gyazo](https://i.gyazo.com/6a4c2538c72159638a0e2a37fae6949b.png)](https://gyazo.com/6a4c2538c72159638a0e2a37fae6949b)
