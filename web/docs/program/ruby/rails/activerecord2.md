## Active Record

[参考URL](https://railsguides.jp/active_record_basics.html)

Active Recordとは、MVCで言うところのM、つまりモデルに相当するものであり、ビジネスデータとビジネスロジックを表すシステムの階層
Active Recordは、データベースに恒久的に保存される必要のあるビジネスオブジェクトの作成と利用を円滑に行なえるようにする。
Active Recordは、**ORM（オブジェクト/リレーショナルマッピング）システムに記述されている「Active Recordパターン」**を実装したものであり、このパターンと同じ名前が付けられている。

- 命名ルール
モデルのクラス名が2語以上の場合、キャメルケースにする(CamelCase)
テーブル名はスネークケース(snake_case)とする

## scope機能

モデルのスコープ機能とは、**モデル側であらかじめ特定の条件式に対して名前をつけて定義しその名前でメソッドの様に条件式を呼び出すことができる仕組みのこと。**

```ruby
class モデル名 < ApplicationRecord
  scope :スコープの名前, -> { 条件式 }
end
# publishedという名前に公開記事を取得する条件式を定義するには以下のように記述する
class Blog < ApplicationRecord
    scope :published, -> { where(published: true) }
end
# 定義したスコープは以下のように呼び出す
Blog.published
```

## 1対多の考え方

本から見れば出版社は1つ。出版社から見ればたくさんの本を発行している。

## has_many, belongs_to

has_many
**テーブル同士を関連**づけるためのもの
関連付けをすることによって、データをまとめて扱えるようになるので、より効率的にデータベースを操作できる。

## belongs_to

所有されているという関係になる。

## rails db:migrateとrails dbの違い

[参考URl](https://teratail.com/questions/157411)

`rails db:migrate` や `rails db:create` に関してはrails側からdbへ接続して実行する（コアライブラリがあれば良い）

`rails db` に関してはrailsから `database.yml` で設定されているDBに対して、各DBに対応した「コマンドラインインターフェース」を起動する。PostgreSQLであれば、psqlコマンドが必要。
