# HTTP(HyperText Transfer Protocol)

[HTTP入門](https://www.tohoho-web.com/ex/http.htm)

## httpとは

HTTP(HyperText Transfer Protocol)は**サーバとクライアント(ブラウザ)の間でウェブページを送受信するためのプロトコル。**

HTTP自体はステートレスなプロトコル
リクエスト (GET) => レスポンス (200 OK ...) で手続きが完結。
SMTPのように複数の 手続き を踏む必要はなく、その時の状態も保持していない。

---

## http上で認証を行う場合

[参考URL](https://qiita.com/h_tyokinuhata/items/ab8e0337085997be04b1)

セッションによる認証
リクエストボディにトークンを含める認証
独自ヘッダにトークンを含める認証
Authorizationヘッダを用いた認証(Basic, Digest, Bearer)
JWT認証

などがある。

## Bearer認証 : bearerは担い手や使いといった意味を持つ

Bearer認証は、トークンを利用した認証・認可に利用されることを想定しており、OAuth 2.0の仕様の一部として定義されているがその仕様内でHTTPでも使用しても良いと記述されている。

**HTTPのAuthorizationヘッダにスキームとして指定でき, Authorization: Bearer <token> のようにして指定する.**
トークンの形式はtoken68の形式で指定することが定められている。

## Authorization ヘッダ

Authorizationヘッダに指定できるスキームには, BasicやDigest, Bearer等が存在し, これらのスキームはIANAによって管理されている.

## リクエストとレスポンスの流れ

まずクライアントから`Authorization: Bearer <token>`を含めたリクエストが投げられる。
それを受け取ったサーバは`WWW-Authenticate: Bearer realm="XXXX"`形式, 又は`WWW-Authenticate: Bearer error="XXXX"`形式のヘッダを含めたレスポンスを返す.

成功パターン
特に返したいパラメータが無い場合は realm を空にして返す.
`WWW-Authenticate: Bearer realm=""`

失敗パターン
リクエストにAuthorizationヘッダが含まれていないケース(401 Unauthorized)
`WWW-Authenticate: Bearer realm="token_required"`

リクエストパラメータが不正なケース(400 Bad Request)
`WWW-Authenticate: Bearer error="invalid_request"`

トークンが失効, 破損しているケース(401 Unauthorized)
`WWW-Authenticate: Bearer error="invalid_token"`

トークンのスコープが不十分なケース(403 Forbidden)
`WWW-Authenticate: Bearer error="insufficient_scope"`

## トークン保存場所

クライアント側はlocalStorageかsessionStorage, サーバ側はDBに保存することになる


---

## httpとセッション

HTTPは基本的に1つのリクエストと1つのレスポンスだけで完結する。
何度リクエストを送っても前回と同じ人のリクエストだなと認識されない。
同じユーザに対して、リクエストのたびにそのユーザ用のレスポンスを返すといった仕組みを(セッション)を作るにはサーバ側で工夫が必要になる。

## URLの説明

スキーム://ホスト:Port/path

## Origin(オリジン)

ウェブコンテンツのオリジンOriginは、ウェブコンテンツにアクセスするために使われる URL のスキーム (プロトコル)、 ホスト (ドメイン)、 ポート によって定義される。
**スキーム、ホスト、ポートがすべて一致した場合のみ、二つのオブジェクトは同じオリジンであると言える。**
操作によっては同じオリジンのコンテンツに限定されており、**この制約は CORS を使用して緩和することができる。**

- 同一オリジンの例

```sh
# スキーム (http) およびホスト (example.com) が同じなので同一オリジン
http://example.com/app1/index.html
http://example.com/app2/index.html

```

- 異なるオリジンの例

```sh
# スキームが異なる
http://example.com/app1
https://example.com/app2

# ホストが異なる
http://example.com
http://www.example.com
http://myapp.example.com

# ポートが異なる
http://example.com
http://example.com:8080
```


## クエリパラメータ

?以降のフォーマットに関してどういう値設計にするのかのルールは特に明言されていない遠事(RFC)

>しかし,query構成要素はしばしば key=valueの対の形式で識別するための情報を運ぶために使用され、そこで頻繁に使用された値は別のURIの参照のため時にはそれあらの文字をパーセントエンコーディングすることを避ける方がユーザビリティのためには良い

とあるように一般論として key=valueの形式であるぐらいしかRFC上では語られていない。

## クエリパラメータを配列で渡したいとき

`https://stg.www.yumenographia.com/tickets/?dates=2021-10-07,2021-10-10,2021-10-11,2021-10-12`

?の後に,(カンマ)区切りで渡す。それをserver側で配列に変換するのが一つのやり方。

## クエリパラメータ変換

numberなどで送ってもどうやらstringに変換されるっぽい。

---

## リクエストヘッダ

- Accept(要求)
ブラウザが受信可能なデータ形式(MIMEタイプ)をサーバに伝える。
**アスタリスクは全てを意味する。**


- Accept-Encoding
[参考URL](https://weblabo.oscasierra.net/http-header-request-accept-encoding/)

>HTTPリクエストヘッダ Accept-Encoding を理解するためには、まずはHTTP通信データの圧縮について理解する必要があります。 皆さんが普段目にしているホームページは、HTMLなどのテキストで作られていることは本ページを見られている方ならご存知でしょう。 またスマートフォンアプリなども JSON や XML などのテキスト形式でサーバーとデータの受け渡しをしています。

>サーバーとの通信データ量を減らしたいと考えた場合、コンテンツの内容を変えずにそれを実現するには、データを圧縮する方法が考えられます。 テキストはバイナリなどに比べて圧縮しやすく、HTML, スタイルシート(CSS), JavaScript, JSON, XML などのWEBで利用されているテキストを圧縮して送受信すれば、通信データ量を減らすことができるというわけです。
>しかし、通信データを圧縮する場合に考慮すべき点もあります。 それはクライアントとサーバーが、共通の圧縮アルゴリズムをサポートしている必要がある点です。 サーバーが一方的に圧縮されたコンテンツを送りつけても、クライアントが解凍できないと意味がありません。
>またデメリットとしては、データ送信前とデータ受信後に圧縮・解凍の処理が必要になるため、平文でデータを送受信するよりも処理負荷が高まることがあげられます。

**ポイント**
1. コンテンツを圧縮して送信すれば、ネットワークを流れるデータ量を減らすことができる
2. 通信データを圧縮するには、クライアントとサーバが共通した圧縮アルゴリズムをサポートする必要がある。
3. 通信データを圧縮した場合、データ送信前とデータ受信後に圧縮・解答の処理を行うため処理負荷は高まる。

**目的**
Accept-Encoding ヘッダは、HTTPクライアントがサーバーにHTTPリクエストを送信する際に付与するヘッダ項目です。 Accept-Encoding ヘッダの目的は、クライアントがサポートしている圧縮方式をサーバーに教えることです。 サーバーは送られてきた Accept-Encoding ヘッダの値を見て、クライアントに合う圧縮アルゴリズムでコンテンツを圧縮して返却してあげれば良いというわけです。

- Allow(要求/応答)
要求URLで示すリソースに対して使用可能なメソッドの一覧を示す。下記の例ではリソースに対してGET, HEAD, PUTメソッドを使用可能であることを示す。

`Allow: GET, HEAD, PUT`

- Authorization(要求)
認証が必要なリソースに対して認証情報を伝えます。例えば、BASIC認証の場合は、Basic の文字と、ユーザ名とパスワードをコロン（:）で連結したものを BASE64 形式にエンコードしたものを転送する。

`Authorization: Basic dGFuYWthOmhpbWl0c3U=`

---

## ステートフルとステートレスの比較

[参考URL](https://qiita.com/wind-up-bird/items/b210e294ecb147d67e2b)

前提
セッションの状態
一連のインタラクティブな操作(session)における各状態(state)のこと

## ステートフル

サーバがクライアントのセッションの状態を保持しているという制約のこと
特徴：セッションの状態によってリクエストに対するレスポンスが変わる。
例：FTP, SMTP

## ステートレス

サーバがクライアントのセッションの状態を保持しないという制約のこと
特徴：リクエストに対するレスポンスが変わらない。
例：HTTP

## Bearer認証について


## Webhookとは

[参考URL](https://qiita.com/soarflat/items/ed970f6dc59b2ab76169)

アプリケーションの更新情報を他のアプリケーションへリアルタイム提供する仕組みや概念のこと

**通知する、Webhookを送るなどの言葉はPOSTリクエストのことを指している。**

## HTTP レスポンスステータスコード

---

## 400系

400 Bad Request
何らかのクライアント側のエラーであるとわかったために、サーバがそのリクエストを処理しないことを表明
例えば、リクエストの構文が正しくない、リクエストメッセージのフレーミングが無効、リクエスト経路に偽りがあるなど
※サーバには届いている


