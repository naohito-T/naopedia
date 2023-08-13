# AWS RDS周り

AWSのRDSにまわりについて

## Amazon RDS

Amazon RDSはクラウドの上でリレーショナルデータベースを使えるサービス。  
フルマネージドサービスでバックアップ、ソフトウェアパッチ、自動的な障害検出、および復旧を管理します。そしてDBインスタンスのCPU、メモリ、IOPSやストレジを個別に設定できまし、マルチAZやフェイルオーバなど高可用性のリレーショナルデータベースサービスです。

## Amazon Auroraとは

Amazon AuroraはMySQLおよびPostgreSQLと互換性のあるクラウド向けのリレーショナルデータベース  
Amazon AuroraはAmazon RDSが提供しているデーターベースエンジンのひとつで、MySQLの最大5倍・PostgreSQL最大3倍のパフォーマンスを提供できるとのこと  
※AuroraはRDSとは違うアーキテクチャを持っている

## Amazon RDSとAmazon Auroraの違い
[Aurora Serverlessについての整理](https://dev.classmethod.jp/articles/aurora-serverless-summary/)

大きい違いはストレージ。  
RDSはひとつのDBインスタンスにひとつのインスタンスとEBSが連結されている。  
Auroraは分散ストレージです。すべてのデータは最小3つのAZ、AZあたり2つのデータコピー本にあるたくさんのストレージノードに保存されます。そのおかげで迅速なファイルオーバ高い可用性の実装ができます。

## Amazon Aurora Serverless

Auroraのサーバレスバージョン（Aurora ServerlessとAuroraはアーキテクチャから違う）  
Aurora Serverlessはインスタンスの管理が要らないので予想不可能なトラフィックやテストを行う時に有用に使える。  

### この章での単語説明

### フェイルオーバ

フェイルオーバとは、システムに障害や故障が発生した場合に、自動的に別のリソースやサーバに処理を切り替えることを指す。  
これにより、システムのダウンタイムを最小限に抑えることができる。
### バックアップ

メンテナンス時間を設定すると、その時間にバックアップが取られる（差分で）

## リストア