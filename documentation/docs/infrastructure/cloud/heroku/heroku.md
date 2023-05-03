# Heroku(ヘロク)

[参考URL](https://blog.proglus.jp/4289/)

## heroku活用方法

Heroku は、インフラ構築やデプロイも気軽でコストも安く抑えられるので、事業のフェーズや要件によっては非常にいいサービスだと思われる。

## Herokuとは

HerokuはPass(Platform as a Service)の一種。
**Webアプリケーションをホスティングするサービス**
Paasにあたる

## Heroku経緯

2007年にアメリカでHeroku社が創業した時はRuby on Railsのアプリケーションに特化したホスティングサービスでしたが、現在ではJava、Node.js、Python、PHP等といった様々なプログラミング言語をサポートしています。

サポート

## Herokuのプロセス

Herokuには3つの処理を行うプロセスがあり、それぞれを**dyno(ダイノ)と呼ぶ**

web dyno ... HTTPのリクエストとレスポンスを処理します。
worker dyno ... バックグラウンド処理を行います。
one-off dyno ... 一時的な処理を行います。

## Heroku スタック

スタックとはHerokuが用意しているDockerイメージのようなもの。
このスタック上でアプリケーションが動いている。

## Herokuの料金

基本的にはHerokuは1サービスであれば無料。
無料での利用の場合、レンタルするサーバの性能などの問題でWebサービスの挙動が遅くなる可能性がある。