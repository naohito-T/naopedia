# Amazon API Gateway

[参考URL](https://dev.classmethod.jp/articles/what-does-amazon-api-gateway-do/)

アプリケーションをユーザに公開する場合、それがGUIであってもインターフェイスが必要になる。
Webアプリケーションを公開する場合にはWeb APIを利用するのが一般的であり、AWSもAPIをフルマネージドで活用するためのAPI Gatewayを提供している。

## そもそもAPIとは?

アプリケーションが呼び出せば、予期した結果を返されるような仕組み。

## Amazon API Gatewayとは？

Amazon APIGatewayは規模にかかわらず、簡単にAPIの作成と保護、そして公開、モニタリングが可能なフルマネージドサービス

API Gatewayは簡単にAPIを作成し公開できるサービスでかつ、APIに求められるさまざまな機能をカバーしています。
そしてAPI Gatewayはクライアントからリクエストを受け取ってそれをバックエンドに渡し、バックエンドからレスポンスを受け取ってクライアントに返す。
プロキシのような働きをしている。