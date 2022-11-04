# API
[参考URL](https://www.infoq.com/jp/articles/ballerina-fullstack-rest-api/?itm_source=infoq&itm_medium=related_content_link&itm_campaign=relatedContent_news_clk)
[実稼働環境におけるベスト・プラクティス: パフォーマンスと信頼性](https://expressjs.com/ja/advanced/best-practice-performance.html#proxy)
[Express×Helmetでウェブセキュリティを学ぶ](https://qiita.com/qianer-fengtian/items/148602c437e1703aa764)
[WebLogic Server のチューニングにおける重要推奨事項](https://docs.oracle.com/cd/F25597_01/document/products/wls/docs92/perform/topten.html)

補足すると
>Oracle WebLogic Serverは、Javaなどのエンタープライズ・アプリケーションをオンプレミスやクラウドで開発、導入、稼働するために統合された拡張可能なプラットフォームです。WebLogic Serverは、Java Enterprise Edition（EE）とJakarta EEの堅牢でマチュア、そしてスケーラブルな実装を提供します。

## API種類

フロントエンドから直接機能されるAPIの開発には、**いくつかの一般的な選択肢が存在する**

1. REST API
2. GraphQL API
3. WebSocket API

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

## レスポンス圧縮
[gzip圧縮方法について徹底解説](https://digitalidentity.co.jp/blog/creative/gzipcompress.html)


---


## Session セッション
[セッションのクッキーを設定する場合のベストプラクティス](https://blog.ohgaki.net/session-and-cookie)

セッションはCookieを使って実現するのが一般的
HTTPセッションは通常クッキーを利用して行います。クッキーを利用したセッションの場合、お薦めする設定は以下の通りです。

1. ドメイン名は指定しない

2. パスはルート（/）を指定する
パスですが、アプリの中にはURIパスを検出してパスを設定してクッキーを送るようにしている物もあります。ルート（/）とサブディレクトリ（/app1/など）にクッキーが設定されている場合、ルートの方が優先されるので安全面を考えるとルートの方が良いです。

3. セッション管理用のクッキーはセッションクッキー（有効期間0）にする
常識として知っておくべき知識です。クッキーの有効期限が0の場合、普通のブラウザは**クッキーをメモリにみ保存します。**
つまりブラウザを終了させるとクッキーが消えます。セッション管理には必ず有効期限0を指定すべきです。

4. httponly属性を付ける

5. 可能な場合は必ずsecure属性をつける

6. 複数アプリケーションを利用する場合はsession.nameまたはsession_name()でセッションクッキー名で指定する（アプリケーションの固有名デフォルトで設定し、設定項目として変更できるようにする）

## Session管理でやってはいけないこと

1. 有効期限の長いセッションを再ログイン用に使う
有効期限の長いセッションに良いことはない。
たとえば、公共のPCや友人のPCを使った時にブラウザを閉じてもまだログインした状態が続くのは良くありません。
自動ログインを有効にする場合は別の使い捨ての認証用クッキー（再認証用のトークン）を用い、ログインする場合に自動ログインするか、しないか選択できるようにしてユーザが制御できるようにします。ユーザが明示的にログオフした場合は再認証トークンも必ず無効にします。

2. Trans SIDを不要なのに有効にする
Trans SID(URLの書き換えによるセッション）を絶対に利用してはならない、とは言いませんが特別な理由がない限り有効にしてはなりません。ページやURLをメールなどで送信するとセッションIDが漏洩します。

最後にセッションIDは少なくとも定期的にsession_regenerate_id()で更新すべきです。ログインした時の更新は必須です。

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

## Mockデータに関して

テストデータ作成ライブラリを使うか
自作を使うか

---

ここからは書籍Webを支える技術を参考にする



## 3章 Webのアーキテクチャスタイル

![アーキテクチャスタイル](image/アーキテクチャスタイル.png)

実際のシステムは具体的なアーキテクチャを持っている。そのアーキテクチャを設計するときにただ闇雲に作っているのではなく**アーキテクチャ設計の指針、作法、流儀、つまりアーキテクチャスタイルを適用する**
システムのアーキテクチャを決定する際の羅針盤となるのがアーキテクチャスタイル

アーキテクチャ: ブラウザ/サーバ/プロキシ/HTTP/URI/HTML
↓
アーキテクチャスタイル（マクロ）アーキテクチャパターン): REST/MVC(Model-View-Controller)/パイプフィルタ/イベントシステム


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

- APIにける/users/{userId}と/meについて　どっちを採用するか
[参考URL](https://www.utakata.work/entry/20190112/1547262000)

`/v1/me/images`でアクセスした場合は非公開の画像が帰ってくるようにする。
`/v1/users/{userId}`では非公開の情報は（たとえ本人によるアクセスでも）帰ってこない。
`/v1/users/{userId}`で本人によるアクセスの場合のみ非公開の情報を返す。

## レートリミット

レートリミットは、一定の時間内にプロダクトを操作できる回数を制限するもの

## データリミット

利用者が通常使用するのに必要な量を超えるデータを取得できないようにするもの。
jsonのpostが10kbにするとか

