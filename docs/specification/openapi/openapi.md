# OpenAPI Specification(OAS)

## OpenAPIとは

[参考URL](https://girigiribauer.com/tech/20190318/)

RESTful APIに関するインターフェイス定義
Swagger 3.0からOpenAPIに名前が変わったため、OpenAPI 3.0はSwagger 3.0でもある。

## OpenAPI 現在

まずOAIとコミュニティのゴタゴタがあり、魅力が落ちていたこと。またgRPC、GraphQLと魅力的な競合技術があるため、Webやスマホアプリ界隈がOpenAPIから離れつつあること。そして5GCでAPI定義に採用されているものの、サービス実装者（モバイル機器ベンダー）にとってOSSで公開するメリットがないこと。

## OpenAPI（Swagger）のAPI開発Docker環境を整備した（yaml分割編集、SwaggerUI表示、モックサーバー、静的HTML出力）

[参考URL(使える)](https://qiita.com/minato-naka/items/3b0bcf0788a2150f3171)


## OpenAPI(Swagger)

`openapi.yml`を作成し**openapi-generator**を使用するだけでymlから各対応言語で生成できる。

各周辺ツール
- Swagger Editor
定義ファイルの編集
- Swagger UI
ドキュメント閲覧

## OpenAPIに準じた設計書の作成方法

[Stoplight 使い方](https://note.com/shift_tech/n/n2d0265731777)

1. YAML or JSONを手作業で書く
2. Stoplight Studioを使う




