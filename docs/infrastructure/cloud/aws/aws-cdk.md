# AWS CDK（AWS Cloud Development Kit）
[5分で理解するAWS CDK](https://qiita.com/Brutus/items/6c8d9bfaab7af53d154a)  

TypeScriptおよびPythonなどのプログラミング言語を使用して、AWSリソースを定義し、Terraformの様に**Infrastructure as Code（以降、IaC）**を実現する手段として、クラウドインフラのリソースをプロビジョニングすることが可能。

## serverless frameworkとcdkの違い
[serverless frameworkとcdkの違い](https://sst.dev/chapters/using-aws-cdk-with-serverless-framework.html)

## スタック

AWS CDKのデプロイ単位は**スタック**と呼ばれる  
アプリケーションのstackを表示する
```sh
$ cdk ls
```


## cdk deployコマンドが優秀

このコマンドだけで差分デプロイができる  
CloudFormationで同じことをしようとしたら
初回実行時は普通にデプロイ
二度目以降は変更セットを作成して差分デプロイ
みたいなヘルパースクリプトが必要となってしまう。


## IaCの種類

手続き型  
ChefやAnsibleなど構成情報や設定情報を定義する手続き型

冪等性  
Terraformの様にテンプレートに必要とするリソースを定義し、冪等性を担保する宣言型  
※AWS CDKはTerraformと同じ宣言型として、テンプレートを定義することでプロビジョニングを実現します。

## aws-cdk 事始め

AWS CDKをはじめて利用する際は、アカウントのブートストラップというものが必要になる。  
たとえば、AWS LambdaやDockerイメージを作成する際に、スタックと同時に外部ファイルなどが生成する。  
これらの外部ファイルは、S3に置くが、S3にアクセスできる（アップロードできる）ように事前にしておかなければならない

>その作業をブートストラップと呼んでおります。

ブートストラップにおいて必要な情報が2つです。
- アカウントID
- リージョン

## アカウントIDとリージョンは下記コマンドで確認可能

```sh
# Get the account ID
$ aws sts get-caller-identity
{
    "UserId": "xxxxxxxxxxxxxxxxx",
    "Account": "yyyyyyyyyyyy",
    "Arn": "arn:aws:iam::yyyyyyyyyyyy:user/terraform"
}


# Get the Region
$ aws configure get region
ap-northeast-1
```