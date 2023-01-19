# AWS WAF
[AWS WAF解説](https://www.wafcharm.com/jp/blog/aws-waf-basic-structure/)

## 構成図
![構成図](https://i.gyazo.com/369da6037459ed60e58925b875a18908.png)

## WAFとは

AWSが提供するWeb Application Firewall

- `L7(HTTP/HTTPS)`アプリケーション層の防御  
- Web ACLによりアクセスの制限を実現  
- SQL InjectionやXSS, アプリケーション固有の攻撃に対応

## AWS WAF各用語

- Web ACL
ウェブアクセスコントロールリストで`Rules`を紐づける  
1つのWeb ACLに適用可能な`Rule`は10個まで
CloudFront, ALB, API GatewayにWebACLを関連付けして利用
 
- Rules
具体的な条件を指定する`Condition`を紐付け管理する
1つのRuleに適用可能な`Condition`は10個まで
 
＜Conditions＞
防ぎたい攻撃の条件を具体的に定義する
SQL InjectionやXSSの`Condition`が用意されている
アプリケーション固有の攻撃に対応する場合は独自の条件を記述する

## AWS WAFでWeb Applicationを防御する手順

次の手順を踏む
1. アクセス制御の目的に合わせて`Condition`を作成
2. 作成した`Condition`を含む`Rule`を作成
3. 作成した`Rule`を適用するための`Web ACL`を作成
4. 作成したRuleを`Web ACL`に適用
5. Web ACLをCloudFront, ALB, API Gatewayのいずれかに適用


## AWS WAF で許可または拒否可能なリクエスト

AWS WAFでは以下の種類のリクエストを許可または拒否することが可能。
AWS WAFでは、1 Web ACLに設定できるルール数には限りがあるためサイトの用途に応じて適切に選択することが重要。

- 送信元IPアドレスが、特定のIPアドレスまたはIPアドレス範囲
- 送信元IPアドレスが、特定の国
- リクエストの特定の部分の文字列マッチング（正規表現可）
- 指定した長さを超えている
- SQLインジェクションやクロスサイトスクリプトが含まれている