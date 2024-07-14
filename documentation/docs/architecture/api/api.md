# API
[参考URL](https://www.infoq.com/jp/articles/ballerina-fullstack-rest-api/?itm_source=infoq&itm_medium=related_content_link&itm_campaign=relatedContent_news_clk)  
[実稼働環境におけるベスト・プラクティス: パフォーマンスと信頼性](https://expressjs.com/ja/advanced/best-practice-performance.html#proxy)  
[Express×Helmetでウェブセキュリティを学ぶ](https://qiita.com/qianer-fengtian/items/148602c437e1703aa764)  
[WebLogic Server のチューニングにおける重要推奨事項](https://docs.oracle.com/cd/F25597_01/document/products/wls/docs92/perform/topten.html)

## 冪等な処理を行うAPIの作り方

何度も呼び出されても変わらず返すためにはDBなどにプライマリーキーを設定する。  
2度呼び出された場合はエラーを返すことができるようになる。

[![Image from Gyazo](https://i.gyazo.com/1c1fdf6299e97699ab6137256f76b645.png)](https://gyazo.com/1c1fdf6299e97699ab6137256f76b645)

## モノシリックなAPIを作るべきではない

ポイントAPIなど、分離することで違うサービスにも提供ができる。  
バックエンドサービスひとつで賄っていたのが、責務によって分けることが良い場合もある。


## API種類

フロントエンドから直接機能されるAPIの開発には、**いくつかの一般的な選択肢が存在する**

1. REST API
2. GraphQL API
3. WebSocket API

## Google blog

[API 設計: gRPC、OpenAPI、REST の概要と、それらを使用するタイミングを理解する](https://cloud.google.com/blog/ja/products/api-management/understanding-grpc-openapi-and-rest-and-when-to-use-them)

## 上記のAPI種類が決まったら

- セキュアな通信か
- 認証は？
- 承認は？
- 監視、可観測性、ログ

## API設計に関するまとめ

[参考URL](https://qiita.com/kudojp/items/47b7486ee2f02e841a95)  
[REST_APIのコツ](https://www.slideshare.net/pospome/rest-api-57207424)

- LSUDs
Large Set of Unknown Developers（不特定多数のユーザーに提供するAPI）

- SSKDs
Small Set of Unknown Developers（特定のシステムのみで利用する専用のAPI）

- HATEOS
Hypermedia As The Engine Of Application State（リソース同士に関連性のあるAPIのこと）

## APIリクエスト(POST/PUT)のcontent-type

- application/x-www-form-urlencoded  
body部分にkey-value形式で送信したいデータを格納する。

- application/json（こっちのが主流）  
body部分にJSON形式で送信したいデータを格納する。

## APIレスポンスのcontent-typeとフォーマット

- application/json(JSON-RPC)

- application/hal+json(HAL)

- application/vnd.api+json(JSON API)
これがParrotだとbackendが返す。

- application/vnd.collection+json(Collection JSON)

## レスポンス圧縮する必要性
[gzip圧縮方法について徹底解説](https://digitalidentity.co.jp/blog/creative/gzipcompress.html)


---

## リクエストをparseする

列挙する
- クライアントからのjson parse（POSTのメッセージ部分）
- 通常のフォームリクエストのボディ（application/x-www-form-urlencoded）

### 通常のフォームリクエストのボディ

Content-Typeがapplication/x-www-form-urlencodedのケース
各フレームワークで違いはあれど、parseできる準備をしないといけない。


---

## JWT
[JWT=ステートレス"から一歩踏み出すための考え方](https://zenn.dev/ritou/articles/4a5d6597a5f250)

---

ここからは書籍Webを支える技術を参考にする



## 3章 Webのアーキテクチャスタイル


実際のシステムは具体的なアーキテクチャを持っている。そのアーキテクチャを設計するときにただ闇雲に作っているのではなく**アーキテクチャ設計の指針、作法、流儀、つまりアーキテクチャスタイルを適用する**
システムのアーキテクチャを決定する際の羅針盤となるのがアーキテクチャスタイル

アーキテクチャ: ブラウザ/サーバ/プロキシ/HTTP/URI/HTML
↓
アーキテクチャスタイル（マクロ）アーキテクチャパターン: REST/MVC(Model-View-Controller)/パイプフィルター/イベントシステム


## デザインパターン

デザインパターン（マイクロアーキテクチャパターン）といい、アーキテクチャスタイルよりも粒度の小さいクラスの設計様式を指す

## healthCheck
[参考URL](https://devblog.thebase.in/entry/2019/03/06/110000)

healthCheckはAPIの通信ができるかといった外形監視と呼ばれる。  

api&DBまでを確認するのが基本っぽい。
しかし、クラウドなど（AWS）でデフォルト確認などできるのであればDBまでは不要かも。


運用しているYELL BANKというサービスは、以前公開した『ECS(Fargate)でコンテナアプリケーションを動かすための設定情報の扱い方』という記事でも紹介した通り、コンテナー上で動作することを前提としたアプリケーションとして機能提供しています。 コンテナー  内で動かすアプリケーションにおいても、外形監視は重要と感じていますが、

## パスワード保存

平文は基本NG
dbにパスワードが保存される時によく使われる（平文で保存はだめ）
[dbに平文を保存してはいけない理由](https://medium-company.com/bcrypt/)

もし外部へパスワードの「ハッシュ値」が漏洩してしまった場合、「レインボーテーブル攻撃」や「総当り攻撃（ブルートフォース攻撃）」で「ハッシュ値」からパスワードを推測されてしまう危険性があります。
そのため、パスワードは「ソルト」と「ストレッチング」を実施した形でハッシュ値に変換します。
この「ソルト」や「ストレッチング」を考慮した形でハッシュ値へと変換してくれるのが、bcryptです。

ソルトは個別に分けるべき


## query

>これらのqueryは基本的にAND条件が多いです。例えばYouTube APIとかでもqueryは色々ありますが、複数指定した場合はそれらのANDでの結果が返ってきますね。
>ORにする場合は複雑なcombinatorとかをqueryで実現する実装が必要だったりして面倒なのですが、とりあえず今回の件ではどちらも考慮したものでOKです
>矛盾する２つのqueryを指定されたらエラーを返す、みたいなAPIもよくあります。(例えば日付の絶対指定と相対指定を両方提供しているAPIで両方値が入っていたケースなど)

## json apiのフォーマット
[Web APIにはJSONベースのフォーマットを使おう](https://qiita.com/tkawa/items/2841e155e5b51c09ed40)

Web APIを作るとき、JSONのデータ構造をどうするか悩んだことはあると思う。
それを決めてくれる。


- JSON API（parrotで使用）
- HAL


### JSON API


## チェックリスト

- レスポンスヘッダーにセキュリティを追加したか
- dbに
- レスポンスは決めたか？（json or xml）

## path tips

- APIにおける`/users/{userId}`と`/me`について　どっちを採用するか
[参考URL](https://www.utakata.work/entry/20190112/1547262000)

`/v1/me/images`でアクセスした場合は非公開の画像が帰ってくるようにする。
`/v1/users/{userId}`では非公開の情報は（たとえ本人によるアクセスでも）帰ってこない。
`/v1/users/{userId}`で本人によるアクセスの場合のみ非公開の情報を返す。

## レートリミット
※クラウド時代に関しては**アプリケーションレベルでレートリミットをかける必要はないかもしれない。**
[参考URL](http://dotnsf.blog.jp/archives/1080229433.html)
レートリミットは、一定の時間内にプロダクトを操作できる回数を制限するもの。

クラウドやホスティングサーバで運用する場合は、クラウド／ホスティング側にそのような機能が提供されていることもあると思います。
が、もしそのような機能が提供されていない条件下でこのような要件が生じた場合**アプリケーションの実装としてリクエスト制限を用意する必要が出てくるかもしれない**

>ただし、この制限は「１インスタンスごとの制限」である点に注意が必要です。クラウド的な言い方だと「１コンテナ」あたりでこの制限が有効になりますが、複数インスタンスで運用した場合、例えば可用性を高める目的で３つのコンテナを起動して運用した場合は、事実上設定値の３倍のリクエスト処理を受け付けることになる、という点に注意が必要です。

## データリミット

利用者が通常使用するのに必要な量を超えるデータを取得できないようにするもの。
jsonのpostが10kbにするとか

## apiの権限設計
[参考URL](https://kenfdev.hateblo.jp/entry/2020/01/13/115032)
