# localStack
[参考URL(詳しく書いてある)](https://qiita.com/yasomaru/items/fa708a1f21a79e637868)  
今度これをやってみる  
[参考URL](https://pecorino.tokyo/2020/10/10/localstack/)  
[このブログはいい。](https://tech.unifa-e.com/entry/2020/12/16/080000)  
[Docker Compose を使用した NestJS、Redis、Postgres のローカル開発](https://www.tomray.dev/nestjs-docker-compose-postgres#apple-m1-chip-configs)

## v0.11.0以降

混同しやすいためしっかり覚えておく。

- サービス提供ポートは？
v0.11.0以前は、サービスごとにポートが指定されていたがv0.11.0以降は4566番ポートのみを介して提供。

- UIは？
有料版のみ8080番が利用可能。

- 無料版で使えないサービスは？
EC2とRDS

- `awslocal`コマンドとは？
awsコマンドのラッパーコマンド  
エンドポイント指定などを省略できる。
同じコマンドのためaws-cliを見ればいい。


## 起動確認

`http://localhost:4566/health`にアクセスするとサービスが立ち上がったかどうか確認可能。

## LocalStack心構え

サービスを起動した後、awsコマンドで作成した際に作成の確認方法がUI（有料版）のため`aws`コマンドで確認するしかない。

## LocalStackでLambdaを実行したのであれば

たとえばひとつのファイルにまとめられる言語（Go,TypeScripts）などでbundleしたやつをzip化してlocalStack上のLambdaに送信すれば実行はできる。

## コンテナー内にあるコマンド

`awslocal`というコマンドがあるとのこと。

## LocalStack上にServerlessでAPI Gateway、Lambda、DynamoDBを構築してみる

[LocalStack上にServerlessでAPI Gateway、Lambda、DynamoDBを構築してみる](https://zenn.dev/s_ryuuki/articles/5bbbeea5a88c0c)