# Express

Express関連でためになったものを記す。

## Express 型拡張
[コード](https://github.com/tomnil/typedexpress/blob/master/src/index.ts)

## session
[参考URL](https://kazuhira-r.hatenablog.com/entry/2021/12/29/023347)

Expressには、以下の2つのセッションモジュールがある

- cookie-session
cookie-sessionはCookieにセッションデータを保存するミドルウェア。

- express-session
express-sessionは**CookieにセッションIDのみを保存**して、セッションデータは別のストレージに保存するミドルウェア。  
デフォルトのストレージはインメモリ（メモリ上での管理になるためnodeが落ちるとセッションデータが消えることになりセッションの永続化ができなくなる）  
こちらはメモリーリークが発生する可能性高く、本番環境での利用を意図して設計されたものではないことに注意が必要。

ストレージ（セッションストア）は、他のものに変更することが可能。  
セッションストアに`dynamoDB`や`redis`を使用できる。

---

## 実稼働環境におけるベスト・プラクティス: セキュリティー
[参考URL](https://expressjs.com/ja/advanced/best-practice-security.html)

### TSLを使用する

アプリケーションが機密データを処理または送信する場合は`Transport Layer Security（TLS）`を使用して、接続とデータを保護する。

## app.use
[参考URL](https://expressjs.com/ja/guide/using-middleware.html)

## expressでライブラリを使わずBasic認証を簡単に導入する
[参考URL](https://qiita.com/s2mr/items/f795b5202286085543a4)