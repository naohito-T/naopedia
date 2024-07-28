# AWS SAM

[AWS SAMでLambda + API Gateway環境のローカルテスト](https://xp-cloud.jp/blog/2020/10/15/8936/)

## AWS SAM 概要

SAM…Serverless Application Modelの略
サーバレスアプリケーション構築用オープンソースフレームワーク
リソース定義はYAMLを使用
[リファレンス](https://aws.amazon.com/jp/serverless/sam/)

## Lambda関数がlocalでテストできない煩わしさ

>作成したLambda関数の動作確認は、実際にデプロイして確認する必要があり、
>即時確認できないことに煩わしさを感じていました。
>そこで見つけたのが、AWS SAMというフレームワークです。
>Lambdaの動作確認をローカルで完結させることができます。
>今回は「AWS SAM」のローカルテストを試していきたいと思います。

## SAMベースのアプリケーションを構築するには

AWS SAM CLIを使用する。
SAM CLIによりLambdaに似た実行環境が提供され、SAMテンプレートによって、またはAWS Cloud Development Kit (CDK) を通じて定義されたアプリケーションの構築、テスト、デバッグをローカルで実行できます。

## AWS SAMの利点

- 設計したサーバレスアプリケーションをローカルのDockerコンテナー上で動作させ、テストできる。
- API Gateway等の周辺リソースも同時に構築できる。
- SAMで構築したリソースをCloudFormationを介してデプロイできる。
- DynamoDB Local等を併用することで、それらのリソース含めた動作確認ができる。
