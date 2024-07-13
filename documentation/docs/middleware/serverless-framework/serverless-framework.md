# serverless-framework

[サーバーレス動作](https://qiita.com/mkin/items/0a82c84df084496544c6)  
[サーバーレスの使い方まとめ（リファレンス）](https://serverless.co.jp/blog/25/)  
[Serverless Frameworkでカスタムドメインを設定する](https://wellknowledge.org/serverless0624/)

## V３でのアップデート内容

[参考URL](https://makky12.hatenablog.com/entry/2022/08/22/120500)

## 設定ファイル

設定ファイルparent設定

```yml
frameworkVersion:
service:
# サーバーレスのプラグインを当てることができる（自作もOK）
plugins:
# Lambdaから他リソースを操作するためのIAMを設定する
provider:
# プラグインのカスタムを記載する。
custom:
# AWSのserverless FrameworkがAWS CloudFormationをスタックを作成する
resources:
functions:
```

## frameworkVersion

フレームワークのversionを記載する

## plugins

プラグインを当てるセクション  

- 自作のプラグインを当てることも可能。
- プラグインの当て方に順番がある。

## resource

[リファレンス](https://www.serverless.com/framework/docs/providers/aws/guide/serverless.yml?prod_DOCS_SEARCH%5Bquery%5D=self%3A#provider)

今までproviderセクションに定義できるのはAPI Gatewayだけだったが、それ以外のリソースもproviderで定義可能になった（V3）  
※今まではresourcesセクションにまとめて定義していた

## serverless framework v3

[【Serverless Framework】version3の新機能＆知らなかった機能](https://makky12.hatenablog.com/entry/2022/08/22/120500)


## serverless-framework AWS認証情報セットアップ

[リファレンス](https://www.serverless.com/framework/docs/providers/aws/guide/credentials)

AWS_PROFILEに環境変数を設定するといける。
`export AWS_PROFILE="profileName2"`

## deployする前に処理を挟む

[参考URL](https://dev.classmethod.jp/articles/create-serverless-framework-plugin-for-specific-action-before-deploy/)

## serverless URLからstageを取る

[参考URL](https://stackoverflow.com/questions/46857335/how-to-remove-stage-from-urls-for-aws-lambda-functions-serverless-framework)

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

---

## serverless初心者講座

[流れからわかりやすい](https://tech-broccoli.life/articles/engineer/sls-environment/)

## serverless 初期化コマンド

- 実行フォルダー直下にファイル群を作成するか（`-p`をつける）
- フォルダーの中にまとめた状態で作成するか（`-p`をつけない）

## 初期化コマンド終了後

serverlessのパッケージが存在していないため以下のコマンドを実行する。

`yarn` or ` yarn add serverless`

## serverlessが実行できることの確認

`$ sls create`をした時点で、エンドポイントを叩くとサンプルのJSONが返ってくる参考用の`helloメソッド`が用意されています

localのメソッドを試すには`$ sls invoke`コマンドを使用します。

```sh
# ローカルのsls invokeを使い hello メソッドを試す
$ npx sls invoke local --function hello
or
# --function は -f と省略する事が可能
$ npx sls invoke local -f hello
```

- deployされたメソッドを試す
デプロイしたものは`$ sls invoke hello`とすればOK！

## serverless invoke

Serverless Frameworkで作成するメソッドは、

- エンドポイントを叩く
- cronで決めた時間に実行する
等、何かしらトリガーがある。そのため
`$ sls invoke`はそれらのメソッドをすぐに実行し試す事ができる。
※**ローカルだけではなくデプロイしたもの**も実行できる
デプロイしたものは`$ sls invoke hello`とすればOK！

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

## GitHubに上がった既存のサービスをインポートする

すでにGitHubへ上がっている既存サービスの開発を行う場合は、そのままローカルにインポートしてServerlessをセットアップできる。
`serverless install -u [GITHUB URL OF SERVICE]`

## サービス単位デプロイ

Serverlessのデプロイにはstageという概念が導入されています。
いわゆる本番環境とテスト環境といった環境をstageという単位で切り分けています。

Serverlessはデフォルトで`dev`というステージかつ`us-east-1`リージョンへデプロイされるようになっている。
もしこれを変更したければ`serverless.yml`に以下のように設定する。

```yml
service: service-name
provider:
  name: aws
  stage: beta
  region: us-west-2
```

## ファンクション単位のデプロイ

serverless deploy -vはサービス全体のデプロイを行います。ファンクションの一部を修正したなどのケースで、サービス全体がデプロイされるのは大変。  
Serverlessはファンクション単位でのデプロイも`serverless deploy function -f <your-function>`にて可能です。

## serverlessで使用できる変数

[リファレンス](https://serverless.co.jp/blog/25/)  
>Serverless Frameworkはserverless.yml内で変数を定義することで柔軟なサービス設定が可能となっています。

### 環境変数を参照する場合

> 環境変数を参照する場合は`${env:SOME_VAR}`というシンタックスをserverless.ymlに記述します。以下がその例です。serverless.yml

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

> serverlessコマンド実行時のオプションを参照させたい場合は`${opt:SOME_VAR}`というシンタックスをserverless.ymlに記述します。以下がその例です。

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

serverless deploy --stage devとした場合は`${opt:stage}`はdevが返ります。また、serverless deploy --stage productionとした場合は、productionが返ります。

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

## components-v1コマンド

serverlessが提供するコマンド（3系のみ？）
`npm install -g @serverless/cli`

## serverless v2 v3違い

[参考URL](https://blog.serverworks.co.jp/sls-v3-update-summary)

- dotenv
serverless-dotenv-pluginを使用して`${env:xxx}`のような環境変数の参照ができなくなった。
v3（2系後半のバージョンも含む）以降は、ネイティブでサポートされているため、`useDotenv: true`を設定することで参照できます。

## プラグインのインストール

[リフェレンス](https://www.serverless.com/framework/docs/guides/plugins)

プラグインはサービスごとにインストールされる。
それらは**グローバルには適用されない。**
インストール方法は2つある。

- サービスディレクトリで以下コマンド（serverless.ymlにもpluginが追記される）
`$ serverless plugin install -n custom-serverless-plugin`

- npm or yarnなどを使ってインストールする。
`$ yarn add -D [plugin name]`
そのあとは`serverless.yml`内のプラグインに自身で記載する。

## serverlessでnode_modulesをレイヤー

[参考URL](https://dev.classmethod.jp/articles/serverless-framework-node-modules-to-lambda-layers/)

## serverlessとcomponent-v1コマンド

serverless v2コマンドに関しては

`serverless.yml`で`component: '@sls-next/serverless-component@3.7.0'`などを使用するとそっちのコンポーネントを使うことになるため`serverless package`など通常通りにはできず`component: '@sls-next/serverless-component@3.7.0'`に実装されていないと実行できない。  
ひとつのファイルにはひとつのコンポーネントのみが使用できる。  
※理解としてはcomponentを使うと`serverless.yml`がそのコンポーネント仕様になる

## serverlessとlocalStack

[参考URL](https://tech.sawa-lab.net/archives/473)

localStackはプラグインよりもdockerで準備する。  
serverlessにはプラグイン（serverless-localsStack）があり、設定することで簡単にS3やRDSなどのモックを利用することができるようになる。  
しかし、これはあくまでLambdaを実行する時に作成されてLambdaから利用する前提の仕組みになっている。
