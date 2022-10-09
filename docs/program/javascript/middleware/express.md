# express

http serverでnodeで動作する

## session
[参考URL](https://kazuhira-r.hatenablog.com/entry/2021/12/29/023347)

Expressには、以下の2つのセッションモジュールがある

- cookie-session
cookie-sessionはCookieにセッションデータを保存するミドルウェア。

- express-session
express-sessionは**CookieにセッションIDのみを保存**して、セッションデータは別のストレージに保存するミドルウェア。
デフォルトのストレージはインメモリです。こちらはメモリーリークが発生する可能性が高く、本番環境での
利用を意図して設計されたものではないことに注意が必要そうです。
ストレージ（セッションストア）は、他のものに変更することができます。
セッションストアに`dynamoDB`や`redis`を使用できる。

---

## 実稼働環境におけるベスト・プラクティス: セキュリティー
[参考URL](https://expressjs.com/ja/advanced/best-practice-security.html)

### TSLを使用する

アプリケーションが機密データを処理または送信する場合は`Transport Layer Security（TLS）`を使用して、接続とデータを保護する。

