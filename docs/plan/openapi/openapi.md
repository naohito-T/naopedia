# OpenAPI
[参考URL](https://zenn.dev/chida/articles/25f4016560f6bf)
[参考URL(これが一番参考になる)](https://zenn.dev/mabubu0203/articles/a34937c9d5892f)
[openapiをチームに共有する](https://zenn.dev/d_forest/articles/bec25d3a1b111ed37a09)

- OpenAPI
RESTful APIの仕様を記述するためのフォーマット

- Swagger
OpenAPIを使用するツールのこと

## Swaggerでよく使われるツール

- Swagger Editor
ブラウザ上でAPI仕様書を書くためのエディター

- Swagger UI
API仕様書からドキュメントを生成するツール

- Swagger Codegen
API仕様書からコードを生成するツール

## 結論

Stoplight Studioで書けば一番理解が進む。

## OpenAPIでできること

OpenAPIはフォーマットを学習することで、API仕様の記述スピードが上がり、記述の統一化が図れます。
OpenAPIは基本的なAPI仕様の記述フォーマットの提供だけでなく、各種ツールを用いることで開発を行う上でのさまざまなメリットを与えてくれます。
たとえば、記述したAPI仕様のドキュメント化、コードの自動生成、API仕様に沿って建てられたAPIサーバに対するテストなどを行うことができます。


## 各フィールド
[参考URL](https://www.alpha.co.jp/blog/202208_02)

### infoフィールド

必須となるフィールドはtitleとversion。

### summary vs description

>summary is short, description is more detailed.
>Think of the summary as a short one or two sentence explanation of what the intended purpose of the element is. You won't be able to describe all the subtle details, but at a high level, it should be able to explain the purpose of the element.

summaryは短く、descriptionはより詳細に。
要約は、その要素の意図する目的が何であるかを1～2文の短い文章で説明したものだと考えてください。微妙なディテールをすべて記述することはできないでしょうが、高いレベルで、その要素の目的を説明することができるはずです。

### serverフィールド

サーバの情報を定義するフィールド
※`server`は必須でないのでなくてもいい。

ただし記載するとAPIエンドポイントに対するベースURLとして機能する（3.0から）
[リファレンス](https://swagger.io/docs/specification/api-host-and-base-path/)

また以下もオススメ
>ここで variables を使って任意のホスト、ポートを設定できるようにすることで、この API を各個人の開発環境などからテストすることができます。

### tags


APIで使用されるタグの情報を定義するフィールドのリスト。
各種ツールによってパースされる際は、記述された順序で出力される。
タグ名はユニークで無ければならない。
エンドポイントをグルーピングし、意味のある塊として扱うために定義する。
各エンドポイントでtagsに指定することで**定義をタグで分類できる。**

## エンドポイント
[参考URL](https://zenn.dev/mabubu0203/articles/a34937c9d5892f)

エンドポイントの情報を定義するフィールド。これがメイン
エンドポイントは操作対象の名詞にすること。
名詞は人、もの、場所など、物事の名称をあらわす自立語。体言ともいい、活用がなく単独で主語になります。「犬」「東京」「私」などが名詞です。

### paths

各種APIのエンドポイントを指定する。
**serversで定義したURLにこのパスを結合したもの**が最終的なエンドポイントとなる。

書式としては以下
```yml
paths:
  /health:
    get:
      summary: Nid API ヘルスチェック
      tags: [api, v1, health] # グルーピングする
      description: 後続のDBに対し select 1; を投げて成功すれば 204 No Content を返す。失敗すれば Internal Server Error を返す。
      operationId: get-health_check # operationIdってなにさというと、OpenAPIのOperation Objectの一項目で、操作を識別するための一意な文字列のこと
      responses:
        '204':
          description: APIサーバが生きている場合
```

- operationId
[OpenAPIにはoperationIdを書こう](https://joe-noh.hatenablog.com/entry/2017/05/02/234247#:~:text=operationId%20%E3%81%A3%E3%81%A6%E3%81%AA%E3%81%AB,%E6%96%87%E5%AD%97%E5%88%97%E3%81%AE%E3%81%93%E3%81%A8%E3%81%A7%E3%81%99%E3%80%82)

付与するとパーマリンクが発行できるみたい（ReDocだと）

### components
[参考URL](https://qiita.com/shigeru10/items/8f20fafd04f7901da939)

componentsはpaths等から使えるコンポーネントを書く（別フィールドから`$ref`で参照する。）

- schemas
UserやProduct等のモデル

- requestBodies
リクエストボディ

- responses
APIレスポンス

- headers
リクエストヘッダー

- parameters
[更なる拡張](https://developer.ntt.com/ja/blog/4d6d9b81-5a86-4828-9cee-cec6062342cc)
各リクエストパラメーターを配列で定義します。inはパラメーターをセットする場所。
query : クエリストリング
formData : フォーム
header : HTTPヘッダー
path : パス
body : ボディー




API定義で**再利用可能なオブジェクト**を定義できる。

## Tips

- Redoc
[参考URL](https://qiita.com/rhirabay/items/59c134aa052dbc4b982b)

- vscodeプラグインオススメ一覧
[参考URL](https://zenn.dev/s_t_pool/articles/954dfe51b950c18d08e9)

- descriptionを改行したい
description: の後に "|"を入れることで、それ以降の文章に空白文字があった場合、改行として認識してくれる。