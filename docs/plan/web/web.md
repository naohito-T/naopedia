# Web API

Web APIを設計する際に様々なものを作成するかと思うがそれを記載する。

---

## ユーザ認証の基本フロー

[参考URL](https://applis.io/posts/how-to-authenticate-user)

### 基本的なフロー

1. クライアントからサーバに認証情報をおくる
2. サーバー上で認証情報を検証する
3. 認証情報が正しければ、クライアントにアクセストークンを送る(+必要に応じてセッションに記録する)

### ユーザ認証を設計する上で決めるべきこと

| 順番  | 項目 | 選択肢 |
| --- | --- | --- |
| 1 |  認証方法をどうするか   |  パスワード認証 or OpenID Connect |
| 2 |  アクセストークンをどう管理するか   | JWT |
| 3 |  アクセストークンをどうStateに保持するか | Authorizationヘッダ, Cookieヘッダ |
| 4 |  アクセストークンをどう保持するか   | OS標準のストア?, メモリ, Cookie, localStorage |

## 1について

まず、ユーザー認証の方法には、大きく次の二つがある。

|     | 認証方法  | 概要 |
| --- | --- | --- |
| 認証方法1  | パスワード認証 | IDとパスワードをサーバに送る |
| 認証方法2  | OpenID Connect | 外部のプロバイダ上で認証しアクセストークンをサーバに送る |

- 認証方法2について
OpenID Connectは、OAuth認証と聞くとなじみがある。
たとえばGoogleやTwitterなどのアカウントによる認証。
ただ、『OAuth認証』という言葉には語弊がある。

### 認証方法1について

大きく分けて2つある

1. Basic認証やDigest認証
2. 独自の認証機構

※2の独自認証機構は例として、フォームからIDとパスワードをサーバに送って、ユーザ基盤をもとに認証を行う一般的なやり方。
※この認証方法はパスワードを平文で送ることになるため、仮にSSLで通信を暗号化していたとしてもログにかかれて流出につながる

### 認証方法2について

OpenID ConnectはProtocolディレクトリに記載している。

## 2について




---




## JWT(JSON Web Token)

2つのパーティー間で情報を安全に送信するための方法
実態は、**JSONオブジェクトをエンコードした文字列でこの文字列をトークンと呼ぶ。**

3つにわかれる
JWTが発行したトークンは、ドットによって3つにわかれている
`<ヘッダ>.<ペイロード>.<署名>`

- ヘッダ
ここにはトークンのタイプや、使用されている署名アルゴリズムの情報を持っています。

```js
// エンコード => デコード
eyJhbGciOiJIUzI1NiJ9.
=> { "alg": "HS256", "typ": "JWT" }
```

- ペイロード
2番目の文字列をペイロードと呼び、任意の情報を指定することができる。
**基本的には、このペイロードをカスタマイズしてユーザー認証に必要な情報を埋め込む**

```js
// エンコード => デコード
eyJleHAiOjE2MDA1OTY0MzEsInN1YiI6MSwibmFtZSI6InVzZXIwIn0.
=> {"exp"=>1600596431, "sub"=>1, "name"=>"user0"}
```

expやsubなどのそれぞれの値をクレームと呼ぶ
**デフォルトで指定されている値を予約クレーム、使用者が任意に指定した値をパブリッククレームと呼ぶ**

- 署名
3番目の文字列には署名情報がある。
**この署名は、トークンが変更されていないか確認するために使用される。**

```js
// エンコード => デコード
lXcwASyLX5GEsMvPYDVhe0ovJj631fUiC0q2ojK-yK0
=> HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  your-256-bit-secret
)
```

## sub(Subject)クレーム

JWTの主語となる主体の識別子で予約クレームの一つ。
直訳すると「件名・主題」で、一般的にはオブジェクトを識別する一意性の値を指定します。
ユーザーテーブルで言うと、ユーザーIDのことです。
このクレームは任意で、{ user_id: 1 }と言ったペイロードでも問題ありません。
ただし、他アプリケーションとの衝突を避けるために予約クレームを使用することが推奨されています。

- 鍵の指定
トークンの発行には**署名時に使用する鍵が必要。**
この鍵が漏れると、誰でもトークンの発行と検証ができてしまうため非公開であるRailsのシークレットキーを使用する(Railsの場合)

発行手順

```sh
irb(main):001:0> payload = { sub: 1}
irb(main):002:0> secret_key = Rails.application.credentials.secret_key_base
irb(main):003:0> token = JWT.encode(payload, secret_key) # 暗号化し発行
irb(main):004:0> token
=> "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOjF9.0HBLImIKESioXrusu-yz4g53qpxrAahNyXRfgTQ5eJ0"
irb(main):005:0> JWT.decode(token, secret_key) # JWTをデコードする
=> [{"sub"=>1}, {"alg"=>"HS256"}]
```

## JWTのいいところ

1. JWTの最大のメリットは情報が改ざんできない
2. ユーザテーブルにトークンを保有するカラムを作成しなくてよくなる
この仕組みを認証に使えば、ユーザーテーブルにトークンを一時的に保有するカラムを作成しなくて良くなる。
3. トークン発行時に電子署名を付与することができるため、署名をした鍵を持つものしかトークンを検証することができない

>署名時に付けた鍵と同じ鍵を使って検証する署名アルゴリズムを「HS256」、
>秘密鍵と公開鍵のペアで検証する署名アルゴリズムを「RS256」

## JWTの注意点

トークンはエンコードされているだけで暗号化はされていない。
トークンの中身は以下で見れてしまう

[jwt.io](https://jwt.io/introduction/)

漏れたらまずい個人情報（メールアドレスなど）はトークンに埋め込まないようにしましょう。

## JWTの保存先

JWTの保存先には、**ローカルストレージがよく挙げられるがJavaScriptで簡単にアクセスできてしまう。**
認証に使用するJWTはログインメールアドレスとパスワードと同じ意味を持つため、外部のJavaScriptからアクセスできない場所に保管することが望ましい。

**そのためJWTをCookieｎ保存する。**

## Cookie

**Cookiehaブラウザがパソコンのハードディスクに保存する小さなデータ**
Cookieとは、クライアント（ブラウザ）に保存される簡易なテキストファイルのこと。
サーバー（Rails）がクライアントに、一時的に情報を記録させるときに使用します。

httponlyオプション
httponlyは、HTTP通信でのみアクセスできるCookieを生成するためのオプションです。

このオプションを付けると、JavaScriptからのアクセスを完全に遮断することができ、サーバーサイドのRailsでしかアクセスできなくなります。
これにより、外部JavaScriptからのCookie盗聴を防ぎます。

- Cookieでも万全ではないことを理解しておく
Cookieへの保存は、外部からの攻撃を完全に遮断できるわけではありません。

JavaScriptで参照できるローカルストレージよりはマシなだけであって、Cookieのhttponlyオプションは、あくまで最低限のセキュリティだとお考えください。

**Cookieの法定タイムゾーンはGMT（グリニッジ標準時）と決められており、expiresはGMTで保存されます。**
**また、有効期限を判断するために使用されるタイムゾーンもGMTです。**
**GMTは日本時間マイナス9時間で、UTC（世界標準時）と一致します。**

## クロスオリジン通信でのCookie共有設定

クロスオリジン通信でのCookie共有は双方に設定が必要。

**credentials（クレデンシャル）**
リクエストヘッダーのwithCredentials（ウィズ クレデンシャル）フラグをtrueにする。
withCredentialsは、クロスオリジンのクライアント資格情報を使用して、リクエストを行うことを許容するか否かを設定するフラグです。（デフォルトはfalse)

trueにすることで、
クロスオリジンリクエストの際に、Cookieを送信することができ、
また、クロスオリジンレスポンスのCookieを受け取ることができます。

## Session セッション

セッションはCookieを使って実現するのが一般的



---