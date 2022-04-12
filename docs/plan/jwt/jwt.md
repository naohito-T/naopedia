# JWT(JSON Web Token) : ジョット

[参考URL](https://techblog.yahoo.co.jp/advent-calendar-2017/jwt/)

## JWTとは

属性情報(Claim: クレ-ム)をJSONデータ構造で表現したトークンの仕様

## 特徴

署名・暗号化でき、URL-safeであることが挙げられる

## JWT歴史

JWTでは
**署名付きデータの場合はJWS**
**暗号化する場合はJWE**
の仕様に基づき、JWTが利用されますが、**現状使われている多くのJWTが署名付きのものである**

---

## JWT構造

<ヘッダー>.<ペイロード>.<署名>

### ヘッダー

ヘッダーはJWTの署名検証を行うために必要な情報を格納するためのパートとなっている
文字列の形式としては、キー名と値のペアで表現されたJSONをBase64urlエンコードした文字列となる

Base64エンコードの場合は"+", "/", "="が含まれるが、**JWTはURIのクエリパラメーターなどに使用されることを想定しているため**
URL-safeに表現するためにBase64urlエンコードがされている。

```jsonc
// JWTをデコードする
// このヘッダーから署名アルゴリズムでJWTの検証を行う
{
  "typ": "JWT",
  "alg": "HS256"
}
```

### ペイロード

payloadに含める値をクレームと言う。
ペイロードはやり取りに必要な属性情報(Claim: クレーム)
ペイロードの内容はアプリケーションによっては異なるため、必須とされるものは存在しませんが、相互運用性のある属性情報については予約済みパラメーターとして提供されています。
ヘッダーと同様に、JSONをBase64urlエンコードした文字列なので、デコードが容易にできます。

```jsonc
{
  "admin": true,
  "name": "John Doe",
  "sub": "1234567890"
}
```

### 署名

署名パートは、エンコード済みヘッダー、ピリオド（"."）、エンコード済みペイロードを連結したものを入力値として"alg"の署名アルゴリズムで署名し、Base64urlエンコードすることにより作成されます。

`TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ`

↑の文字列を**ヘッダーで指定されたアルゴリズムで署名検証**することにより ID Tokenの正当性を評価できる。

----

## JWTの保存先

ローカルストレージはJSで簡単にアクセスできるためやめた方がいい。
他の部分

Cookieも検討に入るが、ローカルストレージよりはマシなだけ


---

## サーバ側のJWT取得方法

1. リクエストのヘッダーから取得する方法
2. クッキーに保存したトークンを取得するパターン

### 1について (リクエストヘッダー)

主に一時的に発行したトークンを取得する際に使用する
セキュリティを考慮してトークンの有効期限を短めに設定する必要がある

**一時的に発行するトークンを使用する場面**
- 会員登録時のメールアドレス認証時
- パスワードリセット時
- メールアドレス変更時

フロントからリクエストヘッダーに埋め込む

```js
export default ({ $axios }) => {
  $axios.onRequest((config) => {
    config.headers.common.Authorization = `Bearer ${<accessToken>}`
  })
}
```

## 2について(Cookie)

![cookieについて](image/jwt_cookie.png)
