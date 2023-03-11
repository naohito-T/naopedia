# AWS Cloud Formation
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

## テンプレート

CloudFormationテンプレートはJSONまたはYAML形式のテキストファイルです。これらのファイルは、.json、.yaml、.template、.txtなどの拡張子を使用して保存できます。


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

リソースのパラメーターをSSMパラメータストア に外出しして管理する。スタック作成時にも利用する
パスワードなど秘匿情報を SSMパラメータストア Secure Strings または Secret Mamager に保存して テンプレートからスタックを作成するときに参照する
などの利用シーンがあります。

秘匿情報は SSMパラメータストア Secure Strings または Secret Mamagerに保存しましょう。 テンプレートにパスワードを書いてしまうと、CloudFormationのコンソールから見れる状態になってしまいます。 また、大規模な環境で多くのスタックで共通して使われるパラメータがある場合は、 SSMパラメータストアに保存して利用してもらうと、管理が楽になることが多いです。


