# HTTP header

headerについてまとめる  
リクエストヘッダーとレスポンスヘッダーがある

##　リクエスト

## csp

クロスサイト・スクリプティング攻撃やその他のクロスサイト・インジェクションを防止するためにContent-Security-Policyヘッダーを設定します。

## X-Powered-By
[参考URL](https://wiki.suikawiki.org/n/X-Powered-By%3A#gsc.tab=0)

いくつかのWebアプリケーションフレームワークで、自身の名称やバージョン番号を記述するために使っているHTTPヘッダー  
※セキュリティのため削除するのが好ましい。

## XMLHttpRequest.withCredentials
[リファレンス](https://developer.mozilla.org/ja/docs/Web/API/XMLHttpRequest/withCredentials)

サイト間の`Access-Control`リクエストがCookie・認証ヘッダー・TLSクライアント証明書などの資格情報を使用して行うべきかどうかを示す。  
異なるドメインからの`XMLHttpRequest`のレスポンスは、リクエストを行う前にwithCredentialsをtrueに設定しない限り、自身のドメインのCookie値を設定することができません。


## レスポンス


### Strict-Transport-Security レスポンスヘッダー
[リファレンス](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Strict-Transport-Security)

WebサイトがブラウザにHTTPの代わりにHTTPSを用いて通信を行うように指示するためのもの。