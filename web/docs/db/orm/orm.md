## ORM O/Rマッピング

[参考URL](https://e-words.jp/w/O-R%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0.html)

# 触る前に考え方

サーバサイト側がいうEntityはDBのテーブルに対応したオブジェクトのファイル

ORM用語

## クエリビルダー

ORMよりでQuery builderを使う。
もっとも低レベルのAPIになる。そのままSQLを生で生成すること。
ベストワンクルーズは生SQLだったな。

## ORM手法

TypeORMより
>TypeORM では、Active Record パターンと Data Mapper パターンの両方を使用できます。

## ORMデザインパターン

### Data Mapperパターン == Repositoryパターン

[TypeORMリファレンス](https://orkhan.gitbook.io/typeorm/docs/active-record-data-mapper)
Data Mapperアプローチを使用して、すべてのクエリメソッドを**リポジトリ**と呼ばれる個別のクラスに定義し、リポジトリを使用してオブジェクトを保存・削除・読み込みができる。
Data Mapperアプローチはe

Repositoryパターン
[参考URL](https://qiita.com/mikesorae/items/ff8192fb9cf106262dbf)
Repositoryパターンとは永続化を隠蔽するためのデザインパターンで、DAO(DataAccessObject)パターンに似ていますが、より高い抽象度でエンティティの操作から永続化ストレージを完全に隠蔽する。

## ORMパターン参考

つまりORMのパターンにも手法があるということ。
[参考URL](https://zenn.dev/yum3/articles/t_orm_kinds_research)
[参考URL](https://www.kanzennirikaisita.com/posts/data-access-patterns)

## ActiveRecord

Enterprise Application Patternsのひとつ

Active-Recordパターンは、Enterprise Application Patternsの一種で、ひとつのデータベースのテーブルとhとつのクラスを対応付け、またそのクラスのインスタンスを（クラスに対応する）テーブルの1つのレコードに紐付ける、というパターン。
データベースのテーブルやビューの行をラップし、データベースへのアクセスをカプセル化し、そのデータにドメインロジックを追加するオブジェクトです。
ドメインオブジェクトにデータアクセスロジックを配置するイメージ。
**ロジックとデータアクセスが密結合**になってしまうためテストがしにくくなる（DB接続が必要になる）

- メリット
単純なCRUDのWebアプリ開発には向いているし、使いやすい
納期がキツイタイプのWebアプリで納品して終わり、のケースだと適している場合が多い
持続的なソフトウェア開発を行わない

- デメリット
手続き型言語に近づいてしまう
単一責務違反になる
テストしにくい

## DataMapper

Enterprise Application Patternsのひとつ

オブジェクトとデータベースの間で、互いに独立した状態を保ちながらデータを移動させ、マッパー自体も独立させる。
DataMapperは、メモリ内（実行中プログラム）のオブジェクトをデータベースから分離するソフトウェアのレイヤー。

DataMapperを使用することで、メモリ内（実行中のプログラム）のオブジェクトはデータベースが存在することを知る必要はないので、データベーススキーマの知識も必要でなくなる

メリット
ActiveRecordのデメリットを改善する
デメリット
複雑性が増すので、ActiveRecordに比べると一時的なスピードが落ちる
単純なアプリに対してオーバースペックになる可能性がある

## Repository

ドメインオブジェクトにアクセスするためのコレクションのようなインターフェースを使用して、ドメインとデータマッピング層の間を仲介する。
Repositoryはドメインとデータマッピングレイヤーの間を仲介し、メモリ内（実行中プログラム内）のドメインオブジェクトコレクションのように機能する。

概念的には、リポジトリはDBに保存されたオブジェクトのセットと、それらに対して実行される操作をカプセル化し、オブジェクト指向のビューを提供する。

Entityを効率的に永続化するためのオブジェクト
DataMapperは単一のEntityを永続化するためのオブジェクト
Repositoryは複数のEntityを永続化するためのオブジェクト
