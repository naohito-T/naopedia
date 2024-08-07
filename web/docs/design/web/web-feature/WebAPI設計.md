# API設計

[Clean ArchitectureでAPI Serverを構築してみる](https://qiita.com/hirotakan/items/698c1f5773a3cca6193e)

## ユビキタス

ユーザが使用する側(クライアント)
Webアプリケーションと呼ばれる

ユーザが使用するアプリからアクセスされるサーバ
Webサービスと呼ばれる
外部Webサービスもある

api設計はurlが一緒でも良い
最終的に分けるのはhttpメソッド分割ができていれば良い。
つまりこれは良いということ

GET /console/admin/cast/1
DELETE /console/admin/cast/1

かなり散見されていると。ドキュメントが書きづらい。

## api作成順序

まずはenv, docker, lefthook,などの環境準備
次にcorsの設定

## timezoneについて

Railsを例にすると
アプリのタイムゾーンとは別に、データベースの読み書きに使用するタイムゾーンがある。
※設計理想として、アプリのタイムゾーンはJST、DBはUTCにするのが理想

- ユーザからの入力について
一般的なユーザの方が普段お使いのwebサービスのフォームや書類の記入欄にAsia/TokyoなどというタイムゾーンやUTC+9などという時差情報を入力することはほぼない。
したがって、タイムゾーンや時差情報のない日時(LocalDateTime)の入力を受けた際には、**その日時を空気を読んで解釈する必要がある**
そのための手段として、**ユーザーが想定する地域のタイムゾーン(例: "Asia/Tokyo")にしたがって日時を解釈するという方法が一般的。**

[設計参考例](https://www.m3tech.blog/entry/timezone-handling)

## Webサービスについて

>Vue.jsなどで開発するWebアプリケーションの多くは、外部のまたは自社（自身）で作成したWebサービスを通じてリソースを取得したり、更新したりします。
>Webサービスについて簡単に説明しておくと、対システム向けのシステムのことです。少しわかりにくいかもしれませんが、Webサービスは他のシステムからのリクエストを受け取り、その内容に応じた処理を行い、結果を返します。
>Webサービスには、SOAPベース、RESTベースなど異なるモデルがありますが、設計が他よりも単純なRESTベースのものが多いです。

## REST(REpresentational State Transfe)

RESTの世界ではネットワーク上のコンテンツ(リソース)を一意なURLで表すのが基本
各リソース(URL)に対してGET, POST, PUT, DELETEでリクエストを送信しレスポンスをXMLやjsonなどで受け取る形式(レスポンスのフォーマット形式は指定されていない)
RESTはURLがリソースに対応づけられるためURLは名詞的になることが多い

>RESTはREpresentational State Transferの略で、先ほど説明したようにWebサービスのモデルの１つです。今回の本題である外部リソースの操作も、RESTベースのWebサービスから行うことを想定しています。

- データについて

> RESTによって返されるデータ形式は、XMLかjsonがほとんどです

- ここでcorsが絡んでくる

## CORS (Cross-Origin Resource Sharing)

何も設定をしていない外部リソースアクセスはデータ取得ができない。

CORSとは別のオリジンからのリソースを制限するための仕組み。

- CORSの対象となるリクエスト

>次にCORSの対象となるリクエストについて説明します。すべてのリクエストがCORSによりブロックされるわけではなく、特定のリクエストでのみブロックされます。今回扱っているAjaxは、XMLHttpRequestという仕組みを使っており、これがCORSの対象となっています。

- CORSを回避するには

1. 1つはWebサービス側で特定のWebアプリケーションからのアクセスを許可する方法

リクエストを受け付けるWebサービス側で特定のWebアプリケーションから

2. プロキシを使用する方法

アクセスするサーバと同一のオリジンとしてhttp configを設定する

- オリジンとは

## SOAP(SimpleObject Access Protocol)

リクエストおよびレスポンスともにXMLフォーマットのデータで行う形式
SOAPのURLは操作と対応づけられるためURLの命名が動詞的になることが多い

## RESTとSOAPの使い分け

>RESTでは不特定多数を対象にした、入力パラメータが少ない情報配信や検索サービス等での利用に向いている。
>SOAPでは複雑な入力を必要としたり、入出力に対してチェックを必要とするようなサービス等での利用に向いている。

## WebAPI 設計のベストプラクティス

[以下の記事はこれを参考にして作成する](https://qiita.com/mserizawa/items/b833e407d89abd21ee72)

## api設計のレイヤー層について詳しく記載がある。

[参考URL](https://dev.classmethod.jp/articles/what-does-amazon-api-gateway-do/)
