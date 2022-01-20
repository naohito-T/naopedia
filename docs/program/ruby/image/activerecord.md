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

## has_many, belongs_to

has_many
テーブル同士を関連づけるためのもの
関連付けているのでテーブルの操作等が効率的にできる。


