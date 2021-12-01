# lambda(ラムダ)

イベントの発生に応じてプログラムを実行する環境を提供するクラウドコンピューティングサービスである。

[AWSのLambdaを色々暴く](https://qiita.com/Keisuke69/items/9951a93fd711360a61c5)

## Lambdaを最低限ローカルで実行しテストする(簡単)

[参考URL](https://qiita.com/zaburo/items/d78a0a4462007e57d5d8)

## Lambda対応言語

LambdaはJava、Node.js、C#、Pythonのプログラミング言語に対応しているので、各種「機能」（プログラム）はこの言語で開発すれば良い。

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


## Lambdaでディレクトリを使用したい場合

[参考URL](https://cloud5.jp/lambda_tmp_directory/)

/tmpディレクトリ

Lambdaの公式ドキュメントに、/tmpディレクトリに対して以下の記述がある。

>各実行環境は、/tmp ディレクトリ内のディスク領域を 512 MB に提供します。ディレクトリのコンテンツは、実行環境が停止された際に維持され、複数の呼び出しに使用できる一時的なキャッシュを提供します。キャッシュに保存したデータが存在するかどうかを確認するための追加コードを追加できます。デプロイのサイズ制限の詳細については、「Lambda のクォータ」を参照してください。

512MBの一時領域(/tmp)が提供されている。そのためそちらを使用しファイルの出力と書き込みを行える。



Lambda上でAWS CLIを実行したいと思いました。 AWS CLIにはs3 syncコマンドのような、SDKには未実装の便利な機能があるためです。
Lambdaの実行環境にはAWS CLIはプリインストールされていないので、ひと工夫が必要になります。