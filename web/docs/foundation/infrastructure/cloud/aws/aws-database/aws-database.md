# AWS Database

## Overview

AWSデータベース関連のセクション

- Amazon RDS
- Amazon DynamoDB
- Amazon ElastiCache
- Amazon Redshift

## 目標復旧時点[RPO]とは

`目標復旧時点[Recovery Point Objective]` とは、障害が発生してデータが失われた際に、どこまで障害発生時刻に近い状態で復旧するかという指標。  
つまり、「データをどのタイミングまで戻せるようにするか」という指標。  

たとえば、銀行で扱う金融システムなど、障害が発生した直前までのデータが必要である場合は、RPOは0秒となります。  
それほどリアルタイムでのデータ復旧を求めないシステムで、「昨夜の状態」に復旧できればよい場合は、RPOを1日などで設定する。  
RPOは短くなればなるほどリアルタイムに復旧できますが**頻繁にバックアップ取得が必要となるためコストが高くなる。**
RPOを設定する際は、取り扱うデータの特性を鑑みてどれだけリアルタイムに復旧が必要であるか、コストとの兼ね合いを考えながら設定する必要があります。

## 目標復旧時間[RTO]とは

`目標復旧時間[Recovery Time Objective]` とは**障害が発生した際にどれだけシステム停止時間を短くできるかという指標**  
RTOは短くなればなるほど復旧までの時間短縮となりますが、その分コストが増加します。  
たとえば、夜間にサーバーが停止した際にすぐに復旧させる必要がある場合、担当者を常駐させる費用など、コストが発生する。

## RTO・RPOとコストの関係

RTO・RPOとコストは図のようにシーソーの関係にあります。RPOとRTOが短くなればなるほど多くのバックアップが必要となり、復旧までの時間が短縮され人件費やシステムに対する投資が必要となることからコスト増となります。バックアップ戦略を考える上ではコストとのバランスを考える必要がある。

[![Image from Gyazo](https://i.gyazo.com/1f060bb96e3701db5a2ef3d33297e3da.png)](https://gyazo.com/1f060bb96e3701db5a2ef3d33297e3da)

## ストレージサービス

AWSの主なストレージサービスは以下のの3種類

- S3
- EBS
- EFS

[![Image from Gyazo](https://i.gyazo.com/30544db6c32a2d12d692a5f6c27a51ba.png)](https://gyazo.com/30544db6c32a2d12d692a5f6c27a51ba)

- レイテンシー（待ち時間）
  - **低い**がパフォーマンス良い
  - リクエストを送信してから応答が返ってくるまでの時間
- スループット（一定時間内に処理できるデータ量）
  - **高い**がパフォーマンス良い
