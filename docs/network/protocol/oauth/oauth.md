# OAuth(認可)
[一番分かりやすい OAuth の説明](https://qiita.com/TakahikoKawasaki/items/e37caf50776e00e733be)
[passportの説明](https://www.passportjs.org/concepts/oauth2/?utm_source=github&utm_medium=referral&utm_campaign=passport-google-oauth20&utm_content=nav-concept)

OAuthはプロトコルのひとつ。

OAuth = 認可（権限の認可:行動やリソースの許可をすること）
**権限の認可を行う**オープンスタンダードライブラリ。
まず、前提知識として、OAuthという『アクセストークンを発行する仕組み』がある。
アクセストークンは、アプリケーションをAPI経由で操作するときなんかに使われる。
例としてTwitterクライアントを自作するときにアクセストークンを使ったりします。

**このOAuthは前述のとおりアクセストークンを発行する仕組みであって、認証については定められていません。認証に必要な、ユーザー情報などの取得については決まっていない。**

このOAuthを拡張し、ユーザー情報の取得についてなどを標準化したのがOpenID Connectが策定された。

## OAuthにとってのGoogleやFacebook
[参考URL](https://www.passportjs.org/concepts/oauth2/terminology/)

OAuth 2.0の用語では、Facebookは**承認サーバー（AS）**
認可サーバーの目的は、ユーザーを認証して認可を取得することです。承認は通常、ユーザーに同意を求めるプロンプトによって取得されます。承認が取得されると、承認サーバーはアプリケーションにアクセス トークンを発行します。

## OAuthがない場合

OAuthは、第三者となるアプリケーションに対して安全にアクセス権限を提供するためのプロトコル。
たとえば、GitHubのAPIを利用するアプリケーションAをOAuthなしで使うとすると、通常はGitHubのユーザIDとパスワードをアプリケーションAに預ける必要がある。

この手法ではパスワード漏洩の危険が増しますし、アプリケーションAはGitHubに対してユーザと同じ権限を持つことになってしまう。
アプリケーションAの運営者がその気になれば、ユーザをGitHubから退会させることもできるでしょう。
OAuthを利用すると、パスワードをアプリケーションAに渡さずともよくなります。さらに、アプリケーションAがその機能を提供するのに必要な権限だけを与えることができる、

## OAuth 認証フロー
[参考URL](https://qiita.com/TakahikoKawasaki/items/200951e5b5929f840a1f)  
[これ実装するのにいいかもしれない。](https://qiita.com/TakahikoKawasaki/items/e508a14ed960347cff11)

## OAuth OpenID Connectの役割違い

一般的にOAuth2は認可、OpenID Connectは認証の仕組みという形で区別される。
OAuth2は、サードパーティからの権限移譲で、`Scope`という概念を用いた権限の認可システムを構築するもの。  
もちろんOauth2も認可の過程で認証の仕組みを用意していますが、その実態はアクセストークンと言う形でサービス提供者によって**比較的バラバラの運用**が取られてました。  
ここに、OpenID ConnectはID Tokenという形で**トークンのフォーマットや利用形態を定義したもの。**

OAuth2は認可、OpenID Connectは認証の仕組みといわれるのは、技術的関心の中心がどこにあるか、を示したものに過ぎない。

OAuth2を用いたシステムにも（アクセストークンベースの）認証の仕組みはもちろんあり、
OpenID Connectを用いるシステムでも、認可のシステムを実現することはもちろん可能。

## OpenID Connect(認証)

>一般の方々に対してはOpenID Connectは認証の仕様であるという説明で良いと思います。一方、技術的な理解を渇望しているエンジニアの方々に対しては、OpenID Connect は ID トークン を発行するための仕様であるという割り切り方を勧めたほうが良いと考えています。というわけで、まず、ID トークンについて説明しようと思います。

OpenID ConnectはOAuth2.0に**認証の仕組みを導入するにあたって、**主に以下のような規約を定義しています。

- Oauth2.0のAuthorization Request送信後のトークンのやり取り
- ユーザ認証情報を表現する上でのトークンの規約
- この2つを総称して、ID Tokenを発行するための仕組みという形で呼んでいます。

## OpenID Connect(認証)で定義されるトークンのやりとり

OpenID Connectでは、Oauth2.0のAuthorization Request送信後のトークンのやり取りt大きく ３つのパターンで定めています。

- Authorization Code Flow
- Implicit Flow
- Hybrid Flow

OpenID Connectを利用した**認証フローがどの方式を利用しているか**は、Oauth2.0のAuthorization Requestにおけるresponse_type値を確認することで判断できる。

- response_typeの値が`code -> Authorization Code Flow`
- response_typeの値が`code を含まず id_token を含む -> Implicit Flow`
- その他 -> `Hybrid Flow`

どのフローで認証を行ったとしても、最終的にはID TokenとAccess Tokenがクライアントに返却される。

## OpenID Connect利用される ID Token(JWT)
[IDトークンが分かれば OpenID Connect が分かる](https://qiita.com/TakahikoKawasaki/items/8f0e422c7edd2d220e06)  
[OpenID ConnectとJWT の関わり - Oauth2.0 との違いなど](https://zenn.dev/mikakane/articles/tutorial_for_openid)

ID Tokenは、OpenID Connectで定義されるユーザの認証に関するトークン。  
ID Tokenは、OpenID Connectで定められたそれぞれの認証フローの中でクライアントに対して返却される。

ID Tokenは**JWTのフォーマットで表現されるトークン**です。

JWTでは、シンプルにトークンの形式のみが規程されており、payload部分のフォーマットやトークン自身の使われ方についてはほとんど言及されていなかった。

OpenID Connectで規程されるID Tokenは、JWTのpayload部に一定のフォーマットを提供するもの。
また、ID Tokenを利用した認証フローの流れなどトークンの利用方法についても細かい規定を追加しています。

## OAuthとJWTの関わり
[参考URL](https://zenn.dev/mikakane/articles/tutorial_for_openid)

IDトークンは**JWTの一種**  
[参考URL](https://qiita.com/TakahikoKawasaki/items/8f0e422c7edd2d220e06#7-id-%E3%83%88%E3%83%BC%E3%82%AF%E3%83%B3)

OpenID ConnectがOAuth 2.0に対しておこなった主要な拡張が、IDトークンというデータ構造。  
IDトークンが`JWT`として表現されることも明記されている。

IDトークンの仕様では、RFC 7519で定義されているクレームのいくつかを必須のクレームとしている。  
具体的には`iss, sub, aud, exp, iat`は必須とされている。

## IDトークンでの各クレーム
[参考URL](https://qiita.com/TakahikoKawasaki/items/8f0e422c7edd2d220e06#7-id-%E3%83%88%E3%83%BC%E3%82%AF%E3%83%B3)  
JWTにある識別子と同名のものもあるが、少し指定内容が変わる。  
IDトークンでは`iss, sub, aud, exp, iat`が必須とされている。

### issクレーム

>issクレームは、JWTの発行者 (issuer) を識別するための識別子です。iss クレームの値は、RFC 7519 では文字列か URI (StringOrURI) とされていますが、OpenID Connect Core 1.0 のほうの定義では、より条件が多くなっており、「https:// で始まる URL (ただしクエリー部とフラグメント部は含まない)」とされています。

IDトークン発行サーバーは、他者の識別子との衝突を避けるため、issクレームの値を自分の管理下にあるドメイン名のURLとすべきです

## subクレーム

subクレームは、ユーザーの一意識別子を表す。
>値の形式は、RFC 7519 では文字列か URI (StringOrURI) とされており、OpenID Connect Core 1.0 では 255 文字以内の ASCII 文字列とされています。

>突然、「ユーザーの一意識別子」というものがでてきました。
>これまで説明はしていませんでしたが、IDトークンはユーザーを認証した結果発行されるものなので、どのユーザーが認証されたのかの情報が含まれることになります。
>その「どのユーザーが認証されたのか」という情報にあたる部分が、subクレームです。sub クレームの値は、ID トークン発行者のシステム内において、ユーザーを一意に特定することが可能な識別子です。

ルール
>ユーザーの一意識別子は、一般的には、データベース内のユーザーテーブルのプライマリーキーやそれに準ずるものです。特に気にしないのであれば、プライマリーキーの値をそのまま sub の値として用いてもかまいません。気にするのであれば、何らかのロジックを用いて元々の値を変換してから sub クレームの値として用いることになります。場合によっては、ID トークンの発行を依頼したプログラムの違いによって、同じプライマリーキーから異なる sub クレーム値を生成してもかまいません

## 