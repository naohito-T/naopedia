# lambda(ラムダ)

イベントの発生に応じてプログラムを実行する環境を提供するクラウドコンピューティングサービスである。

## Lambdaを最低限ローカルで実行しテストする(簡単)

[参考URL](https://qiita.com/zaburo/items/d78a0a4462007e57d5d8)

## Lambda対応言語

ちなみにLambdaはJava、Node.js、C#、Pythonのプログラミング言語に対応しているので、各種「機能」（プログラム）はこの言語で開発すればOK、ということのようです。
aaa

aws-sdkはLambdaサーバには既に入っており、node-modulesに本来含める必要はないのでnpm uninstall aws-sdkしてから再圧縮すると容量削減につながります。あまりファイルサイズが大きいとインライン編集できなくなるので注意しましょう。

## Lambda対応イベント

S3のイベント発生(ファイルアップロード)などをトリガーにデータ処理を行う
リアルタ

## Lambda実行例

>S3に画像ファイルがアップロードされたら、リサイズしたサムネイル画像を生成する、とかは分かりやすいですかね。

## 料金

、毎月100万リクエストまで無料なんです。くり返します。毎月100万リクエストまで無料です！

HTTPサーバとしてLambdaを実行させる場合はAPI Gatewayと連携する必要があります。 API Gatewayと連携するLambdaはAWSが用意しているサンプルを参考に、hello/main.goを以下のように実装します。


[Lambdaでgoを実装](https://techblog.kiramex.com/entry/2020/01/23/173128)


## 実行順序

Lambdaではexports.handler以下が実行されます。


## AWS Serverless Application Model (AWS SAM) とは

[参考URL](https://docs.aws.amazon.com/ja_jp/serverless-application-model/latest/developerguide/what-is-sam.html)


