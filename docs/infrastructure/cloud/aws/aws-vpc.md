# VPC(Amazon Virtual Private Cloud (Amazon VPC) )

## VPCエンドポイント（AWS PrivateLink）

VPCと他のVPC外のサービス間の通信を可能にするサービスで、たとえばLambdaとParameter Store間にVPCエンドポイントを作成することで、LambdaからParameter Storeにアクセスが可能になる。  
インターフェイスエンドポイントとゲートウェイエンドポイントの2種類があり、前者は有料ですが後者は無料です。S3とDynamo DBではゲートウェイエンドポイントが利用できる。

