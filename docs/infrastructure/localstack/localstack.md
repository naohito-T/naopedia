# localStack
[参考URL(詳しく書いてある)](https://qiita.com/yasomaru/items/fa708a1f21a79e637868)
今度これをやってみる
[参考URL](https://pecorino.tokyo/2020/10/10/localstack/)
[このブログはいい。](https://tech.unifa-e.com/entry/2020/12/16/080000)

## LocalStackのdocker-composeと起動スクリプトさらす
[参考](https://www.tomray.dev/nestjs-docker-compose-postgres#apple-m1-chip-configs)

## v0.11.0以降

混同しやすいためしっかり覚えておく。

- サービス提供ポートは？
v0.11.0以前は、サービスごとにポートが指定されていたがv0.11.0以降は4566番ポートのみを介して提供。

- UIは？
有料版のみ8080番が利用可能。

## 起動確認

`http://localhost:4566/health`にアクセスするとサービスが立ち上がったかどうか確認可能。

## LocalStack心構え

サービスを起動した後、awsコマンドで作成した際に作成の確認方法がUI（有料版）のため`aws`コマンドで確認するしかない。

## LocalStackでLambdaを実行したのであれば

たとえばひとつのファイルにまとめられる言語（Go,TypeScripts）などでbundleしたやつをzip化してlocalStack上のLambdaに送信すれば実行はできる。

## コンテナー内にあるコマンド

`awslocal`というコマンドがあるとのこと。
