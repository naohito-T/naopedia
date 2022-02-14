# Serverless Framework

[参考URL](https://serverless.co.jp/blog/25/)
[こちらがわかりやすい](https://service.plan-b.co.jp/blog/tech/30863/)

## Serverless Framework

ServerlessはNode.jsで作られたCLIツール
Serverless Framework（サーバーレスフレームワーク）は、Node.jsを使用して記述された無料のオープンソースWebフレームワークである

**Serverless Frameworkでは、Lambda Functionで使用する周辺リソース（S3,SQS(Amazon Simple Queue Service)など）も同時にデプロイ管理することができます。手動で作成した既存のリソースも使用しても問題ありません**

## Serverless Frameworkが台頭した理由

AWSのLambdaが登場したことによりサーバーレスのアプリケーションが注目された。
そのため、LambdaとAPI Gatewayさえ準備すれば、完全サーバーレスが作成される。
Lambdaの管理が煩雑になり、その管理を担う形でフレームワークとして台頭した。

## Serverless Framework セットアップ

プロバイダーのアカウントをセットアップする。
プロバイダーとは、要はどのクラウドサービスを使用してServerlessを動かすか。
AWS, GCP, Azure, IBM Cloudなど様々なクラウドプロバイダーに対応している。

## 各プロバイダーによって

Amazon Web Servicesの一部としてAmazonが提供するサーバーレスコンピューティングプラットフォーム「AWS Lambda」で、アプリケーションを構築するために開発されたその最初のフレームワークである。 現在、サーバレスで開発されたアプリケーションは、Azure FunctionsでマイクロソフトAzure、Apache OpenWhiskを基盤とするIBM Cloud FunctionsでIBM Bluemix 、 Google Cloud Functionsを使用するGoogle Cloud Platform(GCP) 、 OracleのFn[1] を使用するOracle Cloud 、Kubernetesを基盤とするKubeless[※ 2] 、Spotinst 、およびAuth0によるWebtask、など他のFunction as a serviceのプロバイダーに展開する事（デプロイ[※ 3]）も可能である[2]。

サーバーレスアプリは、単にいくつかのタスクを実行するための2つのラムダ関数か、または数百のラムダ関数で構成されるバックエンド全体に過ぎない可能性がある。 サーバーレスは、選択したクラウドプロバイダー内で提供されるすべてのランタイムをサポートする。
サイト「Serverless」はAusten Collins [3]によって開発され、フルタイムのチームによって維持されている。

## Serverless Framework の単位

サービスという単位で実行環境を作っていく。

## そもそもサーバーレスアーキテクチャって何？

簡潔にいうと、「常時起動しているサーバーを使わずにアーキテクチャ（仕組み）が実現できている状態」というニュアンスが近いです。 メリットとしては、常時起動サーバーがなくなり、以下のサーバーあるあるの問題がなくなることです。

サーバーを常時起動している場合、使用していない時間も料金がかかる問題
起動しているサーバーは、誰がメンテナンスするの問題
サーバー設定担当者によって構成が微妙に違うので、デプロイしたらコードが動かない問題
重複しますが、そんなサーバー関連の問題を減らすことができる「サーバレスアーキテクチャ」をお手軽に構築できるのが、「Serverless Framework」となります。

[AWS サーバーレスおさらい](https://d1.awsstatic.com/serverless-jp/seminars/20210909_Serverless_session1.pdf)



