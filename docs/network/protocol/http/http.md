# HTTP(HyperText Transfer Protocol)

[HTTP入門](https://www.tohoho-web.com/ex/http.htm)
[冪等性について](https://qiita.com/suin/items/316cb8aaf8dfcf11abae)

## httpとは

HTTP(HyperText Transfer Protocol)は**サーバとクライアント(ブラウザ)の間でウェブページを送受信するためのプロトコル**

HTTP自体は**ステートレス(状態を保持せず一回で完結すること)**なプロトコル
リクエスト (GET) => レスポンス (200 OK ...) で手続きが完結。
SMTPのように複数の手続きを踏む必要はなく、その時の状態も保持していない。

---

## HTTP 歴史

現在最新のversionは1.1
1.1になる前には0.9と1.0の2つのバージョンが存在していた。
また1.1の後継もある。
※0.9に関しては仕様書は存在しない。Berners-LeeがWebを発明していたときのプロトコルが呼ばれている。

0.9 : headerがなかった

1.0 : IETFが標準化された最初のバージョン

1.1 : HTTPの完成
→チャンク転送・Acceptヘッダーによるコンテントネゴシエーション・複雑なキャッシュコントロール、持続的接続などの機能。


1.1以降も議論が続けれているが、HTTPそのものの価値を、RESTアーキテクチャスタイルに見出した結果、HTTP1.1を有効に活用していこう。。というのが現代的な開発スタイルとなっている。

---

## HTTP 仕組み

BASEとなっているのはTCP/IP
HTTP内でのクライアント

>今回POSTメソッドについて言及しましたが、HTTPプロトコル（rfc2616）では、メッセージボディをセットできるメソッドについては特に言及していないため、POST以外のメソッド（たとえばGETメソッド）でもメッセージボディをセットすることはできます。
>ですが、ブラウザからGETメソッドでリクエストを送信する場合、通常はメッセージボディではなくHTTPパラメータとして設定されます。
>このため、サーバー側の処理としてGETメソッドの処理ではメッセージボディに何かデータが設定されてくるということは一般的には期待しません。


## HTTP body-parserとは


ブラウザなどのクライアントからサーバーに対して処理のリクエストを行う際に、一緒に送信するデータ、もしくはクライアントからのリクエストの応答としてサーバーからクライアントへ返信するデータのことをメッセージボディ（Message body）といいます。
body-parserは、このメッセージボディを解析してプログラムで参照しやすいオブジェクトに変換してくれるライブラリです。

一番わかり易いのはPOSTメソッドを使ったフォーム情報の送信時です。
ユーザーがブラウザに表示された入力フォームにデータを入力し、「送信」をクリックしたときにPOSTメソッドでフォームデータをサーバーに送信しますが、そのときにブラウザは入力されたデータをPOSTメソッドのメッセージボディにセットして、HTTPヘッダーに必要な情報（メッセージボディの文字数や文字コード等）を一緒にセットしてサーバーに送信します。
サーバーは、受け取った情報からメッセージボディを特定し、HTTPヘッダーに指定された情報をもとに復元してサーバー側で処理します。

WEBサーバーとしては、この処理は定形処理といっていいぐらい、どのようなアプリケーションでも必要となることが予想される処理で、毎回個別にプログラムを書くのはあまりにも無駄なので、body-parserという拡張モジュールが担ってくれるということです。


## HTTP上で認証を行う場合

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

?の後に,(カンマ)区切りで渡す。それをserver側で配列に変換するのがひとつのやり方。

## クエリパラメータ変換

numberなどで送ってもどうやらstringに変換されるっぽい。

---

## リクエストヘッダ

- Accept(要求)
ブラウザが受信可能なデータ形式(MIMEタイプ)をサーバに伝える。
**アスタリスクはすべてを意味する。**


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
認証が必要なリソースに対して認証情報を伝えます。たとえば、BASIC認証の場合は、Basic の文字と、ユーザ名とパスワードをコロン（:）で連結したものを BASE64 形式にエンコードしたものを転送する。

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

---

## Content-Type

- application/x-www-form-urlencoded
フォームの送信の際に、クライアントがWebサーバに送信するContent-Type名のひとつ

**データはid=dataの形式で、formが複数ある場合は&で区切られる(form1=data1&form2=data2)**
dataはURLエンコードされる。

[参考URL](https://www.wdic.org/w/WDIC/application/x-www-form-urlencoded#:~:text=%E3%83%95%E3%82%A9%E3%83%BC%E3%83%A0%E3%81%AE%E9%80%81%E4%BF%A1%E3%81%AE%E3%81%95%E3%81%84,Type%E5%90%8D%E3%81%AE%E4%B8%80%E3%81%A4%E3%80%82)



## Webhookとは

[参考URL](https://qiita.com/soarflat/items/ed970f6dc59b2ab76169)

アプリケーションの更新情報を他のアプリケーションへリアルタイム提供する仕組みや概念のこと

**通知する、Webhookを送るなどの言葉はPOSTリクエストのことを指している。**


## httpでの冪等性（べきとうせい) : idempotence

冪等性とは、同じ操作何度繰り返しても同じ結果が得られるという性質

## RESTfulにおける冪等性

冪等性はRESTfulの文脈でもよく話題になります。RESTfulでも冪等性の概念は同じで「同じ操作を何度繰り返しても、同じ結果が得られる」という意味。
もう少しRESTfulっぽく寄せた説明をするなら**同じリクエストを何度繰り返しても、同じリソース状態になること**という感じになると思います。

得られる結果というのはリソース状態であって、レスポンスではないことに注意してください。DELETEメソッドには冪等性がありますが、1度目のリクエストでは200レスポンスを、2度目以降のリクエストは404レスポンスを返すことが普通です1。このように冪等性があるAPIでも回数に応じてレスポンスが変化することがありますが、リソースが削除されたという結果(リソース状態)が2度目のリクエストで覆ることはありません。

**RESTfulでは**
GET, PUT, PATCH, DELETEは冪等性があるメソッドとされている
POSTは冪等性がない

投稿にいいねをつけるが、二度目は取り消される仕様
これは冪等性がないといえる

```sh
# POST /items/:item_id/like
```

**冪等性のメリット**
関数やAPI、コマンドを実行する側が、前提となる状態を気にしなくてよくなるという点

---

## HTTP header


### referer(リファラー)

[参考URL](https://e-words.jp/w/%E3%83%AA%E3%83%95%E3%82%A1%E3%83%A9.html)

---

## HTTP method

### GET

クエリパラメーター問題
見られたくないものを送るときはPOSTで送るかHTTPのリクエストヘッダーに入れるかだが、リクエスト先がRESTfulなAPIで、セマンティクス的にGETがふさわしい場合、HTTPのカスタムヘッダーなどを使用する

[参考URL](https://yuw27b.hatenablog.com/entry/2020/03/07/162305)


---

## HTTP レスポンスステータスコード

---

## 300系


### 304 Not Modified

[リファレンス](https://developer.mozilla.org/ja/docs/Web/HTTP/Status/304)
[参考URL](https://uxmilk.jp/50715)

未更新を表す
このときは、Webサーバからはメッセージボディ・つまりコンテンツが返ってこない。


---

## 400系

400 Bad Request
何らかのクライアント側のエラーであるとわかったために、サーバがそのリクエストを処理しないことを表明
たとえば、リクエストの構文が正しくない、リクエストメッセージのフレーミングが無効、リクエスト経路に偽りがあるなど
※サーバには届いている



