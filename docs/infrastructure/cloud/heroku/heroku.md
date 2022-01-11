# Heroku(ヘロク)

[参考URL](https://blog.proglus.jp/4289/)

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