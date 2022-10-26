# Amazon API Gateway

[参考URL](https://dev.classmethod.jp/articles/what-does-amazon-api-gateway-do/)
[Amazon CloudFrontでAPI Gatewayの痒いところに手を届ける](https://dev.classmethod.jp/articles/cache-api-gateway-by-cloudfront/)

アプリケーションをユーザに公開する場合、それがGUIであってもインターフェイスが必要になる。
Webアプリケーションを公開する場合にはWeb APIを利用するのが一般的であり、AWSもAPIをフルマネージドで活用するためのAPI Gatewayを提供している。

## そもそもAPIとは?

アプリケーションが呼び出せば、予期した結果を返されるような仕組み。

## Amazon API Gatewayとは？

Amazon APIGatewayは規模にかかわらず、簡単にAPIの作成と保護、そして公開、モニタリングが可能なフルマネージドサービス。
API Gatewayは簡単にAPIを作成し公開できるサービスでかつ、APIに求められるさまざまな機能をカバーしています。
そしてAPI Gatewayはクライアントからリクエストを受け取ってそれをバックエンドに渡し、バックエンドからレスポンスを受け取ってクライアントに返す。
プロキシのような働きをしている。

## API GatewayとCloudFrontの違い


API GatewayがListenするのはHTTPSのみで、HTTPリクエストを受け付けることはできません。 一方CloudFrontはHTTPとHTTPSの両方のリクエストを受けられるので、CloudFrontを経由することでAPI GatewayへのリクエストをHTTPで受けることができます。

## アクセス制限周り

>API Gatewayには、APIキー認証以外にアクセス制限の機能がありません
手前にCloudFrontを置くことで、CloudFrontに統合されたAWS WAFのアクセス制限機能を設定することが可能。

また、API Gatewayへの直アクセスを禁止したい場合は、前述のAPIキー認証を有効化し、先日追加されたオリジンへのヘッダー追加機能でCloudFrontのオリジン設定にx-api-keyヘッダー（独自ヘッダー）を追加、設定することで対応できます。

## キャッシュを細かく設定したい