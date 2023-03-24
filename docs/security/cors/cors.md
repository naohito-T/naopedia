## CORS(Cross-Origin Resource Sharing) : クロスオリジンソースシェアリング
[リファレンス](https://develwoper.mozilla.org/ja/docs/Glossary/CORS)  
[参考URL](https://qiita.com/ryosuketter/items/a60a2bc0220a5cbff17e)  
[仕組みが書いてある](https://www.twilio.com/blog/add-cors-support-express-typescript-api-jp)

Same-Origin Policyに弾かれず、異なるドメイン間でリソースを共有する仕組み  
2014年1月W3C勧告になり`JSONP`から替わる方法として徐々に普及してきている。  
オリジン間リソース共有（CORS）とは、最新ブラウザに装備されている**セキュリティプロトコル。**
HTTPリクエストを開始したオリジンに応じて、異なるオリジンで共有するリソースの許可、制限を行う。
>フロントエンドの JavaScript コードがアクセスすることをブロックするかどうかを決めるものです

### CORSがなかった時代

CORSがなかった時代は**同一オリジンのみ通信ができた**

## CORS動作

昨今のブラウザでは、フロントエンドJavaScriptから違うドメインへのアクセスに対して、Cross-Origin Resource Sharing（以下、CORSといいます）がサーバ側で許可されている場合を除き、セキュリティ上の問題からアクセスをしない仕様となっています。  
そして、**ブラウザはCORSを検出した場合、実際のメソッドを投げる前に、OPTIONSメソッドによる検査を実行するような仕様**になっています。

リクエストを送る際に一定の条件をクリアしていない場合は、ブラウザがまずプリフライト・リクエスト (preflight request) と呼ばれるリクエストを送信し、そのレスポンスにより安全性に問題ないことが確認された後、本来のリクエストが送信されるという仕様になっています。

## CORSでのクッキー

CORSでは**デフォルトでクッキーの送受信**が行われない。
また、受信できるレスポンスヘッダーも最小限に絞られている。

```
https://www.twilio.com
  ^       ^
  |       |
scheme hostname

http://localhost:5000
  ^       ^       ^
  |       |       |
scheme hostname  port
```

## CORSサーバー側実装
[expressでの実装](https://s8a.jp/node-js-express-http-options#%E3%81%BE%E3%81%A8%E3%82%81)

APIサーバの実装には以下が必要となる。

- OPTIONSメソッドの実装
- Cross-Origin Resource Sharingを有効にする（HTTPレスポンスヘッダーにAccess-Control-Allow-Origin等の実装）
