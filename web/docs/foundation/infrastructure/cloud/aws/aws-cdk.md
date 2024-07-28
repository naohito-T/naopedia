# AWS CDK（AWS Cloud Development Kit）
[5分で理解するAWS CDK](https://qiita.com/Brutus/items/6c8d9bfaab7af53d154a)  

TypeScriptおよびPythonなどのプログラミング言語を使用して、AWSリソースを定義し、Terraformの様に**Infrastructure as Code（以降、IaC）**を実現する手段として、クラウドインフラのリソースをプロビジョニングすることが可能。

CDKには**L1 ~ L3**までの概念があるため忘れないこと。

## serverless frameworkとcdkの違い
[serverless frameworkとcdkの違い](https://sst.dev/chapters/using-aws-cdk-with-serverless-framework.html)

## はじめてCDKで作成するとき

AWS CDKのアプリを環境（アカウント/リージョン）にはじめてデプロイする場合は初期設定を行います。cdk bootstrapコマンドを実行しましょう。

`$ cdk bootstrap`

これによりデプロイプロセスの際に使用されるCFnのテンプレートやアセットを保存するためのS3バケットが作成されます。

## スタック

AWS CDKのデプロイ単位は**スタック**と呼ばれる  
アプリケーションのstackを表示する
```sh
$ cdk ls
```

## cdk deployコマンドが優秀

このコマンドだけで差分デプロイができる  
CloudFormationで同じことをしようとしたら  
- 初回実行時は普通にデプロイ
- 二度目以降は変更セットを作成して差分デプロイ
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

## AWS CDK 実践
[参考URL](https://dev.classmethod.jp/articles/cdk-practice-1-introduction/)

VPCから作成するのが慣例（自分の陣地をとるみたいな）

## Construct

CDK上においてクラウドコンポーネントは`Construct`という単位の**基本ビルディングブロック**として提供されており、リソース作成に必要なすべてがカプセル化されています。  
そしてこのConstructは以下の3つのレイヤーに分けられています。

- L3: Patterns
  - 複数のリソースを含む構成パターンを事前定義したもの
- L2: High-level constructs
  - デフォルト値や便利なメソッドを定義したAWSリソースを表すクラス
- L1: Low-level constructs
  - CFnリソースおよびプロパティと1:1で対応（**Cfn**というプレフィックスがついたもの）


クラス（Construct）Vpcは`L2`であり、それを作成することでネットワーク構築に必要な（ベストプラクティスとされる）他のリソースが適切な設定値で軒並み一緒に作られてしまう。  
インフラエンジニアとしては各リソースのプロパティは細かくカスタマイズしたいもの。
その場合はL1のLow-level Constructを使用する

## Context
[参考URL](https://dev.classmethod.jp/articles/cdk-practice-4-context/)

**CFnのパラメーター**のように使える機能

- スタックやConstructに関連付けできるキーと値のペア
- キーと値の型はstring
  - 他の型にしたい場合は変換処理が必要

6つの異なる方法でCDKアプリに提供される  

- 現在のAWSアカウントから自動的に
- CDKコマンドの --contextオプション
- プロジェクトのcdk.context.jsonファイル
- プロジェクトのcdk.jsonファイル
- ~/.cdk.jsonファイルのcontextキー
- construct.node.setContextメソッド

6つの方法はいずれも暗黙的に`App Construct`に設定されるためアプリケーション内のConstructインスタンスでContextの値を取得できる。

### パラメーターとの棲み分け


Contextを使う。
CfnParameterというクラスも存在するのですが、AWS公式から非推奨となっている。

## AWS CDKにおけるテスト

AWS CDKではテストは以下の3つのカテゴリに分類される

- Snapshot tests
- Fine-grained assertions
- Validation tests

### Snapshot tests

テスト実行時点で作成されるCFnテンプレート（スナップショット）と事前に保存されているベースラインテンプレートを比較してテストします。  

### Fine-grained assertions

生成されたCFnテンプレートの一部をテストする。  
以下のような項目をチェックできます。

- どんなリソースがあるか
- リソースのプロパティ
- リソースの数
- 出力（Outputs）の内容

### Validation tests

Constructが無効なデータを受け取った時にエラー（例外）を発生させることを確認するテストです。  
以下のサンプルはretentionDaysに無効な値を入れた場合に意図した例外が発生することを確認しています。

## Metadata
[参考URL](https://dev.classmethod.jp/articles/cdk-practice-6-metadata/)

CFnのテンプレートセクションのひとつ。  
このセクションを利用して、開発者はテンプレートに関する追加情報を付与することが可能。
任意項目なので無くても問題ありません。


```sh
# dev
env AWS_XRAY_CONTEXT_MISSING=LOG_ERROR STAGE=local TYPEORM_HOST=127.0.0.1 TYPEORM_PORT=23306 TYPEORM_USERNAME=albdev001admin TYPEORM_PASSWORD=0qASCyg9kj6Xj-jgVse12rgAAQamGHZg yarn client:manage register -n 'renew anycolor id' -r 'https://dev.albatross.anycolorid.com/callback' -p read


# stg
env AWS_XRAY_CONTEXT_MISSING=LOG_ERROR STAGE=local TYPEORM_HOST=127.0.0.1 TYPEORM_PORT=23306 TYPEORM_USERNAME=albstg001admin TYPEORM_PASSWORD=eFTX9TaDrKc8CylxsyKznSQI6t-CO0gB  yarn client:manage register -n 'にじさんじオフィシャルサイト（ログイン確認用）' -r 'https://dev1.smccms.aws.yuu-inc.jp/s/sample33/ichikara/callback' -p read
```