# AWS Cloud Formation
[AWS CloudFormationテンプレートによるインフラ構築（基本概念）](https://dev.classmethod.jp/articles/cloudformation-beginner01/)
[AWS CloudFormation テンプレートの基礎](https://qiita.com/leomaro7/items/05f2f92061d869b08109)  
[CloudFormationで認証情報を扱うベストプラクティス](https://techblog.nhn-techorus.com/archives/17674)  

## ユビキタス

プロビジョニング（provisioning）
必要なものを準備すること  
そこから転じてIT分野では、システムやサービスの需要に応じて、サーバーやネットワークなどのITインフラ設備を調達・設定することを「プロビジョニング」と呼んでいます。

## AWS CloudFormationの概念
[リファレンス](https://docs.aws.amazon.com/ja_jp/AWSCloudFormation/latest/UserGuide/cfn-whatis-concepts.html)

AWS CloudFormationを使用する際には、テンプレートとスタックの作業を行います。
テンプレートは、AWSリソースとそのプロパティを記述するために作成します。
スタックを作成するたびに、CloudFormationはテンプレートに記述されているリソースをプロビジョニングします。



## フォーマット

CloudFormationテンプレートはJSONまたはYAML形式のテキストファイル。  

---

## AWS CloudFormationテンプレートの各セクションについて

### AWSTemplateFormatVersion

このセクションでは、テンプレートのバージョンを定義します。これはオプションです。

```yaml
AWSTemplateFormatVersion: '2010-09-09'
```

### Description

このセクションはテンプレートの説明を提供します。これはオプションです。

```yaml
Description: An example template
```

### Metadata

このセクションはテンプレートの追加情報、たとえば関連するドキュメントや設定情報などを格納します。

```yaml
Metadata: 
  Instances: 
    Description: Information about the instances
```

### Parameters

このセクションでテンプレートに入力パラメーターを定義します。これによってテンプレートは再利用可能になります。

```yaml
Parameters:
  InstanceType:
    Description: EC2 instance type
    Type: String
    Default: t2.micro
```

### Mappings

このセクションでは、マッピングテーブルを作成できます。  
これはある値に基づいて他の値を参照する際に使用されます。

```yaml
Mappings: 
  RegionMap: 
    us-east-1: 
      HVM64: ami-0123456789abcdef0
```

### Conditions

このセクションでは、リソースの作成条件を定義する。  
たとえば、特定の環境に依存するリソースを制御する際に使用されます。

```yaml
Conditions:
  CreateProdResources: !Equals [ !Ref EnvType, prod ]
```

### Transform

このセクションでは、マクロを指定してテンプレートをプリプロセッシングできます。

```yaml
Transform:
  - AWS::Serverless-2016-10-31
```

**プリプロセッシングとは**  
ソフトウェアのビルドプロセスやデータ変換の一部として行われる、事前の処理ステップを指す。

### Resources (必須)

このセクションは必須であり、AWSリソースを定義する  
テンプレート内で作成・更新・または削除するAWSリソースを定義する場所。  
各リソースは一意の論理IDと一連のプロパティを持ち、これによってCloudFormationがリソースをどのように作成または設定するかが決まります。


```yaml
Resources:
  MyBucket:
    Type: AWS::S3::Bucket
```

### Outputs

このセクションでは、スタック作成後に出力する値を定義します。

```yaml
Outputs:
  BucketName:
    Value: !Ref MyBucket
    Description: Name of the S3 bucket
```

これらのセクションを組み合わせて、AWSのリソースと設定を効率的に管理するテンプレートを作成することができます。

## スタック

単一のユニットとして管理できるAWSリソースのコレクション。  
つまり、スタックを作成、更新、削除することで、リソースのコレクションを作成、更新、削除できます。 スタック内のすべてのリソースは、スタックのAWS CloudFormationテンプレートで定義されます。

## yml内のセクション



### Outputsセクション

- 別スタックで値を参照（ImportValue）する
- CloudFormationコンソールに値を出力する

## aws ymlでの特別な記法
[CloudFormationの書き方 覚え書き](https://qiita.com/y-suzuki-biz/items/3357af6a429dcb7e414a)  
[loudFormationをYAMLで書くときは短縮記法](https://dev.classmethod.jp/articles/cfn-short-form-in-yaml-syntax/)

これを参考にする  

## !Sub

!Subは文字列結合っぽい

## !Ref

以下の用途で使用する  
- Parametersセクションで指定したパラメーターの参照
- Resourcesセクションで指定したリソースの参照

## !ImportValue

別のスタックでエクスポートされた値を参照する時に使用する。


```yml
AWSTemplateFormatVersion: '2010-09-09'

Description: Parameter Store

# GUI、外部からパラメーターを指定する場合の書き方
# ドロップダウンによる選択肢、デフォルト値も指定可能
# この中を参照するには!Refや${}
Parameters:
  Project:
    Description: "Project"
    Type: String
    AllowedPattern: '^[0-9a-z]*$'
  Environment:
    Description: "Environment"
    Type: String
    Default: "sbx"
    AllowedValues:
      - "prd"
      - "stg"
      - "dev"
      - "sbx"
    AllowedPattern: '^[0-9a-z]{3}$'
  ParamKey:
    Description: ""
    Type: String
    AllowedPattern: '^[0-9a-zA-Z._/-]+$'
  ParamValue:
    Description: ""
    Type: String
  ParamType:
    Description: ""
    Type: String
    AllowedValues:
      - "String"
      - "SecureString"
  ParamDescription:
    Description: ""
    Type: String

Resources:
  SSMParameter:
    Type: "AWS::SSM::Parameter"
    Properties:
      Description: !Ref ParamDescription
      Name: !Sub "/${Project}/${Environment}/${ParamKey}"
      Value: !Ref ParamValue
      Type: !Ref ParamType
```

## 擬似パラメーター

擬似パラメーターは`AWS CloudFormation`で事前定義されたパラメーター  
以下のようなパラメーターをRefを使って参照できる

AWS::AccountId	スタックが作成されるアカウントのAWSアカウントID
AWS::Region	スタックが作成されるAWSリージョン
AWS::StackName	スタックの名前

## Parameter Store/Secrets Managerを使った参照をする

AWS Systems Manager(SSM) パラメータストアやAWS Secret Managerに保存した値を動的に参照することができる。

リソースのパラメーターをSSMパラメータストアに外出しして管理する。スタック作成時にも利用する
パスワードなど秘匿情報をSSMパラメータストア`Secure Strings`または`Secret Manager`に保存してテンプレートからスタックを作成するときに参照するなどの利用シーンがある。

秘匿情報はSSMパラメータストア`Secure Strings`または`Secret Manager`に保存しましょう。  
テンプレートにパスワードを書いてしまうと、CloudFormationのコンソールから見ることができる状態になってしまいます。  
また、大規模な環境で多くのスタックで共通して使われるパラメーターがある場合は、 SSMパラメータストアに保存して利用してもらうと、管理が楽になることが多い。

## cdk bootstrap(CDKToolkit)
[cdk bootstrap(CDKToolkit)を使いこなす](https://zenn.dev/rrrraaaaa6/articles/61319c356dc964)

CDKアプリケーションをデプロイするにあたって必要なリソースを作る呪文が`cdk bootstrap`というコマンド。  
このコマンドを実行すると`CDKToolkit`という名前の`CloudFormation Stack`が作成される




