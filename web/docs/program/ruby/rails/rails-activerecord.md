# ActiveRecord

まずは基本的なバリデーションやコールバックを押さえておけばActiveRecordのモデルを使いこなせる。

ActiveRecordによるモデルには大きく分けて3つの側面がある。

1. モデルクラスに記述しなくともテーブルのカラムがプロパティにセットされる。
1つはDBと接続し、DBのレコードとActiveRecordオブジェクトを結びつけるという役割。
モデルクラスの実装に何も記述しなくても、テーブルのカラム情報を取得しモデルのフィールド情報に自動で反映する機能

2. SQLの構築を抽象化する機能やコネクションプール、接続情報を隠蔽する機能を提供する。

3. ビジネスロジックの実装的な振る舞いに関するところ、すなわちバリデーションやレコード保存時などに実行するさまざまなコールバックなどを実行する役割。

## Active record モデル命名規則

[![Image from Gyazo](https://i.gyazo.com/f02b7d1d3b91557b6e119f9fa8d2dea5.png)](https://gyazo.com/f02b7d1d3b91557b6e119f9fa8d2dea5)

## Active record モデル関連　コマンド

[参考URL](https://qiita.com/zaru/items/cde2c46b6126867a1a64)

※/db/migrate/ 以下にマイグレーションファイルが作成されるので、NOT NULLだったり、**カラム名の修正とかをしたい場合は、ここで直接修正してしまう。**

```sh
# マイグレーションファイル作成コマンド
$ rails generate migration クラス名

# モデル作成
$ rails generate model モデル名

# テーブルを作成する
$ rails g model モデル名 フィールド:型:(unique|index) 以降必要なだけ

$ rails g model User uuid:string:unique name:string
```

## マイグレーション実行＆ロールバック＆確認

```sh
# 実行
$ rake db:migrate

# ロールバック
$ rake db:rollback

# 確認
$ rake db:migrate:status

 Status   Migration ID    Migration Name
--------------------------------------------------
   up     20140909055128  Create users
   up     20140909055234  Create spots
   up     20140909055735  Create user spots
   up     20140909072813  Change options to user spot
```

---

[参考URL](https://railsdoc.com/migration)

直接SQLを使わずにDBのテーブルやカラムなどの構造を変更できる仕組み

```ruby
def change
end

# 昔からある記法
def up

def down
```

## has_many

has_manyは関連づけの中でも参照される側(親側)。一多対の関連

## where

whereメソッドに `カラム名:配列` というハッシュを渡すと、カラムの値が複数の候補のどれかと同じ

```ruby
members = Member.where(number: [15, 17, 19]) # 15 or 17 or 19
members = Member.where(number: 12..14) # 12 ~ 14
members = Member.where.not(number: 12..14) # 12 ~ 14ではない
members = Member.where.("name = ?", name) # プレースホルダ
```

---

## Railsのモデル(ActiveRecord) クラスのクラスメソッドについて

Railsのモデル（ActiveRecord）はDBからデータを取り出したり検索したりするための強力な機能を備えている

**以下はモデルクラスのクラスメソッド欄**
Railsのモデル群はActiveRecord::を継承していることを忘れてはいけない。

### idsメソッド

```ruby
member = Member.ids
→ [0, 1, 2] # SELECT "members"."id" FROM "members"
```

テーブルに存在するすべてのレコードの主キーを配列として取得ができる

### find 1件

主キーの値を指定し一件取得したい場合に使用する。
例外が発生することを前提にしたプログラムとして作成する

```ruby
member = Member.find(3)
```

- 例外
ActiveRecord::RecordNotFoundが発生する

### find_by 1件

検索対象のカラムはいくつも設定し1件取得したい場合
あるカラムを使ってレコードを検索し、**最初に一致したものを返す**
引数には `name: "Taro"` のようにハッシュでカラム名: 値を指定する。

```ruby
member = Member.find_by(sex: 1, administrator: false)
```

- 例外
例外は発生せずnilが返る

### where

複数のレコードを検索する

- 戻り値
ActiveRecord:Relationというクラスのインスタンスで検索結果のレコードを保持した配列風オブジェクト

- 例外
例外は発生せず、空のActiveRecord::Relationインスタンスが返る

### to_a

即座に明治的に任意の箇所でSQLを発行したい場合。

## ActiveRecord::Relation

配列と同様のアクセスのためのインターフェースを持っている。このインターフェースを利用することでSQLの実行結果のデータを普通の配列と同じような感覚で扱える。

ActiveRecordのQuery Interfaceによる操作結果をオブジェクトとして表現したもの

SQLのそれぞれの表現に対応したメソッドをチェインさせることが可能。
これらのインターフェースをQuery Interfaceと呼ぶ

- メソッド実行について

インタプリターだと、コンパイルしながら実行していくを前提に考える
メソッド（チェインを含む）呼び出しを通じてActiveRecord:Relationは内部でどのようなSQLを発行するかという情報だけを保持する。
そのため実際に**そのSQL実行結果が必要になるまではDBに対するアクセスは発生しない。**

- ActiveRecord::Relationメソッド保持の仕組み

1. ActiveRecord::Relationに対してQuery Interfaceが呼ばれるとActiveRecord::Relationのインスタンスが生成される
2. ActiveRecord::Relationに対して繰り返しQuery Interfaceを呼び出すことができる
3. 繰り返し呼び出したQuery InterfaceはActiveRecord::Relationのインスタンスに蓄積されどんなSQLを発行するかの情報が更新される
4. 実際にデータが必要になった時点で、蓄積された情報をもとにSQLを発行しデータを取得する。

このように設計されている理由はメソッドいチェインによるクエリの構築を行うため。
検索メソッドを実行した途端、即座にSQLが実行されてしまう設計の場合最初のメソッド呼び出しの時点ですべての条件を準備して一度にメソッドへ渡す必要が出てきてしまうため出てきてしまうため。

---

## クエリーメソッド

以下はクエリーメソッドというらしい
**クエリーメソッドのつなげる順番は自由**

### where 一致した件数

大前提
whereメソッドはリレーションオブジェクトを作成すると、そのままでは検索は実行されない。
検索条件を保持しているだけ

検索条件に一致する複数のレコードが取り出せる
クエリーメソッドが実際に返すのは、配列ではなくActiveRecord::Relationクラスのオブジェクト
**これをリレーションオブジェクトという**

このオブジェクトの役割はデータベースからデータを取り出すための検索条件を保持することと、検索を実行してその結果をモデルの配列として使えるようにすること

これは使える

### 生成されたSQLを調べる

```ruby
members = Member.where(name: "Taro"); nil
members = Member.where("number < 20") # WHERE句に指定する検索条件を文字列で指定することもできる。

puts members.to_sql
# SELECT "members".* FROM "members" WHERE "members"."name" = "Taro"
```

### 検索が実行されるタイミング

大前提
whereメソッドはリレーションオブジェクトを作成すると、そのままでは検索は実行されない。
検索条件を保持しているだけ

リレーションオブジェクトはRubyの配列と同じ名前のメソッドを持っている
each, map, length

上記のメソッドを呼び出すと、その時に初めてSQLによる検索を実行しモデルオブジェクトの配列を利用できるようになる。

## where便利な使い方

whereメソッドにカラム名: 配列というハッシュを渡すとカラムの値が複数の候補のどれかと同じという検索条件を指定できる。

```ruby
members = Member.where(number: [15, 16, 18]) # select members from members where in (15, 16, 18)
# ハッシュの値を範囲オブジェクトにするとその範囲にあるという検索条件もできる
members = Member.where(number: 12..14) # 12 ~ 14 select members from member where number between 12 and 14
```

whereメソッドの直後にnotメソッドを指定すると ~ではないという検索条件が使える

- プレースホルダ

; nilはwhereメソッドの呼び出しの後に結果の表示を消している

```ruby
name = "taro"
members = Member.where("name = ?", name); nil
```

- SQLインジェクションを防ぐ
whereメソッドで検索を行うときは以下にしてはいけない

```ruby
@member = Member.where("name = '#{name}'")
```

変数の中にSQL文にとって意味のある文字(1重引用符)が含まれると、データベースが不正に利用されることがあるため
ハッシュで指定するかプレースホルダで変数を展開すれ。

## リレーションオブジェクト

リレーションオブジェクトはみかけ上は配列と同じように振る舞うが、実際に検索を実行してデータを取り出すのはデータが必要になったときという特徴を持っている。
Lazy Loadingと呼ばれる。これにより、すっきりしたコードで余計な検索の実行を省くことができる。

---

## ファインダーメソッド

ここからはファインダーメソッド

リレーションオブジェクトにはファインダーメソッドと呼ばれるメソッドが備わっている

例として
firstは検索条件に一致するレコードを先頭から1個だけ取り出し、モデルオブジェクトを1個(存在しなければnilを)返す

```ruby
member = Member.where(sex: 2).order(:number).first
```

## クエリービルダー

```ruby
members = Members.find_by_sql("SELECT * FROM members WHERE number = 11")
```

---

## Railsバリデーションまとめ

[参考URL](https://qiita.com/h1kita/items/772b81a1cc066e67930ec)

前提
**バリデーションを設定しただけでは保存に失敗したときのメッセージは表示されない。**

- presence
presenceで値が空とみなされるのは、nil, false, 空文字
※これはblank?メソッドがtrueを返す場合と同じ

## バリデーショントリガーされるやつ

create
create!
save
save!
update
update!

## validation

基本saveメソッドがバリデーションを実行する。
しかしsaveメソッドを使わずにバリデーションを行うには、valid?メソッドかinvalid?メソッドを使用する

```ruby
member.number = nil
member.valid? # false
member.invalid? # true
```

チェックに引っかかればvalid?はfalseを返す
チェックに引っかかればinvalid?はtrueを返す

Railsではvalid?メソッドを実行するとバリデーションが実行されます。
バリデーションが通ればtrueを返し、引っかかればfalseを返します。
ちなみにinvalid?メソッドは逆の振る舞いをします。

## validatesメソッドの書き方

シンボルでモデルの属性名を指定し、その後にハッシュでバリデーションの種類: trueを並べれば、その種類のバリデーションが行われる。

```ruby
validates :number, :name, presence: true
# validates :シンボルでモデルの属性名
```

## Rails ActiveRecord まとめ

モデルはデータベースのテーブルに対応するオブジェクト。モデルクラスのインスタンスはテーブルの1つのレコードにあたる
データベースの設定はdatabase.ymlで行う。3つの環境に合わせて3つのデータベースを用意する
データベースの中にテーブルを作成するにはマイグレーションスクリプトを記述
データベースの作成やマイグレーションにはbin/railsコマンドを使う
saveメソッドがバリデーションを実行する。

## Rails ポリモーフィック

[参考URL](https://blog.agile.esm.co.jp/entry/rails-polymorphic-story)

## STI(Single Table Inheritance) 単一テーブル継承(STI)

[参考URL](https://qiita.com/niwa1903/items/218713c076fb0075712f)  
[参考URL](https://sakaishun.com/2021/08/08/stisingle-table-inheritance/)

同じカラム設計のテーブルを、ひとつのテーブルにまとめて継承することで余計なテーブルを増やさずにDRYなテーブル設計するというもの。

同一テーブル内に継承関係のあるクラスのカラムをすべて持ってしまうことを言います。
たとえば次のような継承関係にあるモデルがあるとします。
