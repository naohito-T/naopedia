# AWS Cloud Formation
[AWS CloudFormation テンプレートの基礎](https://qiita.com/leomaro7/items/05f2f92061d869b08109)

## ユビキタス

プロビジョニング（provisioning）
必要なものを準備すること  
そこから転じてIT分野では、システムやサービスの需要に応じて、サーバーやネットワークなどのITインフラ設備を調達・設定することを「プロビジョニング」と呼んでいます。

## AWS CloudFormationの概念
[リファレンス](https://docs.aws.amazon.com/ja_jp/AWSCloudFormation/latest/UserGuide/cfn-whatis-concepts.html)

AWS CloudFormationを使用する際には、テンプレートとスタックの作業を行います。
テンプレートは、AWSリソースとそのプロパティを記述するために作成します。
スタックを作成するたびに、CloudFormationはテンプレートに記述されているリソースをプロビジョニングします。

## テンプレート

CloudFormationテンプレートはJSONまたはYAML形式のテキストファイルです。これらのファイルは、.json、.yaml、.template、.txtなどの拡張子を使用して保存できます。


## スタック

単一のユニットとして管理できるAWSリソースのコレクション。  
つまり、スタックを作成、更新、削除することで、リソースのコレクションを作成、更新、削除できます。 スタック内のすべてのリソースは、スタックのAWS CloudFormationテンプレートで定義されます。

