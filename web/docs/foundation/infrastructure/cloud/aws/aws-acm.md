# AWS-ACM

## AWS Certificate Manager (ACM)とは

AWSで提供されているサービスのひとつで、SSL/TLS証明書のプロビジョニング、管理、デプロイを簡単に行うことができます。ACMを使用すると、AWSのサービスと統合された証明書を手軽に取得、更新、管理することが可能です。

主な機能と特徴には以下のようなものがあります：

1. **無料の証明書**: ACMを利用すると、Public SSL/TLS証明書を無料で発行することが可能。
2. **証明書の自動更新**: ACMによって発行された証明書は、自動的に更新されます。これにより、手動での証明書更新の手間や証明書の有効期限切れによるサービスダウンを防ぐことができます。
3. **AWSのサービスとの統合**: ACMの証明書は、Amazon CloudFront, Elastic Load Balancing, Amazon API Gateway, AWS CloudFormationなどのAWSサービスとシームレスに統合されて使用することが可能

そして、ACMは**Route 53**とは別のサービスです。しかし、ACMとRoute 53はよく連携して使用される。  
たとえば、ACMで証明書を申請する際に、ドメインの所有権を証明するためにRoute 53のDNSレコードを利用することが可能。
また、Route 53で管理しているドメインに対して、ACMで取得したSSL/TLS証明書を簡単に関連付けることができます。
