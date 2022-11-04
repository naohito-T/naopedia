# WebAPI

webでのapiをまとめる
- REST API
- GraphQL
- WebSocket API
[GraphQLとREST比較](https://ichyaku.com/shopify-graphql-rest/#:~:text=GraphQL%20API%E3%81%A7%E3%81%AF%E3%80%81Schema%E3%81%A7,%E6%B8%88%E3%81%BE%E3%81%9B%E3%82%8B%E3%81%93%E3%81%A8%E3%81%8C%E3%81%A7%E3%81%8D%E3%81%BE%E3%81%99%E3%80%82)


## GraphQL

一度のアクセスで関連情報をすべて取得する。
所感
これTypeORMのRepositoryパターンとめちゃくちゃ合うな。
db取得をeagerにして一度で取得して一度で返す。
これはかなり効率がいい。

## REST API

たびたび必要な情報を取得するために何度から別のapiを叩く必要がある。



## 汎用的なapi処理に必要な処理


### バリデーション

外部から送られてくるデータを精査&整形する。

### Sanitization(サニタイゼーション) 和訳:消毒

整形する部分。
ノイズがないことを確認する。
理解として、空白のトリミングやHTMLエスケープなどのサニタイズを適用。
※重要
サニタイズによりリクエストが変更されることに注意。
これは、req.body.textが値とともに送信された場合`Hello world :>)`サニタイズ後にその値が`Hello world :&gt;`になること。