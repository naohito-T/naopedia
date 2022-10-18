# serverless-framework


## プラグインのインストール
[リフェレンス](https://www.serverless.com/framework/docs/guides/plugins)

プラグインはサービスごとにインストールされる。
それらは**グローバルには適用されない。**

サービスディレクトリで以下コマンド（serverless.ymlにもpluginが追記される）
`$ serverless plugin install -n custom-serverless-plugin`

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