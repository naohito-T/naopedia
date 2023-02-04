# OpenAPI
[参考URL](https://zenn.dev/chida/articles/25f4016560f6bf)  
[参考URL(これが一番参考になる)](https://zenn.dev/mabubu0203/articles/a34937c9d5892f)  
[openapiをチームに共有する](https://zenn.dev/d_forest/articles/bec25d3a1b111ed37a09)  

コード自動生成やモックサーバーに活用させることで徹底した**スキーマファーストな開発を行うこと**ができる。

## 覚えるべき大項目

```yml
openapi: 3.0.3  # [必須] Open API バージョンを指定します
info:           # [必須] API 定義の基本情報を記載します
  ...
servers:        # API サーバの情報を記載します
  ...
paths:          # [必須] エンドポイントのリクエストやレスポンスを記載する。メインとなる部分
  ...
components:     # 共通部分をここにまとめておきます
  ...
```

## 各フィールド
[わかりやすい](https://zenn.dev/peraichi_blog/articles/01ges56ak79g2rket9wm27w9pc)  
[参考URL](https://www.alpha.co.jp/blog/202208_02)

### infoフィールド

必須となるフィールドはtitleとversion。

### summary vs description

>summary is short, description is more detailed.
>Think of the summary as a short one or two sentence explanation of what the intended purpose of the element is. You won't be able to describe all the subtle details, but at a high level, it should be able to explain the purpose of the element.

summaryは短く、descriptionはより詳細に。  
要約は、その要素の意図する目的が何であるかを1～2文の短い文章で説明したものだと考える。  
微妙なディテールをすべて記述することはできないでしょうが、高いレベルで、その要素の目的を説明することができるはず。

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
**エンドポイントをグルーピング**し、意味のある塊として扱うために定義する。  
各エンドポイントでtagsに指定することで**定義をタグで分類できる。**  

## エンドポイント
[参考URL](https://zenn.dev/mabubu0203/articles/a34937c9d5892f)

エンドポイントの情報を定義するフィールド。これがメイン  
エンドポイントは操作対象の名詞にすること。  
名詞は人、もの、場所など、物事の名称をあらわす自立語。体言ともいい、活用がなく単独で主語になる。  
「犬」「東京」「私」などが名詞。

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
OpenAPIを利用するツールで`operationId`を利用することができるため付与する。  

### components
[参考URL](https://qiita.com/shigeru10/items/8f20fafd04f7901da939)

componentsはpaths等から使えるコンポーネントを書く（別フィールドから`$ref`で参照する。）  
componentsを使うと記述量が減る、APIのSchemaとして登録されるのでAPI利用者によりわかりやすく表記される。

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

## allOf

allOfは**スキーマを合わせるとき**に使用する。  
下記の例はMessagesのcomponentとWebhooksのcomponentを合わせるという意味になる。  
```yml
allOf:
    - $ref: '#/components/schemas/Messages'
    - $ref: '#/components/schemas/Webhooks'
```

## oneOf
[１つのステータスコードに対して複数のレスポンスを定義 (oneOf)](https://thinline196.hatenablog.com/entry/2019/09/18/181947)

oneOfは**どちらかが適用されるという意味**で、選択肢を表したい時に便利。  
```yml
allOf:
    - $ref: '#/components/schemas/Messages'
    - $ref: '#/components/schemas/Webhooks'
```

## Tips
- Redoc
[参考URL](https://qiita.com/rhirabay/items/59c134aa052dbc4b982b)  

- vscodeプラグインオススメ一覧
[参考URL](https://zenn.dev/s_t_pool/articles/954dfe51b950c18d08e9)  

- descriptionを改行したい  
description: の後に "|"を入れることで、それ以降の文章に空白文字があった場合、改行として認識してくれる。

- 作成したopenapiを公開する
[swaggerhubを使ってAPI作成後、公開まで](https://qiita.com/koki-iwaizumi/items/9235fb69f2773c95f21b)

[OpenAPI（Swagger）のAPI開発Docker環境を整備した（yaml分割編集、SwaggerUI表示、モックサーバー、静的HTML出力）](https://qiita.com/minato-naka/items/3b0bcf0788a2150f3171)
