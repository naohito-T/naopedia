# serverless-framework


## プラグインのインストール
[リフェレンス](https://www.serverless.com/framework/docs/guides/plugins)

プラグインはサービスごとにインストールされる。
それらは**グローバルには適用されない。**

サービスディレクトリで以下コマンド（serverless.ymlにもpluginが追記される）
`$ serverless plugin install -n custom-serverless-plugin`

## サービス

serverlessは**サービスという単位**で実行環境を作っていく。
AWSをプロバイダーとしてNode.jsでサービスを開設する場合は以下の手順になる。
`$ serverless create --template aws-nodejs --name my-special-service --path my-special-service`

すると、my-special-serviceのディレクトリが作られ、その配下に以下のファイルができているはずです。
これでサービスの作成は完了です。

## template

どの言語でLambdaを動かしたいかによってテンプレートを変更してあげる。
`serverless create --template aws-nodejs --name my-special-service --path my-special-service`

一覧
[リファレンス](https://serverless.co.jp/blog/25/)

## serverless.yml

トップに関してはセクションという。

## serverless.ymlを一行一行見ていく
[serverless.ymlを一行一行](https://zenn.dev/han_aru/articles/aabac861bc519d1220a5)

```yml
service: xxxxx-xxxxx
frameworkVersion: ">=1.53.0 <2.0.0"

plugins:
  - serverless-pseudo-parameters

custom: ${file(../../serverless.common.yml):custom}

provider:
  name: aws
  runtime: python3.8
  stage: ${opt:stage, self:custom.defaultStage}
  region: ap-northeast-1
  profile: ${opt:profile, ''}
  logRetentionInDays: 30
  environment:
    TZ: Asia/Tokyo
    STAGE: ${self:provider.stage}
    API_ENDPOINT: ${self:custom.api_endpoint}
  iamRoleStatements:
    - Effect: Allow
      Action:
        - ssm:GetParameter
        - ssm:PutParameter
      Resource:
        - arn:aws:ssm:${self:provider.region}:#{AWS::AccountId}:parameter/*
    
functions:
  Refresh:
    handler: handler.xxx_handler
    layers:
      - ${self:custom.requirements_layer}
      - ${self:custom.shared_layers}
    events:
     - schedule: cron(0 16 ? * WED *) # １週間おき（UTC -> JST毎週木曜の1:00AM）に実行
```

- frameworkVersion
公式ドキュメントではチームの全員がまったく同じ設定を使用し、予期しない問題が発生しないように、正確なバージョンに固定することをオススメ。
正確なバージョンとはframeworkVersion: "=1.0.3" こう書くようです


### プラグインセクション

プラグインを定義する順序が重要であることに注意してください。サーバーレスはすべてのコア プラグインをロードし、次にカスタム プラグインを定義した順序でロードします。

### customセクション

プラグインの追加構成を追加できる場所。

---

## GitHubに上がった既存のサービスをインポートする

すでにGitHubへ上がっている既存サービスの開発を行う場合は、そのままローカルにインポートしてServerlessをセットアップしたいと思います。
`serverless install -u [GITHUB URL OF SERVICE]`

## サービス単位デプロイ

Serverlessのデプロイにはstageという概念が導入されています。
いわゆる本番環境とテスト環境といった環境をstageという単位で切り分けています。

Serverlessはデフォルトで`dev`というステージかつ`us-east-1`リージョンへデプロイされるようになっている。
もしこれを変更したければ`serverless.yml`に以下のように設定する。

```yml
serverless.yml 

service: service-name
provider:
  name: aws
  stage: beta
  region: us-west-2
```

## ファンクション単位のデプロイ

serverless deploy -vはサービス全体のデプロイを行います。ファンクションの一部を修正したなどのケースで、サービス全体がデプロイされるのは大変です。
Serverlessはファンクション単位でのデプロイもserverless deploy function -f <yourfunction>にて可能です。

---

## serverlessで使用できる変数
[リファレンス](https://serverless.co.jp/blog/25/)
>Serverless Frameworkはserverless.yml内で変数を定義することで柔軟なサービス設定が可能となっています。

### 環境変数を参照する場合

>環境変数を参照する場合は${env:SOME_VAR}というシンタックスをserverless.ymlに記述します。以下がその例です。serverless.yml

```yml
service: new-service
provider: aws
functions:
  hello:
      name: ${env:FUNC_PREFIX}-hello
      handler: handler.hello
  world:
      name: ${env:FUNC_PREFIX}-world
      handler: handler.world
```
この例ではあなたのPC内のFUNC_PREFIXという環境変数を参照するようになりました。

### CLIオプションを参照する

>serverlessコマンド実行時のオプションを参照させたい場合は${opt:SOME_VAR}というシンタックスをserverless.ymlに記述します。以下がその例です。

```yml
serverless.yml
service: new-service
provider: aws
functions:
  hello:
      name: ${opt:stage}-hello
      handler: handler.hello
  world:
      name: ${opt:stage}-world
      handler: handler.world
```
serverless deploy --stage devとした場合は、${opt:stage}はdevが返ります。また、serverless deploy --stage productionとした場合は、productionが返ります。

### 自身で定義した変数を参照する






---

## Serverless Components
[リファレンス](https://serverless.co.jp/blog/51/)
[参考URL](https://qiita.com/G-awa/items/04dec937925d2875d320)
>従来Serverless Frameworkはfunctionとeventは簡単に定義できていましたが、インフラリソースをプロビジョニングするためにはどうしても Cloudformation を定義する必要がありました。
>また、プロビジョニングできる対象も AWS や GCP などの特定のクラウドベンダーのサービスにしか対応しておらず、Auth0 などを使用する場合は自前で構成管理をする必要がありました。Serverless Components なら様々な SaaS に対応できます。

## コンポーネントとは

>Serverless Component は React のコンポーネントと同じ構造に基づいています。個々のコンポーネントを参照したり、複数のコンポーネントを同時に作成できます。
>先の例をコンポーネントを使用して構築すると以下のように分解ができます。もちろん、より小さくコンポーネントを分割することもできます。ここでは最小の意味のある単位で分割した場合を図示しています。


---

## serverless framework v3について
[v2とv3の違い](https://blog.serverworks.co.jp/sls-v3-update-summary)

## CLI同梱問題

serverless v2までに関しては`@serverless/cli`が同梱されていたが、serverless v3に関しては`@serverless/cli`が同梱されなくなった。
そのため、serverless v3をinstallした場合は`@serverless/cli`もinstallしなければいけない。そしてcliのインターフェイスは`components-v1`

## CLI のオプション指定方法

>自由にCLIオプションをつけることができなくなりました。
>オプションで、sls に値を渡す場合は、params をオプション名で指定する必要があります。

```yml
provider:
  environment:
    APP_DOMAIN: ${param:domain}
    KEY: ${param:key}
```
```sh
# 非推奨
serverless deploy --domain=myapp.com
 
# v3 以降
serverless deploy --param="domain=myapp.com"
```