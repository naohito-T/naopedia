# AWS Secrets Manager

[リファレンス](https://aws.amazon.com/jp/secrets-manager/)
[AWS Secrets Manager」をチュートリアル2種](https://dev.classmethod.jp/articles/secrets-manager-tutorials/)

## ざっくりとした特徴

- 各種アプリケーションやITリソースのアクセスに必要なシークレット情報を一元管理
- ユーザーはAWS Secrets Manager API経由でアクセスするため、各種シークレット情報をプレーンテキストで保持する必要がない
- RDS（MySQL、PostgreSQL）、Amazon Auroraに統合されており、シークレット情報の更新とデータベースパスワードの更新を自動化可能
- APIキーや、OAuthトークンなどのシークレットにも拡張可能
- IAMポリシーを利用して、シークレット情報へのアクセス制御が可能

## シークレットタイプ

暗号化キー`DefaultEncryptionKey` はAWSシークレットマネージャーが作成するデフォルト暗号化キーのため、費用はかからない。
もし、自分で作ったカスタムマスターキー（CMK）を利用するのであれば、別途KMSの料金が必要となります

## ローテーション

ローテーションとは、シークレットを定期的に更新するためのプロセスのことです。
シークレットを長期間変更しないと、シークレットを侵害される可能性が高くなる。
シークレットは30日ごとにローテーションすることをオススメします。

## AWSのParameter StoreとSecrets Manager、結局どちらを使えばいいのか？比較

[参考URL](https://qiita.com/tomoya_oka/items/a3dd44879eea0d1e3ef5)

## AWS Systems Manager (旧SSM) とは

AWS内リソースの構成／変更管理やアプリケーションパラメーターの集中管理など、さまざまな管理系機能が集合したサービスです。
このAWS Systems Manager内に「Session Manager」というサービスがあります。
>AWS Systems Managerの一機能として、パラメータストア機能が提供されており、
>パスワードのような秘密データや、
>その他の設定データを一元管理する機能が提供されています。
>AWS Systems Managerの一機能として、パラメータストア機能が提供されており、
>2018年初頭までは、
>AWSの機能を活用したアプリコードとID/パスワード情報の分離の有力な方法は、
>パラメータストア機能の利用でした。
