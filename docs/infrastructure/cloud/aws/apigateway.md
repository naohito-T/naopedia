# Amazon API Gateway

[参考URL](https://dev.classmethod.jp/articles/what-does-amazon-api-gateway-do/)
[Amazon CloudFrontでAPI Gatewayの痒いところに手を届ける](https://dev.classmethod.jp/articles/cache-api-gateway-by-cloudfront/)

アプリケーションをユーザに公開する場合、それがGUIであってもインターフェイスが必要になる。
Webアプリケーションを公開する場合にはWeb APIを利用するのが一般的であり、AWSもAPIをフルマネージドで活用するためのAPI Gatewayを提供している。

## Amazon API Gatewayとは？

Amazon APIGatewayは規模にかかわらず、簡単にAPIの作成と保護、そして公開、モニタリングが可能なフルマネージドサービス。
API Gatewayは簡単にAPIを作成し公開できるサービスでかつ、APIに求められるさまざまな機能をカバーしている。  
そしてAPI Gatewayはクライアントからリクエストを受け取ってそれをバックエンドに渡し、バックエンドからレスポンスを受け取ってクライアントに返す。  
プロキシのような働きをしている。

## API GatewayとCloudFrontの違い

API GatewayがListenするのはHTTPSのみで、HTTPリクエストを受け付けることはできません。 一方CloudFrontはHTTPとHTTPSの両方のリクエストを受けられるので、CloudFrontを経由することでAPI GatewayへのリクエストをHTTPで受けることができます。

## API Gatewayの種類
[参考URL](https://zenn.dev/marokanatani/articles/aws_api_gateway_behavior_go_around)

2種類ある。  
REST API（v1）やHTTP API（v2）  
※HTTP APIの方が後発で機能が少ない分、高速かつ料金が安い。

## Serverless Frameworkを使用する場合
[API GatewayでServerless Frameworkを使用する場合の注意点](https://zenn.dev/marokanatani/articles/aws_api_gateway_behavior_go_around)

Serverless Frameworkを使用する場合
REST APIを使用する場合はhttp
HTTP APIを使用する場合はhttpApiを設定する。

## そもそもAPIとは?

アプリケーションが呼び出せば、予期した結果を返されるような仕組み。

## アクセス制限周り

>API Gatewayには、APIキー認証以外にアクセス制限の機能がありません
手前にCloudFrontを置くことで、CloudFrontに統合されたAWS WAFのアクセス制限機能を設定することが可能。

また、API Gatewayへの直アクセスを禁止したい場合は、前述のAPIキー認証を有効化し、先日追加されたオリジンへのヘッダー追加機能でCloudFrontのオリジン設定にx-api-keyヘッダー（独自ヘッダー）を追加、設定することで対応できます。

## キャッシュを細かく設定したい


## API Gateway の API キー
[Amazon API GatewayでAPIキー認証を設定する](https://dev.classmethod.jp/articles/apigateway-apikey-auth/)
[参考URL](https://nasrinjp1.hatenablog.com/entry/2019/10/08/212938)

Amazon API GatewayでAPIキー認証を設定すればip制限よりもう少し手軽にセキュアにできる。

## API GatewayをCloudFrontでラップする。
[参考URL](https://dev.classmethod.jp/articles/api-gateway-with-cloudfront-distribution/)

>API Gatewayの前にCloudFront Distribution を使用することで、APIGatewayのパフォーマンスを向上させることができます。API Gatewayのエッジ最適化 API エンドポイントを使用すると、最寄りのCloudFront Point of PresenceでAPI呼び出しを終了できます。

API Gatewayの前でCloudFront Distributionを使用する理由
- レイテンシーを削減
- セキュリティを強化する
- キャッシング動作を制御する
- APIのTLS設定を制御する。

