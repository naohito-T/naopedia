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

