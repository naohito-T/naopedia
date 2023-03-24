# Express

Express関連でためになったものを記す。

## Express 型拡張
[コード](https://github.com/tomnil/typedexpress/blob/master/src/index.ts)

## express ライフサイクル

- app: Applicationインスタンス
- req: Requestインスタンス
- res: Responseインスタンス
- routes: ApplicationインスタンスによるURLルート定義にてマッピングされたMiddleware

### app, req, res のライフサイクルについて

- app
ExpressによるWebアプリケーションの根幹となるappインスタンスは、インスタンス作成時から各種セットアップ、サーバListenを行い始めた後も永続し、Listenを終了（Expressアプリケーションを終了）させるまでは残り続ける。

- req,res
一方、Middlewareの引数として用いられるreq, resの両インスタンスは、**クライアントからのリクエストを受信し処理を開始した時点で生成、初期化され、Middleware による遷移処理が終了したあとに消滅します。**

以上のことから、appインスタンスはWebアプリケーション全体に関わるグローバル／汎用的な情報を保持すること、req, res インスタンスはクライアント固有の情報を保持する存在である捉えたほうがよさそうです。
従って app インスタンスは Listen 時点ではもう情報が完成しており、req, res インスタンスはリクエスト受信時から応答結果を返すまで如何様にも情報操作を行うことができる対象であると言えます。

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